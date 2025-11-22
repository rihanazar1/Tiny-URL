const express = require('express');
const router = express.Router();
const {
  createLink,
  getAllLinks,
  getLinkStats,
  deleteLink,
  getLinksByUser
} = require('../controllers/linkController');
const { authenticateUser } = require('../middleware/userAuth');


router.post('/', authenticateUser, createLink);
router.get('/', authenticateUser, getAllLinks);
router.get('/user/me', authenticateUser, getLinksByUser); 
router.get('/:code', authenticateUser, getLinkStats);
router.delete('/:code', authenticateUser, deleteLink);

module.exports = router;
