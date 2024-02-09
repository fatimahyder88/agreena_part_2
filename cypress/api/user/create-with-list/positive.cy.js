describe('POST - /user/{username} - Positive Test', () => {
    let response;
    let credentials;

    before(() => {
        // Get the data from the multiple users file
        cy.fixture('multiple-users').then((creds) => {
            credentials = creds;
        })

    })

    after(() => {
        // Delete all of the created users
        credentials.forEach((user) => {
            cy.request({
                method: 'DELETE',
                url: `https://petstore.swagger.io/v2/user/${user.username}`
            })
        })
    })

    it("Login into the application ", () => {

        cy.request({
            method: "POST",
            url: "https://petstore.swagger.io/v2/user/createWithList",
            body: credentials

        }).then((res) => {
            response= res;
        }) 

    })

    it("Validate response status", () => { 
        const { status } = response
        expect(status).to.eq(200)
})

    it("Validate response body", () => { 
         const { body } = response
         expect(body.code).to.eq(200)
         expect(body.message).to.eq("ok")
         expect(body.type).to.eq("unknown")
})

    it("Validate response headers", () => { 
        const { headers } = response
        expect(headers["content-type"]).to.contain('application/json')
        expect(headers["connection"]).to.contain('keep-alive')
})
})