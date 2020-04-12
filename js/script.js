/**
 * Treehouse FSJS Techdegree - Unit 3 Project
 * Interactive Form - Vanilla JS
 * Developed by: Justin Hager (ZenMnky)
 *                Portland, OR - 2020.04
 * 
 * Aiming to acheive "Exceeds Expectations" standards
 * - Focus on the first field ✅
 * - Job Role Section behavrior ✅
 * - T-Shirt Section: 
 * - - no options appear until a theme is selected ✅
 * - - - “Please select a T-shirt theme” shows, when color drop down menu is visible (you'll need to change the display setting to verify this [search for: shirtColorSelection.style.display = 'none';]) ✅
 * - - Color dropdown menu is hidden until shirt design is selected ✅
 * - Activity Registration: 
 * - - Can't select overlaping times ✅
 * - - Total cost dynamicaly displayed ✅
 * - Payment Display
 * - - cc is default ✅
 * - - option matches displayed text/input ✅
 * - - sections are shown/hidden accordingly ✅
 * - Form Validation (name, email, >= 1 checkbox, cc) ✅
 * - Validation Messages
 * - - On Submission ✅
 * - - at least one error message in real time, before the form is submitted: Name & email ✅
 * - - at least one error message that changes depending on the error: email ✅
 */



"use strict";

 //Basic Info
const nameInput = document.querySelector("input#name");
let nameInputValue = nameInput.value;
const emailInput = document.querySelector("input#email");
const jobRoleSelection = document.querySelector('select#title');
const otherJobRoleText = document.querySelector('input#other-title')
//T-Shirt Info
const designThemeSelection = document.querySelector('select#design');
const designThemeOptions = designThemeSelection.children;
const shirtColorSelection = document.querySelector('select#color');
const shirtColorOptions = shirtColorSelection.children;
//Register for Activities
const activitiesField = document.querySelector('fieldset.activities');
const documentCheckboxes = document.querySelectorAll('input[type="checkbox"]');
//Payment Info
const creditCardNumber = document.querySelector("input#cc-num");
const creditCardZip = document.querySelector("input#zip");
const creditCardCvv = document.querySelector("input#cvv");
//Validation Error Message Loations
const nameInvalidMsg = document.querySelector('span#name-invalid');
const emailInvalidFormatMsg = document.querySelector('span#email-invalid-format');
const emailInvalidBlankMsg = document.querySelector('span#email-invalid-blank');
const activitesInvalidMsg = document.querySelector('span#activities-invalid');
const ccNumInvalidMsg = document.querySelector('span#cc-num-invalid');
const ccZipInvalidMsg = document.querySelector('span#zip-invalid');
const cvvInvalidMsg = document.querySelector('span#cvv-invalid');


/**
 * ON PAGE LOAD
 * - set focus to the first text field
 * --adapted from https://stackoverflow.com/questions/45827/how-do-you-automatically-set-the-focus-to-a-textbox-when-a-web-page-loads
 * - hide Other Job Role text field
 * - hide shirt color options until a design theme is selected
 */

 window.onload = () => {
    document.querySelector('input').focus();
    otherJobRoleText.style.display = 'none';    
}


/**
 * 
 * FUNCTIONS
 * 
 */

/**
 * function createShirtThemeOption()
 * Create and append an option to the color selection menu
 * that acts as an alert to the user to select a theme
 */

function createShirtThemeOption() {
  const tempOption = document.createElement('option');
  tempOption.innerText = 'Please select a T-shirt theme';
  tempOption.setAttribute('selected', 'selected');
  tempOption.setAttribute('id', 'selectShirtThemeOption');
  const firstColorOption = shirtColorOptions[0];
  shirtColorSelection.insertBefore( tempOption, firstColorOption
  );
}
createShirtThemeOption();
const tempOption = document.querySelector('#selectShirtThemeOption');


 //VALIDATORS
 //gonna turn this section into an array of objects...maybe

 //Name field may not be blank, nor contain numbers
 function isNameValid(name){
    return /^\D+$/i.test(name);
}

 //Email field must be a validly formatted e-mail address
 function isEmailValid(email) {
    return /^[^@]+\@[^@.]+\.[a-z]+$/i.test(email);
  }
 
 //User must select at least one checkbox under the "Register for Activities" section of the form.
 function isRegActivitesValid(){
  let isChecked = 0;
  for (let i = 0; i < documentCheckboxes.length; i += 1){
    if (documentCheckboxes[i].checked === true){
      isChecked +=1
    }
  }

  return (isChecked > 0 ? true : false)

 }

 //Credit Card field should only accept a number between 13 and 16 digits.
 function isCreditCardNumberValid(cardNumber){
    return /^\d{13,16}$/.test(cardNumber);
 }
 
 //The Zip Code field should accept a 5-digit number.
 function isZipValid(zip){
     return /^\d{5}$/.test(zip);
 }

 //The CVV should only accept a number that is exactly 3 digits long.
 function isCvvValid(cvv){
    return /^\d{3}$/.test(cvv);
}

function validateCcNum() {
  const ccNum = creditCardNumber.value;
  if (isCreditCardNumberValid(ccNum)){
    creditCardNumber.classList.remove('invalid');
    ccNumInvalidMsg.style.display = 'none';
    return true;
  } else {
    creditCardNumber.classList.add('invalid');
    ccNumInvalidMsg.style.display = 'block';
    return false;
  }
}
function validateZip(){
  const zip = creditCardZip.value;
  if (isZipValid(zip)){
    creditCardZip.classList.remove('invalid');
    ccZipInvalidMsg.style.display = 'none';
    return true;
  } else {
    creditCardZip.classList.add('invalid');
    ccZipInvalidMsg.style.display = 'block';
    return false;
  }
}

function validateCvv(){
  const cvv = creditCardCvv.value;
  if (isCvvValid(cvv)){
    creditCardCvv.classList.remove('invalid');
    cvvInvalidMsg.style.display = 'none';
    return true;
  } else {
    creditCardCvv.classList.add('invalid');
    cvvInvalidMsg.style.display = 'block';
    return false;
  }
}


function validateCreditCardInput() {
  validateCcNum();
  validateZip(); 
  validateCvv();

  if( validateCcNum() && validateZip() && validateCvv()){
    return true;
  } else {
    return false;
  }
}

/**
 * T-Shirt Info Section
 * Until a theme is selected from the “Design” menu, 
 * no color options appear in the “Color” drop down 
 * and the “Color” field reads “Please select a T-shirt theme”.
 */

//Object of actions for displaying shirt collections
//This baby needs refactored 😅...DRY style
const shirtColorActions = {
  hideAll: () => {
    for (let i = 0; i<shirtColorOptions.length; i+=1){
    shirtColorOptions[i].style.display = 'none';
    shirtColorOptions[1].removeAttribute('selected', 'selected');
    }
    tempOption.style.display = 'block';
    tempOption.setAttribute('selected', 'selected');

  },
  showOnlyPuns: () => {
    //show pun shirts, index values of 1-3
    for (let i = 1; i<=3; i+=1){
      shirtColorOptions[i].style.display = 'block';
    }
    shirtColorOptions[1].setAttribute('selected', 'selected');
    //hide I Heart JS shirts, index values of 4-6
    for (let i = 4; i<=6; i+=1){
      shirtColorOptions[i].style.display = 'none';
      shirtColorOptions[i].removeAttribute('selected');
    }
    //hide Select Theme message
    tempOption.style.display = 'none';
    tempOption.removeAttribute('selected');
  },
  showOnlyHeartJs: () => {
    //hide pun shirts, index values of 1-3
    for (let i = 1; i<=3; i+=1){
      shirtColorOptions[i].style.display = 'none';
      shirtColorOptions[i].removeAttribute('selected');
    }
    //show I Heart JS shirts, index values of 4-6
    for (let i = 4; i<=6; i+=1){
      shirtColorOptions[i].style.display = 'block';
    }
    shirtColorOptions[4].setAttribute('selected', 'selected');
    //hide Select Theme message
    tempOption.style.display = 'none';
    tempOption.removeAttribute('selected');
  }
}
/**
 * 
 * FORM VALIDATION
 * 
 */

//VALIDATION FUNCTIONS

//name validation function
  function validateName() {
    nameInputValue = nameInput.value;
    if(isNameValid(nameInputValue) === true){
      nameInput.classList.remove('invalid');
      nameInvalidMsg.style.display = 'none';
      return true;
    } else {
      nameInput.classList.add('invalid');
      nameInvalidMsg.style.display = 'block';
      return false;
    };
  }

//email validation function
  //if blank, display blank message
  //otherwise, check the formatiing. if formatting is not valid, invalid format message
  function validateEmail() {
    let emailInputValue = emailInput.value;
    if (emailInputValue === ''){
        emailInput.classList.add('invalid');
        emailInvalidBlankMsg.style.display = 'block';
        emailInvalidFormatMsg.style.display = 'none';
        return false;
    } else if (isEmailValid(emailInputValue)){
        emailInput.classList.remove('invalid');
        emailInvalidFormatMsg.style.display = 'none';
        emailInvalidBlankMsg.style.display = 'none';
        return true;
    } else if (!isEmailValid(emailInputValue)) {
        emailInput.classList.add('invalid');
        emailInvalidFormatMsg.style.display = 'block';
        emailInvalidBlankMsg.style.display = 'none';
        return false;
    };
  }

//activites section validation function
function validateActivites() {
    if (isRegActivitesValid() === true){
      activitiesField.classList.remove('invalid');
      activitesInvalidMsg.style.display = 'none'; 
      return true;     
    } else {
      activitiesField.classList.add('invalid');
      activitesInvalidMsg.style.display = 'block';    
      return false;
    }
}

// Form Validation with Submission request
  // When for is called to be submitted, validate appropriate fields.
  // If fields are valid, allow submission. Else, prevent submission.
const regForm = document.querySelector('#registrationForm');
regForm.addEventListener('submit', (e)=>{
  
  if (!validateName()){e.preventDefault();}
  if (!validateEmail()){e.preventDefault();}
  if (!validateActivites()){e.preventDefault();}
  if (!paymentMethodMenu.selectedIndex >=1){e.preventDefault();}
  //if credit card is selected as payment method, fire relevant validaton
  if (paymentMethodMenu.selectedIndex === 1){
    if (!validateCreditCardInput()){e.preventDefault();}  
  }
})

//END FORM VALIDATION


/************************
 * BEHAVIORS Section
 * (aka Event Handling)
 ************************/

/**
 * JOB ROLE OTHER is selected:
 * Reveal, and set focus to, text field
 * Event listner inspired by https://gomakethings.com/detecting-select-menu-changes-with-vanilla-js/
 */

//Actions
const jobRoleSelectionActions = {
  show: () => {
    otherJobRoleText.style.display = 'block';
    otherJobRoleText.focus();  
  },
  hide: () => {
    otherJobRoleText.style.display = 'none';  
  }
};
//Handler
jobRoleSelection.addEventListener('input', (e) => {
  const selection = e.target.selectedIndex;
  
  if (selection === 5){
    jobRoleSelectionActions.show();
  } else {
    jobRoleSelectionActions.hide();
  }
})
//END JOB ROLE OTHER event handler

//REGISTER FOR ACTIVITIES SECTION


//Create a new section for the registration total & append to the end of the checkbox list
const totalSection = document.createElement('div');
totalSection.setAttribute('id', 'jobRoleTotalDiv');

const regTotalParagraph = document.createElement('p');
regTotalParagraph.setAttribute('id', 'regTotalText');
regTotalParagraph.innerText = `Total: $0.00`;

totalSection.appendChild(regTotalParagraph);
activitiesField.appendChild(totalSection);

//counter for registration total
let activityTotalCost = 0;

//registration section handler
activitiesField.addEventListener('change', (e) => {
  const clickTarget = e.target;
  const clickedDayAndTime = clickTarget.getAttribute('data-day-and-time'); 
  
  // Day and Time behavior
    // if checkbox is checked, disable other boxes with the same day and time
    // if checkbox is unchecked, enable other boxes with the same day and time
  for (let i=0; i<documentCheckboxes.length; i+=1){
    const checkboxType = documentCheckboxes[i].getAttribute('data-day-and-time');
    if(checkboxType === clickedDayAndTime && documentCheckboxes[i] !== clickTarget){
      if(clickTarget.checked){
        documentCheckboxes[i].disabled = true;
      } else {
        documentCheckboxes[i].disabled = false;
      } 
    }
  }

    // Running Total behavior
      // As a user selects activities, a running total should display below the list of checkboxes.
    
    //select the area to enter text into
    const regTotalOutputTextArea = document.querySelector('#regTotalText');
    
    //get the dollar value
    let activityCost = Number.parseFloat(clickTarget.getAttribute('data-cost'));
    
    //adjust the total
    if(clickTarget.checked){
      activityTotalCost += activityCost;
      regTotalOutputTextArea.innerText = `Total: $${activityTotalCost}`;   
    } else {
      activityTotalCost -= activityCost;
      regTotalOutputTextArea.innerText = `Total: $${activityTotalCost}`;   
    } 
    
})



//END REGISTER FOR ACTIVITIES SECTION


//T-SHIRT DESIGN THEME SECTION 👕
designThemeSelection.addEventListener('input', (e) =>{
  const selection = e.target.selectedIndex;
  if (selection === 0){
    shirtColorActions.hideAll();
  } else if (selection === 1){
    shirtColorSelection.style.display = 'block';
    shirtColorActions.showOnlyPuns();
  } else if (selection === 2){
    shirtColorSelection.style.display = 'block';
    shirtColorActions.showOnlyHeartJs();
  }
})

//END T-SHIRT DESIGN THEME SECTION

//PAYMENT INFORMATION SECTION 💸
//Display payment sections based on the payment option chosen in the select menu.
const paymentMethodMenu = document.querySelector('select#payment');
const paymentMethodOptions = paymentMethodMenu.children;
const creditCardDiv = document.querySelector('div#credit-card');
const payPalDiv = document.querySelector('div#paypal');
const bitCoinDiv = document.querySelector('div#bitcoin');

// PAYMENT INFO SECTION
  //When a user selects the "PayPal" payment option, the PayPal information should display, and the credit card and “Bitcoin” information should be hidden.
  //When a user selects the "Bitcoin" payment option, the Bitcoin information should display, and the credit card and “PayPal” information should be hidden.
function displayPayPal(display){
  if (display === true){
    payPalDiv.style.display = 'block';
  } else {
    payPalDiv.style.display = 'none';
  }
}
function displayCreditCard(display){
  if (display === true){
    creditCardDiv.style.display = 'block';
  } else {
    creditCardDiv.style.display = 'none';
  }
}
function displayBitCoin(display){
  if (display === true){
    bitCoinDiv.style.display = 'block';
  } else {
    bitCoinDiv.style.display = 'none';
  }
}
const paymentMenuActions = {
  creditCard: () => {
    displayCreditCard(true);
    displayPayPal(false);
    displayBitCoin(false);
  },
  payPal: () => {
    displayCreditCard(false);
    displayPayPal(true);
    displayBitCoin(false);
  },
  bitCoin: () => {
    displayCreditCard(false);
    displayPayPal(false);
    displayBitCoin(true);
  },
  other: () => {
    displayCreditCard(false);
    displayPayPal(false);
    displayBitCoin(false);
  }
}

paymentMethodMenu.addEventListener('input', (e) => {
  const menuOption = e.target.selectedIndex;
  switch (menuOption){
    case 0:
      paymentMenuActions['other']();
      break;
    case 1: 
      paymentMenuActions['creditCard']();
      break;
    case 2:
      paymentMenuActions['payPal']();
      break;
    case 3:
      paymentMenuActions['bitCoin']();
      break;
  }

})

//END PAYMENT INFO SECTION

//VALIDATION EVENT HANDLES
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);

//END BEHAVIORS SECTION

/**
 * INITIAL CALLS
 */
//Hide color menu until a theme is selected
 shirtColorSelection.style.display = 'none';
//Hide shirts until a theme is selected
 shirtColorActions.hideAll();

//The "Credit Card" payment option should be selected by default
paymentMenuActions['creditCard']();
paymentMethodMenu.selectedIndex = 1;

//Disable Menu Options
//'Select Theme'
designThemeSelection[0].setAttribute('disabled', 'true');
//'Select T-Shirt Name'
shirtColorSelection[0].setAttribute('disabled', 'true');
//'Select Payment Method'
paymentMethodMenu[0].setAttribute('disabled', 'true');


//END INITIAL CALLS

/**
 * COMMENTS 
 * It works 😄. It's not fully DRY...a bit damp...but that is not a stated requirement of this project 😅
 * Identified bug(s): N/A
 *  
 *  
 * Next: Celebrate 🌞🕺🌴🌻
 * Remaining: 
 * - Refactor/Clean-up (DRY) [optonal]
 * - Celebrate 🌞🕺🌴🌻
 * 
 */