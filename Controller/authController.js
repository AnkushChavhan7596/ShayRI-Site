const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const userRegisterModel = require("../src/models/userRegisterModel");

const nodemailer = require("nodemailer");




// ============== register get ===============
module.exports.register_get = (req, res)=>{
    res.render("register");
}




// ============== login get ===============
module.exports.login_get = (req, res)=>{
    res.render("login");
}




// ============== register post ===============
module.exports.register_post = async(req, res)=>{
    
     const { full_name , email , mobile, image, password, cpassword } = req.body;

    
    //  console.log(full_name);
     if(password === cpassword){
    
            // hashing the password
            const salt = await bcrypt.genSalt();

            const hashedPassword = await bcrypt.hash(password, salt);
            const hashedCpassword = await bcrypt.hash(cpassword, salt);

                    const userRegister = new userRegisterModel({
                        full_name : full_name,
                        email : email,
                        mobile : mobile,
                        image : image,
                        password : hashedPassword,
                        cpassword : hashedCpassword
                    });
            
                    if(!userRegister){
                        res.send("Something wents wrong");
                        throw Error("Something wents wrong");
                    } 

                    const alreadyEmail = await userRegisterModel.findOne({email : email});
                    const alreadyMobile = await userRegisterModel.findOne({mobile : mobile});

                    if(alreadyEmail) res.send("Email already exists");
                    
                    if(alreadyMobile) res.send("Mobile number already Exists");
                    
    
                    const postUser = await userRegister.save();

                    if(!postUser){
                        res.send("User not registered");
                        throw Error("User not registered");
                    } 
                    else{
                        console.log("User Register Successfully");

                        // sending the account confirmation mail
                        // email functionality
                        let transpoter = nodemailer.createTransport({
                            service: "gmail",
                            auth : {
                                user : "ankushchavhan7596@gmail.com",
                                pass : process.env.EMAIL_PASSWORD
                            },
                            tls : {
                                rejectUnauthorized : false,
                            }
                        });

                        let mailOptions = {
                            from : "ankushchavhan7596@gmail.com",
                            to : email,
                            subject : "ShayRI",
                            text : `Your account is successfully created on our ShayRI site,
                                    Thanks for creating the account`,
                        };

                        transpoter.sendMail(mailOptions, function(err, success){
                            if(err){
                                console.log(err)
                            }
                            else{
                                console.log("Email sent successfully");
                            }
                        });



                        res.redirect("/login");

                    } 
            
           
     }
    else{
        res.send("Password does not match");
        console.log("Password does not match");
    }

}




// ============== login post ===============
module.exports.login_post = async(req, res)=>{
    
    const { email , password } = req.body;
 
    const isEmail = await userRegisterModel.findOne({email : email});

    if(isEmail){
    
        //comparing the password
        const isPasswordMatched = await bcrypt.compare(password, isEmail.password);

        if(!isPasswordMatched){
             res.send("Wrong Password");
             throw Error("Wrong Password");
        }
        else{
            console.log("User login successfully");

            // generating the jwt token
            const token = jwt.sign({id : isEmail._id}, process.env.SECRETKEY);

            console.log(token);

            res.cookie("jwt", token);

            // sending the account confirmation mail
                        // email functionality
                        let transpoter = nodemailer.createTransport({
                            service: "gmail",
                            auth : {
                                user : "ankushchavhan7596@gmail.com",
                                pass : process.env.EMAIL_PASSWORD
                            },
                            tls : {
                                rejectUnauthorized : false,
                            }
                        });

                        let mailOptions = {
                            from : "ankushchavhan7596@gmail.com",
                            to : email,
                            subject : "ShayRI",
                            text : `You are successfully logged in to the ShayRI`,
                        };

                        transpoter.sendMail(mailOptions, function(err, success){
                            if(err){
                                console.log(err)
                            }
                            else{
                                console.log("Email sent successfully");
                            }
                        });


            res.redirect("/");
        }
       
     
    }
    else{
        res.redirect("/register");
    }
    
}




// ============== login get ===============
module.exports.logout = async(req, res)=>{

    // get the user for the email
    const token = await req.cookies.jwt;

    const getUserId = jwt.verify(token, process.env.SECRETKEY);

    if(!getUserId) throw Error("Something wents wrong");

    const user = await userRegisterModel.findById(getUserId.id);

    if(!user) throw Error("Something wents wrong");
    
    res.clearCookie("jwt");

    //  sending the account confirmation mail
    //                     email functionality
                        let transpoter = nodemailer.createTransport({
                            service: "gmail",
                            auth : {
                                user : "ankushchavhan7596@gmail.com",
                                pass : process.env.EMAIL_PASSWORD
                            },
                            tls : {
                                rejectUnauthorized : false,
                            }
                        });

                        let mailOptions = {
                            from : "ankushchavhan7596@gmail.com",
                            to : user.email,
                            subject : "ShayRI",
                            text : `You are successfully logged out to the ShayRI`,
                        };

                        transpoter.sendMail(mailOptions, function(err, success){
                            if(err){
                                console.log(err)
                            }
                            else{
                                console.log("Email sent successfully");
                            }
                        });


    res.redirect("/");
}
