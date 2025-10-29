// app.js — تفاعلات خفيفة
document.addEventListener('DOMContentLoaded', function(){
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // modal controls
  const modal = document.getElementById('modal');
  const openSub = document.getElementById('open-sub');
  const closeModal = document.getElementById('close-modal');
  const cancelBtn = document.getElementById('cancel');
  const confirmBtn = document.getElementById('confirm');
  const planButtons = document.querySelectorAll('.choose');

  function openModal(plan){
    document.getElementById('modal-title').textContent = plan === 'month' ? 'اشتراك شهري' : plan === 'year' ? 'اشتراك سنوي' : 'اشتراك أسبوعي';
    modal.classList.remove('hidden');
  }
  function close(){ modal.classList.add('hidden'); }

  openSub && openSub.addEventListener('click', ()=> openModal('month'));
  closeModal.addEventListener('click', close);
  cancelBtn.addEventListener('click', close);
  confirmBtn.addEventListener('click', function(){ 
    alert('شكراً! هذه نسخة تجريبية. سيتم ربط بوابة الدفع لاحقًا.');
    close();
  });

  planButtons.forEach(b=>{
    b.addEventListener('click', ()=> {
      openModal(b.dataset.plan);
    });
  });

  // language switch (مثالي — يمكنك استبدال النصوص لاحقاً)
  const lang = document.getElementById('lang');
  lang && lang.addEventListener('change', (e)=>{
    const value = e.target.value;
    if(value === 'en'){
      location.href = 'index.html?lang=en';
      // for demo we just change titles
      document.querySelector('.title-en').style.display = 'block';
    } else {
      // Arabic default
    }
  });
});
