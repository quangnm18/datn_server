const db = require("../common/connect");
const jwt = require("jsonwebtoken");

const Authen = (auth) => {
  this.id = auth.id;
  this.process = auth.process;
  this.result = auth.result;
};

Authen.loginAccount = function (data, callback) {
  const sql =
    "SELECT r.ten_vai_tro, r.ma_vai_tro, b.id as id_chi_nhanh, b.name, b.branch_code, u.* FROM users u LEFT JOIN role_user r ON u.role_id = r.id LEFT JOIN branchs b ON u.branch_id = b.id WHERE u.user_name = ? AND u.password = ?";

  db.query(sql, [data.username, data.password], (err, response) => {
    if (err) {
      callback(err);
    }
    if (response.length > 0) {
      const id = response[0].ID;
      const name = response[0].Name;
      const role = response[0].ma_vai_tro;
      const ten_role = response[0].ten_vai_tro;
      const ma_chi_nhanh = response[0].branch_code;
      const ten_chi_nhanh = response[0].name;
      const id_chi_nhanh = response[0].id_chi_nhanh;
      const token = jwt.sign(
        { id, name, role, ten_role, ma_chi_nhanh, ten_chi_nhanh, id_chi_nhanh },
        "our-jsonwebtoken-secret-key",
        {
          expiresIn: "1d",
        }
      );
      callback({ token: token, status: "loginSuccess" });
    } else {
      callback({ status: "Tài khoản hoặc mật khẩu không hợp lệ!" });
    }
  });
};

// Authen.logOutAccount = function(callback) {

// }

// };

// Authen.getMedDue = function (callback) {
//   var currentDate = new Date();
//   var curr_day =
//     currentDate.getFullYear() * 12 * 30 +
//     (currentDate.getMonth() + 1) * 30 +
//     currentDate.getDate();

//   db.query(
//     "SELECT ipt_detail.han_dung FROM ipt_detail WHERE ipt_detail.isImported=1 AND ipt_detail.isDeletedDt=0",
//     (err, res) => {
//       if (err) {
//         callback(err);
//       } else callback(res);
//     }
//   );
// };

module.exports = Authen;
