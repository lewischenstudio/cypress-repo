# Reminder Questions

```html
<div class="form-group row">
  <label class="col-sm-3 label">Radios</label>
</div>
```

1. How to find <label> web element by class value "label"?

   `cy.get('.label')`

2. How to find <label> web element by entire class value?

   `cy.get('[class="col-sm-3 label"]')`

3. How to find <label> web element by html tag name "label"?

   `cy.get('label')`

4. How to find <label> web element as a child element of <div>?

   `cy.get('div').find('label')`

5. How to find <label> web element by text value?

   `cy.contains('Radios')`

6. Get the value of the class for <label> web element using "invoke()" command?

   `cy.get('label').invoke('attr', 'class')`

7. Get the <div>, save the context using "then()" and then click on "label"?

   `cy.get('div').then(element => {cy.wrap(element).find('label').click()})`

8. What syntax for the assertion of the text "Radios" is correct?

   `cy.get('label').should('contain', 'Radios')`

9. What syntax for the assertion of the class value "label" is correct?

   `cy.get('label').invoke('attr', 'class').then(class => {expect(class).to.contain('label')})`
