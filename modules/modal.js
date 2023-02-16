/**
 * Manages mobile menu display.
 */
export function editNav() {
  var x = document.getElementById('myTopnav')
  if (x.className === 'topnav') {
    x.className += ' responsive'
  } else {
    x.className = 'topnav'
  }
}

// DOM Elements
const modalbg = document.querySelector('.bground')

/**
 * open modal
 */
function launchModal() {
  modalbg.style.display = 'block'
}

/**
 * close modal
 */
export function hiddenModal() {
  modalbg.style.display = 'none'
}


/**
 * Initializes the open and close buttons for our modal.
 */
export function setBtnModalEvent () {
  const modalBtn = document.querySelectorAll('.modal-btn');
  const closeBtn = document.querySelector('.close');
  modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));
  closeBtn.addEventListener('click', hiddenModal);
}

/**
 * Initializes the event on the icon used to open our menu.
 */
export function setBtnResponsiveMenuEvent() {
  const responsiveBtn = document.querySelector('.icon');
  responsiveBtn.addEventListener('click', editNav);
}
