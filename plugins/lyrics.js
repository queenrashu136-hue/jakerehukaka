const { cmd } = require("../lib/command");
const axios = require("axios");

// Max message size limit
const MAX_CHARS = 4096;

// Retry helper
async function tryRequest(getter, attempts = 3) {
    let lastErr;
    for (let i = 1; i <= attempts; i++) {
        try {
            return await getter();
        } catch (e) {
            lastErr = e;
            if (i < attempts) await new Promise(r => setTimeout(r, 1000 * i));
        }
    }
    throw lastErr;
}

cmd(
    {
        pattern: "lyrics",
        react: "🎵",
        desc: "Get lyrics of any song",
        category: "music",
        filename: __filename,
    },

    async (bot, mek, m, { from, args, reply }) => {
        try {
            const songTitle = args.join(" ");
            if (!songTitle)
                return reply("🎵 *Please enter a song name!*\n\nUsage: `.lyrics <song name>`");

            reply("🔍 *Searching lyrics...*");

            // API URL
            const apiUrl = `https://lyricsapi.fly.dev/api/lyrics?q=${encodeURIComponent(songTitle)}`;

            // Request with retry
            const res = await tryRequest(() => axios.get(apiUrl), 3);
            const data = res.data;

            const lyrics =
                data?.result?.lyrics ? data.result.lyrics : null;

            if (!lyrics)
                return reply(`❌ No lyrics found for *${songTitle}*`);

            // Handle size limit
            const output =
                lyrics.length > MAX_CHARS
                    ? lyrics.slice(0, MAX_CHARS - 3) + "..."
                    : lyrics;

            await bot.sendMessage(
                from,
                { text: `🎵 *Lyrics for:* _${songTitle}_\n\n${output}` },
                { quoted: mek }
            );

        } catch (err) {
            console.error("LYRICS ERROR:", err);

            reply("❌ *Lyrics fetch failed!* Try again later.");
        }
    }
);
