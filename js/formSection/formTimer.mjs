let timer = false;
let tooSlowInfo = document.querySelector('#tooSlowInfo');

function formTimer() {
  // if statement to make sure the timer won't reset if the form section is closed and then reopened.
  if (timer !== false) {
    return;
  } else if (timer === false) {
    //Hides the error message if the customer reloads the form
    tooSlowInfo.classList.add('hidden');
    timer = 900;
    const countdownTimerInterval = setInterval(function () {
      timer--;
      //clearing form and resetting everything when the timer hits 0
      if (timer === 0) {
        //clears the setInterval
        clearInterval(countdownTimerInterval);
        //resets the form
        document.querySelector('#customerInfoForm').reset();
        //sets the timer to false so the function can be restarted next time used clicks on the form
        timer = false;
        //displays the error message when the customer has taken more than 15 minutes with the form.
        tooSlowInfo.classList.remove('hidden');
      }
    }, 1000);
  }
}

export default formTimer;
