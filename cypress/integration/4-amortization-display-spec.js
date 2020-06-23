/**
 * Integration test scripts for Amortization Schedule table on form submit
 */
import Finance from 'financejs'

describe('The Amortization Schedule table', () => {
    const loanAmount = 1000
    let period= 1
    let rate = 3.5

    beforeEach(() => {
        cy.visit('/') 
        cy.get("input[name='loanAmount']")
            .clear()
            .type(loanAmount)
        cy.get("input[name='loadPeroid']")
            .clear()
            .type(period)
        cy.get('form').submit();
    })
    const columnHeaders = [
        {column: '1', description: 'Month'},
        {column: '2', description: 'Installment'},
        {column: '3', description: 'Interest'},
        {column: '4', description: 'Remaining Amount'}
    ]

    const validateColumnHeaders = (idx) => {
        cy.get('div.ReactVirtualized__Table__headerColumn').each(($column, index) => {
            if(index === idx) {
                cy.wrap($column)
                .find('span').should(($span) => {
                    expect($span).to.contain(columnHeaders[index].description)
                })
            }
            
        })
    }

    context('Layout', () => {
        it('displays the Amortization Schedule table', () => {
            cy.get('section').should('be.visible')
        })
    
        it('the table displays 4 columns', () => {
            cy.get('div.ReactVirtualized__Table__headerColumn').should('have.length', 4)
        })
        it('column ' + columnHeaders[0].column + ' header displays ' + columnHeaders[0].description.toUpperCase() + ' text', () => {
            validateColumnHeaders(0)
        })
        it('column ' + columnHeaders[1].column + ' header displays ' + columnHeaders[1].description.toUpperCase() + ' text', () => {
            validateColumnHeaders(1)
        })
        it('column ' + columnHeaders[2].column + ' header displays ' + columnHeaders[2].description.toUpperCase() + ' text', () => {
            validateColumnHeaders(2)
        })
        it('column ' + columnHeaders[3].column + ' header displays ' + columnHeaders[3].description.toUpperCase() + ' text', () => {
            validateColumnHeaders(3)
        })
    })

    context('Row Data', () => {
        
        it('displays ' + period * 12 + ' rows for period value = ' + period, () => {
            cy.get('div.ReactVirtualized__Table__row').should('have.length', period * 12)
        })
        
        //computing for the monthly amortization

        const finance = new Finance()
        const monthlyAmortization = finance.AM(
            loanAmount,
            rate,
            period,
            0,
        ).toFixed(2)

        const totalMonths = period * 12
        let balance = loanAmount  
        let monthlyInterest = (rate / 12 /100 * newBalance).toFixed(2)
        let monthlyPaidPrincipal = monthlyAmortization - monthlyInterest
        let newBalance = balance - monthlyPaidPrincipal

        for(let x = 0; x <= totalMonths; x++) {
            let month = x + 1;
            monthlyInterest = (rate / 12 /100 * balance).toFixed(2)
            monthlyPaidPrincipal = monthlyAmortization - monthlyInterest
            newBalance = (balance - monthlyPaidPrincipal).toFixed(2)

            if(x === 0) {
                it('displays INSTALLMENT value of [' 
                + monthlyAmortization + '] for loan amount = [' 
                + loanAmount + '], period = [' + period + '] and month =[' + month + ']', () => {
                    cy.get('div.ReactVirtualized__Table__row')
                        .eq(x).find('div').should($cols => {
                            expect($cols.eq(1)).to.contain(monthlyAmortization)
                        
                        })
                })
            }
            

            it('displays INTEREST value of [' 
            + monthlyInterest + '] for loan amount = [' 
            + loanAmount + '], period = [' + period + '] and month =[' + month + ']', () => {
                cy.get('div.ReactVirtualized__Table__row').eq(x).find('div').should($cols => {
                    expect($cols.eq(2)).to.contain(monthlyInterest)
                })
            } )

            it('displays REMAINING BALANCE value of [' 
            + newBalance + '] for loan amount = [' 
            + loanAmount + '], period = [' + period + '] and month =[' + month + ']', () => {
                cy.get('div.ReactVirtualized__Table__row').eq(x).find('div').should($cols => {
                    expect($cols.eq(3)).to.contain(newBalance)
                })
            } )

            balance = newBalance
         }
        
    })
    
})
  