describe('POST - /pet - Positive Test', () => {
    let response;
    let petInfo;

    before(() => {
        // Get the data from the pet file
        cy.fixture('pet').then((info) => {
            petInfo = info;

            // Add a new pet using POST
            cy.request({
                method: "POST",
                url: "https://petstore.swagger.io/v2/pet",
                body: petInfo
    
            }).then((res) => {
                response= res;
            }) 
        })  
    })

    after(() =>{
        // Delete the added pet
        cy.request({
            method: 'DELETE',
            url: `https://petstore.swagger.io/v2/pet/${petInfo.id}`
        })
    })

    it("Validate status code is 200", () => {
        expect(response.status).to.eq(200)   
    })

    it("Validate response body", () => { 
         const { body } = response
         expect(body.id).to.eq(77)
         expect(body.category.id).to.eq(7) 
         expect(body.category.name).to.eq("Doggy")
         expect(body.name).to.eq("doggie")
         expect(body.status).to.eq("available")
         expect(body.photoUrls[0]).to.eq("string")
         expect(body.tags[0].id).to.eq(0)
         expect(body.tags[0].name).to.eq("string")
})

    it("Validate response headers", () => { 
        const { headers } = response
        expect(headers["content-type"]).to.contain('application/json')
        expect(headers["connection"]).to.contain('keep-alive')
})
})