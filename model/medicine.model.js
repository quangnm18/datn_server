const db = require("../common/connect");

const Medicine = (medicine) => {
  this.sdk = medicine.skd;
  this.han_sdk = medicine.han_sdk;
  this.ten = medicine.ten;
  this.hoat_chat = medicine.hoat_chat;
  this.ham_luong = medicine.ham_luong;
  this.sqd = medicine.sqd;
  this.nam_cap = medicine.nam_cap;
  this.dot_cap = medicine.dot_cap;
  this.dang_bao_che = medicine.dang_bao_che;
  this.dong_goi = medicine.dong_goi;
  this.tieu_chuan = medicine.tieu_chuan;
  this.han_dung = medicine.han_dung;
  this.cty_dk = medicine.cty_dk;
  this.dchi_ctydk = medicine.dchi_ctydk;
  this.cty_sx = medicine.cty_sx;
  this.dchi_ctysx = medicine.dchi_ctysx;
  this.nhom_thuoc = medicine.nhom_thuoc;
  this.don_vi_duoc = medicine.don_vi_duoc;
};

Medicine.getMaxIdMed = function (callback) {
  db.query("SELECT MAX(id) as max_id FROM medicine", (err, res) => {
    if (err) {
      callback(err);
    } else callback(res);
  });
};

Medicine.getMaxIdGr = function (callback) {
  db.query("SELECT MAX(id) as max_id FROM group_medicine", (err, res) => {
    if (err) {
      callback(err);
    } else callback(res);
  });
};

Medicine.getMaxIdUnit = function (callback) {
  db.query("SELECT MAX(id) as max_id FROM unit_med", (err, res) => {
    if (err) {
      callback(err);
    } else callback(res);
  });
};

//Medicine

Medicine.getAllMedCurr = function (data, callback) {
  let group_id = data.group_id;
  if (group_id === null || group_id === undefined || group_id === "0") {
    group_id = null;
  }

  db.query(
    `CALL pagination_medicine(${Number.parseInt(data.sort_col)}, '${
      data.sort_type
    }', ${group_id}, ${
      data.search_value ? "'" + data.search_value + "'" : null
    }, ${data.isDeleted}, ${data.numRecord}, ${data.startRecord}, @${
      data.totalRecord
    })`,
    (err, res) => {
      if (err) {
        callback(err);
      } else callback(res);
    }
  );
};

Medicine.getSearchSell = function (data, callback) {
  db.query(
    `CALL get_search_sell(${data.branch_id}, '${data.q}')`,
    (err, response) => {
      if (err || response[0].length === 0) {
        callback(err);
      } else {
        response[0].forEach((element) => {
          element["sl_tong"] = Number.parseInt(element["sl_tong"]);
          element["soluong_lon"] = Number.parseInt(element["soluong_lon"]);
          element["so_luong_ban"] = element["so_luong_ban"]
            ? Number.parseInt(element["so_luong_ban"])
            : 0;
          element["so_luong_xuat"] = Number.parseInt(element["so_luong_xuat"])
            ? Number.parseInt(element["so_luong_xuat"])
            : 0;
          element["soluonglon_xuat"] = Number.parseInt(
            element["soluonglon_xuat"]
          )
            ? Number.parseInt(element["soluonglon_xuat"])
            : 0;
        });
        callback(response);
      }
    }
  );
};

Medicine.getSearchImport = function (data, callback) {
  db.query(`CALL get_search_ipt('${data.q}')`, (err, response) => {
    if (err || response[0].length === 0) {
      callback(err);
    } else {
      callback(response);
    }
  });
};

Medicine.getById = function (id, callback) {
  db.query(
    "SELECT medicine.han_dung, group_medicine.ten_nhom_thuoc, unit_med.description_unit FROM medicine LEFT JOIN group_medicine ON medicine.nhom_thuoc = group_medicine.id LEFT JOIN unit_med ON medicine.don_vi_duoc = unit_med.id WHERE medicine.id = ?",
    id,
    (err, response) => {
      if (err || response.length === 0) {
        callback(err);
      } else {
        callback(response);
      }
    }
  );
};

Medicine.create = function (data, callback) {
  db.query("INSERT INTO medicine SET ?", data, (err, response) => {
    if (err) {
      callback(err);
    } else callback({ id: response.insertId, ...data });
  });
};

Medicine.delete = function (id, callback) {
  db.query("DELETE FROM medicine WHERE ID = ?", id, (err, response) => {
    if (err) {
      callback(err);
    } else {
      callback(response);
    }
  });
};

Medicine.update = function (id, data, callback) {
  db.query(
    "UPDATE medicine SET sdk=?, han_sdk=?, ten=?, hoat_chat=?, ham_luong=?, sqd=?, nam_cap=?, dot_cap=?, dang_bao_che=?, dong_goi=?, han_dung=?, cty_dk=?, dchi_ctydk=?, cty_sx=?, dchi_ctysx=?, nhom_thuoc=?, don_vi_duoc=? WHERE ID=?",
    [
      data.sdk,
      data.han_sdk,
      data.ten,
      data.hoat_chat,
      data.ham_luong,
      data.sqd,
      data.nam_cap,
      data.dot_cap,
      data.dang_bao_che,
      data.dong_goi,
      data.han_dung,
      data.cty_dk,
      data.dchi_ctydk,
      data.cty_sx,
      data.dchi_ctysx,
      data.nhom_thuoc,
      data.don_vi_duoc,
      id,
    ],
    (err, response) => {
      if (err) {
        callback(err);
      } else {
        callback(data);
      }
    }
  );
};

Medicine.softDelete = function ({ data, user_id }, callback) {
  var currentDate = new Date();
  var datetime =
    currentDate.getFullYear() +
    "-" +
    (currentDate.getMonth() + 1) +
    "-" +
    currentDate.getDate() +
    " " +
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();

  var sql = "";

  data.forEach((med) => {
    sql += `UPDATE medicine SET isDeleted=1, deletedAt="${datetime}", deleted_by=${user_id} WHERE ID=${med.id};`;
  });

  db.query(sql, (err, response) => {
    if (err) {
      callback(err);
    } else {
      callback("OK");
    }
  });
};

Medicine.restoreMed = function (id, callback) {
  db.query(
    "UPDATE medicine SET isDeleted=? WHERE ID=?",
    [0, id],
    (err, response) => {
      if (err) {
        callback(err);
      } else {
        callback("OK");
      }
    }
  );
};

//unit

Medicine.getUnitMed = function (data, callback) {
  db.query(
    `CALL pagination_unitmed(${Number.parseInt(data.sort_col)}, '${
      data.sort_type
    }', ${data.search_value ? "'" + data.search_value + "'" : null}, ${
      data.isDeleted
    }, ${data.numRecord}, ${data.startRecord}, @${data.totalRecord})`,
    (err, res) => {
      if (err) {
        callback(err);
      } else callback(res);
    }
  );
};

Medicine.getUnitAll = function (callback) {
  db.query("SELECT * FROM unit_med WHERE isDeleted = 0", (err, res) => {
    if (err) {
      callback(err);
    } else callback(res);
  });
};

Medicine.addUnitMed = function (data, callback) {
  db.query("INSERT INTO unit_med SET ?", data, (err, response) => {
    if (err) {
      callback(err);
    } else callback({ id: response.insertId, ...data });
  });
};

Medicine.updateUnitMed = function (id, data, callback) {
  db.query(
    "UPDATE unit_med SET donvi_lon=?, donvi_tb=?, donvi_nho=?, unit_code=?, description_unit=? WHERE id=?",
    [
      data.donvi_lon,
      data.donvi_tb,
      data.donvi_nho,
      data.unit_code,
      data.description_unit,
      id,
    ],
    (err, response) => {
      if (err) {
        callback(err);
      } else callback(response);
    }
  );
};

Medicine.softDeleteUnitMed = function (data, callback) {
  var currentDate = new Date();
  var datetime =
    currentDate.getFullYear() +
    "-" +
    (currentDate.getMonth() + 1) +
    "-" +
    currentDate.getDate() +
    " " +
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();

  db.query(
    "UPDATE unit_med SET isDeleted=1, userId_del=?, deletedAt=? WHERE id=?",
    [data.userId_del, datetime, data.id],
    (err, response) => {
      if (err) {
        callback(err);
      } else callback(response);
    }
  );
};

Medicine.softDelMultiUnitMed = function (data, callback) {
  var currentDate = new Date();
  var datetime =
    currentDate.getFullYear() +
    "-" +
    (currentDate.getMonth() + 1) +
    "-" +
    currentDate.getDate() +
    " " +
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();

  let dbq = "";
  data.listSelected.forEach((item) => {
    dbq += `UPDATE unit_med SET isDeleted=1, deletedAt='${datetime}', userId_del=${data.user_id} WHERE id=${item.id};`;
  });
  db.query(dbq, (err, response) => {
    if (err) {
      callback(err);
    } else callback(response);
  });
};

Medicine.resUnitMed = function (id, callback) {
  db.query(
    "UPDATE unit_med SET isDeleted=0 WHERE id=?",
    id,
    (err, response) => {
      if (err) {
        callback(err);
      } else callback(response);
    }
  );
};

Medicine.hardDelUnit = function (id, callback) {
  db.query("DELETE FROM unit_med WHERE id = ?", id, (err, response) => {
    if (err) {
      callback(err);
    } else callback(response);
  });
};

//group Medicine
Medicine.getGroupMed = function (callback) {
  db.query(
    "SELECT * FROM group_medicine WHERE isDeleted = 0 ORDER BY ten_nhom_thuoc",
    (err, response) => {
      if (err) {
        callback(err);
      } else callback(response);
    }
  );
};

Medicine.hardDeleteGr = function (id, callback) {
  db.query("DELETE FROM group_medicine WHERE id = ?", id, (err, response) => {
    if (err) {
      callback(err);
    } else callback(response);
  });
};

Medicine.addGroupMed = function (data, callback) {
  db.query("INSERT INTO group_medicine SET ?", data, (err, response) => {
    if (err) {
      callback(err);
    } else callback({ id: response.insertId, ...data });
  });
};

Medicine.updateGroupMed = function (id, data, callback) {
  db.query(
    "UPDATE group_medicine SET ten_nhom_thuoc=?, description=? WHERE id=?",
    [data.ten_nhom_thuoc, data.description, id],
    (err, response) => {
      if (err) {
        callback(err);
      } else callback(response);
    }
  );
};

Medicine.softDeleteGrMed = function (data, callback) {
  var currentDate = new Date();
  var datetime =
    currentDate.getFullYear() +
    "-" +
    (currentDate.getMonth() + 1) +
    "-" +
    currentDate.getDate() +
    " " +
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();

  db.query(
    "UPDATE group_medicine SET isDeleted=1, deletedAt=?, userId_del=? WHERE id=?",
    [datetime, data.user_id, data.id],
    (err, response) => {
      if (err) {
        callback(err);
      } else callback(response);
    }
  );
};

Medicine.softDelMultiGrMed = function (data, callback) {
  var currentDate = new Date();
  var datetime =
    currentDate.getFullYear() +
    "-" +
    (currentDate.getMonth() + 1) +
    "-" +
    currentDate.getDate() +
    " " +
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();

  let dbq = "";
  data.listSelected.forEach((item) => {
    dbq += `UPDATE group_medicine SET isDeleted=1, deletedAt='${datetime}', userId_del=${data.user_id} WHERE id=${item.id};`;
  });
  db.query(dbq, (err, response) => {
    if (err) {
      callback(err);
    } else callback(response);
  });
};

Medicine.resGroupMed = function (id, callback) {
  db.query(
    "UPDATE group_medicine SET isDeleted=0 WHERE id=?",
    id,
    (err, response) => {
      if (err) {
        callback(err);
      } else callback(response);
    }
  );
};

Medicine.getGrMedCurr = function (data, callback) {
  db.query(
    `CALL pagination_groupmed(${Number.parseInt(data.sort_col)}, '${
      data.sort_type
    }', ${data.search_value ? "'" + data.search_value + "'" : null}, ${
      data.isDeleted
    }, ${data.numRecord}, ${data.startRecord}, @${data.totalRecord})`,
    (err, res) => {
      if (err) {
        callback(err);
      } else callback(res);
    }
  );
};

module.exports = Medicine;
