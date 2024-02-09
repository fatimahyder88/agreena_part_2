describe('POST - /user - Positive Test', () => {
    let response;
    let credentials;

    before(() => {
        cy.fixture('user').then((creds) => {
            credentials = creds;
            console.log(credentials)
            cy.request({
                method: "POST",
                url: "https://petstore.swagger.io/v2/user",
                body: credentials,
            }).then((res) => {
                response= res;
            })  
        })

    })

    after(() => {
        cy.request({
            method: 'DELETE',
            url: `https://petstore.swagger.io/v2/user/${credentials.username}`
        })
    })

    it("Validate status code is 200", () => {
        const { status } = response
        expect(status).to.eq(200)
    })

    it("Validate response body", () => { 
         const { body } = response
         expect(body.code).to.eq(200)
         expect(body).to.have.property("message")
         expect(body.type).to.eq("unknown")
    
})

    it("Validate response headers", () => { 
        const { headers } = response
        expect(headers["content-type"]).to.eq("application/json")
        expect(headers["connection"]).to.contain('keep-alive')
})
})