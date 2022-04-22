console.log("[BurleiDireto] Active!"); // [DEBUG] Debug message
removeBlur();

document.addEventListener("DOMContentLoaded", function () {
  // After popup loads, get the option selected by the user to put on the popup toggle.
  chrome.storage.local.get(["switchOption"], function (data) {
    // Get switchOption on Chrome storage
    console.log(
      "[BurleiDireto] Switch settings retrieved: " + data.switchOption
    ); // [DEBUG] Debug message
    data.switchOption
      ? (document.getElementById("activate").checked = true)
      : (document.getElementById("activate").checked = false); // Change toggle to switchOption
  });

  // After clicking the toggle, save the option selected by the user and execute removeBlur.
  document.getElementById("activate").addEventListener("click", async () => {
    var switchOption = document.getElementById("activate").checked; // Get switchOption on popup
    let [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
      url: "https://www.passeidireto.com/*",
    }); // Get the tab the corresponds to these attributes
    console.log([tab]);

    chrome.storage.local.set({ switchOption: switchOption }, function () {
      console.log("[BurleiDireto] Switch settings saved: " + switchOption); // [DEBUG] Debug message
    });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: removeBlur,
    });
  });
});

function removeBlur() {
  const head = document.getElementsByTagName("HEAD")[0];
  var link = document.createElement("link");
  console.log("[BurleiDireto] Function ran."); // [DEBUG] Debug message
  chrome.storage.local.get(["switchOption"], function (data) {
    // Get switchOption on Chrome storage
    if (data.switchOption) {
      console.log("[BurleiDireto] Switch on."); // [DEBUG] Debug message
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = "https://www.verissimo.dev/api/styles.css";
      link.className = "burleiDireto";
      head.appendChild(link);
    }
  });
}
