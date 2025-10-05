// 🌐 わどぼっとAPI
const API_URL = 'https://wado.onrender.com/status';

// 🌐 Discord Guild Widget JSON API
const GUILD_API = 'https://discord.com/api/guilds/1424339482873696288/widget.json';

// 🟢 Botステータス更新
async function updateStatus() {
  const statusText = document.getElementById('status-text');

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    if (data.status === 'online') {
      statusText.textContent = '🟢 オンライン';
      statusText.className = 'status-online';
    } else {
      statusText.textContent = '🔴 オフライン';
      statusText.className = 'status-offline';
    }
  } catch {
    statusText.textContent = '⚪️ 接続エラー';
    statusText.className = 'status-offline';
  }
}

// 🧩 サーバー情報更新
async function updateGuildInfo() {
  try {
    const res = await fetch(GUILD_API);
    const data = await res.json();

    document.getElementById('guild-name').textContent = `サーバー名: ${data.name}`;
    document.getElementById('guild-members').textContent = `メンバー数: ${data.members.length}`;
    document.getElementById('guild-online').textContent = `オンライン: ${data.presence_count}`;
  } catch (err) {
    document.getElementById('guild-name').textContent = 'サーバー情報を取得できませんでした。';
    console.error('Guild fetch error:', err);
  }
}

// ⏰ 定期更新
setInterval(updateStatus, 3000);
updateStatus();
updateGuildInfo();

// 🎨 ページフェードイン
window.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = 0;
  setTimeout(() => {
    document.body.style.transition = 'opacity 1s';
    document.body.style.opacity = 1;
  }, 150);
});
