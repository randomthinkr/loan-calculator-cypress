/**
 * Integration test scripts for form submit event
 */

describe('The Loan Calculator Form Submit', () => {
    
    beforeEach(() => {
        cy.visit('/') 
        
    })
    
    context('Form is submitted', () => {
         const negativeLoanAmount = -2000
         const negativePeriodAmount = -5
         const validLoanAmmount = 1000
         const validPeriod = 1

         const inputLoanAmount = (loanAmount) => {
            cy.get("input[name='loanAmount']")
            .clear()
            .type(loanAmount)
         }

         const inputPeriod = (period) => {
            cy.get("input[name='loadPeroid']")
            .clear()
            .type(period)
         }

         const formSubmitFail = () => {
            cy.get('form').submit();
            cy.get('section').should(($ammortizationTable) => {
                expect($ammortizationTable).to.have.length(0)
            })
         }

         const formSubmitSucess = () => {
            cy.get('form').submit();
            cy.get('section').should(($ammortizationTable) => {
                expect($ammortizationTable).to.have.length(1)
            })
         }
       
        it('does not submit on negative loan amount', () => {
            inputLoanAmount(negativeLoanAmount)
            formSubmitFail()
        })

        it('does not submit on zero loan amount', () => {
            inputLoanAmount('0')
            formSubmitFail()
        })

        it('does not submit on negative period', () => {
            inputLoanAmount(negativePeriodAmount)
            formSubmitFail()
        })

        it('does not submit on zero period', () => {
            inputLoanAmount(0)
            formSubmitFail()
        })

        it('submits on valid loan and period inputs', () => {
            inputLoanAmount(validLoanAmmount)
            inputPeriod(validPeriod)
            formSubmitSucess()
        })
    }) 

})

  