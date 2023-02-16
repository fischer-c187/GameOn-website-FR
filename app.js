import { setBtnModalEvent, setBtnResponsiveMenuEvent } from './modules/modal.js';
import { setEventValidation, setBtnSubmit } from './modules/formValidation.js';

// Initializes all events that correspond to the inputs.
// "elements" contains all elements for each input. 
const elements = setEventValidation();

// Initializes the buttons that allow for opening and closing our modal. 
setBtnModalEvent()

// Initializes the form submission button. 
setBtnSubmit()

// Initializes the button that manages mobile menu item display. 
setBtnResponsiveMenuEvent()
