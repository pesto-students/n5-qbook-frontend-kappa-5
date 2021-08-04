

describe('Qbook Home page',  () => {

    it('Home page loading check',  () => {
        // expect(true).to.equal(true);
        cy.visit('http://localhost:3000/')
        const doctorPageLink = cy.get('[data-testid=doctorPageLink] > h6 >a')
        expect(doctorPageLink.text === "Doctor's Login")
    })
})