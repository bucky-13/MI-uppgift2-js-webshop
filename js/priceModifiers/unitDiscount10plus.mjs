function unitDiscount10Plus(gnomes) {
  for (let i = 0; i < gnomes.length; i++) {
    if (gnomes[i].amount >= 10) {
      gnomes[i].price = gnomes[i].basePrice * 0.9;
    } else if (gnomes[i].amount < 10) {
      gnomes[i].price = gnomes[i].basePrice;
    }
  }
}

export default unitDiscount10Plus;
