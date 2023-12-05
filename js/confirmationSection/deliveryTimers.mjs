//delivery time in minutes
let deliveryTime = 30;
function deliveryTimer() {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();
  const mins = date.getMinutes();

  //Delivery in 90 minutes if it's weekend - Saturday or Sunday. Take precedence over night time deliveries for Sat/Sun nights.
  if (day === 6 || day === 0) {
    deliveryTime = 90;
  }
  //Delivery in 45 minutes during night, which I considered to be 23-5.
  else if (hour > 23 || hour < 5) {
    deliveryTime = 45;
  }
  //Delivery at 15:00 if order is placed on a Friday between 11-13.
  else if (day === 5 && hour >= 11 && hour <= 13) {
    const hoursLeft = 15 - hour;
    const minutesLeft = hoursLeft * 60;
    deliveryTime = minutesLeft - mins;
  }
  //If none of the above conditions kick in, then we deliver at the standard time which is set to 30 minutes.
  return deliveryTime;
}
export { deliveryTime, deliveryTimer };
