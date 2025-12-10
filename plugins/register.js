const fs = require("fs");
const path = require("path");
const { cmd } = require("../lib/command");

// Database Path
const dbPath = path.join(__dirname, "../data/users.json");

// Create DB if not exists
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([]));
}

// Helpers
const loadDB = () => JSON.parse(fs.readFileSync(dbPath));
const saveDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));


// ==================================================
// 📌 1. REGISTER COMMAND
// ==================================================
cmd({
    pattern: "register",
    desc: "Register a new user",
    category: "main",
    use: ".register Name Age Gender"
}, async (conn, m, msg, { args, reply }) => {

    if (args.length < 3)
        return reply("❌ Usage: .register Name Age Gender\n\nExample:\n.register Rashu 20 Female");

    const [name, age, gender] = args;
    const user = m.sender;
    const db = loadDB();

    if (db.find(u => u.user === user))
        return reply("⚠️ You are already registered!\nUse: .myinfo");

    const newUser = {
        user,
        name,
        age,
        gender,
        time: Date.now()
    };

    db.push(newUser);
    saveDB(db);

    reply(
`✅ *Registration Complete!*

👤 Name: *${name}*
🎂 Age: *${age}*
⚧️ Gender: *${gender}*
📲 User: @${user.split("@")[0]}

Welcome to Queen Rashu MD ❤️🔥`
    );
});


// ==================================================
// 📌 2. MYINFO (View Your Details)
// ==================================================
cmd({
    pattern: "myinfo",
    desc: "View your register info",
    category: "main",
    use: ".myinfo"
}, async (conn, m, msg, { reply }) => {

    const user = m.sender;
    const db = loadDB();

    const data = db.find(x => x.user === user);
    if (!data) return reply("❌ You are not registered!\nUse: .register Name Age Gender");

    reply(
`🪪 *YOUR PROFILE INFO*

👤 Name: *${data.name}*
🎂 Age: *${data.age}*
⚧️ Gender: *${data.gender}*
📲 Number: @${data.user.split("@")[0]}
⏱️ Registered On: *${new Date(data.time).toLocaleString()}*
`
    );
});


// ==================================================
// 📌 3. UNREGISTER (Delete Yourself)
// ==================================================
cmd({
    pattern: "unregister",
    desc: "Remove your register data",
    category: "main",
    use: ".unregister"
}, async (conn, m, msg, { reply }) => {

    const user = m.sender;
    let db = loadDB();

    if (!db.find(x => x.user === user))
        return reply("⚠️ You are not registered yet!");

    db = db.filter(x => x.user !== user);
    saveDB(db);

    reply("🗑️ Your profile has been successfully deleted!");
});


// ==================================================
// 📌 4. USERINFO (Check Another User)
// ==================================================
cmd({
    pattern: "userinfo",
    desc: "Check another user's info",
    category: "main",
    use: ".userinfo @tag"
}, async (conn, m, msg, { reply }) => {

    const mention = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    if (!mention) return reply("❌ Tag a user!\nExample: .userinfo @user");

    const db = loadDB();
    const data = db.find(x => x.user === mention);

    if (!data)
        return reply("❌ That user is not registered!");

    reply(
`🧾 *USER PROFILE INFO*

👤 Name: *${data.name}*
🎂 Age: *${data.age}*
⚧️ Gender: *${data.gender}*
📲 Number: @${data.user.split("@")[0]}
⏱️ Registered On: *${new Date(data.time).toLocaleString()}*
`
    );
});


// ==================================================
// 📌 5. ALLUSERS (Show List of All Registered Users)
// ==================================================
cmd({
    pattern: "allusers",
    desc: "Show all registered users",
    category: "main",
    use: ".allusers"
}, async (conn, m, msg, { reply }) => {

    const db = loadDB();

    if (db.length === 0)
        return reply("📭 No registered users found!");

    let txt = "📋 *ALL REGISTERED USERS*\n\n";

    db.forEach((u, i) => {
        txt += `• ${i + 1}. @${u.user.split("@")[0]} — *${u.name}*\n`;
    });

    await conn.sendMessage(m.chat, {
        text: txt,
        mentions: db.map(u => u.user)
    });
});
