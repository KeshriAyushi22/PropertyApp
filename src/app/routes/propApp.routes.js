var multer = require("multer");
var upload = multer({ dest: __dirname + '/public/uploads/' });
var type = upload.array('file', 10);

module.exports = app =>{
    const propApp = require ("../controller/propApp.controller.js")
    // Create a new Customer
  app.post("/createProperty", type, propApp.create);

  // Retrieve all Customers
  app.get("/getProperty", propApp.findAll);

  // Retrieve a single Customer with customerId
   app.get("/getProperty/:id", propApp.findOne);


}