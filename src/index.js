const SEND_GUS_MODAL = document.getElementById('send-gus-modal');
const SEND_GUS_MODAL_FORM = document.getElementById('send-gus-modal-form');
const SUCCESS_GUS_MODAL = document.getElementById('success-gus-modal');
const OPEN_GUS_MODAL = document.getElementById('open-gus-modal');

function showModal(el) {
  if (typeof el.showModal === 'function') {
    el.showModal();
  } else {
    alert('Sorry, the <dialog> API is not supported by this browser.');
  }
}

function closeModal(el, returnValue) {
  if (typeof el.close === 'function') {
    el.close(returnValue);
  } else {
    alert('Sorry, the <dialog> API is not supported by this browser.');
  }
}

OPEN_GUS_MODAL.addEventListener('click', () => {
  showModal(SEND_GUS_MODAL);
});

SEND_GUS_MODAL_FORM.addEventListener('submit', (e) => {
  e.preventDefault();

  if (SEND_GUS_MODAL.returnValue === 'close') {
    return;
  }

  const formData = new FormData(SEND_GUS_MODAL_FORM);
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData).toString(),
  }).then(() => {
    closeModal(SEND_GUS_MODAL, 'close');
    showModal(SUCCESS_GUS_MODAL);
  });
});
