// Unicode to emoji map (encoding)
const unicodeToEmoji = {
  0: '🍏', 1: '🍒', 2: '🍕', 3: '🍔', 4: '🍩', 5: '🍪', 6: '🍗', 7: '🍇', 8: '🍉', 9: '🍋',
  10: '🍓', 11: '🍍', 12: '🍎', 13: '🍟', 14: '🍔', 15: '🍣', 16: '🍝', 17: '🍱', 18: '🍠', 19: '🍲'
};

// Emoji to Unicode map (decoding)
const emojiToUnicode = Object.fromEntries(Object.entries(unicodeToEmoji).map(([k, v]) => [v, parseInt(k)]));

// Encoding Function
function encodeTextToEmojis(text) {
  let encodedText = '';

  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);  // Get Unicode of character
    // Convert Unicode value into emojis
    const emojis = [];
    let currentCharCode = charCode;  // Use a separate variable for reassigning

    while (currentCharCode > 0) {
      const remainder = currentCharCode % 20;  // Take modulus to map to emojis
      emojis.push(unicodeToEmoji[remainder]); // Get corresponding emoji
      currentCharCode = Math.floor(currentCharCode / 20); // Divide to get next digit
    }
    // Add emojis to encoded text (reverse to maintain character order)
    encodedText += emojis.reverse().join('');
  }

  return encodedText;
}

// Decoding Function
function decodeEmojisToText(emojiText) {
  let decodedText = '';
  let i = 0;

  while (i < emojiText.length) {
    let charCode = 0;
    let emojis = [];

    // Extract emojis representing a single character's Unicode value
    while (emojiToUnicode[emojiText[i]]) {
      emojis.push(emojiText[i]);
      i++;
    }

    // Convert emoji sequence back to a number (Unicode value)
    for (let j = 0; j < emojis.length; j++) {
      charCode = charCode * 20 + emojiToUnicode[emojis[j]];
    }

    // Convert the Unicode value back to the character
    decodedText += String.fromCharCode(charCode);
  }

  return decodedText;
}

// Example Usage
const originalText = "Hello, ARU!";
const encodedText = encodeTextToEmojis(originalText);
console.log("Encoded Emojis:", encodedText);

const decodedText = decodeEmojisToText(encodedText);
console.log("Decoded Text:", decodedText);
