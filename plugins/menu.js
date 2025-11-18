const os = require("os");
const axios = require("axios");
const { cmd, commands } = require("../lib/command");
const { runtime, sleep } = require("../lib/functions");

cmd({
  pattern: "menu",
  alias: ["menu", "commands", "list", "panel"],
  desc: "Command list with menu button.",
  category: "main",
  use: ".menu",
  react: "📂",
  dontAddCommandList: true,
  filename: __filename
}, async (conn, m, msg, { from, prefix, pushname, reply }) => {
  try {
    const { data } = await axios.get("https://raw.githubusercontent.com/CyberRushModz0/QueenRashu-Database/refs/heads/main/ditels.json");
    const footerText = data.footer;
    const logoUrl = data.logo || "https://i.ibb.co/7N087ZHh/Queen-Rashu.jpg";

    const des = `*📜 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝐁𝐄𝐓𝐀 Menu List ...*
*👋 Hye ${pushname} Manika .....❤️‍🩹🫂🪄*

⏳ *Runtime :*  
> ${runtime(process.uptime())}
💾 *RAM Usage :*  
> ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${Math.round(require('os').totalmem() / 1024 / 1024)} MB
🧬 *Version :*  
> 2.00
🖥️ *Host Name :*  
> ${os.hostname()}

🔽 Choose a category from the menu below:\n\n`.trim();

    await conn.sendMessage(from, {
      buttons: [
        {
          buttonId: 'action',
          buttonText: {
            displayText: '📂 Menu Options'
          },
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
                    { title: 'Alive 💫', description: 'Show bot status', id: `${prefix}alive` },
                    { title: 'Download Menu 📥', description: 'All download commands', id: `${prefix}category download` },
                    { title: 'Owner Menu ⭕', description: 'Owner only tools', id: `${prefix}category owner` },
                    { title: 'Group Menu 👥', description: 'Group moderation tools', id: `${prefix}category group` },
                    { title: 'Other Menu 🔻', description: 'Miscellaneous tools', id: `${prefix}category other` },
                    { title: 'Search Menu 🔎', description: 'Search from internet', id: `${prefix}category search` },
                    { title: 'Convert Menu 🔄', description: 'Convert formats & data', id: `${prefix}category convert` },
                    { title: 'Main Menu 🫆', description: 'General utilities', id: `${prefix}category main` },
                    { title: 'Bug Menu 🔴', description: 'Bug reporting commands', id: `${prefix}category bug` },
                    { title: 'Movie Menu 🎥', description: 'Movies & series info', id: `${prefix}category movie` },
                    { title: 'AI Menu 🤖', description: 'ChatGPT, AI features', id: `${prefix}category ai` },
                    { title: 'Wallpapers Menu 🌁', description: 'HD wallpapers', id: `${prefix}category wallpapers` },
                    { title: 'Education Menu 🖊️', description: 'Study tools', id: `${prefix}category education` },
                    { title: 'News Menu 🌐', description: 'Live news tools', id: `${prefix}category news` },
                    { title: 'NFSW Menu 🤤', description: 'Live news tools', id: `${prefix}category nfsw` },
                  ],
                },
              ],
            }),
          },
        },
      ],
      headerType: 1,
      viewOnce: true,
      image: { url: logoUrl },
      caption: des,
      footer: footerText
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    reply("❌ Error occurred while generating menu.");
  }
});

cmd({
  pattern: "category",
  dontAddCommandList: true,
  filename: __filename
}, async (conn, m, msg, { from, q: query, pushname, reply }) => {
  try {
    const { data } = await axios.get("https://raw.githubusercontent.com/CyberRushModz0/QueenRashu-Database/refs/heads/main/ditels.json");
    const footerText = data.footer;
    const logoUrl = data.logo || "https://i.ibb.co/7N087ZHh/Queen-Rashu-Md.jpg";

    const category = query.trim().toUpperCase();
    if (!category) return reply("⚠️ Please specify a category name.");
    if (category === "MISC") return reply("⚠️ MISC category is hidden.");

    const cmds = commands.filter(c => c.category?.toUpperCase() === category && !c.dontAddCommandList);
    if (cmds.length === 0) return reply(`❌ No commands found under category: ${category}`);

    let text = `*📜 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝐁𝐄𝐓𝐀 ${category} 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐋𝐈𝐒𝐓*

🔋 *RAM     :* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${Math.round(require('os').totalmem() / 1024 / 1024)} MB
⏱️ *RUN TIME :* ${runtime(process.uptime())}
`;

    for (const command of cmds) {
      text += `*▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬▯●*
*▯ 🔑 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 :* _${command.pattern}_
*▮📆 𝐃𝐄𝐒𝐂 :* _${command.desc}_
*▯📍 𝐔𝐒𝐄 :* _${command.use}_
*▮🪄 𝐒𝐇𝐎𝐑𝐓 :* _${command.alias}_
*▯🖇️ 𝐑𝐄𝐀𝐂𝐓 :* _${command.react}_
*▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬▯●*\n`;
    }

    await conn.sendMessage(from, {
      image: { url: logoUrl },
      caption: text + `\n\n${footerText}\n\n> 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝙾𝙵𝙲 🫟`
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    reply("❌ Error occurred while fetching category.");
  }
});