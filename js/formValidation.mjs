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
  document.querySelector('#inputAgreePersonalInfo'),
];

const submitOrderBtn = document.querySelector('#submitOrderBtn');

const nameRegEx = new RegExp(/[A-Za-z\\u0080-\\uFFFF -]{2,}/);

const emailRegEx = new RegExp(/^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i);

const phoneRegEx = new RegExp(/^((((0{2}?)|(\+){1})46)|0)7[\d]{8}/);

function isPhoneValid() {
  return phoneRegEx.exec(inputPhone.value);
}

function isEmailValid() {
  return emailRegEx.exec(inputEmail.value);
}

function isNameValid(name) {
  return nameRegEx.exec(name.value);
}

function formValidation(e) {
  submitOrderBtn.setAttribute('disabled', '');
  if (!isNameValid(inputFirstName)) {
    console.log('first name');
    return;
  }
  if (!isNameValid(inputLastName)) {
    console.log('last name');
    return;
  }
  if (!isNameValid(inputAddress)) {
    console.log('address');
    return;
  }
  if (inputPostNum.value.length !== 5) {
    console.log('post no');
    return;
  }
  if (!isNameValid(inputCity)) {
    console.log('city');
    return;
  }
  if (!isPhoneValid()) {
    console.log('phone');
    return;
  }
  if (!isEmailValid()) {
    console.log('email');
    return;
  }
  if (!inputAgreePersonalInfo.checked) {
    return;
  }

  submitOrderBtn.removeAttribute('disabled');
  console.log(e.target.id);
}

function formEventListener() {
  inputs.forEach((input) => {
    input.addEventListener('focusout', formValidation);
    input.addEventListener('change', formValidation);
  });
}

export default formEventListener;
