describe('/user - Positive Test', () => {
    let response;
    let responseTwo;
    let credentials;

    before(() => {
        // Get the data from the update-user file
        cy.fixture('update-user').then((creds) => {
            credentials = creds;

            // Create a user
            cy.request({
                method: "POST",
                url: "https://petstore.swagger.io/v2/user",
                body: credentials
            })
            // Get the created user
            cy.request({
                method: "GET",
                url: "https://petstore.swagger.io/v2/user/login",
                qs:{
                    username: credentials.username,
                    password: credentials.username,
                }
            })
            // Update the user using PUT request and collect response
            cy.request({
                method: "PUT",
                url: `https://petstore.swagger.io/v2/user/${credentials.username}`,
                body: {
                        "username":"beckyfirst",
                        "firstName":"young",
                        "lastName": "string",
                        "email": "becky@gmail.com",
                        "password": "string",
                        "phone": "079899",
                        "userStatus": 0
                }
            }).then((res) => {
                response = res;
            })
    })
    })

    after(() => {
        // Delete the user
        cy.request({
            method: 'DELETE',
            url: 'https://petstore.swagger.io/v2/user/beckyfirst'
        })
    })

    context("Verify the PUT response",() => {

        it("Validate staus code is 200", () => { 
            const { status } = response
            expect(status).to.eq(200)
    })
    
        it("Validate response headers", () => { 
            const { status } = response
             expect(status).to.eq(200)
    })
        it("Validate response headers", () => { 
            const { headers } = response
            expect(headers["content-type"]).to.contain('application/json')
    })
    
    })

    context("Verify the updated user",() => {

        before(() => {
            cy.request({
                method: "GET",
                url: 'https://petstore.swagger.io/v2/user/beckyfirst',
            }).then((res) => {
                responseTwo = res;
            })
        })

        it("Validate staus code is 200", () => { 
            const { status } = responseTwo
            expect(status).to.eq(200)
    })
    
        it("Validate response body", () => { 
         const { body } = responseTwo
         expect(body.username).to.eq("beckyfirst")
         expect(body.firstName).to.eq("young")
         expect(body.lastName).to.eq("string")
         expect(body.email).to.eq("becky@gmail.com")
         expect(body.password).to.eq("string")
         expect(body.phone).to.eq("079899")
         expect(body.userStatus).to.eq(0)
    })
        it("Validate response headers", () => { 
            const { headers } = responseTwo
            expect(headers["content-type"]).to.contain('application/json')
            expect(headers["connection"]).to.contain('keep-alive')
    })
    })
})

