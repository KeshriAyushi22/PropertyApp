const sql = require("./db.js");

export const PropertyDetail = function (detail) {
    this.address = detail.address;
    this.desc=detail.desc;
    this.title=detail.title;
    this.created_on = new Date();
}

export const ImageDetail =function(imgDetail){
  this.name = imgDetail.name;
  this.created_on = new Date();
  this.imgData=imgDetail.imgData;
  this.details_id=imgDetail.details_id;
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

ImageDetail.create = (newDetail, result) => {
  sql.query("INSERT INTO imageDetails SET ?", newDetail, (err, res) => {
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

