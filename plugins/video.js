const { cmd } = require("../lib/command");
const yts = require("yt-search");
const axios = require("axios");

const izumi = {
    baseURL: "https://izumiiiiiiii.dpdns.org"
};

const AXIOS_DEFAULTS = {
    timeout: 60000,
    headers: {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
    },
};

// Retry system
async function tryRequest(getter, attempts = 3) {
    let lastErr;
    for (let i = 1; i <= attempts; i++) {
        try {
            return await getter();
        } catch (e) {
            lastErr = e;
            if (i < attempts) await new Promise((r) => setTimeout(r, 1000 * i));
        }
    }
    throw lastErr;
}

// Izumi 720p downloader
async function getIzumiVideoByUrl(youtubeUrl) {
    const apiUrl = `${izumi.baseURL}/downloader/youtube?url=${encodeURIComponent(
        youtubeUrl
    )}&format=720`;

    const res = await tryRequest(() => axios.get(apiUrl, AXIOS_DEFAULTS));
    if (res?.data?.result?.download) return res.data.result;

    throw new Error("Izumi: No download response");
}

// Okatsu fallback
async function getOkatsuVideoByUrl(youtubeUrl) {
    const apiUrl = `https://okatsu-rolezapiiz.vercel.app/downloader/ytmp4?url=${encodeURIComponent(
        youtubeUrl
    )}`;

    const res = await tryRequest(() => axios.get(apiUrl, AXIOS_DEFAULTS));

    if (res?.data?.result?.mp4) {
        return {
            download: res.data.result.mp4,
            title: res.data.result.title,
        };
    }
    throw new Error("Okatsu: No MP4 found");
}

// Main Command
cmd(
    {
        pattern: "video",
        react: "🎬",
        desc: "Download YouTube Video in MP4",
        category: "download",
        filename: __filename,
    },

    async (bot, mek, m, { from, args, reply }) => {
        try {
            const query = args.join(" ");
            if (!query)
                return reply("🎬 *Please provide a video name or YouTube link!*");

            let videoUrl = "";
            let videoInfo = {};

            // If input is a URL
            if (query.startsWith("http://") || query.startsWith("https://")) {
                videoUrl = query;
            } else {
                // Search YouTube
                const s = await yts(query);
                if (!s?.videos?.length) return reply("❌ No videos found!");

                videoInfo = s.videos[0];
                videoUrl = videoInfo.url;
            }

            // Thumbnail handling
            let thumb = videoInfo.thumbnail;
            let ytId =
                (videoUrl.match(
                    /(?:youtu\.be\/|v=|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/
                ) || [])[1];

            if (!thumb && ytId)
                thumb = `https://i.ytimg.com/vi/${ytId}/sddefault.jpg`;

            // Send Thumbnail
            if (thumb) {
                await bot.sendMessage(
                    from,
                    {
                        image: { url: thumb },
                        caption: `*🎥 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 Video Downloader 💗*\n\n*📍 Title :* _${videoInfo.title || query}_\n\n> Powered by 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃`,
                    },
                    { quoted: mek }
                );
            }

            // Validate YouTube URL
            let valid = videoUrl.match(
                /(?:https?:\/\/)?(?:youtu\.be\/|youtube\.com\/)([\S]+)/
            );
            if (!valid) return reply("❌ Not a valid YouTube link!");

            // Download system
            let dl;
            try {
                dl = await getIzumiVideoByUrl(videoUrl);
            } catch (e1) {
                dl = await getOkatsuVideoByUrl(videoUrl);
            }

            const finalUrl = dl.download;

            // ================================
            // SEND NORMAL VIDEO (MP4)
            // ================================
            await bot.sendMessage(
                from,
                {
                    video: { url: finalUrl },
                    mimetype: "video/mp4",
                    fileName: `${dl.title || videoInfo.title || "video"}.mp4`,
                    caption: `🎬 *${dl.title || videoInfo.title || "Video"}*\n\n> Powered by 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃`,
                },
                { quoted: mek }
            );

            // ================================
            // SEND DOCUMENT VERSION (MP4)
            // ================================
            await bot.sendMessage(
                from,
                {
                    document: { url: finalUrl },
                    mimetype: "video/mp4",
                    fileName: `${dl.title || videoInfo.title || "video"}.mp4`,
                    caption: `📦 *Document Version*\n\n🎬 ${dl.title || videoInfo.title}`,
                },
                { quoted: mek }
            );

            reply("✅ *Video & Document sent successfully!*");

        } catch (e) {
            console.error("[VIDEO ERROR]:", e.message);
            reply("❌ Download failed: " + e.message);
        }
    }
);
