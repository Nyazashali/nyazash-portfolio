const display = document.getElementById("display");

// Append input to display with validation
function appendtodisplay(input) {
    const lastChar = display.value.slice(-1);

    // Prevent multiple operators in a row
    if (["+", "-", "*", "/"].includes(input) && ["+", "-", "*", "/"].includes(lastChar)) {
        return;
    }

    // Prevent multiple decimal points in a number
    if (input === "." && lastChar === ".") {
        return;
    }

    display.value += input;
}

// Clear the display
function clearDisplay() {
    display.value = ""; 
}

// Evaluate the expression safely
function calculate() {
    try {
        if (display.value.trim() === "") {
            display.value = "0"; // Default to 0 if empty
            return;
        }

        // Use Function constructor for safer evaluation
        const result = new Function(`return ${display.value}`)();

        if (result === Infinity || result === -Infinity) {
            display.value = "Error"; // Handle division by zero
        } else {
            display.value = result;
        }
    } catch (error) {
        display.value = "Error"; // Handle other errors
    }
}
