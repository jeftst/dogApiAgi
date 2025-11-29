
import { 
  expectSuccessResponse,
  expectBreedImagesSchema
} from '../support/helpersApi'; 

describe('Dog API - Imagens por Raça', () => {
  

    it('Acesso URL e imagens exibidas', () => {
    cy.request('https://dog.ceo/api/breed/stbernard/images').then(response => {
      const urls = response.body.message.slice(0, 3); 

      urls.forEach(url => {
        cy.request(url).then(img => {
          expect(img.status).to.eq(200);
          expect(img.headers['content-type']).to.match(/image\/(jpeg|jpg|png|gif)/);
          
          cy.displayImage(url, 'Imagem de São Bernardo');
        });
      });
    });
  });

  it('Retorna imagens por raça válida (redbone) e exibe', () => {
    cy.request('https://dog.ceo/api/breed/redbone/images').then(response => {
      const body = expectSuccessResponse(response);
      expectBreedImagesSchema(body);
      
      const urlsToShow = body.message.slice(0, 5); 
      urlsToShow.forEach(url => {
        cy.displayImage(url, 'Imagem de redbone');
      });
    });
  });

    it('Retorna 404 para raça inexistente', () => {
    cy.request({ url: 'https://dog.ceo/api/breed/racatesteinexistente/images', failOnStatusCode: false })
      .then(response => {
        expect(response.status).to.eq(404);
        expect(response.body.status).to.eq('error');
        expect(response.body.message).to.include('Breed not found');
      });
  });

  it('Retorna imagens por sub-raça (german/shepherd) e exibe', () => {
    cy.request('https://dog.ceo/api/breed/german/shepherd/images').then(response => {
      const body = expectSuccessResponse(response);
      expectBreedImagesSchema(body);

      body.message.forEach(url => {
        expect(url).to.contain('german');
        expect(url).to.contain('shepherd');
      });

      const urlsToShow = body.message.slice(0, 5); 
      urlsToShow.forEach(url => {
        cy.displayImage(url, 'Imagem de Pastor Alemão'); 
      });
    });
  });

  it('Retorna 404 para sub-raça inexistente', () => {
    cy.request({ url: 'https://dog.ceo/api/breed/testeracainexistente/testesubracainexistente/images', failOnStatusCode: false })
      .then(response => {
        expect(response.status).to.eq(404);
        expect(response.body.status).to.eq('error');
      });
  });


  it('Retorna Content-Type JSON', () => {
    cy.request('https://dog.ceo/api/breed/mastiff/bull/images').then(response => {
      expect(response.headers['content-type']).to.include('application/json');
    });
  });
});