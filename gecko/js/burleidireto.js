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
  const head = document.getElementsByTagName("HEAD")[0];
  const link = document.createElement("link");
  const switchOption = await getFromStorage("switchOption");

  if (switchOption) {
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "https://www.verissimo.dev/api/styles.css";
    link.className = "burleiDireto";
    head.appendChild(link);
  } else {
    const stylesheet = document.getElementsByClassName("burleiDireto")[0];
    if (stylesheet) stylesheet.remove();
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

    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
      url: "https://www.passeidireto.com/*",
    });
    setToStorage("switchOption", switchOption);

    if (!tab) return;

    browser.tabs.executeScript({
      target: { tabId: tab.id },
      func: changeBlur,
    });
  });
});
