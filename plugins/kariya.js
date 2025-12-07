const { cmd } = require("../lib/command");

cmd(
  {
    pattern: "කැරියා",
    react: "😚",
    desc: "Rate target person's carry level",
    category: "fun",
    filename: __filename,
    fromMe: false,
  },

  async (malvin, mek, m, { reply, isCreator }) => {
    try {
      const from = mek.key.remoteJid;

      // sender
      const senderJid = mek.key.participant || mek.key.remoteJid;
      const senderNum = senderJid.split("@")[0];

      // target mention or default sender
      const mention = mek.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || senderJid;
      const mentionNum = mention.split("@")[0];

      // Owner Number (Without +)
      const ownerNumber = "94764085107";  // CHANGE THIS!

      const isBigBoss = mentionNum === ownerNumber;

      let kariRate;

      if (isBigBoss) {
        // Owner gets 900–1000
        kariRate = Math.floor(Math.random() * 101) + 900;
      } else {
        // Users get 0–1000
        kariRate = Math.floor(Math.random() * 1001);
      }

      let finalMsg = "";

      if (kariRate > 900) {
        finalMsg = `😨 අම්මෝ.. @${mentionNum} කියන්නේ\n*${kariRate}/1000* ක රියල් වැඩ පුලුවන් සුපිරි කැරියෙක්නේ 🖕😎`;
      } else if (kariRate > 500) {
        finalMsg = `😒 @${mentionNum} ගේ කැරි ගතිය\n*${kariRate}/1000* ක් තියෙනවා.. ශේප් නේහ් ටිකක් 🤭😌`;
      } else {
        finalMsg = `😇 @${mentionNum} අහිංසකයි ටිකක්..\nකැරි පොන්න ගතියක් තියේ😂 *${kariRate}/1000* ❤️`;
      }

      await malvin.sendMessage(
        from,
        {
          text: finalMsg,
          mentions: [mention],
        },
        { quoted: mek }
      );

    } catch (e) {
      console.log("❌ Error in කැරියා command:", e);
      reply("❌ Error in 'කැරියා' command!");
    }
  }
);
