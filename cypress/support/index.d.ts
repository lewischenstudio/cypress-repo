declare global {
  namespace Cypress {
    interface Chainable {
      // Command to open base URL
      openBaseURL(): Chainable<void>;
      loginToApplication(): Chainable<void>;
      loginToObtainToken(): Chainable<void>;
      uiLogin(): Chainable<void>;
      mount: typeof mount;
    }
  }
}

// Ensure this file is treated as a module
export {};
