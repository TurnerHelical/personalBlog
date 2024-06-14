// Get DOM elements
const blogForm = document.getElementById('blog-form');
const usernameInput = document.getElementById('username');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const backButton = document.getElementById('back-button');
const toggleModeButton = document.getElementById('toggle-mode');
const blogPostsContainer = document.getElementById('blog-posts');

// Event listener for form submission
if (blogForm) {
    blogForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();

        if (username === '' || title === '' || content === '') {
            alert('Please fill in all fields.');
            return;
        }

        const post = {
            username: username,
            title: title,
            content: content
        };

        saveBlogPost(post);
        redirectToPostsPage();
        clearForm();
    });
}

// Function to save blog post to localStorage
function saveBlogPost(post) {
    let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    blogPosts.push(post);
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
}

// Function to display blog posts on posts page
function displayBlogPosts() {
    const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

    if (blogPostsContainer) {
        blogPostsContainer.innerHTML = '';

        blogPosts.forEach(function(post) {
            const postElement = document.createElement('div');
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <p>By: ${post.username}</p>
            `;
            blogPostsContainer.appendChild(postElement);
        });
    }
}

// Function to redirect to posts page
function redirectToPostsPage() {
    window.location.href = 'posts.html';
}

// Event listener for back button
if (backButton) {
    backButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
}

// Event listener for toggle mode button
if (toggleModeButton) {
    toggleModeButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });
}

// Function to clear form inputs
function clearForm() {
    usernameInput.value = '';
    titleInput.value = '';
    contentInput.value = '';
}

// Call displayBlogPosts on posts page load
if (blogPostsContainer) {
    displayBlogPosts();
}