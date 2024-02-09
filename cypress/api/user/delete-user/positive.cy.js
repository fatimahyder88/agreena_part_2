describe('DELETE - /user - Positive Test', () => {
    let response;
    let credentials;

    before(() => {
        // Get the data from the user file
        cy.fixture('user').then((creds) => {
            credentials = creds;

            // Create a user using POST request
            cy.request({
                method: "POST",
                url: `https://petstore.swagger.io/v2/user`,
                body: credentials,
    
            })

            // Create the request to delete the user and collect the response
            cy.request({
                method: 'DELETE',
                url: `https://petstore.swagger.io/v2/user/${credentials.username}`
            }).then((res) => {
                response = res;
            })
        }) 
    })

    it("Validate response status", () => { 
        const { status } = response
        expect(status).to.eq(200)
})

    it("Validate response body", () => { 
        const { body } = response
        expect(body.code).to.eq(200)
        expect(body.type).to.eq("unknown") 
        expect(body.message).to.eq(`${credentials.username}`)
})

    it("Validate response headers", () => { 
        const { headers } = response
        expect(headers["content-type"]).to.contain('application/json')
        expect(headers["connection"]).to.contain('keep-alive')
})

    })

