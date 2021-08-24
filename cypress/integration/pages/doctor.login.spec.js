

describe('Qbook Home page',  () => {

    it('Home page loading check',  () => {
        // expect(true).to.equal(true);
        cy.visit('https://qbooks.in/')
        const doctorPageLink = cy.get('[data-testid=signInText]')
        expect(doctorPageLink.text === "Sign in to get started..!")
    })
})