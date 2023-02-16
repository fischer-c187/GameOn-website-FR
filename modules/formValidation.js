import { hiddenModal } from "./modal.js";

// Contains all the information for each input:
// the keys correspond to the value of the "name" attribute of each input.
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
    condition: /^\w+[\.-]?\w+@\w+[\.-]?\w+\.\w{2,3}$/,
    valid: false,
  },
  birthdate: {
    errorMessage: 'Vous devez entrer votre date de naissance.',
    condition: /^19[0-9]{2}|20[01][0-9]|202[0-2]\-[0-9]{1,2}\-[0-9]{1,2}$/,
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
 * Adds classes that allow for error display.
 * In CSS, the error is displayed using "::after", and the "content" property retrieves the error message
 * using the "attr(data-error)" function.
 * 
 * The error is displayed on the parent element (<div class="formData">).
 * 
 * @param {Element} element the element that the error pertains to
 * @param {string} text the error message
 */
function enableError(element, text) {
  element.parentNode.setAttribute('data-error-visible', true);
  element.parentNode.setAttribute('data-error', text);
  validation[element.name].valid = false;
}

/**
 * Deactivates the error by modifying the value of the "data-error-visible" attribute.
 * 
 * @param {Element} element the element to be modified
 */
function disableError(element) {
  element.parentNode.setAttribute('data-error-visible', false);
  validation[element.name].valid = true;
}

/**
 * Returns the result of a regex test. 
 *
 * @param {RegExp} regex 
 * @param {string} text 
 * 
 * @returns {boolean}
 */
function regexTest (regex, text) {
  return regex.test(text)
}


/**
 * returns the results of checked
 * 
 * @param {Element} element 
 * @returns {boolean}
 */
function checked (element) {
  return element.checked
}

/**
 * Validation function for all text, date, and other input types.
 * Uses "event.target.name" to retrieve the regex from the validation object, and tests it on "event.target.value".
 * 
 * @param {Event} event the event object
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
 * Checks checkbox inputs.
 * 
 * @param {Event} event the event object
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
 * Checks radio inputs to verify that none are selected. It is not possible to deselect a radio button,
 * so there is no need to modify the "valid" value if it is already "true".
 * 
 * @param {Event} event the event object
 */
function validationRadio(event) {
  const name = event.target.name
  if (checked(event.target) && validation[name].valid == false) {
    disableError(event.target);
  }
}

/**
 * Initializes all input events. Checks if any fields are already filled and updates the value of "validation.name.valid" accordingly.
 * 
 * @param {Object} validationObj the object that contains the conditions, error messages, and input validation
 * @returns {Array} contains all selected elements
 */
export function setEventValidation() {
  const elements = [];
  let element = '';

  for (let key of Object.keys(validation)) {
    let condition = validation[key].condition;
    let selector = `input[name=${key}]`;

    // Checks if the input condition is a regex.
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
    // Adds an event to all radio inputs.
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
 * If all form inputs are valid, display the registration message.
 * 
 * @param {Event} event the event object received when the registration button is clicked
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

/**
 * Creates an HTML element.
 * 
 * @param {string} tag the tag for our element
 * @param {string} className the classes to add to our element
 * @param {string} value the element value
 * @returns {Element}
 */ 
function createElement(tag, className, value) {
  const element = document.createElement(tag);
  element.setAttribute('class', className);
  element.innerText = value;
  return element;
}

/**
 * Displays the registration validation message.
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

/**
 * Initializes the submit button.
 */ 
export function setBtnSubmit () {
  const btnSubmit = document.querySelector('.btn-submit');
  btnSubmit.addEventListener('click', validate);
}

