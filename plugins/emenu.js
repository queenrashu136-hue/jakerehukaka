const { cmd } = require("../lib/command");

cmd({
    pattern: "hack",
    desc: "Fake WhatsApp Hacking Progress",
    category: "fun",
}, async (sock, message, args) => {

    const jid = message.key.remoteJid;

    // Hacking progress messages
    const steps = [
        "Initializing Hack Tool…",
        "Bypassing WhatsApp Firewall…",
        "Connecting to Target Server…",
        "Extracting Session Tokens…",
        "Accessing Encrypted Databases…",
        "Decrypting Messages…",
        "Extracting Images…",
        "Injecting Spy Script…",
        "Fetching Live Chat Data…",
        "Tracking Last Seen…",
        "Accessing Camera…",
        "Processing Audio Messages…",
        "Cracking Backup Password…",
        "Uploading Data to Server…",
        "Finalizing Hack…",
    ];

    let index = 0;

    // Send every 10 seconds
    const interval = setInterval(async () => {

        if (index >= steps.length) {
            clearInterval(interval);

            // Final Message with QUEEN RASHU MD
            return await sock.sendMessage(jid, { 
                text: "✅ *Hack Completed Successfully!*\n\n🔥 *QUEEN RASHU MD* 🔥"
            });
        }

        await sock.sendMessage(jid, { 
            text: `🟢 *HACK PROGRESS*\n\n${steps[index]}` 
        });

        index++;

    }, 10000); // 5 minutes total

    await sock.sendMessage(jid, { 
        text: "🔐 *Fake Hacking Started...*\nPlease wait 5 minutes! 🔥"
    });
});
