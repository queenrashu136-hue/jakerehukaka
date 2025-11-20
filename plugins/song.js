const { cmd } = require("../lib/command");
const yts = require("yt-search");
const axios = require("axios");

let pendingSong = {}; // Store pending results for reply handling

// Axios setup
const AXIOS_DEFAULTS = {
    timeout: 60000,
    headers: {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
    },
};

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

// Izumi secondary
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

// MAIN .song COMMAND
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

            // Send Info Message
            const infoMsg = await bot.sendMessage(
                from,
                {
                    image: { url: video.thumbnail },
                    caption:
                        `*🎧 SONG REQUESTED*\n\n` +
                        `*📍 Title:* _${video.title}_\n` +
                        `*📍 Duration:* _${video.timestamp}_\n\n` +
                        `➡️ Reply *1* = Audio\n➡️ Reply *2* = Document\n\n` +
                        `> Powered by Queen Rashu MD 💗`,
                },
                { quoted: mek }
            );

            // Save pending data
            pendingSong[infoMsg.key.id] = {
                url: video.url,
                title: video.title,
            };

        } catch (err) {
            console.error("Song Error:", err);
            reply("❌ Failed to process your request.");
        }
    }
);


// REPLY HANDLER
cmd(
    {
        on: "text",
    },

    async (bot, mek, m, { from, reply }) => {
        try {
            if (!m.quoted) return;
            const quotedId = m.quoted.id;
            const choice = m.text.trim();

            if (!pendingSong[quotedId]) return;

            const { url, title } = pendingSong[quotedId];

            // download handler
            let dl;
            try {
                dl = await izumiByUrl(url);
            } catch {
                try {
                    dl = await izumiByQuery(title);
                } catch {
                    dl = await okatsu(url);
                }
            }

            const finalUrl = dl.download || dl.dl || dl.url;

            if (choice === "1") {
                // send audio
                await bot.sendMessage(
                    from,
                    {
                        audio: { url: finalUrl },
                        mimetype: "audio/mpeg",
                        fileName: `${title}.mp3`,
                    },
                    { quoted: mek }
                );
                reply("🎧 *Audio sent successfully!*");
            }

            if (choice === "2") {
                // send document
                await bot.sendMessage(
                    from,
                    {
                        document: { url: finalUrl },
                        mimetype: "audio/mpeg",
                        fileName: `${title}.mp3`,
                    },
                    { quoted: mek }
                );
                reply("📄 *Document sent successfully!*");
            }

            delete pendingSong[quotedId]; // clear memory
        } catch (err) {
            console.error("Reply Handler Error:", err);
            reply("❌ Failed to download the song.");
        }
    }
);
