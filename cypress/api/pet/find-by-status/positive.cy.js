describe('GET - /pet/findByStatus - Positive Test', () => {
    let response;

    before(() => {
        // Get all the pets that have the same status
        cy.request({
            method: "GET",
            url: "https://petstore.swagger.io/v2/pet/findByStatus",
            qs: {
                status: "sold"
            }

        }).then((res) => {
            response= res;
        })   
    })

    it("Validate status code is 200", () => {
        expect(response.status).to.eq(200)   
    })

    it("Validate response body", () => { 
         const { body } = response
         body.forEach((body1) => {
            expect(body1.status).to.eq('sold')
         })
})

    it("Validate response headers", () => { 
        const { headers } = response
        expect(headers["content-type"]).to.contain('application/json')
        expect(headers["connection"]).to.contain('keep-alive')
})
})