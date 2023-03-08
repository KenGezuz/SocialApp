const express = require("express");
const router = express.Router();
const {getUser,getUserFriends,addRemoveFriend} = require("../controller/userController");


router.get("/:id",getUser);
router.get("/:id/friends",getUserFriends);
router.patch("/:id/:friendId",addRemoveFriend);


module.exports = router;

