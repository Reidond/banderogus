const SEND_GUS_MODAL = document.getElementById('send-gus-modal');
const SEND_GUS_MODAL_STEP1 = document.getElementById('send-gus-modal-step-1');
const SEND_GUS_MODAL_STEP2 = document.getElementById('send-gus-modal-step-2');
const OPEN_GUS_MODAL = document.getElementById('open-gus-modal');

function hideElement(el, value = true) {
  if (value) {
    el.classList.remove('hidden');
    el.classList.add('hidden');
    el.dataset.hidden = 'true';
  } else {
    el.classList.remove('hidden');
    el.dataset.hidden = 'false';
  }
}

function resetModalState() {
  hideElement(SEND_GUS_MODAL_STEP1, false);
  hideElement(SEND_GUS_MODAL_STEP2);
}

SEND_GUS_MODAL.addEventListener('close', (e) => {
  const returnValue = SEND_GUS_MODAL.returnValue;
  if (returnValue === 'close') {
    resetModalState();
  } else if (returnValue === 'ok') {
    SEND_GUS_MODAL.showModal();
    hideElement(SEND_GUS_MODAL_STEP1, true);
    hideElement(SEND_GUS_MODAL_STEP2, false);
  }
});

OPEN_GUS_MODAL.addEventListener('click', () => {
  if (typeof SEND_GUS_MODAL.showModal === 'function') {
    SEND_GUS_MODAL.showModal();
  } else {
    alert('Sorry, the <dialog> API is not supported by this browser.');
  }
});
