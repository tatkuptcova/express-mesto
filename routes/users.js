const router = require('express').Router();
const { getUserById, getUsers, getCurrentUser, updateUser, updateAvatar} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.get('/me', getCurrentUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;