describe('Quizotto', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/') // Załóżmy, że Twoja aplikacja jest uruchomiona pod adresem głównym
    })
  
    it('Wyświetla pytanie i możliwe odpowiedzi', () => {
      cy.get('.question').should('be.visible')
      cy.get('.option').should('have.length', 3) // Sprawdzanie czy są trzy możliwe odpowiedzi
    })
  
    it('Przechodzi przez 5 pytań', () => {
      const answers = [1, 2, 2, 0, 1]
  
      answers.forEach((answer, index) => {
        // Sprawdza, czy pytanie jest widoczne
        cy.get('.question').should('be.visible')
  
        // Wybiera odpowiedź
        cy.get('.option').eq(answer).click()
        })
    
    })
  
    it('Resetuje quiz', () => {
      // Odpowiada na pierwsze pytanie
      cy.get('.option').first().click() // Wybierz pierwszą opcję
      cy.get('button').contains('Następne pytanie').click() // Kliknij przycisk "Następne pytanie"
  
      // Kliknij przycisk reset
      cy.get('#reset button').click()
  
      // Sprawdź, czy quiz został zresetowany
      cy.get('.question').should('be.visible') // Pytanie powinno być widoczne
      cy.get('.option input').should('not.be.checked') // Żadne opcje nie powinny być zaznaczone
      cy.get('.score').should('contain', 'Wynik 0/10') // Wynik powinien być zresetowany
    })
  })