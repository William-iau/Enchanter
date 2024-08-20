describe('Login Test and Interact with Chatbot Panel', () => {
    it('should perform login, handle focus trap, open a new tab, and interact with the chatbot panel', () => {
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

        // Click the login button to navigate to the login page
        cy.get('[data-cy="login-button"]', { timeout: 10000 })
            .should('be.visible')
            .click()
            .then(() => {
                cy.log('Clicked navigation button to login page');
            });

        // Use cy.origin to interact with elements on the new domain
        cy.origin('https://dev-immfg7q8ihx56zyx.au.auth0.com', () => {
            // Ensure the login page is fully loaded
            cy.url().should('include', '/u/login').then(() => {
                cy.log('URL changed to login page');
            });

            // Manually handle focus and type in the username
            cy.get('#username').focus().type('william@iauconsultingservices.com').then(() => {
                cy.log('Entered email address');
            });

            // Manually handle focus and type in the password
            cy.get('#password').focus().type('Lagos123*').then(() => {
                cy.log('Entered password');
            });

            // Click the login button
            cy.get('button[type="submit"]').click().then(() => {
                cy.log('Login button clicked');
            });
        });

        // Wait for the final redirect to the chatbot panel page
        cy.url({ timeout: 60000 }).should('include', '/en/chatbot-panel').then(() => {
            cy.log('Successfully navigated to chatbot panel');

            // Simulate opening a new tab and visiting the same URL
            // This works by using `cy.visit` to visit the same URL in the current context
            cy.visit('https://mydev.igenchat.co/en/chatbot-panel', {
                onBeforeLoad(win) {
                    // Simulate the new tab behavior
                    win.open = cy.stub().as('openTab');
                }
            }).then(() => {
                cy.log('Simulated opening a new tab with the chatbot panel URL');
            });

            // Interact with elements on the chatbot panel page
            cy.get('.MuiButtonBase-root').click().then(() => {
                cy.log('Clicked on create chatbot button');
            });

            cy.wait(10000); // Wait for 10 seconds

            cy.get('[data-cy="website"]').click().then(() => {
                cy.log('Clicked on create by URL button');
            });

            cy.go('back').then(() => {
                cy.log('Returned to previous page');
            });

            cy.wait(10000); // Wait for 10 seconds

            cy.get('[data-cy="files"]').click().then(() => {
                cy.log('Clicked on create by uploading file button');
            });

            cy.go('back').then(() => {
                cy.log('Returned to previous page');
            });
        }).then(() => {
            cy.log('Finished interactions on the chatbot panel');
        });
    });
});
