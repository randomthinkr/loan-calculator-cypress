/**
 * Integration test scripts for form UI and input field validation
 */

describe('The Loan Calculator Form', () => {
    const formLabels = [
        {item : 0, field: 'loan amount', expectedLabel : 'Loan amount'},
        {item : 1, field: 'loan period', expectedLabel : 'Loan period (years)'},
        {item : 2, field: 'loan rate', expectedLabel : 'Loan Rate (%, per year)'},
        {item : 3, field: 'submit button', expectedLabel : 'Submit'}
    ]
    const validateLabel = (idx) => {
        cy.get('div.form-row').each(($formElement, index) => {
            if(idx == index && idx !== 3) {
                cy.wrap($formElement)
                .find('label').should(($label) => {
                    expect($label).to.contain(formLabels[index].expectedLabel)
                })
                    
            }
            else if(idx == index && idx === 3) {
                cy.wrap($formElement)
                    .find('button').should(($label) => {
                        expect($label).to.contain(formLabels[index].expectedLabel)
                    })
            }
            
        })
    }
    beforeEach(() => {
        cy.visit('/') 
        
    })
    context('Fields\' labels', () => {
       
        it('shows correct form '  + formLabels[0].field + ' label', () => {
            validateLabel(0)
        })

        it('shows correct form '  + formLabels[1].field + ' field label', () => {
            validateLabel(1)
        })

        it('shows correct form '  + formLabels[2].field + ' field label', () => {
            validateLabel(2)
        })

        it('shows correct form '  + formLabels[3].field + ' label', () => {
            validateLabel(3)
        })
    }) 
    context('Loan Amount input', () => {
        const loanAmountInput = '100000'
        const incorrectInput = 'Five Thousand Pesos'
        const withDecimalAmount = 2000.58

        it('shows ' + formLabels[0].field + ' field has initial focus', () => {
            cy.focused().should('have.id', 'loanAmount');   
        })

        it('accepts numerical value', () => {
            cy.get("input[name='loanAmount']")
            .clear()
            .type(withDecimalAmount)
            .should('have.value', withDecimalAmount)
        })

        it('accepts with decimal value', () => {
            cy.get("input[name='loanAmount']")
            .clear()
            .type(loanAmountInput)
            .should('have.value', loanAmountInput)
        })

        it('does not accept alphabet characters', () => {
            cy.get("input[name='loanAmount']")
            .clear()
            .type(incorrectInput)
            .should('not.have.value', incorrectInput)
        })

    }) 

    context('Loan Period input', () => {
        const loanPeriodInput = '5'
        const incorrectInput = 'Five'
        
        it('accepts numerical value', () => {
            cy.get("input[name='loadPeroid']")
            .clear()
            .type(loanPeriodInput)
            .should('have.value', loanPeriodInput)
        })

        it('does not accept alphabet characters', () => {
            cy.get("input[name='loadPeroid']")
            .clear()
            .type(incorrectInput)
            .should('not.have.value', incorrectInput)
        })


    }) 

})

  