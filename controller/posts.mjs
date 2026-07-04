import express from "express"
import * as postRepository from "../data/posts.mjs"
import { findById } from "../data/auth.mjs"


// 포스트를 작성하는 함수
export async function createPost(req, res) {
    const { text } = req.body
    const post = await postRepository.create(text, req.id)
    res.status(201).json(post)

}

// 모든 포스트를 가져오는 함수
export async function getPosts(req, res) {
    // post?userid=apple 라서 userid를 query로 받아옴
    const userid = req.query.userid
    const data = await (userid ? postRepository.getAllByUserid(userid) : postRepository.getAll())
    res.status(200).json(data)
}

// id로 포스트를 가져오는 함수
export async function getPost(req, res) {
    // post/:postid 라서 params로 postid 받아옴
    const postid = req.params.postid
    const post = await postRepository.getById(postid)

    if (post) {
        res.status(200).json(post)
    } else {
        res.status(404).json({ message: `${postid}의 포스트가 없습니다` })
    }
}

// 포스트를 변경하는 함수
export async function updatePost(req, res) {
    const postid = req.params.postid
    const text = req.body.text
    const post = await postRepository.getById(postid)

    if (!post) {
        return res.status(404).json({ message: `${postid}의 포스트가 없습니다` })
    }
    if (post.idx !== req.id) {
        return res.sendStatus(403)
    }

    const updated = await postRepository.update(postid, text)
    res.status(200).json(updated)
}

// 포스트를 삭제하는 함수
export async function deletePost(req, res) {

    const postid = req.params.postid
    const post = await postRepository.getById(postid)

    if (!post) {
        return res.status(404).json({ message: `${postid}의 포스트가 없습니다` })
    }

    if (post.idx !== req.id) {
        return res.sendStatus(403)
    }

    await postRepository.remove(postid)
    res.sendStatus(204)
}