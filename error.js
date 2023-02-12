const validation = {
  first: {
    errorMessage: 'Veuillez rentrer deux caractères minimum',
    condition: /^[a-zA-Z]{2,}$/,
    valid: false,
  },
  last: {
    errorMessage: 'Veuillez rentrer deux caractères minimum',
    condition: /^[a-zA-Z]{2,}$/,
    valid: false,
  },
  email: {
    errorMessage: 'Veuillez rentrer une adresse email valide',
    condition: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    valid: false,
  },
  birthdate: {
    errorMessage: 'Vous devez entrer votre date de naissance.',
    condition: /^(19[0-9][0-9]|20[012][0-9]|2022)\-[0-9]{1,2}\-[0-9]{1,2}$/,
    valid: false,
  },
  quantity: {
    errorMessage: 'Merci d\'indiquer le nombre de tournois',
    condition: /^[0-9][0-9]?$|^100$/,
    valid: false,
  },
  location: {
    errorMessage: 'Indiquez à quel tournoi vous souhaitez participer',
    condition: 'radio',
    valid: false,
  },
  conditions: {
    errorMessage: 'Vous devez vérifier que vous acceptez les termes et conditions',
    condition: 'check',
    valid: false,
  },
};

function enableError(element, text) {
  element.parentNode.setAttribute('data-error-visible', true);
  element.parentNode.setAttribute('data-error', text);
  validation[element.name].valid = false;
}

function disableError(element) {
  element.parentNode.setAttribute('data-error-visible', false);
  validation[element.name].valid = true;
}

function validationText(event) {
  if (!validation[event.target.name].condition.test(event.target.value)) {
    // textError[eventtarget.name] correspond au texte d'erreur
    enableError(event.target, validation[event.target.name].errorMessage);
  } else {
    // e.target.parentNode.setAttribute('data-error-visible', false)
    disableError(event.target);
  }
}

function validationCheck(event) {
  if (event.target.checked) {
    validation[event.target.name].valid = true;
    disableError(event.target);
  } else {
    enableError(event.target, validation[event.target.name].errorMessage);
    validation[event.target.name].valid = false;
  }
}

function validationRadio(event) {
  if (event.target.checked && validation[event.target.name].valid == false) {
    validation[event.target.name].valid = true;
    disableError(event.target);
  }
}

function setEventValidation(validationObj) {
  const elements = [];
  let element = '';
  for (let key of Object.keys(validationObj)) {
    // nous permet de savoir si la condition est une regex
    if (validationObj[key].condition instanceof RegExp) {
      element = document.querySelector(`input[name=${key}]`);
      elements.push(element);
      element.addEventListener('blur', validationText);
      element.addEventListener('input', validationText);
    } else if (validationObj[key].condition === 'check') {
      element = document.querySelector(`input[name=${key}]`);
      elements.push(element);
      element.addEventListener('change', validationCheck);
    } else if (validationObj[key].condition === 'radio') {
      element = document.querySelectorAll(`input[name=${key}]`);
      elements.push(element);
      for (let radio of element) {
        radio.addEventListener('change', validationRadio);
      }
    }
  }

  return elements;
}

function validate(event) {
  event.preventDefault();

  console.log('entre');
  let isValid = true;
  for (let key of Object.keys(validation)) {
    if (!validation[key].valid) {
      isValid = false;
      enableError(
        document.querySelector(`input[name=${key}]`),
        validation[key].errorMessage
      );
    }
  }
  if (isValid) {
    validForm();
  }
}

// function hiddenModal() {
//   modalbg.style.display = 'none'
// }

function validForm() {
  const modalBody = document.querySelector('.modal-body');
  modalBody.innerHTML = ''
  modalBody.classList.add('modal-body--valid')
  const text = document.createElement('p');
  text.classList.add('valid__message');
  text.innerText = 'Merci ! Votre réservation a été reçue.'
  modalBody.append(text)

  const btn = document.createElement('button')
  btn.setAttribute('class', 'btn-close btn--close')
  btn.innerText = 'Fermer'
  btn.addEventListener('click', hiddenModal)
  modalBody.append(btn)
}

const elements = setEventValidation(validation);
const btnSubmit = document.querySelector('.btn-submit');
btnSubmit.addEventListener('click', validate);
