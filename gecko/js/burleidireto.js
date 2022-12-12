/**
 * Works just like `console.log()` but with a prefix.
 * @param data - The data to be logged.
 */
function log(...data) {
  console.log("[BurleiDireto]", ...data);
}

/**
 * Gets switchOption from the local storage and,
 * if it's on, it adds a stylesheet to the page, otherwise,
 * it removes the stylesheet.
 */
async function changeBlur() {
  const switchOption = await getFromStorage("switchOption");

  if (switchOption) {
    const stylesheet = document.createElement("style");
    stylesheet.classList.add("burleiDireto");
    stylesheet.innerHTML = `
      pre {
        content: initial !important;
        backdrop-filter: none !important;
        user-select: text !important;
      }
      ::after {
        content: initial !important;
        backdrop-filter: none !important;
        user-select: text !important;
      }
    `;
    document.head.appendChild(stylesheet);
  } else {
    document.head.removeChild(
      document.getElementsByClassName("burleiDireto")[0]
    );
  }
}

async function getFromStorage(key) {
  try {
    let chromeStorage = await chrome.storage.local.get(key);
    log(`${key} from Chromium storage: ${chromeStorage[key] || false} `);
    return chromeStorage[key];
  } catch (error) {
    let localStorage = await browser.storage.local.get(key);
    log(`${key} from Gecko storage: ${localStorage[key] || false}`);
    return localStorage[key];
  }
}

function setToStorage(key, value) {
  try {
    chrome.storage.local.set({ [key]: value });
  } catch (error) {
    browser.storage.local.set({ [key]: value });
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const switchOption = await getFromStorage("switchOption");
  if (!!switchOption && switchOption !== undefined)
    document.getElementById("activate").checked = true;
  else document.getElementById("activate").checked = false;

  document.getElementById("activate").addEventListener("click", async () => {
    const switchOption = document.getElementById("activate").checked;

    if (typeof browser === "undefined") var browser = chrome;

    const tab = await browser.tabs.getCurrent();

    setToStorage("switchOption", switchOption);

    if (!tab) return;

    browser.scripting.executeScript({
      target: { tabId: tab.id },
      func: changeBlur,
    });
  });
});
