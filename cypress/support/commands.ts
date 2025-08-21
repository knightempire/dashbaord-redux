

Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`)
})

// Login command for authentication
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login')
  cy.get('[data-testid="email-input"]').type(email)
  cy.get('[data-testid="password-input"]').type(password)
  cy.get('[data-testid="login-button"]').click()
})

Cypress.Commands.add('waitForAPI', () => {
  cy.intercept('GET', '**/users**').as('getUsers')
  cy.wait('@getUsers')
})

// Seed test data
Cypress.Commands.add('seedEmployees', () => {
  cy.intercept('GET', '**/users**', { fixture: 'employees.json' }).as('getEmployees')
})

// Clear all data
Cypress.Commands.add('clearData', () => {
  cy.window().then((win) => {
    win.localStorage.clear()
    win.sessionStorage.clear()
  })
})

Cypress.Commands.add('addTestIds', () => {
  cy.get('button').each(($btn, index) => {
    cy.wrap($btn).invoke('attr', 'data-testid', `button-${index}`)
  })
})
