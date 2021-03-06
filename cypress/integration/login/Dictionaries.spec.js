describe('Dictionaries test', () => {
  beforeEach(function () {
    cy.clearLocalStorage()
    cy.fixture('dictionaries.json').as('dictionaries')
    cy.fixture('user.json').as('user')
    cy.window().then(window => {
      window.localStorage.setItem('user', JSON.stringify(this.user))
      window.localStorage.setItem('dictionaries', JSON.stringify({ [this.user.email]: this.dictionaries }))
    })
    cy.visit(Cypress.env('BASE_URL'))
  })
  it('should test mock data', function () {
    cy.get('[data-testid="dictionary-list-item"]').should('have.length', this.dictionaries.length)
  })
  it('should update 2nd dictionary', function () {
    const dictionary = this.dictionaries[0]
    cy.get('[data-testid="dictionary-list-item"]').eq(0).click()
    cy.url().should('include', `/dictionary/${dictionary.id}`)
    cy.get('[data-testid="phrase-form-container"]').eq(0).find('[data-testid="phrase-form-original-text"] input').clear().type('aaa')
    cy.get('[data-testid="phrase-form-container"]').eq(0).find('[data-testid="phrase-form-translated-text"] input').clear().type('aaa')
    cy.get('[data-testid="dictionary-form-submit"]').click()
    cy.get('[data-testid="dictionary-list-item"]').eq(0).click()
    cy.get('[data-testid="phrase-form-container"]').eq(0).find('[data-testid="phrase-form-original-text"] input').should('have.value', 'aaa')
    cy.get('[data-testid="phrase-form-container"]').eq(0).find('[data-testid="phrase-form-translated-text"] input').should('have.value', 'aaa')
    cy.get('[data-testid="phrase-form-container"]').eq(0).find('[data-testid="phrase-form-delete-button"]').click()
    cy.get('[data-testid="phrase-form-container"]').should('have.length', dictionary.phrases.length - 1)
  })
  it('should remove 2nd dictionary and recreate it', function () {
    cy.get('[data-testid="dictionary-list-item"]')
      .eq(1)
      .siblings('div')
      .find('[data-testid="dictionary-list-item-delete-button"]')
      .click()
    cy.get('[data-testid="dictionary-list-item"]').should('have.length', this.dictionaries.length - 1)
    cy.get('[data-testid="dictionary-create"]').click()
    cy.get('[data-testid="dictionary-language-loader"]').should('not.exist')
    cy.url().should('include', '/dictionary/create')
    const dictionary = this.dictionaries[this.dictionaries.length - 1]
    cy.get('[data-testid="dictionary-form-label"]').type(dictionary.label)
    cy.get('[data-testid="dictionary-form-origin-language"]').click()
    cy.get('#dictionary-form-origin-language-menu').should('exist').find(`[data-value="${dictionary.originLanguage.code}"]`).click()
    cy.get('#dictionary-form-origin-language-menu').should('not.exist')
    cy.get('[data-testid="dictionary-form-target-language"]').click()
    cy.get('#dictionary-form-target-language-menu').should('exist').find(`[data-value="${dictionary.targetLanguage.code}"]`).click()
    cy.get('#dictionary-form-target-language-menu').should('not.exist')
    for (let i = 0; i < dictionary.phrases.length; i++) {
      const phrase = dictionary.phrases[i]
      cy.get('[data-testid="dictionary-form-add-phrase"]').click()
      cy.get('#phrase-form-translated-text-hints-popup').should('not.exist')
      cy.get('[data-testid="phrase-form-container"]').eq(i).find('[data-testid="phrase-form-original-text"]').type(phrase.original)
      cy.get('[data-testid="phrase-form-container"]').eq(i).find('[data-testid="phrase-form-translate-loader"]').should('not.exist')
      cy.get('[data-testid="phrase-form-container"]').eq(i).find('[data-testid="phrase-form-translated-text"] input').should('not.have.value', '')
      cy.get('[data-testid="phrase-form-container"]').eq(i).find('[data-testid="phrase-form-translated-text"]').click()
      cy.get('#phrase-form-translated-text-hints-popup').should('exist')
    }
    cy.get('[data-testid="dictionary-form-submit"]').click()
    cy.get('#phrase-form-translated-text-hints-popup').should('not.exist')
    cy.url().should('not.include', '/dictionary/create')
  })
})
