// ***********************************************************
// This example support/commands.ts file is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Custom command to get element by data-testid
Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`)
})

// Custom command to login (if authentication is implemented)
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login')
  cy.get('[data-testid="email-input"]').type(email)
  cy.get('[data-testid="password-input"]').type(password)
  cy.get('[data-testid="login-button"]').click()
})

// Custom command to wait for API responses
Cypress.Commands.add('waitForAPI', () => {
  cy.intercept('GET', '**/users**').as('getUsers')
  cy.wait('@getUsers')
})

// Custom command to seed test data
Cypress.Commands.add('seedEmployees', () => {
  // Mock employee data for testing
  cy.intercept('GET', '**/users**', { fixture: 'employees.json' }).as('getEmployees')
})

// Custom command to clear all data
Cypress.Commands.add('clearData', () => {
  cy.window().then((win) => {
    win.localStorage.clear()
    win.sessionStorage.clear()
  })
})

// Example: Add data-testid to elements during testing
Cypress.Commands.add('addTestIds', () => {
  cy.get('button').each(($btn, index) => {
    cy.wrap($btn).invoke('attr', 'data-testid', `button-${index}`)
  })
})
