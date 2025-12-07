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

    const des = "බාශාව තෝරාගනිමු 😅\n\n";

    await conn.sendMessage(from, {
      buttons: [
        {
          buttonId: 'action',
          buttonText: { displayText: '📂 Menu Options' },
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: '𝐂𝐋𝐈𝐂𝐊 𝐇𝐄𝐑𝐄 📂',
              sections: [
                {
                  title: `‼️𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 ❤️‍🩹`,
                  highlight_label: '',
                  rows: [
                    {
                      title: 'SINHALA',
                      description: 'Bot All Sinhala',
                      id: `${prefix}alive`,
                    },
                    {
                      title: 'ENGLISH',
                      description: 'Bot All English',
                      id: `${prefix}menu`,
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
