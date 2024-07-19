// ==UserScript==
// @name         Show Passwords Mini
// @version      0.1.1
// @description  Reveals the password when hovering the mouse pointer over a password field.
// @author       Amm1rr
// @url          https://github.com/Amm1rr/Userscripts/tree/main/Show%20Passwords/Show%20Passwords%20Mini
// @icon         https://cdn.jsdelivr.net/gh/Amm1rr/Userscripts@main/Show%20Passwords/Show%20Passwords%20Mini/Show%20Passwords%20Mini.icon.png
// @match        *://*/*
// @license      MIT
// @namespace    amm1rr.show.passwords.mini
// @updateURL    https://github.com/Amm1rr/Userscripts/raw/main/Show%20Passwords/Show%20Passwords%20Mini/Show%20Passwords%20Mini.user.js
// ==/UserScript==

(function() {
  'use strict';

  setTimeout(function() {
    document.querySelectorAll("input[type='password']").forEach(function(passField) {
      passField.addEventListener("mouseover", function() {
        this.type = "text";
      });
      passField.addEventListener("mouseout", function() {
        this.type = "password";
      });
    });
  }, 1000);
})();
