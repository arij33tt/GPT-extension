// popup.js

chrome.storage.sync.get(['prompts'], function(result) {
  const prompts = result.prompts || [];
  // Populate the prompt list in the popup
  const promptList = document.querySelector('#prompt-list');
  prompts.forEach((prompt) => {
    const listItem = document.createElement('li');
    listItem.classList.add('promptpal-prompt');
    listItem.dataset.promptText = prompt;
    listItem.textContent = prompt;
    promptList.appendChild(listItem);
  });
});

// Listen for clicks on the "Add Prompt" button
const addPromptButton = document.querySelector('#add-prompt-button');
addPromptButton.addEventListener('click', function() {
  // Send a message to the background script to add the selected text to the prompt list
  chrome.tabs.executeScript({
    code: "window.getSelection().toString();"
  }, function(selection) {
    const prompt = selection[0];
    chrome.runtime.sendMessage({ message: 'addPrompt', prompt: prompt });
    // Add the prompt to the list in the popup
    const listItem = document.createElement('li');
    listItem.classList.add('promptpal-prompt');
    listItem.dataset.promptText = prompt;
    listItem.textContent = prompt;
    promptList.appendChild(listItem);
    // Store the prompts in chrome.storage.sync
    chrome.storage.sync.get(['prompts'], function(result) {
      const prompts = result.prompts || [];
      prompts.push(prompt);
      chrome.storage.sync.set({ prompts });
    });
  });
});
