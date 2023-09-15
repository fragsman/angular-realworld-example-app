/// <reference types="cypress" />
import theArticle from "../fixtures/anArticle.json"

describe("Mocked API Tests", ()=>{

    beforeEach("Loguearse", ()=>{
        /* IMPORTANT: The intercept needs to be placed in the code before the page call the actual API 
        endpoint. In this case as soon as the page opens this endpoint will be called so I need to call 
        the mock before entering the website.
        */
        cy.intercept({method: "POST", path: "login"}).as("login")
        cy.loginToApplication()
    })

    it.only("Delete an article, but creating it through API", ()=>{
        cy.wait("@login").then(loginCall =>{
            var userToken = loginCall.response.body.user.token

            cy.request({
                url: "https://api.realworld.io/api/articles/",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token "+userToken
                },
                method: "POST",
                body: theArticle
            }).then( response =>{
                expect(response.status).to.eq(201)
            })

            cy.contains("h1",theArticle.article.title).click()
            cy.intercept("DELETE","https://api.realworld.io/api/articles/*").as("deleteArti")
            cy.contains("button","Delete Article").click()
            cy.wait("@deleteArti").then(xhr =>{
                expect(xhr.response.statusCode).to.eq(204)
            })
        })

        
    })

})