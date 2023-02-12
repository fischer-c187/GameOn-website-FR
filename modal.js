// gestion de l'affichage du menu apres clique sur l'icon menu
function editNav() {
  var x = document.getElementById('myTopnav')
  if (x.className === 'topnav') {
    x.className += ' responsive'
  } else {
    x.className = 'topnav'
  }
}

// DOM Elements
const modalbg = document.querySelector('.bground')
const modalBtn = document.querySelectorAll('.modal-btn')
const formData = document.querySelectorAll('.formData')
const closeBtn = document.querySelector('.close')

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal))
closeBtn.addEventListener('click', hiddenModal)
function launchModal() {
  modalbg.style.display = 'block'
}
// close modal
function hiddenModal() {
  modalbg.style.display = 'none'
}
