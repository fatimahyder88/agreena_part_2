describe('POST - /pet/{petId} - Positive Test', () => {
    let petInfo;
    let response;

    before(() => {

        cy.fixture('pet').then((info) => {
            petInfo = info;

            cy.request({
                method: "POST",
                url: "https://petstore.swagger.io/v2/pet",
                body: petInfo
            })
        })   
    })

    after(() => {
        // Delete the user
        cy.request({
            method: 'DELETE',
            url: `https://petstore.swagger.io/v2/pet/${petInfo.id}`
        })
    })

    context("Validate response from updating PET",()=> {
        
        it("Update the pet in store with form data", () => {
            // Update an existing pet
            cy.request({
                url: `https://petstore.swagger.io/v2/pet/${petInfo.id}`,
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'accept': 'application/json'
                },
                body: {
                    name: "yellow",
                    status: "pending"
                }
            }).then((res) => {
                response = res;
            })
        })

    it("Validate status code is 200", () => {
            expect(response.status).to.eq(200)   
     })

    it("Validate response body", () => { 
         const { body } = response
         expect(body).to.have.property("code")
         expect(body.code).to.eq(200)
    })

    it("Validate response headers", () => { 
        const { headers } = response
        expect(headers["content-type"]).to.contain('application/json')
    })
    })

    context("Validate the updated user",() => {

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

    it("Validate status code is 200", () => {
        expect(response.status).to.eq(200)   
     })

    it("Validate response body", () => { 
         const { body } = response
         expect(body.name).to.eq("yellow")
         expect(body.status).to.eq("pending")
    })

    it("Validate response headers", () => { 
        const { headers } = response
        expect(headers["content-type"]).to.contain('application/json')
        expect(headers["connection"]).to.contain('keep-alive')
    }) 
    })
})
