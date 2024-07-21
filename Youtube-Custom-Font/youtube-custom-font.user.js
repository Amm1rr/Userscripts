// ==UserScript==
// @name         Youtube Custom Font
// @version      0.3
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
// This userscript enhances web browsing by allowing users to apply a custom font (Vazirmatn) to all websites.
// It adds a small, unobtrusive button to the top-left corner of web pages.
//
// Features:
// 1. Applies custom font (Vazirmatn) to all text on the webpage
// 2. Provides a toggle button for easy activation/deactivation
// 3. Shows a dropdown menu on hover with "Active" and "Inactive" options
// 4. Displays notifications when font changes are applied or removed
// 5. Hides the button during fullscreen mode
//
// Usage:
// - Hover over the "A" button in the top-left corner to see options
// - Click "Active" to apply the Vazirmatn font
// - Click "Inactive" to revert to the original font
//

(function () {
  const config = {
    fontFamily: "Vazirmatn",
    buttonID: "yt-custom-font",
    buttonText: "A",
    notificationDuration: 2000,
    buttonFadeDuration: 2000,
    notificationMessage: "Fonts updated: Vazirmatn font applied.",
    buttonTooltip: "Enhance readability with Vazirmatn font",
  };

  if (document.getElementById(config.buttonID)) {
    console.log("Custom Font: " + config.buttonID + " button already exists.\n bye bye()");
    return;
  }

  let isActive = false;
  let customStyle = null;

  function createCustomStyle() {
    customStyle = document.createElement('style');
    customStyle.textContent = `
      * {
        font-family: ${config.fontFamily}, var(--ytcustom-original-font) !important;
      }
    `;
    document.head.appendChild(customStyle);
  }

  function applyCustomFont() {
    if (!customStyle) createCustomStyle();
    document.documentElement.style.setProperty('--ytcustom-original-font', getComputedStyle(document.body).fontFamily);
    customStyle.disabled = false;
    isActive = true;
  }

  function removeCustomFont() {
    if (customStyle) {
      customStyle.disabled = true;
    }
    isActive = false;
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
      notification.addEventListener("transitionend", () => notification.remove(), { once: true });
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
        applyCustomFont();
        showNotification("Custom font activated", config.notificationDuration);
      }
    });

    const inactiveItem = createMenuItem("Inactive", () => {
      if (isActive) {
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
