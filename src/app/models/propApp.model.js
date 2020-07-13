const sql = require("./db.js");

const PropertyDetail = function (detail) {
    // this.id = detail.id;
    this.address = detail.address;
    this.image=detail.image;
    this.desc=detail.desc;
    this.title=detail.title;
    this.created_on = new Date();
}

PropertyDetail.create = (newDetail, result) => {
    sql.query("INSERT INTO details SET ?", newDetail, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created task: ", { id: res.insertId, ...newDetail });
    result(null, { id: res.insertId, ...newDetail });
    })

}

PropertyDetail.findById = (detailId, result) => {
    sql.query(`SELECT * FROM details WHERE id = ${detailId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found task: ", res[0]);
        result(null, res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
    });
  };
  
PropertyDetail.getAll = result => {
    sql.query("SELECT * FROM details", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("detail: ", res);
      result(null, res);
    });
  };

  module.exports = PropertyDetail;