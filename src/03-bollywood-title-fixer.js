/**
 * 🎬 Bollywood Movie Title Fixer
 *
 * Pappu ne ek movie database banaya hai lekin usne saare titles galat type
 * kar diye - kuch ALL CAPS mein, kuch all lowercase mein, kuch mein extra
 * spaces hain. Tu fix kar de titles ko proper Title Case mein!
 *
 * Rules:
 *   - Extra spaces hatao: leading, trailing, aur beech ke multiple spaces ko
 *     single space banao
 *   - Har word ka pehla letter uppercase, baaki lowercase (Title Case)
 *   - EXCEPTION: Chhote words jo Title Case mein lowercase rehte hain:
 *     "ka", "ki", "ke", "se", "aur", "ya", "the", "of", "in", "a", "an"
 *     LEKIN agar word title ka PEHLA word hai toh capitalize karo
 *   - Hint: Use trim(), split(), map(), join(), charAt(), toUpperCase(),
 *     toLowerCase(), slice()
 *
 * Validation:
 *   - Agar input string nahi hai, return ""
 *   - Agar string trim karne ke baad empty hai, return ""
 *
 * @param {string} title - Messy Bollywood movie title
 * @returns {string} Cleaned up Title Case title
 *
 * @example
 *   fixBollywoodTitle("  DILWALE   DULHANIA   LE   JAYENGE  ")
 *   // => "Dilwale Dulhania Le Jayenge"
 *
 *   fixBollywoodTitle("dil ka kya kare")
 *   // => "Dil ka Kya Kare"
 */
export function fixBollywoodTitle(title) {
  // Your code here
  if (typeof title !== "string") return ""
  const trimmedTitle = title.trim();
  if (trimmedTitle.length === 0) return ""

  const words = trimmedTitle.split(" ").filter(word => word.length > 0).map((word,idx) => {
    switch (word.toLowerCase()) {
      case "ka":
      case "ki":
      case "ke":
      case "aur":
      case "ya":
      case "the":
      case "of":
      case "in":
      case "a":
      case "an": {
        if(idx === 0) {
          return word[0]?.toUpperCase() + word.slice(1).toLowerCase();
        } else {
          return word.toLowerCase()
        }
      } 
      default: return word[0]?.toUpperCase() + word.slice(1).toLowerCase() 
    }
  }).join(" ");

  return words;
}
