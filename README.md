# Stephen Bula. (SB.) — Portfolio Website

A bold, retro-editorial, and high-contrast personal portfolio website built with modern HTML5, CSS3, and JavaScript.

---

## 🌟 Features Implemented

1. **Cinematic Opening Sequence**:
   - Progressive cadence pacing:
     - Black screen with **"NEED"** → 1st B&W photo (Modern House)
     - Black screen with **"MONEY"** → 2nd B&W photo (Classic Car)
     - Black screen with **"FOR"** → 3rd B&W photo (Interior)
     - Black screen with **"MY"** → 11th B&W photo (Sofa)
     - Black screen with **"FUTURE"**
     - Fast rapid strobe reprise with overlaid text in ~0.2s bursts.
     - Black shutters close from top and bottom until meeting in the middle, then open into the landing page.
     - Includes **"SKIP INTRO"** button (`ESC` key) and a **"REPLAY INTRO"** button in the footer.

2. **Top Navigation (`nav`)**:
   - Left: **SB.** logo (smooth scroll to top).
   - Right: **About**, **Stack**, **Projects**, **FAQ**, and a dedicated **DOWNLOAD RESUME** button.
   - **Download Resume**: Uses direct file download (`download="Stephen_Resume.pdf"`), downloading `assets/Stephen_Resume.pdf` directly to the visitor's device.
   - **Contact**: Placed at the very bottom of the page, not in the nav bar.

3. **Landing Page Hero (4th Picture Reference)**:
   - Warm vintage paper aesthetic (`#FAF7F2`).
   - Top-left **HELLO** and bottom-left **MEET** in bold red display font.
   - Stephen standing in the center (`assets/images/stephen_hero_cutout.png`) surrounded by artistic hand-drawn red doodle contours and flowers.
   - Top-right interactive **`{{ first name | }}`**:
     - Blinking vertical cursor line.
     - Clicking the text makes "first name" vanish into `{{ | }}`.
     - Visitors can type anything up to **20 letters max**.
   - Bottom-right: **`A DESIGNER/DEVELOPER/MAKER`** tag above massive bold red **STEPHEN**.

4. **About Section (6th Picture Reference)**:
   - Left: Stephen leaning photo (`assets/images/stephen_about_12.jpg`) with a smooth gradient fade mask at the bottom.
   - Right: **`04 / THE PERSON BEHIND THE CODE`**, **`I'M YOUR PERSON TO GET SH*T DONE.`** (dark + purple accent).
   - Full story text with **`READ FULL STORY ⌵`** button that smoothly expands and toggles to **`SHOW LESS ⌃`** in **bold**.

5. **Kinetic Scrolling Typography (9th & 10th Picture Reference)**:
   - Dynamic vertical stack of specialties:
     - **DESIGNING**
     - **UI/UX**
     - **WEBSITE**
     - **EDITING**
   - Driven by scroll position with progressive depth-of-field blur (`filter: blur(...)`) and opacity.

6. **Technical Skills & Stack (7th & 8th Picture References)**:
   - Interactive accordion banner:
     - Closed: `SKILL GROUPS` `EXPLORE TECHNICAL SKILLS & STACK` `20 Tools ⌵`
     - Open: `HIDE TECHNICAL SKILLS & STACK` `20 Tools ⌃`
   - Exact 4 categories and 20 tools with official vector SVG icons:
     - **Frontend & Mobile**: HTML, CSS, Javascript, Kotlin, Dart
     - **Backend & Database**: Python, Django, Node.js, Java, PHP, SQL
     - **Cloud & DevOps**: Git, GitHub, Vercel, AWS
     - **Design & Video Edit Tools**: Figma, Canva, Photoshop, Capcut, Alight Motion

7. **Projects Showcase & Detail Modal (13th, 14th, 15th & 16th Picture References)**:
   - Header with tilted vintage knife card (`project_banner_knife.png`) and bold title **"WORK I'M SUPER PROUD OF."**
   - Category filter tabs: **All Work**, **Web Design & Dev**, **Graphic Designs**, **Video Editing**.
   - Cards pop and fan out with staggered tilts as you scroll down.
   - **Interactive Modal**:
     - 5 project images with carousel controls (prev/next arrows, keyboard arrows `←` / `→`).
     - Clickable thumbnail strip with active border indicator.
     - Page counter: `01 / 05` through `05 / 05`.
     - Category badge: e.g. `01 // FULL-STACK WEB APP`.
     - Bold title and full description.
     - Action buttons: `VIEW PROJECT ↗` and `SOURCE CODE ↗` (with GitHub icon).
     - *Note: On Project 3 (Music Player), the Figma button is removed as requested.*
     - Tech stack pills.
   - The 5 projects:
     1. **TasteTrack: Recipe & Social Platform**
     2. **SafeDrive: Navigation App**
     3. **Music Player: Audio Streaming App**
     4. **Records Management UI**
     5. **Watchable: Streaming Platform UI**

8. **FAQs & Footer**:
   - Clean placeholder sections ready for your upcoming questions, answers, and contact info.

---

## 📁 File Structure

```text
Portfolio/
├── index.html                 # Main HTML document
├── style.css                  # Custom styling & animations
├── script.js                  # Intro sequence, modals, carousels, interactions
├── README.md                  # Documentation
└── assets/
    ├── Stephen_Resume.pdf     # Resume file (downloaded when clicking "DOWNLOAD RESUME")
    └── images/
        ├── intro_house_1.png          # 1st B&W photo
        ├── intro_car_2.png            # 2nd B&W photo
        ├── intro_interior_3.png       # 3rd B&W photo
        ├── intro_sofa_11.png          # 11th B&W photo
        ├── stephen_hero_cutout.png    # 5th photo (Stephen transparent cutout)
        ├── stephen_about_12.jpg       # 12th photo (Stephen leaning photo)
        ├── project_banner_knife.png   # 13th photo (Vintage knife retro card)
        └── projects/                  # 25 SVG UI screens (5 per project)
            ├── tastetrack_1..5.svg
            ├── safedrive_1..5.svg
            ├── musicplayer_1..5.svg
            ├── recordsmgmt_1..5.svg
            └── watchable_1..5.svg
```

---

## 🛠️ How to Customize

### 1. Replacing Your Resume File
- Simply drop your resume file into `assets/Stephen_Resume.pdf`.
- If your file has a different name or extension (e.g. `Stephen_Resume.png`), update line 50 in [index.html](file:///c:/Users/Trexie/Downloads/Portfolio/index.html#L49-L55):
  ```html
  <a href="assets/Your_File.pdf" download="Your_File.pdf" class="btn-resume-download">
  ```

### 2. Adding / Removing Images in Projects
Open [script.js](file:///c:/Users/Trexie/Downloads/Portfolio/script.js#L11-L98) and find `projectsData`. Each project has an `images` array:
```javascript
images: [
  "assets/images/projects/tastetrack_1.svg",
  "assets/images/projects/tastetrack_2.svg",
  "assets/images/projects/tastetrack_3.svg",
  "assets/images/projects/tastetrack_4.svg",
  "assets/images/projects/tastetrack_5.svg"
  // You can easily add a 6th image or remove down to 3!
]
```
The modal carousel, thumbnail strip, and `01 / 05` counter automatically adjust to however many images you provide.

### 3. Adding Your Project Links (Live Site / GitHub / Figma)
In [script.js](file:///c:/Users/Trexie/Downloads/Portfolio/script.js#L11-L98), simply update `viewProjectUrl` and `sourceCodeUrl` for each project.
