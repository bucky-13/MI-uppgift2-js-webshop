import gnomesDatabase from './database.mjs';
import formEventListener from './formValidation.mjs';
import formTimer from './formTimer.mjs';
import unitDiscount10Plus from './priceModifiers/unitDiscount10plus.mjs';
import displayConfirmationSection from './displayConfirmationSection.mjs';

//gnomes array that updates amounts etc
// let gnomes = [...gnomesDatabase];
let gnomes = JSON.parse(JSON.stringify(gnomesDatabase));
let gnomishShoppingCart = [];
let itemsCounter = 0;

//Query Selectors for HTML nodes that are in index.html on page load

const gnomeListContainer = document.querySelector('#gnomeListContainer');
const shopSection = document.querySelector('#shopSection');
const gottfridLogo = document.querySelector('#gottfridLogo');
const navCartCounter = document.querySelector('#navCartCounter');
const navCartSum = document.querySelector('#navCartSum');
const navCartIcons = document.querySelector('#navCartIcons');
const shoppingCartSection = document.querySelector('#shoppingCartSection');
const cartSumTotalContainer = document.querySelector('#cartSumTotalContainer');
const shoppingCartGnomes = document.querySelector('#shoppingCartGnomes');
const closeCartSectionBtn = document.querySelector('#closeCartSectionBtn');
const gnomeDetailsSection = document.querySelector('#gnomeDetailsSection');
const confirmationSection = document.querySelector('#confirmationSection');

//querySelectors for the Shop filter section and filters
const shopFilterContainer = document.querySelector('#shopFilterContainer');
const toggleFilterBtn = document.querySelector('#toggleFilterBtn');
const gnomeSortSelect = document.querySelector('#gnomeSortSelect');
const categoryFilterRadios = document.querySelectorAll(
  '[name="gnomeCategories"]'
);
const maxPriceSlider = document.querySelector('#maxPriceSlider');
const maxPriceDisplay = document.querySelector('#maxPriceDisplay');

// Query Selectors for the Order Form Section
const orderFormSection = document.querySelector('#orderFormSection');

const paymentInvoice = document.querySelector('#paymentInvoice');
const paymentInvoiceContainer = document.querySelector(
  '#paymentInvoiceContainer'
);
const paymentCard = document.querySelector('#paymentCard');
const paymentInvoiceActive = document.querySelector('#paymentInvoiceActive');
const paymentCardActive = document.querySelector('#paymentCardActive');
const submitOrderBtn = document.querySelector('#submitOrderBtn');
const formErrorMsg = document.querySelectorAll('.form-error-msg');
const cardInput = document.querySelectorAll('.cardInput');
const invoiceInput = document.querySelector('.invoiceInput');

let date = new Date();

//this is the total sum of the gnomes in the shopping cart
let gnomeSumTotal = 0;
//total price after adding discounts to gnomeSumTotal
let totalPrice = 0;
//Cost of shipping
let shippingCost = 25;
//final price after adding shipping cost to totalPrice. This will be set to 0 if a special coupon is used.
let finalPrice = 0;

let visibleSection = shopSection;

//adding a "lucia gnome" if it's 13th of december
function addLuciaGnome() {
  date = new Date();
  let day = date.getDate();
  let month = date.getMonth();

  if (month === 12 && day === 13) {
    gnomes[4].amount = 1;
  }
}

addLuciaGnome();

//Generate Gnome List on page load
function gnomeListContainerGenerator() {
  generateDateVariables();
  visibleSection = shopSection;
  shopSection.classList.remove('hidden');
  gnomeListContainer.innerHTML = '';
  if (!confirmationSection.classList.contains('hidden')) {
    confirmationSection.classList.add('hidden');
  }
  for (let i = 0; i < gnomes.length; i++) {
    //if statement to make sure only items that passed the filter check are displayed. All items pass at page load
    if (gnomes[i].filterCategory === true && gnomes[i].filterPrice === true) {
      generateDateVariables();
      generateGnomeListContainer(i);
    }
  }
}

gnomeListContainerGenerator();

//*************START of all functions for MULTIPLE SECTIONS */

//Event listener for the shopping cart icon:
navCartIcons.addEventListener('click', toggleCartSection);

closeCartSectionBtn.addEventListener('click', closeCartSection);

function cartPlusBtnListener() {
  const cartPlusBtnList = Array.from(document.querySelectorAll('.btnCartPlus'));
  let gnomeIndexNo = [];

  for (let i = 0; i < cartPlusBtnList.length; i++) {
    gnomeIndexNo[i] = cartPlusBtnList[i].id.replace('btnCartPlus', '');
    cartPlusBtnList[i].addEventListener('click', function () {
      plusAmountDetails(gnomeIndexNo[i], openCartSection);
    });
  }
}
function cartMinusBtnListener() {
  const cartMinusBtnList = Array.from(
    document.querySelectorAll('.btnCartMinus')
  );
  let gnomeIndexNo = [];

  for (let i = 0; i < cartMinusBtnList.length; i++) {
    gnomeIndexNo[i] = cartMinusBtnList[i].id.replace('btnCartMinus', '');
    cartMinusBtnList[i].addEventListener('click', function () {
      minusAmountDetails(gnomeIndexNo[i], openCartSection);
    });
  }
}

function openGnomeList() {
  visibleSection.classList.add('hidden');
  shoppingCartSection.classList.add('hidden');
  gnomeListContainerGenerator();
}

function removeCartItem(i) {
  gnomes[i].amount = 0;
  openCartSection();
}

gottfridLogo.addEventListener('click', openGnomeList);

function removeItemCartListener() {
  const cartRemoveList = Array.from(
    document.querySelectorAll('.btnRemoveItem')
  );
  let cartIndex = [];

  for (let i = 0; i < cartRemoveList.length; i++) {
    cartIndex[i] = cartRemoveList[i].id.replace('btnRemoveItem', '');
    cartRemoveList[i].addEventListener('click', function () {
      removeCartItem(cartIndex[i]);
    });
  }
}

function toggleCartSection() {
  if (shoppingCartSection.classList.contains('hidden')) {
    openCartSection();
    if (!confirmationSection.classList.contains('hidden')) {
      confirmationSection.classList.add('hidden');
    }
  } else {
    closeCartSection();
  }
}

function closeCartSection() {
  shoppingCartSection.classList.add('hidden');
  if (visibleSection === shopSection) {
    gnomeListContainerGenerator();
  } else if (visibleSection === orderFormSection) {
    visibleSection.classList.remove('hidden');
    formTimer();
  } else {
    visibleSection.classList.remove('hidden');
  }
}

// Functions for dates and prices:

function mondayPrices(d, h) {
  if (d === 1 && h < 10) {
    totalPrice = Math.round(gnomeSumTotal * 0.9);
    const mDiscount = document.querySelectorAll('.mondayDiscount');
    // console.log(mDiscount.target);
    for (let i = 0; i < mDiscount.length; i++) {
      mDiscount[i].classList.remove('hidden');
    }
  } else {
    totalPrice = gnomeSumTotal;
  }
}

function fridayPrices(d, h) {
  if (d > 5 && h > 14) {
    if (d < 1 && h < 3) {
      gnomes[i].price = gnomes[i].basePrice * 1.15;
    }
  }
}

//function to enable the fancy Christmas theme for the website.
function christmasTheme(d, m) {
  if (d === 24 && m === 12) {
    document.body.classList.add('christmas');
  } else {
    if (document.body.classList.contains('christmas')) {
      document.body.classList.remove('christmas');
    }
  }
}

function generateDateVariables() {
  date = new Date();
  let day = date.getDay();
  let hour = date.getHours();
  let month = date.getMonth();

  mondayPrices(day, hour);
  fridayPrices(day, hour);
  christmasTheme(day, month);
}

generateDateVariables();

// Functions for large orders etc:

function moreThan15GnomesTotal() {
  if (itemsCounter >= 15) {
    shippingCost = 0;
  } else {
    let shippingCostExtra = totalPrice * 0.1;
    shippingCost = 25 + shippingCostExtra;
  }
}

//Event listener for active submit button on Order For Section
//This is a kind of hacky solution but it does seem to work.

submitOrderBtn.addEventListener('click', updatedSubmitOrderBtnListener);

function updatedSubmitOrderBtnListener(e) {
  e.preventDefault();
  let updatedSubmitOrderBtn = document.querySelector('#submitOrderBtn');
  if (!updatedSubmitOrderBtn.hasAttribute('disabled')) {
    orderFormSection.classList.add('hidden');
    //adding all information needed to a new array for the confirmation page

    const totalPriceConfirmed = totalPrice;
    const shippingCostConfirmed = shippingCost;
    let orderedGnomes = [];
    for (let i = 0; i < gnomes.length; i++) {
      if (gnomes[i].amount > 0) {
        orderedGnomes.push(gnomes[i]);
      }
    }

    //emptying all information for the order that was just shipped

    displayConfirmationSection(
      orderedGnomes,
      totalPriceConfirmed,
      shippingCostConfirmed
    );
    gnomes = [...gnomesDatabase];
    totalPrice = 0;
    itemsCounter = 0;
    shippingCost = 25;
    gnomeSumTotal = 0;

    updateNavShoppingCart();
    visibleSection = shopSection;
  } else {
    //Letting this one stay here, at least for now. If I implement the changes to only validate the form on submit this will be needed.
    console.log('DISABLED');
  }
}

//********************Functions for the Order Form Section
// Order Form and Checkout are the same thing, one of them should be renamed to avoid confusion.

function invoiceChecker() {
  if (totalPrice > 800) {
    paymentInvoiceContainer.classList.add('hidden');
    paymentCard.checked = true;
  } else {
    paymentInvoiceContainer.classList.remove('hidden');
    paymentCard.checked = false;
  }
}

function openCheckoutSection() {
  visibleSection = orderFormSection;
  invoiceChecker();
  formTimer();
  formEventListener();
  shoppingCartSection.classList.add('hidden');
  orderFormSection.classList.remove('hidden');
}

function toggleCardDetails() {
  paymentCardActive.classList.remove('hidden');
  paymentInvoiceActive.classList.add('hidden');
  invoiceInput.classList.remove('required');
  formEventListener();
  for (let i = 0; i < cardInput.length; i++) {
    cardInput[i].classList.add('required');
  }
}
function toggleInvoiceDetails() {
  paymentInvoiceActive.classList.remove('hidden');
  paymentCardActive.classList.add('hidden');
  invoiceInput.classList.add('required');
  formEventListener();
  for (let i = 0; i < cardInput.length; i++) {
    cardInput[i].classList.remove('required');
  }
}
//Event listeners for the Order Form Section

paymentCard.addEventListener('change', toggleCardDetails);
paymentInvoice.addEventListener('change', toggleInvoiceDetails);

function goCheckoutListener() {
  const goCheckoutBtn = document.querySelector('#goToCheckout');
  goCheckoutBtn.addEventListener('click', openCheckoutSection);
}

//Function for opening the shopping cart section
function openCartSection() {
  generateDateVariables();
  shoppingCartSection.classList.remove('hidden');
  visibleSection.classList.add('hidden');
  updateNavShoppingCart();
  generateDateVariables();
  moreThan15GnomesTotal();
  if (!shoppingCartSection.classList.contains('hidden')) {
    if (gnomeSumTotal > 0) {
      cartSumTotalContainer.innerHTML = `
        <p>Items total:</p>
        <p class="price-display">${gnomeSumTotal} kr</p>
        <p>Use Code:</p>
        <p>0 kr</p>
        <p class="mondayDiscount hidden">Monday Discount: -10% on the entire order!</p>
        <p class="mondayDiscount hidden">-10%</p>
        <p>Shipping:</p>
        <p class="price-display">${shippingCost} kr</p>
        <h4>Total Sum</h4>
        <p id="CartSumTotalDisplay" class="price-display">${
          totalPrice + shippingCost
        } kr</p>
        <div class="go-checkout-btn-container">
          <button class="btn-rectangle btn-green" id="goToCheckout">Go to Checkout</button>
         </div>
          `;

      shoppingCartGnomes.innerHTML = '';
      goCheckoutListener();

      for (let i = 0; i < gnomes.length; i++) {
        if (gnomes[i].amount > 0) {
          shoppingCartGnomes.innerHTML += `
            <div class="shopping-cart-gnome-grid">
              <img src="${gnomes[i].img0.url}" width="160" height="200" alt="${
            gnomes[i].img0.alt
          }" class="hidden">
              <h3>${gnomes[i].name}</h3>
              <button class="btn-circle btn-small btnRemoveItem" id="btnRemoveItem${i}">X</button>

              <h4>Amount:</h4>
              <h4 >Unit price:</h4>
              <h4>Subtotal:</h4>
              <div class="gnome-cart-buttons-container">
                  <button class="btn-circle btn-small btnCartMinus" id="btnCartMinus${i}">-</button>
                  <h4>${gnomes[i].amount}</h4>
                  <button class="btn-circle btn-small btnCartPlus" id="btnCartPlus${i}">+</button>
              </div>
              <div>
                <p id="oldCartUnitPrice" class="hidden">500kr</p>
                <p id="cartUnitPrice" class="price-display">${
                  gnomes[i].price
                } kr</p>
              </div>
              <div>
                <p id="oldCartUnitSum" class="hidden">800kr</p>
                <p id="cartUnitSum" class="price-display">${
                  gnomes[i].price * gnomes[i].amount
                } kr</p>
              </div>
          </div>
        `;
        }
      }
      cartPlusBtnListener();
      cartMinusBtnListener();
      removeItemCartListener();
    } else {
      cartSumTotalContainer.innerHTML = ``;
      shoppingCartGnomes.innerHTML = `
      <h3>The gnomes have not yet found their way to your currently empty cart</h3>`;
    }
  }
}

//Function to close currently opened page
function closePage(section) {
  section.classList.remove('page-active');
  section.classList.add('hidden');
  shopSection.classList.remove('hidden');
  gnomeListContainerGenerator();
}

//Function to update the Shopping Cart in the Nav

function updateNavShoppingCart() {
  itemsCounter = 0;
  gnomeSumTotal = 0;
  for (let i = 0; i < gnomes.length; i++) {
    if (gnomes[i].amount > 0) {
      itemsCounter = itemsCounter + gnomes[i].amount;
    }
    let gnomeItemPriceTotal = gnomes[i].amount * gnomes[i].price;
    gnomeSumTotal = gnomeSumTotal + gnomeItemPriceTotal;
  }
  if (itemsCounter > 0) {
    navCartCounter.classList.remove('hidden');
    navCartCounter.textContent = itemsCounter;
  } else if (itemsCounter <= 0) {
    navCartCounter.classList.add('hidden');
  }
  navCartSum.textContent = gnomeSumTotal;
  updateShoppingCartArray();
}

// Function to update gnomishShopping Cart array with all products that are currently ordered.

function updateShoppingCartArray() {
  gnomishShoppingCart = [];

  if (itemsCounter > 0) {
    gnomishShoppingCart = gnomes.filter((g) => g.amount > 0);
  }
}

//*************END of all functions for MULTIPLE SECTIONS */

//*************START of all functions for GNOME LIST SECTION */

//EVENT LISTENERS for GNOME LIST SECTION
function addPlusBtnListener() {
  const plusBtnList = Array.from(document.querySelectorAll('.plusBtnList'));

  //Watching for clicks on + buttons on the Shop Section (Gnome List)

  for (let i = 0; i < plusBtnList.length; i++) {
    plusBtnList[i].addEventListener('click', plusAmountList);
  }
}

function addMinusBtnListener() {
  const minusBtnList = Array.from(document.querySelectorAll('.minusBtnList'));

  //Watching for clicks on + buttons on the Shop Section (Gnome List)

  for (let i = 0; i < minusBtnList.length; i++) {
    minusBtnList[i].addEventListener('click', minusAmountList);
  }
}

function addGnomeDetailsListener() {
  const gnomeDetailsLinkList = Array.from(
    document.querySelectorAll('.gnomeDetailsLinkList')
  );

  for (let i = 0; i < gnomeDetailsLinkList.length; i++) {
    gnomeDetailsLinkList[i].addEventListener('click', () => {
      openGnomeDetailsPage(i);
    });
  }
}

function gnomeSortListener() {
  gnomeSortSelect.addEventListener('change', sortGnomes);
}

function gnomeFilterListener() {
  toggleFilterBtn.addEventListener('click', toggleShopFilterContainer);
}

for (let i = 0; i < categoryFilterRadios.length; i++) {
  categoryFilterRadios[i].addEventListener('click', updateFilterRadios);
}

function gnomePriceSliderListeners() {
  maxPriceSlider.addEventListener('input', updatePriceSliderFilter);
}

//FUNCTIONS for GNOME LIST SECTION

//Filter functions for the gnomes List

/* Might be worth  using a duplicate 2nd array for gnomes that adds all gnome value changes so the original array isn't changed. But that will include changes to amount, img for details page etc, so maaaybe later. Not really needed for this page, but useful to consider for future projects. For now, use a 2nd array when filtering at least. */

function sortGnomes(e) {
  sortValue = e.target.value;
  if (sortValue === 'a-z') {
    gnomes.sort((prod1, prod2) => {
      return prod1.name === prod2.name ? 0 : prod1.name < prod2.name ? -1 : 1;
    });
  } else if (sortValue === 'z-a') {
    gnomes.sort((prod1, prod2) => {
      return prod1.name === prod2.name ? 0 : prod1.name > prod2.name ? -1 : 1;
    });
  } else if (sortValue === 'price-ascending') {
    gnomes.sort((prod1, prod2) => prod1.price - prod2.price);
  } else if (sortValue === 'price-descending') {
    gnomes.sort((prod1, prod2) => prod2.price - prod1.price);
  } else if (sortValue === 'star-rating') {
    gnomes.sort((prod1, prod2) => prod1.rating - prod2.rating);
  }
  gnomeListContainerGenerator();
}

//Function to add amount to an item in the Shop List.

function plusAmountList(e) {
  const index = e.target.id.replace('btnListPlus', '');
  gnomes[index].amount++;
  unitDiscount10Plus(gnomes);
  gnomeListContainerGenerator();
}
function minusAmountList(e) {
  const index = e.target.id.replace('btnListMinus', '');
  if (gnomes[index].amount > 0) {
    gnomes[index].amount--;
    unitDiscount10Plus(gnomes);
    gnomeListContainerGenerator();
  }
}

function toggleShopFilterContainer() {
  shopFilterContainer.classList.toggle('hidden');
  shopFilterContainer.classList.toggle('shop-filter-container');
}

function updateFilterRadios(e) {
  const selectedCategory = e.currentTarget.value;

  for (let i = 0; i < gnomes.length; i++) {
    console.log(i);
    if (selectedCategory === 'all') {
      gnomes[i].filterCategory = true;
    } else {
      if (selectedCategory === gnomes[i].category.toLowerCase()) {
        gnomes[i].filterCategory = true;
      } else {
        gnomes[i].filterCategory = false;
      }
    }
  }
  updatePriceSliderFilter();
}

function updatePriceSliderFilter() {
  let value = maxPriceSlider.value;
  maxPriceDisplay.textContent = value;

  for (let i = 0; i < gnomes.length; i++) {
    if (gnomes[i].price <= value) {
      gnomes[i].filterPrice = true;
    } else {
      gnomes[i].filterPrice = false;
    }
  }
  gnomeListContainerGenerator();
}

//Function for generating HTML in Gnome List
function generateGnomeListContainer(i) {
  //TODO: Fix the star rating to display star images, and no text inside a figure tag
  gnomeListContainer.innerHTML += `
<div class="gnome-list-item">
    <figure>
    <img src="${gnomes[i].img0.url}" width="120" height="160" alt="${
    gnomes[i].img0.alt
  }">
    </figure>
    <h4 class="gnomeDetailsLinkList" id="gnomeDetailsLink${i}">${
    gnomes[i].name
  }</h4>

    <div class="amount-to-order">
        <p class="price-display">${gnomes[i].price} kr / st</p>
        <button class="btn-circle btn-small minusBtnList" id="btnListMinus${i}">-</button>
        <button class="btn-circle btn-small plusBtnList" id="btnListPlus${i}">+</button>
        <p id="amountList${i}">${gnomes[i].amount} st</p>
    </div>
    <p class="price-display">${gnomes[i].amount * gnomes[i].price} kr</p>
        <figure class="star-rating">
            <img src="images/icons/star-filled.png" width="24px">
            ${gnomes[i].rating}
        </figure>
</div>`;

  //adds evenListeners for buttons, shopping cart & opening the gnome Details section.
  addPlusBtnListener();
  addMinusBtnListener();
  updateNavShoppingCart();
  addGnomeDetailsListener(i);
  gnomeSortListener();
  gnomeFilterListener();
  gnomePriceSliderListeners();
}

//*************END of all functions for GNOME LIST SECTION */

//*************START of all functions for GNOME DETAILS SECTION */

//Event listener to close an opened page
function listenClosePage(section) {
  const closeBtn = document.querySelector('#closePageBtn');

  closeBtn.addEventListener('click', function () {
    closePage(section);
  });
}

//Event listener for image thumbnails
function detailsThumbnailListener() {
  const thumbnails = Array.from(
    document.querySelectorAll('.imgDetailsThumbnail')
  );

  for (let i = 0; i < thumbnails.length; i++) {
    thumbnails[i].addEventListener('click', viewThumbnail);
  }
}

//Changes large image on Gnome Details Section depending on which thumbnail you click
//TODO: get rid of the if statement and get the imgIndex to work in the same way as "i" does in the function so scaling with more images is easier to do.
function viewThumbnail(e) {
  const indexes = e.target.id.replace('thumbnail-', '');
  const i = Number(indexes[0]);
  const gnomeNameIndex = gnomes[i];
  const imgIndex = Number(indexes[2]);
  if (imgIndex === 1) {
    gnomeNameIndex.imgLarge = gnomeNameIndex.img1;
  } else if (imgIndex === 2) {
    gnomeNameIndex.imgLarge = gnomeNameIndex.img2;
  }

  openGnomeDetailsPage(i);
}

//Functions to listen at the +/- buttons in Details Page that gets called every time the page renders.

function addPlusBtn(i, activeSection) {
  const plusBtnDetails = document.querySelector(`#btnDetailsPlus${i}`);
  plusBtnDetails.addEventListener('click', function () {
    plusAmountDetails(i, activeSection);
  });
}
function addMinusBtn(i, activeSection) {
  const minusBtnDetails = document.querySelector(`#btnDetailsMinus${i}`);
  minusBtnDetails.addEventListener('click', function () {
    minusAmountDetails(i, activeSection);
  });
}

//Functions to update values after clicking +/- buttons

function plusAmountDetails(i, activeSection) {
  gnomes[i].amount++;
  unitDiscount10Plus(gnomes);

  // Re-rendendering the Shop List section
  activeSection(i);
}
function minusAmountDetails(i, activeSection) {
  if (gnomes[i].amount > 0) {
    gnomes[i].amount--;
    unitDiscount10Plus(gnomes);

    // Re-rendendering the Shop List section
    activeSection(i);
  }
}

//Function to open the pages for Individual Gnomes
function openGnomeDetailsPage(i) {
  visibleSection = gnomeDetailsSection;
  shopSection.classList.add('hidden');
  gnomeDetailsSection.classList.remove('hidden');
  gnomeDetailsSection.classList.add('page-active');
  gnomeDetailsSection.innerHTML = `
              <button class="btn-large btn-circle btn-close" id="closePageBtn">X</button>
            <div>
                <figure>
                    <img src="${
                      gnomes[i].imgLarge.url
                    }" id="gnomeDisplayImg" class="gnome-display-img" height="500"
                        width="500" alt="${gnomes[i].imgLarge.alt}">
                </figure>
                <figure class="img-thumb-container">
                    <img src="${
                      gnomes[i].img1.url
                    }" width="200" height="200" id="thumbnail-${i}-1" class="imgDetailsThumbnail" alt="${
    gnomes[i].img1.alt
  }">
                    <img src="${
                      gnomes[i].img2.url
                    }" width="200" height="200" id="thumbnail-${i}-2" class="imgDetailsThumbnail" alt="${
    gnomes[i].img2.alt
  }">
                </figure>
            </div>
            <h2>${gnomes[i].name}</h2>
            <p class="item-price price-display">${gnomes[i].price} kr/st</p>
            <div class="gnome-buttons-container">
                <button class="btn-circle btn-large" id="btnDetailsMinus${i}">-</button>
                <h4>${gnomes[i].amount}</h4>
                <button class="btn-circle btn-large" id="btnDetailsPlus${i}">+</button>
            </div>

            <h3 class="price-display">Total: ${
              gnomes[i].amount * gnomes[i].price
            } kr</h3>
  `;

  //Arguments added so the plus/minus function can be reused for the shopping cart section later on and maybe merged with the main list plus/minus functions,
  // i is the index for current article, openGnomeDetailsPage is the function that needs to be called to re-render the page. Might simply this and just have separate plus/minus functions instead this if stuff gets too complicated later on
  addPlusBtn(i, openGnomeDetailsPage);
  addMinusBtn(i, openGnomeDetailsPage);
  updateNavShoppingCart();
  listenClosePage(gnomeDetailsSection);
  detailsThumbnailListener();
}

//*************END of all functions for GNOME DETAILS SECTION */
