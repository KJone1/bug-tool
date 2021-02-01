const router = require("express").Router();
let Bug = require("../models/bug.model");

router.route("/").get((req, res) => {
  Bug.find()
    .then((Bug) => res.json(Bug))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const BugName = req.body.BugName;
  const BugDescription = req.body.BugDescription;
  const IsRepeatable = req.body.IsRepeatable;
  const Submitter = req.body.Submitter;
  const IsComplete = req.body.IsComplete;
  const Version = req.body.Version;

  const newBug = new Bug({
    BugName,
    BugDescription,
    Version,
    IsRepeatable,
    Submitter,
    IsComplete,
  });

  newBug
    .save()
    .then(() => res.json("Bug added!"))
    .catch((err) => res.status(400).json("==Error: " + err));
});

router.route("/:id").get((req, res) => {
  Bug.findById(req.params.id)
    .then((Bug) => res.json(Bug))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Bug.findByIdAndDelete(req.params.id)
    .then(() => res.json("Bug deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/complete/:id").post((req, res) => {
  Bug.findById(req.params.id)
    .then((Bug) => {
      Bug.BugName = req.body.BugName;
      Bug.BugDescription = req.body.BugDescription;
      Bug.IsRepeatable = req.body.IsRepeatable;
      Bug.Submitter = req.body.Submitter;
      Bug.IsComplete = true;

      Bug.save()
        .then(() => res.json("Bug completed!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/completed/:IsComplete").get((req, res) => {
  Bug.find({ IsComplete: req.params.IsComplete })
    .then((Bug) => res.json(Bug))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
