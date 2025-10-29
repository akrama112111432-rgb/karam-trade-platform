// بسيط: تفاعلات الواجهة ومحاكاة التداول + i18n
const I18N = {
  ar: { balance:'الرصيد التجريبي', profit:'الربح/الخسارة', openOrders:'أوامر مفتوحة', activity:'سجل النشاط', videos:'الفيديوهات', indicators:'المؤشرات', account:'حسابي' },
  en: { balance:'Demo Balance', profit:'P/L', openOrders:'Open Orders', activity:'Activity Log', videos:'Videos', indicators:'Indicators', account:'Account' },
  tr: { balance:'Demo Bakiye', profit:'K/Z', openOrders:'Açık Emirler', activity:'Etkinlik', videos:'Videolar', indicators:'Göstergeler', account:'Hesabım' }
};

document.addEventListener('DOMContentLoaded', ()=> {
  // عناصر
  const pages = document.querySelectorAll('.page');
  const navs = document.querySelectorAll('.nav-item');
  const log = document.getElementById('log');
  const balanceEl = document.getElementById('balance');
  const profitEl = document.getElementById('profit');
  const ordersEl = document.getElementById('orders');
  const buy = document.getElementById('buy');
  const sell = document.getElementById('sell');
  const asset = document.getElementById('asset');
  const year = document.getElementById('year');
  const langSel = document.getElementById('lang');

  year && (year.textContent = new Date().getFullYear());

  // صفحة تنقل
  navs.forEach(n => n.addEventListener('click', ()=> {
    navs.forEach(x=>x.classList.remove('active'));
    n.classList.add('active');
    const t = n.dataset.target;
    pages.forEach(p => p.id === t ? p.classList.remove('hidden') : p.classList.add('hidden'));
    window.scrollTo({top:0,behavior:'smooth'});
  }));

  // محاكاة رصيد
  let balance = 1000, orders = 0;
  function addLog(text){ log.value = `${new Date().toLocaleTimeString()} — ${text}\n` + log.value; }

  buy && buy.addEventListener('click', ()=> {
    const change = (Math.random()*5).toFixed(2);
    balance -= parseFloat(change);
    orders++;
    balanceEl.textContent = `${balance.toFixed(2)} $`;
    ordersEl.textContent = orders;
    profitEl.textContent = `+${(Math.random()*2).toFixed(2)}%`;
    addLog(`شراء ${asset.value} — ${change}$`);
  });
  sell && sell.addEventListener('click', ()=> {
    const change = (Math.random()*6).toFixed(2);
    balance += parseFloat(change);
    orders++;
    balanceEl.textContent = `${balance.toFixed(2)} $`;
    ordersEl.textContent = orders;
    profitEl.textContent = `${(Math.random()*2-1).toFixed(2)}%`;
    addLog(`بيع ${asset.value} — ${change}$`);
  });

  // فتح مودال الحساب
  const openAccount = document.getElementById('openAccount');
  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('closeModal');
  const saveProfile = document.getElementById('saveProfile');
  const modalMsg = document.getElementById('modalMsg');
  openAccount && openAccount.addEventListener('click', ()=> modal.classList.remove('hidden'));
  closeModal && closeModal.addEventListener('click', ()=> modal.classList.add('hidden'));
  saveProfile && saveProfile.addEventListener('click', ()=> {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    if(!name || !email){ modalMsg.textContent = 'أدخل الاسم والبريد'; return; }
    localStorage.setItem('ktp_user', JSON.stringify({name,email,trialEnds:Date.now()+7*24*3600*1000}));
    modalMsg.textContent = 'تم التسجيل — تجربة 7 أيام مفعلة';
    setTimeout(()=> modal.classList.add('hidden'),900);
  });

  // i18n تبديل لغة
  function applyLang(l){
    const t = I18N[l] || I18N.ar;
    document.querySelector('[data-i18n="balance"]').textContent = t.balance;
    document.querySelector('[data-i18n="profit"]').textContent = t.profit;
    document.querySelector('[data-i18n="openOrders"]').textContent = t.openOrders;
    document.querySelector('[data-i18n="activity"]').textContent = t.activity;
    document.querySelector('[data-i18n="videos"]').textContent = t.videos;
    document.querySelector('[data-i18n="indicators"]').textContent = t.indicators;
    document.querySelector('[data-i18n="account"]').textContent = t.account;
    // اتجاه الصفحة
    document.documentElement.lang = l;
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  }
  langSel && langSel.addEventListener('change', (e)=> { localStorage.setItem('ktp_lang', e.target.value); applyLang(e.target.value); });
  const savedLang = localStorage.getItem('ktp_lang') || 'ar';
  langSel.value = savedLang;
  applyLang(savedLang);

  // PWA install button (deferred prompt)
  let deferredPrompt;
  const installBtn = document.getElementById('installBtn');
  window.addEventListener('beforeinstallprompt', (e)=> { e.preventDefault(); deferredPrompt = e; installBtn.style.display = 'inline-block'; });
  installBtn && installBtn.addEventListener('click', async ()=> {
    if(!deferredPrompt) return alert('لا يتوفر خيار التثبيت الآن');
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    addLog('نتيجة التثبيت: ' + choice.outcome);
    deferredPrompt = null;
    installBtn.style.display = 'none';
  });
});
