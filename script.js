// DOM Element References
const quoteTextEl = document.getElementById('quote-text');
const quoteAuthorEl = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');
const copyQuoteBtn = document.getElementById('copy-quote-btn');
const copyBtnText = document.getElementById('copy-btn-text');
const loader = document.getElementById('loader');
const quoteContainer = document.getElementById('quote-text-container');

// Local array of quotes
const localQuotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
    { text: "The mind is everything. What you think you become.", author: "Buddha" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "Your time is limited, don’t waste it living someone else’s life.", author: "Steve Jobs" },
    { text: "You can’t use up creativity. The more you use, the more you have.", author: "Maya Angelou" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "It’s not whether you get knocked down, it’s whether you get up.", author: "Vince Lombardi" },
    { text: "If you are working on something that you really care about, you don’t have to be pushed. The vision pulls you.", author: "Steve Jobs" }
];

let currentQuote = {};

// --- Functions ---

// Show loading state and hide quote
function showLoading() {
    loader.style.display = 'block';
    quoteContainer.classList.add('hidden');
    quoteAuthorEl.textContent = '';
}

// Hide loading state and show quote
function hideLoading() {
    loader.style.display = 'none';
    quoteContainer.classList.remove('hidden');
}

// Generate a random pastel color
function getRandomColor() {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 30) + 70; // Saturation between 70-100%
    const l = Math.floor(Math.random() * 20) + 75; // Lightness between 75-95%
    return `hsl(${h}, ${s}%, ${l}%)`;
}

// Display a new quote from the local array
function displayNewQuote() {
    showLoading();
    // Pick a random quote from the local array
    currentQuote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    
    // Use a short timeout to give the impression of loading, improving UX
    setTimeout(() => {
        // Update the DOM with the new quote
        quoteTextEl.textContent = currentQuote.text;
        quoteAuthorEl.textContent = currentQuote.author || 'Unknown';
        document.body.style.backgroundColor = getRandomColor();
        hideLoading();
    }, 250); // 250ms delay
}

// Copy the current quote to the clipboard
function copyQuote() {
    if (!currentQuote.text) return;

    const quoteToCopy = `"${currentQuote.text}" - ${currentQuote.author || 'Unknown'}`;

    // Create a temporary textarea element to hold the text
    const textArea = document.createElement("textarea");
    textArea.value = quoteToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        // Use the older execCommand for wider browser compatibility
        document.execCommand('copy');
        // Provide user feedback
        copyBtnText.textContent = 'Copied!';
        setTimeout(() => {
            copyBtnText.textContent = 'Copy Quote';
        }, 2000); // Revert back after 2 seconds
    } catch (err) {
        console.error('Failed to copy text: ', err);
        copyBtnText.textContent = 'Copy Failed';
         setTimeout(() => {
            copyBtnText.textContent = 'Copy Quote';
        }, 2000);
    }

    document.body.removeChild(textArea);
}

// --- Event Listeners ---
newQuoteBtn.addEventListener('click', displayNewQuote);
copyQuoteBtn.addEventListener('click', copyQuote);

// --- Initial Load ---
// Display a quote on page load
displayNewQuote();