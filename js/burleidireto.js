console.log("[BurleiDireto] Active!");
removeBlur();

document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get(['switchOption'], function(data) { // Pegar switchOption
    console.log('[BurleiDireto] Settings retrieved: ' + data.switchOption); // Debug message
    data.switchOption ? document.getElementById("activate").checked = true : document.getElementById("activate").checked = false // Mudar switch para o switchOption
  });

  document.getElementById("activate").addEventListener("click", async () => {
    var switchOption = document.getElementById("activate").checked;
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true, url: "https://www.passeidireto.com/*" });

    chrome.storage.local.set({'switchOption': switchOption}, function() {
      console.log('[BurleiDireto] Settings saved: ' + switchOption); // Debug message
    });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: removeBlur,
    });
  });
});

// removeBlur

function removeBlur() {
  console.log('[BurleiDireto] Function ran.'); // Debug message
  chrome.storage.local.get(['switchOption'], function(data) {
    if (data.switchOption) {
        console.log("[BurleiDireto] Switch on.");
        const head = document.getElementsByTagName('HEAD')[0];
        const link = document.createElement('link');
        link.rel = 'stylesheet'; 
        link.type = 'text/css';
        link.href = 'https://www.verissimo.dev/api/styles.css'; 
        head.appendChild(link);
  
    } else {
      // Should remove injected css. SOON!
    }
  });



}

    
