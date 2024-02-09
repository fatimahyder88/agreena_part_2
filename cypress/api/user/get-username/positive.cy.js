describe('GET - /user/username - Positive Test', () => {
    let response;
    let credentials;

    before(() => {
        // Get the data from the users file
        cy.fixture('user').then((creds) => {
            credentials = creds;

            // Create a user
            cy.request({
                method: "POST",
                url: `https://petstore.swagger.io/v2/user`,
                body: credentials,
    
            })
            // Get the created user and collect the response
            cy.request({
                method: "GET",
                url: `https://petstore.swagger.io/v2/user/${credentials.username}`,
    
            }).then((res) => {
                response = res;
                console.log(response)
            })
        }) 
    })

    after(() =>{
        // Delete the created user
        cy.request({
            method: 'DELETE',
            url: `https://petstore.swagger.io/v2/user/${credentials.username}`
        })
    })

    it("Validate response status", () => { 
        const { status } = response
        expect(status).to.eq(200)
})

    it("Validate response body", () => { 
         const { body } = response
         expect(body.id).to.eq(92)
         expect(body.username).to.eq("jennaSmiles")
         expect(body.firstName).to.eq("Jenna")
         expect(body.lastName).to.eq("Smiles")
         expect(body.email).to.eq("jenna@gmail.com")
         expect(body.password).to.eq("string")
         expect(body.phone).to.eq("900044")
         expect(body.userStatus).to.eq(1)
})

    it("Validate response headers", () => { 
        const { headers } = response
        expect(headers["content-type"]).to.contain('application/json')
        expect(headers["connection"]).to.contain('keep-alive')
})
    })

