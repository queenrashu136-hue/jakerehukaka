const fs = require("fs");
const path = require("path");
const { cmd } = require("../lib/command");

// Database path
const dbPath = path.join(__dirname, "../database/user.json");

// Create DB file if missing
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ users: [] }, null, 2));
}

// Helpers
const loadDB = () => JSON.parse(fs.readFileSync(dbPath));
const saveDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// Only allowed number
const allowedNumber = "94764085107"; // 0764085107

// ============================================
// 1️⃣ REGISTER
// ============================================
cmd({
    pattern: "register",
    desc: "Register new user (only allowed number)",
    category: "main",
}, async (bot, m, args) => {

    const senderNumber = m.sender.split("@")[0];
    if (senderNumber !== allowedNumber)
        return bot.sendMessage(m.from, { text: "❌ You are not allowed to register." }, { quoted: m });

    const db = loadDB();

    if (db.users.find(u => u.number === senderNumber))
        return bot.sendMessage(m.from, { text: "⚠️ You are already registered!" }, { quoted: m });

    const newUser = {
        number: senderNumber,
        name: args[0] || m.pushName || "NoName",
        age: args[1] || "N/A",
        gender: args[2] || "N/A",
        regTime: Date.now()
    };

    db.users.push(newUser);
    saveDB(db);

    bot.sendMessage(m.from, {
        text: `✅ Registration Successful!\n\n👤 Name: ${newUser.name}\n🎂 Age: ${newUser.age}\n⚧️ Gender: ${newUser.gender}\n📲 Number: ${senderNumber}\n🕒 Time: ${new Date(newUser.regTime).toLocaleString()}`
    }, { quoted: m });
});


// ============================================
// 2️⃣ MYINFO
// ============================================
cmd({
    pattern: "myinfo",
    desc: "View your registration info",
    category: "main",
}, async (bot, m) => {

    const senderNumber = m.sender.split("@")[0];
    if (senderNumber !== allowedNumber)
        return bot.sendMessage(m.from, { text: "❌ You are not allowed." }, { quoted: m });

    const db = loadDB();
    const data = db.users.find(u => u.number === senderNumber);

    if (!data) return bot.sendMessage(m.from, { text: "❌ You are not registered!" }, { quoted: m });

    bot.sendMessage(m.from, {
        text: `🪪 YOUR PROFILE INFO\n\n👤 Name: ${data.name}\n🎂 Age: ${data.age}\n⚧️ Gender: ${data.gender}\n📲 Number: ${data.number}\n⏱️ Registered On: ${new Date(data.regTime).toLocaleString()}`
    }, { quoted: m });
});


// ============================================
// 3️⃣ UNREGISTER
// ============================================
cmd({
    pattern: "unregister",
    desc: "Delete your registration",
    category: "main",
}, async (bot, m) => {

    const senderNumber = m.sender.split("@")[0];
    if (senderNumber !== allowedNumber)
        return bot.sendMessage(m.from, { text: "❌ You are not allowed." }, { quoted: m });

    let db = loadDB();
    if (!db.users.find(u => u.number === senderNumber))
        return bot.sendMessage(m.from, { text: "⚠️ You are not registered!" }, { quoted: m });

    db.users = db.users.filter(u => u.number !== senderNumber);
    saveDB(db);

    bot.sendMessage(m.from, { text: "🗑️ Your registration has been deleted!" }, { quoted: m });
});


// ============================================
// 4️⃣ USERINFO
// ============================================
cmd({
    pattern: "userinfo",
    desc: "Check another user's info",
    category: "main",
}, async (bot, m) => {

    const senderNumber = m.sender.split("@")[0];
    if (senderNumber !== allowedNumber)
        return bot.sendMessage(m.from, { text: "❌ You are not allowed." }, { quoted: m });

    const mention = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!mention) return bot.sendMessage(m.from, { text: "❌ Tag a user!" }, { quoted: m });

    const db = loadDB();
    const data = db.users.find(u => u.number === mention.split("@")[0]);
    if (!data) return bot.sendMessage(m.from, { text: "❌ That user is not registered!" }, { quoted: m });

    bot.sendMessage(m.from, {
        text: `🧾 USER INFO\n\n👤 Name: ${data.name}\n🎂 Age: ${data.age}\n⚧️ Gender: ${data.gender}\n📲 Number: ${data.number}\n⏱️ Registered On: ${new Date(data.regTime).toLocaleString()}`
    }, { quoted: m });
});


// ============================================
// 5️⃣ ALLUSERS
// ============================================
cmd({
    pattern: "allusers",
    desc: "Show all registered users",
    category: "main",
}, async (bot, m) => {

    const senderNumber = m.sender.split("@")[0];
    if (senderNumber !== allowedNumber)
        return bot.sendMessage(m.from, { text: "❌ You are not allowed." }, { quoted: m });

    const db = loadDB();
    if (db.users.length === 0) return bot.sendMessage(m.from, { text: "📭 No registered users found!" }, { quoted: m });

    let text = "📋 ALL REGISTERED USERS\n\n";
    db.users.forEach((u, i) => {
        text += `#${i + 1} 👤 ${u.name} | 📲 ${u.number}\n`;
    });

    bot.sendMessage(m.from, { text }, { quoted: m });
});
