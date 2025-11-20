const { cmd } = require("../lib/command");
const axios = require("axios");

cmd({
    pattern: "ninfo",
    desc: "Get number information",
    use: "<number>",
    react: "📱"
}, 
async (sock, message, args) => {

    try {
        const num = args.replace(/[^0-9]/g, "");
        if (!num || num.length < 8) {
            return await sock.sendMessage(message.chat, {
                text: "❗ *Usage:* .ninfo 947xxxxxxxx"
            });
        }

        const jid = num + "@s.whatsapp.net";

        // -----------------------
        // 1️⃣ NUMBER VALIDITY + COUNTRY CHECK
        // -----------------------
        const lookup = await axios.get(`https://numlookupapi.com/api/validate/${num}?apikey=free`);

        const country = lookup.data.country_name || "Unknown";
        const carrier = lookup.data.carrier || "Unknown";
        const valid = lookup.data.valid ? "Yes" : "No";

        // -----------------------
        // 2️⃣ WHATSAPP ACCOUNT EXISTS?
        // -----------------------
        let exists = false;
        try {
            exists = await sock.onWhatsApp(num);
            exists = exists[0]?.exists ? "Yes" : "No";
        } catch {
            exists = "Unknown";
        }

        // -----------------------
        // 3️⃣ SAVED CONTACT NAME (YOUR PHONE)
        // -----------------------
        let savedName = "Not saved";
        try {
            const cont = await sock.getName(jid);
            if (cont) savedName = cont;
        } catch {}

        // -----------------------
        // 4️⃣ PROFILE PIC EXISTS?
        // -----------------------
        let dp = "No";
        try {
            const pp = await sock.profilePictureUrl(jid, "image");
            if (pp) dp = "Yes";
        } catch {
            dp = "No";
        }

        // -----------------------
        // 5️⃣ BLOCK DETECTION (Partial)
        // -----------------------
        let blocked = "Cannot verify";
        try {
            // If cannot fetch pp, lastSeen, status -> maybe blocked
            if (dp === "No") blocked = "Possible";
            else blocked = "No";
        } catch {}

        // -----------------------
        // FINAL OUTPUT
        // -----------------------
        const text = `
📱 *WHATSAPP NUMBER INFO*

• 🌍 *Country:* ${country}
• 🏢 *Carrier:* ${carrier}
• ✔️ *Valid Number:* ${valid}

• 💬 *WhatsApp Account:* ${exists}
• 📝 *Saved Name (Your Phone):* ${savedName}
• 🖼️ *Profile Picture:* ${dp}
• 🚫 *Blocked You:* ${blocked}

• 🔢 *JID:* ${jid}

━━━━━━━━━━━━━━
💗 *QUEEN RASHU MD — Number Info Tool*
        `.trim();

        await sock.sendMessage(message.chat, { text }, { quoted: message });

    } catch (e) {
        console.log("ninfo error:", e);
        await sock.sendMessage(message.chat, { text: "❌ Error processing number." });
    }
});
