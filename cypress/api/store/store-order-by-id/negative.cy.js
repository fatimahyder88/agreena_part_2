describe('GET - /order/{orderId} - Negative Test', () => {
    let response;
    let orderInfo;

        before(() => {
            // Get the data from the orders file
            cy.fixture('orders').then((info) => {
                orderInfo = info;
            }) 
        })
     
    it("Get the ID that does not exist" , () => {
        cy.request({
            method: "GET",
            failOnStatusCode: false,
            url: `https://petstore.swagger.io/v2/store/order/${orderInfo.id}`,
        }).then((res) => {
            response = res;
        })
    })

    it("Validate status code is 404", () => {
        const { status } = response
        expect(status).to.eq(404)  
    })

    it("Validate response body", () => { 
         const { body } = response
         expect(body.code).to.eq(1)
         expect(body.type).to.eq("error") 
         expect(body.message).to.eq("Order not found")
})

    it("Validate response headers", () => { 
        const { headers } = response
        expect(headers["content-type"]).to.contain('application/json')
        expect(headers["connection"]).to.contain('keep-alive')
})

})