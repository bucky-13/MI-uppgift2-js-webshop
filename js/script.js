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

//Query Selectors

const gnomeListContainer = document.querySelector('#gnomeListContainer');

//Generate Gnome List on page load
for (let i = 0; i < gnomes.length; i++) {
  generateGnomeListContainer(i);
}

//Function for generating HTML in Gnome List
function generateGnomeListContainer(i) {
  gnomeListContainer.innerHTML += `
<div class="gnome-list-item">
    <figure>
    <img src="${gnomes[i].img0}" width="120" height="160">
    </figure>
    <h4>${gnomes[i].name}</h4>

    <div class="amount-to-order">
        <p>${gnomes[i].price} kr / st</p>
        <button class="btn-circle btn-small">-</button>
        <button class="btn-circle btn-small">+</button>
        <p>${gnomes[i].amount} st</p>
    </div>
    <p><span>0</span> kr</p>
        <figure class="star-rating">
            <img src="images/icons/star-filled.png" width="24px">
            <img src="images/icons/star-filled.png" width="24px">
            <img src="images/icons/star-filled.png" width="24px">
            <img src="images/icons/star-half.png" width="24px">
            <img src="images/icons/star-empty.png" width="24px">
        </figure>
</div>`;
}
