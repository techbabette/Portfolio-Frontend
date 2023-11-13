import TextArray from './TextArray.vue'
beforeEach(() => {
  cy.wrap(["Javascript", "PHP"]).as("initialValues");
})
describe('<TextArray />', () => {
  it("Shows values as buttons", function() {
    cy.mount(TextArray, {
      propsData: {
        value : this.initialValues
      }
    })

    for(let val of this.initialValues){
      cy.get(".btn.btn-info").contains(val).should("be.visible");
    }
  })
  it("Joins passed values into the input field", function() {
    cy.mount(TextArray, {
      propsData: {
        value : this.initialValues
      }
    })

    cy.get(`[id*=arrayField]`).should("have.value", this.initialValues.join(","));
  })
  it("Displays new value as button", function(){
    cy.mount(TextArray, {
      propsData: {
        value : this.initialValues
      }
    })

    cy.get(`[id*=arrayField]`).type(",Vue");

    cy.get(".btn.btn-info").contains("Vue").should("be.visible");
  })
  it("Removes value on button click", function(){
    cy.mount(TextArray, {
      propsData: {
        value : this.initialValues
      }
    })

    cy.get(".btn.btn-info").contains(this.initialValues[0]).click();
    cy.get(`[id*=arrayField]`).should("have.value", this.initialValues.slice(1).join(","));
    cy.get(".btn.btn-info").contains(this.initialValues[0]).should("not.exist");
  })
})