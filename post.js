const pageTitle = document.getElementById("pageTitle");
const postForm = document.getElementById("postForm");
const titleInput = document.getElementById("titleInput");
const textInput = document.getElementById("textInput");
const categoryInput = document.getElementById("categoryInput");
const imageInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("imagePreview");
const nameInput = document.getElementById("nameInput");
const loginMessage = document.getElementById("loginMessage");
const publishButton = document.getElementById("publishButton");

const titleError = document.getElementById("titleError");
const textError = document.getElementById("textError");
const imageError = document.getElementById("imageError");
const nameError = document.getElementById("nameError");
const formError = document.getElementById("formError");

let imageData = "";
let currentUser = null;
let editingPost = null;

for (let i = 0; i < categories.length; i++) {
  const option = document.createElement("option");
  option.value = categories[i];
  option.textContent = categories[i];
  categoryInput.appendChild(option);
}

const allPosts = getAllPosts();

const currentEmail = JSON.parse(localStorage.getItem("vx_session")) || "";
const users = JSON.parse(localStorage.getItem("vx_users")) || [];

for (let i = 0; i < users.length; i++) {
  if (users[i].email === currentEmail) {
    currentUser = users[i];
  }
}

const editId = new URLSearchParams(window.location.search).get("edit");

if (currentUser === null) {
  loginMessage.hidden = false;
} else {
  nameInput.value = currentUser.name;

  if (editId !== null) {

    for (let i = 0; i < allPosts.length; i++) {
      if (String(allPosts[i].id) === editId && allPosts[i].author === currentUser.email) {
        editingPost = allPosts[i];
      }
    }

    if (editingPost === null) {
      formError.textContent = "That post could not be found.";
      publishButton.disabled = true;
    }
  }
}

if (editingPost !== null) {
  pageTitle.textContent = "Edit your post";
  publishButton.textContent = "Save changes";
  titleInput.value = editingPost.title;
  textInput.value = editingPost.text;
  nameInput.value = editingPost.name;

  if (editingPost.category) {
    categoryInput.value = editingPost.category;
  }

  imageData = editingPost.img;
  imagePreview.src = imageData;
  imagePreview.hidden = false;
}

imageInput.addEventListener("change", function () {
  const file = imageInput.files[0];
  if (!file) {
    return;
  }

  if (file.size > 300000) {
    imageError.textContent = "Choose an image smaller than 300 KB.";
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    imageData = reader.result;
    imagePreview.src = imageData;
    imagePreview.hidden = false;
    imageError.textContent = "";
  };
  reader.readAsDataURL(file);
});

postForm.addEventListener("submit", function (event) {
  event.preventDefault();

  titleError.textContent = "";
  textError.textContent = "";
  imageError.textContent = "";
  nameError.textContent = "";
  formError.textContent = "";

  let allGood = true;

  if (titleInput.value.trim() === "") {
    titleError.textContent = "Add a title.";
    allGood = false;
  }
  if (textInput.value.trim().length < 20) {
    textError.textContent = "Write at least 20 characters.";
    allGood = false;
  }
  if (imageData === "") {
    imageError.textContent = "Choose an image for your post.";
    allGood = false;
  }
  if (nameInput.value.trim() === "") {
    nameError.textContent = "Enter your name.";
    allGood = false;
  }

  if (allGood === false) {
    return;
  }

  if (currentUser === null) {
    formError.textContent = "Log in first, then publish your post.";
    return;
  }

  if (editingPost !== null) {
  
    editingPost.title = titleInput.value.trim();
    editingPost.text = textInput.value.trim();
    editingPost.name = nameInput.value.trim();
    editingPost.category = categoryInput.value;
    editingPost.img = imageData;
  } else {

    const newPost = {
      id: Date.now(),
      title: titleInput.value.trim(),
      text: textInput.value.trim(),
      img: imageData,
      name: nameInput.value.trim(),
      category: categoryInput.value,
      author: currentUser.email,
      date: new Date().toDateString(),
      likes: [],
      comments: []
    };
    allPosts.unshift(newPost);
  }

  try {
    savePosts(allPosts);
  } catch (error) {
    formError.textContent = "The post could not be saved. Try a smaller image.";
    return;
  }

  window.location.href = "blogger-dashboard.html";
});