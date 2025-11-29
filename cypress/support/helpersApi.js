/// <reference types="cypress" />

export function expectBreedImagesSchema(body) {
  expect(body).to.have.all.keys('message', 'status');
  expect(body.status).to.eq('success');
  expectValidImageUrls(body.message);
}

export function expectValidBreedsObject(breeds) {
  expect(breeds).to.be.an('object');
  expect(Object.keys(breeds).length).to.be.greaterThan(0);

  Object.entries(breeds).forEach(([breedName, subBreeds]) => {
    expect(breedName).to.be.a('string').and.not.be.empty;
    expect(subBreeds).to.be.an('array');
  });
}

export function expectSuccessResponse(response) {
  expect(response.status).to.eq(200);
  expect(response.body).to.have.property('status', 'success');
  expect(response.body).to.have.property('message');
  return response.body;
}

export function expectBreedsListSchema(body) {
  expect(body).to.have.all.keys('message', 'status');
  expect(body.status).to.eq('success');
  expectValidBreedsObject(body.message);
}

export function expectValidImageUrl(url) {
  expect(url).to.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i);
}


export function expectRandomImagesSchema(body, expectedCount) {
  expect(body).to.have.all.keys('message', 'status');
  expect(body.status).to.eq('success');
  expect(body.message).to.have.length(expectedCount);
  expectValidImageUrls(body.message);
}

export function expectValidImageUrls(urls) {
  expect(urls.length).to.be.greaterThan(0);
  urls.forEach(url => expectValidImageUrl(url));
}

export function expectRandomImageSchema(body) {
  expect(body).to.have.all.keys('message', 'status');
  expect(body.status).to.eq('success');
  expectValidImageUrl(body.message);
}