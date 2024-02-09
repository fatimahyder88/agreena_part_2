describe('POST - /store/order - Positive Test', () => {
    let response;
    let orderInfo;

        before(() => {
            // Get the data from the orders file
            cy.fixture('orders').then((info) => {
                orderInfo = info;
                // Create an order
                cy.request({
                    method: "POST",
                    url: "https://petstore.swagger.io/v2/store/order",
                    body: orderInfo
                }).then((res) => {
                    response = res;
                })
            })   
    })

    after(() => {
        // Delete order
        cy.request({
            method: 'DELETE',
            url: `https://petstore.swagger.io/v2/store/order/${orderInfo.id}`
        })
    })

    it("Validate status code is 200", () => {
        expect(response.status).to.eq(200)   
    })

    it("Validate response body", () => { 
         const { body } = response
         expect(body.id).to.eq(88)
         expect(body.quantity).to.eq(1) 
         expect(body.shipDate).to.eq("2024-02-09T00:27:55.899+0000")
         expect(body.status).to.eq("placed")
})

    it("Validate response headers", () => { 
        const { headers } = response
        expect(headers["content-type"]).to.contain('application/json')
        expect(headers["connection"]).to.contain('keep-alive')
})
})