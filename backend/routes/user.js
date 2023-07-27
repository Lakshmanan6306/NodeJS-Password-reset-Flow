const express = require('express');
const router = express.Router();
const { userModel } = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

router.post('/', async (req, res, next) => {
    try {
        const { email, password, role } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = await userModel.create({
                email,
                role,
                password: hashedPassword
            });
            res.status(200).json({
                message: "User Created Successfully!",
                newUser
            })
        } else {
            res.status(400).json({
                message: "User Alreadt Exists"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

router.get('/:token', async (req, res) => {
    try {

        const token = jwt.decode(req.params.token)
        const exisitingUser = await userModel.findOne({ email: token.email })
        // const data = exisitingUser.data.user;
        // console.log(data)
        res.status(200).json({
            exisitingUser
            // message:'working'
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})


router.get('/forgotpassword/:email', async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.params.email }).select("-password");
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "test.10101.mail@gmail.com",
                pass: "jyfydjsltdatoglh"
            }
        })

        if (existingUser) {
            const token = jwt.sign({ email: existingUser.email, role: existingUser.role }, process.env.JWT_KEY, { expiresIn: "15m" });
            const link = `http://localhost:3000/changePassword/${token}`
            const mailOptions = {
                from:"test.10101.mail@gmail.com",
                to: existingUser.email,
                subject:"Click below Link to Reset your Password, it will expire in next 15 mins",
                text:`${link}`
            }
            transport.sendMail(mailOptions,(err,info)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log(info)
                }
            })
            res.status(200).json({
                // message: "Reset Password Link send to your Email",
                // existingUser,
                token
            })
        } else {
            res.status(400).json({
                message: "Email does not Exists"
            })
        }

        // console.log(req.params.email)

    } catch (error) {
        console.log(error)
        res.status(501).json({
            message: "Internal Server Error"
        })
    }
})

router.put('/changepassword/:token/:pass', async (req, res) => {
    try {
        const { token, pass } = req.params;
        // // const token = req.headers.authorization.split(' ')[1]
        const existingUser = await jwt.decode(token);
        const oldUser = await userModel.findOne({ email: existingUser.email });
        // console.log(oldUser)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pass, salt);
        oldUser.password = hashedPassword;
        oldUser.save()
        res.status(200).json({
            message: "Password Changed Succesfully"
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server Error",
            error
        })
    }
})

module.exports = router;