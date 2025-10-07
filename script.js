// 🌐 わどぼっとAPI
const API_URL = 'https://wado.onrender.com/status';
const GUILD_WIDGET = 'https://discord.com/api/guilds/1424339482873696288/widget.json';

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

// 💬 Discordオンラインメンバー表示
async function loadOnlineMembers() {
  const list = document.getElementById('online-members');
  try {
    const res = await fetch(GUILD_WIDGET);
    const data = await res.json();
    if (!data.members || data.members.length === 0) {
      list.innerHTML = '<li>現在オンラインのメンバーはいません。</li>';
      return;
    }

    list.innerHTML = '';
    data.members
      .filter(m => !m.status?.includes('offline'))
      .forEach(member => {
        const li = document.createElement('li');
        li.textContent = member.username;
        list.appendChild(li);
      });
  } catch {
    list.innerHTML = '<li>読み込みに失敗しました。</li>';
  }
}

// 初期化
setInterval(updateStatus, 3000);
updateStatus();
loadOnlineMembers();

// フェードイン
window.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = 0;
  setTimeout(() => {
    document.body.style.transition = 'opacity 1s';
    document.body.style.opacity = 1;
  }, 150);
});
