describe('GET - /logout - Positive Test', () => {
    let response;

    before(() => {
        // Create a request to log out all active sessions
        cy.request({
            method: "GET",
            url: "https://petstore.swagger.io/v2/user/logout",

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

