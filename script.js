// 🌐 わどぼっとAPI
const BOT_API_URL = 'https://wado.onrender.com/status';
const GUILD_WIDGET_URL = 'https://discord.com/api/guilds/1424339482873696288/widget.json';

// 🟢 Botステータス更新
async function updateStatus() {
  const statusText = document.getElementById('status-text');

  try {
    const res = await fetch(BOT_API_URL);
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

// 👥 Discordオンラインメンバー取得
async function loadOnlineMembers() {
  const container = document.querySelector('.widget');
  let memberList = document.getElementById('member-list');

  // 既に要素がない場合は作成
  if (!memberList) {
    memberList = document.createElement('div');
    memberList.id = 'member-list';
    memberList.innerHTML = '<p>👥 読み込み中...</p>';
    container.appendChild(memberList);
  }

  try {
    const res = await fetch(GUILD_WIDGET_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const members = data.members?.filter(m => m.status === 'online') || [];

    if (members.length === 0) {
      memberList.innerHTML = '<p>😴 現在オンラインのメンバーはいません。</p>';
      return;
    }

    // ✨ メンバー一覧を生成
    memberList.innerHTML = `
      <h4>🟢 オンラインメンバー (${members.length})</h4>
      <div class="member-grid">
        ${members
          .map(
            (m) => `
            <div class="member">
              <img src="${m.avatar_url}" alt="${m.username}" loading="lazy"/>
              <p>${m.username}</p>
            </div>`
          )
          .join('')}
      </div>
    `;
  } catch (err) {
    memberList.innerHTML = `<p>⚠️ メンバー取得失敗: ${err.message}</p>`;
  }
}

// 🔁 定期更新
setInterval(() => {
  updateStatus();
  loadOnlineMembers();
}, 5000);

updateStatus();
loadOnlineMembers();

// 🎨 ページフェードイン
window.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = 0;
  setTimeout(() => {
    document.body.style.transition = 'opacity 1s';
    document.body.style.opacity = 1;
  }, 150);
});
