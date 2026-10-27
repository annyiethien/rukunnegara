// ============================================================
//  lovemalaysiabot — Shared Bot Engine
//  Rule-based, No LLM API. Runs in Node.js AND browser.
// ============================================================

(function (exports) {

  // ── Language helpers ──────────────────────────────────────────────────────

  var T = {
    // ---- greetings ----
    greeting: {
      ms: [
        "👋 *Helo! Saya lovemalaysiabot!*",
        "",
        "Saya di sini untuk membantu kamu belajar tentang *Rukun Negara* dengan cara yang seronok! 🇲🇾",
        "",
        "📚 *Topik yang tersedia:*",
        "1️⃣  Latar Belakang & Sejarah Rukun Negara",
        "2️⃣  Lima Prinsip Rukun Negara",
        "3️⃣  Objektif Rukun Negara",
        "4️⃣  Kepentingan Rukun Negara",
        "5️⃣  Pengamalan dalam Kehidupan Harian",
        "6️⃣  Kuiz Interaktif",
        "",
        "Taip nombor atau nama topik untuk mula! 😊",
        "_(Taip *english* untuk beralih ke Bahasa Inggeris)_",
      ].join("\n"),

      en: [
        "👋 *Hello! I'm lovemalaysiabot!*",
        "",
        "I'm here to help you learn about *Rukun Negara* in a fun and easy way! 🇲🇾",
        "",
        "📚 *Available topics:*",
        "1️⃣  Background & History of Rukun Negara",
        "2️⃣  The Five Principles of Rukun Negara",
        "3️⃣  Objectives of Rukun Negara",
        "4️⃣  The Importance of Rukun Negara",
        "5️⃣  Applying Rukun Negara in Daily Life",
        "6️⃣  Interactive Quiz",
        "",
        "Type a number or topic name to start! 😊",
        "_(Type *bahasa* to switch to Bahasa Melayu)_",
      ].join("\n"),
    },

    menu: {
      ms: [
        "📋 *Pilih topik yang kamu nak belajar:*",
        "",
        "1️⃣  Latar Belakang & Sejarah",
        "2️⃣  Lima Prinsip Rukun Negara",
        "3️⃣  Objektif Rukun Negara",
        "4️⃣  Kepentingan Rukun Negara",
        "5️⃣  Pengamalan dalam Kehidupan Harian",
        "6️⃣  Kuiz Interaktif",
        "",
        "Taip nombor (1–6) atau nama topik! 😊",
      ].join("\n"),

      en: [
        "📋 *Choose a topic to learn:*",
        "",
        "1️⃣  Background & History",
        "2️⃣  The Five Principles",
        "3️⃣  Objectives of Rukun Negara",
        "4️⃣  The Importance of Rukun Negara",
        "5️⃣  Applying Rukun Negara in Daily Life",
        "6️⃣  Interactive Quiz",
        "",
        "Type a number (1–6) or topic name! 😊",
      ].join("\n"),
    },

    missingTopic: {
      ms: "Sure! Topik manakah tentang Rukun Negara yang kamu ingin pelajari: latar belakang, lima prinsip, objektif, atau kepentingan dalam kehidupan harian?",
      en: "Sure! Which topic about Rukun Negara would you like to learn: its background, five principles, objectives, or importance in daily life?",
    },

    fallback1: {
      ms: "😕 Maaf, saya tidak faham soalan kamu. Boleh kamu cuba tanya dengan cara lain, atau pilih topik di bawah?\n\n1️⃣ Latar Belakang  2️⃣ Lima Prinsip  3️⃣ Objektif  4️⃣ Kepentingan  5️⃣ Kehidupan Harian  6️⃣ Kuiz",
      en: "😕 Sorry, I don't quite understand. Could you tell me which topic about Rukun Negara you want to learn, or try asking in a different way?\n\n1️⃣ Background  2️⃣ Five Principles  3️⃣ Objectives  4️⃣ Importance  5️⃣ Daily Life  6️⃣ Quiz",
    },

    fallback2: {
      ms: "😕 Maaf, saya masih tidak faham selepas beberapa percubaan. Saya sarankan kamu *berbincang dengan guru Sejarah kamu* untuk mendapatkan bantuan yang lebih baik. Guru kamu pasti sedia membantu! 📚",
      en: "😕 Sorry, I still don't understand after a few attempts. I recommend *speaking to your History teacher or mentor* for better assistance. They will be happy to help! 📚",
    },

    escalate: {
      ms: [
        "🙏 Soalan ini memerlukan penjelasan yang lebih mendalam.",
        "",
        "Sila *rujuk guru Sejarah atau mentor kamu* untuk mendapatkan jawapan yang lebih tepat dan lengkap. 📚",
        "",
        "Guru kamu pasti sedia membantu!",
        "Taip *menu* untuk kembali ke topik pembelajaran.",
      ].join("\n"),
      en: [
        "🙏 This question requires a more in-depth explanation.",
        "",
        "Please *consult your History teacher or mentor* for a more accurate and complete answer. 📚",
        "",
        "They will be happy to help!",
        "Type *menu* to return to the learning topics.",
      ].join("\n"),
    },

    homework: {
      ms: [
        "📝 lovemalaysiabot tidak boleh menyiapkan kerja rumah, tugasan, atau soalan peperiksaan untuk kamu.",
        "",
        "Tetapi saya boleh *bantu kamu memahami topik* supaya kamu dapat menjawab sendiri dengan yakin!",
        "",
        "Beritahu saya — topik manakah yang kamu perlukan penjelasan?",
      ].join("\n"),
      en: [
        "📝 lovemalaysiabot cannot complete your homework, assignments, or exam questions for you.",
        "",
        "But I can *help you understand the topic* so you can answer confidently on your own!",
        "",
        "Tell me — which topic do you need help understanding?",
      ].join("\n"),
    },

    personal: {
      ms: [
        "💙 Saya faham kamu mungkin sedang melalui masa yang sukar.",
        "",
        "lovemalaysiabot hanya boleh membantu dalam pembelajaran Rukun Negara.",
        "Sila *bercakap dengan guru, ibu bapa, atau kaunselor sekolah* kamu. Mereka pasti akan membantu! 🤝",
      ].join("\n"),
      en: [
        "💙 I understand you might be going through a tough time.",
        "",
        "lovemalaysiabot focuses on learning Rukun Negara.",
        "Please *speak to a trusted teacher, parent, or school counsellor*. They will be glad to help! 🤝",
      ].join("\n"),
    },

    bye: {
      ms: [
        "👋 *Terima kasih kerana belajar bersama lovemalaysiabot!*",
        "",
        "Ingat — Rukun Negara bukan sekadar hafalan, ia adalah cara hidup kita sebagai rakyat Malaysia yang baik. 🇲🇾",
        "",
        "Jumpa lagi dan teruskan semangat belajar! 💪",
      ].join("\n"),
      en: [
        "👋 *Thank you for learning with lovemalaysiabot!*",
        "",
        "Remember — Rukun Negara is not just something to memorise; it is a way of life for every Malaysian. 🇲🇾",
        "",
        "See you again and keep up the great work! 💪",
      ].join("\n"),
    },

    hintOnly: {
      ms: "💡 *Petunjuk tersedia semasa Kuiz sahaja!*\n\nTaip *kuiz* untuk mulakan kuiz, kemudian guna *hint* semasa menjawab soalan.\nAtau taip *menu* untuk memilih topik.",
      en: "💡 *Hints are available during the Quiz only!*\n\nType *quiz* to start the quiz, then use *hint* while answering.\nOr type *menu* to choose a topic.",
    },

    switchedEn: "🌐 Switched to *English*! Type *bahasa* to switch back to Bahasa Melayu.",
    switchedMs: "🌐 Ditukar ke *Bahasa Melayu*! Taip *english* untuk beralih ke Bahasa Inggeris.",

    quizStart: {
      ms: [
        "🎯 *Kuiz Rukun Negara — 6 Soalan!*",
        "",
        "Saya akan tanya kamu 6 soalan. Jawab dengan menaip *A*, *B*, *C*, atau *D*.",
        "Taip *hint* jika kamu perlukan bantuan!",
        "",
        "Jom mula! 💪",
        "",
      ].join("\n"),
      en: [
        "🎯 *Rukun Negara Quiz — 6 Questions!*",
        "",
        "I will ask you 6 questions. Answer by typing *A*, *B*, *C*, or *D*.",
        "Type *hint* if you need help!",
        "",
        "Let's go! 💪",
        "",
      ].join("\n"),
    },

    quizAnswer: {
      ms: "Jawapan kamu: (A / B / C / D)",
      en: "Your answer: (A / B / C / D)",
    },

    quizHint1: { ms: "💡 *Petunjuk 1:*", en: "💡 *Hint 1:*" },
    quizHint2: { ms: "💡 *Petunjuk 2:*", en: "💡 *Hint 2:*" },
    quizHintUsed: { ms: "Satu lagi peluang! (A / B / C / D)", en: "One more chance! (A / B / C / D)" },
    quizHintReveal: { ms: "🔓 Jawapannya ialah", en: "🔓 The answer is" },
    quizRetry: { ms: "Cuba sekali lagi! (A / B / C / D)", en: "Try again! (A / B / C / D)" },
    quizWrong1: { ms: "❌ Hmm, belum tepat lagi.", en: "❌ Hmm, not quite right." },
    quizWrongFinal: { ms: "❌ Jawapan yang betul ialah", en: "❌ The correct answer is" },
    quizInvalid: { ms: "Sila jawab dengan *A*, *B*, *C*, atau *D* sahaja. Cuba lagi!", en: "Please answer with *A*, *B*, *C*, or *D* only. Try again!" },
    quizSep: "━━━━━━━━━━━━━━",
    quizResult: { ms: "🎯 *Keputusan Kuiz:", en: "🎯 *Quiz Result:" },
    quizMore: { ms: "Taip *menu* untuk belajar topik lain, atau *kuiz* untuk cuba lagi!", en: "Type *menu* to learn other topics, or *quiz* to try again!" },
    praise: {
      ms: ["Syabas! 🌟", "Betul sekali! 🎉", "Hebat! ✅", "Bagus! 👍", "Tepat! 🏆"],
      en: ["Well done! 🌟", "That's correct! 🎉", "Excellent! ✅", "Great job! 👍", "Spot on! 🏆"],
    },
    kbFooter: {
      ms: "━━━━━━━━━━━━━━\n💬 Ada soalan lain? Taip *menu* untuk topik lain atau *kuiz* untuk uji diri!",
      en: "━━━━━━━━━━━━━━\n💬 Any other questions? Type *menu* for other topics or *quiz* to test yourself!",
    },
  };

  // ── Knowledge Base ─────────────────────────────────────────────────────────

  var KB = {
    background: {
      ms: [
        "📜 *Latar Belakang & Sejarah Rukun Negara*",
        "",
        "🗓️ *Tarikh diisytiharkan:* 31 Ogos 1970",
        "   (Sempena Hari Kemerdekaan Malaysia yang ke-13)",
        "",
        "⚡ *Punca utama:*",
        "Peristiwa rusuhan kaum *13 Mei 1969* menunjukkan bahawa Malaysia memerlukan satu panduan perpaduan nasional yang jelas.",
        "",
        "👑 *Diisytiharkan oleh:*",
        "Yang di-Pertuan Agong ketiga, Al-Marhum Tuanku Ismail Nasiruddin Shah.",
        "",
        "🎯 *Tujuan:*",
        "• Memupuk perpaduan dalam kalangan rakyat Malaysia",
        "• Membina identiti kebangsaan yang kukuh",
        "• Memastikan keamanan dan kestabilan negara",
        "• Mewujudkan masyarakat yang adil, demokratik, dan progresif",
      ].join("\n"),

      en: [
        "📜 *Background & History of Rukun Negara*",
        "",
        "🗓️ *Date proclaimed:* 31 August 1970",
        "   (On Malaysia's 13th National Day)",
        "",
        "⚡ *Main cause:*",
        "The *13 May 1969 racial riots* showed that Malaysia needed a clear national unity framework.",
        "",
        "👑 *Proclaimed by:*",
        "The third Yang di-Pertuan Agong, the late Tuanku Ismail Nasiruddin Shah.",
        "",
        "🎯 *Purposes:*",
        "• Foster unity among the people of Malaysia",
        "• Build a strong national identity",
        "• Ensure peace and national stability",
        "• Create a just, democratic, and progressive society",
      ].join("\n"),
    },

    principles: {
      ms: [
        "🏛️ *Lima Prinsip Rukun Negara*",
        "",
        "1️⃣ *Kepercayaan kepada Tuhan*",
        "   Rakyat Malaysia percaya kepada Tuhan. Islam adalah agama rasmi, tetapi agama lain bebas diamalkan.",
        "   _Contoh: berdoa, menghormati hari perayaan rakan-rakan dari agama lain._",
        "",
        "2️⃣ *Kesetiaan kepada Raja dan Negara*",
        "   Rakyat setia kepada Yang di-Pertuan Agong, Raja-Raja Melayu, dan negara Malaysia.",
        "   _Contoh: menyanyikan Negaraku dengan penuh semangat, mengibarkan Jalur Gemilang._",
        "",
        "3️⃣ *Keluhuran Perlembagaan*",
        "   Perlembagaan Malaysia adalah undang-undang tertinggi negara dan semua rakyat wajib menghormatinya.",
        "   _Contoh: mematuhi peraturan sekolah dan undang-undang negara._",
        "",
        "4️⃣ *Kedaulatan Undang-Undang*",
        "   Semua orang — rakyat dan pemimpin — tertakluk kepada undang-undang yang adil dan saksama.",
        "   _Contoh: jujur dalam peperiksaan, tidak mencuri, tidak menipu._",
        "",
        "5️⃣ *Kesopanan dan Kesusilaan*",
        "   Rakyat Malaysia mengamalkan tingkah laku yang sopan santun dan berakhlak mulia.",
        "   _Contoh: memberi salam, berterima kasih, membantu rakan yang kesusahan._",
      ].join("\n"),

      en: [
        "🏛️ *The Five Principles of Rukun Negara*",
        "",
        "1️⃣ *Belief in God*",
        "   Malaysians believe in God. Islam is the official religion, but other religions are freely practised.",
        "   _Example: praying daily, respecting friends' religious celebrations._",
        "",
        "2️⃣ *Loyalty to King and Country*",
        "   Malaysians are loyal to the Yang di-Pertuan Agong, the Malay Rulers, and Malaysia.",
        "   _Example: singing Negaraku proudly, flying the Jalur Gemilang._",
        "",
        "3️⃣ *Supremacy of the Constitution*",
        "   The Malaysian Constitution is the supreme law of the land and all citizens must respect it.",
        "   _Example: following school rules and obeying the country's laws._",
        "",
        "4️⃣ *Rule of Law*",
        "   Everyone — citizens and leaders — is subject to fair and impartial laws.",
        "   _Example: being honest in exams, not stealing, not cheating._",
        "",
        "5️⃣ *Good Behaviour and Morality*",
        "   Malaysians practise polite behaviour and good moral values.",
        "   _Example: greeting others, saying thank you, helping friends in need._",
      ].join("\n"),
    },

    objectives: {
      ms: [
        "🎯 *Objektif Rukun Negara*",
        "",
        "✅ Mencapai perpaduan yang lebih erat dalam kalangan seluruh masyarakat Malaysia",
        "✅ Memelihara cara hidup demokratik",
        "✅ Mewujudkan masyarakat yang adil bagi memastikan kemakmuran negara dinikmati bersama",
        "✅ Menjamin pendekatan liberal terhadap tradisi kebudayaan yang kaya dan pelbagai",
        "✅ Membina sebuah masyarakat progresif yang menggunakan sains dan teknologi moden",
      ].join("\n"),

      en: [
        "🎯 *Objectives of Rukun Negara*",
        "",
        "✅ Achieve closer unity among all Malaysians",
        "✅ Preserve a democratic way of life",
        "✅ Create a just society where the nation's prosperity is shared fairly",
        "✅ Guarantee a liberal approach to the country's rich and diverse cultural traditions",
        "✅ Build a progressive society that uses modern science and technology",
      ].join("\n"),
    },

    importance: {
      ms: [
        "🌟 *Kepentingan Rukun Negara*",
        "",
        "🔹 *Perpaduan Nasional*",
        "   Memastikan semua kaum di Malaysia hidup bersatu padu dan saling menghormati.",
        "",
        "🔹 *Panduan Hidup*",
        "   Memberikan garis panduan nilai dan tingkah laku yang baik kepada setiap rakyat.",
        "",
        "🔹 *Kestabilan Negara*",
        "   Mencegah konflik dan memastikan keamanan berterusan demi pembangunan negara.",
        "",
        "🔹 *Identiti Kebangsaan*",
        "   Membina rasa cinta akan tanah air dan semangat patriotisme dalam diri rakyat.",
        "",
        "🔹 *Keadilan Sosial*",
        "   Memastikan semua rakyat diperlakukan secara adil tanpa mengira kaum, agama, atau latar belakang.",
      ].join("\n"),

      en: [
        "🌟 *The Importance of Rukun Negara*",
        "",
        "🔹 *National Unity*",
        "   Ensures that all races in Malaysia live harmoniously and respect one another.",
        "",
        "🔹 *A Guide for Life*",
        "   Provides a framework of good values and behaviour for every citizen.",
        "",
        "🔹 *National Stability*",
        "   Prevents conflict and ensures lasting peace for the country's development.",
        "",
        "🔹 *National Identity*",
        "   Builds love for the country and a spirit of patriotism among citizens.",
        "",
        "🔹 *Social Justice*",
        "   Ensures all citizens are treated fairly regardless of race, religion, or background.",
      ].join("\n"),
    },

    dailylife: {
      ms: [
        "🌈 *Pengamalan Rukun Negara dalam Kehidupan Harian*",
        "",
        "1️⃣ *Kepercayaan kepada Tuhan*",
        "   → Berdoa setiap hari, menghormati agama rakan-rakan lain, bersyukur atas nikmat yang diterima.",
        "",
        "2️⃣ *Kesetiaan kepada Raja dan Negara*",
        "   → Menyanyikan Negaraku dengan penuh semangat setiap pagi, mengibarkan Jalur Gemilang pada Hari Kebangsaan.",
        "",
        "3️⃣ *Keluhuran Perlembagaan*",
        "   → Mematuhi peraturan sekolah, menghormati keputusan guru dan pentadbiran.",
        "",
        "4️⃣ *Kedaulatan Undang-Undang*",
        "   → Tidak menipu dalam peperiksaan, tidak mengambil hak orang lain, bersikap jujur.",
        "",
        "5️⃣ *Kesopanan dan Kesusilaan*",
        "   → Memberi salam kepada guru dan rakan, berterima kasih, membantu rakan yang dalam kesusahan.",
      ].join("\n"),

      en: [
        "🌈 *Applying Rukun Negara in Daily Life*",
        "",
        "1️⃣ *Belief in God*",
        "   → Pray daily, respect friends' religious practices, be grateful for blessings.",
        "",
        "2️⃣ *Loyalty to King and Country*",
        "   → Sing Negaraku proudly every morning, fly the Jalur Gemilang on National Day.",
        "",
        "3️⃣ *Supremacy of the Constitution*",
        "   → Follow school rules, respect teachers' and school decisions.",
        "",
        "4️⃣ *Rule of Law*",
        "   → Don't cheat in exams, don't take what belongs to others, always be honest.",
        "",
        "5️⃣ *Good Behaviour and Morality*",
        "   → Greet teachers and friends, say thank you, help classmates who are struggling.",
      ].join("\n"),
    },
  };

  // ── Quiz Bank (bilingual) ─────────────────────────────────────────────────

  var QUIZ_BANK = {
    ms: [
      {
        q: "Rukun Negara diisytiharkan pada tahun?",
        options: ["A) 1957", "B) 1963", "C) 1970", "D) 1969"],
        answer: "C",
        hint1: "Ia berlaku selepas peristiwa rusuhan kaum pada tahun 1969.",
        hint2: "Tahun itu ialah 13 tahun selepas Malaysia merdeka pada 1957.",
        explanation: "Rukun Negara diisytiharkan pada 31 Ogos *1970*, sempena ulang tahun kemerdekaan ke-13.",
      },
      {
        q: "Berapakah jumlah prinsip Rukun Negara?",
        options: ["A) 3", "B) 4", "C) 6", "D) 5"],
        answer: "D",
        hint1: "Lebih daripada 4 tetapi kurang daripada 6.",
        hint2: "Kira jari tangan kamu pada satu tangan.",
        explanation: "Rukun Negara mempunyai *5 (lima)* prinsip.",
      },
      {
        q: "Apakah prinsip PERTAMA Rukun Negara?",
        options: ["A) Kesopanan dan Kesusilaan", "B) Kedaulatan Undang-Undang", "C) Kepercayaan kepada Tuhan", "D) Keluhuran Perlembagaan"],
        answer: "C",
        hint1: "Prinsip ini berkaitan dengan kepercayaan agama.",
        hint2: "Ia bermula dengan perkataan 'Kepercayaan' dan melibatkan 'Tuhan'.",
        explanation: "Prinsip pertama ialah *Kepercayaan kepada Tuhan* — rakyat Malaysia percaya kepada kewujudan Tuhan.",
      },
      {
        q: "Peristiwa apakah yang mendorong penubuhan Rukun Negara?",
        options: ["A) Kemerdekaan 1957", "B) Peristiwa 13 Mei 1969", "C) Pembentukan Malaysia 1963", "D) Pilihanraya 1964"],
        answer: "B",
        hint1: "Ia adalah peristiwa rusuhan kaum yang berlaku setahun sebelum Rukun Negara diisytiharkan.",
        hint2: "Peristiwa itu berlaku pada bulan *Mei* tahun *1969*.",
        explanation: "*Peristiwa 13 Mei 1969* (rusuhan kaum) mendorong kerajaan mewujudkan Rukun Negara untuk memupuk perpaduan.",
      },
      {
        q: "Prinsip manakah menegaskan bahawa Perlembagaan Malaysia adalah undang-undang tertinggi negara?",
        options: ["A) Kedaulatan Undang-Undang", "B) Kesopanan dan Kesusilaan", "C) Kesetiaan kepada Raja dan Negara", "D) Keluhuran Perlembagaan"],
        answer: "D",
        hint1: "Prinsip ini berkaitan dengan dokumen undang-undang paling utama di Malaysia.",
        hint2: "Perkataan kunci ialah 'Perlembagaan'.",
        explanation: "*Keluhuran Perlembagaan* menegaskan bahawa Perlembagaan Malaysia adalah undang-undang tertinggi dan mesti dipatuhi oleh semua.",
      },
      {
        q: "Apakah contoh pengamalan prinsip 'Kesopanan dan Kesusilaan' di sekolah?",
        options: ["A) Tidak hadir ke sekolah", "B) Memberi salam kepada guru", "C) Tidak menyiapkan kerja rumah", "D) Bergaduh dengan rakan"],
        answer: "B",
        hint1: "Prinsip ini berkaitan dengan tingkah laku dan adab sopan.",
        hint2: "Apakah yang kamu lakukan apabila berjumpa guru pada waktu pagi?",
        explanation: "*Memberi salam kepada guru* adalah contoh pengamalan 'Kesopanan dan Kesusilaan' yang baik di sekolah.",
      },
    ],

    en: [
      {
        q: "In which year was Rukun Negara proclaimed?",
        options: ["A) 1957", "B) 1963", "C) 1970", "D) 1969"],
        answer: "C",
        hint1: "It happened after the racial riots of 1969.",
        hint2: "It was 13 years after Malaysia's independence in 1957.",
        explanation: "Rukun Negara was proclaimed on 31 August *1970*, on Malaysia's 13th National Day.",
      },
      {
        q: "How many principles does Rukun Negara have?",
        options: ["A) 3", "B) 4", "C) 6", "D) 5"],
        answer: "D",
        hint1: "More than 4 but less than 6.",
        hint2: "Count the fingers on one hand.",
        explanation: "Rukun Negara has *5 (five)* principles.",
      },
      {
        q: "What is the FIRST principle of Rukun Negara?",
        options: ["A) Good Behaviour and Morality", "B) Rule of Law", "C) Belief in God", "D) Supremacy of the Constitution"],
        answer: "C",
        hint1: "This principle is related to religious faith.",
        hint2: "It starts with the word 'Belief' and involves 'God'.",
        explanation: "The first principle is *Belief in God* — Malaysians believe in the existence of God.",
      },
      {
        q: "Which event led to the creation of Rukun Negara?",
        options: ["A) Independence 1957", "B) 13 May 1969 racial riots", "C) Formation of Malaysia 1963", "D) Elections of 1964"],
        answer: "B",
        hint1: "It was a racial conflict that happened one year before Rukun Negara was proclaimed.",
        hint2: "The event happened in *May 1969*.",
        explanation: "The *13 May 1969 racial riots* prompted the government to create Rukun Negara to foster national unity.",
      },
      {
        q: "Which principle states that the Malaysian Constitution is the supreme law of the land?",
        options: ["A) Rule of Law", "B) Good Behaviour and Morality", "C) Loyalty to King and Country", "D) Supremacy of the Constitution"],
        answer: "D",
        hint1: "This principle is about Malaysia's most important legal document.",
        hint2: "The key word is 'Constitution'.",
        explanation: "*Supremacy of the Constitution* states that the Malaysian Constitution is the highest law and must be respected by all.",
      },
      {
        q: "Which is an example of practising 'Good Behaviour and Morality' at school?",
        options: ["A) Skipping school", "B) Greeting your teacher", "C) Not doing homework", "D) Fighting with friends"],
        answer: "B",
        hint1: "This principle is about polite and respectful behaviour.",
        hint2: "What do you do when you meet your teacher in the morning?",
        explanation: "*Greeting your teacher* is a great example of 'Good Behaviour and Morality' at school.",
      },
    ],
  };

  // ── Intent Patterns ───────────────────────────────────────────────────────

  var INTENTS = [
    { id: "greeting",    patterns: [/^(hi|hello|helo|hai|hye|assalamualaikum|salam|selamat|start|mula|mulakan|begin)/i] },
    { id: "background",  patterns: [/latar belakang|background|sejarah rukun|bila|when|tahun|year|1970|1969|13 mei|diperkenalkan|diisytiharkan|kenapa|why|sebab|reason|step.by.step|langkah/i] },
    { id: "principles",  patterns: [/prinsip|principle|lima|five|5|senarai|list|apakah.*rukun|what.*rukun|terangkan|explain|simple way/i] },
    { id: "objectives",  patterns: [/objektif|objective|tujuan|purpose|matlamat|goal|aim/i] },
    { id: "importance",  patterns: [/kepentingan|importance|important|penting|kenapa penting|why important/i] },
    { id: "dailylife",   patterns: [/harian|daily|life|kehidupan|amalkan|practice|contoh|example|guna dalam|apply|pengamalan/i] },
    { id: "quiz",        patterns: [/kuiz|quiz|soal|test|ujian|latihan|practice.*question|soalan|interactive|feedback/i] },
    { id: "hint",        patterns: [/hint|petunjuk|clue|bantuan|help me|tolong|tak faham|don'?t understand|susah|difficult/i] },
    { id: "menu",        patterns: [/menu|topik|topic|apa yang|what can|boleh buat apa|pilihan|options|help/i] },
    { id: "escalate",    patterns: [/cikgu|teacher|guru|manusia|human|tolong cikgu|refer teacher|talk to human/i] },
    { id: "homework",    patterns: [/kerja rumah|homework|assignment|tugasan|karangan|buat.*saya|do.*for me|siapkan|complete.*for|exam.*question|soalan peperiksaan/i] },
    { id: "personal",    patterns: [/sedih|sad|lonely|sunyi|takut|scared|masalah peribadi|personal problem|mental|depress|anxiet|stress|buli|bully/i] },
    { id: "lang_en",     patterns: [/\benglish\b|bahasa inggeris|switch.*english|use english/i] },
    { id: "lang_ms",     patterns: [/\bbahasa\b|bahasa melayu|switch.*malay|use malay|guna bahasa/i] },
    { id: "bye",         patterns: [/bye|goodbye|selesai|habis|done|terima kasih|thank you|thanks|jumpa lagi|exit/i] },
  ];

  var NUMBER_MAP = { "1": "background", "2": "principles", "3": "objectives", "4": "importance", "5": "dailylife", "6": "quiz" };

  // ── Session factory ───────────────────────────────────────────────────────

  function createSession() {
    return { lang: "ms", step: "idle", failCount: 0, quizIndex: 0, quizScore: 0, quizHintLevel: 0, quizQuestions: [] };
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  function t(key, lang) {
    var obj = T[key];
    if (!obj) return key;
    if (typeof obj === "string") return obj;
    return obj[lang] || obj["ms"];
  }

  function detectIntent(text) {
    var lower = text.trim().toLowerCase();
    for (var i = 0; i < INTENTS.length; i++) {
      for (var j = 0; j < INTENTS[i].patterns.length; j++) {
        if (INTENTS[i].patterns[j].test(lower)) return INTENTS[i].id;
      }
    }
    return null;
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  // ── KB response ───────────────────────────────────────────────────────────

  function kbResponse(key, lang) {
    var topic = KB[key];
    if (!topic) return t("fallback1", lang);
    return topic[lang] + "\n\n" + t("kbFooter", lang);
  }

  // ── Quiz logic ────────────────────────────────────────────────────────────

  function startQuiz(session) {
    session.step = "quiz_answer";
    session.quizIndex = 0;
    session.quizScore = 0;
    session.quizHintLevel = 0;
    session.quizQuestions = shuffle(QUIZ_BANK[session.lang]).slice(0, 6);
    return t("quizStart", session.lang) + "\n" + askQuestion(session);
  }

  function askQuestion(session) {
    var q = session.quizQuestions[session.quizIndex];
    session.quizHintLevel = 0;
    var lang = session.lang;
    var lines = [
      "❓ *" + (lang === "ms" ? "Soalan" : "Question") + " " + (session.quizIndex + 1) + "/6:*",
      "",
      q.q,
      "",
    ].concat(q.options).concat(["", t("quizAnswer", lang)]);
    return lines.join("\n");
  }

  function handleQuizAnswer(session, input) {
    var q = session.quizQuestions[session.quizIndex];
    var lang = session.lang;
    var answer = input.trim().toUpperCase().replace(/[^A-D]/g, "");

    if (/hint|petunjuk|bantuan|clue/i.test(input)) {
      session.quizHintLevel++;
      if (session.quizHintLevel === 1) {
        return t("quizHint1", lang) + " " + q.hint1 + "\n\n" + t("quizRetry", lang);
      } else if (session.quizHintLevel === 2) {
        return t("quizHint2", lang) + " " + q.hint2 + "\n\n" + t("quizHintUsed", lang);
      } else {
        session.quizHintLevel = 0;
        return t("quizHintReveal", lang) + " *" + q.answer + "*.\n\n📚 " + q.explanation + "\n\n" + nextQuestion(session);
      }
    }

    if (!answer) return t("quizInvalid", lang);

    if (answer === q.answer) {
      session.quizScore++;
      return rand(t("praise", lang)) + "\n\n📚 " + q.explanation + "\n\n" + nextQuestion(session);
    } else {
      if (session.quizHintLevel === 0) {
        session.quizHintLevel = 1;
        return t("quizWrong1", lang) + "\n\n" + t("quizHint1", lang) + " " + q.hint1 + "\n\n" + t("quizRetry", lang);
      } else {
        return t("quizWrongFinal", lang) + " *" + q.answer + "*.\n\n📚 " + q.explanation + "\n\n" + nextQuestion(session);
      }
    }
  }

  function nextQuestion(session) {
    session.quizIndex++;
    session.quizHintLevel = 0;
    if (session.quizIndex < session.quizQuestions.length) {
      return T.quizSep + "\n\n" + askQuestion(session);
    }
    return quizSummary(session);
  }

  function quizSummary(session) {
    session.step = "idle";
    var lang = session.lang;
    var score = session.quizScore;
    var total = session.quizQuestions.length;
    var msg, tip;
    if (score >= 5) {
      msg = lang === "ms" ? "🏆 *Cemerlang! Luar biasa!* Kamu sudah menguasai topik Rukun Negara dengan sangat baik!" : "🏆 *Outstanding!* You have mastered the topic of Rukun Negara brilliantly!";
      tip = lang === "ms" ? "Teruskan semangat belajar dan cuba topik lain!" : "Keep up the great work and explore other topics!";
    } else if (score >= 3) {
      msg = lang === "ms" ? "🌟 *Bagus! Usaha yang baik!*" : "🌟 *Good effort!*";
      tip = lang === "ms" ? "Ulang kaji soalan yang kamu terlepas dan cuba kuiz lagi!" : "Review the questions you missed and try the quiz again!";
    } else {
      msg = lang === "ms" ? "💪 *Jangan putus asa! Teruskan usaha kamu!*" : "💪 *Don't give up! Keep trying!*";
      tip = lang === "ms" ? "Mari baca semula Lima Prinsip Rukun Negara dan cuba kuiz lagi!" : "Let's review the Five Principles of Rukun Negara and try the quiz again!";
    }
    return [
      T.quizSep,
      t("quizResult", lang) + " " + score + "/" + total + "*",
      "",
      msg,
      "",
      "💡 " + (lang === "ms" ? "*Tip:* " : "*Tip:* ") + tip,
      "",
      t("quizMore", lang),
    ].join("\n");
  }

  // ── Main process ──────────────────────────────────────────────────────────

  function process(text, session) {
    var trimmed = text.trim();
    var lang = session.lang;

    // Number shortcuts
    if (NUMBER_MAP[trimmed]) {
      session.failCount = 0;
      var key = NUMBER_MAP[trimmed];
      if (key === "quiz") return startQuiz(session);
      return kbResponse(key, lang);
    }

    // Active quiz
    if (session.step === "quiz_answer") {
      return handleQuizAnswer(session, trimmed);
    }

    var intent = detectIntent(trimmed);
    if (intent) session.failCount = 0;

    switch (intent) {
      case "lang_en":
        session.lang = "en";
        return T.switchedEn;
      case "lang_ms":
        session.lang = "ms";
        return T.switchedMs;
      case "greeting":   return t("greeting", lang);
      case "menu":       return t("menu", lang);
      case "background": return kbResponse("background", lang);
      case "principles": return kbResponse("principles", lang);
      case "objectives": return kbResponse("objectives", lang);
      case "importance": return kbResponse("importance", lang);
      case "dailylife":  return kbResponse("dailylife", lang);
      case "quiz":       return startQuiz(session);
      case "escalate":   return t("escalate", lang);
      case "homework":   return t("homework", lang);
      case "personal":   return t("personal", lang);
      case "bye":        return t("bye", lang);
      case "hint":       return t("hintOnly", lang);
      default:
        session.failCount++;
        if (session.failCount >= 2) return t("fallback2", lang);
        if (trimmed.length < 3) return t("missingTopic", lang);
        return t("fallback1", lang);
    }
  }

  // ── Public API ────────────────────────────────────────────────────────────

  var engine = {
    process: process,
    createSession: createSession,
    greetMessage: function (lang) { return T.greeting[lang || "ms"]; },
    menuMessage: function (lang) { return T.menu[lang || "ms"]; },
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = engine;
  } else {
    exports.LoveMalaysiaBot = engine;
  }

})(typeof window !== "undefined" ? window : {});
