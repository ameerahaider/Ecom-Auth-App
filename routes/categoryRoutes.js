const express = require('express');
const categoryController = require('../controllers/categoryController');
const jwt = require('jsonwebtoken');

const router = express.Router();

const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        jwt.verify(token, 'secretKey', (err,decoded) => {
            if(err) {
                console.error('Token verification failed:', err);
                res.sendStatus(403);
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}

const checkRole = (role) => async (req,res,next) => {
    try{
        if(req.user.role !== role){
            return res.status(403).json({message: 'Unauthorized' }); 
        }
        else{
            console.log("Auhthoirzed")
            next();
        }
    }
    catch(err){
        return res.status(401).json({message: 'Unauthorized' }); 
    }
}

router.post('/addCategory', checkToken, checkRole('superadmin'), categoryController.createCategory);
router.get('/getCategories', checkToken, categoryController.getCategories);

module.exports = router;
