const categories = ["JavaScript", "CSS", "Git", "AI", "Other"];

function getAllPosts() {
  const savedPosts = JSON.parse(localStorage.getItem("vx_posts")) || [];

  for (let i = 0; i < savedPosts.length; i++) {
    for (let j = 0; j < starterPosts.length; j++) {
      if (savedPosts[i].id === starterPosts[j].id) {
        savedPosts[i].img = starterPosts[j].img;
      }
    }
  }

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

function savePosts(allPosts) {
  const postsToSave = [];

  for (let i = 0; i < allPosts.length; i++) {
    const post = allPosts[i];
    let imageToSave = post.img;

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