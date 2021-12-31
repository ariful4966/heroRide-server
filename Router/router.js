


const router = require('express').Router();

router.get('/', (req, res)=>{
    res.send('This is your home page')
})

router.post('/', (req, res)=>{
    res.send('Post is connected')
})

module.exports = router;