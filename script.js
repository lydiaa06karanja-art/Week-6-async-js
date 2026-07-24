
// EXERCISE 1: Synchronous vs Asynchronous
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

// EXERCISE 2: Callback Pattern

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
