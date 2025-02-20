document.addEventListener("DOMContentLoaded", () => {
    const tweetForm = document.getElementById("tweet-form")
    const tweetFeed = document.getElementById("tweet-feed")
    const trendingTopics = document.getElementById("trending-topics")
  
    tweetForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const tweetContent = document.getElementById("tweet-content").value
      if (tweetContent.trim() !== "") {
        createTweet(tweetContent)
        document.getElementById("tweet-content").value = ""
      }
    })
  
    function createTweet(content) {
      fetch("api.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: "Euphemia Chikungulu", // In a real app, this would be the logged-in user
          content: content,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            fetchTweets()
          } else {
            console.error("Error creating tweet:", data.message)
          }
        })
        .catch((error) => {
          console.error("Error:", error)
        })
    }
  
    function fetchTweets() {
      fetch("api.php")
        .then((response) => response.json())
        .then((tweets) => {
          tweetFeed.innerHTML = ""
          tweets.forEach((tweet) => {
            const tweetElement = document.createElement("div")
            tweetElement.className = "tweet"
            tweetElement.innerHTML = `
                    <img src="user-avatar.jpg" alt="User Avatar" class="avatar">

                      <div class="tweet-content">
                          <div class="tweet-author">${tweet.author}</div>
                          <div class="tweet-text">${tweet.content}</div>
                          <div class="tweet-actions">
                              <span class="tweet-action"><i class="far fa-comment"></i> 0</span>
                              <span class="tweet-action"><i class="fas fa-retweet"></i> 0</span>
                              <span class="tweet-action"><i class="far fa-heart"></i> 0</span>
                              <span class="tweet-action"><i class="far fa-share-square"></i></span>
                          </div>
                      </div>
                  `
            tweetFeed.appendChild(tweetElement)
          })
        })
        .catch((error) => {
          console.error("Error:", error)
        })
    }
  
    //  In a real application, i would fetch trending topics from the server
    //  For now, i am using  dummy data
    function fetchTrendingTopics() {
    
      const dummyTrends = [
        { category: "Technology", name: "#Blockchain Technology", tweets: "340K" },
        { category: "Politics", name: "#Election2024", tweets: "120K" },
        { category: "Sports", name: "Champions League", tweets: "89.7K" },
        { category: "Entertainment", name: "#NewAlbumDrop", tweets: "50K" },
        { category: "Science", name: "#Nasa Exploration", tweets: "25.5K" },
      ]
  
      trendingTopics.innerHTML = ""
      dummyTrends.forEach((trend) => {
        const trendElement = document.createElement("li")
        trendElement.innerHTML = `
                  <span class="trend-category">${trend.category} · Trending</span>
                  <span class="trend-name">${trend.name}</span>
                  <span class="trend-tweets">${trend.tweets} Tweets</span>
              `
        trendingTopics.appendChild(trendElement)
      })
    }
  
    // Fetch tweets and trending topics when the page loads
    fetchTweets()
    fetchTrendingTopics()
  })
  
  