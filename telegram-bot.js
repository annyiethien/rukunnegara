// ============================================================
//  lovemalaysiabot — Telegram Bot
//  Requires: node-telegram-bot-api, dotenv
//  Setup:    cp .env.example .env  →  fill TELEGRAM_BOT_TOKEN
//  Run:      node telegram-bot.js
// ============================================================

require("dotenv").config();
var TelegramBot = require("node-telegram-bot-api");
var engine = require("./bot-engine.js");

// ── Config ─────────────────────────────────────────────────────

var TOKEN = process.env.TELEGRAM_BOT_TOKEN;
if (!TOKEN) {
  console.error("❌  TELEGRAM_BOT_TOKEN is not set in .env");
  console.error("    Copy .env.example to .env and add your BotFather token.");
  process.exit(1);
}

var bot = new TelegramBot(TOKEN, { polling: true });

// ── Per-user sessions ───────────────────────────────────────────
var sessions = {};

function getSession(chatId) {
  var id = String(chatId);
  if (!sessions[id]) sessions[id] = engine.createSession();
  return sessions[id];
}

// ── Inline keyboards ────────────────────────────────────────────

function topicKeyboard(lang) {
  var ms = lang === "ms";
  return {
    inline_keyboard: [
      [
        { text: ms ? "1️⃣ Latar Belakang"   : "1️⃣ Background",      callback_data: "1" },
        { text: ms ? "2️⃣ Lima Prinsip"      : "2️⃣ Five Principles",  callback_data: "2" },
      ],
      [
        { text: ms ? "3️⃣ Objektif"          : "3️⃣ Objectives",       callback_data: "3" },
        { text: ms ? "4️⃣ Kepentingan"        : "4️⃣ Importance",       callback_data: "4" },
      ],
      [
        { text: ms ? "5️⃣ Kehidupan Harian"  : "5️⃣ Daily Life",       callback_data: "5" },
        { text: ms ? "6️⃣ Kuiz Interaktif"   : "6️⃣ Interactive Quiz", callback_data: "6" },
      ],
    ],
  };
}

function quizKeyboard(lang) {
  var ms = lang === "ms";
  return {
    inline_keyboard: [
      [
        { text: "A", callback_data: "A" },
        { text: "B", callback_data: "B" },
        { text: "C", callback_data: "C" },
        { text: "D", callback_data: "D" },
      ],
      [
        { text: ms ? "💡 Petunjuk" : "💡 Hint", callback_data: "hint" },
      ],
    ],
  };
}

function langKeyboard() {
  return {
    inline_keyboard: [[
      { text: "🌐 Bahasa Melayu", callback_data: "bahasa" },
      { text: "🌐 English",       callback_data: "english" },
    ]],
  };
}

// ── Send helpers ─────────────────────────────────────────────────

function chunkText(text, max) {
  var chunks = [];
  var remaining = text;
  while (remaining.length > max) {
    var cut = remaining.lastIndexOf("\n", max);
    if (cut <= 0) cut = max;
    chunks.push(remaining.slice(0, cut));
    remaining = remaining.slice(cut + 1);
  }
  if (remaining.length) chunks.push(remaining);
  return chunks;
}

async function reply(chatId, text, opts) {
  opts = opts || {};
  var chunks = chunkText(text, 4000);
  for (var i = 0; i < chunks.length; i++) {
    var sendOpts = { parse_mode: "Markdown" };
    if (i === chunks.length - 1 && opts.reply_markup) {
      sendOpts.reply_markup = opts.reply_markup;
    }
    try {
      await bot.sendMessage(chatId, chunks[i], sendOpts);
    } catch (e) {
      // Fallback: send as plain text if Markdown parse fails
      try {
        await bot.sendMessage(chatId, chunks[i].replace(/[*_`]/g, ""), i === chunks.length - 1 ? opts : {});
      } catch (e2) {
        console.error("Send error:", e2.message);
      }
    }
  }
}

// ── Route reply to correct keyboard ──────────────────────────────

async function dispatch(chatId, text) {
  var session = getSession(chatId);
  var prevStep = session.step;

  var response = engine.process(text, session);

  var kb;
  if (session.step === "quiz_answer") {
    kb = quizKeyboard(session.lang);
  } else if (prevStep === "quiz_answer" && session.step === "idle") {
    // Quiz just ended — show topic menu
    kb = topicKeyboard(session.lang);
  } else if (
    response.indexOf("Topik yang tersedia") !== -1 ||
    response.indexOf("Available topics") !== -1 ||
    response.indexOf("Pilih topik") !== -1 ||
    response.indexOf("Choose a topic") !== -1 ||
    response.indexOf("boleh belajar") !== -1
  ) {
    kb = topicKeyboard(session.lang);
  } else if (session.step === "idle") {
    kb = topicKeyboard(session.lang);
  }

  await reply(chatId, response, kb ? { reply_markup: kb } : {});
}

// ── Commands ─────────────────────────────────────────────────────

bot.onText(/^\/start$/, async function(msg) {
  var chatId = msg.chat.id;
  sessions[String(chatId)] = engine.createSession(); // reset
  var session = getSession(chatId);
  var welcome = engine.greetMessage(session.lang);
  await reply(chatId, welcome, { reply_markup: topicKeyboard(session.lang) });
});

bot.onText(/^\/menu$/, async function(msg) {
  var chatId = msg.chat.id;
  var session = getSession(chatId);
  var menuText = engine.menuMessage(session.lang);
  await reply(chatId, menuText, { reply_markup: topicKeyboard(session.lang) });
});

bot.onText(/^\/lang$/, async function(msg) {
  var chatId = msg.chat.id;
  await reply(chatId, "🌐 Choose your language / Pilih bahasa kamu:", { reply_markup: langKeyboard() });
});

bot.onText(/^\/help$/, async function(msg) {
  var chatId = msg.chat.id;
  var session = getSession(chatId);
  var ms = session.lang === "ms";
  var helpText = ms
    ? [
        "ℹ️ *Arahan lovemalaysiabot:*",
        "",
        "/start — Mulakan sesi baru",
        "/menu  — Papar menu topik",
        "/lang  — Tukar bahasa",
        "/help  — Tunjukkan arahan ini",
        "",
        "Atau taip soalan terus! Contoh:",
        "• *terangkan lima prinsip*",
        "• *kenapa Rukun Negara ditubuhkan*",
        "• *kuiz*",
      ].join("\n")
    : [
        "ℹ️ *lovemalaysiabot Commands:*",
        "",
        "/start — Start a new session",
        "/menu  — Show topic menu",
        "/lang  — Change language",
        "/help  — Show this help",
        "",
        "Or just type your question! Examples:",
        "• *explain the five principles*",
        "• *why was Rukun Negara introduced*",
        "• *quiz*",
      ].join("\n");
  await reply(chatId, helpText, { reply_markup: topicKeyboard(session.lang) });
});

// ── Plain text messages ───────────────────────────────────────────

bot.on("message", async function(msg) {
  if (!msg.text || msg.text.startsWith("/")) return;
  await dispatch(msg.chat.id, msg.text);
});

// ── Inline keyboard callbacks ─────────────────────────────────────

bot.on("callback_query", async function(query) {
  await bot.answerCallbackQuery(query.id).catch(function() {});
  await dispatch(query.message.chat.id, query.data);
});

// ── Error handling ────────────────────────────────────────────────

bot.on("polling_error", function(err) {
  console.error("Polling error:", err.code || "", err.message);
});

bot.on("error", function(err) {
  console.error("Bot error:", err.message);
});

// ── Startup ───────────────────────────────────────────────────────

console.log("🇲🇾 lovemalaysiabot is running...");
console.log("   Press Ctrl+C to stop.");
