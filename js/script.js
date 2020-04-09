/**
 * Treehouse FSJS Techdegree - Unit 3 Project
 * Interactive Form - JS
 * Developed by: Justin Hager (ZenMnky)
 *                Portland, OR - 2020.04
 */
 //Basic Info
const nameInput = document.querySelector("#name");
const nameInputValue = nameInput.value;
const emailInput = document.querySelector("#email");
const jobRoleSelection = document.querySelector('select#title');
const otherJobRoleText = document.querySelector('input#other-title')
//T-Shirt Info
const designThemeSelection = document.querySelector('select#design');
const designThemeOptions = designThemeSelection.children;
const shirtColorSelection = document.querySelector('select#color');
const shirtColorOptions = shirtColorSelection.children;
//Register for Activities
  //....
//Payment Info
const creditCardNumber = document.querySelector("#user-cc-num");
const creditCardZip = document.querySelector("#user-zip");
const creditCardCvv = document.querySelector("#user-cvv");

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
    shirtColorActions.hideAll();
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


/**
 * 
 * FORM VALIDATION
 * 
 */

 //VALIDATORS
 //gonna turn this section into objects

 //Name field can't be blank.
 function isNameValid(name){
    return /[a-z]+/i.test(name);
}

 //Email field must be a validly formatted e-mail address
 function isValidEmail(email) {
    return /^[^@]+\@[^@.]+\.[a-z]+$/i.test(email);
  }
 
 //User must select at least one checkbox under the "Register for Activities" section of the form.
 // STILL NEEDS CODE

 //Credit Card field should only accept a number between 13 and 16 digits.
 function isCreditCardNumberValid(cardNumber){
    return /]d+{13,16}/i.test(cardNumber);
 }
 
 //The Zip Code field should accept a 5-digit number.
 function isZipValid(zip){
     return /\d+{5}/.test(zip);
 }

 //The CVV should only accept a number that is exactly 3 digits long.
 function isCvvValid(cvv){
    return /\d+{3}/.test(cvv);
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
  * EVENT HANDLING
  * 
  */

// emailInput.addEventListener("input", createListener(isValidEmail));
// nameInput.addEventListener("input", isNameValid(nameInputValue));
// nameInput.addEventListener("blur", isNameValid(nameInputValue));


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

//T-Shirt Design Theme behavior
designThemeSelection.addEventListener('input', (e) =>{
  const selection = e.target.selectedIndex;
  if (selection === 0){
    shirtColorActions.hideAll();
  } else if (selection === 1){
    shirtColorActions.showOnlyPuns();
  } else if (selection === 2){
    shirtColorActions.showOnlyHeartJs();
  }
})


/**
 * COMMENTS 
 * For the behavior that does exist, it is functional, and so far no bugs have been found
 * Next: ”Register for Activities” section
 * Remaining: "Payment Info" section, Form validation, Form validation messages 
 */