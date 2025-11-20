const { cmd } = require("../lib/command");
const yts = require("yt-search");
const axios = require("axios");

// Axios setup
const AXIOS_DEFAULTS = {
    timeout: 60000,
    headers: {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
    },
};

// Retry wrapper
async function tryRequest(getter, attempts = 3) {
    let lastErr;
    for (let a = 1; a <= attempts; a++) {
        try {
            return await getter();
        } catch (err) {
            lastErr = err;
            if (a < attempts) await new Promise((r) => setTimeout(r, 1000 * a));
        }
    }
    throw lastErr;
}

// Izumi primary
async function izumiByUrl(url) {
    const api = `https://izumiiiiiiii.dpdns.org/downloader/youtube?url=${encodeURIComponent(url)}&format=mp3`;
    const res = await tryRequest(() => axios.get(api, AXIOS_DEFAULTS));
    if (res?.data?.result?.download) return res.data.result;
    throw new Error("Izumi URL failed");
}

// Izumi secondary search
async function izumiByQuery(q) {
    const api = `https://izumiiiiiiii.dpdns.org/downloader/youtube-play?query=${encodeURIComponent(q)}`;
    const res = await tryRequest(() => axios.get(api, AXIOS_DEFAULTS));
    if (res?.data?.result?.download) return res.data.result;
    throw new Error("Izumi Query failed");
}

// Okatsu fallback
async function okatsu(url) {
    const api = `https://okatsu-rolezapiiz.vercel.app/downloader/ytmp3?url=${encodeURIComponent(url)}`;
    const res = await tryRequest(() => axios.get(api, AXIOS_DEFAULTS));
    if (res?.data?.dl) {
        return {
            download: res.data.dl,
            title: res.data.title,
            thumbnail: res.data.thumb,
        };
    }
    throw new Error("Okatsu failed");
}

// MAIN COMMAND
cmd(
    {
        pattern: "song",
        react: "🎵",
        desc: "Download YouTube Song in MP3",
        category: "download",
        filename: __filename,
    },

    async (bot, mek, m, { from, args, reply }) => {
        try {
            const q = args.join(" ");
            if (!q) return reply("🎵 *Please provide a song name or YouTube link!*");

            // Detect URL or Search
            let video;
            if (q.includes("youtu.be") || q.includes("youtube.com")) {
                video = { url: q };
            } else {
                const s = await yts(q);
                if (!s?.videos?.length) return reply("❌ No results found!");
                video = s.videos[0];
            }

            // Send info card
            await bot.sendMessage(
                from,
                {
                    image: { url: video.thumbnail },
                    caption: `*🎧 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 Song Downloader 💗*\n\n*📍 Title:* _${video.title}_\n*📍 Duration:* _${video.timestamp}_\n\n> 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 🫟`,
                },
                { quoted: mek }
            );

            // Download with fallback logic
            let dl;
            try {
                dl = await izumiByUrl(video.url);
            } catch {
                try {
                    dl = await izumiByQuery(video.title);
                } catch {
                    dl = await okatsu(video.url);
                }
            }

            const finalUrl = dl.download || dl.dl || dl.url;

            // Send Audio (Play)
            await bot.sendMessage(
                from,
                {
                    audio: { url: finalUrl },
                    mimetype: "audio/mpeg",
                    fileName: `${dl.title || video.title}.mp3`,
                    ptt: false,
                },
                { quoted: mek }
            );

            // Send as Document (File)
            await bot.sendMessage(
                from,
                {
                    document: { url: finalUrl },
                    mimetype: "audio/mpeg",
                    fileName: `${dl.title || video.title}.mp3`,
                },
                { quoted: mek }
            );

            reply("*🎧 Song Download Success (Audio + Document) ...✅*");

        } catch (err) {
            console.error("Song Error:", err);
            reply("❌ Failed to download the song.");
        }
    }
);
