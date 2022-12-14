const { Router } = require("express");
const { handleError } = require("../middleware/handleError");
const { handleRequestTime } = require("../middleware/handleRequestTime");
const { handleLogging } = require("../middleware/handleLogging");
const { handleAccessCheck } = require("../middleware/handleAccessCheck");

const router = Router({ mergeParams: true });

router.all("/", [handleAccessCheck, handleRequestTime, handleLogging, handleError]);

router.use("/auth", require("./auth.routes"));
router.use("/comment", require("./comment.routes"));
router.use("/profession", require("./profession.routes"));
router.use("/quality", require("./quality.routes"));
router.use("/user", require("./user.routes"));

module.exports = router;
