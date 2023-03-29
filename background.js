// Load the prompts from manifest.json
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get(['prompts'], (result) => {
      if (!result.prompts) {
        chrome.storage.sync.set({ prompts: [] });
      }
    });
  });
  
  // Update the usage count of a prompt in manifest.json
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateUsage') {
      chrome.storage.sync.get(['prompts'], (result) => {
        const prompts = result.prompts;
        const index = prompts.findIndex(p => p.prompt === request.prompt);
        if (index >= 0) {
          prompts[index].usage++;
          chrome.storage.sync.set({ prompts });
        }
      });
    }
  });
  