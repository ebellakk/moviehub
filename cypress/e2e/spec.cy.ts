describe('moviehub spec', () => {
  beforeEach(() => {
    cy.intercept("GET", "*3/discover/movie*", {
      fixture: "discover.json",
    }).as("discover");

    cy.intercept("GET", "*3/search/movie*query=qwqwqwqw*page=1*", {
      fixture: "search_no_content.json",
    }).as("search_no_content");

    cy.intercept("GET", "*3/search/movie*query=batman*page=1*", {
      fixture: "search_batman_page1.json",
    }).as("search_batmanp1");

    cy.intercept("GET", "*3/search/movie*query=batman*page=2*", {
      fixture: "search_batman_page2.json",
    }).as("search_batmanp2");

    cy.intercept("GET", "*3/movie/268*", {
      fixture: "detail_movie_batman_268.json",
    }).as("detail_batman_268");

    cy.intercept("GET", "*3/movie/581997*", {
      fixture: "detail_movie_batman_581997.json",
    }).as("detail_batman_581997");

  });
  it ('searches for a movie and finds it', () => {
    cy.visit('http://localhost:3000');
    cy.get('#moviehub-search').type('batman');
    cy.get('#moviehub-search-button').click();
    cy.wait('@search_batmanp1');
    cy.get('#moviehub-movie-268');
  })

  it ('searches for a movie that does not exist and does not find it', () => {
    cy.visit('http://localhost:3000');
    cy.get('#moviehub-search').type('qwqwqwqw');
    cy.get('#moviehub-search-button').click();
    cy.get('#moviehub-no-content');
  })

  it ('searches for a movie, finds it and clicking on it will go to the detail page', () => {
    cy.visit('http://localhost:3000');
    cy.get('#moviehub-search').type('batman');
    cy.get('#moviehub-search-button').click();
    cy.get('#moviehub-movie-268').click();
    cy.contains('Batman (1989)');
  })

  it ('searches for a movie, finds it, details it, then goes back', () => {
    cy.visit('http://localhost:3000');
    cy.get('#moviehub-search').type('batman');
    cy.get('#moviehub-search-button').click();
    cy.wait('@search_batmanp1');
    cy.get('#moviehub-movie-268').click();
    cy.contains('Batman (1989)');
    cy.get('#moviehub-detail-back-button').click();
    cy.get('#moviehub-movie-268');
  })

  it ('searches for a movie, goes to the next page, finds it, details it and then goes back', () => {
    cy.visit('http://localhost:3000');
    cy.get('#moviehub-search').type('batman');
    cy.get('#moviehub-search-button').click();
    cy.get('#moviehub-pagination-forward').click();
    cy.wait('@search_batmanp2');
    cy.get('#moviehub-movie-581997').click();
    cy.contains('Batman vs Teenage Mutant Ninja Turtles');
    cy.get('#moviehub-detail-back-button').click();
    cy.wait('@search_batmanp1');
    cy.get('#moviehub-movie-581997');
  })
})