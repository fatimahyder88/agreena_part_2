describe('DELETE - /pet - Positive Test', () => {
    let response;
    let petInfo;
        before(() => {
            // Get the data from the pet file
            cy.fixture('pet').then((info) => {
                petInfo = info;
    
                // Add a pet
                cy.request({
                    method: "POST",
                    url: "https://petstore.swagger.io/v2/pet",
                    body: petInfo
        
                }).then((res) => {
                    response= res;
                }) 
            })  
    
        })  

    it("Delete the created pet ID", () => {
        cy.request({
            method: 'DELETE',
            url: `https://petstore.swagger.io/v2/pet/${petInfo.id}`
        }).then((res) => {
            response = res
        }) 
    })

    it("Validate status code is 200" , () => {
        const { status } = response
        expect(status).to.eq(200)  
    })

    it("Validate response body", () => { 
         const { body } = response
         expect(body.code).to.eq(200)
         expect(body.type).to.eq("unknown") 
         expect(body.message).to.eq(`${petInfo.id}`)
})

    it("Validate response headers", () => { 
        const { headers } = response
        expect(headers["content-type"]).to.contain('application/json')
})
})