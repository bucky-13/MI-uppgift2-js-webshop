const gnomes = [
  {
    name: 'Axe Wielding Knight Gnome',
    price: 120,
    amount: 0,
    rating: 4.5,
    category: 'Knights',
    img0: 'images/gnomes/knight-axe0.webp',
    img1: 'images/gnomes/knight-axe1.webp',
    img2: 'images/gnomes/knight-axe2.webp',
  },
  {
    name: 'Sword Wielding Knight Gnome',
    price: 120,
    amount: 0,
    rating: 4,
    category: 'Knights',
    img0: 'images/gnomes/knight-sword0.webp',
    img1: 'images/gnomes/knight-sword1.webp',
    img2: 'images/gnomes/knight-sword2.webp',
  },
  {
    name: 'Weapon Wielding Knight Gnome',
    price: 120,
    amount: 0,
    rating: 4,
    category: 'Knights',
    img0: 'images/gnomes/knight-weapon0.webp',
    img1: 'images/gnomes/knight-weapon1.webp',
    img2: 'images/gnomes/knight-weapon2.webp',
  },
  {
    name: 'Biker Gnome',
    price: 130,
    amount: 0,
    rating: 4,
    category: 'Naughty',
    img0: 'images/gnomes/biker0.webp',
    img1: 'images/gnomes/biker1.webp',
    img2: 'images/gnomes/biker2.webp',
  },
  {
    name: 'Gandalf the Gnome',
    price: 200,
    amount: 0,
    rating: 5,
    category: 'Chill',
    img0: 'images/gnomes/gandalf0.webp',
    img1: 'images/gnomes/gandalf1.webp',
    img2: 'images/gnomes/gandalf2.webp',
  },
  {
    name: 'Go Away Gnome',
    price: 100,
    amount: 0,
    rating: 3,
    category: 'Naughty',
    img0: 'images/gnomes/goaway0.webp',
    img1: 'images/gnomes/goaway1.webp',
    img2: 'images/gnomes/goaway2.webp',
  },
  {
    name: 'Rainbow Gnome',
    price: 150,
    amount: 0,
    rating: 4.5,
    category: 'Chill',
    img0: 'images/gnomes/rainbow0.webp',
    img1: 'images/gnomes/rainbow1.webp',
    img2: 'images/gnomes/rainbow2.webp',
  },
  {
    name: 'Rocking Chair Gnome',
    price: 140,
    amount: 0,
    rating: 4,
    category: 'Chill',
    img0: 'images/gnomes/rocking-chair0.webp',
    img1: 'images/gnomes/rocking-chair1.webp',
    img2: 'images/gnomes/rocking-chair2.webp',
  },
  {
    name: 'Sleeping Gnome',
    price: 110,
    amount: 0,
    rating: 3.5,
    category: 'Chill',
    img0: 'images/gnomes/sleeping0.webp',
    img1: 'images/gnomes/sleeping1.webp',
    img2: 'images/gnomes/sleeping2.webp',
  },
  {
    name: 'Welcoming Gnome',
    price: 170,
    amount: 0,
    rating: 5,
    category: 'Chill',
    img0: 'images/gnomes/welcome0.webp',
    img1: 'images/gnomes/welcome1.webp',
    img2: 'images/gnomes/welcome2.webp',
  },
];

//Query Selectors for HTML nodes that are in index.html on page load

const gnomeListContainer = document.querySelector('#gnomeListContainer');
const navCartCounter = document.querySelector('#navCartCounter');
const navCartSum = document.querySelector('#navCartSum');
const gnomeDetailsSection = document.querySelector('#gnomeDetailsSection');

//*************START of all functions for GNOME LIST SECTION */
//Generate Gnome List on page load
function gnomeListContainerGenerator() {
  gnomeListContainer.innerHTML = '';
  for (let i = 0; i < gnomes.length; i++) {
    generateGnomeListContainer(i);
  }
}

gnomeListContainerGenerator();

//Functions to listen at the +/- buttons in Shop List that gets called every time the page renders to avoid repeating this code.
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

//Query Selectors Shop page Buttons

//Function for generating HTML in Gnome List
function generateGnomeListContainer(i) {
  gnomeListContainer.innerHTML += `
<div class="gnome-list-item">
    <figure>
    <img src="${gnomes[i].img0}" width="120" height="160">
    </figure>
    <h4 class="gnomeDetailsLinkList" id="gnomeDetailsLink${i}">${
    gnomes[i].name
  }</h4>

    <div class="amount-to-order">
        <p>${gnomes[i].price} kr / st</p>
        <button class="btn-circle btn-small minusBtnList" id="btnListMinus${i}">-</button>
        <button class="btn-circle btn-small plusBtnList" id="btnListPlus${i}">+</button>
        <p id="amountList${i}">${gnomes[i].amount} st</p>
    </div>
    <p>${gnomes[i].amount * gnomes[i].price} kr</p>
        <figure class="star-rating">
            <img src="images/icons/star-filled.png" width="24px">
            <img src="images/icons/star-filled.png" width="24px">
            <img src="images/icons/star-filled.png" width="24px">
            <img src="images/icons/star-half.png" width="24px">
            <img src="images/icons/star-empty.png" width="24px">
        </figure>
</div>`;

  //adds evenListeners for buttons, shopping cart & opening the gnome Details section.
  addPlusBtnListener();
  addMinusBtnListener();
  updateNavShoppingCart();
  addGnomeDetailsListener(i);
}

//Function to add amount to an item in the Shop List.

function plusAmountList(e) {
  const index = e.target.id.replace('btnListPlus', '');
  gnomes[index].amount++;

  gnomeListContainerGenerator();
}
function minusAmountList(e) {
  const index = e.target.id.replace('btnListMinus', '');
  if (gnomes[index].amount > 0) {
    gnomes[index].amount--;

    gnomeListContainerGenerator();
  }
}

//*************END of all functions for GNOME LIST SECTION */

//*************START of all functions for GNOME DETAILS SECTION */
//Function to open the pages for Individual Gnomes

function openGnomeDetailsPage(i) {
  gnomeListContainer.classList.add('hidden');
  gnomeDetailsSection.classList.remove('hidden');
  gnomeDetailsSection.classList.add('page-active');
  gnomeDetailsSection.innerHTML = `
              <button class="btn-large btn-circle btn-close" id="closePageBtn">X</button>
            <div>
                <figure>
                    <img src="${
                      gnomes[i].img1
                    }" id="gnomeDisplayImg" class="gnome-display-img" height="500"
                        width="500">
                </figure>
                <figure class="img-thumb-container">
                    <img src="${
                      gnomes[i].img0
                    }" width="200" height="200" id="thumbnail1">
                    <img src="${
                      gnomes[i].img2
                    }" width="200" height="200" id="thumbnail2">
                </figure>
            </div>
            <h2>${gnomes[i].name}</h2>
            <p class="item-price">${gnomes[i].price} kr/st</p>
            <div class="gnome-buttons-container">
                <button class="btn-circle btn-large" id="btnDetailsMinus${i}">-</button>
                <h4>${gnomes[i].amount}</h4>
                <button class="btn-circle btn-large" id="btnDetailsPlus${i}">+</button>
            </div>

            <h3>Totalt: ${gnomes[i].amount * gnomes[i].price} kr</h3>
  `;
  updateNavShoppingCart();

  //Arguments added so the plus/minus function can be reused for the shopping cart section later on and maybe merged with the main list plus/minus functions,
  // i is the index for current article, openGnomeDetailsPage is the function that needs to be called to re-render the page. Might simply this and just have separate plus/minus functions instead this if stuff gets too complicated later on
  addPlusBtn(i, openGnomeDetailsPage);
  addMinusBtn(i, openGnomeDetailsPage);
  listenClosePage(gnomeDetailsSection);
}

//Event listener to close an opened page
function listenClosePage(section) {
  const closeBtn = document.querySelector('#closePageBtn');

  closeBtn.addEventListener('click', function () {
    closePage(section);
  });
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

  // Re-rendendering the Shop List section
  activeSection(i);
}
function minusAmountDetails(i, activeSection) {
  if (gnomes[i].amount > 0) {
    gnomes[i].amount--;

    // Re-rendendering the Shop List section
    activeSection(i);
  }
}

//*************END of all functions for GNOME DETAILS SECTION */

//Function to currently opened page
function closePage(section) {
  section.classList.remove('page-active');
  section.classList.add('hidden');
  gnomeListContainer.classList.remove('hidden');

  gnomeListContainerGenerator();
}

//Function to update the Shopping Cart in the Nav

function updateNavShoppingCart() {
  let itemsCounter = 0;
  let totalPrice = 0;
  for (let i = 0; i < gnomes.length; i++) {
    if (gnomes[i].amount > 0) {
      itemsCounter = itemsCounter + gnomes[i].amount;
    }
    gnomeItemPriceTotal = gnomes[i].amount * gnomes[i].price;
    totalPrice = totalPrice + gnomeItemPriceTotal;
  }
  if (itemsCounter > 0) {
    navCartCounter.classList.remove('hidden');
    navCartCounter.textContent = itemsCounter;
  } else if (itemsCounter <= 0) {
    navCartCounter.classList.add('hidden');
  }
  navCartSum.textContent = totalPrice;
}
