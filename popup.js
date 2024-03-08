// popup.js

// Handle button click event in the extension popup
document.getElementById('createTaskBtn').addEventListener('click', function () {
  // Send a message to the content script to open the modal
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { action: 'openModal' });
  });
});