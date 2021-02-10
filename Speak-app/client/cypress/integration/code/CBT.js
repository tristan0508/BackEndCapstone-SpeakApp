/// <reference types="cypress" />

context("Workflow", () => {
    it('login', () => {
        cy.visit('http://localhost:3000/')
        cy.get('#email')
            .type('fake@fake.com').should('have.value', 'fake@fake.com')
            .wait(1000)

        cy.get('#password')
            .type('password123').should('have.value', 'password123')
            .wait(1000)

        cy.get('#signIn').click().should('exist')
        

    })
})