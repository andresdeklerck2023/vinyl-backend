import express from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const router = express.Router();

router.get(
  "/protected",
  ClerkExpressRequireAuth(),
  (req, res) => {
    res.json({
      message: "You are logged in!",
      userId: req.auth.userId,
    });
  }
);

export default router;
