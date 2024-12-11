const router = require("express").Router();
const otherEmailsController = require("../controllers/otherEmails");

router.post("/sendFeedback", otherEmailsController.sendFeedbackToOwner);
router.post("/sendHelpForm", otherEmailsController.sendHelpFormToOwner);

module.exports = router;
