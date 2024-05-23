

describe('Quizotto', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('Wyświetla pytanie i możliwe odpowiedzi', () => {
    cy.get('.question').should('be.visible')
    cy.get('.option').should('have.length', 3) 
  })

  it('Przechodzi przez wszystkie pytania i wyświetla wynik', () => {
      const answers = [0, 0, 1, 2, 2, 2, 2, 0, 1, 0] 
  
      answers.forEach((answer, index) => {
        cy.get('.question').should('be.visible')
        
        cy.get('.option').eq(answer).click()
  
        if (index < answers.length - 1) {
          cy.get('button').contains('Następne pytanie').click()
        } else {
          cy.get('button').contains('Podsumowanie').click()
        }
      })
  
      cy.get('h2').should('contain', 'Ukończyłeś quiz!')
  
      cy.get('p').should('contain', 'Twój wynik to: 10 / 10!')
    })
  })