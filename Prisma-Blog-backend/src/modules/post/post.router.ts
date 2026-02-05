import express, { Router } from "express";
import { postController } from "./post.controller";
import { auth, UserRole } from "../../middlewares/auth";
import { userInfo } from "node:os";
const router = express.Router();

router.get("/", postController.getAllPost);
router.post(
  "/",
  auth(UserRole.USER, UserRole.ADMIN),
  postController.createPost,
);
router.get(
  "/my-posts",
  auth(UserRole.USER, UserRole.ADMIN),
  postController.getMyPosts,
);
router.get("/:postId", postController.getPostById);
router.patch(
  "/:postId",
  auth(UserRole.ADMIN, UserRole.USER),
  postController.updatePost,
);
router.delete(
  "/:postId",
  auth(UserRole.ADMIN, UserRole.USER),
  postController.deletePost,
);

export const postRouter: Router = router;
