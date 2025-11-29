Testes Automatizados Dog API (Cypress)
# 🐶 Testes Automatizados – Dog API (Cypress)

Este projeto realiza testes automatizados da **Dog API**, focados em validações de resposta HTTP, schemas, acessibilidade de imagens e consistência dos dados retornados pela API.

O projeto segue boas práticas de automação, utilizando Cypress para testes de API, organização modular, helpers customizados e exibição de imagens durante a execução para facilitar análise visual.

---

## 🚀 Tecnologias Utilizadas
- **Cypress 13+**
- **JavaScript**
- **Chai Assertions**
- **Mochawesome**
- Helpers personalizados para validação de schema e respostas.

---

## 📂 Estrutura de Pastas


/cypress
├── e2e
│ ├── imagem-raca-aleatoria.cy.js
│ ├── raca-imagens.cy.js
│ └── raca-lista.cy.js
├── support
├── commands.js
└── helpersApi.js
results
cypress.config.js
README.md


---

## 🧪 Testes Implementados

### ✔️ **1. GET /breeds/image/random**
Arquivo: `imagem-raca-aleatoria.cy.js`

Validações:
- Retorno de imagem aleatória
- URLs diferentes em chamadas sequenciais
- Múltiplas imagens por quantidade (`/random/{count}`)
- Acessibilidade da URL da imagem
- Extração de raças de imagens retornadas
- Content-Type JSON

---

### ✔️ **2. GET /breed/{breed}/images**
Arquivo: `raca-imagens.cy.js`

Validações:
- Retorno de imagens por raça específica
- Exibição de imagens no runner
- Tratamento de raça inexistente (404)
- Sub-raça (`/german/shepherd`)
- Content-Type JSON

---

### ✔️ **3. GET /breeds/list/all**
Arquivo: `raca-lista.cy.js`

Validações:
- Estrutura da lista completa de raças
- Existência de raças específicas
- Sub-raças como arrays
- Arrays vazios onde aplicável
- Content-Type JSON

---

## ▶️ Como Executar

1. Instale dependências:
```bash
npm install

🚀 Instalação do Cypress
1️⃣ Instalar o Cypress
npm install cypress --save-dev

2️⃣ Abrir o Cypress pela primeira vez
npx cypress open

3️⃣ Executar testes em modo headless
npx cypress run

📊 Relatórios com Mochawesome

O Mochawesome é utilizado para gerar relatórios completos e visuais dos testes executados.

🧩 Instalação do Mochawesome
1️⃣ Instalar dependências
npm install mochawesome mochawesome-merge mochawesome-report-generator --save-dev

📝 Configuração no cypress.config.js

Adicione (ou complete) estes campos dentro do module.exports = defineConfig({ ... }):

reporter: "mochawesome",
reporterOptions: {
  reportDir: "cypress/reports",
  overwrite: false,
  html: false,
  json: true
},


Exemplo resumido:

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://dog.ceo/api",

    setupNodeEvents(on, config) {
      return config;
    },
  },

  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: false,
    json: true
  }
});



🧪 Scripts no package.json

Adicione ou substitua o bloco "scripts":

"scripts": {
  "cy:run": "cypress run",
  "cy:report": "mochawesome-merge cypress/reports/*.json > cypress/reports/report.json",
  "cy:generate": "marge cypress/reports/report.json -f report -o cypress/reports",
  "test": "npm run cy:run && npm run cy:report && npm run cy:generate"
}

▶️ Executar testes e gerar relatório automático

Execute:

npm cypress run --reporter mochawesome


Esse comando fará:

Rodar todos os testes em headless

Unificar todos os JSONs do Mochawesome

Gerar o HTML final

📄 Local do relatório final

Após a execução, acesse:

cypress/results/mochawesome....html


Esse arquivo é o relatório completo, organizado, clicável e visual, ideal para:

Apresentar resultados em reuniões

Anexar em pipelines CI/CD

Versionar no GitHub


Abra o Cypress:

npx cypress open


Execute em modo headless:

npx cypress run

🧩 Helpers Utilizados (helpersApi.js)

expectSuccessResponse()

expectRandomImageSchema()

expectRandomImagesSchema()

expectBreedImagesSchema()

expectBreedsListSchema()

expectValidImageUrl()

📸 Exibição de Imagens

O projeto utiliza comandos customizados (cy.displayImage()) que renderizam imagens no runner durante a execução dos testes.

📌 Autor

Projeto criado para fins educacionais e práticos de automação de APIs utilizando Cypress.


---

# 📝 **BDD – Formato Gherkin (Português)**  
Com base nos **3 arquivos fornecidos**, aqui estão todos os cenários escritos de forma limpa e profissional.

---

# 🐶 **BDD – GET /breeds/image/random**

```gherkin
Funcionalidade: Consulta imagem aleatória de raças de cachorro
  Como um consumidor da Dog API
  Quero consultar imagens aleatórias de cães
  Para validar consistência, acessibilidade das URLs e estrutura das respostas

  Cenário: Retornar uma imagem aleatória
    Quando realizo uma requisição GET para "/breeds/image/random"
    Então o status da resposta deve ser "success"
    E o corpo deve seguir o schema de imagem única
    E deve ser exibida a imagem retornada

  Cenário: Retornar URLs diferentes em consultas sequenciais
    Dado que realizo 3 consultas para "/breeds/image/random"
    Quando analiso as URLs retornadas
    Então pelo menos 2 URLs devem ser diferentes
    E as imagens devem ser exibidas

  Cenário: Retornar múltiplas imagens ao informar um count
    Quando realizo uma requisição GET para "/breeds/image/random/5"
    Então o status da resposta deve ser "success"
    E deve retornar exatamente 5 URLs de imagens válidas

  Cenário: Validar que a URL da imagem é acessível
    Quando realizo uma requisição GET para "/breeds/image/random"
    Então a URL retornada deve estar acessível
    E deve retornar uma imagem válida (jpeg, jpg, png ou gif)

  Cenário: Consultar diversas raças em múltiplas requisições
    Quando realizo 10 requisições para "/breeds/image/random"
    Então devo encontrar mais de uma raça diferente nas imagens retornadas

  Cenário: Validar Content-Type JSON
    Quando realizo uma requisição GET para "/breeds/image/random"
    Então o header "Content-Type" deve conter "application/json"

🐕 BDD – GET /breed/{breed}/images
Funcionalidade: Consultar imagens de uma raça específica
  Como um usuário da Dog API
  Quero listar imagens pertencentes a uma raça ou sub-raça
  Para validar a estrutura e acessibilidade das imagens

  Cenário: Consultar imagens da raça stbernard
    Quando realizo uma requisição GET para "/breed/stbernard/images"
    Então as primeiras 3 URLs devem ser acessíveis
    E cada imagem deve ser exibida no runner

  Cenário: Consultar imagens da raça redbone
    Quando realizo uma requisição GET para "/breed/redbone/images"
    Então o status da resposta deve ser "success"
    E o corpo deve seguir o schema de imagens por raça
    E as primeiras 5 imagens devem ser exibidas

  Cenário: Retornar erro 404 ao consultar raça inexistente
    Quando realizo uma requisição GET para "/breed/racatesteinexistente/images"
    Então o status HTTP deve ser 404
    E a mensagem deve indicar "Breed not found"

  Cenário: Consultar imagens de sub-raça
    Quando realizo uma requisição GET para "/breed/german/shepherd/images"
    Então o status deve ser "success"
    E todas as URLs devem conter "german" e "shepherd"

  Cenário: Retornar erro para sub-raça inexistente
    Quando realizo uma requisição GET para "/breed/testeracainexistente/testesubracainexistente/images"
    Então o status HTTP deve ser 404

  Cenário: Validar Content-Type JSON na consulta por raça
    Quando realizo uma requisição GET para "/breed/mastiff/bull/images"
    Então o header "Content-Type" deve conter "application/json"

🐾 BDD – GET /breeds/list/all
Funcionalidade: Consultar lista de todas as raças
  Como consumidor da Dog API
  Quero obter a lista completa de raças e sub-raças
  Para validar estrutura, tipos de dados e organização das informações

  Cenário: Retornar lista completa com status success
    Quando realizo uma requisição GET para "/breeds/list/all"
    Então o status da resposta deve ser "success"
    E o corpo deve seguir o schema de lista de raças

  Cenário: Validar existência de raças específicas
    Quando consulto a lista de raças
    Então deve existir a raça "boxer"
    E a raça "appenzeller"
    E a raça "clumber"

  Cenário: Validar sub-raças da raça hound
    Quando consulto a lista de raças
    Então "hound" deve possuir um array de sub-raças
    E o array deve ter pelo menos 1 item
    E cada item deve ser uma string

  Cenário: Validar que dingo não possui sub-raças
    Quando consulto a lista de raças
    Então a raça "dingo" deve possuir um array vazio

  Cenário: Validar Content-Type JSON
    Quando realizo uma requisição GET para "/breeds/list/all"
    Então o header "Content-Type" deve conter "application/json"