/** Runs before first paint so the chosen theme never flashes. Plain module (no
 *  'use client') so the server root layout can inline the actual string. */
export const THEME_BOOT = `(function(){try{var t=localStorage.getItem('oss-theme');document.documentElement.dataset.ossTheme=(t==='dark'?'dark':'light');}catch(e){document.documentElement.dataset.ossTheme='light';}})();`;
