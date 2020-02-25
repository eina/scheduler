describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Tuesday").click();
  });

  it("should book an interview", () => {
    cy.get("[alt=Add]")
      .first()
      .click();
    // type student name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    // select interviewer
    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
});
