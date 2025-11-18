
const { cmd } = require("../lib/command");
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

cmd({
  pattern: 'webclone',
  alias: ['savehtml'],
  desc: "Download and send raw HTML of a webpage as .html file.",
  react: '🌐',
  category: "other",
  use: ".webclone <url>",
  filename: __filename
}, async (conn, m, store, {
  from,
  args,
  reply
}) => {
  const url = args[0];
  if (!url) return reply("❌ Provide a website URL!\n\nExample:\n.webclone https://example.com");
  if (!/^https?:\/\//.test(url)) return reply("⚠️ Invalid URL. Must start with http:// or https://");

  try {

    const res = await fetch(url);
    if (!res.ok) return reply("❌ Failed to fetch the webpage.");
    const html = await res.text();

    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    let title = titleMatch ? titleMatch[1].trim() : `website_${Date.now()}`;

    title = title.replace(/[<>:"/\\|?*\x00-\x1F]/g, "").substring(0, 50); // Limit to 50 chars

    const fileName = `${title}.html`;
    const filePath = path.join(__dirname, `../${fileName}`);

    fs.writeFileSync(filePath, html);

    await conn.sendMessage(from, {
      document: fs.readFileSync(filePath),
      fileName: fileName,
      mimetype: 'text/html',
      caption: `📄 *HTML file of:* ${url}\n*Title:* ${title}\n\n> 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝐐𝐔𝐄𝐄𝐍 𝐑𝐀𝐒𝐇𝐔 𝐌𝐃 𝙾𝙵𝙲 🫟`
    }, { quoted: m });

    fs.unlinkSync(filePath);

  } catch (e) {
    console.error(e);
    reply("❌ Error fetching or sending the HTML file.");
  }
});