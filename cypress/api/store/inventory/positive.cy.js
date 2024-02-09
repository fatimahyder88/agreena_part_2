describe(' GET - /store/inventory - Positive Test', () => {
    let response;

    before(() => {
        // Get the inventory information
        cy.request({
            method: "GET",
            url: "https://petstore.swagger.io/v2/store/inventory",

        }).then((res) => {
            response= res;
        })   
    })

    it("Validate status code is 200", () => {
        expect(response.status).to.eq(200)   
    })

    it("Validate response body", () => { 
        // This might fail sometimes as the inventory keeps on changing
         const { body } = response
         expect(body).to.have.property("string")
         expect(body).to.have.property("pending")
         expect(body).to.have.property("available")
})

    it("Validate response headers", () => { 
        const { headers } = response
        expect(headers["content-type"]).to.contain('application/json')
        expect(headers["connection"]).to.contain('keep-alive')
})
})