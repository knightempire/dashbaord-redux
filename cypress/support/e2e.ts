// E2E testing setup for Cypress

import './commands'

// Type definitions for custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>
      waitForAPI(): Chainable<void>
    }
  }
}
