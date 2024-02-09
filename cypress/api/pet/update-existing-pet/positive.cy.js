describe('GET - /pet - Positive Test', () => {
    let petInfo;
    let response;

    before(() => {
        // Get the data from the pet file
        cy.fixture('pet').then((info) => {
            petInfo = info;

            // Add a pet
            cy.request({
                method: "POST",
                url: "https://petstore.swagger.io/v2/pet",
                body: petInfo
            })
        })   
    })
    after(() => {
        // Delete the pet id
        cy.request({
            method: 'DELETE',
            url: `https://petstore.swagger.io/v2/pet/${petInfo.id}`
        })
    })
  
    it("Update the added pet", () => {
        cy.request({
            method: "PUT",
            url: 'https://petstore.swagger.io/v2/pet',
            body: {
                "id": 77,
                "category": {
                  "id": 0,
                  "name": "rabbit"
                },
                "name": "bunny",
                "photoUrls": [
                  "url/yes"
                ],
                "tags": [
                  {
                    "id": 0,
                    "name": "bunnyyy"
                  }
                ],
                "status": "pending"
              },
            
         }).then((res) => {
            response = res;
         })
    })

         it("Validate status code is 200", () => {
            expect(response.status).to.eq(200)   
        })

    it("Validate response body", () => { 
         const { body } = response
         expect(body.id).to.eq(77)
         expect(body.category.id).to.eq(0) 
         expect(body.category.name).to.eq("rabbit")
         expect(body.name).to.eq("bunny")
         expect(body.photoUrls[0]).to.eq("url/yes")
         expect(body.tags[0].id).to.eq(0)
         expect(body.tags[0].name).to.eq("bunnyyy")
         expect(body.status).to.eq("pending")
})

    it("Validate response headers", () => { 
        const { headers } = response
        expect(headers["content-type"]).to.contain('application/json')
        expect(headers["connection"]).to.contain('keep-alive')
})
})
