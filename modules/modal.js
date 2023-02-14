// gestion de l'affichage du menu apres clique sur l'icon menu
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

// launch modal event
// modalBtn.forEach((btn) => btn.addEventListener('click', launchModal))
// closeBtn.addEventListener('click', hiddenModal)
function launchModal() {
  modalbg.style.display = 'block'
}

// close modal
export function hiddenModal() {
  modalbg.style.display = 'none'
}

export function setBtnModalEvent () {
  const modalBtn = document.querySelectorAll('.modal-btn');
  const closeBtn = document.querySelector('.close');
  modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));
  closeBtn.addEventListener('click', hiddenModal);
}

export function setBtnResponsiveMenuEvent() {
  const responsiveBtn = document.querySelector('.icon');
  responsiveBtn.addEventListener('click', editNav);
}
