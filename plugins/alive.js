const config = require("../settings");
const prefix = config.PREFIX; // now hardcoded

const mono = "```";
const { cmd, commands } = require('../lib/command');
const os = require('os');
const fetch = require("node-fetch");
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, fetchJson , runtime , sleep, mode, formatTime } = require('../lib/functions');
const moment = require("moment");

let botStartTime = Date.now();

cmd({
    pattern: "alive",
    desc: "Check bot online or no.",
    category: "main",
    use: ".alive",
    react: "👋",
    filename: __filename
}, 
async (conn, mek, m, { from, pushname, reply }) => {
    try {
    
    const senderNumber = m.sender.split("@")[0];
        const senderName = pushname || "𝑸𝑼𝑬𝑬𝑵 𝑹𝑨𝑺𝑯𝑼 𝑴𝑫 𝑼𝑺𝑬𝑹";

        // 🧠 Fake quoted message with user info
        const fakeQuoted = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                ...(from ? { remoteJid: "status@broadcast" } : {})
            },
            message: {
                extendedTextMessage: {
                    text: `👤 User: ${senderName}\n📱 Number: wa.me/${senderNumber}`,
                    contextInfo: {
                        forwardingScore: 999,
                        isForwarded: true,
                        externalAdReply: {
                            title: "𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃",
                            body: "© ᴅᴇᴠᴇʟᴏᴘ ʙʏ ɴɪᴘᴜɴ ʜᴀʀꜱʜᴀɴᴀ",
                            mediaType: 1,
                            thumbnailUrl: "https://i.ibb.co/7N087ZHh/Queen-Rashu-Md.jpg",
                            sourceUrl: "https://github.com/CyberRushModz0",
                            renderLargerThumbnail: true
                        }
                    }
                }
            }
        };
        
        let des = `*👋  𝐇𝐈, _${pushname}_  𝐈 𝐀𝐌 𝐀𝐋𝐈𝐕𝐄 𝐍𝐎𝐖 🪄🫂*

‼️𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝐁𝐄𝐓𝐀 ❤️‍🩹

*╭─「 ꜱᴛᴀᴛᴜꜱ ᴅᴇᴛᴀɪʟꜱ 」*
*│*👤 *User*: ${pushname}
*│*🪀 *User Number*: ${senderNumber}
*│*✒️ *Prefix*: .
*│*🧬 *Version*: Beta 
*│*🎈 *Platform*: 
*│*📡 *Host*: ${os.hostname()}
*│*📟 *Uptime*: ${runtime(process.uptime())}
*│*📂 *Memory*: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
*╰──────────●●►*
*╭─「 ʙᴏᴛ ɢɪᴛʜᴜʙ & ᴏᴛʜᴇʀ ɪɴꜰᴏ 」*
*│*🫟 *GitHub*= https://github.com/CyberRushModz0
*╰──────────●●►*
*╭──────────●●►*
*│* *Hello , I am alive now!!*
*╰──────────●●►*`;

await conn.sendMessage(from, {
        video: {
            url: 'https://github.com/CyberRushModz0/QueenRashu-Database/raw/refs/heads/main/InShot_20250719_221951156.mp4?raw=true'
        },
        mimetype: 'video/mp4',
        ptv: true
    }, { quoted: mek });
    
        await conn.sendMessage(from, {
    buttons: [
        {
            buttonId: `${prefix}menu`,
            buttonText: { displayText: 'MENU' },
            type: 1,
        },
        {
            buttonId: `${prefix}ping`,
            buttonText: { displayText: 'PING' },
            type: 1,
        },
        {
            buttonId: 'action',
            buttonText: {
                displayText: '📂 Menu Options'
            },
            type: 4,
            nativeFlowInfo: {
                name: 'single_select',
                paramsJson: JSON.stringify({
                    title: 'Click here 📂',
                    sections: [
                        {
                            title: `‼️𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 ❤️‍🩹`,
                            highlight_label: '',
                            rows: [
                                {
                                    title: 'MENU 📂',
                                    description: '© ᴅᴇᴠᴇʟᴏᴘ ʙʏ ɴɪᴘᴜɴ ʜᴀʀꜱʜᴀɴᴀ',
                                    id: `${prefix}menu`,
                                },
                                {
                                    title: 'OWNER 🍁',
                                    description: '> 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝙾𝙵𝙲 🫟',
                                    id: `${prefix}owner`,
                                },
                                {
                                    title: 'PING 🫆',
                                    description: '> 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝙾𝙵𝙲 🫟',
                                    id: `${prefix}ping`,
                                },
                                {
                                    title: 'SYSTEM 🌐',
                                    description: '> 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝙾𝙵𝙲 🫟',
                                    id: `${prefix}system`,
                                },
                                {
                                    title: 'REPO 📌',
                                    description: '> 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝙾𝙵𝙲 🫟',
                                    id: `${prefix}repo`,
                                },
                            ],
                        },
                    ],
                }),
            }
        }
    ],
    headerType: 1,
    viewOnce: true,
    image: { url: "https://i.ibb.co/7N087ZHh/Queen-Rashu-Md.jpg" },
    caption: des,
}, { quoted: fakeQuoted });

      await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/el1dgb.mp3' }, // Audio URL
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });
        
    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        reply('❌ An error occurred while processing your request.');
    }
});