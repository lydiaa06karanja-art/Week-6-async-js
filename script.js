
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

