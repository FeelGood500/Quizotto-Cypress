describe('Quizotto', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/') 
    })
  
    it('Wyświetla pytanie i możliwe odpowiedzi', () => {
      cy.get('.question').should('be.visible')
      cy.get('.option').should('have.length', 3) 
    })
  
    it('Przechodzi przez 5 pytań', () => {
      const answers = [1, 2, 2, 0, 1]
  
      answers.forEach((answer, index) => {
        cy.get('.question').should('be.visible')
  
        cy.get('.option').eq(answer).click()
        })
    
    })
  
    it('Resetuje quiz', () => {
      cy.get('.option').first().click() 
      cy.get('button').contains('Następne pytanie').click() 
  
      cy.get('#reset button').click()
  
      cy.get('.question').should('be.visible') 
      cy.get('.option input').should('not.be.checked') 
      cy.get('.score').should('contain', 'Wynik 0/10') 
    })
  })