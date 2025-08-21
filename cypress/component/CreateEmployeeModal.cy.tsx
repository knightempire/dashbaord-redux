import { CreateEmployeeModal } from '../../src/components/CreateEmployeeModal'

describe('CreateEmployeeModal Component Tests', () => {
  const mockProps = {
    show: true,
    onClose: cy.stub(),
    onSave: cy.stub().returns({ success: true }),
    setToast: cy.stub(),
  }

  it('renders modal when show is true', () => {
    cy.mount(<CreateEmployeeModal {...mockProps} />)
    
    cy.contains('Create Employee').should('be.visible')
    cy.get('input[placeholder="First Name"]').should('be.visible')
    cy.get('input[placeholder="Last Name"]').should('be.visible')
    cy.contains('Save changes').should('be.visible')
    cy.contains('Cancel').should('be.visible')
  })

  it('does not render modal when show is false', () => {
    cy.mount(<CreateEmployeeModal {...mockProps} show={false} />)
    
    cy.contains('Create Employee').should('not.exist')
  })

  it('allows typing in form fields', () => {
    cy.mount(<CreateEmployeeModal {...mockProps} />)
    
    cy.get('input[placeholder="First Name"]').type('John')
    cy.get('input[placeholder="First Name"]').should('have.value', 'John')
    
    cy.get('input[placeholder="Last Name"]').type('Doe')
    cy.get('input[placeholder="Last Name"]').should('have.value', 'Doe')
  })

  it('calls onClose when Cancel button is clicked', () => {
    const onClose = cy.stub().as('onClose')
    cy.mount(<CreateEmployeeModal {...mockProps} onClose={onClose} />)
    
    cy.contains('Cancel').click()
    cy.get('@onClose').should('have.been.called')
  })

  it('calls onClose when X button is clicked', () => {
    const onClose = cy.stub().as('onClose')
    cy.mount(<CreateEmployeeModal {...mockProps} onClose={onClose} />)
    
    cy.get('button').contains('×').click()
    cy.get('@onClose').should('have.been.called')
  })

  it('calls onSave when form is submitted with data', () => {
    const onSave = cy.stub().returns({ success: true })
    cy.wrap(onSave).as('onSave')
    cy.mount(<CreateEmployeeModal {...mockProps} onSave={onSave} />)
    
    cy.get('input[placeholder="First Name"]').type('John')
    cy.get('input[placeholder="Last Name"]').type('Doe')
    cy.contains('Save changes').click()
    
    cy.get('@onSave').should('have.been.calledWith', 'John', 'Doe')
  })

  it('displays error message when save fails', () => {
    const onSave = cy.stub().returns({ success: false, error: 'Save failed' })
    cy.mount(<CreateEmployeeModal {...mockProps} onSave={onSave} />)
    
    cy.get('input[placeholder="First Name"]').type('John')
    cy.get('input[placeholder="Last Name"]').type('Doe')
    cy.contains('Save changes').click()
    
    cy.contains('Save failed').should('be.visible')
  })

  it('calls setToast when save is successful', () => {
    const setToast = cy.stub().as('setToast')
    const onSave = cy.stub().returns({ success: true })
    
    cy.mount(
      <CreateEmployeeModal 
        {...mockProps} 
        onSave={onSave} 
        setToast={setToast} 
      />
    )
    
    cy.get('input[placeholder="First Name"]').type('John')
    cy.get('input[placeholder="Last Name"]').type('Doe')
    cy.contains('Save changes').click()
    
    cy.get('@setToast').should('have.been.calledWith', true)
  })

  it('clears form data when modal is closed', () => {
    const onClose = cy.stub().as('onClose')
    cy.mount(<CreateEmployeeModal {...mockProps} onClose={onClose} />)
    
    // Fill form
    cy.get('input[placeholder="First Name"]').type('John')
    cy.get('input[placeholder="Last Name"]').type('Doe')
    
    // Close modal
    cy.contains('Cancel').click()
    
    // Reopen modal (simulate by remounting)
    cy.mount(<CreateEmployeeModal {...mockProps} />)
    
    // Fields should be empty
    cy.get('input[placeholder="First Name"]').should('have.value', '')
    cy.get('input[placeholder="Last Name"]').should('have.value', '')
  })
})
