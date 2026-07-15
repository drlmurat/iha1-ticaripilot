# Proje Şartnamesi: Storyline 360 Veritabanı Gerektirmeyen Yerel Oyunlaştırma Modülü
*(Sayid Özcan için özel IDE Geliştirme Kılavuzu)*

Bu kılavuz, Storyline 360 projelerinizde harici bir veritabanı veya sunucu (LMS kısıtlamaları olmadan) kullanmadan, tarayıcının `localStorage` API'si üzerinden kalıcı bir **Liderlik Tablosu (Leaderboard)** ve **Rozet/Yıldız Takip Sistemi** kurmanız için teknik mimariyi ve IDE'nizde kullanabileceğiniz yapay zeka promptunu içerir.

---

## 🏗️ 1. Sistem Mimarisi ve Storyline Değişkenleri (Variables)

Storyline projenizde oluşturmanız gereken temel değişkenler şunlardır:

| Değişken Adı | Türü | Varsayılan Değer | Açıklama |
| :--- | :--- | :--- | :--- |
| `playerName` | Text | (Boş) | Oyuncunun giriş ekranında yazdığı isim. |
| `playerScore` | Number | 0 | Oyuncunun oyun/quiz boyunca topladığı güncel skor. |
| `rank1_name` ... `rank5_name` | Text | "-" | İlk 5 liderin isimlerini arayüzde göstermek için. |
| `rank1_score` ... `rank5_score` | Number | 0 | İlk 5 liderin skorlarını arayüzde göstermek için. |
| `badge_bronze` / `badge_silver` / `badge_gold` | True/False | False | Kazanılan rozetlerin kilit durumları. |

---

## ⚡ 2. Storyline JS Tetikleyicileri (Triggers)

### A. Giriş / Açılış Tetikleyicisi (Slayt Yüklendiğinde)
*   **Amaç**: Daha önce kaydedilmiş liderlik tablosu verilerini tarayıcıdan çekmek ve Storyline değişkenlerine aktararak ekrandaki tabloyu doldurmak.
*   **Tetikleyici Zamanı**: İlk slayt (Liderlik Tablosu ekranı) yüklendiğinde.

### B. Kayıt / Gönderim Tetikleyicisi (Oyun Bittiğinde)
*   **Amaç**: Mevcut oyuncunun skoru ile ismini alıp yerel veritabanındaki listeye eklemek, listeyi büyükten küçüğe sıralayıp ilk 5'i güncellemek ve `localStorage`'a geri kaydetmek.
*   **Tetikleyici Zamanı**: Quiz tamamlandığında veya "Skoru Kaydet" butonuna tıklandığında.

---

## 🤖 3. IDE Yapay Zeka Promptu (AI Prompt for Coding)

Aşağıdaki promptu kendi IDE'nizdeki yapay zeka asistanına (Claude, Gemini veya VS Code Copilot) vererek Storyline tetikleyicilerinde kullanacağınız **hatasız, performanslı ve güvenli Javascript kodlarını** üretebilirsiniz.

### 📋 KOPYALA - YAPIŞTIR PROMPTU:
```text
Sen Storyline 360 ve Javascript entegrasyonu konusunda uzmanlaşmış kıdemli bir EdTech yazılım mimarısın. 
Storyline 360 projelerinde JS Triggers (Javascript Tetikleyicileri) olarak kullanılmak üzere iki ayrı JavaScript kodu yazmanı istiyorum. Kodlar tarayıcının `localStorage` API'si ile Storyline değişkenleri (GetPlayer metodu) arasında veri alışverişi yapacak.

Lokal Veritabanı Anahtarı: 'sayid_edtech_leaderboard'

GEREKSİNİMLER VE KODLAR:

KOD 1: LİDERLİK TABLOSUNU OKUMA VE ARAYÜZE YÜKLEME (Slayt Açılışında Çalışacak)
1. Tarayıcının `localStorage`'ından 'sayid_edtech_leaderboard' anahtarlı veriyi çek.
2. Eğer veri yoksa, 5 adet varsayılan boş veri (isim: "-", skor: 0) içeren bir JSON dizisi oluştur ve bunu kaydet.
3. Çekilen JSON verisini parse et.
4. Storyline player nesnesine eriş (`GetPlayer()`).
5. İlk 5 sıradaki ismi ve skoru Storyline'daki `rank1_name`, `rank1_score` ... `rank5_name`, `rank5_score` değişkenlerine sırasıyla yazdır. (Örn: player.SetVar("rank1_name", data[0].name)).

KOD 2: YENİ SKOR KAYDETME VE SIRALAMA (Skor Gönderildiğinde Çalışacak)
1. Storyline'daki `playerName` ve `playerScore` değişkenlerini `GetPlayer().GetVar()` ile oku.
2. Eğer oyuncu ismi boşsa ya da skor geçersizse işlemi güvenli bir şekilde iptal et.
3. `localStorage`'dan mevcut liderlik tablosu dizisini çek.
4. Yeni oyuncunun ismi ve skorunu bu diziye ekle `{name: playerName, score: playerScore}`.
5. Diziyi skorlara göre büyükten küçüğe (descending) sırala.
6. Diziyi en yüksek ilk 5 skorla sınırla (slice 0, 5).
7. Güncellenen ilk 5'lik diziyi JSON string olarak 'sayid_edtech_leaderboard' anahtarıyla `localStorage`'a geri kaydet.
8. Arayüzün güncellenmesi için güncel ilk 5 sıralama verisini Storyline değişkenlerine (`rank1_name` vb.) tekrar yaz.
9. Oyuncunun skoruna göre rozet kontrolü yap:
   - Skor >= 50 ise `badge_bronze` = true yap.
   - Skor >= 80 ise `badge_silver` = true yap.
   - Skor == 100 ise `badge_gold` = true yap.
   - Bu rozet durumlarını da `player.SetVar` ile Storyline'a gönder.

Önemli Kurallar:
- Kodlar son derece temiz, ES6+ uyumlu ve Storyline JS motorunun hata vermeyeceği şekilde yazılmalı.
- Try-catch blokları ile tarayıcı uyumsuzluğu veya boş veri hataları (null safety) tamamen kontrol altına alınmalı.
- Kodların başına ve kritik satırlarına açıklayıcı Türkçe yorum satırları ekle.
```

---

## 🎨 4. Tasarım Önerisi (Storyline Arayüzü İçin)
*   **Açılış Ekranı**: Şık, koyu arka planlı bir form. Oyuncu adını girip "Başla" butonuna basar.
*   **Oyun Alanı**: 5 soruluk eğlenceli bir e-öğrenme genel kültür testi. Her doğru soru 20 puan kazandırır.
*   **Liderlik Tablosu Ekranı**: Altın, gümüş ve bronz renk detaylarıyla süslenmiş bir ilk 5 listesi kartı. Değişkenler dinamik olarak metin kutularına (`%rank1_name%` - `%rank1_score%`) bağlanır. Rozet durumları (badge_gold vb.) tetikleyicilerle görünür hale gelen (State: Normal) şık rozet ikonları ile temsil edilir.
