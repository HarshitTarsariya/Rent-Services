var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require("fs");
var path = require("path");
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');

var app = express();
require('dotenv').config()

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/RentServicesDB', { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => { console.log('Connected Database') },
    err => { console.log('Database connection error') }
);
mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({ extended: false }));

//Got Error Regarding maximum size exceeded for passing payload . Adding limit solved the problem!
app.use(bodyParser({ limit: '50mb' }));

//Parse Javascript Object to JSON specific
app.use(bodyParser.json());

app.use(bodyParser.raw());

//Allow request from other ports
app.use(cors());

const port = process.env.PORT || 3000;

const server = app.listen(port, function() {
    console.log('Started listening on port ' + port);
});

var User = require('./models/user');
var Product = require('./models/product');

app.post('/signup', (req, res) => {
    User.findOne({ email_id: req.body.email_id }, (err, data) => {
        if (err) return res.status(422).json({ message: 'Something went wrong' });
        else if (data) return res.status(500).json({ message: 'User already registered' });
        else {
            var user = new User({
                'name': req.body.name,
                'email_id': req.body.email_id,
                'mobile_no': req.body.mobile_no,
                'password': req.body.password,
            });
            user.save((err, data) => {
                if (err) return res.send("Something went wrong");
                else {
                    const token = getJwtForLinkVerification(data);
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'rentservicesnode@gmail.com',
                            pass: 'rentservices@123'
                        }
                    });
                    var link = 'http://localhost:4200/activate?token=';
                    var mailOptions = {
                        from: 'rentservicesnode@gmail.com',
                        to: user.email_id,
                        subject: 'Account Activation Required ' + user.name,
                        html: '<html><h3>Please verify your account by<a href="' + link + token + '"> click here</a></h3><br><h3>Thank You</h3><h3>-Admin</h3><h4>Rent Services</h4></html>'
                    }
                    transporter.sendMail(mailOptions, function(error, info) {
                        if (error)
                            return res.status(400).json({ message: "Something Went Wrong " });
                        else
                            return res.status(200).send({});
                    });
                }
            });
        }
    });
});

function getJwtForLinkVerification(data) {
    return jwt.sign({ _id: data._id, name: data.name, email_id: data.email_id, activated: data.activated }, process.env.SECRET_KEY);
}

function getJwtForSession(data) {
    return jwt.sign({ _id: data._id, name: data.name, email_id: data.email_id, activated: data.activated }, process.env.SECRET_KEY, { expiresIn: "20m" });
}

function getJwtForPassword(data) {
    return jwt.sign({ email_id: data }, process.env.SECRET_KEY, { expiresIn: "5m" });
}
app.get('/activate', (req, res) => {
    const token = req.headers.token;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY,
            (err, decoded) => {
                if (err || decoded == undefined) {
                    return res.status(500).json({ message: 'Incorrect or Expired link' });
                } else {
                    User.updateOne({ _id: decoded._id }, { $set: { isActivated: "Yes" } }, (err) => {
                        if (err) return res.send(err);
                        else return res.status(200).json({ message: 'Registration done successfully' });
                    });
                }
            }
        );

    } else {
        return res.send(500).json({ message: "Something Went Wrong in Email Verification" });
    }
});
app.post('/login', (req, res) => {
    User.findOne({ email_id: req.body.email_id, password: req.body.password }, (err, user) => {
        if (err) return res.status(422).json({ message: 'Something went wrong' });
        if (!user) return res.status(500).json({ message: 'Invalid Email or Password' });
        else if (user.isActivated == "No") return res.status(500).json({ message: 'Email not verified! Please verify by email sent by us during registration' });
        else return res.status(200).json({ 'token': getJwtForSession(user) });
    });
});

app.post('/resetPasswordSendLink', (req, res) => {
    User.findOne({ email_id: req.body.email_id }, (err, user) => {
        if (err) return res.status(422).json({ message: 'Something went wrong' });
        if (!user) return res.status(500).json({ message: 'Email Id not registered' });
        else {
            const token = getJwtForPassword(req.body.email_id);
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'rentservicesnode@gmail.com',
                    pass: 'rentservices@123'
                }
            });
            var link = 'http://localhost:4200/forget-password?token=';
            var mailOptions = {
                from: 'rentservicesnode@gmail.com',
                to: user.email_id,
                subject: 'Reset Password Request, ' + user.name,
                html: '<html><h3>Reset Request Link for password  by<a href="' + link + token + '"> click here</a></h3><br><h3><b>If you have not requested for change , Contact us</b></h3><br><h3>Thank You</h3><h3>-Admin</h3><h4>Rent Services</h4></html>'
            }
            transporter.sendMail(mailOptions, function(error, info) {
                if (error)
                    return res.status(400).json({ message: "Something Went Wrong " });
                else
                    return res.status(200).send({});
            });
        }
    });
});
app.post('/changePassword', (req, res) => {
    const token = req.body.token;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY,
            (err, decoded) => {
                if (err || decoded == undefined) {
                    return res.status(500).json({ message: 'Incorrect or Expired link' });
                } else {
                    User.updateOne({ email_id: decoded.email_id }, { $set: { password: req.body.password } }, (err) => {
                        if (err) return res.send(err);
                        else return res.status(200).json({ message: 'Password Changed Successfully' });
                    });
                }
            }
        );
    } else {
        return res.send(500).json({ message: "Something Went Wrong in Email verification ! Try again" });
    }
});
verifyJwtToken = (req, res, next) => {
    var token;
    if ('authorization' in req.headers) {
        token = req.headers['authorization'].split(' ')[1];
    }
    if (!token) {
        return res.status(403).json({ auth: false });
    } else {
        jwt.verify(token, process.env.SECRET_KEY,
            (err, decoded) => {
                if (err) {
                    return res.status(500).send({ auth: false });
                } else {
                    req._id = decoded._id;
                    next();
                }
            }
        )
    }
}
app.post('/addProduct', verifyJwtToken, (req, res) => {
    req.body.userUploaded = req._id;
    var prod = new Product({
        'name': req.body.productname,
        'description': req.body.description,
        'owner': req.body.userUploaded,
        'uploadeddate': req.body.dateUploaded,
        'address': req.body.addressOfProduct,
        'rentperday': req.body.rent,
        'deposits': req.body.deposits,
        'images': req.body.images
    });
    prod.save((err, data) => {
        if (err)
            res.status(422).json({ message: 'Something Went Wrong' });
        else
            res.status(200).json({ message: 'Product Added Successfully' });
    });
});