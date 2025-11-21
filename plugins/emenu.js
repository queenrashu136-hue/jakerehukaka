const { cmd } = require("../lib/command");

cmd({
    pattern: "hack",
    desc: "Fake hacking prank",
    react: "💀"
}, async (sock, message) => {
    try {
        const target = message.mentionedJid?.[0] 
            || message.quoted?.sender 
            || null;

        if (!target) {
            return message.reply("❗ Reply to a message or mention someone to hack.\n\nUsage:\n.hack @user");
        }

        const chat = message.chat;

        // Fake progress messages
        const steps = [
            "🔍 Initializing hack engine...",
            "📡 Connecting to WhatsApp servers...",
            "🛰️ Bypassing security layers...",
            `🧠 Target ID detected: *${target.split("@")[0]}*`,
            "📁 Fetching encrypted data...",
            "🔓 Decrypting messages...",
            "📥 Downloading files...",
            "☣️ Injecting RAT tool...",
            "📡 Uploading payload...",
            "⚠️ Breach detected… Firewall bypassed!",
            "💾 Extracting full data dump...",
            "🟢 HACK COMPLETE!\n\n🔥 *Target Fully Hacked Successfully!*"
        ];

        // Send steps one by one with delay
        for (let x of steps) {
            await sock.sendMessage(chat, { text: x });
            await new Promise(res => setTimeout(res, 1200)); // 1.2 sec delay
        }

    } catch (e) {
        console.log(e);
        message.reply("❌ Error running fake hack.");
    }
});
