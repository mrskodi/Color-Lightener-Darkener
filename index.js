/*
STEP 3: JS #1: Function: isHexValid(hexInput)
    -> Check if hexInput is Valid
    -> EDGE CASE CHECK - If user does not enter input, is null or undefined, return false
    -> User can enter a hex value including # or excluding it.
    -> Check the length of the left over string - should be either 3 or 6
    -> valid characters are between 0 to 9 and a to f
    -> Once done with writing the function, test it (IMPORTANT)
    -> Note: Use regExp to verify validity of hexadecimal color entered
             freCodeCamp regEx on youTube is a good resource
STEP 4: JS #2: Update Input Color Div if hex input valid, if invalid return
    -> Get a reference to the hexInput and the inputColor DOM element (div)
    -> Create a keyup eventHandler for hexInput to get the hexInput
    -> Inside of the call back function of the keyup eventHandler, check if hexInput is Valid. 
    -> If user does not input #, prefix with '#'.
    -> If valid, update background color of inputColor
    -> Once done with writing the function, test it (IMPORTANT)
STEP 5: JS #3: Function - hex to rgb value: convertHexToRGB(hex)
    -> Create a function to convert hex value to rgb
    -> Should work with 3 or 6 character hex
    -> use parseInt(16) to get the decimal equivalent of hexadecimal value
    -> should return an object with 3 properties: r, g, b
    -> Once done with writing the function, test it (IMPORTANT)
STEP 6: JS #4: Function - rgb to hex value: convertRGBToHex(r, g, b)
    -> Create a function to convert rgb to hex value
    -> Take 3 parameters - r, g and b
    -> for each r, g and b values -> Create a hex pair that is 2 characters long
    -> use the toString(16) to convert a decimal value to a string which is base 16.
    -> reminder: regardless of whether the hex character returned from the above step is 1 or 2 characters long, the hex value should be made 2 chars long. eg: hex value a should be a should be 0a.
    -> return the hex value starting with a hashtag # at the beginning
STEP 7: JS #5: Display % that user chooses on the slider
    -> Get a reference to the slider and sliderText DOM elements
    -> Create an input event listener for the slider element
    -> Inside the call back function of the event listener, display the sliderText based on the % the user chooses on the slider.
STEP 8: JS #6 - Compute the alter color based on % and hex input - alterColor(hex, percentage)
    -> Create alterColor() which accepts hex value and percentage
    -> convert the hex value to rgb
    -> increase each rgb value by appropriate amount (% of 255)
    -> use the new rgb values to convert to a hex value
    -> return the hex value
STEP 9: JS #7 - Ensure altered r, g, b stays between 0 and 255. If not, make them the boundaries.
STEP 10: JS #8 - Alter alterColor div background based on user input
    -> In the slider event listener, check if hex is valid
    -> If the hex color is invalid, changing the percentage should do nothing
    -> take the valid hex value entered by the user and get the altered hex value
    -> get a reference to the altered color DOM element
    -> update the altered color div with the altered hex value
    -> get a reference to the altered Color Text element
    -> update the value to reflect the new hex value
STEP 13: JS #9 - Add functionality for toggle button
    -> Get a reference to lighten text, darken text, toggleBtn
    -> Add a click event listener to the toggle button
    -> Inside the call back to that event listener, apply different classes whether or not that thing is toggled.
        -> If the toggle button is already toggled(meaning in the darken text), remove that class from the toggle button and choose lighten to remove from unselected, add unselected to darken text 
        -> If not, add toggled class to toggleBtn, add unselected class to lighten, remove unselected from darken.
        -> Only one of the pieces of text should be unselected at a time
        -> The darken text refers to toggled.
STEP 14: JS #10 - Make changes to the slider event listener
    -> When the slider value changes, we want to take into account the value that is in the slider and whether or not lighten / darken is selected.
    -> Inorder to achieve this, instead of just passing slider.value to the alterColor(), we want to determine whether we will pass in a + or - number depending on lightening / darkening the color
    -> Lightening - (+)ve, darkening - (-)ve
    -> Challenge: Calculate the appropriate value for the color alteration between positive and negative
        -> look at whether the toggleBtn contains the class toggled to find whether or not to assign + or - value to the amount.
STEP 15: JS #11 - Reset Function which is called every time the toggle button is clicked / hex Input is changed by the user so that they can start from scratch when these changes are made.
    -> Set the slider value to 0 and text to 0%
    -> Set altered Color to orginal Input color
    -> Set alteredColorText to original Input
    -> Call reset in toggleBtn click handler
    -> Call reset in hexInput keyup handler
*/

// get the hexInput that user entered
const hexInput = document.getElementById('hexInput');
const invalidHexMessage = document.getElementById('invalidHexMessage');
const inputColorDiv = document.getElementById('inputColor');
const sliderText = document.getElementById('sliderText');
const slider = document.getElementById('slider');
const alterColorDiv = document.getElementById('alteredColor');
const alteredColorText = document.getElementById('alteredColorText');
const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const toggleButton = document.getElementById('toggleButton');

const isHexValid = (hex) => {
  if(!hex)
    return false;

  // Another way of writing the below sentence is to user hexInput.startsWith()
  // const strippedHex = hexInput.startsWith("#") ? hexInput.substring(1) : hexInput;
  // Or hexInput.charAt(0) === '#', slice the string from 1st index

  // Using replace function below for stripping hexCode
  const strippedHex = hex.replace("#", '');
  return (strippedHex.length === 3 || strippedHex.length === 6);
}

hexInput.addEventListener('keyup', () => {
  const hex = hexInput.value;
  // If inputHex is not valid, display errorMessage
  if(!isHexValid(hex)) {
    return;
  }
  const strippedHex = hex.replace('#', '');
  inputColorDiv.style.backgroundColor = `#${strippedHex}`;
  resetColors();
});

const convertHexToRGB = (hex) => {
  if(!isHexValid(hex))
    return null;
  const rgb = {};
  let strippedHex = hex.replace('#', '');
  
  // Build a string of length 6 if strippedHex = 3
  if(strippedHex.length === 3) 
    strippedHex = strippedHex[0] + strippedHex[0] +
                  strippedHex[1] + strippedHex[1] +
                  strippedHex[2] + strippedHex[2];
  rgb.r = parseInt(strippedHex.substring(0, 2), 16);
  rgb.g = parseInt(strippedHex.substring(2, 4), 16);
  rgb.b = parseInt(strippedHex.substring(4), 16)

  return rgb;
};

const convertRGBToHex = (r, g, b) => {
  let hexR = ('0' + r.toString(16)).slice(-2);
  let hexG = `0${g.toString(16)}`.slice(-2);
  let hexB = `0${b.toString(16)}`.slice(-2);

  // if(hexR.length === 1)
  //   hexR = `0${hexR}`;
  // Neat little trick from the course - bypassing the if conditions above
  // hexR = ('0' + r.ToString(16)).slice(-2);
  return `#${hexR}${hexG}${hexB}`;
};

slider.addEventListener('input', () => {
  if(!isHexValid(hexInput.value))
    return;

  // if(toggleButton.classList.contains('toggled')) {
  //   sliderValue = -slider.value;
  // } else {
  //   sliderValue = slider.value
  // }
  
  let percentageValue = (toggleButton.classList.contains('toggled')) ? -slider.value : slider.value;

  sliderText.textContent = `${slider.value}%`;
  const alteredHex = alterColor(hexInput.value, percentageValue);
  alterColorDiv.style.backgroundColor = alteredHex;
  alteredColorText.innerText = `Altered Color: ${alteredHex}`;
});

const alterColor = (hex, percentage) => {
  const {r, g, b} = convertHexToRGB(hex);
  const amount = Math.floor((percentage / 100) * 255);

  const newR = stayWithin0To255(r, amount);
  const newG = stayWithin0To255(g, amount);
  const newB = stayWithin0To255(b, amount);

  return convertRGBToHex(newR, newG, newB);
}

const stayWithin0To255 = (val, amount) => {
  const newVal = val + amount;

  if(newVal > 255) return 255;
  if(newVal < 0) return 0;
  return newVal;
};

toggleButton.addEventListener('click', () => {
  if(toggleButton.classList.contains('toggled')) {
    toggleButton.classList.remove('toggled');
    lightenText.classList.remove('unselected');
    darkenText.classList.add('unselected');
  } else {
    toggleButton.classList.add('toggled');
    lightenText.classList.add('unselected');
    darkenText.classList.remove('unselected');
  }
  resetColors();
});

const resetColors = () => {
  sliderText.innerText = `0%`;
  slider.value = 0;
  let strippedHex = hexInput.value.replace('#', '');
  console.log(strippedHex);
  alterColorDiv.style.backgroundColor = `#${strippedHex}`;
  alteredColorText.innerText = `Altered Color`;
};