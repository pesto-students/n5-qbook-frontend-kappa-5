
/// <reference types="cypress" />

context('Booking', () => {
    beforeEach(() => {
      cy.visit('https://qbooks.in/confirmation?searchToken=b93c08a57dc51d4896a2ff1236f795dc7176dcc998c5ebb760fa97aabd4608dd331ff2dbc1e691f0756a38ea4c29447784b9')
    })
    it('Booking page loading check',  () => {
        // expect(true).to.equal(true);
        const apoinmnetTexts = cy.get('[data-testid=confirmationText]')
        expect(apoinmnetTexts.text === "No Appoinmnet Available !!")
    })
})