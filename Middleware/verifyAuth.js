const jwt = require("jsonwebtoken");

const userRegisterModel = require("../src/models/userRegisterModel");

const verifyToken = async(req, res, next)=>{

    try{

        const token = await req.cookies.jwt;

        if(token){
            const verifyUser = jwt.verify(token, "mynameisAnkushRajeshChavhanNerPersopant");

            if(verifyUser){
                console.log("User is verified");
                console.log(verifyUser);

                next();
            }
            else{
                console.log("User is not verified");
                res.redirect("/login");
            }

        }
        else{
            console.log("Token is invalid or missing");
            res.redirect("/login");
        }

    }catch(error){
        res.status(400).json({msg : error});
        console.log(error);
    }

}

module.exports = verifyToken;