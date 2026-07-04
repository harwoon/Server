const postInput = document.getElementById("postInput")
const postList = document.getElementById("postList")
const addBtn = document.getElementById("addBtn")
const getMineBtn = document.getElementById("getMineBtn")

async function loadPosts() {
    try {
        token = localStorage.getItem("token")

        const response = await fetch("/post", {
            headers: {
                "Authorization": "Bearer " + token
            }
        })

        const data = await response.json()

        renderPosts(data)

    } catch (error) {
        console.log("전체 포스트 조회 실패")
    }

}

function renderPosts(posts) {

    postList.innerHTML = ""
    const postArray = Array.isArray(posts) ? posts : Object.values(posts)

    postArray.forEach((post) => {
        const li = document.createElement("li")

        li.innerHTML = `
        <span>${post.text}</span>
        <span>${post.createdAt}</span>
        <span>${post.userid}</span>
        <div class="memo-buttons">
        </div>
        `

        postList.appendChild(li)
    })
}

getMineBtn.addEventListener("click", async () => {

    try {
        userid = localStorage.getItem("userid")
        token = localStorage.getItem("token")   

        console.log(userid)
        console.log("/post?userid=" + userid)

        const response = await fetch("/post?userid=" + userid, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })

        const data = await response.json()

        renderPosts(data)

    } catch (error) {
        console.log("내 글 가져오기 오류")
    }

})

//addBtn.addEventListener()

loadPosts()