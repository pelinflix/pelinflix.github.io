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

window.toggleCurrentlyWatching = function(catId, isWatching) {
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
        { episodes: episodesList.guiltyCrown, gridId: 'episodeGridGuiltyCrown', animeName: 'Guilty Crown' }
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
        'guiltycrown': { gridId: 'episodeGridGuiltyCrown', title: 'Guilty Crown', titleSuffix: ' (2011)' }
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
        `;

        container.appendChild(section);
    });
}

// Global filter function
window.filterSeason = function(gridId, seasonNum) {
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


document.addEventListener('DOMContentLoaded', () => {
    initApp();

    // Initialize Plyr for hamburger page videos
    const plyrOptions = {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen']
    };
    if (document.getElementById('hamburgerPlayer1')) {
        new Plyr('#hamburgerPlayer1', plyrOptions);
    }
    if (document.getElementById('hamburgerPlayer2')) {
        new Plyr('#hamburgerPlayer2', plyrOptions);
    }
});
