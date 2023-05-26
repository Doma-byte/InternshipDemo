const express = require('express');
const router = express.Router();
const users = require("../controllers/users");

router.get('/',(req,res)=>{
    res.send("working")
})

router.post('/register',users.register);
router.post('/login',users.login);
router.delete('/delete/:userId',users.deleteUser);

module.exports = router;
