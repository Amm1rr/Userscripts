// ==UserScript==
// @name         Show Passwords
// @version      0.1.1
// @description  Click and hover over the password field to reveal the password.
// @description:fa  "برای نمایش پسورد، موس را روی فیلدهای پسورد نگه دارید."
// @author       Amm1rr (soheyl637@gmail.com)
// @icon         https://cdn.jsdelivr.net/gh/Amm1rr/Userscripts@main/Show%20Passwords/Show%20Passwords/Show%20Passwords.icon.png
// @homepage     https://github.com/Amm1rr/Userscripts/tree/main/Show%20Passwords/Show%20Passwords
// @updateURL    https://github.com/Amm1rr/Userscripts/raw/main/Show%20Passwords/Show%20Passwords/Show%20Passwords.user.js
// @downloadURL  https://github.com/Amm1rr/Userscripts/raw/main/Show%20Passwords/Show%20Passwords/Show%20Passwords.user.js
// @match        *://*/*
// @require      https://greasyfork.org/scripts/408776-dms-userscripts-toolkit/code/DMS-UserScripts-Toolkit.js?version=840920
// @inject-into  content
// @grant        GM_info
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @run-at       document-end
// @license      MIT
// @namespace 	 amm1rr.Userscripts.show.passwords
// @noframes
// ==/UserScript==

const regMenuBar = () => {

	const DMSTookit = new DMS_UserScripts.Toolkit({
		GM_info,
		GM_addStyle,
		GM_getValue,
		GM_setValue,
		GM_deleteValue,
		GM_registerMenuCommand,
		GM_unregisterMenuCommand,
		GM_openInTab,
	})

	const configName = 'showPass_config'
	const configMap = DMSTookit.proxyDataAuto(configName, {
		enable: true
	})

	DMSTookit.menuToggle(configMap, 'Enable', '1. 🍏Deactive', '1. 🍎Active')
	DMSTookit.menuLink("2. 🕸️ About...", "https://github.com/amm1rr/Magic-Userscripts/")

	return configMap;
}

const regCilckEvent = () => {
	document.addEventListener("click", function(event) {
		var obj = event.srcElement;
		if (obj.nodeName === 'INPUT') {
			if (obj.type === 'password') {
				obj.type = 'text';
				obj.bk_type = 'password';

				obj.addEventListener('blur', function() {
					obj.type = 'password';
				});

				obj.addEventListener('mouseout', function() {
					obj.type = 'password';
				});

				obj.addEventListener('mouseover', function() {
					obj.type = 'text';
				});

				return;
			}

			if (obj.bk_type === 'password') {
				obj.type = 'password';
				obj.removeEventListener('blur');
				obj.removeEventListener('mouseout');
				obj.removeEventListener('mouseover');
			}
		}
	});
	/* 	document.addEventListener("click", function(event) {
		var obj = event.srcElement;
		if (obj.nodeName === 'INPUT') {
			if (obj.type === 'password') {
				obj.type = 'text';
				obj.bk_type = 'password';
				obj.addEventListener('blur', function() {
					obj.type = 'password';
				});
				return;
			}
			if (obj.bk_type === 'password') {
				obj.type = 'password';
				obj.removeEventListener('blur');
			}
		}
	}); */
}

(function() {
	'use strict';

	const config = regMenuBar();
	config.enable && regCilckEvent();

})();
