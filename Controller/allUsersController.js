const userRegisterModel = require("../src/models/userRegisterModel");


module.exports.all_users = async (req, res)=>{

    const allUsers = await userRegisterModel.find();

    if(!allUsers) throw Error("Something wents wrong");

    res.render("allUsers", {
        "users" : allUsers,
        "login" : true
    });

}