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
  document.querySelector('#inputMM'),
  document.querySelector('#inputYY'),
  document.querySelector('#inputCVC'),
  document.querySelector('#inputAgreePersonalInfo'),
];

const paymentCard = document.querySelector('#paymentCard');
const paymentInvoice = document.querySelector('#paymentInvoice');
const submitOrderBtn = document.querySelector('#submitOrderBtn');

//RegEX filter variables
const nameRegEx = new RegExp(/[A-Za-z\\u0080-\\uFFFF -]{2,}/);
const emailRegEx = new RegExp(/^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i);
const phoneRegEx = new RegExp(/^((((0{2}?)|(\+){1})46)|0)7[\d]{8}/);
const personalNumRegEx = new RegExp(
  /^(\d{10}|\d{12}|\d{6}-\d{4}|\d{8}-\d{4}|\d{8} \d{4}|\d{6} \d{4})/
);
const cardNumRegEx = new RegExp(
  /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/
); // Enbart för MasterCard

//Reg EX functions
function isPhoneValid() {
  return phoneRegEx.exec(inputPhone.value);
}

function isEmailValid() {
  return emailRegEx.exec(inputEmail.value);
}

function isNameValid(name) {
  return nameRegEx.exec(name.value);
}

function isPersonalNumValid() {
  return personalNumRegEx.exec(inputPersonalNum.value);
}

function isCardNumValid() {
  return cardNumRegEx.exec(inputCardNum.value);
}

//Validation function, to be updated to provide visual feedback, console logs are placeholders for that. Consider changing it to only trigger on submit instead to avoid visual feedback being annoying while filling in the form. Or add visual feedback only once submitting with another function. could add class "error" on submit that gets removed if a field passes in this checker.
function formValidation(e) {
  submitOrderBtn.setAttribute('disabled', '');

  //Standard inputs which are always required.
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

  //Checks if invoice or card radio buttons are selected. Then adds more validations needed depending on which radio is selected.
  if (!paymentCard.checked && !paymentInvoice.checked) {
    return;
  } else if (paymentInvoice.checked) {
    if (!isPersonalNumValid()) {
      console.log('add personal number');
      return;
    }
  } else if (paymentCard.checked) {
    //variables to control year and month.
    let yyFromInput = Number(inputYY.value);
    const date = new Date();
    const currentYear = Number(String(date.getFullYear()).substring(2));
    const currentMonth = Number(String(date.getMonth() + 1));
    console.log(currentMonth);
    //This one is a checker in case the card expires in the current year, in which case it triggers if the month input from user is less than or equal to the current month. Can be imprived since it doesn't cover edge cases like orders on last day of a month, but maybe later.
    if (currentYear === yyFromInput && inputMM.value <= currentMonth) {
      console.log('card expired');
      return;
    }
    if (inputMM.value.length !== 2 || inputMM.value > 12 || inputMM.value < 1) {
      console.log('add card month');
      return;
    }

    if (yyFromInput > currentYear + 5 || yyFromInput < currentYear) {
      console.log('add card year');
      return;
    }
    if (inputCVC.value.length !== 3) {
      console.log('add cvc number');
      return;
    }

    if (!isCardNumValid()) {
      console.log(inputMM.value.length);
      console.log('add card number');
      return;
    }
  }

  //Activating the Submit button if ALL the required checks are passed.
  submitOrderBtn.removeAttribute('disabled');
  console.log('success');
}

//Event listener that is exported and that triggers the main function in this file.
function formEventListener() {
  inputs.forEach((input) => {
    input.addEventListener('focusout', formValidation);
    input.addEventListener('change', formValidation);
  });
}

export default formEventListener;
