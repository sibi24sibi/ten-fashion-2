const express=require("express");
const { contactPost } = require("../controllers/contactFormController");
const router=express.Router();

router.post("/contactForm",contactPost)

module.exports=router;