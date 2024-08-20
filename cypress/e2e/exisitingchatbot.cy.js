describe('Login and Navigate Through Pages', () => {
    it('should log in, navigate to the chatbot panel, and interact with elements', () => {
        // Set the viewport to full screen
        cy.viewport(1920, 1080);

        // Visit the initial page with a custom User-Agent
        cy.visit('https://mydev.igenchat.co/en', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        // Click the element to go to the login page
        cy.get('[data-cy="login-button"]').click();

        // Use cy.origin to interact with elements on the new domain for login
        cy.origin('https://dev-immfg7q8ihx56zyx.au.auth0.com', () => {
            // Ensure the login page is fully loaded
            cy.url().should('include', '/u/login').then(() => {
                cy.log('URL changed to login page');
            });

            // Manually handle focus and type in the username
            cy.get('#username').focus().type('Rohitraja95@gmail.com').then(() => {
                cy.log('Entered email address');
            });

            // Manually handle focus and type in the password
            cy.get('#password').focus().type('Okcool@123').then(() => {
                cy.log('Entered password');
            });

            // Click the login button
            cy.get('button[type="submit"]').click().then(() => {
                cy.log('Login button clicked');
            });
        });

        // Wait for the chatbot panel page to load
        cy.url({ timeout: 60000 }).should('include', '/en/chatbot-panel').then(() => {
            cy.log('Successfully navigated to chatbot panel');
        });

        // Click on the "View Chatbot" button and wait for the page to load
        cy.get('button.MuiButtonBase-root').contains('View Chatbot').click().then(() => {
            cy.log('Clicked on View Chatbot button');
        });

        // Wait for the new page to load successfully
        cy.url({ timeout: 60000 }).should('include', '/expected-chatbot-view-page').then(() => {
            cy.log('Chatbot view page loaded');
        });

        // Click on the chatlogs element and wait for the page to load
        cy.get('[data-cy="chatlogs"]').click().then(() => {
            cy.log('Clicked on Chatlogs');
        });

        cy.url({ timeout: 60000 }).should('include', '/chatlogs').then(() => {
            cy.log('Chatlogs page loaded');
        });

        // Click on the analytics element and wait for the page to load
        cy.get('[data-cy="analytics"]').click().then(() => {
            cy.log('Clicked on Analytics');
        });

        cy.url({ timeout: 60000 }).should('include', '/analytics').then(() => {
            cy.log('Analytics page loaded');
        });

        // Click on the settings element and wait for the page to load
        cy.get('[data-cy="settings"]').click().then(() => {
            cy.log('Clicked on Settings');
        });

        cy.url({ timeout: 60000 }).should('include', '/settings').then(() => {
            cy.log('Settings page loaded');
        });

        // Click on the sources element and wait for the page to load
        cy.get('[data-cy="sources"]').click().then(() => {
            cy.log('Clicked on Sources');
        });

        cy.url({ timeout: 60000 }).should('include', '/sources').then(() => {
            cy.log('Sources page loaded');
        });
    });
});
