const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "**/api/**/*.cy.js",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
