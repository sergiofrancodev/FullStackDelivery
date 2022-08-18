const { Router } = require('express');
const { Search } = require('../controllers/search.controller');



const router = Router();


router.get('/:collections/:term', Search)



module.exports = router;