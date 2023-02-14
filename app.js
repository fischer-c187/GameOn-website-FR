import { setBtnModalEvent, setBtnResponsiveMenuEvent } from './modules/modal.js';
import { setEventValidation, setBtnSubmit } from './modules/formValidation.js';

// on initialise tous les evenements qui correspondent aux inputs
// elements contient tous les Elements de chaque input
const elements = setEventValidation();

// on initialise nos boutons qui permettent d'ouvrir et de fermer notre modal
setBtnModalEvent()

// initialisation du boutton de soumision du formulaire
setBtnSubmit()

// initialisation du bouton qui gere l'affichage des items du menu sur la version mobile
setBtnResponsiveMenuEvent()
