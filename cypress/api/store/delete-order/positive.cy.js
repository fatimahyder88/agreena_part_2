describe('DELETE - /order/{orderId} - Positive Test', () => {
    let response;
    let orderInfo;

        before(() => {
            // Get the data from the orders file
            cy.fixture('orders').then((info) => {
                orderInfo = info;
                cy.request({
                    method: "POST",
                    url: "https://petstore.swagger.io/v2/store/order",
                    body: orderInfo
                })
            })  
        })
     
    it("Create the delete request and get the response", () => {
        cy.request({
            method: "DELETE",
            url: `https://petstore.swagger.io/v2/store/order/${orderInfo.id}`,

        }).then((res) => {
            response= res;
        })  
    })

    it("Validate response status" , () => {
        const { status } = response
        expect(status).to.eq(200)  
    })

    it("Validate response body", () => { 
         const { body } = response
         expect(body.code).to.eq(200)
         expect(body.type).to.eq("unknown") 
         expect(body.message).to.eq(`${orderInfo.id}`)
})

    it("Validate response headers", () => { 
        const { headers } = response
        expect(headers["content-type"]).to.contain('application/json')
        expect(headers["connection"]).to.contain('keep-alive')
})
})