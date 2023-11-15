const cloudinary = require('cloudinary');
require("dotenv").config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDAPIKEY,
    api_secret: process.env.CLOUDINARYSECRET
})

module.exports = cloudinary;