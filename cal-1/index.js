// Display input/output field
const display = document.getElementById('display');

/**
 * Adds a character to the display
 * @param {string} value 
 */
function appendToDisplay(value) {
    display.value += value;
}

/**
 * Clears the display
 */
function clearDisplay() {
    display.value = '';
}

/**
 * Deletes the last character from the display
 */
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

/**
 * Evaluates the expression in the display
 */
function calculateResult() {
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Error';
    }
}

/**
 * Toggles the sign of the current number in the display
 */
function toggleSign() {
    if (display.value) {
        if (display.value.startsWith('-')) {
            display.value = display.value.slice(1);
        } else {
            display.value = '-' + display.value;
        }
    }
}
