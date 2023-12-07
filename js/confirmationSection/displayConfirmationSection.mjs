import { deliveryTime, deliveryTimer } from './deliveryTimers.mjs';

const confirmationSection = document.querySelector('#confirmationSection');

function displayConfirmationSection(gnomes, totalPrice, shippingCost) {
  deliveryTimer();
  console.log(deliveryTime);
  confirmationSection.classList.remove('hidden');
  confirmationSection.innerHTML = `
    <h2>Order successful!</h2>
    <div class="delivery-header">
        <h3>Estimated delivery time:</h3>
        <p>${deliveryTime} minutes.</p>
    </div>
    <h3>Ordered Items:</h3>
    <div class="ordered-items-list" id="orderedItemsList">
    </div>
    <div id="confirmationSum" class="confirmation-sum">
    <p>Items total</p> 
    <p class="price-display">${totalPrice} kr</p>
    <p>Shipping Cost</p> 
    <p class="price-display">${shippingCost} kr</p>
    <p>Total Sum:</p>
    <p class="price-display">${totalPrice + shippingCost} kr</p>
    </div>
    `;
  const orderedItemsList = document.querySelector('#orderedItemsList');
  for (let i = 0; i < gnomes.length; i++) {
    if (gnomes[i].amount > 0) {
      orderedItemsList.innerHTML += `
                   <div class="ordered-item">
                    <img src="${
                      gnomes[i].img0.url
                    }" height="150" width="100" alt="${
        gnomes[i].img0.alt
      }" loading="lazy">
                    <h3>${gnomes[i].name}</h3>
                    <p>Amount:</p>
                    <p>Unit Price:</p>
                    <p>Price total:</p>
                    <p>${gnomes[i].amount} st</p>
                    <p class="price-display">${gnomes[i].price} kr</p>
                    <p class="price-display">${
                      gnomes[i].price * gnomes[i].amount
                    } kr</p>
                </div>
          `;
    }
  }
}

export default displayConfirmationSection;
