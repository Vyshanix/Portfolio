Stephen Bula. (SB.) — Portfolio Website

A bold, retro-editorial, and high-contrast personal portfolio website built with plain HTML5, CSS3, and JavaScript (no frameworks or build step).

🌟 Features
Cinematic Opening Sequence
Progressive cadence pacing:
Black screen with "NEED" → 1st B&W photo (Modern House)
Black screen with "MONEY" → 2nd B&W photo (Classic Car)
Black screen with "FOR" → 3rd B&W photo (Interior)
Black screen with "MY" → 11th B&W photo (Sofa)
Black screen with "FUTURE"
Fast strobe reprise with overlaid text in ~0.1s bursts.
Black shutters close from top and bottom until they meet in the middle, then open into the landing page.
Includes a "SKIP INTRO" button (or press ESC).
Top Navigation
Left: SB. logo (smooth scroll to top).
Right: About, Stack, Projects, FAQ, and a DOWNLOAD RESUME button.
Download Resume: a direct file download. Clicking it saves assets/Resume.pdf to the visitor's device (no preview tab) under the name Stephen_Bula_Resume.pdf.
Collapses into a hamburger menu on phones and tablets.
Contact lives in the footer at the bottom of the page, not in the nav bar.
Landing Page Hero
Warm vintage paper aesthetic (#FAF7F2).
Top-left HELLO and bottom-left MEET in bold red display type; they rise in as the shutters open.
Stephen's cutout photo (assets/images/stephen_hero_cutout.png) in the center, surrounded by hand-drawn red doodle contours.
Top-right interactive {{ first name | }}:
Blinking vertical cursor line.
Clicking it clears "first name" so the visitor can type anything (20 characters max).
Bottom-right: A DESIGNER/DEVELOPER/MAKER (typewriter effect) above the huge red STEPHEN.
About Section
Left: Stephen's photo (assets/images/stephen_about_12.jpg) with a gradient fade at the bottom.
Right: // THE PERSON BEHIND THE CODE and I'M YOUR PERSON TO GET SH*T DONE. (dark + purple accent).
READ FULL STORY button expands the rest of the story and toggles to SHOW LESS (bold).
Kinetic Scrolling Typography
A pinned statement on the left; on the right, a column of specialties rises as you scroll: DESIGNING, UI/UX, WEBSITE, EDITING.
Words are sharp at the top and get blurrier and lighter the lower they sit.
Technical Skills & Stack
Accordion banner: EXPLORE TECHNICAL SKILLS & STACK ⇄ HIDE TECHNICAL SKILLS & STACK.
4 categories, 20 tools, each with a vector SVG icon:
Frontend & Mobile: HTML, CSS, Javascript, Kotlin, Dart
Backend & Database: Python, Django, Node.js, Java, PHP, SQL
Cloud & DevOps: Git, GitHub, Vercel, AWS
Design & Video Edit Tools: Figma, Canva, Photoshop, Capcut, Alight Motion
Projects Showcase & Detail Modal
Heading "WORKS I'M SUPER PROUD OF." with a pinned, scroll-driven stage: project cards fly in one by one with a slight tilt, and a counter (00 / 04) tracks them.
Category filter tabs: All Work, Web Design & Dev, Graphic Designs, Video Editing (empty categories show a "Showcase Under Curation" message).
Clicking a card opens the project modal:
Image carousel with prev/next arrows, keyboard arrows (← / →), clickable thumbnails, dash indicators, and a counter (e.g. 01 / 05).
Number and type badge (e.g. 01 // FULL-STACK WEB APP), title, description, and tech pills.
Code projects (TasteTrack) show VIEW PROJECT ↗ and SOURCE CODE ↗.
UI/UX design projects (SafeDrive, Records Management, Watchable) show a single VIEW IN FIGMA ↗ button and no source code button.
Watchable: slide 1 uses the normal wide preview; slides 2–5 switch to a taller preview that shows the whole picture (no cropping) so the full page design can be seen.
The 4 projects:
TasteTrack: Recipe & Social Platform (01)
SafeDrive: Navigation App UI (02)
Records Management UI (04)
Watchable: Streaming Platform UI (05)
FAQ
Accordion with five questions (one open at a time, click again to close), revealed on scroll.
Get in Touch / Footer
LET'S TALK (opens a mailto: link) and COPY EMAIL (copies the address, then shows COPIED!).
Social links: GitHub, LinkedIn, Facebook, plus a BACK TO TOP button.
The email text in #footer-email is the single source of truth: the script syncs the mailto: links and the copy button from it.
📁 File Structure
text
Portfolio/
├── index.html                 # Main HTML document
├── style.css                  # Custom styling & animations
├── script.js                  # Intro, hero, projects, modal/carousel, FAQ, footer
├── README.md                  # Documentation
└── assets/
    ├── Resume.pdf             # Downloaded when clicking "DOWNLOAD RESUME"
    └── images/
        ├── intro_house_1.png          # Intro photo 1
        ├── intro_car_2.png            # Intro photo 2
        ├── intro_interior_3.png       # Intro photo 3
        ├── intro_sofa_11.png          # Intro photo 11
        ├── stephen_hero_cutout.png    # Hero cutout (transparent PNG)
        ├── stephen_about_12.jpg       # About section photo
        └── projects/                  # Project screenshots (PNG)
            ├── tastetrack_1..5.png
            ├── safedrive_1.png
            ├── recordsmgmt_1..4.png
            └── watchable_1..5.png
🛠️ How to Customize
1. Replacing Your Resume File
Drop your resume into assets/Resume.pdf (same name, so nothing else needs changing).
To use a different file, edit the Download Resume link in index.html:
html
<a href="assets/Your_File.pdf" download="Your_Download_Name.pdf" class="btn-resume-download">

href is the file on your site; download is the file name the visitor gets.

The download attribute only works for files on the same site, so test it on your hosted version.
2. Adding / Removing Projects and Images

Open script.js and find projectsData. Each project has an images array:

javascript
images: [
  "assets/images/projects/tastetrack_1.png",
  "assets/images/projects/tastetrack_2.png"
  // add or remove images; the carousel, thumbnails and counter adjust automatically
]
3. Project Links and Button Types

Each project in projectsData controls its own buttons:

javascript
{
  viewProjectUrl: "https://...",   // live site, or the Figma link for UI/UX projects
  sourceCodeUrl: "https://github.com/...",  // ignored for UI/UX projects
  uiux: true,                      // optional: button reads "VIEW IN FIGMA", source code button hidden
  fullImageFromSlide: 1,           // optional: from this slide on (0 = first), show the whole picture
}
Leave out uiux for normal code projects: they show VIEW PROJECT and SOURCE CODE (the source button also hides itself if sourceCodeUrl is empty).
Use fullImageFromSlide for tall screenshots (like Watchable's pages) so they aren't cropped. To make the preview taller or shorter, change the height in the .modal-main-img-container.is-full-shot rule in style.css (currently min(78vh, 760px)).
4. Contact Details and Socials
Change the email text inside #footer-email in index.html; the mailto: links and copy button follow it automatically.
Update the GitHub, LinkedIn, and Facebook URLs in the footer's .footer-socials block.
