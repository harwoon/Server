import express from "express"
import { isAuth } from "../middleware/auth.mjs"
import * as postController from "../controller/posts.mjs"

const router = express.Router()

// 전체 포스트 가져오기
// http://127.0.0.1:8080/post (GET)
// http://127.0.0.1:8080/post?userid=apple (GET)
router.get("/",isAuth,postController.getPosts)

// 글번호에 대한 포스트 가져오기
// http://127.0.0.1:8080/6a4715cd25ffb36d42552d67 (GET)
router.get("/:postid",isAuth,postController.getPost)

// 포스트 쓰기
// http://127.0.0.1:8080/post
router.post("/", isAuth, postController.createPost) // 로그인한 사용자만 작성 가능하도록

// 포스트 수정하기

// 포스트 삭제하기

export default router