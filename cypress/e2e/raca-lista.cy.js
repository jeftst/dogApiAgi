import { 
  expectSuccessResponse,
  expectBreedsListSchema
} from '../support/helpersApi';

describe('Dog API - Lista de Raças', () => {
  
  it('Status success', () => {
    cy.request('https://dog.ceo/api/breeds/list/all').then(response => {
      const body = expectSuccessResponse(response);
      expectBreedsListSchema(body);
    });
  });

  it('Consulta raças especificas', () => {
    cy.request('https://dog.ceo/api/breeds/list/all').then(response => {
      const body = response.body;
      expectBreedsListSchema(body);

      expect(body.message).to.have.property('boxer');
      expect(body.message).to.have.property('appenzeller');
      expect(body.message).to.have.property('clumber');
    });
  });

  it('Consulta array sub-raças quando existirem', () => {
    cy.request('https://dog.ceo/api/breeds/list/all').then(response => {
      const body = response.body;

      expect(body.message.hound).to.be.an('array');
      expect(body.message.hound.length).to.be.greaterThan(0);

      body.message.hound.forEach(subBreed => {
        expect(subBreed).to.be.a('string');
      });
    });
  });

  it('Consulta array vazio para raças sem sub-raças', () => {
    cy.request('https://dog.ceo/api/breeds/list/all').then(response => {
      const body = response.body;
      expect(body.message.dingo).to.be.an('array').and.have.length(0);
    });
  });

  it('Retorna Content-Type JSON', () => {
    cy.request('https://dog.ceo/api/breeds/list/all').then(response => {
      expect(response.headers['content-type']).to.include('application/json');
    });
  });
});
