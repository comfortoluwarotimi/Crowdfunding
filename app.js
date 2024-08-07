// DOM Elements

const overlay = document.querySelector("#overlay"); // Select the overlay element
const main = document.querySelector("main"); // Select the main content element
const numberSection = document.querySelector("#numbers"); // Select the section containing numbers
const statsContainer = document.querySelector("#numbers .container"); // Select the container inside the number section
const progressBar = document.querySelector("#progressBar div"); // Select the div inside the progress bar
const logo = document.querySelector("#logo"); // Select the logo element
const openNav = document.querySelector("#openNav"); // Select the element to open the navigation menu
const closeNav = document.querySelector("#closeNav"); // Select the element to close the navigation menu
const navToggles = [openNav, closeNav]; // Array of navigation toggle elements
const mobileNav = document.querySelector("#mobileNav"); // Select the mobile navigation menu
const desktoptNav = document.querySelector("#desktopNav"); // Select the desktop navigation menu
const bookmark = document.querySelector("#bookmark"); // Select the bookmark button
const bookmarkLabel = document.querySelector("#bookmark p"); // Select the bookmark label text
const openButtons = document.querySelectorAll("main button"); // Select all buttons in the main content
const specificButtons = { button1: "#bamboo", button2: "#black", button3: "#mahogany" }; // Map specific buttons to their IDs
const modal = document.querySelector("#modal"); // Select the modal element
const closeModal = document.querySelector("#closeModal"); // Select the element to close the modal
const selects = document.querySelectorAll(".select input"); // Select all input elements inside .select
const inputConditions = { option1: 0, option2: 25, option3: 75, option4: 200 }; // Define pledge amount conditions
const continueButtons = document.querySelectorAll(".selection button"); // Select all continue buttons
const confirmation = document.querySelector("#confirmation"); // Select the confirmation element
const finalizeButton = document.querySelector("#confirmation button"); // Select the finalize button inside the confirmation element
const totalRaised = document.querySelector("#totalRaised"); // Select the total raised amount element
const totalBackers = document.querySelector("#totalBackers"); // Select the total backers element

let pledge = 0; // Initialize pledge amount

// Helper Functions

const toggleOverlay = () => overlay.classList.toggle("active"); // Toggle the 'active' class on the overlay

const toggleNav = () => {
    main.classList.toggle("inactive"); // Toggle the 'inactive' class on the main content
    mobileNav.classList.toggle("active"); // Toggle the 'active' class on the mobile navigation menu
    overlay.classList.toggle("active"); // Toggle the 'active' class on the overlay
    navToggles.forEach(toggle => toggle.classList.toggle("active")); // Toggle the 'active' class on all navigation toggles
};

const toggleModal = () => {
    modal.classList.toggle("active"); // Toggle the 'active' class on the modal
    logo.classList.toggle("inactive"); // Toggle the 'inactive' class on the logo
    openNav.classList.toggle("inactive"); // Toggle the 'inactive' class on the open navigation button
    desktoptNav.classList.toggle("inactive"); // Toggle the 'inactive' class on the desktop navigation menu
};

const resetModal = () => {
    setTimeout(() => {
        clearSelect(); // Clear the selected option in the modal
        closeModal.scrollIntoView(); // Scroll the close modal button into view
    }, 500); // Delay execution by 500ms
};

const clearSelect = () => {
    const currentSelection = document.querySelector(".selection.active"); // Select the currently active selection
    if (currentSelection) {
        const radio = document.querySelector(".selection.active .select input"); // Select the radio button in the active selection
        const pledge = document.querySelector(".selection.active .pledge"); // Select the pledge element in the active selection
        const currentInput = document.querySelector(".selection.active .pledge input"); // Select the input element in the pledge
        currentSelection.classList.remove("active"); // Remove the 'active' class from the current selection
        radio.checked = false; // Uncheck the radio button
        pledge.style.maxHeight = 0; // Set the maximum height of the pledge to 0
        setTimeout(() => {
            currentInput.parentElement.parentElement.classList.remove("error"); // Remove the 'error' class from the parent element of the input
            currentInput.value = ""; // Clear the input value
        }, 500); // Delay execution by 500ms
    };
};

const selectNew = select => {
    const parentSelection = select.parentElement.parentElement; // Get the parent element of the select
    parentSelection.classList.toggle("active"); // Toggle the 'active' class on the parent element
    const pledge = document.querySelector(".selection.active .pledge"); // Select the pledge element in the active selection
    pledge.style.maxHeight = pledge.scrollHeight + "px"; // Set the maximum height of the pledge to its scroll height
    select.checked = true; // Check the select input
    setTimeout(() => parentSelection.scrollIntoView({ behavior: "smooth" }), 500); // Scroll the parent element into view smoothly after 500ms
};

const updateStock = () => {
    const selector = document.querySelector(".selection.active .select input").getAttribute("value"); // Get the value of the selected input
    const options = document.querySelectorAll(`.option.${selector}`); // Select all options with the current selector value
    const stock = document.querySelectorAll(`.option.${selector} h6`); // Select all stock elements for the current selector
    if (selector !== "noReward") {
        const newStock = Number(stock[0].innerHTML) - 1; // Decrease the stock number by 1
        stock.forEach(s => {
            s.innerHTML = newStock.toString(); // Update the stock display
        });
        if (newStock === 0) {
            options.forEach(o => {
                o.classList.add("inactive"); // Add 'inactive' class to options if stock is 0
                document.querySelectorAll(".option.inactive button").forEach(b => b.innerHTML = "Out of Stock"); // Set button text to "Out of Stock"
            });
        };
    };;
};

// Overlay Close

overlay.addEventListener("click", () => {
    if (mobileNav.classList.contains("active")) {
        toggleNav(); // Toggle navigation if mobile menu is active
        mobileNav.style.opacity = 0; // Fade out mobile navigation menu
        mobileNav.style.maxHeight = 0; // Collapse mobile navigation menu
    } else {
        resetModal(); // Reset modal if mobile menu is not active
        toggleModal(); // Toggle the modal
        toggleOverlay(); // Toggle the overlay
    };
});

// Mobile Menu

openNav.addEventListener("click", () => {
    mobileNav.style.opacity = 1; // Fade in mobile navigation menu
    mobileNav.style.maxHeight = mobileNav.scrollHeight + "px"; // Expand mobile navigation menu
    toggleNav(); // Toggle navigation
});

closeNav.addEventListener("click", () => {
    mobileNav.style.opacity = 0; // Fade out mobile navigation menu
    mobileNav.style.maxHeight = 0; // Collapse mobile navigation menu
    toggleNav(); // Toggle navigation
});

// Bookmark Button

bookmark.addEventListener("click", () => {
    bookmark.classList.toggle("active"); // Toggle the 'active' class on the bookmark button
    if (bookmark.classList.contains("active")) {
        bookmarkLabel.innerHTML = "Bookmarked"; // Update label text to "Bookmarked"
    } else {
        bookmarkLabel.innerHTML = "Bookmark"; // Update label text to "Bookmark"
    };
});

// Modal

openButtons.forEach(b => {
    b.addEventListener("click", () => {
        toggleModal(); // Toggle the modal
        toggleOverlay(); // Toggle the overlay
        if (b.classList.contains("specific")) {
            const inputID = specificButtons[b.id]; // Get specific button ID
            const checkedOption = document.querySelector(inputID); // Select the corresponding input option
            checkedOption.checked = true; // Check the input option
            selectNew(checkedOption); // Select the new option
        };
    });
});

closeModal.addEventListener("click", () => {
    resetModal(); // Reset the modal
    toggleModal(); // Toggle the modal
    toggleOverlay(); // Toggle the overlay
});

// Option Selection

selects.forEach(select => {
    select.addEventListener("change", () => {
        clearSelect(); // Clear previous selection
        selectNew(select); // Select the new option
    });
});

// Form Validation

continueButtons.forEach(b => {
    b.addEventListener("click", event => {
        event.preventDefault(); // Prevent default form submission
        const input = document.querySelector(".selection.active .amount input"); // Select the input element for the pledge amount
        const inputID = input.id; // Get the ID of the input element
        pledge = Number(input.value); // Get and parse the pledge amount
        if (!pledge || pledge < inputConditions[inputID]) { // Check if the pledge is invalid
            input.parentElement.parentElement.classList.add("error"); // Add 'error' class to the parent element
        } else {
            input.parentElement.parentElement.classList.remove("error"); // Remove 'error' class from the parent element
            updateStock(); // Update stock based on pledge
            resetModal(); // Reset the modal
            overlay.classList.toggle("inactive"); // Toggle overlay visibility
            modal.classList.toggle("active"); // Toggle modal visibility
            setTimeout(() => {
                confirmation.classList.toggle("active"); // Show confirmation screen after 1 second
            }, 1000);
        };
    });
});

// Confirmation

finalizeButton.addEventListener("click", () => {
    overlay.classList.toggle("inactive"); // Toggle overlay visibility
    overlay.classList.toggle("active"); // Toggle overlay visibility
    confirmation.classList.toggle("active"); // Toggle confirmation screen visibility
    logo.classList.toggle("inactive"); // Toggle logo visibility
    openNav.classList.toggle("inactive"); // Toggle open navigation button visibility
    numberSection.classList.toggle("loading"); // Toggle loading state on number section
    const newTotal = Math.round(parseFloat(totalRaised.innerHTML.replace(",", "")) + pledge); // Calculate new total amount raised
    let totalString = newTotal.toString(); // Convert new total to string
    const newBackers = (parseFloat(totalBackers.innerHTML.replace(",", "")) + 1).toString(); // Calculate new total backers
    let backersString = newBackers.toString(); // Convert new backers to string
    for (let i = 3; i < totalString.length; i += 4) {
        totalString = totalString.slice(0, -i) + "," + totalString.slice(-i); // Add commas to total string for formatting
    }
    for (let i = 3; i < backersString.length; i += 3) {
        backersString = backersString.slice(0, -i) + "," + backersString.slice(-i); // Add commas to backers string for formatting
    }
    setTimeout(() => {
        numberSection.scrollIntoView({ behavior: "smooth" }); // Scroll number section into view smoothly
        progressBar.style.transition = "width 0s ease-out"; // Set initial progress bar transition to 0s
        progressBar.style.maxWidth = 0; // Set progress bar maximum width to 0
        progressBar.style.width = 0; // Set progress bar width to 0
        setTimeout(() => {
            totalRaised.innerHTML = totalString; // Update total raised amount display
            totalBackers.innerHTML = backersString; // Update total backers display
            numberSection.classList.toggle("loading"); // Remove loading state from number section
            progressBar.style.maxWidth = "100%"; // Set progress bar maximum width to 100%
            let newWidth = newTotal * 100 / 100000; // Calculate new progress bar width percentage
            if (newWidth < 100) {
                progressBar.style.transition = `width ${newWidth * 0.01 * 2}s ease-out`; // Set transition duration based on new width
                progressBar.style.width = newWidth + "%"; // Set progress bar width
            } else {
                progressBar.style.transition = "width 2s ease-out"; // Set transition duration to 2s if width is 100%
                progressBar.style.width = "100%"; // Set progress bar width to 100%
            };
        }, 500); // Delay execution by 500ms
    }, 500); // Delay execution by 500ms
});
