# lovemalaysiabot 🇲🇾

Chatbot pendidikan interaktif untuk membantu murid sekolah rendah belajar **Rukun Negara** — tersedia sebagai **Web Chat** dan **Telegram Bot**.

> **No LLM API** — sepenuhnya rule-based, berjalan secara tempatan atau di mana-mana hosting statik.

---

## 📁 Struktur Projek

```
sejarahmate/
├── bot-engine.js      ← Otak bersama (rule-based, guna oleh web & Telegram)
├── index.html         ← Web chatbot (buka terus dalam browser)
├── telegram-bot.js    ← Telegram Bot (Node.js)
├── package.json       ← Dependencies Telegram bot
├── .env.example       ← Template token BotFather
└── README.md
```

---

## 🌐 1. Web Chatbot

### Cara Guna (Pantas)
Hanya buka `index.html` dalam browser — **tiada pemasangan, tiada server**.

```bash
# Windows
start sejarahmate/index.html

# Mac / Linux
open sejarahmate/index.html
```

### Ciri-ciri Web
- ✅ Antara muka chat responsif dengan warna tema Malaysia (merah & biru)
- ✅ Butang topik quick-reply (1–6)
- ✅ Butang jawapan kuiz A/B/C/D + Petunjuk
- ✅ Suis bahasa dalam header (BM ↔ EN)
- ✅ Animasi "menaip" (typing indicator)
- ✅ Sesuai untuk desktop dan mudah alih

---

## 📱 2. Telegram Bot

### Langkah 1 — Dapatkan Token dari BotFather

1. Buka Telegram, cari **@BotFather**
2. Hantar `/newbot`
3. Pilih nama bot: `lovemalaysiabot` (atau nama lain)
4. Salin token yang diberikan

### Langkah 2 — Persediaan

```bash
cd sejarahmate

# Pasang dependencies
npm install

# Salin fail persekitaran
copy .env.example .env        # Windows
# cp .env.example .env        # Mac/Linux

# Edit .env — masukkan token BotFather
# TELEGRAM_BOT_TOKEN=123456789:ABCdef...
```

### Langkah 3 — Jalankan Bot

```bash
npm start
```

```
🇲🇾 lovemalaysiabot is running...
   Press Ctrl+C to stop.
```

### Arahan Telegram

| Arahan | Fungsi |
|--------|--------|
| `/start` | Mulakan sesi / reset |
| `/menu`  | Papar menu topik |
| `/lang`  | Tukar bahasa (BM ↔ EN) |
| `/help`  | Tunjukkan senarai arahan |

---

## 🧠 Ciri-ciri Bot

| Ciri | Butiran |
|------|---------|
| **Topik** | Latar Belakang, Lima Prinsip, Objektif, Kepentingan, Kehidupan Harian |
| **Kuiz** | 6 soalan rawak, maklum balas segera, 2 tahap hint sebelum jawapan didedahkan |
| **Dwibahasa** | Bahasa Melayu (lalai) + Bahasa Inggeris |
| **Fallback** | Selepas 2 kegagalan → cadangkan rujuk guru Sejarah |
| **Guardrails** | Menolak kerja rumah, tugasan & isu peribadi |
| **Escalation** | Setelah 2 percubaan gagal atau soalan di luar skop |
| **No LLM API** | ❌ Tiada OpenAI, Gemini, atau mana-mana LLM API |

---

## 🔄 Seni Bina Engine (`bot-engine.js`)

```
Input Murid
     │
     ▼
┌──────────────────────┐
│   State Machine       │  ← Semak: adakah dalam sesi kuiz?
│   (quiz_answer?)      │
└────────┬─────────────┘
         │ Tidak
         ▼
┌──────────────────────┐
│   Intent Detection    │  ← Padankan corak regex (15 intent)
│                       │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│   Response Builder    │  ← Ambil dari KB atau jalankan kuiz
│   + Session Update    │     dalam bahasa yang dipilih (ms/en)
└────────┬─────────────┘
         │
         ▼
     Output Teks
```

---

## 📋 Keperluan Sistem

| Komponen | Keperluan |
|----------|-----------|
| Web Chat | Mana-mana browser moden |
| Telegram Bot | Node.js 16+ + sambungan internet |

---

## 🚀 Deploy

### Web — GitHub Pages / Netlify / Vercel
Muat naik `index.html` dan `bot-engine.js` ke mana-mana hosting statik.

### Telegram Bot — Pelayan 24/7
```bash
# Menggunakan PM2
npm install -g pm2
pm2 start telegram-bot.js --name lovemalaysiabot
pm2 save
pm2 startup
```

---

## ✅ Semakan Keperluan

| Keperluan | Status |
|-----------|--------|
| Bot Name: lovemalaysiabot | ✅ |
| No LLM API | ✅ |
| Web interface | ✅ |
| Telegram via BotFather | ✅ |
| Explain background, 5 principles, objectives, importance, daily life | ✅ |
| Interactive quiz with feedback | ✅ |
| Progressive hints (2 levels) | ✅ |
| Fallback after 2 failed attempts | ✅ |
| Escalate to human teacher | ✅ |
| Reject homework / academic dishonesty | ✅ |
| Reject personal / emotional issues | ✅ |
| Bahasa Melayu default + English support | ✅ |
| Simple language for primary school students | ✅ |
