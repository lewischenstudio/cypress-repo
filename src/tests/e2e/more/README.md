## More Features

### Table of Contents

- [NPM Scripts](#npm-scripts)
- [Environment Variables](#environment-variables)
- [Retry Tests](#retry-tets)
- [Test Data Generator](#test-data-generator)
- [Data Driven Testing](#)
- [Multiple Test Reports](#multiple-test-reports)
- [Cypress with Docker Container](#cypress-with-docker-container)
- [Reusing Logged-in State](#reusing-logged-in-state)
- [Test Tags](#test-tags)

## NPM Scripts

Check [package.json](/src/tests/e2e/more/package.json) for some examples.

## Environment Variables

- Check [cypress.config.ts](/cypress.config.ts) configurations.
- Check [.env.example](/.env.example) for environment variables.
- Check [commands.ts](/cypress/support/commands.ts),
  [e2e.ts](/cypress/support/e2e.ts) and
  [index.d.ts](/cypress/support/index.d.ts) for setup files.
- Using command line

  ```bash
  npx cypress open --env username="hello@test.com"
  ```

## Retry Tets

## Test Data Generator

```bash
npm i @faker-js/faker
```

## Data Driven Testing

[dataDrivenTesting.api-cy.ts](/src/tests/e2e/more/dataDrivenTesting.api-cy.ts)

## Multiple Test Reports

https://docs.cypress.io/app/tooling/reporters#Multiple-reporters

```bash
npm i -D cypress-mochawesome-reporter cypress-multi-reporters junit-merge mocha-junit-reporter
```

```json
{
  "scripts": {
    "junit:merge": "npx junit-merge -d 'cypress/results' -o 'cypress/results/results.xml'"
  }
}
```

## Cypress with Docker Container

- [Dockerfile](/Dockerfile)
- [docker-compose.yml](/docker-compose.yml)
- [.dockerignore](/.dockerignore)

### Docker Build Image

```bash
docker build cypress-tests-image .
```

### Docker Run Container with Env Variables

```bash
docker run --env-file .env cypress-tests-image
```

### Docker Compose Build and Run

```bash
docker-compose build
docker-compose up
```

## Reusing Logged-in State

[reusingLoggedInState.api-cy.ts](/src/tests/e2e/more/reusingLoggedInState.api-cy.ts)

## Test Tags

https://www.npmjs.com/package/@cypress/grep

```bash
npm i @cypress/grep -D
```

Run tests with @testTags

```bash
npx cypress run --expose grepTags="@testTags"
```

Only run specs containing tests tagged @smoke:

```bash
npx cypress run --expose grepTags="@smoke",grepFilterSpecs=true
```
