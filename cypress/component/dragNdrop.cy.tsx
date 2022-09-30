import React from 'react'
import GridExample from "../../src/RangeSelection/poc";

import { mount } from '@cypress/react'


describe('Complete test of shift assignment and removal', () => {
  beforeEach(() => {
    // cy.setup()
    mount(<GridExample />)
  })

  describe('Basic cypress test that should pass', () => {
    it('Porsche should be in the table', () => {

      cy.get('div').contains('Porsche').should('be.visible')
    })
  })
  describe('Drag and select multiple cells', () => {
    it('Should select both cells containg Ford and Mondeo', () => {
      var MyDataTransfer = function () {};
      var dt = new MyDataTransfer ();
      dt.types = [];
    
      cy.get('div').contains('Ford').trigger("dragstart", {dataTransfer: dt});
      cy.get('div').contains('Mondeo').trigger("drop", {dataTransfer: dt});

      cy.get('div').contains('Ford').should('have.class', 'ag-cell-range-selected') //Ford gets selected
      cy.get('div').contains('Mondeo').should('have.class', 'ag-cell-range-selected') //Mouse never moves to select Mondeo
    })
  })
  // describe('Drag and select multiple cells', () => {
  //   it('Should select both cells containg Ford and Mondeo', () => {
  
  //     cy.get('div').contains('Ford')
  //     .trigger('mousedown')
  //     .trigger('mousemove', { which: 1, pageX: 200, pageY: 0 })
  //     .trigger('mouseup')
  
  //     cy.get('div').contains('Ford').should('have.class', 'ag-cell-range-selected') //Ford gets selected
  //     cy.get('div').contains('Mondeo').should('have.class', 'ag-cell-range-selected') //Mouse never moves to select Mondeo
  //   })
  // })
})
