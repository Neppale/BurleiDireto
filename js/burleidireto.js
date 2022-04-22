console.log("[BurleiDireto] I'm activated.");

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("activate").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true, url: "https://www.passeidireto.com/*" });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: removeBlur,
    });
  });
})



function removeBlur() {
    try {
      console.log("[BurleiDireto] Button on.");
      const head = document.getElementsByTagName('HEAD')[0];
      const link = document.createElement('link');
      link.rel = 'stylesheet'; 
      link.type = 'text/css';
      link.href = 'https://www.verissimo.dev/api/styles.css'; 
      head.appendChild(link);
      return true; 
  
    } catch (error) {
      console.log("[BurleiDireto] Button on, but something wrong happened.");
      return false;
    }

}

    
