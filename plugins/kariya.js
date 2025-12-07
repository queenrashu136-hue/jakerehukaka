const { cmd } = require("../lib/command");

cmd(
  {
    pattern: "rash",
    react: "🔥",
    desc: "Owner / User rating message",
    category: "fun",
    filename: __filename,
    fromMe: false,
  },

  async (malvin, mek, m, { reply }) => {
    try {
      const from = mek.key.remoteJid;
      const senderJid = mek.key.participant || mek.key.remoteJid;
      const senderNum = senderJid.split("@")[0];

      const ownerNumber = "94764085107"; // <-- OWNER NUMBER WITHOUT + SIGN
      const tag = "@" + senderNum;

      // IF owner uses the command
      if (senderNum === ownerNumber) {
        await malvin.sendMessage(
          from,
          {
            text: `${tag} ❤️ *1000/100*\n🔥 මූ තමා REAL කැරියා😚`,
            mentions: [senderJid],
          },
          { quoted: mek }
        );
      } 
      // IF normal user uses the command
      else {
        await malvin.sendMessage(
          from,
          {
            text: `${tag} 😂 *689/1000*\n🤣 මූ තමා ලොකුම පොන්නයා`,
            mentions: [senderJid],
          },
          { quoted: mek }
        );
      }
    } catch (e) {
      console.error("❌ Error in .rashu command:", e);
      reply("❌ Error while running rashu command!");
    }
  }
);
