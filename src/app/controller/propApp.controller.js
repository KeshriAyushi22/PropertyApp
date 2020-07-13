const PropertyDetail = require("../models/propApp.model.js");


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }


    const details = new PropertyDetail({
        // id: req.body.id,
        desc: req.body.desc,
        title:req.body.title,
        address:req.body.address,
        image:req.body.img   //array of image
    });

    // Save Data in the database
    PropertyDetail.create(details, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Task."
            });
        else res.send(data);
    });
};

// Retrieve all Data from the database.
exports.findAll = (req, res) => {
    PropertyDetail.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving tasks."
            });
        else res.send(data);
    });
};

// Find a single Data with a customerId
exports.findOne = (req, res) => {
    PropertyDetail.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Details with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};







