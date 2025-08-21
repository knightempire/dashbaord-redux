import { EmployeeTable } from '../../src/components/EmployeeTable'
import { User } from '../../src/components/types'

describe('EmployeeTable Component Tests', () => {
  const mockUsers: User[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      image: 'john.jpg',
      status: true,
      company: {
        title: 'Software Engineer',
        department: 'Engineering',
        name: 'Tech Corp',
      },
      role: 'Software Engineer',
      department: 'Engineering',
      teams: 'Frontend',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      image: 'jane.jpg',
      status: false,
      company: {
        title: 'Product Manager',
        department: 'Product',
        name: 'Tech Corp',
      },
      role: 'Product Manager',
      department: 'Product',
      teams: 'Product Team',
    },
  ]

  const mockProps = {
    users: mockUsers,
    loading: false,
    activeTab: 'all' as const,
    searchQuery: '',
    onEdit: cy.stub(),
    onDelete: cy.stub(),
    deletedUsers: [],
    deletedPage: 1,
    deletedLimit: 10,
  }

  it('renders employee table with data', () => {
    cy.mount(<EmployeeTable {...mockProps} />)

    cy.contains('Name').should('be.visible')
    cy.contains('Employee ID').should('be.visible')
    cy.contains('Role').should('be.visible')
    cy.contains('Status').should('be.visible')
    cy.contains('Teams').should('be.visible')

    cy.contains('John Doe').should('be.visible')
    cy.contains('Jane Smith').should('be.visible')
    cy.contains('Software Engineer').should('be.visible')
    cy.contains('Product Manager').should('be.visible')
  })

  it('displays loading state', () => {
    cy.mount(<EmployeeTable {...mockProps} loading={true} />)
    cy.contains('Loading...').should('be.visible')
  })

  it('filters employees based on search query', () => {
    cy.mount(<EmployeeTable {...mockProps} searchQuery="John" />)
    
    cy.contains('John Doe').should('be.visible')
    cy.contains('Jane Smith').should('not.exist')
  })

  it('shows deleted employees when activeTab is deleted', () => {
    const deletedProps = {
      ...mockProps,
      activeTab: 'deleted' as const,
      deletedUsers: [mockUsers[0]],
    }
    
    cy.mount(<EmployeeTable {...deletedProps} />)
    cy.contains('John Doe').should('be.visible')
  })

  it('shows no deleted employees message when list is empty', () => {
    const deletedProps = {
      ...mockProps,
      activeTab: 'deleted' as const,
      deletedUsers: [],
    }
    
    cy.mount(<EmployeeTable {...deletedProps} />)
    cy.contains('No deleted employees').should('be.visible')
  })

  it('has functioning checkboxes', () => {
    cy.mount(<EmployeeTable {...mockProps} />)

    cy.get('input[type="checkbox"]').should('exist')

    cy.get('thead input[type="checkbox"]').first().check()
    cy.get('thead input[type="checkbox"]').first().should('be.checked')
  })
})
