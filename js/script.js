const animeDatabase = {
    'Attack on Titan': {
        desc: 'İnsanlığın devasa duvarlar arkasına çekilip "Titan" adı verilen devasa varlıklardan korunduğu bir dünyada,Eren Yeager ve arkadaşları duvarın yıkılmasıyla trajik bir mücadeleye atılırlar.',
        rating: '9.1',
        pelinRating: '10',
        completed: true
    },
    'Plastic Memories': {
        desc: 'İnsan duygularını mükemmel bir şekilde taklit edebilen Giftia adlı androidlerin üretildiği bir gelecekte, bu varlıkların bir "son kullanma tarihi" vardır. Tsukasa Mizugaki, bu androidleri sahiplerinden nazikçe geri almakla görevli olan Terminal Servis\'e katılır.',
        rating: '7.4',
        pelinRating: '2'
    },
    'Bleach': {
        desc: 'Kurosaki Ichigo, ruhları görebilen sıradan bir lise öğrencisiyken, bir kaza sonucu Yaralı bir Ölüm Tanrısı (Shinigami) olan Rukia Kuchiki\'nin güçlerini devralır ve ruhlar dünyasının koruyucusu olur.',
        rating: '8.2',
        pelinRating: 'TBA'
    },
    'Chainsaw Man': {
        desc: 'Denji\'nin basit bir rüyası var - mutlu ve huzurlu bir yaşam yaşamak, sevdiği bir kızla vakit geçirmek. Bununla birlikte, Denji Yakuza tarafından ezici borçlarını ödemek için şeytanları öldürmeye zorlandığı için bu gerçeklikten çok uzaktır. Evcil Şeytan Pochita\'yı silah olarak kullanarak, biraz nakit için her şeyi yapmaya hazır.',
        rating: '8.4',
        pelinRating: 'TBA'
    },
    'Naruto': {
        desc: 'İçinde mühürlenmiş olan Dokuz Kuyruklu Tilki nedeniyle köylüleri tarafından dışlanan genç ninja Naruto Uzumaki\'nin, köyün lideri olan Hokage olma hayalinin ve kendini kanıtlama çabasının hikayesidir.',
        rating: '8.4',
        pelinRating: 'TBA'
    },
    'One Punch Man': {
        desc: 'Saitama, hobi olarak kahramanlık yapan inanılmaz güçlü bir adamdır. O kadar güçlüdür ki, en zorlu rakiplerini bile tek bir yumrukla yener, bu da onu büyük bir boşluğa sürükler.',
        rating: '8.7',
        pelinRating: 'TBA'
    },
    'Evangelion': {
        desc: 'Dünya, "Melek" adı verilen devasa varlıklar tarafından tehdit edilmektedir. İnsanlığın son umudu olan EVA adlı dev robotları kullanmak için seçilen gençlerin psikolojik travmalarını konu alır.',
        rating: '8.5',
        pelinRating: 'TBA'
    },
    'Death Note': {
        desc: 'Dahi bir lise öğrencisi olan Light Yagami, üzerine ismini yazdığı kişinin öleceği gizemli bir defter bulur. Light, bu güçle dünyayı suçlulardan temizlemeye karar verir.',
        rating: '8.9',
        pelinRating: 'TBA'
    },
    'Black Clover': {
        desc: 'Herkesin büyü güçleriyle doğduğu bir dünyada, büyü kullanamayan tek kişi olan Asta, pes etmeyerek en büyük büyücü olan "Büyücü Kral" olma yolunda savaşır.',
        rating: '8.3',
        pelinRating: 'TBA'
    },
    'Charlotte': {
        desc: 'Dünyada ergenlik dönemindeki az sayıda çocuk, bir meteor tozunun etkisiyle geçici süper güçler kazanır. Yuu Otosaka, bu güçleri kendi çıkarları için kullanırken Hoshinoumi Akademisi ile tanışır.',
        rating: '7.5',
        pelinRating: 'TBA'
    },
    'Hunter x Hunter': {
        desc: 'Gon Freecss, öldüğünü sandığı babasının aslında dünyanın en büyük "Avcı"larından biri olduğunu öğrenir ve babasını bulmak için Avcı sınavına girer.',
        rating: '9.0',
        pelinRating: 'TBA'
    },
    'Jujutsu Kaisen': {
        desc: 'İnsanların negatif duygularından beslenen "Lanetler", dünyada dehşet saçmaktadır. Yuji Itadori, lanetli bir tılsımı yutarak kendisini bu karanlık dünyanın içinde bulur.',
        rating: '8.5',
        pelinRating: 'TBA'
    },
    'Gachiakuta': {
        desc: 'Cennetten atılan çöplerin altında yaşayan insanların bulunduğu bir dünyada, haksız yere suçlanarak "Uçuruma" atılan Ludo\'nun hayatta kalma ve intikam mücadelesi.',
        rating: 'TBA',
        pelinRating: 'TBA'
    },
    'One Piece': {
        desc: 'Monkey D. Luffy, vücudu lastik gibi esneyebilen genç bir çocuktur. Efsanevi hazine One Piece\'i bularak Korsanlar Kralı olmak için arkadaşlarıyla beraber büyük bir maceraya atılır.',
        rating: '9.0',
        pelinRating: 'TBA'
    },
    'Fullmetal Alchemist: Brotherhood': {
        desc: 'Edward ve Alphonse Elric kardeşler, ölen annelerini geri getirmek için simyanın en büyük tabusunu çiğnerler ve bunun bedelini ağır öderler. Vücutlarını geri almak için Felsefe Taşı\'nın peşine düşerler.',
        rating: '9.1',
        pelinRating: 'TBA'
    },
    'Guilty Crown': {
        desc: '2039 yılında Japonya, "Kıyamet Virüsü"nün ardından bir dış otorite tarafından kontrol edilmektedir. Shu Ouma, insanların "Ruhlarını" silaha dönüştürme gücünü kazanınca direnişe katılır.',
        rating: '7.1',
        pelinRating: 'TBA'
    }
};


// Chainsaw Man Episodes (12 episodes)
const chainsawManEpisodes = [
    { id: 1, title: "Bölüm 1", source: "https://inorix-3.asia/file/tau-video/f51a939a-37a2-4a5b-90da-7ebd5d4067ff.mp4", rating: "8.6" },
    { id: 2, title: "Bölüm 2", source: "https://shurami-4.asia/file/tau-video/38097425-869b-473b-8275-69ad6ec7dc5f.mp4", rating: "7.9" },
    { id: 3, title: "Bölüm 3", source: "https://pixel-quirk.shop/file/tau-video/7a0760e4-2347-4827-aed8-61d4814c1d57.mp4", rating: "8.5" },
    { id: 4, title: "Bölüm 4", source: "", rating: "8.3" },
    { id: 5, title: "Bölüm 5", source: "", rating: "8.2" },
    { id: 6, title: "Bölüm 6", source: "", rating: "8.4" },
    { id: 7, title: "Bölüm 7", source: "", rating: "8.0" },
    { id: 8, title: "Bölüm 8", source: "", rating: "9.4" },
    { id: 9, title: "Bölüm 9", source: "", rating: "9.2" },
    { id: 10, title: "Bölüm 10", source: "", rating: "8.1" },
    { id: 11, title: "Bölüm 11", source: "", rating: "8.3" },
    { id: 12, title: "Bölüm 12", source: "", rating: "8.8" },
];

// Bleach State Management
let bleachCurrentSeason = 1;
let bleachCurrentRangeStart = 1;

// Bleach Episodes 1-200 (add your source links below)
const bleachEpisodes = [
    { id: 1, title: "Bölüm 1: Shinigami Olduğum Gün", source: "https://voxen-2.asia/file/tau-video/e886a847-b053-4ac3-a660-ebd1c154ceb0.mp4", rating: "7.7" },
    { id: 2, title: "Bölüm 2: Shinigami'nin İşi", source: "https://tsuriko-2.asia/file/tau-video/82a5d2a3-3ccb-4d43-9776-fb9394c435a5.mp4", rating: "7.4" },
    { id: 3, title: "Bölüm 3: Ağabey'in Dileği, Kız Kardeşin Dileği", source: "https://kiryuuin.icu/file/tau-video/ef599b12-e623-4786-97e4-2d8cab07c4f9.mp4", rating: "7.7" },
    { id: 4, title: "Bölüm 4: Lanetli Muhabbet Kuşu", source: "https://killarya.icu/file/tau-video/4e7c7a65-8864-4011-8870-c7c2bc727ac8.mp4", rating: "7.4" },
    { id: 5, title: "Bölüm 5: Görünmez Düşmanı Yen!", source: "https://kamadotanjiro.cfd/file/tau-video/dac5bd38-35e6-4537-9114-0170c5332ac8.mp4", rating: "7.7" },
    { id: 6, title: "Bölüm 6: Ölümüne Dövüş! Ichigo vs. Ichigo", source: "https://midorane-4.asia/file/tau-video/0e8d0cb0-675d-40e8-a372-de94d93eacb4.mp4", rating: "7.4" },
    { id: 7, title: "Bölüm 7: Selamlar, Bir Peluş Oyuncaktan", source: "https://zappy-net.online/file/tau-video/f4591315-a39b-4b36-9ae4-8d1410c49aa5.mp4", rating: "7.5" },
    { id: 8, title: "Bölüm 8: 17 Haziran, Yağmurdaki Anı", source: "https://pixel-quirk.online/file/tau-video/adace405-c01a-4d5c-92bf-5040ac66bf9e.mp4", rating: "7.6" },
    { id: 9, title: "Bölüm 9: Yenilmez Düşman", source: "https://rhyzoku-4.asia/file/tau-video/7f6f40ec-8221-443f-910d-1beed28173ca.mp4", rating: "8.1" },
    { id: 10, title: "Bölüm 10: Hayalet Hastaneye Hücum!", source: "https://zorami-2.asia/file/tau-video/92a5bf87-b367-4782-bffa-63657e214c05.mp4", rating: "7.1" },
    { id: 11, title: "Bölüm 11: Efsanevi Quincy", source: "https://kitsurai-3.asia/file/tau-video/f6536a6b-d814-4950-9186-fedd07fce3f0.mp4", rating: "7.4" },
    { id: 12, title: "Bölüm 12: Nazik Sağ Kol", source: "https://inorix-1.asia/file/tau-video/40bc6902-e141-40a8-b407-ec9e9beab57d.mp4", rating: "7.7" },
    { id: 13, title: "Bölüm 13: Çiçek ve Hollow", source: "https://arukane-4.asia/file/tau-video/4f8df5e7-f25c-48f6-8627-89db90edb863.mp4", rating: "7.4" },
    { id: 14, title: "Bölüm 14: Sırt Sırta, Ölümüne Dövüş!", source: "https://shurami-4.asia/file/tau-video/88924e48-0164-42a1-b7c5-374168dd4fcf.mp4", rating: "8.1" },
    { id: 15, title: "Bölüm 15: Kon'un Büyük Planı", source: "https://yuuta.cfd/file/tau-video/ce538b75-eb4e-41ef-830d-2a614e9e2fb8.mp4", rating: "7.1" },
    { id: 16, title: "Bölüm 16: Abaı Renji Karşılaşması!", source: "https://yorugen-4.asia/file/tau-video/1a3e6b4f-d1f8-43c3-9d8a-cd95411c0967.mp4", rating: "8.1" },
    { id: 17, title: "Bölüm 17: Ichigo Bu!", source: "https://yhwach.icu/file/tau-video/901aaf57-323b-4b80-9d49-3def1966da4a.mp4", rating: "8.6" },
    { id: 18, title: "Bölüm 18: Geri Al! Shinigami Gücü!", source: "https://yhwach.asia/file/tau-video/3dd60e7a-f157-4f64-94ce-dac839a2d771.mp4", rating: "7.7" },
    { id: 19, title: "Bölüm 19: Ichigo'nun Dönüşümü!", source: "https://yasutorasado.cfd/file/tau-video/208bbc0f-299d-474c-bf59-c8ce8bab4089.mp4", rating: "8.5" },
    { id: 20, title: "Bölüm 20: Ichimaru Gin'in Gölgesi", source: "https://uryuishida.cyou/file/tau-video/b42f67c4-84d1-4176-9800-989d0f0f822f.mp4", rating: "8.2" },
    { id: 21, title: "Bölüm 21: Soul Society'e Giriş", source: "https://zappy-net.shop/file/tau-video/a393c85e-2c4e-474f-9125-a9cc8bc97dda.mp4" },
    { id: 22, title: "Bölüm 22: Shinigami'den Nefret Eden Adam", source: "" },
    { id: 23, title: "Bölüm 23: Rukia'nın İdamına 14 Gün Kala", source: "" },
    { id: 24, title: "Bölüm 24: Toplanma! 13 Takım", source: "" },
    { id: 25, title: "Bölüm 25: Büyük Bir Patlamayla Merkeze Dalmak?", source: "" },
    { id: 26, title: "Bölüm 26: Oluşum! En Kötü Etiket", source: "" },
    { id: 27, title: "Bölüm 27: Ölümcül Darbeyi Vur!", source: "" },
    { id: 28, title: "Bölüm 28: Hedeflenen Orihime", source: "" },
    { id: 29, title: "Bölüm 29: Atılım! Shinigami'nin Kuşatma Ağı", source: "" },
    { id: 30, title: "Bölüm 30: Renji'nin Yüzleşmesi", source: "" },
    { id: 31, title: "Bölüm 31: Renji'nin Kararlılığı", source: "" },
    { id: 32, title: "Bölüm 32: Yıldız ve Sokak Köpeği", source: "" },
    { id: 33, title: "Bölüm 33: Mucize! Gizemli Yeni Kahraman", source: "" },
    { id: 34, title: "Bölüm 34: Trajedi Şafağı", source: "" },
    { id: 35, title: "Bölüm 35: Aizen Suikastı! Karanlık Yaklaşıyor", source: "" },
    { id: 36, title: "Bölüm 36: Kenpachi Zaraki Yaklaşıyor!", source: "" },
    { id: 37, title: "Bölüm 37: Savaşın Sebebi", source: "" },
    { id: 38, title: "Bölüm 38: Umutsuzluk! Kırılan Zangetsu", source: "" },
    { id: 39, title: "Bölüm 39: Ölümsüz Adam", source: "" },
    { id: 40, title: "Bölüm 40: Gantetsu'nun Gördüğü Shinigami", source: "" },
    { id: 41, title: "Bölüm 41: Yeniden Buluşma, Ichigo ve Rukia", source: "" },
    { id: 42, title: "Bölüm 42: Yoruichi, Dans Eden Tanrıça!", source: "" },
    { id: 43, title: "Bölüm 43: Kötü Shinigami", source: "" },
    { id: 44, title: "Bölüm 44: Ishida'nın En Büyük Gücü!", source: "" },
    { id: 45, title: "Bölüm 45: Sınırları Zorla!", source: "" },
    { id: 46, title: "Bölüm 46: Akademi Günlerinin Gerçek Hatırası", source: "" },
    { id: 47, title: "Bölüm 47: İntikamcılar", source: "" },
    { id: 48, title: "Bölüm 48: Hitsugaya, Kükre!", source: "" },
    { id: 49, title: "Bölüm 49: Rukia'nın Kabusu", source: "" },
    { id: 50, title: "Bölüm 50: Uyanan Ejderha", source: "" },
    { id: 51, title: "Bölüm 51: İdam Sabahı", source: "" },
    { id: 52, title: "Bölüm 52: Renji vs. Byakuya", source: "" },
    { id: 53, title: "Bölüm 53: Ichimaru Gin'in Günahı", source: "" },
    { id: 54, title: "Bölüm 54: Gerçekleşen Bir Yemin! Rukia'yı Kurtar!", source: "" },
    { id: 55, title: "Bölüm 55: En Güçlü Shinigami Birliği! Guru ve Öğrenci", source: "" },
    { id: 56, title: "Bölüm 56: Süper Hızlı Savaş! Dövüşün Tanrıçasını Seç!", source: "" },
    { id: 57, title: "Bölüm 57: Bin Kiraz Çiçeği! Zangetsu Gökyüzüne Yükseliyor", source: "" },
    { id: 58, title: "Bölüm 58: Serbest Bırak! Siyah Kılıç, Mucizevi Güç", source: "" },
    { id: 59, title: "Bölüm 59: İdamın Sonucu! Ichigo vs. Byakuya", source: "" },
    { id: 60, title: "Bölüm 60: Aizen'in Tuzağı", source: "" },
    { id: 61, title: "Bölüm 61: Rukia'nın Kurtarılışı", source: "" },
    { id: 62, title: "Bölüm 62: Tüm Shinigamiler Toplanıyor!", source: "" },
    { id: 63, title: "Bölüm 63: Momo'nun Kararlılığı", source: "" },
    { id: 64, title: "Bölüm 64: Aizen'in İhaneti ve Korkunç Hırsı", source: "" },
    { id: 65, title: "Bölüm 65: Soul Society'de Vedalaşma", source: "" },
    { id: 66, title: "Bölüm 66: Yeni Dönem! Karakura Şehri'ne Dönüş", source: "" },
    { id: 67, title: "Bölüm 67: Saldıran Bountlar!", source: "" },
    { id: 68, title: "Bölüm 68: Gizemli Kadın, Yoshino", source: "" },
    { id: 69, title: "Bölüm 69: Bount Saldırısı! Büyük Yıkım", source: "" },
    { id: 70, title: "Bölüm 70: Ishida vs. Yoshino", source: "" },
    { id: 71, title: "Bölüm 71: Karakura Şehri'nde Panik", source: "" },
    { id: 72, title: "Bölüm 72: Su ve Havai Fişekler!", source: "" },
    { id: 73, title: "Bölüm 73: Ichigo vs. Ririn", source: "" },
    { id: 74, title: "Bölüm 74: Bountlar'ın Malikanesine Saldırı!", source: "" },
    { id: 75, title: "Bölüm 75: Büyük Patlama! Suikastçı Ekibi", source: "" },
    { id: 76, title: "Bölüm 76: Ishida'nın Kaybı ve Shinigami Dönüşü", source: "" },
    { id: 77, title: "Bölüm 77: Sınırların Ötesindeki Güç!", source: "" },
    { id: 78, title: "Bölüm 78: Karakura Şehri Shinigamileri Toplanıyor", source: "" },
    { id: 79, title: "Bölüm 79: Savaş Alanında Ölüm Şoku!", source: "" },
    { id: 80, title: "Bölüm 80: Kötü Şöhretli Bountların Sonu", source: "" },
    { id: 81, title: "Bölüm 81: Gözetleme Kulesine Sızma!", source: "" },
    { id: 82, title: "Bölüm 82: Soul Society'de Savaş Başlıyor", source: "" },
    { id: 83, title: "Bölüm 83: Yoshino'nun Sonu", source: "" },
    { id: 84, title: "Bölüm 84: Rukia'nın Dönüşü ve Shinigami İntikamı", source: "" },
    { id: 85, title: "Bölüm 85: Byakuya vs. Kariya", source: "" },
    { id: 86, title: "Bölüm 86: Sınırları Zorlayan Shinigami Gücü", source: "" },
    { id: 87, title: "Bölüm 87: Kariya'nın Gizli Silahı", source: "" },
    { id: 88, title: "Bölüm 88: Rukia'nın Kurtuluşu İçin Savaş!", source: "" },
    { id: 89, title: "Bölüm 89: Ishida vs. Kariya", source: "" },
    { id: 90, title: "Bölüm 90: Sıcak Savaşın Sonu", source: "" },
    { id: 91, title: "Bölüm 91: Byakuya'nın Sırrı", source: "" },
    { id: 92, title: "Bölüm 92: Bountların Gerçek Hedefi", source: "" },
    { id: 93, title: "Bölüm 93: En Güçlü Bount Kariya!", source: "" },
    { id: 94, title: "Bölüm 94: Ichigo vs. Jin Kariya", source: "" },
    { id: 95, title: "Bölüm 95: Hitsugaya vs. Maki Ichinose", source: "" },
    { id: 96, title: "Bölüm 96: Maki Ichinose'nin Geçmişi", source: "" },
    { id: 97, title: "Bölüm 97: Ichigo ve Byakuya'nın Ortak Savaşı", source: "" },
    { id: 98, title: "Bölüm 98: Aizen'in Kılıcı", source: "" },
    { id: 99, title: "Bölüm 99: Renji'nin Mücadelesi", source: "" },
    { id: 100, title: "Bölüm 100: En Son Karşılaşma", source: "" },
    { id: 101, title: "Bölüm 101: Kariya'nın Sonu", source: "" },
    { id: 102, title: "Bölüm 102: Ichigo'nun Seçimi", source: "" },
    { id: 103, title: "Bölüm 103: Vizardlar Geliyor!", source: "" },
    { id: 104, title: "Bölüm 104: Ulquiorra'nın Saldırısı", source: "" },
    { id: 105, title: "Bölüm 105: Yammy vs. Ichigo", source: "" },
    { id: 106, title: "Bölüm 106: Orihime Tehlikede!", source: "" },
    { id: 107, title: "Bölüm 107: Grimmjow Jeagerjaquez", source: "" },
    { id: 108, title: "Bölüm 108: Hitsugaya'nın Ekibi Karakura'da", source: "" },
    { id: 109, title: "Bölüm 109: Ikkaku vs. Edrad", source: "" },
    { id: 110, title: "Bölüm 110: Madarame Ikkaku'nun Bankai'si", source: "" },
    { id: 111, title: "Bölüm 111: Hitsugaya vs. Shawlong", source: "" },
    { id: 112, title: "Bölüm 112: Rangiku vs. Nakim", source: "" },
    { id: 113, title: "Bölüm 113: Grimmjow vs. Ichigo", source: "" },
    { id: 114, title: "Bölüm 114: Ichigo'nun Hollow Gücü", source: "" },
    { id: 115, title: "Bölüm 115: Shinigami ve Vizardların Eğitimi", source: "" },
    { id: 116, title: "Bölüm 116: Ichigo vs. Shinji Hirako", source: "" },
    { id: 117, title: "Bölüm 117: Orihime'nin Kararlılığı", source: "" },
    { id: 118, title: "Bölüm 118: Hollow Dünyasına Giriş", source: "" },
    { id: 119, title: "Bölüm 119: Espadalar Toplanıyor", source: "" },
    { id: 120, title: "Bölüm 120: Ulquiorra ve Orihime", source: "" },
    { id: 121, title: "Bölüm 121: Hueco Mundo'ya Yolculuk", source: "" },
    { id: 122, title: "Bölüm 122: Ichigo vs. Dordoni", source: "" },
    { id: 123, title: "Bölüm 123: Cirucci vs. Ishida", source: "" },
    { id: 124, title: "Bölüm 124: Pesche ve Dondochakka", source: "" },
    { id: 125, title: "Bölüm 125: Gantenbainne vs. Chad", source: "" },
    { id: 126, title: "Bölüm 126: Rukia vs. Aaroniero", source: "" },
    { id: 127, title: "Bölüm 127: Kaien Shiba'nın Hatırası", source: "" },
    { id: 128, title: "Bölüm 128: Ishida ve Renji vs. Szayelaporro", source: "" },
    { id: 129, title: "Bölüm 129: Grimmjow'un Serbest Kalışı", source: "" },
    { id: 130, title: "Bölüm 130: Ichigo vs. Grimmjow", source: "" },
    { id: 131, title: "Bölüm 131: Grimmjow'un Sonu", source: "" },
    { id: 132, title: "Bölüm 132: Nel'in Gerçek Formu", source: "" },
    { id: 133, title: "Bölüm 133: Nnoitra vs. Ichigo", source: "" },
    { id: 134, title: "Bölüm 134: Kenpachi Zaraki'nin Gelişi", source: "" },
    { id: 135, title: "Bölüm 135: En Güçlü Kılıç Ustası", source: "" },
    { id: 136, title: "Bölüm 136: Byakuya Kuchiki vs. Zommari", source: "" },
    { id: 137, title: "Bölüm 137: Mayuri Kurotsuchi vs. Szayelaporro", source: "" },
    { id: 138, title: "Bölüm 138: Yachiru'nun Öfkesi", source: "" },
    { id: 139, title: "Bölüm 139: Amagai Shusuke'nin İhaneti", source: "" },
    { id: 140, title: "Bölüm 140: Yeni Kaptan Geliyor", source: "" },
    { id: 141, title: "Bölüm 141: Karakura Şehri'nde Suikast", source: "" },
    { id: 142, title: "Bölüm 142: Üçüncü Takım'ın Sırrı", source: "" },
    { id: 143, title: "Bölüm 143: Kasumi-Oji Ailesi", source: "" },
    { id: 144, title: "Bölüm 144: Ichigo vs. Amagai", source: "" },
    { id: 145, title: "Bölüm 145: Bakoto'nun Gücü", source: "" },
    { id: 146, title: "Bölüm 146: Soul Society'de İsyan", source: "" },
    { id: 147, title: "Bölüm 147: Hitsugaya'nın Kararı", source: "" },
    { id: 148, title: "Bölüm 148: Kenpachi vs. Enryu", source: "" },
    { id: 149, title: "Bölüm 149: Amagai'nin İntikamı", source: "" },
    { id: 150, title: "Bölüm 150: Kibune'nin Sonu", source: "" },
    { id: 151, title: "Bölüm 151: Prenses Rurichiyo", source: "" },
    { id: 152, title: "Bölüm 152: Ichigo'nun Son Savaşı", source: "" },
    { id: 153, title: "Bölüm 153: Amagai'nin Sonu", source: "" },
    { id: 154, title: "Bölüm 154: 110 Yıl Önceki Geçmiş", source: "" },
    { id: 155, title: "Bölüm 155: Shinji Hirako ve Aizen", source: "" },
    { id: 156, title: "Bölüm 156: Urahara Kisuke'nin Kaptanlığı", source: "" },
    { id: 157, title: "Bölüm 157: Vizardların Doğuşu", source: "" },
    { id: 158, title: "Bölüm 158: Aizen'in Gerçek Yüzü", source: "" },
    { id: 159, title: "Bölüm 159: Karakura Şehri'nde Hazırlık", source: "" },
    { id: 160, title: "Bölüm 160: Ichigo ve Ishida'nın Dönüşü", source: "" },
    { id: 161, title: "Bölüm 161: Hueco Mundo'da Yeni Savaş", source: "" },
    { id: 162, title: "Bölüm 162: Ulquiorra vs. Ichigo: Başlangıç", source: "" },
    { id: 163, title: "Bölüm 163: Loly ve Menoly", source: "" },
    { id: 164, title: "Bölüm 164: Yammy'nin Gücü", source: "" },
    { id: 165, title: "Bölüm 165: Karakura Şehri'nde Büyük Savaş", source: "" },
    { id: 166, title: "Bölüm 166: Espada No.1: Starrk", source: "" },
    { id: 167, title: "Bölüm 167: Hitsugaya vs. Halibel", source: "" },
    { id: 168, title: "Bölüm 168: Soi Fon vs. Barragan", source: "" },
    { id: 169, title: "Bölüm 169: Kyoraku vs. Starrk", source: "" },
    { id: 170, title: "Bölüm 170: Ukitake'nin Mücadelesi", source: "" },
    { id: 171, title: "Bölüm 171: Aizen vs. Gotei 13", source: "" },
    { id: 172, title: "Bölüm 172: Ichigo'nun Yeni Hollow Formu", source: "" },
    { id: 173, title: "Bölüm 173: Ulquiorra'nın Son Anları", source: "" },
    { id: 174, title: "Bölüm 174: Ichigo vs. Yammy", source: "" },
    { id: 175, title: "Bölüm 175: Unohana Retsu'nun Gelişi", source: "" },
    { id: 176, title: "Bölüm 176: Kenpachi ve Byakuya vs. Yammy", source: "" },
    { id: 177, title: "Bölüm 177: Aizen'in Planı Devam Ediyor", source: "" },
    { id: 178, title: "Bölüm 178: Ichigo'nun Karakura'ya Dönüşü", source: "" },
    { id: 179, title: "Bölüm 179: Isshin Kurosaki'nin Sırrı", source: "" },
    { id: 180, title: "Bölüm 180: Final Getsuga Tensho", source: "" },
    { id: 181, title: "Bölüm 181: Aizen'in Evrimi", source: "" },
    { id: 182, title: "Bölüm 182: Ichigo vs. Aizen: Karar Anı", source: "" },
    { id: 183, title: "Bölüm 183: Mugetsu", source: "" },
    { id: 184, title: "Bölüm 184: Aizen'in Mühürlenmesi", source: "" },
    { id: 185, title: "Bölüm 185: Ichigo'nun Gücünü Kaybedişi", source: "" },
    { id: 186, title: "Bölüm 186: Soul Society'de Huzur", source: "" },
    { id: 187, title: "Bölüm 187: Yeni Bir Başlangıç", source: "" },
    { id: 188, title: "Bölüm 188: Bleach Macerası", source: "" },
    { id: 189, title: "Bölüm 189: Bleach Macerası", source: "" },
    { id: 190, title: "Bölüm 190: Bleach Macerası", source: "" },
    { id: 191, title: "Bölüm 191: Bleach Macerası", source: "" },
    { id: 192, title: "Bölüm 192: Bleach Macerası", source: "" },
    { id: 193, title: "Bölüm 193: Bleach Macerası", source: "" },
    { id: 194, title: "Bölüm 194: Bleach Macerası", source: "" },
    { id: 195, title: "Bölüm 195: Bleach Macerası", source: "" },
    { id: 196, title: "Bölüm 196: Bleach Macerası", source: "" },
    { id: 197, title: "Bölüm 197: Bleach Macerası", source: "" },
    { id: 198, title: "Bölüm 198: Bleach Macerası", source: "" },
    { id: 199, title: "Bölüm 199: Bleach Macerası", source: "" },
    { id: 200, title: "Bölüm 200: Bleach Macerası", source: "" },
    { id: 201, title: "Bölüm 201: Bleach Macerası", source: "" },
    { id: 202, title: "Bölüm 202: Bleach Macerası", source: "" },
    { id: 203, title: "Bölüm 203: Bleach Macerası", source: "" },
    { id: 204, title: "Bölüm 204: Bleach Macerası", source: "" },
    { id: 205, title: "Bölüm 205: Bleach Macerası", source: "" },
    { id: 206, title: "Bölüm 206: Bleach Macerası", source: "" },
    { id: 207, title: "Bölüm 207: Bleach Macerası", source: "" },
    { id: 208, title: "Bölüm 208: Bleach Macerası", source: "" },
    { id: 209, title: "Bölüm 209: Bleach Macerası", source: "" },
    { id: 210, title: "Bölüm 210: Bleach Macerası", source: "" },
    { id: 211, title: "Bölüm 211: Bleach Macerası", source: "" },
    { id: 212, title: "Bölüm 212: Bleach Macerası", source: "" },
    { id: 213, title: "Bölüm 213: Bleach Macerası", source: "" },
    { id: 214, title: "Bölüm 214: Bleach Macerası", source: "" },
    { id: 215, title: "Bölüm 215: Bleach Macerası", source: "" },
    { id: 216, title: "Bölüm 216: Bleach Macerası", source: "" },
    { id: 217, title: "Bölüm 217: Bleach Macerası", source: "" },
    { id: 218, title: "Bölüm 218: Bleach Macerası", source: "" },
    { id: 219, title: "Bölüm 219: Bleach Macerası", source: "" },
    { id: 220, title: "Bölüm 220: Bleach Macerası", source: "" },
    { id: 221, title: "Bölüm 221: Bleach Macerası", source: "" },
    { id: 222, title: "Bölüm 222: Bleach Macerası", source: "" },
    { id: 223, title: "Bölüm 223: Bleach Macerası", source: "" },
    { id: 224, title: "Bölüm 224: Bleach Macerası", source: "" },
    { id: 225, title: "Bölüm 225: Bleach Macerası", source: "" },
    { id: 226, title: "Bölüm 226: Bleach Macerası", source: "" },
    { id: 227, title: "Bölüm 227: Bleach Macerası", source: "" },
    { id: 228, title: "Bölüm 228: Bleach Macerası", source: "" },
    { id: 229, title: "Bölüm 229: Bleach Macerası", source: "" },
    { id: 230, title: "Bölüm 230: Bleach Macerası", source: "" },
    { id: 231, title: "Bölüm 231: Bleach Macerası", source: "" },
    { id: 232, title: "Bölüm 232: Bleach Macerası", source: "" },
    { id: 233, title: "Bölüm 233: Bleach Macerası", source: "" },
    { id: 234, title: "Bölüm 234: Bleach Macerası", source: "" },
    { id: 235, title: "Bölüm 235: Bleach Macerası", source: "" },
    { id: 236, title: "Bölüm 236: Bleach Macerası", source: "" },
    { id: 237, title: "Bölüm 237: Bleach Macerası", source: "" },
    { id: 238, title: "Bölüm 238: Bleach Macerası", source: "" },
    { id: 239, title: "Bölüm 239: Bleach Macerası", source: "" },
    { id: 240, title: "Bölüm 240: Bleach Macerası", source: "" },
    { id: 241, title: "Bölüm 241: Bleach Macerası", source: "" },
    { id: 242, title: "Bölüm 242: Bleach Macerası", source: "" },
    { id: 243, title: "Bölüm 243: Bleach Macerası", source: "" },
    { id: 244, title: "Bölüm 244: Bleach Macerası", source: "" },
    { id: 245, title: "Bölüm 245: Bleach Macerası", source: "" },
    { id: 246, title: "Bölüm 246: Bleach Macerası", source: "" },
    { id: 247, title: "Bölüm 247: Bleach Macerası", source: "" },
    { id: 248, title: "Bölüm 248: Bleach Macerası", source: "" },
    { id: 249, title: "Bölüm 249: Bleach Macerası", source: "" },
    { id: 250, title: "Bölüm 250: Bleach Macerası", source: "" },
    { id: 251, title: "Bölüm 251: Bleach Macerası", source: "" },
    { id: 252, title: "Bölüm 252: Bleach Macerası", source: "" },
    { id: 253, title: "Bölüm 253: Bleach Macerası", source: "" },
    { id: 254, title: "Bölüm 254: Bleach Macerası", source: "" },
    { id: 255, title: "Bölüm 255: Bleach Macerası", source: "" },
    { id: 256, title: "Bölüm 256: Bleach Macerası", source: "" },
    { id: 257, title: "Bölüm 257: Bleach Macerası", source: "" },
    { id: 258, title: "Bölüm 258: Bleach Macerası", source: "" },
    { id: 259, title: "Bölüm 259: Bleach Macerası", source: "" },
    { id: 260, title: "Bölüm 260: Bleach Macerası", source: "" },
    { id: 261, title: "Bölüm 261: Bleach Macerası", source: "" },
    { id: 262, title: "Bölüm 262: Bleach Macerası", source: "" },
    { id: 263, title: "Bölüm 263: Bleach Macerası", source: "" },
    { id: 264, title: "Bölüm 264: Bleach Macerası", source: "" },
    { id: 265, title: "Bölüm 265: Bleach Macerası", source: "" },
    { id: 266, title: "Bölüm 266: Bleach Macerası", source: "" },
    { id: 267, title: "Bölüm 267: Bleach Macerası", source: "" },
    { id: 268, title: "Bölüm 268: Bleach Macerası", source: "" },
    { id: 269, title: "Bölüm 269: Bleach Macerası", source: "" },
    { id: 270, title: "Bölüm 270: Bleach Macerası", source: "" },
    { id: 271, title: "Bölüm 271: Bleach Macerası", source: "" },
    { id: 272, title: "Bölüm 272: Bleach Macerası", source: "" },
    { id: 273, title: "Bölüm 273: Bleach Macerası", source: "" },
    { id: 274, title: "Bölüm 274: Bleach Macerası", source: "" },
    { id: 275, title: "Bölüm 275: Bleach Macerası", source: "" },
    { id: 276, title: "Bölüm 276: Bleach Macerası", source: "" },
    { id: 277, title: "Bölüm 277: Bleach Macerası", source: "" },
    { id: 278, title: "Bölüm 278: Bleach Macerası", source: "" },
    { id: 279, title: "Bölüm 279: Bleach Macerası", source: "" },
    { id: 280, title: "Bölüm 280: Bleach Macerası", source: "" },
    { id: 281, title: "Bölüm 281: Bleach Macerası", source: "" },
    { id: 282, title: "Bölüm 282: Bleach Macerası", source: "" },
    { id: 283, title: "Bölüm 283: Bleach Macerası", source: "" },
    { id: 284, title: "Bölüm 284: Bleach Macerası", source: "" },
    { id: 285, title: "Bölüm 285: Bleach Macerası", source: "" },
    { id: 286, title: "Bölüm 286: Bleach Macerası", source: "" },
    { id: 287, title: "Bölüm 287: Bleach Macerası", source: "" },
    { id: 288, title: "Bölüm 288: Bleach Macerası", source: "" },
    { id: 289, title: "Bölüm 289: Bleach Macerası", source: "" },
    { id: 290, title: "Bölüm 290: Bleach Macerası", source: "" },
    { id: 291, title: "Bölüm 291: Bleach Macerası", source: "" },
    { id: 292, title: "Bölüm 292: Bleach Macerası", source: "" },
    { id: 293, title: "Bölüm 293: Bleach Macerası", source: "" },
    { id: 294, title: "Bölüm 294: Bleach Macerası", source: "" },
    { id: 295, title: "Bölüm 295: Bleach Macerası", source: "" },
    { id: 296, title: "Bölüm 296: Bleach Macerası", source: "" },
    { id: 297, title: "Bölüm 297: Bleach Macerası", source: "" },
    { id: 298, title: "Bölüm 298: Bleach Macerası", source: "" },
    { id: 299, title: "Bölüm 299: Bleach Macerası", source: "" },
    { id: 300, title: "Bölüm 300: Bleach Macerası", source: "" },
    { id: 301, title: "Bölüm 301: Bleach Macerası", source: "" },
    { id: 302, title: "Bölüm 302: Bleach Macerası", source: "" },
    { id: 303, title: "Bölüm 303: Bleach Macerası", source: "" },
    { id: 304, title: "Bölüm 304: Bleach Macerası", source: "" },
    { id: 305, title: "Bölüm 305: Bleach Macerası", source: "" },
    { id: 306, title: "Bölüm 306: Bleach Macerası", source: "" },
    { id: 307, title: "Bölüm 307: Bleach Macerası", source: "" },
    { id: 308, title: "Bölüm 308: Bleach Macerası", source: "" },
    { id: 309, title: "Bölüm 309: Bleach Macerası", source: "" },
    { id: 310, title: "Bölüm 310: Bleach Macerası", source: "" },
    { id: 311, title: "Bölüm 311: Bleach Macerası", source: "" },
    { id: 312, title: "Bölüm 312: Bleach Macerası", source: "" },
    { id: 313, title: "Bölüm 313: Bleach Macerası", source: "" },
    { id: 314, title: "Bölüm 314: Bleach Macerası", source: "" },
    { id: 315, title: "Bölüm 315: Bleach Macerası", source: "" },
    { id: 316, title: "Bölüm 316: Bleach Macerası", source: "" },
    { id: 317, title: "Bölüm 317: Bleach Macerası", source: "" },
    { id: 318, title: "Bölüm 318: Bleach Macerası", source: "" },
    { id: 319, title: "Bölüm 319: Bleach Macerası", source: "" },
    { id: 320, title: "Bölüm 320: Bleach Macerası", source: "" },
    { id: 321, title: "Bölüm 321: Bleach Macerası", source: "" },
    { id: 322, title: "Bölüm 322: Bleach Macerası", source: "" },
    { id: 323, title: "Bölüm 323: Bleach Macerası", source: "" },
    { id: 324, title: "Bölüm 324: Bleach Macerası", source: "" },
    { id: 325, title: "Bölüm 325: Bleach Macerası", source: "" },
    { id: 326, title: "Bölüm 326: Bleach Macerası", source: "" },
    { id: 327, title: "Bölüm 327: Bleach Macerası", source: "" },
    { id: 328, title: "Bölüm 328: Bleach Macerası", source: "" },
    { id: 329, title: "Bölüm 329: Bleach Macerası", source: "" },
    { id: 330, title: "Bölüm 330: Bleach Macerası", source: "" },
    { id: 331, title: "Bölüm 331: Bleach Macerası", source: "" },
    { id: 332, title: "Bölüm 332: Bleach Macerası", source: "" },
    { id: 333, title: "Bölüm 333: Bleach Macerası", source: "" },
    { id: 334, title: "Bölüm 334: Bleach Macerası", source: "" },
    { id: 335, title: "Bölüm 335: Bleach Macerası", source: "" },
    { id: 336, title: "Bölüm 336: Bleach Macerası", source: "" },
    { id: 337, title: "Bölüm 337: Bleach Macerası", source: "" },
    { id: 338, title: "Bölüm 338: Bleach Macerası", source: "" },
    { id: 339, title: "Bölüm 339: Bleach Macerası", source: "" },
    { id: 340, title: "Bölüm 340: Bleach Macerası", source: "" },
    { id: 341, title: "Bölüm 341: Bleach Macerası", source: "" },
    { id: 342, title: "Bölüm 342: Bleach Macerası", source: "" },
    { id: 343, title: "Bölüm 343: Bleach Macerası", source: "" },
    { id: 344, title: "Bölüm 344: Bleach Macerası", source: "" },
    { id: 345, title: "Bölüm 345: Bleach Macerası", source: "" },
    { id: 346, title: "Bölüm 346: Bleach Macerası", source: "" },
    { id: 347, title: "Bölüm 347: Bleach Macerası", source: "" },
    { id: 348, title: "Bölüm 348: Bleach Macerası", source: "" },
    { id: 349, title: "Bölüm 349: Bleach Macerası", source: "" },
    { id: 350, title: "Bölüm 350: Bleach Macerası", source: "" },
    { id: 351, title: "Bölüm 351: Bleach Macerası", source: "" },
    { id: 352, title: "Bölüm 352: Bleach Macerası", source: "" },
    { id: 353, title: "Bölüm 353: Bleach Macerası", source: "" },
    { id: 354, title: "Bölüm 354: Bleach Macerası", source: "" },
    { id: 355, title: "Bölüm 355: Bleach Macerası", source: "" },
    { id: 356, title: "Bölüm 356: Bleach Macerası", source: "" },
    { id: 357, title: "Bölüm 357: Bleach Macerası", source: "" },
    { id: 358, title: "Bölüm 358: Bleach Macerası", source: "" },
    { id: 359, title: "Bölüm 359: Bleach Macerası", source: "" },
    { id: 360, title: "Bölüm 360: Bleach Macerası", source: "" },
    { id: 361, title: "Bölüm 361: Bleach Macerası", source: "" },
    { id: 362, title: "Bölüm 362: Bleach Macerası", source: "" },
    { id: 363, title: "Bölüm 363: Bleach Macerası", source: "" },
    { id: 364, title: "Bölüm 364: Bleach Macerası", source: "" },
    { id: 365, title: "Bölüm 365: Bleach Macerası", source: "" },
    { id: 366, title: "Bölüm 366: Bleach Macerası", source: "" },
    { id: 367, title: "Bölüm 367: Bleach Macerası", source: "" },
    { id: 368, title: "Bölüm 368: Bleach Macerası", source: "" },
    { id: 369, title: "Bölüm 369: Bleach Macerası", source: "" },
    { id: 370, title: "Bölüm 370: Bleach Macerası", source: "" },
    { id: 371, title: "Bölüm 371: Bleach Macerası", source: "" },
    { id: 372, title: "Bölüm 372: Bleach Macerası", source: "" },
    { id: 373, title: "Bölüm 373: Bleach Macerası", source: "" },
    { id: 374, title: "Bölüm 374: Bleach Macerası", source: "" },
    { id: 375, title: "Bölüm 375: Bleach Macerası", source: "" },
    { id: 376, title: "Bölüm 376: Bleach Macerası", source: "" },
    { id: 377, title: "Bölüm 377: Bleach Macerası", source: "" },
    { id: 378, title: "Bölüm 378: Bleach Macerası", source: "" },
    { id: 379, title: "Bölüm 379: Bleach Macerası", source: "" },
    { id: 380, title: "Bölüm 380: Bleach Macerası", source: "" },
    { id: 381, title: "Bölüm 381: Bleach Macerası", source: "" },
    { id: 382, title: "Bölüm 382: Bleach Macerası", source: "" },
    { id: 383, title: "Bölüm 383: Bleach Macerası", source: "" },
    { id: 384, title: "Bölüm 384: Bleach Macerası", source: "" },
    { id: 385, title: "Bölüm 385: Bleach Macerası", source: "" },
    { id: 386, title: "Bölüm 386: Bleach Macerası", source: "" },
    { id: 387, title: "Bölüm 387: Bleach Macerası", source: "" },
    { id: 388, title: "Bölüm 388: Bleach Macerası", source: "" },
    { id: 389, title: "Bölüm 389: Bleach Macerası", source: "" },
    { id: 390, title: "Bölüm 390: Bleach Macerası", source: "" },
    { id: 391, title: "Bölüm 391: Bleach Macerası", source: "" },
    { id: 392, title: "Bölüm 392: Bleach Macerası", source: "" },
    { id: 393, title: "Bölüm 393: Bleach Macerası", source: "" },
    { id: 394, title: "Bölüm 394: Bleach Macerası", source: "" },
    { id: 395, title: "Bölüm 395: Bleach Macerası", source: "" },
    { id: 396, title: "Bölüm 396: Bleach Macerası", source: "" },
    { id: 397, title: "Bölüm 397: Bleach Macerası", source: "" },
    { id: 398, title: "Bölüm 398: Bleach Macerası", source: "" },
    { id: 399, title: "Bölüm 399: Bleach Macerası", source: "" },
    { id: 400, title: "Bölüm 400: Bleach Macerası", source: "" },
];


const episodeGridChainsawMan = document.getElementById('episodeGridChainsawMan');
const episodeGridBleach = document.getElementById('episodeGridBleach');
const bleachRangeSelector = document.getElementById('bleachRangeSelector');
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
const skipIntroBtn = document.getElementById('skipIntroBtn');
let currentVideoId = null;
let currentAnimeName = null;
let lastSaveTime = 0;
let isVideoLoaded = false;

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
    gridElement.innerHTML = '';
    episodes.forEach((ep, index) => {
        const episodeId = ep.id || `ep-${index + 1}`;
        const isWatched = isEpisodeWatched(animeName, episodeId);

        const card = document.createElement('div');
        card.className = `episode-card ${isWatched ? 'watched' : ''}`;
        card.setAttribute('data-anime', animeName);
        card.setAttribute('data-episode-id', episodeId);

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
                <div class="ep-rating-box">
                    EP Rate: <strong>${ep.rating ? ep.rating : 'TBA'} / 10</strong>
                </div>
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

// --- Bleach Specific Functions ---
function handleBleachSeasonChange(season) {
    bleachCurrentSeason = parseInt(season);
    const seasonStarts = { 1: 1, 2: 101, 3: 201, 4: 301 };
    bleachCurrentRangeStart = seasonStarts[bleachCurrentSeason];
    renderBleachControls();
    renderBleachEpisodes();
}

function handleBleachRangeChange(start) {
    bleachCurrentRangeStart = start;
    renderBleachControls();
    renderBleachEpisodes();
}

function renderBleachControls() {
    bleachRangeSelector.innerHTML = '';
    const seasonStarts = { 1: 1, 2: 101, 3: 201, 4: 301 };
    const seasonEnds = { 1: 100, 2: 200, 3: 300, 4: 400 };
    const seasonStart = seasonStarts[bleachCurrentSeason];
    const seasonEnd = seasonEnds[bleachCurrentSeason];

    for (let i = seasonStart; i <= seasonEnd; i += 20) {
        const end = i + 19;
        const btn = document.createElement('button');
        btn.className = `range-btn ${bleachCurrentRangeStart === i ? 'active' : ''}`;
        btn.textContent = `${i}–${end}`;
        btn.onclick = () => handleBleachRangeChange(i);
        bleachRangeSelector.appendChild(btn);
    }
}

function renderBleachEpisodes() {
    const filtered = bleachEpisodes.filter(ep =>
        ep.id >= bleachCurrentRangeStart && ep.id < bleachCurrentRangeStart + 20
    );
    createEpisodeCards(filtered, episodeGridBleach, "Bleach");
}

// --- Chainsaw Man Specific Functions ---
function renderChainsawManEpisodes() {
    createEpisodeCards(chainsawManEpisodes, episodeGridChainsawMan, 'Chainsaw Man');
}

// --- Watchlist Management ---
const watchlistData = [
    { title: "Attack on Titan", watched: true },
    { title: "Plastic Memories", watched: true },
    { title: "Berserk", watched: true },
    { title: "Bleach", watched: false },
    { title: "Chainsaw Man", watched: false },
    { title: "Kakegurui", watched: false },
    { title: "Death Parade", watched: false },
    { title: "Hell's Paradise", watched: false },
    { title: "The Cockpit", watched: false },
    { title: "No Game No Life", watched: false },
    { title: "Death Note", watched: false },
    { title: "One Punch Man", watched: false },
    { title: "Vinland Saga", watched: false },
    { title: "Neon Genesis Evangelion", watched: false },
    { title: "Guilty Crown", watched: false },
    { title: "Steins;Gate", watched: false },
    { title: "Jujutsu Kaisen", watched: false },
    { title: "Seven Deadly Sins", watched: false },
    { title: "Fullmetal Alchemist Brotherhood", watched: false },
    { title: "Parasyte", watched: false },
    { title: "Demon Slayer", watched: false },
    { title: "Monster", watched: false },
    { title: "Black Clover", watched: false },
    { title: "Naruto", watched: false },
    { title: "Hunter x Hunter", watched: false },
    { title: "Gachiakuta", watched: false },
    { title: "One Piece", watched: false }
];

// --- Core App Functions ---
function initApp() {

    // Initialize Plyr
    plyrInstance = new Plyr('#player', {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen']
    });

    // Skip Intro and Resume Playback Logic
    plyrInstance.on('timeupdate', event => {
        const currentTime = plyrInstance.currentTime;
        if (currentTime > 0 && currentTime < 105 && currentAnimeName !== 'Chainsaw Man') {
            skipIntroBtn.classList.add('show');
        } else {
            skipIntroBtn.classList.remove('show');
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

    skipIntroBtn.addEventListener('click', () => {
        plyrInstance.currentTime = 105;
        skipIntroBtn.classList.remove('show');
    });

    renderBleachControls();
    renderBleachEpisodes();
    renderChainsawManEpisodes();

    watchlistItems.innerHTML = '';
    watchlistData.forEach(item => {
        const name = item.title;
        const isWatched = item.watched;

        const li = document.createElement('li');
        li.className = isWatched ? 'completed' : '';
        li.setAttribute('data-anime-name', name);

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
            showAnimeInfo(name);
        };

        watchlistItems.appendChild(li);
    });
}

function switchSection(sectionId, element) {
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    if (element) element.classList.add('active');
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showAnimeInfo(name) {
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
document.onkeydown = (e) => { if (e.key === 'Escape') closeModal(); };

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

document.addEventListener('DOMContentLoaded', initApp);
