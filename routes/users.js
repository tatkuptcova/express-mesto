const router = require('express').Router();
const { getUserById, getUsers, createUser} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById)
router.post('/', createUser);

module.exports = router;