// cypress/e2e/memory.cy.js
describe("Memory Game", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  it("renders the game board after clicking Start", () => {
    cy.get("#startBtn").click();
    cy.get(".cell").should("have.length", 8); // Easy mode = 8 tiles
  });

  it("counts attempts when two tiles are flipped", () => {
    cy.get("#startBtn").click();
    cy.get(".cell").first().click();
    cy.get(".cell").eq(1).click();
    cy.get("#attempts").should("contain", "1");
  });
});
