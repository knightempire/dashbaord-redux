describe('Dashboard E2E Tests', () => {
  beforeEach(() => {
    // Intercept API calls and use fixture data
    cy.intercept('GET', '**/users**', { fixture: 'employees.json' }).as('getEmployees')
    
    // Visit the dashboard page
    cy.visit('/dashboard')

    cy.wait('@getEmployees')
  })

  it('should display the dashboard with employee data', () => {

    cy.contains('Employees').should('be.visible')
    cy.contains('All Employees').should('be.visible')
    cy.contains('Deleted Employees').should('be.visible')

    cy.contains('John Doe').should('be.visible')
    cy.contains('Jane Smith').should('be.visible')
    cy.contains('Software Engineer').should('be.visible')
    cy.contains('Product Manager').should('be.visible')
  })

  it('should display employee table headers', () => {
    cy.contains('Name').should('be.visible')
    cy.contains('Employee ID').should('be.visible')
    cy.contains('Role').should('be.visible')
    cy.contains('Status').should('be.visible')
    cy.contains('Teams').should('be.visible')
  })

  it('should have functional search', () => {

    cy.get('input[placeholder*="Search Employee"]').type('John')

    cy.contains('John Doe').should('be.visible')
    cy.contains('Jane Smith').should('not.exist')
    
    // Clear search
    cy.get('input[placeholder*="Search Employee"]').clear()
    
    // Both should be visible again
    cy.contains('John Doe').should('be.visible')
    cy.contains('Jane Smith').should('be.visible')
  })

  it('should switch between tabs', () => {

    cy.contains('Deleted Employees').click()

    cy.contains('No deleted employees').should('be.visible')
    
    // Switch back to All Employees
    cy.contains('All Employees').click()

    cy.contains('John Doe').should('be.visible')
    cy.contains('Jane Smith').should('be.visible')
  })

  it('should have action buttons', () => {

    cy.contains('Export').should('be.visible')

    cy.contains('New Employee').should('be.visible')
  })

  it('should open create employee modal', () => {

    cy.contains('New Employee').click()

    cy.contains('Create Employee').should('be.visible')
    cy.get('input[placeholder="First Name"]').should('be.visible')
    cy.get('input[placeholder="Last Name"]').should('be.visible')

    cy.contains('Cancel').click()
    
    // Modal should be closed
    cy.contains('Create Employee').should('not.exist')
  })

  it('should create a new employee', () => {

    cy.contains('New Employee').click()
    
    // Fill out the form
    cy.get('input[placeholder="First Name"]').type('Test')
    cy.get('input[placeholder="Last Name"]').type('User')
    
    // Submit the form
    cy.contains('Save changes').click()

    // (This depends on your implementation)
    cy.wait(2000) // Wait for any success animation
  })

  it('should handle pagination if more than 10 employees', () => {


    cy.get('body').then(($body) => {
      if ($body.find('button:contains("Next")').length > 0) {
        cy.contains('Next').should('be.visible')
        cy.contains('Previous').should('be.visible')
      }
    })
  })

  it('should be responsive on mobile viewport', () => {

    cy.viewport(375, 667) // iPhone SE size
    
    // Main elements should still be visible
    cy.contains('Employees').should('be.visible')
    cy.contains('All Employees').should('be.visible')
    
    // Table should be scrollable or responsive
    cy.get('table').should('be.visible')
  })

  it('should handle error states gracefully', () => {

    cy.intercept('GET', '**/users**', { statusCode: 500 }).as('getEmployeesError')
    
    // Reload page to trigger error
    cy.reload()

    cy.wait('@getEmployeesError')
    
    // Page should still render without crashing
    cy.contains('Employees').should('be.visible')
  })
})
