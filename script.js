
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
