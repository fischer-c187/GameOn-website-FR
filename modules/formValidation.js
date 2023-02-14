import { hiddenModal } from "./modal.js";

// contient toutes les informations de chaque input :
// la clés correspondent à la valeur de l'attribut name de chaque input
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

/**
 * on ajoute les classes qui permettent de gérer l'affichage de l'erreur,
 * en css on affiche l'erreur avec un ::after la propriétée content récupère le message d'erreur 
 * avec la fonction css attr(data-error).
 * 
 * On affiche l'erreur sur le parent (<div class="formData">)
 * 
 * @param {Element} element élément concerné par l'erreur
 * @param {string} text message d'erreur 
 */
function enableError(element, text) {
  element.parentNode.setAttribute('data-error-visible', true);
  element.parentNode.setAttribute('data-error', text);
  validation[element.name].valid = false;
}

/**
 * on désactive l'erreur en modifiant la valeur de l'attribut data-error-visible
 * 
 * @param {element} element 
 */
function disableError(element) {
  element.parentNode.setAttribute('data-error-visible', false);
  validation[element.name].valid = true;
}

/**
 * return le resultat d'un test regex 
 * 
 * @param {RegExp} regex 
 * @param {string} text 
 * 
 * @returns {boolean}
 */
function regexTest (regex, text) {
  return regex.test(text)
}

function checked (element) {
  return element.checked
}

/**
 * fonction de validation pour toutes les inputs de type text, date etc.
 * on se sert de event.target.name pour récupèrer notre regex dans notre object validation
 * on test notre regex sur event.target.value
 * 
 * @param {Event} event 
 */
function validationText(event) {
  const name = event.target.name
  const value = event.target.value
  const regex = validation[name].condition

  if (regexTest(regex, value)) {
    disableError(event.target);
  } else {
    enableError(event.target, validation[name].errorMessage);
  }
}

/**
 * Concerne la vérification des inputs de type checkbox
 * 
 * @param {Event} event 
 */
function validationCheck(event) {
  const name = event.target.name

  if (checked(event.target)) {
    disableError(event.target);
  } else {
    enableError(event.target, validation[name].errorMessage);
  }
}

/**
 * Concerne la vérification des inputs de type radio, on vérifie que notre input n'avait aucune
 * case de cochée, il n'est pas possible de désélectionner notre case, c'est inutile de modifier
 * la valeur de valid si elle est déjà sur true
 * 
 * @param {Event} event 
 */
function validationRadio(event) {
  const name = event.target.name
  if (checked(event.target) && validation[name].valid == false) {
    disableError(event.target);
  }
}

/**
 * Permet d'initialiser tout nos events sur nos inputs, on verifie si des champs sont déjà remplis 
 * et on met à jour la valeur de validation.name.valid en conséquence 
 * 
 * @param {Object} validationObj correspond à notre object qui contient les conditions, message d'erreur et la validation de l'entrée 
 * @returns {Array} contient tous les elements séléctionnés 
 */
export function setEventValidation() {
  const elements = [];
  let element = '';

  for (let key of Object.keys(validation)) {
    let condition = validation[key].condition;
    let selector = `input[name=${key}]`;

    // on vérifie si la condition de notre input est une regex 
    if (condition instanceof RegExp) {
      element = document.querySelector(selector);
      element.addEventListener('blur', validationText);
      element.addEventListener('input', validationText);
      validation[key].valid = regexTest(condition, element.value)
    }
    else if (condition === 'check') {
      element = document.querySelector(selector);
      element.addEventListener('change', validationCheck);
      validation[key].valid = checked(element)
    } 
    // on ajoute notre événement à tous les input de type radio
    else if (condition === 'radio') {
      element = document.querySelectorAll(selector);
      for (let radio of element) {
        radio.addEventListener('change', validationRadio);
        validation[key].valid = (checked(radio) && validation[key].valid === false) ? true : validation[key].valid;
      }
    }

    elements.push(element)
  }

  return elements;
}

/**
 * si toutes les entrées du formulaire sont validées alors on affiche le message d'inscription
 * 
 * @param {Event} Event reçu lors du click sur le boutton d'inscription
 */
export function validate(event) {
  event.preventDefault();

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
    displaySuccessMessage();
  }
}

function createElement(tag, className, value) {
  const element = document.createElement(tag);
  element.setAttribute('class', className);
  element.innerText = value;
  return element;
}

/**
 * affichage du message de validation de l'inscription
 */
function displaySuccessMessage() {
  const modalBody = document.querySelector('.modal-body');
  modalBody.innerHTML = ''
  modalBody.classList.add('modal-body--valid')

  const text = createElement('p', 'valid__message', 'Merci ! Votre réservation a été reçue.');
  const btn = createElement('button', 'btn-close btn--close', 'Fermer');

  btn.addEventListener('click', hiddenModal);
  modalBody.append(text, btn);
}

export function setBtnSubmit () {
  const btnSubmit = document.querySelector('.btn-submit');
  btnSubmit.addEventListener('click', validate);
}

