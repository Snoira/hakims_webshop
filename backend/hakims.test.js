

const sum = (a, b) => a + b;

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});


const request = require("supertest");
const app = require("./hakims_webshop/backend/app");
const product = require("./hakims_webshop/backend/app/models/product.model");

const dummyProdukt = {
  name: "Test Produkt",
  price: 1990,
  category: "Fantasy"
};

describe("Integration tests for Produkt API", () => {

  it("should get all Produkt", async () => {
    // Använd request för att göra ett GET-anrop till /produkt
    const response = await request(app).get("/products");
    expect(response.status).toBe(200);

    // Kontrollera att svarsbodyn är en array
    expect(response.body).toHaveProperty("length");
  });

});