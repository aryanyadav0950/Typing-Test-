# Typing Speed Test Website

A simple Typing Speed Test web app built using **HTML**, **CSS**, and **JavaScript**.  
This project measures typing speed (WPM), accuracy, elapsed time, and shows errors in real time.

---
                   
## 🔹 Features
- Shows a random sample text for typing
- Starts timer on first key press                     
- Calculates **WPM (words per minute)** using standard formula (1 word = 5 characters)
- Calculates **Accuracy (%)** = (correct characters / total typed) × 100
- Shows **Errors** (mismatched characters)         
- Reset button to try again   
- Responsive layout for desktop and mobile

---

## 📁 Files in this repo 
- `index.html` — Main webpage (contains markup)
- `style.css` — Stylesheet for layout & visuals
- `script.js` — JavaScript logic for timer, scoring, and validation
- `README.md` — This file 

---

## ▶️ How to run
1. Clone or download the repository.  
2. Make sure files `index.html`, `style.css`, and `script.js` are in the same folder.  
3. Open `index.html` in any modern browser.

---

## 🔧 How it works (brief)
- The timer starts when the user types the first character.
- WPM is computed as:  
  `WPM = (correct_characters / 5) / (elapsed_time_in_minutes)`
- Accuracy is computed as:  
  `Accuracy % = (correct_characters / total_typed_characters) * 100`

---

## 💡 Notes / Improvements
- You can add more sample paragraphs to `script.js` for variety.
- Add score persistence using `localStorage`.
- Add user-selectable time modes (15s, 30s, 60s).
- Add per-character highlighting for better UX.

---

## 👨‍💻 Author
**Aryan Yadav**  
B.Tech CSE @ ABES Engineering College  
GitHub: https://github.com/aryanyadav0950
