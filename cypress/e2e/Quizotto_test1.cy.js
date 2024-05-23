

describe('Quizotto', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/') // Załóż, że Twoja aplikacja jest uruchomiona na adresie głównym
  })

  it('Wyświetla pytanie i możliwe odpowiedzi', () => {
    cy.get('.question').should('be.visible')
    cy.get('.option').should('have.length', 3) // Sprawdzanie czy są trzy możliwe odpowiedzi
  })

  it('Przechodzi przez wszystkie pytania i wyświetla wynik', () => {
      const answers = [0, 0, 1, 2, 2, 2, 2, 0, 1, 0] // Poprawne odpowiedzi
  
      answers.forEach((answer, index) => {
        // Sprawdza czy pytanie jest widoczne
        cy.get('.question').should('be.visible')
        
        // Wybiera odpowiedź
        cy.get('.option').eq(answer).click()
  
        // Kliknij przycisk "Następne pytanie" lub "Podsumowanie" na ostatnim pytaniu
        if (index < answers.length - 1) {
          cy.get('button').contains('Następne pytanie').click()
        } else {
          cy.get('button').contains('Podsumowanie').click()
        }
      })
  
      // Sprawdza czy wyświetla się komunikat o ukończeniu quizu
      cy.get('h2').should('contain', 'Ukończyłeś quiz!')
  
      // Sprawdza czy wynik jest poprawny
      cy.get('p').should('contain', 'Twój wynik to: 10 / 10!')
    })
  })