import '@polymer/paper-spinner/paper-spinner.js';

const SEND_GUS_MODAL = document.getElementById('send-gus-modal');
const SEND_GUS_MODAL_FORM = document.getElementById('send-gus-modal-form');
const SEND_GUS_MODAL_FORM_SUBMIT = document.getElementById(
  'send-gus-modal-form-submit'
);
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

function showLoader(el, value) {
  const text = el.querySelector('[data-text]');
  const loader = el.querySelector('[data-loader]');
  if (value) {
    text.classList.add('hidden');
    loader.classList.remove('hidden');
  } else {
    text.classList.remove('hidden');
    loader.classList.add('hidden');
  }
}

OPEN_GUS_MODAL.addEventListener('click', () => {
  showModal(SEND_GUS_MODAL);
});

SUCCESS_GUS_MODAL.addEventListener('close', () => {
  if (SUCCESS_GUS_MODAL.returnValue === 'close') {
    location.reload();
  }
});

SEND_GUS_MODAL_FORM.addEventListener('submit', (e) => {
  e.preventDefault();

  if (SEND_GUS_MODAL.returnValue === 'close') {
    return;
  }

  const formData = new FormData(SEND_GUS_MODAL_FORM);
  showLoader(SEND_GUS_MODAL_FORM_SUBMIT, true);
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => {
      closeModal(SEND_GUS_MODAL, 'close');
      showModal(SUCCESS_GUS_MODAL);
    })
    .finally(() => {
      showLoader(SEND_GUS_MODAL_FORM_SUBMIT, false);
    });
});
