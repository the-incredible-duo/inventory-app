const fetch = require("node-fetch");
const { exec } = require("child_process");

const serverUrl = "http://localhost:3000";

describe("Inventory Tracking App", () => {
  let serverProcess;

  beforeAll((done) => {
    // Start the server before running the tests
    serverProcess = exec("node server.js", (error, stdout, stderr) => {
      if (error) {
        console.error("Failed to start the server:", error);
        done(error);
      } else {
        console.log("Server started successfully");
        done();
      }
    });
  });

  afterAll((done) => {
    // Stop the server after running the tests
    serverProcess.kill();
    done();
  });

  describe("Tier I: MVP Application", () => {
    test("should retrieve all items from the inventory", async () => {
      const response = await fetch(`${serverUrl}/items`);
      const items = await response.json();
      expect(response.status).toBe(200);
      expect(items.length).toBeGreaterThan(0);
    });

    test("should retrieve a specific item from the inventory", async () => {
      const responseAll = await fetch(`${serverUrl}/items`);
      const items = await responseAll.json();
      const itemId = items[0].id;

      const responseSingle = await fetch(`${serverUrl}/items/${itemId}`);
      const item = await responseSingle.json();
      expect(responseSingle.status).toBe(200);
      expect(item).toBeDefined();
    });
  });

  describe("Tier II: Adding an Item", () => {
    test("should add an item to the inventory", async () => {
      const newItem = {
        name: "New Item",
        description: "A newly added item",
        price: 19.99,
        category: "Miscellaneous",
        image: "new-item.jpg",
      };

      const response = await fetch(`${serverUrl}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      const createdItem = await response.json();
      expect(response.status).toBe(201);
      expect(createdItem.id).toBeDefined();
      expect(createdItem.name).toBe(newItem.name);
      // Add more assertions for other properties
    });
  });
  describe("Tier II: Adding an Item 2", () => {
    test("should render an add item form on the front-end", async () => {
      const response = await fetch(`${serverUrl}/add-item`);
      const body = await response.text();
      expect(response.status).toBe(200);
      expect(body.includes("<h1>Add Item</h1>")).toBe(true);
      expect(body.includes("<form id='addItemForm'")).toBe(true);
      // Add more assertions for form elements
    });

    test("should add an item to the inventory when the form is submitted", async () => {
      const newItem = {
        name: "New Item",
        description: "A newly added item",
        price: 19.99,
        category: "Miscellaneous",
        image: "new-item.jpg",
      };

      const response = await fetch(`${serverUrl}/add-item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      const createdItem = await response.json();
      expect(response.status).toBe(201);
      expect(createdItem.id).toBeDefined();
      expect(createdItem.name).toBe(newItem.name);
      // Add more assertions for other properties if needed
    });
  });

  describe("Tier III: Deleting an Item", () => {
    let itemIdToDelete;

    beforeAll(async () => {
      // Add an item to delete
      const newItem = {
        name: "Item to Delete",
        description: "An item to be deleted",
        price: 9.99,
        category: "Miscellaneous",
        image: "delete-item.jpg",
      };

      const response = await fetch(`${serverUrl}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      const createdItem = await response.json();
      itemIdToDelete = createdItem.id;
    });

    test("should delete an item from the inventory", async () => {
      const response = await fetch(`${serverUrl}/items/${itemIdToDelete}`, {
        method: "DELETE",
      });

      const data = await response.json();
      expect(response.status).toBe(200);
      expect(data.message).toBe("Item deleted successfully!");
    });
  });
  describe("Tier III: Deleting an Item2", () => {
    let itemIdToDelete;

    beforeAll(async () => {
      // Add an item to delete
      const newItem = {
        name: "Item to Delete",
        description: "An item to be deleted",
        price: 9.99,
        category: "Miscellaneous",
        image: "delete-item.jpg",
      };

      const response = await fetch(`${serverUrl}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      const createdItem = await response.json();
      itemIdToDelete = createdItem.id;
    });

    test("should render a delete button on the single item view", async () => {
      const response = await fetch(`${serverUrl}/items/${itemIdToDelete}`);
      const body = await response.text();
      expect(response.status).toBe(200);
      expect(
        body.includes('<button id="deleteButton">Delete Item</button>')
      ).toBe(true);
    });

    test("should delete an item from the inventory when the delete button is clicked", async () => {
      const response = await fetch(`${serverUrl}/items/${itemIdToDelete}`, {
        method: "DELETE",
      });

      const data = await response.json();
      expect(response.status).toBe(200);
      expect(data.message).toBe("Item deleted successfully!");
    });
  });

  describe("Tier IV: Updating an Item", () => {
    let itemIdToUpdate;

    beforeAll(async () => {
      // Add an item to update
      const newItem = {
        name: "Item to Update",
        description: "An item to be updated",
        price: 14.99,
        category: "Miscellaneous",
        image: "update-item.jpg",
      };

      const response = await fetch(`${serverUrl}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      const createdItem = await response.json();
      itemIdToUpdate = createdItem.id;
    });

    test("should update an item in the inventory", async () => {
      const updatedItem = {
        name: "Updated Item",
        description: "An item that has been updated",
        price: 24.99,
        category: "Miscellaneous",
        image: "updated-item.jpg",
      };

      const response = await fetch(`${serverUrl}/items/${itemIdToUpdate}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });

      const updatedData = await response.json();
      expect(response.status).toBe(200);
      expect(updatedData.message).toBe("Item updated successfully!");

      const responseSingle = await fetch(
        `${serverUrl}/items/${itemIdToUpdate}`
      );
      const item = await responseSingle.json();
      expect(responseSingle.status).toBe(200);
      expect(item.name).toBe(updatedItem.name);
      // Add more assertions for other updated properties if needed
    });
  });
});
describe("Tier IV: Updating an Item", () => {
  let itemIdToUpdate;

  beforeAll(async () => {
    // Add an item to update
    const newItem = {
      name: "Item to Update",
      description: "An item to be updated",
      price: 14.99,
      category: "Miscellaneous",
      image: "update-item.jpg",
    };

    const response = await fetch(`${serverUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });

    const createdItem = await response.json();
    itemIdToUpdate = createdItem.id;
  });

  test("should render an edit form on the single item view", async () => {
    const response = await fetch(`${serverUrl}/items/${itemIdToUpdate}/edit`);
    const body = await response.text();
    expect(response.status).toBe(200);
    expect(body.includes("<h1>Edit Item</h1>")).toBe(true);
    expect(body.includes("<form id='editItemForm'")).toBe(true);
    // Add more assertions for form elements if needed
  });

  test("should update an item in the inventory when the form is submitted", async () => {
    const updatedItem = {
      name: "Updated Item",
      description: "An item that has been updated",
      price: 24.99,
      category: "Miscellaneous",
      image: "updated-item.jpg",
    };

    const response = await fetch(`${serverUrl}/items/${itemIdToUpdate}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });

    const updatedData = await response.json();
    expect(response.status).toBe(200);
    expect(updatedData.message).toBe("Item updated successfully!");
    // Add more assertions if needed
  });
});
