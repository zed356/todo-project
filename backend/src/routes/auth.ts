import express from "express";

const router = express.Router();

router.post("/register", (req, res, next) => {
  console.log(req.body);
  res.status(201).json(req.body);
});

export default router;
