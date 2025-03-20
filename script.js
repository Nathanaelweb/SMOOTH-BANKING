// Check if user data exists in localStorage
if (!localStorage.getItem("balance")) {
    localStorage.setItem("balance", "1000"); // Set initial balance to $1000
}

if (!localStorage.getItem("transactionHistory")) {
    localStorage.setItem("transactionHistory", JSON.stringify([])); // Set initial transaction history
}

let balance = parseFloat(localStorage.getItem("balance"));
const balanceDisplay = document.getElementById("balance");
const transactionHistory = document.getElementById("transaction-history");

// Update the balance displayed
function updateBalance() {
    balanceDisplay.textContent = balance.toFixed(2);
    localStorage.setItem("balance", balance.toFixed(2)); // Store updated balance
}

// Log a transaction to the history
function logTransaction(message) {
    const transactionHistoryList = JSON.parse(localStorage.getItem("transactionHistory"));
    transactionHistoryList.unshift(message); // Add new transaction to the beginning
    localStorage.setItem("transactionHistory", JSON.stringify(transactionHistoryList));

    displayTransactions();
}

// Display transaction history
function displayTransactions() {
    const transactionHistoryList = JSON.parse(localStorage.getItem("transactionHistory"));
    transactionHistory.innerHTML = ""; // Clear current transactions

    transactionHistoryList.forEach(transaction => {
        const li = document.createElement("li");
        li.textContent = transaction;
        transactionHistory.appendChild(li);
    });
}

// Show sections based on user clicks
function showSection(section) {
    const sections = document.querySelectorAll(".section");
    sections.forEach(sec => {
        sec.style.display = "none";
    });
    document.getElementById(section).style.display = "block";
}

// Handle money transfer
function transfer() {
    const bankName = document.getElementById("bank-name").value;
    const accountNumber = document.getElementById("account-number").value;
    const transferAmount = parseFloat(document.getElementById("transfer-amount").value);

    if (transferAmount > balance) {
        alert("Insufficient funds for this transfer!");
        return;
    }

    balance -= transferAmount;
    updateBalance();
    logTransaction(`Transferred $${transferAmount.toFixed(2)} to ${bankName} - Account: ${accountNumber}`);

    // Display Payment Receipt Modal
    document.getElementById("receipt-bank").textContent = bankName;
    document.getElementById("receipt-account").textContent = accountNumber;
    document.getElementById("receipt-amount").textContent = transferAmount.toFixed(2);
    document.getElementById("receipt-modal").style.display = "block";
}

// Increase balance by user input
function increaseBalance() {
    const increaseAmount = parseFloat(document.getElementById("increase-amount").value);

    if (increaseAmount <= 0 || isNaN(increaseAmount)) {
        alert("Please enter a valid amount to increase.");
        return;
    }

    balance += increaseAmount;
    updateBalance();
    logTransaction(`Increased balance by $${increaseAmount.toFixed(2)}`);

    // Clear the input field
    document.getElementById("increase-amount").value = "";
}

// Withdraw money
function withdraw() {
    const withdrawAmount = parseFloat(document.getElementById("withdraw-amount").value);

    // Check if the withdrawal amount is valid and less than or equal to the balance
    if (withdrawAmount <= 0 || isNaN(withdrawAmount)) {
        alert("Please enter a valid withdrawal amount.");
        return;
    }

    if (withdrawAmount > balance) {
        alert("Insufficient funds for this withdrawal!");
        return;
    }

    balance -= withdrawAmount;
    updateBalance();
    logTransaction(`Withdrew $${withdrawAmount.toFixed(2)}`);

    // Display Withdrawal Receipt Modal
    document.getElementById("receipt-amount").textContent = withdrawAmount.toFixed(2);
    document.getElementById("withdrawal-receipt-modal").style.display = "block";

    // Clear the input field
    document.getElementById("withdraw-amount").value = "";
}

// Close the receipt modal
function closeReceipt() {
    document.getElementById("withdrawal-receipt-modal").style.display = "none";
}
// Function to clear the balance
function clearBalance() {
    const confirmation = confirm("Are you sure you want to clear your balance? This action cannot be undone.");
    if (confirmation) {
        balance = 0; // Reset balance to 0
        updateBalance(); // Update the UI
        logTransaction("Balance cleared to $0");
    }
}
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('collapsed');
}

function showSection(section) {
    // Hide all sections first
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none');

    // Display the selected section
    const selectedSection = document.getElementById(section);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}

// Optional: Add a click event to toggle the sidebar when the user clicks outside the sidebar
document.addEventListener('click', (event) => {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar.contains(event.target) && sidebar.classList.contains('collapsed')) {
        sidebar.classList.remove('collapsed');
    }
});
// Function to handle section display and sidebar collapse
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none');
    
    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    selectedSection.style.display = 'block';
    
    // Collapse the sidebar after selecting a link
    toggleSidebar();
}

// Function to show a specific section and hide the sidebar links
function showSection(sectionId) {
    // Hide all sections
    let sections = document.querySelectorAll('.section');
    sections.forEach(function(section) {
        section.style.display = 'none';
    });

    // Show the selected section
    let activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';
    }

    // Hide the navigation links
    let navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.style.display = 'none';
    }
}
// Function to go back to the Home section and show the sidebar links again
function goToHome() {
    // Hide all sections
    let sections = document.querySelectorAll('.section');
    sections.forEach(function(section) {
        section.style.display = 'none';
    });

    // Show the home section
    let homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.style.display = 'block';
    }

    // Show the navigation links
    let navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.style.display = 'block';
    }
}
// Function to close the payment receipt modal
function closeReceipt() {
    const modal = document.getElementById('receipt-modal');
    modal.style.display = 'none';  // Hide the modal
}
