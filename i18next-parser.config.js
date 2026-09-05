module.exports = {
  input: ["app/**/*.{js,jsx,ts,tsx}", "components/**/*.{js,jsx,ts,tsx}"],
  output: "assets/translations/$LOCALE.json",
  locales: ["en", "de"],
  defaultNamespace: "translation",
  defaultValue: "MISSING_TRANSLATION",
  indentation: 2,
};
