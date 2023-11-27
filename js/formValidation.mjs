const inputs = [
  document.querySelector('#inputFirstName'),
  document.querySelector('#inputLastName'),
  document.querySelector('#inputAddress'),
  document.querySelector('#inputPostNum'),
  document.querySelector('#inputCity'),
  document.querySelector('#inputPhone'),
  document.querySelector('#inputEmail'),
  document.querySelector('#inputPersonalNum'),
  document.querySelector('#inputCardNum'),
  document.querySelector('#inputDD'),
  document.querySelector('#inputYY'),
  document.querySelector('#inputCVC'),
];

const submitOrderBtn = document.querySelector('#submitOrderBtn');

function formEventListener() {
  inputs.forEach((input) => {
    input.addEventListener('focusout', formValidation);
    input.addEventListener('change', formValidation);
  });
}

function formValidation(e) {
  console.log(e.target.id);
}

export default formEventListener;
