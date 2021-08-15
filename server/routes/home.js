import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
  return res.json({
    message: "API is up and running",
  });
});

export { router as homeRouter };
