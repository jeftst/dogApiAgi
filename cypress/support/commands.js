
Cypress.Commands.add('displayImage', (imageUrl, altText = 'Imagem da API') => {
  cy.get('body').then(($body) => {
    const imgId = `img-${Cypress._.uniqueId()}`; 

    // Criar o elemento img usando jQuery (Cypress.$)
    const $img = Cypress.$('<img />', {
        id: imgId,
        src: imageUrl,
        alt: altText,
        css: {
            maxWidth: '300px',
            maxHeight: '300px',
            margin: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
        },
    });

    // Adicionar o elemento ao DOM
    $body.append($img);

    // Agora, usamos um cy.get normal para selecionar o elemento e esperar ele carregar
    cy.get(`#${imgId}`)
      .should('be.visible')
      .should(($imgElement) => {
        // Esta asserção será repetida pelo Cypress até que passe (timeout padrão 4s)
        // Se naturalWidth for 0, o Cypress tenta novamente até a imagem carregar.
        expect($imgElement[0].naturalWidth, 'A imagem deve ter largura natural maior que 0').to.be.greaterThan(0);
      });
  });
});

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })