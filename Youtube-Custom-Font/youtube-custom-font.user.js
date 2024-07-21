// ==UserScript==
// @name         Youtube Custom Font
// @version      0.2
// @author       Amm1rr
// @description  Applies a custom font, Vazirmatn, to all text elements on the current web page (YouTube).
// @homepage     https://github.com/Amm1rr/
// @namespace    amm1rr.youtube.custom.font
// @match        https://*.youtube.*/*
// @icon         https://cdn.jsdelivr.net/gh/Amm1rr/Userscripts@main/Youtube-Custom-Font/Icon.png
// @grant        none
// @license      MIT
// @updateURL    https://github.com/Amm1rr/Userscripts/raw/main/Youtube-Custom-Font/youtube-custom-font.user.js
// @downloadURL  https://github.com/Amm1rr/Userscripts/raw/main/Youtube-Custom-Font/youtube-custom-font.user.js
// ==/UserScript==

// Description:
// This script injects a small "bubble button" on the top left corner of the YouTube page.
// Clicking the button applies a custom font, Vazirmatn, to all text elements on the webpage.
// You can customize the font family and element selector to your preference.


(function () {
  const config = {
    fontFamily: "Vazirmatn",
    selector: "*",
    buttonID: "yt-custom-font",
    buttonText: "A",
    notificationDuration: 2000,
    buttonFadeDuration: 2000,
    notificationMessage: "Fonts updated: Vazirmatn font applied.",
    buttonTooltip: "Enhance readability with Vazirmatn font",
  };

  if (document.getElementById(config.buttonID)) {
    console.log(
      "Custom Font: " + config.buttonID + " button already exists.\n bye bye()"
    );
    return;
  }

  let isActive = false;
  let originalFonts = new Map();

  function storeOriginalFonts(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      if (!originalFonts.has(el)) {
        originalFonts.set(el, window.getComputedStyle(el).fontFamily);
      }
    });
  }

  function applyCustomFont(selector, fontFamily) {
    storeOriginalFonts(selector);
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      el.style.fontFamily = `${fontFamily}, ${originalFonts.get(el)}`;
    });
  }

  function removeCustomFont() {
    originalFonts.forEach((originalFont, el) => {
      el.style.fontFamily = originalFont;
    });
  }

  function showNotification(message, duration) {
    const notification = document.createElement("div");
    Object.assign(notification.style, {
      position: "fixed",
      bottom: "80%",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "10px 20px",
      backgroundColor: "rgba(0, 123, 255, 0.8)",
      color: "yellow",
      borderRadius: "5px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      zIndex: "10000",
      opacity: "0",
      transition: "opacity 0.5s ease",
      textAlign: "center",
    });
    notification.textContent = message;
    document.body.appendChild(notification);

    requestAnimationFrame(() => {
      notification.style.opacity = "1";
    });

    setTimeout(() => {
      notification.style.opacity = "0";
      notification.addEventListener(
        "transitionend",
        () => notification.remove(),
        { once: true }
      );
    }, duration);
  }

  function addFontChangeButton() {
    const button = document.createElement("button");
    button.id = config.buttonID;
    button.textContent = config.buttonText;
    button.title = config.buttonTooltip;

    const buttonStyle = {
      position: "fixed",
      top: "10px",
      left: "3px",
      zIndex: "9999",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      backgroundColor: "rgba(123, 110, 242, 0.3)",
      color: "#FFFFFF",
      border: "none",
      fontWeight: "bold",
      fontFamily: "Arial",
      cursor: "pointer",
      boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
      transition: "background-color 0.3s ease, opacity 0.3s ease",
    };
    Object.assign(button.style, buttonStyle);

    function setButtonHoverState(isHover) {
      if (!button.disabled) {
        button.style.backgroundColor = isHover
          ? "rgba(123, 110, 242, 0.8)"
          : "rgba(123, 110, 242, 0.3)";
      }
    }

    button.addEventListener("mouseenter", () => setButtonHoverState(true));
    button.addEventListener("mousemove", () => setButtonHoverState(true));
    button.addEventListener("mouseover", () => setButtonHoverState(true));
    button.addEventListener("mouseleave", () => setButtonHoverState(false));

    const menu = document.createElement("div");
    menu.style.cssText = `
      position: absolute;
      top: 100%;
      left: 0;
      background-color: rgba(128, 128, 128, 0.8);
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 5px 0;
      display: none;
      z-index: 10000;
    `;

    const activeItem = createMenuItem("Active", () => {
      if (!isActive) {
        isActive = true;
        applyCustomFont(config.selector, config.fontFamily);
        showNotification("Custom font activated", config.notificationDuration);
      }
    });

    const inactiveItem = createMenuItem("Inactive", () => {
      if (isActive) {
        isActive = false;
        removeCustomFont();
        showNotification("Custom font deactivated", config.notificationDuration);
      }
    });

    menu.appendChild(activeItem);
    menu.appendChild(inactiveItem);

    button.appendChild(menu);

    button.addEventListener("mouseenter", () => {
      menu.style.display = "block";
    });
    button.addEventListener("mouseleave", () => {
      menu.style.display = "none";
    });

    document.body.appendChild(button);

    function handleFullscreenChange() {
      const isFullscreen = !!document.fullscreenElement;
      button.style.opacity = isFullscreen ? "0" : "1";
      button.style.pointerEvents = isFullscreen ? "none" : "auto";
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
  }

  function createMenuItem(text, onClick) {
    const item = document.createElement("div");
    item.textContent = text;
    item.style.cssText = `
      padding: 5px 10px;
      cursor: pointer;
      color: white;
    `;
    item.addEventListener("click", onClick);
    item.addEventListener("mouseenter", () => {
      item.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    });
    item.addEventListener("mouseleave", () => {
      item.style.backgroundColor = "transparent";
    });
    return item;
  }

  addFontChangeButton();
})();
