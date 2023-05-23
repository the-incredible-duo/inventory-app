const request = require("supertest");
const{ Sauce } = require("../models");
const app = require("../models");

describe("Routes", () => {
    let sauceId;

    beforeEach(async () => {
        const sauce = await Sauce.create({ name: "Test Item", image: "test-image.jpg" });   // Create a test item
        sauceId = sauce.id;
    });

    afterEach(async () => {
        await Sauce.destroy({ where: {} }); // Delete the test data after each test
    });

    test("GET /sauces should return a list of items", async () => {
        const response = await request(app).get("/sauces");
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].name).toBe("Test Item");
        expect(response.body[0].image).toBe("test-image.jpg");
    });

    test("PUT /sauces/:id should update the sauce", async () => {
        const updatedData = { name: "Updated item", image: "updated-image.jpg" };
        const response = await request(app)
            .put("/sauces/${sauceId}")
            .send(updatedData);

        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe(updatedData.name);
        expect(response.body.image).toBe(updatedData.image);
    });

    test("PUT /sauces/:id should return 404 is item does not exist", async () => {
        const nonExistentItemId = sauceId + 1;
        const updatedData = { name: "Updated item", image: "updated-image" };

        const response = await request(app)
            .put(`/sauces/${nonExistentItemId}`)
            .send(updatedData);

        expect(response.statusCode).toBe(404);
        expect(response.text).toBe("Item not found");
    });

})