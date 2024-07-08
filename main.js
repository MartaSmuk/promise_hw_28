/**

1. Використовуючи API https://jsonplaceholder.typicode.com/ зробити пошук поста за ід.

Ід має бути введений в інпут (валідація: ід від 1 до 100) Якщо знайдено пост, 
то вивести на сторінку блок з постом і зробити кнопку для отримання комкоментарів до посту.

Зробити завдання використовуючи проміси, перехопити помилки.
 */

const input = document.querySelector(".post__search");
const errorMessage = document.getElementById('errorMessage');
const searchButton = document.querySelector(".post__button");
const showCommentsButton = document.querySelector(".comment__button");
const postField = document.querySelector(".post__content");
const postCommentField = document.querySelector(".post__comment");

const basePostsUrl = "https://jsonplaceholder.typicode.com/posts/";
const baseCommentsUrl = "https://jsonplaceholder.typicode.com/comments/";



input.addEventListener("input", function() {
    if (+input.value > 100 || input.value < 1) {
        input.style.border = "3px solid red";
        errorMessage.textContent = 'Please enter a valid number between 1 and 100.';
        errorMessage.style.display = 'inline';
    } else {
        input.style.border = "0.5px solid black";
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
    }
})

const fetchPosts = async () => {
    const postNum = input.value;
    const fullUrl = basePostsUrl + postNum;
    try {
        const response = await fetch(fullUrl);
        const post = await response.json();
        return post;
    } catch (error) {
        console.log(error);
        return null;
    }
}

searchButton.addEventListener("click", async () => {
    if (input.value !== '') {
        const post = await fetchPosts();
        errorMessage.style.display = 'none';
        if(post) {
            postField.innerHTML = `
                <h2>User Id: ${post.userId}</h2>
                <p><strong>Post Id: </strong>${post.id}</p>
                <p><strong>Title: </strong>${post.title}</p>
                <p><strong>Contents: </strong>${post.body}</p>
            `
        } else {
            postField.innerHTML = "<p>Cannot fetch the post, please try again later</p>"
        }
    } else {
        errorMessage.textContent = "Please enter id of the post";
        errorMessage.style.display = 'inline';
    }
});

const fetchComments = async () => {
    try {
        const response = await fetch(baseCommentsUrl);
        const allComments = await response.json();
        return allComments
    } catch {
        console.log(error);
        return null;
    }
}

showCommentsButton.addEventListener("click", async () => {
    const post_id = +input.value;
    const comments = await fetchComments();
    if(postField.innerHTML !== '\n        ') {
        const filteredComments = comments.filter(comment => comment.postId === post_id);
        postCommentField.innerHTML = ``
        filteredComments.forEach(comment => {
            postCommentField.innerHTML += `
                <h2>Poist Id: ${comment.postId}</h2>
                <p><strong>Commentar Id: </strong>${comment.id}</p>
                <p><strong>Comment Author Name: </strong>${comment.name}</p>
                <p><strong>Comment Author Name: </strong>${comment.email}</p>
                <p><strong>Comment: </strong>${comment.body}</p>
            `
        })  
    }else {
        postField.innerHTML = "<p>Cannot fetch the post, please try again later</p>"
    }
})









