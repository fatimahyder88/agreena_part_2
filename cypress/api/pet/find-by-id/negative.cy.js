describe('GET - /pet/{petId} - Negative Test', () => {
    let response;
    let petInfo;
    before(() => {
        // Get a user id that does not exist
        cy.fixture('pet').then((info) => {
            petInfo = info;
            cy.request({
                method: "GET",
                log: true,
                failOnStatusCode: false,
                url: `https://petstore.swagger.io/v2/pet/${petInfo.id}`,
            }).then((res) => {
                response= res;
            }) 
        })  
  })    

    it("Validate status code is 404", () => {
        expect(response.status).to.eq(404)   
    })

    it("Validate response body", () => { 
         const { body } = response
         expect(body.code).to.eq(1)
         expect(body.type).to.eq("error") 
         expect(body.message).to.eq("Pet not found")
})

    it("Validate response headers", () => { 
        const { headers } = response
        expect(headers["content-type"]).to.contain('application/json')
        expect(headers["connection"]).to.contain('keep-alive')
})
})