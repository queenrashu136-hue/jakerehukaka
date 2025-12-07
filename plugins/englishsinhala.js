const os = require("os");
const axios = require("axios");
const { cmd, commands } = require("../lib/command");
const { runtime, sleep } = require("../lib/functions");

cmd({
  pattern: "test1",
  alias: ["test2", "commands", "list", "panel"],
  desc: "Command list with menu button.",
  category: "main",
  use: ".menu",
  react: "📂",
  dontAddCommandList: true,
  filename: __filename
}, async (conn, m, msg, { from, prefix, pushname, reply }) => {
  try {

    // Database footer remove
    await axios.get("https://raw.githubusercontent.com/CyberRushModz0/QueenRashu-Database/refs/heads/main/ditels.json");

    const des = "*📖 𝐒𝐄𝐋𝐄𝐂𝐓 𝐘𝐎𝐔𝐑 𝐋𝐀𝐍𝐆𝐔𝐀𝐆𝐄 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃....*\n\n* *කරුණාකර පහත Select Language Button එක ස්පර්ශ කරන්න.*\n\n* *Please touch the Select Language Button below.*\n\n* *कृपया नीचे भाषा चुनें बटन स्पर्श करें।*\n\n* *கீழே உள்ள மொழியைத் தேர்ந்தெடு பொத்தானைத் தொடவும்.*\n\n> 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝙾𝙵𝙲 🫟";

    await conn.sendMessage(from, {
      buttons: [
        {
          buttonId: 'action',
          buttonText: { displayText: '📂 Menu Options' },
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: 'SELECT LANGUAGE',
              sections: [
                {
                  title: `‼️𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 ❤️‍🩹`,
                  highlight_label: '',
                  rows: [
                    {
                      title: 'සිංහල',
                      description: 'සියල්ල සින්හල භාශාවෙන්',
                      id: `${prefix}sinhalarashu`,
                    },
                    {
                      title: 'ENGLISH',
                      description: 'All In English',
                      id: `${prefix}englishrashu`,
                    },
                    {
                      title: 'हिंदी',
                      description: 'सब हिंदी में',
                      id: `${prefix}hindirashu`,
                    },
                    {
                      title: 'தமிழ்',
                      description: 'அனைத்தும் தமிழில்',
                      id: `${prefix}thamilrashu`,
                    },
                  ],
                },
              ],
            }),
          },
        },
      ],
      headerType: 1,
      viewOnce: true,

      // ⭐ NEW CUSTOM IMAGE⭐
      image: { url: "https://files.catbox.moe/l74kdf.jpg" },

      caption: des,

      // Footer removed ✔
      // footer: footerText

    }, { quoted: m });

    // Voice removed ✔

  } catch (err) {
    console.error(err);
    reply("❌ Error occurred while generating menu.");
  }
});
