let email = 'prakiai@gmail.com'
let password = '123456'
let title1 = 'Responsi Praktikum IAI'
let content1 = 'Presentasi Project Akhir Web dan Testing'
let title2 = 'Melakukan Testing'
let content2 = 'Testing dengan menggunakan cypress pada aplikasi react'
let titleUpdate = 'Ini title yang berubah'
let contentUpdate = 'Ini content yang berubah'

describe('Register test', () => {
    it('Visits App', () => {
      cy.visit('http://localhost:3000/')
    })

    it('Input email', () => {
        // Tunggu sampai benar-benar dialihkan
        cy.wait(2500)

        // Mengisi kolom email
        cy.get('input[id="email"]')
        .type(email)
        .should('have.value', email)
    })

    it('Input password', () => {
        // Mengisi kolom password
        cy.get('input[id="password"]')
        .type(password)
        .should('have.value', password)
    })

    it('Click Register', () => {
        // Klik tombol register untuk masuk
        cy.get('.btn').contains('Register')
        .click()

        // Tunggu sampai benar-benar dialihkan ke beranda
        cy.wait(2500)
        cy.url().should('eq', 'http://localhost:3000/')
    })

    it('Go To Login', () => {
        cy.get('.btn').contains('Go to Login Page')
        .click({force: true})
        
        cy.wait(2500)
        cy.url().should('eq', 'http://localhost:3000/login')
    })

  })


describe('Login test', () => {
    it('Visits App', () => {
      cy.visit('http://localhost:3000/login')
    })

    it('Input email', () => {
        // Mengisi kolom email
        cy.get('input[id="email"]')
        .type(email)
        .should('have.value', email)
    })

    it('Input password', () => {
        // Mengisi kolom password
        cy.get('input[id="password"]')
        .type(password)
        .should('have.value', password)
    })

    it('Click Login dan CRUD', () => {
//LOGIN        
        // Klik tombol login, dan seharusnya halaman berpindah menjadi /home
        cy.get('.btn')
        .click()

        // Tunggu sampai benar-benar dialihkan ke beranda
        cy.wait(2500)
        cy.url().should('eq', 'http://localhost:3000/dashboard')
    
        // Tunggu sampai benar-benar dialihkan
        cy.wait(2500)

//CREATE        
        // Mengisi kolom title
        cy.get('.input-title')
        .type(title1)
        .should('have.value', title1)
   
        // Mengisi kolom content
        cy.get('.input-content')
        .type(content1)
        .should('have.value', content1)
    
        // Klik tombol simpan
        cy.get('.save-btn')
        .click()

        // Tunggu sampai data bertambah
        cy.wait(2500)
        cy.url().should('eq', 'http://localhost:3000/dashboard')

        cy.get('.input-title').first().clear()
        .type(title2)
        .should('have.value', title2)
   
        // Mengisi kolom content
        cy.get('.input-content').first().clear()
        .type(content2)
        .should('have.value', content2)
    
        // Klik tombol simpan
        cy.get('.save-btn')
        .click()

        // Tunggu sampai data bertambah
        cy.wait(2500)
        cy.url().should('eq', 'http://localhost:3000/dashboard')

//UPDATE
        cy.get('.card-content').first()
        .click()

        // Mengisi kolom title
        cy.get('.input-title')
        .clear()
        .type(titleUpdate)
        .should('have.value', titleUpdate)
   
        // Mengisi kolom content
        cy.get('.input-content')
        .clear()
        .type(contentUpdate)
        .should('have.value', contentUpdate)
    
        // Klik tombol update
        cy.get('.save-btn').last()
        .click()

        // Tunggu sampai data berubah
        cy.wait(2500)
        cy.url().should('eq', 'http://localhost:3000/dashboard')

//DELETE
        //click delete and finish
        cy.get('.delete-btn').last()
        .click()

        // Tunggu sampai data berubah
        cy.wait(2500)
        cy.url().should('eq', 'http://localhost:3000/dashboard')
    })

    
//KELUAR
    it('Klik Logout', () => {
        cy.get('.btn-out').click()
        cy.wait(2500)
        cy.url().should('eq', 'http://localhost:3000/login')
    })

  })