// The topics a blogger can choose for a post
const categories = ["JavaScript", "CSS", "Git", "AI", "Other"];

// Get every post: the posts saved in this browser plus the starter posts from posts.js
function getAllPosts() {
  const savedPosts = JSON.parse(localStorage.getItem("vx_posts")) || [];

  // A starter post is saved in the browser without its picture, so we put the picture back
  for (let i = 0; i < savedPosts.length; i++) {
    for (let j = 0; j < starterPosts.length; j++) {
      if (savedPosts[i].id === starterPosts[j].id) {
        savedPosts[i].img = starterPosts[j].img;
      }
    }
  }

  // Add the starter posts that this browser has not saved yet
  for (let j = 0; j < starterPosts.length; j++) {
    let alreadySaved = false;

    for (let i = 0; i < savedPosts.length; i++) {
      if (savedPosts[i].id === starterPosts[j].id) {
        alreadySaved = true;
      }
    }

    if (alreadySaved === false) {
      savedPosts.push(starterPosts[j]);
    }
  }

  return savedPosts;
}

// Save all the posts into this browser
function savePosts(allPosts) {
  const postsToSave = [];

  for (let i = 0; i < allPosts.length; i++) {
    const post = allPosts[i];
    let imageToSave = post.img;

    // Starter posts already have their picture in posts.js, so we do not save it twice
    for (let j = 0; j < starterPosts.length; j++) {
      if (starterPosts[j].id === post.id) {
        imageToSave = "";
      }
    }

    postsToSave.push({
      id: post.id,
      title: post.title,
      text: post.text,
      img: imageToSave,
      category: post.category,
      name: post.name,
      author: post.author,
      date: post.date,
      likes: post.likes,
      comments: post.comments
    });
  }

  localStorage.setItem("vx_posts", JSON.stringify(postsToSave));
}