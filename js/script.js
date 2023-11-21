const gnomesDatabase = [
  {
    name: 'Axe Wielding Knight Gnome',
    price: 120,
    amount: 0,
    rating: 4.5,
    category: 'Knights',
    img0: 'images/gnomes/knight-axe0.webp',
    img1: 'images/gnomes/knight-axe1.webp',
    img2: 'images/gnomes/knight-axe2.webp',
    imgLarge: 'images/gnomes/knight-axe1.webp',
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
    imgLarge: 'images/gnomes/knight-sword1.webp',
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
    imgLarge: 'images/gnomes/knight-weapon1.webp',
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
    imgLarge: 'images/gnomes/biker1.webp',
  },
  {
    name: 'Gandalf the Gnome',
    price: 400,
    amount: 0,
    rating: 5,
    category: 'Chill',
    img0: 'images/gnomes/gandalf0.webp',
    img1: 'images/gnomes/gandalf1.webp',
    img2: 'images/gnomes/gandalf2.webp',
    imgLarge: 'images/gnomes/gandalf1.webp',
  },
  {
    name: 'Go Away Gnome',
    price: 80,
    amount: 0,
    rating: 3,
    category: 'Naughty',
    img0: 'images/gnomes/goaway0.webp',
    img1: 'images/gnomes/goaway1.webp',
    img2: 'images/gnomes/goaway2.webp',
    imgLarge: 'images/gnomes/goaway1.webp',
  },
  {
    name: 'Rainbow Gnome',
    price: 250,
    amount: 0,
    rating: 4.5,
    category: 'Chill',
    img0: 'images/gnomes/rainbow0.webp',
    img1: 'images/gnomes/rainbow1.webp',
    img2: 'images/gnomes/rainbow2.webp',
    imgLarge: 'images/gnomes/rainbow1.webp',
  },
  {
    name: 'Rocking Chair Gnome',
    price: 190,
    amount: 0,
    rating: 4,
    category: 'Chill',
    img0: 'images/gnomes/rocking-chair0.webp',
    img1: 'images/gnomes/rocking-chair1.webp',
    img2: 'images/gnomes/rocking-chair2.webp',
    imgLarge: 'images/gnomes/rocking-chair1.webp',
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
    imgLarge: 'images/gnomes/sleeping1.webp',
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
    imgLarge: 'images/gnomes/welcome1.webp',
  },
];

//gnomes array that can be altered for page filtering etc
let gnomes = gnomesDatabase;

// filtered gnome categories
const knightGnomes = gnomes.filter((gnomes) => gnomes.category === 'Knights');
const chillGnomes = gnomes.filter((gnomes) => gnomes.category === 'Chill');
const naughtyGnomes = gnomes.filter((gnomes) => gnomes.category === 'Naughty');

//Array to use when applying filters to the gnome array.
let filteredGnomesArray = gnomes;

//Query Selectors for HTML nodes that are in index.html on page load

const gnomeListContainer = document.querySelector('#gnomeListContainer');
const navCartCounter = document.querySelector('#navCartCounter');
const navCartSum = document.querySelector('#navCartSum');
const gnomeDetailsSection = document.querySelector('#gnomeDetailsSection');

//querySelectors for the Shop filter section and filters
const shopFilterContainer = document.querySelector('#shopFilterContainer');
const toggleFilterBtn = document.querySelector('#toggleFilterBtn');
const gnomeSortSelect = document.querySelector('#gnomeSortSelect');
categoryFilterRadios = document.querySelectorAll('[name="gnomeCategories"]');

//Generate Gnome List on page load
function gnomeListContainerGenerator() {
  gnomeListContainer.innerHTML = '';
  for (let i = 0; i < gnomes.length; i++) {
    generateGnomeListContainer(i);
  }
}

gnomeListContainerGenerator();

//*************START of all functions for MULTIPLE SECTIONS */

//Function to close currently opened page
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

  gnomeListContainerGenerator();
}
function minusAmountList(e) {
  const index = e.target.id.replace('btnListMinus', '');
  if (gnomes[index].amount > 0) {
    gnomes[index].amount--;

    gnomeListContainerGenerator();
  }
}

function toggleShopFilterContainer() {
  shopFilterContainer.classList.toggle('hidden');
  shopFilterContainer.classList.toggle('shop-filter-container');
}

function updateFilterRadios(e) {
  const selectedCategory = e.currentTarget.value;

  if (selectedCategory === 'all') {
    gnomes = gnomesDatabase;
  } else {
    filteredGnomes = [];
    for (let i = 0; i < gnomesDatabase.length; i++) {
      if (selectedCategory === gnomesDatabase[i].category.toLowerCase()) {
        filteredGnomes.push(gnomesDatabase[i]);
      }
    }
    gnomes = filteredGnomes;
  }
  gnomeListContainerGenerator();
}

//Function for generating HTML in Gnome List
function generateGnomeListContainer(i) {
  //TODO: Fix the star rating to display star images, and no text inside a figure tag
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
                      gnomes[i].imgLarge
                    }" id="gnomeDisplayImg" class="gnome-display-img" height="500"
                        width="500">
                </figure>
                <figure class="img-thumb-container">
                    <img src="${
                      gnomes[i].img1
                    }" width="200" height="200" id="thumbnail-${i}-1" class="imgDetailsThumbnail">
                    <img src="${
                      gnomes[i].img2
                    }" width="200" height="200" id="thumbnail-${i}-2" class="imgDetailsThumbnail">
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

  //Arguments added so the plus/minus function can be reused for the shopping cart section later on and maybe merged with the main list plus/minus functions,
  // i is the index for current article, openGnomeDetailsPage is the function that needs to be called to re-render the page. Might simply this and just have separate plus/minus functions instead this if stuff gets too complicated later on
  addPlusBtn(i, openGnomeDetailsPage);
  addMinusBtn(i, openGnomeDetailsPage);
  updateNavShoppingCart();
  listenClosePage(gnomeDetailsSection);
  detailsThumbnailListener();
}

//*************END of all functions for GNOME DETAILS SECTION */
