const videoModal = document.getElementById('videoModal');
const infoModal = document.getElementById('infoModal');
const videoPlayer = document.getElementById('player');
const playerEpTitle = document.getElementById('playerEpTitle');
const closeBtn = document.getElementById('closeBtn');
const infoCloseBtn = document.getElementById('infoCloseBtn');
const toast = document.getElementById('toast');
const header = document.getElementById('mainHeader');
const watchlistItems = document.getElementById('watchlistItems');
let plyrInstance;
let currentVideoId = null;
let currentAnimeName = null;
let lastSaveTime = 0;
let isVideoLoaded = false;

// --- Currently Watching Management ---
const CURRENTLY_WATCHING_KEY = 'pelinflix_currently_watching';

function getCurrentlyWatching() {
    try {
        const cw = localStorage.getItem(CURRENTLY_WATCHING_KEY);
        return cw ? JSON.parse(cw) : [];
    } catch (e) {
        return [];
    }
}

function setCurrentlyWatching(list) {
    localStorage.setItem(CURRENTLY_WATCHING_KEY, JSON.stringify(list));
}

window.toggleCurrentlyWatching = function (catId, isWatching) {
    let list = getCurrentlyWatching();
    if (isWatching) {
        if (!list.includes(catId)) list.push(catId);
    } else {
        list = list.filter(id => id !== catId);
    }
    setCurrentlyWatching(list);

    if (window.appCategoryList) {
        renderAktifIzlenen(window.appCategoryList);
    }
};

function renderAktifIzlenen(categoryList) {
    const grid = document.getElementById('aktifIzlenenGrid');
    if (!grid) return;
    grid.innerHTML = '';
    const cw = getCurrentlyWatching();
    const activeCats = categoryList.filter(cat => cw.includes(cat.id));

    if (activeCats.length === 0) {
        grid.innerHTML = '<p style="color: #888; font-size: 1.1rem; padding: 20px; grid-column: 1 / -1; text-align: center;">Henüz aktif olarak izlediğiniz bir anime bulunmuyor.</p>';
        return;
    }

    activeCats.forEach(cat => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.onclick = () => switchSection(cat.id, null);
        card.innerHTML = `
            <div class="category-img-wrapper">
                <img src="${cat.cover}" alt="${cat.title}">
            </div>
            <div class="category-title">${cat.title}</div>
            <div class="category-genre">${cat.genre}</div>
        `;
        grid.appendChild(card);
    });
}

// --- Watched Episodes Management ---
const WATCHED_STORAGE_KEY = 'pelinflix_watched_episodes';

function getWatchedEpisodes() {
    try {
        const watched = localStorage.getItem(WATCHED_STORAGE_KEY);
        return watched ? JSON.parse(watched) : {};
    } catch (e) {
        console.error('Error reading watched episodes:', e);
        return {};
    }
}

function markEpisodeAsWatched(animeName, episodeId) {
    try {
        const watched = getWatchedEpisodes();
        if (!watched[animeName]) {
            watched[animeName] = [];
        }
        if (!watched[animeName].includes(episodeId)) {
            watched[animeName].push(episodeId);
            localStorage.setItem(WATCHED_STORAGE_KEY, JSON.stringify(watched));
        }
    } catch (e) {
        console.error('Error saving watched episode:', e);
    }
}

function isEpisodeWatched(animeName, episodeId) {
    const watched = getWatchedEpisodes();
    return watched[animeName] && watched[animeName].includes(episodeId);
}

function createEpisodeCards(episodes, gridElement, animeName) {
    if (!gridElement) {
        console.warn('Skipping rendering: Grid not found for', animeName);
        return;
    }

    gridElement.innerHTML = '';
    episodes.forEach((ep, index) => {
        const episodeId = ep.id || `ep-${index + 1}`;
        const isWatched = isEpisodeWatched(animeName, episodeId);

        const card = document.createElement('div');
        card.className = `episode-card ${isWatched ? 'watched' : ''}`;
        card.setAttribute('data-anime', animeName);
        card.setAttribute('data-episode-id', episodeId);

        if (ep.season) {
            card.setAttribute('data-season', ep.season);
            if (String(ep.season) !== "1") {
                card.style.display = 'none';
            }
        }

        card.innerHTML = `
            <div class="thumbnail-container">
                <button class="watched-toggle ${isWatched ? 'active' : ''}" data-anime="${animeName}" data-episode-id="${episodeId}" title="İzlendi olarak işaretle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </button>
                ${isWatched ? '<div class="watched-badge">İzlendi</div>' : ''}
                <div class="play-overlay"><div class="play-icon"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div></div>
            </div>
            <div class="episode-info">
                <div class="episode-title">${ep.title}</div>
                ${ep.rating ? `
                <div class="ep-rating-box">
                    EP Rate: <strong>${ep.rating} / 10</strong>
                </div>` : ''}
            </div>
        `;

        // Add click handler for the card (to play video)
        card.onclick = (e) => {
            // Don't trigger if clicking the toggle button
            if (e.target.closest('.watched-toggle')) {
                return;
            }
            if (ep.source) {
                openVideo(ep.source, ep.title, animeName, episodeId);
            } else {
                showToast("Bölüm henüz mevcut değil.");
            }
        };

        // Add click handler for the toggle button
        const toggleBtn = card.querySelector('.watched-toggle');
        toggleBtn.onclick = (e) => {
            e.stopPropagation(); // Prevent card click
            toggleWatchedState(animeName, episodeId, card, toggleBtn);
        };

        gridElement.appendChild(card);
    });
}

function toggleWatchedState(animeName, episodeId, card, toggleBtn) {
    const isCurrentlyWatched = isEpisodeWatched(animeName, episodeId);

    if (isCurrentlyWatched) {
        // Unmark as watched
        removeWatchedEpisode(animeName, episodeId);
        card.classList.remove('watched');
        toggleBtn.classList.remove('active');

        // Remove badge
        const badge = card.querySelector('.watched-badge');
        if (badge) {
            badge.remove();
        }
    } else {
        // Mark as watched
        markEpisodeAsWatched(animeName, episodeId);
        card.classList.add('watched');
        toggleBtn.classList.add('active');

        // Add badge
        const thumbnailContainer = card.querySelector('.thumbnail-container');
        if (thumbnailContainer && !thumbnailContainer.querySelector('.watched-badge')) {
            const badge = document.createElement('div');
            badge.className = 'watched-badge';
            badge.textContent = 'İzlendi';
            // Insert after toggle button
            const playOverlay = thumbnailContainer.querySelector('.play-overlay');
            thumbnailContainer.insertBefore(badge, playOverlay);
        }
    }
}

function removeWatchedEpisode(animeName, episodeId) {
    try {
        const watched = getWatchedEpisodes();
        if (watched[animeName]) {
            watched[animeName] = watched[animeName].filter(id => id !== episodeId);
            // Remove anime key if no episodes left
            if (watched[animeName].length === 0) {
                delete watched[animeName];
            }
            localStorage.setItem(WATCHED_STORAGE_KEY, JSON.stringify(watched));
        }
    } catch (e) {
        console.error('Error removing watched episode:', e);
    }
}


// --- Anime Episode Rendering ---
function renderAllEpisodes(episodesList) {
    const animeMapping = [
        { episodes: episodesList.attackOnTitan, gridId: 'episodeGridAttackOnTitan', animeName: 'Attack on Titan' },
        { episodes: episodesList.chainsawMan, gridId: 'episodeGridChainsawMan', animeName: 'Chainsaw Man' },
        { episodes: episodesList.chainsawManReze, gridId: 'episodeGridChainsawManReze', animeName: 'Chainsaw Man - The Movie: Reze Arc' },
        { episodes: episodesList.kakegurui, gridId: 'episodeGridKakegurui', animeName: 'Kakegurui' },
        { episodes: episodesList.deathParade, gridId: 'episodeGridDeathParade', animeName: 'Death Parade' },
        { episodes: episodesList.hellsParadise, gridId: 'episodeGridHellsParadise', animeName: "Hell's Paradise" },
        { episodes: episodesList.yuriOnIce, gridId: 'episodeGridYuriOnIce', animeName: 'Yuri on Ice' },
        { episodes: episodesList.claymore, gridId: 'episodeGridClaymore', animeName: 'Claymore' },
        { episodes: episodesList.cowboyBebop, gridId: 'episodeGridCowboyBebop', animeName: 'Cowboy Bebop' },
        { episodes: episodesList.guiltyCrown, gridId: 'episodeGridGuiltyCrown', animeName: 'Guilty Crown' },
        { episodes: episodesList.berserk, gridId: 'episodeGridBerserk', animeName: 'Berserk' }
    ];

    animeMapping.forEach(item => {
        createEpisodeCards(item.episodes, document.getElementById(item.gridId), item.animeName);
    });
}
// ⚠️ When adding a new anime to data.json categoryList,
// you must also add a matching entry here.
// --- Watchlist Management ---
function getGridIdObj(id) {
    const map = {
        'attackontitan': { gridId: 'episodeGridAttackOnTitan', title: 'Attack on Titan', titleSuffix: '', seasons: [1, 2, 3, 4] },
        'chainsawman': { gridId: 'episodeGridChainsawMan', title: 'Chainsaw Man', titleSuffix: ' (2022)' },
        'chainsawmanreze': { gridId: 'episodeGridChainsawManReze', title: 'Chainsaw Man - The Movie: Reze Arc', titleSuffix: '' },
        'kakegurui': { gridId: 'episodeGridKakegurui', title: 'Kakegurui', titleSuffix: ' (2017)' },
        'deathparade': { gridId: 'episodeGridDeathParade', title: 'Death Parade', titleSuffix: ' (2015)' },
        'hellsparadise': { gridId: 'episodeGridHellsParadise', title: "Hell's Paradise", titleSuffix: ' (2023)' },
        'yurionice': { gridId: 'episodeGridYuriOnIce', title: 'Yuri on Ice', titleSuffix: ' (2016)' },
        'claymore': { gridId: 'episodeGridClaymore', title: 'Claymore', titleSuffix: ' (2007)' },
        'cowboybebop': { gridId: 'episodeGridCowboyBebop', title: 'Cowboy Bebop', titleSuffix: ' (1998)' },
        'guiltycrown': { gridId: 'episodeGridGuiltyCrown', title: 'Guilty Crown', titleSuffix: ' (2011)' },
        'berserk': { gridId: 'episodeGridBerserk', title: 'Berserk', titleSuffix: '' }
    };
    return map[id];
}

function renderAnimeSections(categoryList, animeDatabase) {
    const container = document.getElementById('dynamicSections');
    if (!container) return;
    container.innerHTML = '';

    categoryList.forEach(cat => {
        const mapData = getGridIdObj(cat.id);
        if (!mapData) return;

        // The title matches animeDatabase key.
        const dbTitle = mapData.title;
        const dbEntry = animeDatabase[dbTitle];
        if (!dbEntry) return;

        const section = document.createElement('section');
        section.id = cat.id;
        section.className = 'section';

        section.innerHTML = `
            <div class="anime-header">
                <h1>${dbTitle}${mapData.titleSuffix}</h1>
            </div>

            <div class="info-card">
                <div class="info-title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-color);">
                        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"></path>
                        <path d="M12 8v4"></path>
                        <path d="M12 16h.01"></path>
                    </svg>
                    Hakkında
                </div>
                <p class="info-description">${dbEntry.desc}</p>
                <div class="info-meta">
                    <span class="rating-badge">IMDb</span>
                    <span class="rating-value">${dbEntry.rating} / 10</span>
                    <span class="rating-divider">|</span>
                    <span class="rating-badge pelin-badge">Pelin'in Notu</span>
                    <span class="rating-value"><svg width="18" height="18" viewBox="0 0 24 24" fill="#e50914"
                            stroke="#e50914" stroke-width="1" style="vertical-align: -2px; margin-right: 4px;">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                            </polygon>
                        </svg>${dbEntry.pelinRating} / 10</span>
                </div>
            </div>

            <div class="currently-watching-container" style="display: flex; align-items: center; gap: 12px; margin-bottom: 25px; margin-left: 5px;">
                <button class="watched-toggle cw-custom-toggle ${getCurrentlyWatching().includes(cat.id) ? 'active' : ''}" onclick="this.classList.toggle('active'); toggleCurrentlyWatching('${cat.id}', this.classList.contains('active'))" style="position: relative; top: 0; left: 0; width: 34px; height: 34px; border-radius: 8px;">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </button>
                <span style="font-family: 'Poppins', sans-serif; font-size: 1rem; font-weight: 600; color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">İzliyor</span>
            </div>

            ${mapData.seasons ? `
            <div class="episode-controls" style="margin-bottom: 20px;">
                <select class="season-select" onchange="filterSeason('${mapData.gridId}', this.value)">
                    ${mapData.seasons.map(s => `<option value="${s}">${s}. Sezon</option>`).join('')}
                </select>
            </div>
            ` : ''}

            <div class="episode-grid" id="${mapData.gridId}"></div>
            
            <!-- COMMENTS SECTION AT THE END -->
            <div class="comment-section" data-anime-id="${cat.id}" style="margin-top: 40px; border-top: 1px solid #333; padding-top: 20px; max-width: 800px;">
                <h3 style="font-family: 'Poppins', sans-serif; font-size: 1.3rem; margin-bottom: 20px;">Yorumlar (<span class="comment-count-text">0</span>)</h3>
                
                <!-- Auth states handled by dynamically injected HTML below -->
                <div class="comment-auth-container" style="margin-bottom: 30px;">
                </div>

                <!-- List of comments -->
                <div class="comments-list" style="display: flex; flex-direction: column; gap: 15px;">
                </div>
            </div>
        `;

        container.appendChild(section);

        // Auto-load comments & auth form for this specific anime section
        window.loadComments(cat.id, section.querySelector('.comment-section'));
    });
}

// Global filter function
window.filterSeason = function (gridId, seasonNum) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    const cards = grid.querySelectorAll('.episode-card');
    cards.forEach(card => {
        if (card.getAttribute('data-season') === String(seasonNum)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
};

// --- Categories Management ---
function renderCategories(categoryList) {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;
    grid.innerHTML = '';
    categoryList.forEach(cat => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.onclick = () => switchSection(cat.id, null);
        card.innerHTML = `
            <div class="category-img-wrapper">
                <img src="${cat.cover}" alt="${cat.title}">
            </div>
            <div class="category-title">${cat.title}</div>
            <div class="category-genre">${cat.genre}</div>
        `;
        grid.appendChild(card);
    });
}

// --- Core App Functions ---
async function initApp() {
    const res = await fetch('js/data.json');
    const data = await res.json();
    const { animeDatabase, episodes, categoryList, watchlistData } = data;

    // Initialize Plyr
    plyrInstance = new Plyr('#player', {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen']
    });

    // Move seek overlays INSIDE .plyr so they're visible in fullscreen
    plyrInstance.on('ready', () => {
        const plyrEl = document.querySelector('#videoModal .plyr');
        if (plyrEl) {
            const left = document.getElementById('seekOverlayLeft');
            const right = document.getElementById('seekOverlayRight');
            if (left) plyrEl.appendChild(left);
            if (right) plyrEl.appendChild(right);
        }
    });

    // Skip Intro and Resume Playback Logic
    plyrInstance.on('timeupdate', event => {
        let currentTime = plyrInstance.currentTime;

        // Auto-skip specific intro segment for Kakegurui
        if (currentAnimeName === 'Kakegurui' && currentTime >= 3 && currentTime < 11) {
            plyrInstance.currentTime = 11;
            currentTime = 11;
        }

        // Save progress every 5 seconds
        if (currentVideoId && currentTime > 0) {
            if (Math.abs(currentTime - lastSaveTime) > 5) {
                localStorage.setItem(`video-progress-${currentVideoId}`, currentTime);
                lastSaveTime = currentTime;
            }
        }
    });

    // Resume logic: Load from localStorage
    plyrInstance.on('playing', () => {
        if (currentVideoId && !isVideoLoaded) {
            const savedTime = localStorage.getItem(`video-progress-${currentVideoId}`);
            if (savedTime && parseFloat(savedTime) > 0) {
                plyrInstance.currentTime = parseFloat(savedTime);
            }
            isVideoLoaded = true;
        }
    });

    // Remove progress on end
    plyrInstance.on('ended', () => {
        if (currentVideoId) {
            localStorage.removeItem(`video-progress-${currentVideoId}`);
            lastSaveTime = 0;
        }
    });

    window.appCategoryList = categoryList;

    renderAnimeSections(categoryList, animeDatabase);
    renderAktifIzlenen(categoryList);

    renderAllEpisodes(episodes);

    watchlistItems.innerHTML = '';
    watchlistData.forEach((item, index) => {
        const name = item.title;
        const isWatched = item.watched;

        const li = document.createElement('li');
        li.className = isWatched ? 'completed' : '';
        li.setAttribute('data-anime-name', name);
        li.setAttribute('data-original-index', index + 1);

        li.innerHTML = `
            <span class="anime-name">${name}</span>
            <span class="status-badge ${isWatched ? 'active' : ''}" data-anime-name="${name}">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </span>
        `;

        // Click on anime name to show info
        const animeName = li.querySelector('.anime-name');
        animeName.onclick = (e) => {
            e.stopPropagation();
            showAnimeInfo(name, animeDatabase);
        };

        watchlistItems.appendChild(li);
    });

    renderCategories(categoryList);

    // --- Watchlist Search Logic ---
    const searchContainer = document.getElementById('watchlistSearchContainer');
    const searchInput = document.getElementById('watchlistSearchInput');

    if (searchContainer && searchInput && watchlistItems) {
        searchContainer.addEventListener('click', () => {
            if (!searchContainer.classList.contains('active')) {
                searchContainer.classList.add('active');
                searchInput.focus();
            }
        });

        document.addEventListener('click', (e) => {
            if (!searchContainer.contains(e.target) && searchInput.value.trim() === '') {
                searchContainer.classList.remove('active');
            }
        });

        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            const items = watchlistItems.querySelectorAll('li');

            if (term.length > 0) {
                watchlistItems.classList.add('is-searching');
            } else {
                watchlistItems.classList.remove('is-searching');
            }

            items.forEach(li => {
                const animeName = li.getAttribute('data-anime-name').toLowerCase();
                if (animeName.includes(term)) {
                    li.style.display = '';
                } else {
                    li.style.display = 'none';
                }
            });
        });
    }

    // Restore section from URL hash after dynamic sections exist
    const hash = window.location.hash.replace('#', '');
    const startSection = hash && document.getElementById(hash) ? hash : 'home';
    // Replace the initial state so popstate works correctly
    history.replaceState({ sectionId: startSection }, '', '#' + startSection);
    applySection(startSection);
}

function applySection(sectionId) {
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    const matchingLink = document.querySelector(`.nav-link[onclick*="switchSection('${sectionId}'"]`);
    if (matchingLink) matchingLink.classList.add('active');

    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));

    const targetSec = document.getElementById(sectionId);
    if (targetSec) {
        targetSec.classList.add('active');
    } else {
        const catSec = document.getElementById('categories');
        if (catSec) catSec.classList.add('active');
        showToast("Bu kategori henüz eklenmedi.");
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchSection(sectionId, element) {
    // Push new hash state only if it differs from current
    const newHash = '#' + sectionId;
    if (window.location.hash !== newHash) {
        history.pushState({ sectionId }, '', newHash);
    }
    applySection(sectionId);
}

// Back/forward browser button support
window.onpopstate = (event) => {
    const sectionId = event.state?.sectionId || 'home';
    applySection(sectionId);
};

function showAnimeInfo(name, animeDatabase) {
    const data = animeDatabase[name];
    if (!data) return;
    document.getElementById('infoModalTitle').textContent = name;
    document.getElementById('infoModalDesc').textContent = data.desc;
    document.getElementById('infoModalMeta').innerHTML = `
        <span class="rating-badge">IMDb</span>
        <span class="rating-value">${data.rating} / 10</span>
        <span class="rating-divider">|</span>
        <span class="rating-badge pelin-badge">Pelin'in Notu</span>
        <span class="rating-value"><svg width="18" height="18" viewBox="0 0 24 24" fill="#e50914" stroke="#e50914" stroke-width="1" style="vertical-align: -2px; margin-right: 4px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>${data.pelinRating} / 10</span>
    `;
    infoModal.style.display = 'flex';
    setTimeout(() => infoModal.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
}

function openVideo(url, epTitle, animeName, episodeId) {
    currentVideoId = `${animeName}-ep-${episodeId}`;
    currentAnimeName = animeName;
    isVideoLoaded = false;
    lastSaveTime = 0;

    playerEpTitle.textContent = epTitle;
    document.getElementById('playerAnimeName').textContent = animeName.toUpperCase();

    plyrInstance.source = {
        type: 'video',
        sources: [
            {
                src: url,
                type: 'video/mp4'
            }
        ]
    };

    videoModal.style.display = 'flex';
    setTimeout(() => videoModal.classList.add('active'), 10);
    plyrInstance.play().catch(() => { });
    document.body.style.overflow = 'hidden';

    // Note: Episodes are no longer auto-marked as watched
    // Users must manually toggle the watched state
}

// This function is no longer needed for auto-updating, but kept for compatibility
function updateEpisodeCardWatchedState(animeName, episodeId) {
    const card = document.querySelector(`[data-anime="${animeName}"][data-episode-id="${episodeId}"]`);
    if (card && !card.classList.contains('watched')) {
        card.classList.add('watched');
        const thumbnailContainer = card.querySelector('.thumbnail-container');
        if (thumbnailContainer && !thumbnailContainer.querySelector('.watched-badge')) {
            const badge = document.createElement('div');
            badge.className = 'watched-badge';
            badge.textContent = 'İzlendi';
            thumbnailContainer.insertBefore(badge, thumbnailContainer.firstChild);
        }
    }
}

createEpisodeCards = function (episodes, gridElement, animeName) {
    if (!gridElement) {
        console.warn('Skipping rendering: Grid not found for', animeName);
        return;
    }

    gridElement.innerHTML = '';
    episodes.forEach((ep, index) => {
        const episodeId = ep.id || `ep-${index + 1}`;
        const isWatched = isEpisodeWatched(animeName, episodeId);

        const card = document.createElement('div');
        card.className = `episode-card ${isWatched ? 'watched' : ''}`;
        card.setAttribute('data-anime', animeName);
        card.setAttribute('data-episode-id', episodeId);

        if (ep.season) {
            card.setAttribute('data-season', ep.season);
            if (String(ep.season) !== "1") {
                card.style.display = 'none';
            }
        }

        card.innerHTML = `
            <div class="episode-card-body">
                <div class="episode-text-content">
                    <div class="episode-title">${ep.title}</div>
                    ${ep.rating ? `
                    <div class="episode-rate-row">
                        <span class="episode-rate-value">IMDb ${ep.rating} / 10</span>
                    </div>` : ''}
                </div>
                <button class="watched-toggle ${isWatched ? 'active' : ''}" data-anime="${animeName}" data-episode-id="${episodeId}" title="Izlendi olarak isaretle" aria-label="Izlendi olarak isaretle" aria-pressed="${isWatched ? 'true' : 'false'}">
                    <span class="watched-toggle-box" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </span>
                </button>
            </div>
        `;

        card.onclick = (e) => {
            if (e.target.closest('.watched-toggle')) {
                return;
            }
            if (ep.source) {
                openVideo(ep.source, ep.title, animeName, episodeId);
            } else {
                showToast("Bolum henuz mevcut degil.");
            }
        };

        const toggleBtn = card.querySelector('.watched-toggle');
        toggleBtn.onclick = (e) => {
            e.stopPropagation();
            toggleWatchedState(animeName, episodeId, card, toggleBtn);
        };

        gridElement.appendChild(card);
    });
};

toggleWatchedState = function (animeName, episodeId, card, toggleBtn) {
    const isCurrentlyWatched = isEpisodeWatched(animeName, episodeId);

    if (isCurrentlyWatched) {
        removeWatchedEpisode(animeName, episodeId);
        card.classList.remove('watched');
        toggleBtn.classList.remove('active');
        toggleBtn.setAttribute('aria-pressed', 'false');
        return;
    }

    markEpisodeAsWatched(animeName, episodeId);
    card.classList.add('watched');
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-pressed', 'true');
};

updateEpisodeCardWatchedState = function (animeName, episodeId) {
    const card = document.querySelector(`[data-anime="${animeName}"][data-episode-id="${episodeId}"]`);
    if (!card) return;

    card.classList.add('watched');
    const toggleBtn = card.querySelector('.watched-toggle');
    if (toggleBtn) {
        toggleBtn.classList.add('active');
        toggleBtn.setAttribute('aria-pressed', 'true');
    }
};

function closeModal() {
    [videoModal, infoModal].forEach(m => m.classList.remove('active'));
    if (plyrInstance) plyrInstance.pause();
    setTimeout(() => {
        videoModal.style.display = 'none';
        infoModal.style.display = 'none';
    }, 300);
    document.body.style.overflow = 'auto';
}

closeBtn.onclick = closeModal;
infoCloseBtn.onclick = closeModal;
window.onclick = (e) => { if (e.target.classList.contains('modal')) closeModal(); };
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        return;
    }

    // Arrow key seek — only when video modal is open and not focused on a text input
    if (videoModal.style.display === 'flex' && plyrInstance) {
        const tag = document.activeElement?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;

        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            e.stopPropagation();
            plyrInstance.currentTime = Math.max(0, plyrInstance.currentTime - 5);
            triggerSeekAnimation('left');
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            e.stopPropagation();
            plyrInstance.currentTime = Math.min(plyrInstance.duration || Infinity, plyrInstance.currentTime + 5);
            triggerSeekAnimation('right');
        } else if (e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            plyrInstance.togglePlay();
        }
    }
}, true); // capture:true — fires before Plyr's bubble-phase listeners

// Seek animation helper
let seekAnimTimerLeft = null;
let seekAnimTimerRight = null;

function triggerSeekAnimation(direction) {
    const overlay = direction === 'left'
        ? document.getElementById('seekOverlayLeft')
        : document.getElementById('seekOverlayRight');
    if (!overlay) return;

    const timer = direction === 'left' ? seekAnimTimerLeft : seekAnimTimerRight;
    if (timer) clearTimeout(timer);

    // Force restart the CSS animation by removing and re-adding the class
    overlay.classList.remove('active');
    // Trigger reflow so the animation restarts
    void overlay.offsetWidth;
    overlay.classList.add('active');

    const newTimer = setTimeout(() => {
        overlay.classList.remove('active');
    }, 700);

    if (direction === 'left') seekAnimTimerLeft = newTimer;
    else seekAnimTimerRight = newTimer;
}

let toastTimeout;
let toastHideTimeout;

function showToast(msg) {
    clearTimeout(toastTimeout);
    clearTimeout(toastHideTimeout);

    toast.textContent = msg;
    toast.classList.remove('hide');
    toast.style.display = 'block';

    toastTimeout = setTimeout(() => {
        toast.classList.add('hide');
        toastHideTimeout = setTimeout(() => {
            toast.style.display = 'none';
        }, 300);
    }, 2700);
}

window.onscroll = () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
};

// --- Smooth Infinite Poster Scroll (JS-based, no CSS jump) ---
function initPosterScroll() {
    const cols = Array.from(document.querySelectorAll('.poster-col'));
    if (!cols.length) return;

    // px moved per frame — different speed per column for organic feel
    const speeds = [0.15, 0.10, 0.20, 0.12, 0.18];
    const positions = new Array(cols.length).fill(0);

    function tick() {
        cols.forEach((col, i) => {
            positions[i] -= speeds[i];
            const halfH = col.scrollHeight / 2;
            // Silent reset: at -halfH the content is identical to 0
            if (-positions[i] >= halfH) positions[i] = 0;
            col.style.transform = `translateY(${positions[i]}px)`;
        });
        requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
}

// Start after all images are loaded so scrollHeight is accurate
window.addEventListener('load', initPosterScroll);


// --- COMMENTS FETCHING & POSTING ---
window.loadComments = async function (animeId, containerEl) {
    if (!window.supabaseClient) return;

    const authContainer = containerEl.querySelector('.comment-auth-container');
    const listEl = containerEl.querySelector('.comments-list');
    const countEl = containerEl.querySelector('.comment-count-text');

    // 1. Draw Auth State dynamically
    const { data: { session } } = await window.supabaseClient.auth.getSession();

    if (session) {
        authContainer.innerHTML = `
            <div style="background: #222; border: 1px solid #444; border-radius: 8px; padding: 15px;">
                <textarea class="comment-textarea" id="textarea-${animeId}" placeholder="Yorumunu yaz..." maxlength="2500" style="width: 100%; min-height: 80px; background: transparent; border: none; color: #fff; resize: vertical; outline: none; font-family: inherit; margin-bottom: 10px;" oninput="document.getElementById('charCount-${animeId}').textContent = this.value.length"></textarea>
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="#e50914" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <input type="number" id="ratingInput-${animeId}" min="1" max="10" step="1" placeholder="—"
                        style="width:52px; background:#1a1a1a; border:1px solid #444; border-radius:6px; color:#e50914; font-size:0.95rem; font-weight:700; text-align:center; padding:5px 6px; outline:none; -moz-appearance:textfield; appearance:textfield; font-family:'Inter',sans-serif; transition:border-color 0.2s;"
                        oninput="this.value=this.value.replace(/[^0-9]/g,''); if(parseInt(this.value)>10)this.value='10'; if(parseInt(this.value)<1&&this.value!='')this.value='1';"
                        onfocus="this.style.borderColor='#e50914'" onblur="this.style.borderColor='#444'"
                    >
                    <span style="color:#888; font-size:0.9rem; font-weight:600;">/ 10</span>
                    <span style="color:#555; font-size:0.78rem; margin-left:2px;">(isteğe bağlı)</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #666; font-size: 0.8rem;"><span id="charCount-${animeId}">0</span>/2500</span>
                    <button onclick="postComment('${animeId}', this)" style="background: #e50914; color: #fff; border: none; padding: 8px 20px; border-radius: 4px; font-weight: bold; cursor: pointer; transition: 0.2s;">Yorum Yap</button>
                </div>
            </div>
        `;

    } else {
        authContainer.innerHTML = `
            <div style="background: #222; border-radius: 8px; padding: 15px; text-align: center; color: #aaa;">
                Yorum yapmak için → <button onclick="window.openAuthModal()" style="background: transparent; color: #e50914; border: none; font-weight: bold; cursor: pointer; font-size: 1rem; text-decoration: underline;">Giriş Yap</button>
            </div>
        `;
    }

    // listen for auth changes to redraw the comments box dynamically
    if (!containerEl.dataset.listenerAttached) {
        window.supabaseClient.auth.onAuthStateChange((event, s) => {
            if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
                // Redraw auth container lightly rather than full refresh
                window.loadComments(animeId, containerEl);
            }
        });
        containerEl.dataset.listenerAttached = 'true';
    }

    // 2. Fetch Comments
    const { data, error } = await window.supabaseClient
        .from('comments')
        .select('id, user_id, anime_id, body, rating, created_at, profiles(username, is_admin)')
        .eq('anime_id', animeId)
        .order('created_at', { ascending: false });

    if (error) {
        listEl.innerHTML = `<p style="color:#e50914;">Yorumlar yüklenirken hata oluştu.</p>`;
        return;
    }

    countEl.textContent = data.length || "0";

    if (data.length === 0) {
        listEl.innerHTML = `<p style="color:#666; font-size: 0.9rem;">Henüz yorum yok. İlk yorumu sen yap!</p>`;
        return;
    }

    const currentUserId = session?.user?.id || null;
    listEl.innerHTML = data.map(c => generateCommentHTML(c, currentUserId)).join('');
};

// Global scope variable to track the latest post time for the client-side rate limit
window.lastCommentTime = 0;
window.commentCooldownTimer = null;

window.postComment = async function (animeId, btnEl) {
    const textarea = document.getElementById(`textarea-${animeId}`);
    let body = textarea.value.trim();

    // 1. Sanitize XSS: Strip all HTML tags
    body = body.replace(/<\/?[^>]+(>|$)/g, "");

    // Find or create the inline red error message div for this specific anime section
    const containerEl = document.querySelector(`.comment-section[data-anime-id="${animeId}"]`);
    let errorSpan = document.getElementById(`comment-error-${animeId}`);
    if (!errorSpan) {
        errorSpan = document.createElement('div');
        errorSpan.id = `comment-error-${animeId}`;
        errorSpan.style.color = '#e50914';
        errorSpan.style.fontSize = '0.85rem';
        errorSpan.style.marginTop = '10px';
        errorSpan.style.fontWeight = 'bold';

        // Append it just below the layout containing the character counter and submit button
        const btnContainer = btnEl.parentElement;
        btnContainer.parentElement.appendChild(errorSpan);
    }

    // Clear previous errors
    errorSpan.textContent = '';

    // 2. Client-side Rate Limit validation & Countdown
    const now = Date.now();
    const timeSinceLast = now - window.lastCommentTime;
    if (timeSinceLast < 30000) {
        const secondsLeft = Math.ceil((30000 - timeSinceLast) / 1000);
        errorSpan.textContent = `30 saniye sonra tekrar deneyebilirsin (${secondsLeft}s...)`;

        // Active visual countdown refresh
        let count = secondsLeft;
        clearInterval(window.commentCooldownTimer);
        window.commentCooldownTimer = setInterval(() => {
            count--;
            if (count > 0) {
                errorSpan.textContent = `30 saniye sonra tekrar deneyebilirsin (${count}s...)`;
            } else {
                errorSpan.textContent = '';
                clearInterval(window.commentCooldownTimer);
            }
        }, 1000);
        return;
    }
    clearInterval(window.commentCooldownTimer);

    // 3. Validate Minimum & Maximum lengths
    if (body.length < 3) {
        errorSpan.textContent = 'Yorum en az 3 karakter olmalıdır.';
        return;
    }
    if (body.length > 2500) {
        errorSpan.textContent = 'Yorum en fazla 2500 karakter olabilir.';
        return;
    }

    // Begin Submission State
    btnEl.disabled = true;
    btnEl.textContent = 'Gönderiliyor...';

    // Verify session explicitly right before transmission
    const { data: { session } } = await window.supabaseClient.auth.getSession();
    if (!session) {
        btnEl.disabled = false;
        btnEl.textContent = 'Yorum Yap';
        window.openAuthModal();
        return;
    }

    // Insert payload into Supabase
    const ratingInput = document.getElementById(`ratingInput-${animeId}`);
    const rating = ratingInput && ratingInput.value ? parseInt(ratingInput.value) : null;
    const validRating = (rating >= 1 && rating <= 10) ? rating : null;

    const { data, error } = await window.supabaseClient
        .from('comments')
        .insert([{ user_id: session.user.id, anime_id: animeId, body: body, ...(validRating ? { rating: validRating } : {}) }])
        .select('id, user_id, anime_id, body, rating, created_at, profiles(username, is_admin)')
        .single();

    btnEl.disabled = false;
    btnEl.textContent = 'Yorum Yap';

    if (error) {
        // 4. Handle Auth Token Expirations or RLS Rejections (401, 403, or Postgres 42501 RLS)
        if (error.code === '401' || error.code === '403' || error.code === '42501' || error.message.toLowerCase().includes('jwt')) {
            await window.supabaseClient.auth.signOut();
            showToast("Oturumun sona erdi, tekrar giriş yap");
            // No need to manually call loadComments here, the SIGNED_OUT event listener will handle it.
        } else {
            errorSpan.textContent = "Hata: " + error.message;
        }
    } else {
        // Success: Update rate limiter timer
        window.lastCommentTime = Date.now();

        // Reset Inputs
        textarea.value = '';
        document.getElementById(`charCount-${animeId}`).textContent = '0';
        // Reset rating input
        const ratingInput = document.getElementById(`ratingInput-${animeId}`);
        if (ratingInput) ratingInput.value = '';
        errorSpan.textContent = '';

        const listEl = containerEl.querySelector('.comments-list');
        const countEl = containerEl.querySelector('.comment-count-text');

        // Strip the "İlk yorumu sen yap!" text if it's there
        if (listEl.querySelector('p')) {
            listEl.innerHTML = '';
        }

        // Prepend the successfully returned comment block dynamically to the top
        listEl.insertAdjacentHTML('afterbegin', generateCommentHTML(data, session.user.id));
        countEl.textContent = parseInt(countEl.textContent || "0") + 1;
    }
};

function generateCommentHTML(comment, currentUserId) {
    const username = comment.profiles?.username || 'Anonim';
    const firstLetter = username.charAt(0).toUpperCase();

    // Relative Date Logic (Turkish)
    const date = new Date(comment.created_at);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    let timeAgo = date.toLocaleDateString('tr-TR');
    if (diffMins < 1) timeAgo = 'Az önce';
    else if (diffMins < 60) timeAgo = `${diffMins} dakika önce`;
    else if (diffHours < 24) timeAgo = `${diffHours} saat önce`;
    else if (diffDays < 7) timeAgo = `${diffDays} gün önce`;

    const isOwner = currentUserId && comment.user_id === currentUserId;
    const isAdmin = comment.profiles?.is_admin === true;
    const canDelete = isOwner || window.currentUserIsAdmin;

    return `
        <div class="comment-item" data-comment-id="${comment.id}" style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; display: flex; gap: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); transition: opacity 0.3s ease, transform 0.3s ease;">
            <div style="width: 40px; height: 40px; border-radius: 50%; background: #333; color: #fff; font-weight: bold; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1.2rem;">
                ${firstLetter}
            </div>
            
            <div style="flex-grow: 1; min-width: 0;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
                    <span style="color: #e50914; font-weight: 700; display: flex; align-items: center;">
                        ${isAdmin ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" style="vertical-align: -2px; margin-right: 4px;" title="Admin"><path d="M2 20h20v2H2v-2zm2-3l3-8 5 4 5-4 3 8H4z"/></svg>` : ''}${window.escapeHTML(username)}
                    </span>
                    <span style="color: #666; font-size: 0.8rem;">${timeAgo}</span>
                    ${comment.rating ? `<span class="comment-rating" style="display:inline-flex;align-items:center;gap:5px;font-size:0.85rem;font-weight:700;color:#e8e8e8;">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#e50914" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        ${comment.rating}&nbsp;/&nbsp;10
                    </span>` : ''}
                    ${canDelete ? `
                    <div style="margin-left: auto; display: flex; gap: 4px;">
                        ${isOwner ? `
                        <button class="comment-delete-btn" onclick="editComment('${comment.id}')" title="D\u00fczenle">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                        </button>
                        ` : ''}
                        <button class="comment-delete-btn" onclick="deleteComment('${comment.id}', '${comment.anime_id}', this)" title="Yorumu sil">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        </button>
                    </div>
                    ` : ''}
                </div>
                <div id="comment-body-${comment.id}" style="color: #ddd; font-size: 0.95rem; line-height: 1.5; word-wrap: break-word; white-space: pre-wrap;">${window.escapeHTML(comment.body)}</div>
                <div id="comment-edit-area-${comment.id}" style="display:none; flex-direction:column; gap:8px; margin-top:8px;">
                    <textarea id="comment-edit-ta-${comment.id}" maxlength="2500"
                        style="width:100%; min-height:70px; background:#1a1a1a; border:1px solid #444; border-radius:6px; color:#fff; padding:10px; font-family:'Inter',sans-serif; font-size:0.95rem; resize:vertical; box-sizing:border-box; outline:none; transition:border-color 0.2s;"
                        oninput="document.getElementById('comment-edit-counter-${comment.id}').textContent = this.value.length + '/2500'"
                    ></textarea>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="#e50914" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        <input type="number" id="comment-edit-rating-${comment.id}" min="1" max="10" step="1" placeholder="—"
                            value="${comment.rating || ''}"
                            style="width:48px; background:#1a1a1a; border:1px solid #444; border-radius:6px; color:#e50914; font-size:0.9rem; font-weight:700; text-align:center; padding:4px 6px; outline:none; -moz-appearance:textfield; appearance:textfield; font-family:'Inter',sans-serif; transition:border-color 0.2s;"
                            oninput="this.value=this.value.replace(/[^0-9]/g,''); if(parseInt(this.value)>10)this.value='10'; if(parseInt(this.value)<1&&this.value!='')this.value='1';"
                            onfocus="this.style.borderColor='#e50914'" onblur="this.style.borderColor='#444'"
                        >
                        <span style="color:#888; font-size:0.85rem; font-weight:600;">/ 10</span>
                    </div>
                    <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
                        <span id="comment-edit-counter-${comment.id}" style="color:#555; font-size:0.78rem;">0/2500</span>
                        <div style="display:flex; gap:8px;">
                            <button onclick="saveEditedComment('${comment.id}', '${comment.anime_id}', this)"
                                style="background:#e50914; color:#fff; border:none; padding:7px 16px; border-radius:6px; font-weight:700; cursor:pointer; font-family:'Inter',sans-serif; font-size:0.875rem; transition:background 0.2s;">
                                Kaydet
                            </button>
                            <button onclick="cancelEditComment('${comment.id}')"
                                style="background:rgba(255,255,255,0.08); color:#a3a3a3; border:1px solid rgba(255,255,255,0.12); padding:7px 14px; border-radius:6px; font-weight:600; cursor:pointer; font-family:'Inter',sans-serif; font-size:0.875rem; transition:all 0.2s;">
                                \u0130ptal
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

window.deleteComment = async function (commentId, animeId, btnEl) {
    if (!confirm('Bu yorumu silmek istediğine emin misin?')) return;

    const containerEl = document.querySelector(`.comment-section[data-anime-id="${animeId}"]`);
    const commentEl = document.querySelector(`.comment-item[data-comment-id="${commentId}"]`);

    // Disable button while deleting
    btnEl.disabled = true;
    btnEl.style.opacity = '0.4';

    const { error } = await window.supabaseClient
        .from('comments')
        .delete()
        .eq('id', commentId);

    if (error) {
        btnEl.disabled = false;
        btnEl.style.opacity = '';
        showToast('Yorum silinirken bir hata oluştu.');
        return;
    }

    // Animate removal
    if (commentEl) {
        commentEl.style.opacity = '0';
        commentEl.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            commentEl.remove();

            // Update count
            if (containerEl) {
                const countEl = containerEl.querySelector('.comment-count-text');
                const listEl = containerEl.querySelector('.comments-list');
                const newCount = Math.max(0, parseInt(countEl.textContent || '1') - 1);
                countEl.textContent = newCount;

                if (newCount === 0) {
                    listEl.innerHTML = '<p style="color:#666; font-size: 0.9rem;">Henüz yorum yok. İlk yorumu sen yap!</p>';
                }
            }
        }, 300);
    }
};

// --- Edit comment (inline, no reload) ---
window.editComment = function (commentId) {
    const bodyEl = document.getElementById(`comment-body-${commentId}`);
    const editArea = document.getElementById(`comment-edit-area-${commentId}`);
    const ta = document.getElementById(`comment-edit-ta-${commentId}`);
    const counter = document.getElementById(`comment-edit-counter-${commentId}`);
    if (!bodyEl || !editArea || !ta) return;

    // Pre-fill textarea with current text (decoded from escaped HTML)
    ta.value = bodyEl.textContent;
    counter.textContent = ta.value.length + '/2500';

    bodyEl.style.display = 'none';
    editArea.style.display = 'flex';
    ta.focus();
    ta.setSelectionRange(ta.value.length, ta.value.length);
};

window.saveEditedComment = async function (commentId, animeId, btnEl) {
    const ta = document.getElementById(`comment-edit-ta-${commentId}`);
    const bodyEl = document.getElementById(`comment-body-${commentId}`);
    const editArea = document.getElementById(`comment-edit-area-${commentId}`);
    const ratingInput = document.getElementById(`comment-edit-rating-${commentId}`);
    if (!ta || !bodyEl || !editArea) return;

    // Sanitize: strip HTML tags
    let newBody = ta.value.trim().replace(/<\/?[^>]+(>|$)/g, '');

    // Validate body
    if (newBody.length < 3) { ta.style.borderColor = '#e50914'; ta.focus(); return; }
    if (newBody.length > 2500) { ta.style.borderColor = '#e50914'; ta.focus(); return; }
    ta.style.borderColor = '#444';

    // Read + validate rating
    const rawRating = ratingInput ? parseInt(ratingInput.value) : NaN;
    const newRating = (!isNaN(rawRating) && rawRating >= 1 && rawRating <= 10) ? rawRating : null;

    btnEl.disabled = true;
    btnEl.textContent = 'Kaydediliyor...';

    const { data: updated, error } = await window.supabaseClient
        .from('comments')
        .update({ body: newBody, rating: newRating })
        .eq('id', commentId)
        .select('id')
        .single();

    btnEl.disabled = false;
    btnEl.textContent = 'Kaydet';

    if (error || !updated) {
        ta.style.borderColor = '#e50914';
        // Show visible error — likely missing UPDATE RLS policy in Supabase
        const counter = document.getElementById(`comment-edit-counter-${commentId}`);
        if (counter) counter.innerHTML = '<span style="color:#e50914">Kaydetme başarısız. Supabase UPDATE policy eksik olabilir.</span>';
        return;
    }

    // Update body text
    bodyEl.textContent = newBody;
    bodyEl.style.display = '';
    editArea.style.display = 'none';

    // Update rating badge in the header
    const headerRow = bodyEl.closest('div[style*="flex-grow"]')?.querySelector('div[style*="margin-bottom: 5px"]') ||
        bodyEl.parentElement?.querySelector('div[style*="margin-bottom: 5px"]');
    if (headerRow) {
        let badge = headerRow.querySelector('.comment-rating');
        if (newRating) {
            const badgeHTML = `<span class="comment-rating" style="display:inline-flex;align-items:center;gap:5px;font-size:0.85rem;font-weight:700;color:#e8e8e8;"><svg width="12" height="12" viewBox="0 0 24 24" fill="#e50914" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>${newRating}&nbsp;/&nbsp;10</span>`;
            if (badge) {
                badge.outerHTML = badgeHTML;
            } else {
                // Insert after the timeAgo span (second child)
                const timeSpan = headerRow.querySelectorAll('span')[1];
                if (timeSpan) timeSpan.insertAdjacentHTML('afterend', badgeHTML);
            }
        } else {
            if (badge) badge.remove();
        }
    }

    // Sync Yorumlarım page body if open
    const mirrorBody = document.querySelector(`.mycomment-item[data-comment-id="${commentId}"] .mycomment-body`);
    if (mirrorBody) mirrorBody.textContent = newBody;
};

window.cancelEditComment = function (commentId) {
    const bodyEl = document.getElementById(`comment-body-${commentId}`);
    const editArea = document.getElementById(`comment-edit-area-${commentId}`);
    if (!bodyEl || !editArea) return;
    bodyEl.style.display = '';
    editArea.style.display = 'none';
};

// --- Rating selector for comment form ---
window.selectRating = function (animeId, rating, clickedBtn) {
    const row = document.getElementById(`ratingRow-${animeId}`);
    if (!row) return;

    const current = parseInt(row.dataset.rating) || 0;
    // Click same rating again = deselect
    const newRating = (current === rating) ? 0 : rating;
    row.dataset.rating = newRating;

    row.querySelectorAll('button').forEach((btn, i) => {
        const val = i + 1;
        if (newRating > 0 && val <= newRating) {
            btn.style.background = '#e50914';
            btn.style.color = '#fff';
            btn.style.borderColor = '#e50914';
        } else {
            btn.style.background = '#1a1a1a';
            btn.style.color = '#888';
            btn.style.borderColor = '#444';
        }
    });
};

window.escapeHTML = function (str) {
    return (str || '').replace(/[&<>'"]/g,
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
};

document.addEventListener('DOMContentLoaded', () => {
    initApp();

    const plyrOptions = {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen']
    };
    if (document.getElementById('hamburgerPlayer1')) {
        new Plyr('#hamburgerPlayer1', plyrOptions);
    }
    if (document.getElementById('hamburgerPlayer2')) {
        new Plyr('#hamburgerPlayer2', plyrOptions);
    }
    // Comments load dynamically upon renderAnimeSections
});
