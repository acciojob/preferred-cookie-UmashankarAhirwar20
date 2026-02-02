let form = document.querySelector("form");
let fontsize = document.getElementById("fontsize");
let fontcolor = document.getElementById("fontcolor");

function setCookie(name, value, days = 365) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return value;
    }
  }
  return null;
}

/* APPLY SAVED SETTINGS ON LOAD */
const savedFontSize = getCookie("fontsize");
const savedFontColor = getCookie("fontcolor");

if (savedFontSize) {
  document.documentElement.style.setProperty("--fontsize", savedFontSize + "px");
  document.body.style.fontSize = savedFontSize + "px";   // ✅ REQUIRED
  fontsize.value = savedFontSize;
}

if (savedFontColor) {
  document.documentElement.style.setProperty("--fontcolor", savedFontColor);
  document.body.style.color = savedFontColor;            // ✅ REQUIRED
  fontcolor.value = savedFontColor;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fontSize = fontsize.value;
  const fontColor = fontcolor.value;

  setCookie("fontsize", fontSize);
  setCookie("fontcolor", fontColor);

  document.documentElement.style.setProperty("--fontsize", fontSize + "px");
  document.documentElement.style.setProperty("--fontcolor", fontColor);

  // ✅ Make Cypress happy
  document.body.style.fontSize = fontSize + "px";
  document.body.style.color = fontColor;
});
