describe('DELETE - /pet - Negative Test', () => {
    let response;
    before(() => {
        // Delete a user that does not exist on the website and collect response
            cy.request({
                method: "DELETE",
                log: true,
                failOnStatusCode: false,
                url: `https://petstore.swagger.io/v2/pet/77`,
            }).then((res) => {
                response= res;
            }) 

            })    

    it("Validate status code is 404", () => {
        expect(response.status).to.eq(404)   
    })

    it("Validate response headers", () => { 
        const { headers } = response
        expect(headers["connection"]).to.contain('keep-alive')
})
})