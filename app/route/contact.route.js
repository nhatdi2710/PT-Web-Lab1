const express = require("express");
const cController = require("../controller/contact.controller");

const router = express.Router();

router.route("/")
    .get(cController.findAll)
    .post(cController.create)
    .delete(cController.deleteAll)
;

router.route("/favorite").get(cController.findAllFav);

router.route("/:id")
    .get(cController.findOne)
    .put(cController.update)
    .delete(cController.delete)
;

module.exports = router;