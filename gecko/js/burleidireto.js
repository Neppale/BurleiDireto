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

async function getFromStorage(key, browser) {
  if (typeof browser === "undefined") var browser = chrome;
  const localStorage = await browser.storage.local.get(key);
  return localStorage[key] || false;
}

function setToStorage(key, value, browser) {
  if (typeof browser === "undefined") var browser = chrome;
  browser.storage.local.set({ [key]: value });
}

document.addEventListener("DOMContentLoaded", async function () {
  const switchOption = await getFromStorage("switchOption", browser);
  const activateToggle = document.getElementById("activate");
  if (activateToggle) activateToggle.checked = switchOption;
  else return;

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

    browser.scripting.executeScript({
      target: { tabId: tab.id },
      func: changeBlur,
    });
  });
});
