const gnomes = [
  {
    name: 'Axe Wielding Knight Gnome',
    price: 120,
    amount: 0,
    rating: 4,
    category: 'knight',
    img0: 'images/gnomes/knight-axe-thumb.webp',
  },
];

const gnomeListContainer = document.querySelector('#gnomeListContainer');

gnomeListContainer.innerHTML = `
<div class="gnome-list-item">
    <figure>
    <img src="${gnomes[0].img0}" width="120" height="160">
    </figure>
    <h4>${gnomes[0].name}</h4>

    <div class="amount-to-order">
        <p>${gnomes[0].price} kr / st</p>
        <button class="btn-circle btn-small">-</button>
        <button class="btn-circle btn-small">+</button>
        <p>${gnomes[0].amount} st</p>
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
