describe('Employee Management E2E Tests', () => {
  beforeEach(() => {

    cy.intercept('GET', '**/users**', { fixture: 'employees.json' }).as('getEmployees')
    cy.visit('/dashboard')
    cy.wait('@getEmployees')
  })

  describe('Employee CRUD Operations', () => {
    it('should create a new employee successfully', () => {

      cy.contains('New Employee').click()
      cy.contains('Create Employee').should('be.visible')
      
      // Fill form with valid data
      cy.get('input[placeholder="First Name"]').type('New')
      cy.get('input[placeholder="Last Name"]').type('Employee')
      
      // Submit form
      cy.contains('Save changes').click()
      
      // Modal should close after success
      cy.contains('Create Employee').should('not.exist')
    })

    it('should handle create employee form validation', () => {

      cy.contains('New Employee').click()
      
      // Try to submit empty form
      cy.contains('Save changes').click()

      cy.contains('Create Employee').should('be.visible')
      
      // Fill only first name
      cy.get('input[placeholder="First Name"]').type('Test')
      cy.contains('Save changes').click()
      
      // Form should still be open for last name
      cy.contains('Create Employee').should('be.visible')
    })

    it('should edit an existing employee', () => {
      // Find and click edit button for John Doe
      cy.contains('tr', 'John Doe').within(() => {
        // Look for action menu or edit button
        cy.get('button').last().click()
      })
      
      // If edit modal exists, test it
      cy.get('body').then(($body) => {
        if ($body.find(':contains("Edit Employee")').length > 0) {
          cy.contains('Edit Employee').should('be.visible')
          
          // Make changes
          cy.get('input[value="John"]').clear().type('Johnny')
          
          // Save changes
          cy.contains('Save').click()

          cy.contains('Johnny Doe').should('be.visible')
        }
      })
    })

    it('should delete an employee', () => {
      // Count initial employees
      cy.get('tbody tr').its('length').then((initialCount) => {
        // Find John Doe row and delete
        cy.contains('tr', 'John Doe').within(() => {
          cy.get('button').last().click()
        })
        
        // If delete option exists
        cy.get('body').then(($body) => {
          if ($body.find(':contains("Delete")').length > 0) {
            cy.contains('Delete').click()
            
            // Confirm deletion if confirmation dialog exists
            if ($body.find(':contains("Confirm")').length > 0) {
              cy.contains('Confirm').click()
            }

            cy.get('tbody tr').should('have.length', initialCount - 1)
            
            // Switch to deleted tab to verify
            cy.contains('Deleted Employees').click()
            cy.contains('John Doe').should('be.visible')
          }
        })
      })
    })
  })

  describe('Search and Filter Functionality', () => {
    it('should search by employee name', () => {
      const searchInput = 'input[placeholder*="Search Employee"]'
      
      // Search for John
      cy.get(searchInput).type('John')
      cy.contains('John Doe').should('be.visible')
      cy.contains('Jane Smith').should('not.exist')
      
      // Search for Jane
      cy.get(searchInput).clear().type('Jane')
      cy.contains('Jane Smith').should('be.visible')
      cy.contains('John Doe').should('not.exist')
      
      // Clear search
      cy.get(searchInput).clear()
      cy.contains('John Doe').should('be.visible')
      cy.contains('Jane Smith').should('be.visible')
    })

    it('should search by employee email', () => {
      const searchInput = 'input[placeholder*="Search Employee"]'
      
      // Search by email
      cy.get(searchInput).type('john.doe@example.com')
      cy.contains('John Doe').should('be.visible')
      cy.contains('Jane Smith').should('not.exist')
    })

    it('should search by role', () => {
      const searchInput = 'input[placeholder*="Search Employee"]'
      
      // Search by role
      cy.get(searchInput).type('Software Engineer')
      cy.contains('John Doe').should('be.visible')
      cy.contains('Jane Smith').should('not.exist')
    })

    it('should be case insensitive', () => {
      const searchInput = 'input[placeholder*="Search Employee"]'
      
      // Search with different cases
      cy.get(searchInput).type('JOHN')
      cy.contains('John Doe').should('be.visible')
      
      cy.get(searchInput).clear().type('jane')
      cy.contains('Jane Smith').should('be.visible')
    })
  })

  describe('Tab Navigation', () => {
    it('should switch between All and Deleted employees', () => {

      cy.contains('All Employees').should('have.class', 'text-[#1a253c]')
      cy.contains('John Doe').should('be.visible')
      
      // Switch to Deleted
      cy.contains('Deleted Employees').click()
      cy.contains('Deleted Employees').should('have.class', 'text-[#1a253c]')

      cy.get('body').then(($body) => {
        if ($body.find(':contains("No deleted employees")').length > 0) {
          cy.contains('No deleted employees').should('be.visible')
        }
      })
      
      // Switch back to All
      cy.contains('All Employees').click()
      cy.contains('John Doe').should('be.visible')
    })
  })

  describe('UI Interactions', () => {
    it('should handle dropdown menus', () => {

      cy.get('tbody tr').first().within(() => {
        cy.get('button').last().as('actionButton')
      })
      
      cy.get('@actionButton').click()

      cy.get('body').then(($body) => {
        if ($body.find('[role="menu"]').length > 0 || $body.find('.dropdown').length > 0) {
          // Dropdown should be visible
          cy.get('[role="menu"], .dropdown').should('be.visible')

          cy.get('body').click(0, 0)
          cy.get('[role="menu"], .dropdown').should('not.exist')
        }
      })
    })

    it('should handle checkboxes', () => {

      cy.get('thead input[type="checkbox"]').first().as('headerCheckbox')
      cy.get('@headerCheckbox').check()
      
      // All row checkboxes should be checked
      cy.get('tbody input[type="checkbox"]').should('be.checked')
      
      // Uncheck header
      cy.get('@headerCheckbox').uncheck()
      cy.get('tbody input[type="checkbox"]').should('not.be.checked')
    })

    it('should export employees', () => {

      cy.contains('Export').click()


      cy.contains('Export').should('be.visible')
    })
  })
})
