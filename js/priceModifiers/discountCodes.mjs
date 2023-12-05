let discountCodeActive = false;

function checkDiscountCode(gnomes) {
  const discountCodeInput = document.querySelector('#discountCodeInput');
  const activeDiscountNodes = document.querySelectorAll('.activeDiscountNodes');
  const activeDiscountCodes = document.querySelector('#activeDiscountCodes');

  if (discountCodeInput.value === 'a_damn_fine-cup_of-coffee') {
    activeDiscountCodes.innerHTML += `<p>${discountCodeInput.value}</p>`;
    discountCodeInput.value = '';
    discountCodeActive = true;

    for (let i = 0; i < activeDiscountNodes.length; i++) {
      activeDiscountNodes[i].classList.remove('hidden');
    }

    for (let i = 0; i < gnomes.length; i++) {
      gnomes[i].price = 0;
    }
  }
}

export { checkDiscountCode, discountCodeActive };
