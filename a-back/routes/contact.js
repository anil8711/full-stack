const express = require("express");
const router = express.Router();
const { contactus, getContact, deleteContact, getContactById ,updateContact } = require("../Controller/contactcontroller");

router.post("/", contactus);
router.get("/", getContact);
router.get('/:id', getContactById)
router.delete('/:id', deleteContact)
router.put('/:id', updateContact)

module.exports = router;
