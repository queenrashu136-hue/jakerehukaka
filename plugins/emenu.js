const { cmd } = require("../lib/command");

cmd({
    pattern: "menue",
    alias: ["help", "cmds"],
    react: "📜",
    desc: "Show list menu"
}, async (sock, message) => {

    const sections = [
        {
            title: "📌 MAIN COMMANDS",
            rows: [
                { title: "Alive", rowId: ".alive" },
                { title: "Ping", rowId: ".ping" },
                { title: "Owner", rowId: ".owner" }
            ]
        },
        {
            title: "⬇️ DOWNLOAD COMMANDS",
            rows: [
                { title: "Song Download", rowId: ".song example" },
                { title: "Video Download", rowId: ".video example" },
                { title: "Ytmp3", rowId: ".ytmp3 url" },
                { title: "Ytmp4", rowId: ".ytmp4 url" }
            ]
        },
        {
            title: "🔍 SEARCH COMMANDS",
            rows: [
                { title: "Lyrics", rowId: ".lyrics name" },
                { title: "YouTube Search", rowId: ".yts name" },
                { title: "Movie Info", rowId: ".movie name" }
            ]
        },
        {
            title: "🎭 FUN COMMANDS",
            rows: [
                { title: "Truth", rowId: ".truth" },
                { title: "Dare", rowId: ".dare" },
                { title: "Quote", rowId: ".quote" }
            ]
        },
        {
            title: "👑 OWNER COMMANDS",
            rows: [
                { title: "Restart Bot", rowId: ".restart" },
                { title: "Update Bot", rowId: ".update" },
                { title: "Block User", rowId: ".block 0" }
            ]
        }
    ];

    const listMessage = {
        text: "📜 *QUEEN RASHU MD — LIST MENU*",
        footer: "💗 Developed by QUEEN RASHU MD Bot",
        title: "✨ Select a Category Below",
        buttonText: "📂 Open Menu",
        sections
    };

    await sock.sendMessage(message.chat, listMessage, { quoted: message });
});
