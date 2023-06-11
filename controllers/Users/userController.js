//step 8 : Import Models into Controllers --------------------------------

import { User } from "../../models/Users/userModel.js";

//step 9 : Import dependencies for Controllers --------------------------------

import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";

//step 10 : Implement controller components -----------------------------------------------------------

//createUser component --------------------------------------------------------

const createUser = async (req, res) => {
    
    //Get the email from req.body, and check if user exists already

    try {
        const findUser = await User.findOne({ email: req.body.email });
        if (findUser) {

            res.json({msg:"user already exists"});
        }

    //If user not found, create a new user

      const newUser = await User.create(req.body);
      res.json(newUser);

        } catch (error) {
        res.json({error:error});
        }
    };

//getUsers (all users) component --------------------------------

const getUsers = expressAsyncHandler(

    async (req, res) => {

        try {
            const users = await User.find().populate("userName");
            res.json(users);
            
        } catch (error) {
            throw new Error(error);
        }              
        }
)

//getUser (single use) component : we can find him by any of the fields of the UserModel (id, email, etc...)--------------------------------

const getUser = async (req, res) => {

    try {
        const {id} = req.params; //this gives an object! that why we destructure to get the id property value.
        const user = await User.findById(id);
        //we could also use .findOne({_id:id}) instead
        //Or use .findOne({name:name}) and modify the route in userRoute.js with router.get("/name", getUser);
        //Or const user = await User.findById(req.params.id);
        res.json(user);

    } catch (error) {
        res.json({error:error});
    } 
    };

//deleteUser --------------------------------

const deleteUser = async (req, res) => {

    try {
        const {id} = req.params;
        const deleteuser = await User.findByIdAndDelete(id);
        res.json(deleteuser);

    } catch (error) {
        res.json({error:error});
    } 
    };

//updateUser --------------------------------

const updateUser = async (req, res) => {

    try {

        const user = await User.findById(req.user._id);
        //if pwd is modified, update this block will run and then update the user
        if (user && req.body.password) {
            use.password = req.body.password;
            const updatedPassword = await user.save();
            res.json(updatedPassword);
        }
        //update user
        res.json(updateuser);

    } catch (error) {
        res.json({error:error});
    } 
    };


//loginUser module, component (or API) --------------------------------


const loginUser = async (req, res) => {

    //Get email and pwd from req.body, and check if user exists already
    
    const { email, password } = req.body;
    
        //check if user exists
    try {
        const findUser = await User.findOne({email:email}); // equiv. User.findOne({ email: email })

        // if user exists and his.password matches password then display success message
        if (findUser && await findUser.isPasswordMatched(password)) {
           
            //.sign() produces a JSON Web Token String
            //?user.field allows you to access user fields without having directly access to the user object, '?' finds it automatically
            
            //we send the user data plus the token (created by the authMw from the Bearer Token present in the authorization headers) to the frontend via the res object.
            res.json({
                _id: findUser?._id,
                firstname: findUser?.userName,
                email: findUser?.email,
                token: findUser?._id
              });
        }

        //If user not found, or/nor cpassword matches then display failure message

        else {
            res.json({message:"Invalid credentials"});
        }
        } catch (error) {
        res.json({error, message:"There is an error in the response.json"});
        }
    };


        //When we call the loginUser API to the frontend, we will get the token, username and email there (to the frontend). We will then store those data in a cookie or local storage.



//updatePassword module --------------------------------


//step 11 : Export Controller modules--------------------------------


export { createUser, getUser, getUsers, deleteUser, updateUser, loginUser }


