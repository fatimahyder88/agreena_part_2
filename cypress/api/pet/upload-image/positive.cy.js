describe('POST - /pet/{petId}/uploadImage - Positive Test', () => {
    let petInfo;
    let response;

    before(() => {

        cy.fixture('pet').then((info) => {
            petInfo = info;

            cy.request({
                method: "POST",
                url: "https://petstore.swagger.io/v2/pet",
                body: petInfo
    
            })
        })   
    })

    after(() => {
        cy.request({
            method: 'DELETE',
            url: `https://petstore.swagger.io/v2/pet/${petInfo.id}`
        })
    })
  

    it("Upload an image ", () => {
        cy.fixture("download.jpeg", 'binary')
        .then((file) => Cypress.Blob.binaryStringToBlob(file))
        .then((blob) => {

            var formdata = new FormData();
            formdata.append("file", blob, "download.jpeg");
            formdata.append('type', 'image/jpeg')

            cy.request({
                url: `https://petstore.swagger.io/v2/pet/${petInfo.id}/uploadImage`,
                method: "POST",
                headers: {
                    'content-type': 'multipart/form-data',
                    'accept': 'application/json'
                },
                body: formdata
            }).then((res) => {
                response = res;
            })
        })
    })

    it("Validate status code is 200", () => {
        expect(response.status).to.eq(200)   
     })

    it("Validate response headers", () => { 
        const { headers } = response
        expect(headers["content-type"]).to.contain('application/json')
        expect(headers["connection"]).to.contain('keep-alive')
    })
})
