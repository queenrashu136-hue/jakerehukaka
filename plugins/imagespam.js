const { cmd } = require('../lib/command');
const axios = require("axios");

cmd({
    pattern: "imgspam",
    alias: ["ispam", "imagespam"],
    desc: "Send random images spam to a target number",
    react: "🖼️",
    filename: __filename
}, async (conn, mek, m, { from, args, isOwner, reply }) => {

    // Owner Only Command
    if (!isOwner) {
        return await conn.sendMessage(from, { text: "❌ This command is only for the *bot owner!*" });
    }

    // Args check
    if (args.length < 2) {
        return await conn.sendMessage(from, { 
            text: "📌 *Usage:* `.imgspam <number> <count>`\nExample: `.imgspam 9476xxxxxxx 20`"
        });
    }

    const number = args[0].replace(/[^0-9]/g, "");
    const count = parseInt(args[1]);

    if (!number || number.length < 9) {
        return await conn.sendMessage(from, { text: "❌ *Valid phone number danna!*" });
    }

    if (isNaN(count) || count <= 0 || count > 200) {
        return await conn.sendMessage(from, { text: "❌ Count එක valid නෙවෙයි (1 - 200 පමණක්)!" });
    }

    const jid = number + "@s.whatsapp.net";

    // Random images list
    const imgList = [
        "https://i.imgur.com/8fK4Z9E.jpeg",
        "https://i.imgur.com/Eqz2SgZ.jpeg",
        "https://i.imgur.com/TmlEwPt.jpeg",
        "https://i.imgur.com/KFGJq9u.jpeg",
        "https://i.imgur.com/jf2J28B.jpeg",
        "https://i.imgur.com/qy1Z4kI.jpeg"
    ];

    await conn.sendMessage(from, { 
        text: `🖼️ *Image Spam Starting...*\n👉 Target: ${number}\n🔢 Count: ${count}` 
    });

    for (let i = 0; i < count; i++) {

        const img = imgList[Math.floor(Math.random() * imgList.length)];

        await conn.sendMessage(jid, {
            image: { url: img },
            caption: `📩 Random Spam Image #${i + 1}`
        });

        await new Promise(resolve => setTimeout(resolve, 300)); // Anti-ban slow mode
    }

    await conn.sendMessage(from, { text: "✅ *Image Spam Completed!*" });
});
