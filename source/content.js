import optionsStorage from './options-storage.js';

console.log('💈 Content script loaded for', chrome.runtime.getManifest().name);


// Function to get the selected text
function getSelectedText() {
  const selection = window.getSelection();
  if (selection && selection.toString().trim() !== '') {
    return selection.toString();
  }
  return null;
}

// Function to display selected text in an alert when the keyboard shortcut is pressed
function handleKeyPress(event) {
  if (
    (event.ctrlKey) && // Check for Control/Command key
    (event.altKey || event.metaKey) && // Check for Alt key
    event.key === 'a' // Check for 'A' key
  ) {
    const selectedText = getSelectedText();
    if (selectedText) {
      alert(`Selected Text:\n${selectedText}`);
    }
  }
}

async function init() {
	const options = await optionsStorage.getAll();
	const color = `rgb(${options.colorRed}, ${options.colorGreen},${options.colorBlue})`;
	const text = options.text;
	const notice = document.createElement('div');
	notice.innerHTML = text;
	document.body.prepend(notice);
	notice.id = 'text-notice';
	notice.style.border = '2px solid ' + color;
	notice.style.color = color;

  const prepend = document.createElement('div');
	prepend.innerHTML = "injected";
	document.body.prepend(prepend);

  // Listen for keydown events
  document.addEventListener('keydown', handleKeyPress);
}

init();
