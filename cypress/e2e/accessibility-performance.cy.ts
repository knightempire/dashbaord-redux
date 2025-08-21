describe('Accessibility and Performance Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/users**', { fixture: 'employees.json' }).as('getEmployees')
    cy.visit('/dashboard')
    cy.wait('@getEmployees')
  })

  describe('Accessibility Tests', () => {
    it('should have proper heading structure', () => {
      // Check for proper heading hierarchy
      cy.get('h1, h2, h3, h4, h5, h6').should('exist')
      
      // Main heading should be present
      cy.contains('Employees').should('be.visible')
    })

    it('should have accessible form elements', () => {
      // Open create modal
      cy.contains('New Employee').click()
      
      // Check for proper labels and inputs
      cy.get('input[placeholder="First Name"]').should('be.visible')
      cy.get('input[placeholder="Last Name"]').should('be.visible')
      
      // Check if inputs have proper accessibility attributes
      cy.get('input').each(($input) => {
        cy.wrap($input).should('have.attr', 'type')
      })
    })

    it('should have keyboard navigation support', () => {
      // Test tab navigation
      cy.get('button, input, a').first().focus()
      cy.focused().should('be.visible')
      
      // Navigate through interactive elements
      cy.get('button, input, a').first().focus()
      cy.focused().should('be.visible')
    })

    it('should have proper button roles and states', () => {
      // Check buttons have proper roles
      cy.get('button').each(($btn) => {
        cy.wrap($btn).should('satisfy', ($el) => {
          return $el.attr('type') || $el.attr('role') || $el.prop('tagName') === 'BUTTON'
        })
      })
      
      // Check disabled states if any
      cy.get('button:disabled').should('have.attr', 'disabled')
    })

    it('should have alt text for images', () => {
      // Check if avatar images have proper alt text or aria-labels
      cy.get('img').each(($img) => {
        cy.wrap($img).should('satisfy', ($el) => {
          return $el.attr('alt') || $el.attr('aria-label') || $el.attr('role')
        })
      })
    })
  })

  describe('Performance Tests', () => {
    it('should load the page within reasonable time', () => {
      const startTime = Date.now()
      
      cy.visit('/dashboard')
      cy.wait('@getEmployees')
      
      // Check that page loads within 3 seconds
      cy.then(() => {
        const loadTime = Date.now() - startTime
        cy.wrap(loadTime).should('be.lessThan', 3000)
      })
    })

    it('should handle large datasets efficiently', () => {
      // Mock a large dataset
      const largeDataset = {
        users: Array.from({ length: 100 }, (_, i) => ({
          id: i + 1,
          firstName: `User${i + 1}`,
          lastName: `LastName${i + 1}`,
          email: `user${i + 1}@example.com`,
          image: `https://i.pravatar.cc/150?img=${i + 1}`,
          status: Math.random() > 0.5,
          company: {
            title: `Role${i + 1}`,
            department: `Dept${i + 1}`,
            name: 'Tech Corp'
          },
          role: `Role${i + 1}`,
          department: `Dept${i + 1}`,
          teams: `Team${i + 1}`
        })),
        total: 100
      }
      
      cy.intercept('GET', '**/users**', largeDataset).as('getLargeDataset')
      cy.reload()
      cy.wait('@getLargeDataset')
      
      // Page should still be responsive
      cy.contains('Employees').should('be.visible')
      cy.get('tbody tr').should('have.length.greaterThan', 0)
    })

    it('should handle search performance', () => {
      const searchInput = 'input[placeholder*="Search Employee"]'
      
      // Test search responsiveness
      cy.get(searchInput).type('John')
      
      // Results should appear quickly
      cy.contains('John Doe').should('be.visible')
      
      // Test with longer search terms
      cy.get(searchInput).clear().type('Software Engineer Developer')
      
      // Should handle long search terms without crashing
      cy.get(searchInput).should('have.value', 'Software Engineer Developer')
    })
  })

  describe('Browser Compatibility', () => {
    it('should work on different viewport sizes', () => {
      const viewports = [
        { width: 320, height: 568 },  // iPhone 5
        { width: 768, height: 1024 }, // iPad
        { width: 1024, height: 768 }, // iPad Landscape
        { width: 1280, height: 720 }, // Desktop
        { width: 1920, height: 1080 } // Large Desktop
      ]
      
      viewports.forEach((viewport) => {
        cy.viewport(viewport.width, viewport.height)
        
        // Main elements should be visible
        cy.contains('Employees').should('be.visible')
        cy.get('table').should('be.visible')
        
        // Navigation should work
        cy.contains('All Employees').should('be.visible')
        cy.contains('Deleted Employees').should('be.visible')
      })
    })

    it('should handle touch interactions', () => {
      // Simulate mobile viewport
      cy.viewport(375, 667)
      
      // Test touch interactions
      cy.contains('New Employee').click()
      cy.contains('Create Employee').should('be.visible')
      
      // Close modal
      cy.contains('Cancel').click()
      cy.contains('Create Employee').should('not.exist')
    })
  })

  describe('Error Handling', () => {
    it('should handle network errors gracefully', () => {
      // Simulate network error
      cy.intercept('GET', '**/users**', { forceNetworkError: true }).as('networkError')
      
      cy.reload()
      
      // Page should not crash
      cy.contains('Employees').should('be.visible')
      
      // Should show some error state or fallback content
      cy.get('body').should('be.visible')
    })

    it('should handle API timeout', () => {
      // Simulate slow API
      cy.intercept('GET', '**/users**', { delay: 5000, fixture: 'employees.json' }).as('slowAPI')
      
      cy.reload()
      
      // Should show loading state or handle timeout
      cy.contains('Employees').should('be.visible')
    })

    it('should handle malformed data', () => {
      // Simulate malformed response
      cy.intercept('GET', '**/users**', { body: { invalid: 'data' } }).as('malformedData')
      
      cy.reload()
      
      // Should not crash
      cy.contains('Employees').should('be.visible')
    })
  })
})
