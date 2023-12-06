let discountCodeActive = false;
let discountCodeText = '';

function checkDiscountCode(gnomes) {
  const discountCodeInput = document.querySelector('#discountCodeInput');

  if (discountCodeInput.value === 'a_damn_fine-cup_of-coffee') {
    discountCodeText = discountCodeInput.value;
    discountCodeInput.value = '';
    discountCodeActive = true;

    for (let i = 0; i < gnomes.length; i++) {
      gnomes[i].price = 0;
    }
  }
}

export { checkDiscountCode, discountCodeActive, discountCodeText };
