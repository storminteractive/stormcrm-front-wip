/* 
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = "menu-default";

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = "en";
export const localeOptions = [
  { id: "en", name: "English - LTR", direction: "ltr" },
  { id: "es", name: "Español", direction: "ltr" },
  { id: "enrtl", name: "English - RTL", direction: "rtl" }
];

export const firebaseConfig = {
  apiKey: "###",
  authDomain: "###",
  databaseURL: "###",
  projectId: "###",
  storageBucket: "###",
  messagingSenderId: "###"
};

export const searchPath = "/app/pages/search";
export const servicePath = "https://api.stormint.com";

/* 
Color Options:
"light.purple", "light.blue", "light.green", "light.orange", "light.red", "dark.purple", "dark.blue", "dark.green", "dark.orange", "dark.red"
*/
export const themeColorStorageKey="__theme_color"
export const isMultiColorActive = true;
export const defaultColor = "light.green";
export const isDarkSwitchActive = false;
export const defaultDirection = "ltr";
export const themeRadiusStorageKey = "__theme_radius";
export const isDemo = true;
