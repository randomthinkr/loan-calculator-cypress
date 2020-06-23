/**
 * Integration test scripts for page load event
 */
describe('The Loan Calculator page loads', () => {
    beforeEach(() => {
        cy.visit('/') 
    })

    it('The browser navigates to the default page [/]', () => {
         cy.url().should('eq', Cypress.config().baseUrl + '/')
    })

    context('The page', () => {
        it('shows a `Loan Calculator` header text of type h1', () => {
            cy.get('h1').should('contain', 'Loan Calculator')
        })
        it('shows a loan calculator form', () => {
            cy.get('form').should('be.visible')
        })
        it('does not display the Amortization Schedule table', () => {
            cy.get('section').should('not.be.visible')
        })
    })  
    
})
  