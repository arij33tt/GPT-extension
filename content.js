// content.js

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'addPrompt') {
    // Add the selected text to the prompt list
    const prompt = request.prompt;
    chrome.storage.sync.get(['prompts'], function(result) {
      const prompts = result.prompts || [];
      prompts.push(prompt);
      chrome.storage.sync.set({ prompts });
    });
  }
}); 
  
  // Listen for clicks on the overlay
  document.addEventListener('DOMContentLoaded', function() {
    // Listen for clicks on the overlay
    document.addEventListener('click', function(event) {
      if (event.target.classList.contains('promptpal-prompt')) {
        // Insert the prompt text into the ChatGPT dialog box
        const promptText = event.target.dataset.promptText;
        const dialogBox = document.querySelector('div[data-testid="chat-text-input"]');
        dialogBox.innerHTML = promptText;
        dialogBox.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
  });
  
  