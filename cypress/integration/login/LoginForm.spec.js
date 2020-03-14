describe('Login form test', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('BASE_URL'));
        cy.fixture('user.json').as('user');
    });
    it('should test login', function() {
        cy.url().should('include', '/login');
        cy.get('[data-testid="email"] input')
            .type(this.user.email)
            .should('have.value', this.user.email);
        cy.get('[data-testid="password"] input')
            .type(this.user.password)
            .should('have.value', this.user.password);
        cy.get('[data-testid="submit"]').click()
        cy.url().should('not.include', '/login')
    });
});
