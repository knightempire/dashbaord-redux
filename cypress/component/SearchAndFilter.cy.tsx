import { SearchAndFilter } from '../../src/components/SearchAndFilter'

describe('SearchAndFilter Component Tests', () => {
  const mockProps = {
    searchQuery: '',
    setSearchQuery: cy.stub(),
  }

  it('renders search input and filter button', () => {
    cy.mount(<SearchAndFilter {...mockProps} />)
    
    cy.get('input[placeholder*="Search Employee"]').should('be.visible')
    cy.contains('Filter').should('be.visible')
  })

  it('calls setSearchQuery when typing', () => {
    const setSearchQuery = cy.stub().as('setSearchQuery')
    cy.mount(<SearchAndFilter searchQuery="" setSearchQuery={setSearchQuery} />)
    
    cy.get('input[placeholder*="Search Employee"]').type('John')
    cy.get('@setSearchQuery').should('have.been.called')
  })

  it('displays the current search query', () => {
    cy.mount(<SearchAndFilter searchQuery="test query" setSearchQuery={cy.stub()} />)
    
    cy.get('input[placeholder*="Search Employee"]').should('have.value', 'test query')
  })

  it('has a clickable filter button', () => {
    cy.mount(<SearchAndFilter {...mockProps} />)
    
    cy.contains('Filter').should('be.visible').click()

  })

  it('has proper search icon', () => {
    cy.mount(<SearchAndFilter {...mockProps} />)

    cy.get('svg').should('exist')
  })

  it('updates input value when searchQuery prop changes', () => {
    cy.mount(<SearchAndFilter searchQuery="initial" setSearchQuery={cy.stub()} />)
    cy.get('input').should('have.value', 'initial')
    
    // Simulate prop change by remounting with new value
    cy.mount(<SearchAndFilter searchQuery="updated" setSearchQuery={cy.stub()} />)
    cy.get('input').should('have.value', 'updated')
  })
})
