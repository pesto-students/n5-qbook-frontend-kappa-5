
/// <reference types="cypress" />

context('Booking', () => {
    beforeEach(() => {
      cy.visit('https://qbooks.in/booking?uuid=2a913bc81056a5e649f6f0a63545ae5dfe0693ffb264d92c14e7f791e577')
    })
    it('Booking page loading check',  () => {
        // expect(true).to.equal(true);
        const apoinmnetTexts = cy.get('[data-testid=apoinmnetText]')
        expect(apoinmnetTexts.text === "Doctor Appointment is not available for now !!.")
    })
})