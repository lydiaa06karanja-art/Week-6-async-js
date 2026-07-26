
//  Synchronous vs Asynchronous
// Predict the output

console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
setTimeout(() => console.log("D"), 100);
console.log("E");

// Predicted Output:
// A
// C
// E
// B
// D
// Reason: Synchronous code runs first A, C, E. Then async callbacks B then D

//  Callback Pattern

// 1. fetchData function
function fetchData(callback) {
  setTimeout(() => {
    const data = { name: "John", age: 30 };
    callback(data);
  }, 1000);
}

// Test fetchData
fetchData(function(data) {
  console.log("Data received:", data);
});

// BUILD: loadUser function

function loadUser(userId, callback) {
  setTimeout(() => {
    const user = { id: userId, name: "User " + userId };
    callback(user);
  }, 1500);
}

// Test loadUser
loadUser(5, function(user) {
  console.log("Loaded:", user);
});

//  Promises to the Rescue

// Refactored getUserData
function getUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: "John" });
      } else {
        reject("Invalid user ID");
      }
    }, 1000);
  });
}

// Refactor getUserPosts
function getUserPosts(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve([{ id: 1, text: "Thanks for reading" }]);
      } else {
        reject("Invalid user ID");
      }
    }, 1000);
  });
}

// Refactor getPostComments
function getPostComments(postId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (postId > 0) {
        resolve([{ id: 1, text: "Great post!" }]);
      } else {
        reject("Invalid post ID");
      }
    }, 1000);
  });
}

// Using Promises instead of callback hell
getUserData(1)
 .then(user => {
    console.log("User:", user);
    return getUserPosts(user.id);
  })
 .then(posts => {
    console.log("Posts:", posts);
    return getPostComments(posts[0].id);
  })
 .then(comments => {
    console.log("Comments:", comments);
  })
 .catch(error => {
    console.log("Error:", error);
  });
//  Promise Chaining

//  Chain Promises
getUserData(1)
.then(user => {
    console.log("User:", user);
    return getUserPosts(user.id);
  })
.then(posts => {
    console.log("Posts:", posts);
    return getPostComments(posts[0].id);
  })
.then(comments => {
    console.log("Comments:", comments);
  })
.catch(error => {
    console.error("Error:", error);
  });
//  Promise.all
const promise1 = getUserData(1);
const promise2 = getUserData(2);
const promise3 = getUserData(3);

Promise.all([promise1, promise2, promise3])
.then(results => {
    console.log("All users:", results);
  })
.catch(error => {
    console.error("One failed:", error);
  });
//  Promise.race
const fast = new Promise(resolve => setTimeout(() => resolve("Fast won!"), 500));
const slow = new Promise(resolve => setTimeout(() => resolve("Slow won!"), 2000));

Promise.race([fast, slow])
.then(result => {
    console.log("Winner:", result);
  });
// Async/Await 

async function getUserData(id) {
  return { id, name: `User${id}` };
}
async function getUserPosts(userId) {
  return [{ id: 101, userId, title: "Post 1" }];
}
async function getPostComments(postId) {
  return [{ id: 201, postId, text: "Nice post!" }];
}


// EXERCISE 1: Converting to Async/Await 
// Promise chain version:
function getDataWithPromises() {
  return getUserData(1)
  .then(user => getUserPosts(user.id))
  .then(posts => getPostComments(posts[0].id))
  .then(comments => comments);
}

// Async/await version (much cleaner!)
async function getDataWithAsync() {
  const user = await getUserData(1);
  const posts = await getUserPosts(user.id);
  const comments = await getPostComments(posts[0].id);
  return comments;
}

// Test it:
getDataWithAsync().then(comments => console.log("Ex1 Result:", comments));


// EXERCISE 2: Error Handling with Try/Catch 
async function fetchUserData(userId) {
  try {
    const user = await getUserData(userId);
    const posts = await getUserPosts(userId);
    return { user, posts };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error; // Re-throw if needed
  }
}

// Test it:
fetchUserData(1).then(data => console.log("Ex2 Result:", data));


// EXERCISE 3: Parallel with Async/Await 
async function getAllUsers() {
  // Sequential (slow):
  const user1 = await getUserData(1);
  const user2 = await getUserData(2);
  const user3 = await getUserData(3);
  console.log("Sequential done:", user1, user2, user3);
  // Total time: ~3 seconds

  // Parallel (fast):
  const [u1, u2, u3] = await Promise.all([
    getUserData(1),
    getUserData(2),
    getUserData(3)
  ]);
  // Total time: ~1 second
  console.log("Parallel done:", u1, u2, u3);

  return [u1, u2, u3];
}
// Fetch API Basics
const BASE_URL = "https://jsonplaceholder.typicode.com";


// ===== EXERCISE 1: Your First Fetch - with .then() =====
fetch(`${BASE_URL}/users/1`)
  .then(response => {
    console.log("Response object:", response);
    console.log("Status:", response.status);
    console.log("OK:", response.ok);
    return response.json(); // Parse JSON
  })
  .then(data => {
    console.log("User data:", data);
  })
  .catch(error => {
    console.error("Fetch error:", error);
  });


// = Fetch with Async/Await 
async function getUser(id) {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }
}

// Use it
async function runEx2() {
  const user = await getUser(1);
  console.log("Ex2 Result:", user);
}
runEx2();


//  Fetch and display 

// 1. A single user from JSONPlaceholder
async function fetchSingleUser() {
  const user = await getUser(5);
  console.log("Practice 1 - Single User:", user);
}
fetchSingleUser();

// 2. All users
async function fetchAllUsers() {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    const users = await response.json();
    console.log("Practice 2 - All Users:", users);
  } catch (error) {
    console.error(error);
  }
}
fetchAllUsers();

// 3. Posts for user 1
async function fetchUserPosts() {
  try {
    const response = await fetch(`${BASE_URL}/users/1/posts`);
    const posts = await response.json();
    console.log("Practice 3 - User 1 Posts:", posts);
  } catch (error) {
    console.error(error);
  }
}
fetchUserPosts();
const BASE_URL = "https://jsonplaceholder.typicode.com";

const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const container = document.getElementById("users-container");

async function loadUsers() {
  try {
    showLoading();
    
    const response = await fetch(`${BASE_URL}/users`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    
    const users = await response.json();
    displayUsers(users);
    
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
  }
}

function showLoading() {
  loading.classList.remove("hidden");
  container.innerHTML = "";
  errorDiv.classList.add("hidden");
}

function hideLoading() {
  loading.classList.add("hidden");
}

function showError(message) {
  errorDiv.textContent = `Error: ${message}`;
  errorDiv.classList.remove("hidden");
}

function displayUsers(users) {
  container.innerHTML = users.map(user => `
    <div class="user-card">
      <h2>${user.name}</h2>
      <p>📧 ${user.email}</p>
      <p>🏢 ${user.company.name}</p>
      <p>📍 ${user.address.city}</p>
    </div>
  `).join("");
}

// Initialize
loadUsers();

const BASE_URL = "https://jsonplaceholder.typicode.com";

const form = document.getElementById("post-form");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const resultDiv = document.getElementById("result");

//   Creating Resources 
async function createPost(title, body, userId) {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title,
      body,
      userId
    })
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return response.json();
}

// BUILD: Form that submits and displays result 
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;
  const userId = parseInt(document.getElementById("userId").value);

  try {
    showLoading();
    const newPost = await createPost(title, body, userId);
    showResult(newPost);
    form.reset();
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
  }
});

function showLoading() {
  loading.classList.remove("hidden");
  errorDiv.classList.add("hidden");
  resultDiv.classList.add("hidden");
}

function hideLoading() {
  loading.classList.add("hidden");
}

function showError(message) {
  errorDiv.textContent = `Error: ${message}`;
  errorDiv.classList.remove("hidden");
}

function showResult(post) {
  resultDiv.innerHTML = `
    <h3>✅ Post Created!</h3>
    <p><strong>ID:</strong> ${post.id}</p>
    <p><strong>Title:</strong> ${post.title}</p>
    <p><strong>Body:</strong> ${post.body}</p>
    <p><strong>UserID:</strong> ${post.userId}</p>
  `;
  resultDiv.classList.remove("hidden");
}
const BASE_URL = "https://jsonplaceholder.typicode.com";

let allUsers = [];

const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const container = document.getElementById("users-container");
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");
const cityFilter = document.getElementById("city-filter");

async function fetchUsers() {
  const response = await fetch(`${BASE_URL}/users`);
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
}

async function init() {
  try {
    showLoading();
    allUsers = await fetchUsers();
    populateCityDropdown(allUsers);
    displayUsers(allUsers);
    setupEventListeners();
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
  }
}

// 1. Search by name or email
function setupEventListeners() {
  searchInput.addEventListener("input", handleFilters);
  sortSelect.addEventListener("change", handleFilters);
  cityFilter.addEventListener("change", handleFilters);
}

function handleFilters() {
  let filtered = [...allUsers];
  
  // Search
  const query = searchInput.value.toLowerCase();
  filtered = filtered.filter(user => 
    user.name.toLowerCase().includes(query) || 
    user.email.toLowerCase().includes(query)
  );
  
  // Filter by city
  const city = cityFilter.value;
  if (city !== "all") {
    filtered = filtered.filter(user => user.address.city === city);
  }
  
  // Sort
  const sortOrder = sortSelect.value;
  filtered.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });
  
  displayUsers(filtered);
}

// 3. Filter by city dropdown
function populateCityDropdown(users) {
  const cities = [...new Set(users.map(user => user.address.city))].sort();
  cities.forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    cityFilter.appendChild(option);
  });
}

function displayUsers(users) {
  if (users.length === 0) {
    container.innerHTML = "<p>No users found</p>";
    return;
  }
  
  container.innerHTML = users.map(user => `
    <div class="user-card">
      <h2>${user.name}</h2>
      <p>📧 ${user.email}</p>
      <p>🏢 ${user.company.name}</p>
      <p>📍 ${user.address.city}</p>
    </div>
  `).join("");
}

function showLoading() {
  loading.classList.remove("hidden");
  container.innerHTML = "";
  errorDiv.classList.add("hidden");
}

function hideLoading() {
  loading.classList.add("hidden");
}

function showError(message) {
  errorDiv.textContent = `Error: ${message}`;
  errorDiv.classList.remove("hidden");
}

// Start app
init();
