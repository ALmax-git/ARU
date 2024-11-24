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
   return encodeTextToEmoji(btoa(value))
}
function read(value){
   return atob(decodeEmojiToText(value))
}


// Example Usage
let originalText = "Hello ARU";

console.log("Original Text:", originalText);

// Encoding the text to emojis
let encodedEmojis = encodeTextToEmoji(originalText);
console.log("Encoded Emojis:", encodedEmojis);

// Decoding the emojis back to text
let decodedText = decodeEmojiToText(encodedEmojis);
console.log("Decoded Text:", decodedText);

///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////




///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////




// Function to load ARU.json using fetch()
async function getARUData() {
    try {
        // Fetch the ARU.json file from the server (index or public directory)
        const response = await fetch('ARU.json');
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
            window.location.href = "/dashboard"; // Example redirection
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

// Example usage: Check login status when the page loads
document.addEventListener('DOMContentLoaded', checkLogin);
