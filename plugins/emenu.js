const { cmd } = require("../lib/command");

cmd({
    pattern: "hack",
    desc: "Extreme Fast Fake Hacking for 5 Minutes",
    category: "fun",
}, async (sock, message) => {

    const jid = message.key.remoteJid;

    const steps = [
        "Injecting Malware Script…",
        "Bypassing WhatsApp Firewall…",
        "Extracting Login Tokens…",
        "Decrypting WhatsApp Database…",
        "Accessing Gallery Photos…",
        "Collecting Contact List…",
        "Cracking Encryption Keys…",
        "Syncing Cloud Backup…",
        "Stealing All Passwords…",
        "Uploading Data to Server…",
        "Tracking Device Location…",
        "Activating Remote Camera…",
        "Injecting Spyware…",
        "Extracting Chat Backup…"
    ];

    // Start message
    await sock.sendMessage(jid, { 
        text: "🟢 *EXTREME HACK MODE STARTED*\n⚡ Speed: 20ms\n⏳ Duration: 5 Minutes\n\n🔥 Brace Yourself!" 
    });

    const start = Date.now();
    const limit = 5 * 60 * 1000; // 5 minutes

    const spamFast = async () => {

        // Time over: send final message
        if (Date.now() - start >= limit) {
            await sock.sendMessage(jid, { 
                text: "✅ *Hack Completed Successfully!*\n\n🔥 QUEEN RASHU MD 🔥"
            });
            return;
        }

        // Pick random hack message
        const msg = steps[Math.floor(Math.random() * steps.length)];

        await sock.sendMessage(jid, { text: `🟡 ${msg}` });

        // 20ms speed (EXTREME)
        setTimeout(spamFast, 20);
    };

    spamFast();
});
