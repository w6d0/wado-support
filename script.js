// 🌐 わどぼっとAPI
const API_URL = 'https://wado.onrender.com/status';

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

// ⏰ 定期更新
setInterval(updateStatus, 3000);
updateStatus();

// 🎨 ページフェードイン
window.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = 0;
  setTimeout(() => {
    document.body.style.transition = 'opacity 1s';
    document.body.style.opacity = 1;
  }, 150);
});
