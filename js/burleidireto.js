log("Active!"); // [DEBUG] Debug message
removeBlur();

document.addEventListener("DOMContentLoaded", function () {
  // After popup loads, get the option selected by the user to put on the popup toggle.
  chrome.storage.local.get(["switchOption"], function (data) {
    // Get switchOption on Chrome storage
    log(
      "Switch settings retrieved: " + data.switchOption
    ); // [DEBUG] Debug message
    data.switchOption
      ? (document.getElementById("activate").checked = true)
      : (document.getElementById("activate").checked = false); // Change toggle to switchOption
  });

  // After clicking the toggle, save the option selected by the user and execute removeBlur.
  document.getElementById("activate").addEventListener("click", async () => {
    const switchOption = document.getElementById("activate").checked; // Get switchOption on popup
    let [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
      url: "https://www.passeidireto.com/*",
    }); // Get the tab the corresponds to these attributes

    chrome.storage.local.set({ switchOption: switchOption }, function () {
      log("Switch settings saved: " + switchOption); // [DEBUG] Debug message
    });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: removeBlur,
    });
  });
});

/**
 * Works just like `console.log()` but with a prefix.
 * @param data - The data to be logged.
 */
 function log(...data) {
  console.log("[BurleiDireto]", ...data);
}

/**
 * It gets the switchOption from the Chrome storage and,
 * if it's on, it adds a stylesheet to the page, otherwise,
 * it removes the stylesheet.
 */
function removeBlur() {
  const head = document.getElementsByTagName("HEAD")[0];
  const link = document.createElement("link");
  log("Function ran."); // [DEBUG] Debug message
  chrome.storage.local.get(["switchOption"], function (data) {
    // Get switchOption on Chrome storage
    if (data.switchOption) {
      // Add the stylesheet
      log("Switch on."); // [DEBUG] Debug message
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = "https://www.verissimo.dev/api/styles.css";
      link.className = "burleiDireto";
      head.appendChild(link);
    } else {
      // Remove the stylesheet
      log("Switch off."); // [DEBUG] Debug message
      const stylesheet = document.getElementsByClassName("burleiDireto")[0];
      if (stylesheet) {
        stylesheet.remove();
      }
    }
  });
}
