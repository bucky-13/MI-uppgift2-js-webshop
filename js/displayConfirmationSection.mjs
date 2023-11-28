const confirmationSection = document.querySelector('#confirmationSection');

function displayConfirmationSection(
  gnomes,
  totalPrice,
  shippingCost,
  gnomeSumTotal
) {
  confirmationSection.classList.remove('hidden');
  confirmationSection.innerHTML = `
    <h2>Order successful!</h2>
    <div class="delivery-header">
        <h3>Estimated delivery:</h3>
        <p>Over 9000 minutes!</p>
    </div>
    <h3>Ordered Items:</h3>
    <div class="ordered-items-list" id="orderedItemsList">
    </div>
    <div id="confirmationSum" class="confirmation-sum">
    <p>Items total</p> 
    <p>${gnomeSumTotal} kr</p>
    <p>Shipping Cost</p> 
    <p>${shippingCost} kr</p>
    <p>Total Sum:</p>
    <p>${totalPrice + shippingCost} kr</p>
    </div>
    `;
  const orderedItemsList = document.querySelector('#orderedItemsList');
  for (let i = 0; i < gnomes.length; i++) {
    if (gnomes[i].amount > 0) {
      orderedItemsList.innerHTML += `
                   <div class="ordered-item">
                    <img src="${
                      gnomes[i].img0.url
                    }" height="150" width="150" alt="${gnomes[i].img0.alt}">
                    <h3>${gnomes[i].name}</h3>
                    <p>Amount:</p>
                    <p>Price piece:</p>
                    <p>Price total:</p>
                    <p>${gnomes[i].amount} st</p>
                    <p>${gnomes[i].price} kr</p>
                    <p>${gnomes[i].price * gnomes[i].amount} kr</p>
                </div>
          `;
    }
  }
}

export default displayConfirmationSection;
