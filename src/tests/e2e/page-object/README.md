# Page Object Model

Page Object Model is a design pattern used in test automation to organize source
code, improve maintainability and reusability of the code.

Note: there is no industry implemented standard

Core concept - every page of the web application has its own "class" with a
methods/functions responsible for operations on this page.

## Two Important Principles

DRY - Don't Repeat Yourself

KISS - Keep It Simple Stupid

## Two Useful Practices

Descriptive naming

|  Bad Naming  |      Good Naming       |
| :----------: | :--------------------: |
| `clkLgn(){}` | `clickLoginButton(){}` |

Avoid tiny methods

```js
clickLoginButton() {
    cy.contains('button', 'Log In').click()
}
```
