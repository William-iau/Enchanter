describe('Login Test and Verify Result with Multiple Redirects', () => {
    it('should navigate to the login page, perform login, handle multiple redirects, and verify result', () => {
        // Set the viewport to full screen
        cy.viewport(1920, 1080);

        // Visit the initial page with a custom User-Agent
        cy.visit('https://mydev.igenchat.co/en', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        }).then(() => {
            cy.log('Visited initial page with custom User-Agent');
        });

        // Wait for the login button to appear and then click it
        cy.get('[data-cy="login-button"]', { timeout: 10000 })
            .should('be.visible')
            .click()
            .then(() => {
                cy.log('Clicked navigation button to login page');
            });

        // Use cy.origin to interact with elements on the new domain after the redirect
        cy.origin('https://dev-immfg7q8ihx56zyx.au.auth0.com', () => {
            // The redirect should naturally bring the test into this domain

            // Ensure the login page is fully loaded
            cy.url().should('include', '/u/login').then(() => {
                cy.log('URL changed to login page');
            });

            // Perform login action
            cy.get('#username').type('william@iauconsultingservices.com');
            cy.get('#password').type('Lagos123*');
            cy.get('button[type="submit"]').click().then(() => {
                cy.log('Login button clicked');
            });
        });

        // Handle multiple redirects after login
        cy.url().should('include', '/auth/callback').then(() => {
            cy.log('Redirected to auth callback URL');
        });

        cy.url().should('include', '/auth/processing').then(() => {
            cy.log('Redirected to auth processing URL');
        });

        cy.url().should('include', '/en/chatbot-panel').then(() => {
            cy.log('Successfully navigated to chatbot panel');
        });

        // Interact with elements on the chatbot panel page
        cy.wait(10000); // Wait for 10 seconds

        // Click on the create a chatbot button
        cy.get('.MuiButtonBase-root').click().then(() => {
            cy.log('Clicked on create chatbot button');
        });

        cy.wait(10000); // Wait for 10 seconds

        // Click on the create by URL button
        cy.get('[data-cy="website"]').click().then(() => {
            cy.log('Clicked on create by URL button');
        });

        cy.go('back').then(() => {
            cy.log('Returned to previous page');
        });

        cy.wait(10000); // Wait for 10 seconds

        // Click on the create by uploading file button
        cy.get('[data-cy="files"]').click().then(() => {
            cy.log('Clicked on create by uploading file button');
        });

        cy.go('back').then(() => {
            cy.log('Returned to previous page');
        });
    });
});
