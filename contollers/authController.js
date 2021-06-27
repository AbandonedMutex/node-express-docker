const User = require("../models/userModel");

const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
    const {username, password} = req.body;
    
    try{
        const hasPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({username, password: hasPassword});

        req.session.user = newUser;
       res.status(201).json({
           status: "Success",
           data: {
               user: newUser
           }
       });
    }
    catch (e){
        res.status(400).json({
            status: "Fail",
            message: e.message
        });
    }
};

exports.getAllUsers = async (req, res) => {
    try{
       const users = await User.find();

       res.status(200).json({
           status: "Success",
           data: users
       });
    }
    catch (e){
        res.status(400).json({
            status: "Fail",
            message: e.message
        });
    }
};

exports.deleteUser = async (req, res) => {
    try{
       const user = await User.findByIdAndDelete(req.params.id);

       res.status(200).json({
           status: "Success"
       });
    }
    catch (e){
        res.status(400).json({
            status: "Fail",
            message: e.message
        });
    }
};

exports.login = async (req, res) => {
    const {username, password} = req.body;
    
    try{
       const user = await User.findOne({username});

       if(!user){
        res.status(404).json({
            status: "Fail",
            message: "User Not Found!"
        });
       }
       else{
        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch) {
            req.session.user = user;
         res.status(200).json({
             status: "Success",
             message: "Login Success!!"
         });
        }
        else {
         res.status(400).json({
             status: "Success",
             message: "Incorrect Username or Password!!"
         });
        }
       }
    }
    catch (e){
        res.status(400).json({
            status: "Fail",
            message: e.message
        });
    }
};