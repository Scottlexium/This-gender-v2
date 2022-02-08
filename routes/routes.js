const {Router} = require('express');
const Controller = require('../controller/controller');
const router = Router();

router.get('/', Controller.homepage_get);
router.get('/create', Controller.create_get);
router.post('/create', Controller.create_post);
router.get('/post/:slug', Controller.read_get);
router.delete('/:id', Controller.delete_post);

module.exports = router;


