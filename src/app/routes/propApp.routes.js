module.exports = app =>{
    const propApp = require ("../controller/propApp.controller.js")
    // Create a new Customer
  app.post("/createProperty", propApp.create);

  // Retrieve all Customers
  app.get("/getProperty", propApp.findAll);

  // Retrieve a single Customer with customerId
   app.get("/getProperty/:id", propApp.findOne);


}