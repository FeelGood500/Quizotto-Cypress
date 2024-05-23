describe('Quizotto', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/') // Załóżmy, że Twoja aplikacja jest uruchomiona pod adresem głównym
  })

  it('Wyświetla pytanie i możliwe odpowiedzi', () => {
    cy.get('.question').should('be.visible')
    cy.get('.option').should('have.length', 3) // Sprawdzanie czy są trzy możliwe odpowiedzi
  })

  it('Przechodzi przez wszystkie pytania i wyświetla wynik', () => {
    const answers = [1, 2, 2, 0, 1, 0, 1, 1, 2, 1] // Poprawne odpowiedzi

    answers.forEach((answer, index) => {
      // Sprawdza, czy pytanie jest widoczne
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

    // Sprawdza, czy wyświetla się komunikat o ukończeniu quizu
    cy.get('h2').should('contain', 'Ukończyłeś quiz!')

    // Sprawdza, czy wynik jest poprawny
    cy.get('p').should('contain', 'Twój wynik to: 0 / 10!')
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