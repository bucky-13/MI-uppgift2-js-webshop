let stars = [
  'images/icons/star-empty.png',
  'images/icons/star-empty.png',
  'images/icons/star-empty.png',
  'images/icons/star-empty.png',
  'images/icons/star-empty.png',
];

//function to add either empty, half or full starts to the rating
// j is used to compared against the gnome rating which is "rating" in the function, if j is bigger then it checks if it's smaller than rating + 0.6, if it is the rating has .5 in its rating and needs a half star, the rest will be empty stars
function starRatings(rating) {
  let j = 1;
  for (let i = 0; i < 5; i++) {
    if (rating >= j) {
      stars[i] = 'images/icons/star-filled.png';
      j++;
    } else {
      if (j < rating + 0.6) {
        stars[i] = 'images/icons/star-half.png';
        j++;
      } else {
        stars[i] = 'images/icons/star-empty.png';
        j++;
      }
    }
  }
}

export { starRatings, stars };
