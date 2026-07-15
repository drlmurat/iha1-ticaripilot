# 🏆 Storyline 360 Veritabanı Gerektirmeyen Yerel Oyunlaştırma Modülü

Bu modül, Articulate Storyline 360 projelerinizde herhangi bir harici SQL veritabanı, sunucu bağlantısı veya LMS API kısıtlaması olmaksızın, tarayıcının **`localStorage`** API'si üzerinden çalışan **kalıcı bir Liderlik Tablosu (Leaderboard)** ve **Rozet/Yıldız Takip Sistemi** kurmanızı sağlar.

Modül, hem Storyline içinde bir **Web Object (Web Nesnesi)** olarak çalışabilir hem de Storyline'ın kendi arayüzü ile çift yönlü entegrasyon kurarak Storyline değişkenlerini otomatik olarak güncelleyebilir.

---

## 🏗️ 1. Storyline Değişkenleri (Variables) Kurulumu

Projenizde entegrasyonun çalışabilmesi için Articulate Storyline 360 içinde aşağıdaki değişkenleri (Variables) tam olarak gösterilen isim ve türlerle tanımlamanız gerekmektedir:

| Değişken Adı | Türü (Type) | Varsayılan Değer | Açıklama |
| :--- | :--- | :--- | :--- |
| `playerName` | Text | (Boş) | Oyuncunun giriş ekranında yazdığı isim. |
| `playerScore` | Number | 0 | Oyuncunun test boyunca topladığı güncel skor. |
| `rank1_name` ... `rank5_name` | Text | "-" | İlk 5 liderin isimlerini Storyline arayüzünde göstermek için. |
| `rank1_score` ... `rank5_score` | Number | 0 | İlk 5 liderin skorlarını Storyline arayüzünde göstermek için. |
| `badge_bronze` | True/False | False | Bronz rozet kazanım durumu (Skor >= 50). |
| `badge_silver` | True/False | False | Gümüş rozet kazanım durumu (Skor >= 80). |
| `badge_gold` | True/False | False | Altın rozet kazanım durumu (Skor == 100). |

---

## ⚡ 2. Storyline JS Tetikleyicileri (Triggers)

Storyline projenizde uygun olaylar tetiklendiğinde aşağıdaki JavaScript kod bloklarını **"Execute JavaScript"** tetikleyicisi olarak ekleyin:

### 📥 A. KOD 1: Liderlik Tablosunu Okuma ve Arayüze Yükleme
*   **Çalışma Zamanı**: Liderlik Tablosunun bulunduğu slayt veya sahne ilk yüklendiğinde (`When timeline starts on this slide`).
*   **Amaç**: Daha önce kaydedilmiş liderlik tablosu verilerini tarayıcıdan çekmek ve Storyline değişkenlerine aktararak Storyline ekrandaki tablonuzu doldurmak.

```javascript
try {
  // 1. Tarayıcının localStorage'ından veriyi çek
  var dbKey = 'sayid_edtech_leaderboard';
  var rawData = localStorage.getItem(dbKey);
  var leaderboardData = [];

  // 2. Eğer veri yoksa varsayılan 50 elemanlı boş şablon oluştur ve kaydet
  if (!rawData) {
    for (var i = 0; i < 50; i++) {
      leaderboardData.push({ name: "-", score: 0 });
    }
    localStorage.setItem(dbKey, JSON.stringify(leaderboardData));
  } else {
    leaderboardData = JSON.parse(rawData);
  }

  // 3. Storyline Player nesnesine eriş
  var player = GetPlayer();

  // 4. İlk 5 sıradaki ismi ve skoru Storyline değişkenlerine sırasıyla yazdır
  for (var index = 0; index < 5; index++) {
    var entry = leaderboardData[index] || { name: "-", score: 0 };
    var rankNum = index + 1;
    
    player.SetVar("rank" + rankNum + "_name", entry.name);
    player.SetVar("rank" + rankNum + "_score", entry.score);
  }

  console.log("Liderlik tablosu başarıyla yüklendi!");

} catch (error) {
  console.error("Storyline yerel leaderboard yükleme hatası: ", error);
}
```

### 💾 B. KOD 2: Yeni Skor Kaydetme, Sıralama ve Rozet Kontrolü
*   **Çalışma Zamanı**: Test tamamlandığında veya "Skoru Kaydet" butonuna tıklandığında (`When user clicks or when timeline starts on results slide`).
*   **Amaç**: Mevcut oyuncunun skoru ile ismini alıp yerel listedeki ilk 5'i güncellemek, listeyi büyükten küçüğe sıralamak, `localStorage`'a geri kaydetmek ve rozet durumlarını hesaplayıp Storyline'a göndermek.

```javascript
try {
  // 1. Storyline player nesnesi ve oyuncu bilgilerini oku
  var player = GetPlayer();
  var playerName = player.GetVar("playerName");
  var playerScore = player.GetVar("playerScore");

  // 2. Güvenlik Kontrolü: İsim boşsa işlemi sonlandır
  if (!playerName || playerName.trim() === '' || playerName.trim() === '-') {
    console.warn("Oyuncu ismi boş olduğu için puan liderlik tablosuna kaydedilmedi.");
  } else {
    var dbKey = 'sayid_edtech_leaderboard';
    var rawData = localStorage.getItem(dbKey);
    var leaderboardData = [];

    if (rawData) {
      leaderboardData = JSON.parse(rawData);
    } else {
      for (var i = 0; i < 50; i++) {
        leaderboardData.push({ name: "-", score: 0 });
      }
    }

    // 3. Yeni oyuncuyu diziye ekle
    leaderboardData.push({
      name: playerName,
      score: playerScore
    });

    // 4. Puanlara göre büyükten küçüğe sırala (descending)
    leaderboardData.sort(function(a, b) {
      return b.score - a.score;
    });

    // 5. En iyi 50 kayıt ile sınırla
    leaderboardData = leaderboardData.slice(0, 50);

    // 6. JSON string olarak localStorage'a geri kaydet
    localStorage.setItem(dbKey, JSON.stringify(leaderboardData));

    // 7. Arayüzün güncellenmesi için Storyline değişkenlerine geri yazdır
    for (var index = 0; index < 5; index++) {
      var entry = leaderboardData[index] || { name: "-", score: 0 };
      var rankNum = index + 1;
      
      player.SetVar("rank" + rankNum + "_name", entry.name);
      player.SetVar("rank" + rankNum + "_score", entry.score);
    }

    // 8. Oyuncu puanına göre rozet kontrolü yap
    var badgeBronze = playerScore >= 50;
    var badgeSilver = playerScore >= 80;
    var badgeGold = playerScore === 100;

    player.SetVar("badge_bronze", badgeBronze);
    player.SetVar("badge_silver", badgeSilver);
    player.SetVar("badge_gold", badgeGold);

    console.log("Skor başarıyla kaydedildi ve sıralandı!");
  }

} catch (error) {
  console.error("Storyline yerel leaderboard kaydetme hatası: ", error);
}
```

### ⚡ C. KOD 3: Moodle / LMS SCORM Not Defteri Raporlayıcı (Zorunlu Gradebook Tetikleyicisi)
*   **Çalışma Zamanı**: Sınav tamamlandığında (Özet sayfasında "Skor Tablosuna Git" butonuna tıklandığında veya slayt sonunda).
*   **Amaç**: Web Nesnesi iframe'inden gelen yüzdelik başarı puanını (`lms_score_raw`) ve ders başarım durumunu (`lms_lesson_status`) Moodle'ın SCORM motoruna zorla yazmak ve kaydetmek. CORS güvenlik kısıtlamalarını aşmak için bu kodun doğrudan Storyline'ın kendi tetikleyicisi olarak çalıştırılması önerilir.

```javascript
try {
  var player = GetPlayer();
  var percentage = player.GetVar("lms_score_raw") || 0; // iframe'den gelen taban puan yüzdesi (% olarak, örn: 80)
  var status = player.GetVar("lms_lesson_status") || "passed"; // "passed" veya "failed"

  console.log("Storyline'dan Moodle'a skor gönderiliyor... Yüzde: %" + percentage + ", Durum: " + status);

  // 1. Katman: Storyline Global SCORM Fonksiyonları (En kararlı ve Moodle uyumlu yöntem)
  if (typeof SCORM_SetScore === 'function') {
    SCORM_SetScore(percentage, 100, 0);
    SCORM_SetStatus(status);
    if (typeof SCORM_CommitData === 'function') SCORM_CommitData();
    console.log("SCORM_SetScore üzerinden başarıyla kaydedildi.");
  } else if (typeof SCORM2004_SetScore === 'function') {
    SCORM2004_SetScore(percentage, 100, 0);
    SCORM2004_SetStatus(status);
    if (typeof SCORM2004_CommitData === 'function') SCORM2004_CommitData();
    console.log("SCORM2004_SetScore üzerinden başarıyla kaydedildi.");
  } else if (typeof lmsAPI !== 'undefined' && typeof lmsAPI.SetScore === 'function') {
    lmsAPI.SetScore(percentage, 100, 0);
    lmsAPI.SetStatus(status);
    if (typeof lmsAPI.CommitData === 'function') {
      lmsAPI.CommitData();
    }
    console.log("lmsAPI.SetScore üzerinden başarıyla kaydedildi.");
  } else {
    // 2. Katman: Alternatif doğrudan SCORM API erişimi (Yerel / iframe dışı)
    var findAPI = function(win) {
      var maxTries = 10;
      var currentWin = win;
      while (currentWin && maxTries > 0) {
        try {
          if (currentWin.API) return currentWin.API;
          if (currentWin.API_1484_11) return currentWin.API_1484_11;
        } catch(e) {}
        if (currentWin.parent && currentWin.parent !== currentWin) currentWin = currentWin.parent;
        else if (currentWin.opener) currentWin = currentWin.opener;
        else break;
        maxTries--;
      }
      return null;
    };
    var api = findAPI(window);
    if (api) {
      if (typeof api.SetValue === 'function') { // SCORM 2004
        api.SetValue("cmi.score.raw", percentage);
        api.SetValue("cmi.score.max", 100);
        api.SetValue("cmi.score.min", 0);
        api.SetValue("cmi.score.scaled", percentage / 100);
        api.SetValue("cmi.completion_status", "completed");
        api.SetValue("cmi.success_status", status);
        api.Commit("");
      } else if (typeof api.LMSSetValue === 'function') { // SCORM 1.2
        api.LMSSetValue("cmi.core.score.raw", percentage);
        api.LMSSetValue("cmi.core.score.max", 100);
        api.LMSSetValue("cmi.core.score.min", 0);
        api.LMSSetValue("cmi.core.lesson_status", status);
        api.LMSCommit("");
      }
      console.log("Doğrudan SCORM API üzerinden başarıyla kaydedildi.");
    } else {
      console.warn("SCORM API bulunamadı, yerel moddasınız.");
    }
  }
} catch (error) {
  console.error("Storyline Moodle/SCORM puan gönderme hatası: ", error);
}
```

---

## 🎨 3. Storyline Arayüzünde Gösterim Tasarımı

*   **Liderlik Tablosu Slaytı**: Storyline slaytında 5 adet metin kutusu oluşturun ve bunları `%rank1_name% - %rank1_score%` şeklinde değişkenlere bağlayın.
*   **Rozetler / Başarılar**: Arayüze şık rozet görselleri yerleştirin ve bunların varsayılan durumunu (State) `Hidden` veya `Disabled` yapın. Yazdığımız kodlarla tetiklenen `badge_bronze`, `badge_silver`, `badge_gold` değişkenleri **True** olduğunda durumlarını `Normal` hale getiren basit tetikleyiciler ekleyin.

---

## 🔌 4. Web Object (Web Nesnesi) Olarak Entegrasyon

Uygulamanın şık ve modern tam arayüzünü doğrudan Storyline içinde bir slayt üzerinde göstermek isterseniz:
1. Storyline menüsünden **Insert > Web Object** yolunu izleyin.
2. Açılan pencerede **Address** kısmına, bu klasörün (`c:\wamp64\www\articulate\consultant\leaderboard`) yerel yolunu gösterin veya klasörü seçin.
3. Modül Storyline içinde bir iframe olarak yüklenecektir.
4. Gömülü çalıştığı esnada modül, Storyline değişkenleriyle (`playerName` ve `playerScore`) anlık olarak çift yönlü senkronize olacak ve arka plandaki `localStorage` tablonuzu otomatik besleyecektir.
5. Modülün sağ alt köşesindeki **Storyline Konsolu** butonuna tıklayarak Storyline değişkenlerinin emülasyon durumlarını anlık takip edebilir ve entegrasyon testlerini kolayca yapabilirsiniz. (Yayınlanmadan önce bu butonu `app.js` içerisinden gizleyebilir veya entegrasyonu tamamen Storyline arayüzüne devredebilirsiniz).

---

## ⚙️ 5. Dinamik Soru Bankası (`questions.json`) Düzenleme

Sınav modülümüzün soruları tamamen dinamik hale getirilmiştir. Kodlama bilgisine ihtiyaç duymadan soruları ve şıkları değiştirmek için:
1. Klasördeki **`questions.json`** dosyasını Notepad (Not Defteri) veya VS Code gibi bir metin düzenleyiciyle açın.
2. Dosya içerisindeki soru metinlerini (`question`), şıkları (`choices`) ve sıfır tabanlı (0: A, 1: B, 2: C, 3: D) olarak doğru cevap indeksini (`correct`) güncelleyip kaydedin.
3. **Güvenli Fallback Yapısı**: Tarayıcının güvenlik engelleri nedeniyle JSON dosyası okunamasa bile uygulama otomatik olarak `app.js` içerisine gömülü olan varsayılan yerel soruları devreye sokar. Bu sayede modül her koşulda sıfır hata ile çalışmaya devam eder.

---

## ⚙️ 6. Dinamik Oyunlaştırma Ayarları (`config.json` & Storyline Aşımı)

Oyunlaştırma ve sınav mekaniklerini (süre sınırları, puanlama kuralları ve rozet eşikleri) kod yazmadan iki farklı yolla yönetebilirsiniz:

### Yöntem 1: Harici `config.json` Düzenleme
Klasördeki `config.json` dosyasını açarak parametreleri güncelleyebilirsiniz:
*   `useTimer` (true/false): Süre sınırının aktif olup olmayacağını belirtir.
*   `timerSeconds` (Sayı): Her soru için tanınan süreyi (saniye) belirler.
*   `useTimeBonus` (true/false): Doğru cevaplarda kalan sürenin (saniye cinsinden) ek bonus puan olarak eklenmesini sağlar (Hızlı cevaplayanlara avantaj kazandırır).
*   `pointsRule` ("flat" veya "difficultyBased"): Puanlamanın sabit mi yoksa zorluğa göre mi yapılacağını seçer.
*   `flatPointsPerQuestion` (Sayı): Sabit puan kuralı seçilirse soru başına kazanılacak puan.
*   `easyPoints` / `mediumPoints` / `hardPoints` / `veryHardPoints` (Sayı): Zorluk seviyesine göre kazanılacak puanlar (kolay, orta, zor, çok zor).
*   `bronzePercent` / `silverPercent` / `goldPercent` (Sayı - Yüzde): Rozetleri kazanmak için gerekli olan minimum başarı yüzdesi.

### Yöntem 2: Storyline 360 Değişkenleri ile Aşma (Overrides)
Eğer dosyaları düzenlemek istemiyorsanız, Storyline 360 projenizde aşağıdaki isimlerle değişkenler oluşturup bunlara değer atamanız yeterlidir. JavaScript kodumuz bu değişkenleri algıladığı anda **`config.json` dosyasındaki ayarları otomatik olarak ezer**:
*   `config_useTimer` (True/False)
*   `config_timerSeconds` (Number)
*   `config_useTimeBonus` (True/False)
*   `config_pointsRule` (Text - "flat" veya "difficultyBased")
*   `config_flatPointsPerQuestion` (Number)
*   `config_easyPoints`, `config_mediumPoints`, `config_hardPoints`, `config_veryHardPoints` (Number)
*   `config_bronzePercent`, `config_silverPercent`, `config_goldPercent` (Number)


---

## 📊 7. LMS & Moodle Raporlama (SCORM 1.2 / 2004)

Uygulamanın sınav modülü tamamlandığında, kullanıcının skorunu, sınav başarımını (Geçti/Kaldı) Moodle gibi LMS sistemlerine **çift katmanlı bir güvenlik yapısı** ile raporlar:

### 1. Katman: Storyline Değişkenleri Üzerinden (Natif Raporlama)
*   Sınav bittiğinde skor Storyline'ın `playerScore` değişkenine yazılır.
*   Storyline projenizde oluşturacağınız bir **"Results Slide (Sonuç Slaytı)"**, bu `playerScore` değişkenini takip ederek standart SCORM paketleme motoruyla puanı ve Geçti/Kaldı (`passed`/`failed`) durumunu LMS'e raporlar. Bu yöntem en kararlı ve standart yöntemdir.

### 2. Katman: Doğrudan SCORM API Bağlantısı (Otomatik Algılama)
Uygulama, Storyline'ın ve tarayıcı pencerelerinin parent yapılarını tarayarak aktif bir SCORM API sürücüsü arar. Bulduğu anda doğrudan Moodle/LMS ile konuşmaya başlar:
*   **Storyline Sürücüsü (`lmsAPI`):** Storyline'ın kendi LMS API sürücüsünü algılar ve `lmsAPI.SetScore(score, max, 0)` ile `lmsAPI.SetStatus("passed"/"failed")` metotlarını çalıştırarak doğrudan veri yazar.
*   **SCORM 2004 Standartı:** `cmi.score.raw`, `cmi.score.max`, `cmi.score.scaled`, `cmi.success_status` ("passed"/"failed") ve `cmi.completion_status` ("completed") alanlarını doğrudan raporlar.
*   **SCORM 1.2 Standartı:** `cmi.core.score.raw`, `cmi.core.score.max`, `cmi.core.lesson_status` ("passed"/"failed") alanlarını doğrudan raporlar ve `LMSCommit("")` ile verileri kaydeder.

### 🖥️ Konsoldan Canlı Rapor İzleme
Sağ alttaki **Storyline Konsolu** > **Değişkenler** sekmesinden Moodle/LMS'e gönderilen verileri canlı olarak görebilirsiniz:
*   `%lms_lesson_status%`: LMS'e gönderilen durum ("passed" veya "failed").
*   `%lms_score_raw%`: LMS'e gönderilen ham puan (örneğin 130).
*   `%lms_score_scaled%`: LMS'e gönderilen yüzdelik normalize skor (örneğin %86 başarı için 0.8667).

---

## 🌟 Önemli Notlar ve İpuçları
*   **Güvenli Hata Kontrolleri (Try-Catch)**: Kodlarımızın tamamı hata önleyici try-catch blokları ile sarmalanmıştır. Bu sayede tarayıcının yerel depolama alanı devre dışı olsa veya Storyline dışı bir tarayıcıda test ediliyor olsa dahi kodlar asla hata vermez ve sessizce çalışmaya devam eder.
*   **Offline/LMS Uyumluluğu**: Hiçbir harici CDN veya internet bağlantısı gerektirmez. Google Fonts kütüphanesi haricindeki tüm kod, stil ve animasyon dosyaları tamamen yerel ve çevrimdışı (offline) çalışacak şekilde tasarlanmıştır. Bu, SCORM paketlerinizin tüm yerel sunucularda ve kurumsal intranetlerde hatasız çalışmasını garanti eder.



