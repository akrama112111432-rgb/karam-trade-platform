// لغة واجهة بسيطة
const i18n = {
  ar: {
    hero_title: "ابدأ تداولك بسهولة — واجهة تجريبية",
    hero_sub: "واجهة داكنة حديثة، إحصائيات مبسطة، وأزرار سريعة للبدء.",
    wallet: "الرصيد التجريبي",
    stats: "إحصائيات",
    orders: "أوامر سريعة"
  },
  en: {
    hero_title: "Start trading — Demo interface",
    hero_sub: "Dark modern UI, simple stats and quick action buttons.",
    wallet: "Demo Balance",
    stats: "Statistics",
    orders: "Quick Orders"
  }
};

let lang = 'ar';
const applyLang = (l) => {
  lang = l;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(i18n[lang] && i18n[lang][key]) el.textContent = i18n[lang][key];
  });
  document.getElementById('langBtn').textContent = lang === 'ar' ? 'EN' : 'ع';
};
document.getElementById('langBtn').addEventListener('click', ()=>{
  applyLang(lang === 'ar' ? 'en' : 'ar');
});

// فتح لوحة التداول
const openDash = document.getElementById('openDash');
const dashboard = document.getElementById('dashboard');
openDash.addEventListener('click', ()=>{
  dashboard.classList.remove('hidden');
  dashboard.scrollIntoView({behavior:'smooth'});
});

// محاكاة صفقة بسيطة
const simTrade = document.getElementById('simTrade');
const tradeLog = document.getElementById('tradeLog');
const balanceEl = document.getElementById('balance');
let balance = 1000;
function log(msg){ tradeLog.value += `\n${new Date().toLocaleTimeString()} — ${msg}`; tradeLog.scrollTop = tradeLog.scrollHeight; }
document.querySelectorAll('[data-action]').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    const action = e.target.getAttribute('data-action');
    const change = action === 'buy' ? -10 : +8;
    balance += change;
    balanceEl.textContent = `${balance.toFixed(2)} $`;
    log(`${action === 'buy' ? 'شراء' : 'بيع'} : ${change > 0 ? '+' : ''}${change.toFixed(2)} $ — رصيد الآن ${balance.toFixed(2)} $`);
  });
});
document.getElementById('reset').addEventListener('click', ()=>{
  balance = 1000; balanceEl.textContent = `${balance} $`; tradeLog.value = "سجل النشاط سيظهر هنا...";
});

// زر تنفيذ صفقة تجريبية
document.getElementById('simTrade').addEventListener('click', ()=>{
  const profit = (Math.random()*4 - 2).toFixed(2);
  const sign = profit >= 0 ? '+' : '';
  document.getElementById('profit').textContent = `${sign}${profit}%`;
  log(`نتيجة محاكاة: ${sign}${profit}%`);
});

// تثبيت PWA
let deferredPrompt;
const installBtn = document.getElementById('installBtn');
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'inline-block';
});
installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return alert('لا يوجد حدث تثبيت متاح الآن.');
  deferredPrompt.prompt();
  const res = await deferredPrompt.userChoice;
  log('اختيار التثبيت: ' + res.outcome);
  deferredPrompt = null;
  installBtn.style.display = 'none';
});

// تسجيل service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(()=>console.log('SW registered')).catch(()=>console.log('SW failed'));
}

// تهيئة لغة
applyLang(lang);
