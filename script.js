const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const TwitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

removeSpinner = () => {
  quoteContainer.hidden = false;
  loader.hidden = true;
};

newQuote = () => {
  showLoadingSpinner();

  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (!quote.author) {
    authorText.textContent = 'Jon Doe';
  } else {
    authorText.textContent = quote.author;
  }
  if (quote.text.length > 50) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  quoteText.textContent = quote.text;
  removeSpinner();
};

const getQuotes = async () => {
  removeSpinner();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {}
};

tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
};

newQuoteBtn.addEventListener('click', newQuote);
TwitterBtn.addEventListener('click', tweetQuote);

getQuotes();
