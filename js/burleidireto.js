/**
 * Gets switchOption from the local storage and,
 * if it's on, it adds a stylesheet to the page, otherwise,
 * it removes the stylesheet.
 */
async function changeBlur() {
  const switchOption = await getFromStorage("switchOption");
  const hiddenText = document.getElementById("text-inner-content");
  const originalStyle = `
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  position: absolute;
  width: 100%;
  top: 35%;
  bottom: 165px;
  left: 0px;
  `;

  if (switchOption) hiddenText.style = "";
  else hiddenText.style = originalStyle;
}

var browser = chrome || browser;
/**
 * Gets the value of a key from the local storage.
 * @param {string} key
 * @returns The value of the key or false if it doesn't exist.
 */
async function getFromStorage(key) {
  const localStorage = await browser.storage.local.get(key);
  return localStorage[key] || false;
}

/**
 * Sets a key-value pair to the local storage.
 * @param {string} key
 * @param {any} value
 */
function setToStorage(key, value) {
  browser.storage.local.set({ [key]: value });
}

document.addEventListener("DOMContentLoaded", async function () {
  const switchOption = await getFromStorage("switchOption");
  const activateToggle = document.getElementById("activate");
  if (activateToggle) activateToggle.checked = switchOption;
  else return;

  document.getElementById("activate").addEventListener("click", async () => {
    const switchOption = document.getElementById("activate").checked;
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
