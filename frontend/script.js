document.addEventListener("DOMContentLoaded", () => {
    const createPostForm = document.getElementById("create-post-form")
    const postsContainer = document.getElementById("posts-container")
  
    createPostForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const postContent = document.getElementById("post-content").value
      if (postContent.trim() !== "") {
        createPost(postContent)
        document.getElementById("post-content").value = ""
      }
    })
  
    function createPost(content) {
      const post = document.createElement("div")
      post.className = "post"
      post.innerHTML = `
              <div class="post-author">John Doe</div>
              <div class="post-content">${content}</div>
              <div class="post-actions">
                  <button>Like</button>
                  <button>Comment</button>
                  <button>Share</button>
              </div>
          `
      postsContainer.prepend(post)
    }
  
    // Fetch posts from the server
    fetchPosts()
  })
  
  function fetchPosts() {
    // In a real application, you would fetch posts from the server here
    // For now, we'll just add some dummy posts
    const dummyPosts = [
      { author: "Jane Smith", content: "Hello, world!" },
      { author: "Bob Johnson", content: "Having a great day!" },
      { author: "Alice Brown", content: "Just finished a great book!" },
    ]
  
    const postsContainer = document.getElementById("posts-container")
    dummyPosts.forEach((post) => {
      const postElement = document.createElement("div")
      postElement.className = "post"
      postElement.innerHTML = `
              <div class="post-author">${post.author}</div>
              <div class="post-content">${post.content}</div>
              <div class="post-actions">
                  <button>Like</button>
                  <button>Comment</button>
                  <button>Share</button>
              </div>
          `
      postsContainer.appendChild(postElement)
    })
  }
  
  