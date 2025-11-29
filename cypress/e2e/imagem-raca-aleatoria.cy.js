import { 
  expectSuccessResponse,
  expectRandomImageSchema,
  expectRandomImagesSchema,
  expectValidImageUrl
} from '../support/helpersApi';

describe('Dog API - Imagem Aleatória', () => {

   it('Retorna uma imagem aleatória', () => {
    cy.request('https://dog.ceo/api/breeds/image/random').then(response => {
      const body = expectSuccessResponse(response); 
      expectRandomImageSchema(body); 

      cy.displayImage(body.message, 'Imagem Aleatória');
    });
  });

  it('Sequencia de consultas a URLs diferentes', () => {
    const urls = [];

    cy.request('https://dog.ceo/api/breeds/image/random').then(r => {
      const body = expectSuccessResponse(r);
      urls.push(body.message);
      cy.displayImage(body.message, 'Imagem 1');
    });
    
    cy.request('https://dog.ceo/api/breeds/image/random').then(r => {
      const body = expectSuccessResponse(r);
      urls.push(body.message);
      cy.displayImage(body.message, 'Imagem 2');
    });
    
    cy.request('https://dog.ceo/api/breeds/image/random').then(r => {
      const body = expectSuccessResponse(r);
      urls.push(body.message);
      cy.displayImage(body.message, 'Imagem 3');
    }).then(() => {
      const unique = new Set(urls);
      expect(unique.size).to.be.greaterThan(1, 'As URLs devem ser diferentes');
    });
  });

  it('Retorna múltiplas imagens com count', () => {
    const count = 5;

    cy.request(`https://dog.ceo/api/breeds/image/random/${count}`).then(response => {
      const body = expectSuccessResponse(response);
      expectRandomImagesSchema(body, count); 

      body.message.forEach((imageUrl, index) => {
        Cypress.$('body').append(`<img src="${imageUrl}" style="width: 150px; margin: 5px;">`);
      });
    });
  });

  it('Valida que a URL está acessível', () => {
    cy.request('https://dog.ceo/api/breeds/image/random').then(response => {
      const body = expectSuccessResponse(response);
      const url = body.message;

      expectValidImageUrl(url);

      cy.request(url).then(img => {
        expect(img.status).to.eq(200);
        expect(img.headers['content-type']).to.match(/image\/(jpeg|jpg|png|gif)/);
        
        cy.displayImage(url, 'Imagem Acessível');
      });
    });
  });

  it('Consulta raças diferentes', () => {
    const breeds = new Set();
    const iterations = 10;

    cy.get('body').then(($body) => {
      $body.append('<div id="breed-images-container"></div>');
    });

    Cypress._.times(iterations, () => {
      cy.request('https://dog.ceo/api/breeds/image/random').then(response => {
        const body = expectSuccessResponse(response); 
        const msg = body.message;

        const pathParts = msg.split('/');
        let breedName = pathParts[pathParts.length - 2]; 

        if (breedName.includes('-')) {
            breedName = breedName.split('-'); 
        }
        
        if (breedName) {
            breeds.add(breedName);
            Cypress.$('#breed-images-container').append(`<img src="${msg}" style="width: 100px; margin: 5px;">`);
        }
      });
    });

    cy.then(() => {
      cy.log(`Total de raças únicas encontradas: ${breeds.size}`);
      cy.log(`Lista de raças: ${Array.from(breeds).join(', ')}`);
      
      expect(breeds.size).to.be.greaterThan(1, 'Deve haver mais de uma raça diferente');
    });
  });


  it('Retorna Content-Type JSON', () => {
    cy.request('https://dog.ceo/api/breeds/image/random').then(response => {
      expect(response.headers['content-type']).to.include('application/json');
      expectSuccessResponse(response); 
    });
  });

});