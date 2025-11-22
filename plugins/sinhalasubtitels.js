const { cmd } = require("../lib/command");
const axios = require("axios");
const fs = require("fs");

cmd({
    pattern: "sub",
    desc: "Send Sinhala Subtitle + Thumbnail + Title",
    use: ".sub <movie_url>",
    category: "tools"
}, async (sock, message, { args }) => {

    try {
        if (!args || args.length === 0) {
            return await sock.sendMessage(message.chat, { 
                text: "❗ *Usage:* .sub <movie_url>" 
            });
        }

        const movieUrl = args[0];

        // API URL
        const apiUrl = `https://chsubdl.netlify.app/api/scrape?url=${encodeURIComponent(movieUrl)}`;

        // Call API
        const res = await axios.get(apiUrl);
        const data = res.data;

        // Required fields
        const title = data.title || "No Title Found";
        const thumbnail = data.thumbnail || data.image || null;
        const subtitles = data.subtitles || null;

        if (!subtitles) {
            return await sock.sendMessage(message.chat, { 
                text: "❌ Subtitle text not found!" 
            });
        }

        // Send Title + Thumbnail first
        if (thumbnail) {
            await sock.sendMessage(message.chat, {
                image: { url: thumbnail },
                caption: `🎬 *${title}*\n\n📥 Sinhala Subtitle Preparing...`
            });
        } else {
            await sock.sendMessage(message.chat, { 
                text: `🎬 *${title}*\n\n📥 Sinhala Subtitle Loading...`
            });
        }

        // Generate SRT file
        const filePath = "./movie_subtitle.srt";
        fs.writeFileSync(filePath, subtitles);

        await sock.sendMessage(message.chat, {
            document: fs.readFileSync(filePath),
            fileName: `${title}.srt`,
            mimetype: "application/x-subrip",
            caption: "📄 Sinhala Subtitle File"
        });

        fs.unlinkSync(filePath);

    } catch (err) {
        console.log("SUB ERROR:", err);
        await sock.sendMessage(message.chat, { 
            text: "❌ Error downloading subtitles!" 
        });
    }
});
