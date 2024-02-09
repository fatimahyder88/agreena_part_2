describe('GET - /login - Positive Test', () => {
    let response;
    let credentials;

    before(() => {
        // Get the data from the users file
        cy.fixture('user').then((creds) => {
            credentials = creds;
            cy.request({
                method: "POST",
                url: "https://petstore.swagger.io/v2/user",
                body: credentials
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
    it("Login into the application ", () => {
        cy.request({
            method: "GET",
            url: "https://petstore.swagger.io/v2/user/login",
            qs:{
                username: credentials.username,
                password: credentials.password,
            }

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
         expect(body.type).to.eq("unknown")
         expect(body.message).includes("logged in user session")
})

    it("Validate response headers", () => { 
        const { headers } = response
        expect(headers["content-type"]).to.contain('application/json')
        expect(headers["connection"]).to.contain('keep-alive')
})
})