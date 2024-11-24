// Array of emojis to map to characters (A-Z, a-z, 0-9, "_", "-", " ")
const emojis = [
    "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "🥲", "🥹", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛",
    "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥸", "🤩", "🥳", "🙂‍↕️", "😏", "😒", "🙂‍↔️", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫",
    "😩", "🥺", "😢", "😭", "😮‍💨", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🫣", "🤗", "🫡", "🤔", "🫢", "🤭",
    "🤫", "🤥", "😶", "😶‍🌫️", "😐", "😑", "😬", "🫨", "🫠", "🙄", "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "😵‍💫", "🫥", "🤐",
    "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👹", "👺", "🤡", "💩", "👻", "💀", "☠️", "👽", "👾", "🤖", "🎃", "😺", "😸",
    "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "👋", "🤚", "🖐", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🫰", "🤟", "🤘", "🤙", "🫵", "🫱", "🫲",
    "🫸", "🫷", "🫳", "🫴", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🫶", "🙌", "👐", "🤲", "🤝", "🙏", "✍️",
    "💅", "🤳", "💪", "🦾", "🦵", "🦿", "🦶", "👣", "👂", "🦻", "👃", "🫀", "🫁", "🧠", "🦷", "🦴", "👀", "👁", "👅", "👄", "🫦", "💋", "🩸"
];

// Mapping characters (A-Z, a-z, 0-9, "_", "-", " ")
const charToEmojiMap = {};
const emojiToCharMap = {};

// Create a mapping from character to emoji and vice versa
const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_- ";
for (let i = 0; i < allChars.length; i++) {
    charToEmojiMap[allChars[i]] = emojis[i];
    emojiToCharMap[emojis[i]] = allChars[i];
}

// Function to encode text to emojis
function encodeTextToEmoji(text) {
    return Array.from(text).map(char => charToEmojiMap[char] || "").join('');
}

// Function to decode emojis back to text
function decodeEmojiToText(emojiString) {
    const emojisArray = emojiString.match(/.{2}/g); // Each emoji pair maps to one character
    return emojisArray.map(emoji => emojiToCharMap[emoji] || "").join('');
}

function write(value){
   return value;
}
function read(value){
   return value;
}

// Testing encoding and decoding with examples
let originalText = "abcde";
console.log("Original Text:", originalText);
let encodedEmojis = write(originalText);
console.log("Encoded Emojis:", encodedEmojis);
let decodedText = read(encodedEmojis);
console.log("Decoded Text:", decodedText);

originalText = "hello";
console.log("Original Text:", originalText);
encodedEmojis = write(originalText);
console.log("Encoded Emojis:", encodedEmojis);
decodedText = read(encodedEmojis);
console.log("Decoded Text:", decodedText);

// Function to load ARU.json using fetch()
async function getARUData() {
    try {
        // Fetch the ARU.json file from the server (index or public directory)
        const response = await fetch('/ARU.json');
        if (!response.ok) {
            throw new Error('Failed to load ARU.json');
        }
        const data = await response.json();
        return data; // Return the parsed JSON data
    } catch (error) {
        console.error('Error loading ARU.json:', error);
        return null;
    }
}

// Function to check if the username and password match any user
async function login() {
    try {
        const aruData = await getARUData(); // Get ARU data from ARU.json

        const username = document.getElementById('ARU_username').value;
        const password = document.getElementById('password').value; // In real-world scenario, hash password for comparison

        let user = null;

        // Search for user in participants array using a loop
        for (let participant of aruData.participants) {
            // alert(participant.ARU_username + " - " + username);
            // alert(participant.password + " - " + password);
            if (participant.ARU_username === username && participant.password === password) {
                user = participant;
                break;
            }
        }

        // If not found in participants, search in admin array
        if (!user) {
            for (let admin of aruData.admin) {
                if (admin.username === username && admin.password === password) {
                    user = admin;
                    break;
                }
            }
        }

        if (user) {
            // Store the user session in localStorage (or cookies)
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            alert('Login successful!');
            window.location.href = "dashboard"; // Example redirection
        } else {
            alert('Invalid username or password!');
        }
    } catch (error) {
        console.error(error);
        alert('There was an error during login.');
    }
}

// Logout function to clear the session
function logout() {
    localStorage.removeItem('loggedInUser');
    alert('Logged out successfully!');
    window.location.href = ""; // Redirect to home page or login page
}

// Check if a user is logged in
function checkLogin() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        console.log('Logged in as:', user.name);
    } else {
        console.log('No user logged in');
    }
}


// Function to check if an admin is logged in
function checkAdminLogin() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        return user.role === "super_admin" || user.role === "facilitator"; // Adjust roles as needed
    }
    return false;
}


async function createParticipant() {
    // Gather input values to create a new participant object
    let newParticipant = {
        name: write(document.getElementById('name').value),
        ARU_username: write(document.getElementById('ARU_username_new').value),
        password: write(document.getElementById('password_new').value),
        strikes: 0,
        status: "active",
        join_at: new Date().toISOString(),
        left_at: null,
        path: write(document.getElementById('path').value),
        level: write(parseInt(document.getElementById('level').value)), // Ensure level is a number
    };

    try {
        // Send a POST request to the server
        const response = await fetch('http://localhost:3000/add-participant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newParticipant), // Use the correct variable name
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json(); // Parse JSON response
        console.log('Participant added:', result);

        // Provide user feedback
        alert('Participant added successfully!');
    } catch (error) {
        console.error('Failed to add participant:', error);
        alert('Failed to add participant. Please check your inputs and try again.');
    }
}


// createParticipant(newParticipant);
// Fetch ARU.json data
async function fetchParticipants() {
  try {
    const response = await fetch('ARU.json'); // Ensure the correct file path
    const data = await response.json();

    if (data.participants) {
      renderTable(data.participants);
    }
  } catch (error) {
    console.error('Error fetching participants:', error);
  }
}

// Render Table
// function renderTable(participants) {
//   const tableBody = document.getElementById('participantTableBody');
//   tableBody.innerHTML = ''; // Clear table body
//
//   participants.forEach((participant, index) => {
//     const row = `
//       <tr>
//         <td>${index + 1}</td>
//         <td>${read(participant.name)}</td>
//         <td>${read(participant.ARU_username)}</td>
//         <td>${read(participant.status)}</td>
//         <td>${read(participant.strikes)}</td>
//         <td>${read(participant.path)}</td>
//         <td>${read(participant.level)}</td>
//         <td>${read(participant.join_at)}</td>
//         <td>${read(participant.left_at || 'N/A')}</td>
//       </tr>
//     `;
//     tableBody.innerHTML += row;
//   });
// }
// Render Table
// Render Table
function renderTable(participants) {
  const tableBody = document.getElementById('participantTableBody');
  let rows = ''; // Accumulate table rows in this string

  participants.forEach((participant, index) => {
    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${read(participant.name)}</td> <!-- Decoding name -->
        <td>${read(participant.ARU_username)}</td> <!-- Decoding ARU_username -->
        <td>${read(participant.status)}</td> <!-- Decoding status -->
        <td>${read(participant.strikes)}</td> <!-- Decoding strikes -->
        <td>${read(participant.path)}</td> <!-- Decoding path -->
        <td>${read(participant.level)}</td> <!-- Decoding level -->
        <td>${read(participant.join_at)}</td> <!-- Decoding join_at -->
        <td>${read(participant.left_at || 'N/A')}</td> <!-- Decoding left_at -->
      </tr>
    `;
    rows += row; // Add each row to the rows string
  });

  tableBody.innerHTML = rows; // Update the table body once
}

// Search and Filter Functionality
function applyFilters(participants) {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const filterStatus = document.getElementById('filterStatus').value;

  const filteredParticipants = participants.filter((participant) => {
    const matchesSearch =
      participant.name.toLowerCase().includes(searchInput) ||
      participant.ARU_username.toLowerCase().includes(searchInput) ||
      participant.status.toLowerCase().includes(searchInput);

    const matchesStatus =
      filterStatus === 'all' || participant.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  renderTable(filteredParticipants);
}

// Initialize Table and Filters
async function initDashboard() {
  try {
    const response = await fetch('ARU.json'); // Fetch data
    const data = await response.json();

    const participants = data.participants;

    renderTable(participants); // Initial rendering

    // Attach event listeners for search and filter
    document.getElementById('searchInput').addEventListener('input', () => {
      applyFilters(participants);
    });

    document.getElementById('filterStatus').addEventListener('change', () => {
      applyFilters(participants);
    });
  } catch (error) {
    console.error('Error initializing dashboard:', error);
  }
}

// Load data when the page loads
document.addEventListener('DOMContentLoaded', initDashboard);

// Example usage: Check login status when the page loads
document.addEventListener('DOMContentLoaded', checkLogin);
