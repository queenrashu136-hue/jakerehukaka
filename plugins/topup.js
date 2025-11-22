const { cmd } = require("../lib/command");

cmd({
    pattern: "topup",
    desc: "Free Fire Fake Topup System",
    react: "💎"
}, async (sock, message, args) => {
    try {
        if (args.length < 2)
            return await sock.sendMessage(message.key.remoteJid, { 
                text: "⚠️ *Usage:* .topup <GameID> <package>\n\nEx:\n.topup 123456789 weekly\n.topup 1122334455 100diamonds"
            });

        const gameID = args[0];
        const packageName = args.slice(1).join(" ");

        const orderId = "FF" + Math.floor(Math.random() * 9999999);
        const time = new Date().toLocaleString("en-US", { timeZone: "Asia/Colombo" });

        const msg = `
🔥 *FREE FIRE TOPUP SUCCESSFUL*  
━━━━━━━━━━━━━━
💎 *Order ID:* ${orderId}
🧩 *Game ID:* ${gameID}
🎁 *Package:* ${packageName}
⏱️ *Time:* ${time}
━━━━━━━━━━━━━━
✅ *Topup Successfully Added!*  
💠 Thank you for using our service!
        `;

        await sock.sendMessage(message.key.remoteJid, { text: msg });

    } catch (e) {
        console.log(e);
        await sock.sendMessage(message.key.remoteJid, { text: "❌ Error occurred!" });
    }
});
