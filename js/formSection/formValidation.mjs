const inputs = [
  document.querySelector('#inputFirstName'),
  document.querySelector('#inputLastName'),
  document.querySelector('#inputAddress'),
  document.querySelector('#inputPostNum'),
  document.querySelector('#inputCity'),
  document.querySelector('#inputPhone'),
  document.querySelector('#inputEmail'),
  document.querySelector('#paymentMethod'),
  document.querySelector('#inputPersonalNum'),
  document.querySelector('#inputCardNum'),
  document.querySelector('#inputMM'),
  document.querySelector('#inputYY'),
  document.querySelector('#inputCVC'),
  document.querySelector('#inputAgreePersonalInfo'),
];

const errorSpans = document.querySelectorAll('.form-error-msg');
for (let i = 0; i < errorSpans.length; i++) {}
let formFields = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];
let isFormCorrect = false;

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

//Validation function that runs when submit button is clicked. First it checks if each checked field is true or false, and sends the result into the formFields array which is used to add or remove error messages. Lastly it checks the entire formFields, if all checks are true, then it changes isFormCorrect to be True, which activates the form submit button.
function formValidation(e) {
  let inputsIndex = inputs.findIndex((i) => i.id === e.target.id);
  //Standard inputs which are always required.
  formFields[0] = isNameValid(inputFirstName) ? true : false;
  formFields[1] = isNameValid(inputLastName) ? true : false;
  formFields[2] = isNameValid(inputAddress) ? true : false;
  formFields[3] = inputPostNum.value.length === 5 ? true : false;
  formFields[4] = isNameValid(inputCity) ? true : false;
  formFields[5] = isPhoneValid() ? true : false;
  formFields[6] = isEmailValid() ? true : false;

  //Checks if invoice or card radio buttons are selected. Then adds more validations needed depending on which radio is selected.
  if (!paymentCard.checked && !paymentInvoice.checked) {
    formFields[7] = false;
  } else if (paymentInvoice.checked) {
    formFields[7] = true;
    formFields[9] = true;
    formFields[10] = true;
    formFields[11] = true;
    formFields[12] = true;
    formFields[8] = isPersonalNumValid() ? true : false;
  } else if (paymentCard.checked) {
    formFields[7] = true;
    formFields[8] = true;
    //variables to control year and month.
    let yyFromInput = Number(inputYY.value);
    const date = new Date();
    const currentYear = Number(String(date.getFullYear()).substring(2));
    const currentMonth = Number(String(date.getMonth() + 1));
    c;

    if (inputMM.value.length !== 2 || inputMM.value > 12 || inputMM.value < 1) {
      formFields[10] = false;
    } else {
      formFields[10] = true;
    }

    if (yyFromInput > currentYear + 5 || yyFromInput < currentYear) {
      formFields[11] = false;
    } else {
      formFields[11] = true;
    }
    //This one checks if the card expires in the current year, in which case it triggers if the month input from user is less than or equal to the current month. Can be imprived since it doesn't cover edge cases like orders on last day of a month or month of a year, but maybe later.
    if (currentYear === yyFromInput && inputMM.value <= currentMonth) {
      formFields[10] = false;
      formFields[11] = false;
    }
    formFields[12] = inputCVC.value.length === 3 ? true : false;
    formFields[9] = isCardNumValid() ? true : false;
  }
  //Checks if the Agree sharing personal information is checked
  formFields[13] = inputAgreePersonalInfo.checked ? true : false;
  if (!inputAgreePersonalInfo.checked) {
  }

  //Adds or removes error messages for each field depending on whether they are correct or not. It only checks as far as the field the used last used to avoid displaying error messages on the next field.
  for (let i = 0; i <= inputsIndex; i++) {
    if (formFields[i] === false) {
      errorSpans[i].classList.remove('hidden');
      submitOrderBtn.disabled = true;
      return;
    } else {
      errorSpans[i].classList.add('hidden');
    }
  }

  //Runs through the entire formFields array, if anything is false it stops makes sure isFormCorrect is false
  //If the entire formFields array is true then it sets isFormCorrect to true
  for (let i = 0; i < formFields.length; i++) {
    if (formFields[i] === false) {
      isFormCorrect = false;
    } else {
      isFormCorrect = true;
    }
  }
  if (isFormCorrect === true) {
    submitOrderBtn.disabled = false;
  }
}

function formEventListener() {
  inputs.forEach((input) => {
    input.addEventListener('focusout', formValidation);
    input.addEventListener('change', formValidation);
  });
}

export { formValidation, isFormCorrect, formEventListener };
