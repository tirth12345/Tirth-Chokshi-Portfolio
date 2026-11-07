# Tirth Chokshi — Product Manager Portfolio 🚀

> **Aspiring AI Product Manager | CSE (AI/ML) | Product × Data × Technology**  
> A high-impact, interactive Product Management portfolio website featuring deep-dive product teardowns, real-world case studies, data-driven frameworks (RICE / MoSCoW), and flagship software builds.

---

## 🌟 Overview

This portfolio showcases the transition of **Tirth Chokshi** from Computer Science & Machine Learning Engineering into **Product Management**. Operating at the intersection of **customer empathy**, **data analytics**, and **engineering rigor**, this site highlights end-to-end product thinking—from discovering user friction to drafting PRDs, prioritizing features, and measuring post-launch KPIs.

---

## 🎯 Key Highlights & Features

### 1. 🚦 PM Sprint Launch Preloader
A startup loading screen that models the **4 Stages of the Product Management Lifecycle**:
* **01. Discovery:** `Discovering user friction & research cohorts...`
* **02. Strategy:** `Evaluating RICE prioritization & unit metrics...`
* **03. Execution:** `Synthesizing PRDs, wireframes & architecture...`
* **04. Launch:** `Launching 0-to-1 Product Portfolio...`
* Smooth progress tracking with milestone illumination and an accessible *“Tap anywhere to skip”* micro-interaction.

### 2. 📑 In-Depth Product Case Studies & Teardowns
Replacing generic blog posts with publication-grade Product Management teardowns. Each case study includes both an **interactive in-page 4-tab modal** and a **standalone publication-ready page**:

| Company | Case Study Focus | Core Problem Solved | Key Metric Impacts | Link |
| :--- | :--- | :--- | :--- | :--- |
| **🎧 Spotify** | **Smarter Music Discovery: The Discovery Dial** | Algorithmic echo chamber & repetitive recommendations in Daily Mixes | • **+24%** New-Artist Saves<br>• **-22%** Sub-30s Skips<br>• **RICE: 90.0** | [View Case Study](case-study-spotify.html) |
| **🍔 Swiggy** | **SmartCart: Group Ordering & Split Billing** | 38% cart abandonment on multi-user orders & awkward post-meal debt chasing | • **+24%** Checkout Conv<br>• **+55%** Average Order Value<br>• **-58%** Order Time | [View Case Study](case-study-swiggy.html) |
| **✈️ Airbnb** | **Co-Travel Hub: Collaborative Trip Planning** | Group coordination chaos & $2,500 organizer credit card upfront barrier | • **+21%** Group Booking Conv<br>• **3.5x** Faster Booking<br>• **+26 NPS** Organizer Lift | [View Case Study](case-study-airbnb.html) |

### 3. 🛠️ Flagship Projects (PM Impact Framing)
* **⭐ Employee Management System:** Productivity SaaS platform featuring role-based access control (RBAC), automated task assignment, status tracking, and JWT authentication.
* **⭐ BaatCheet — Real-Time News Discussion Platform:** Community media platform combining live news curation, threaded discussions, video chat, phone OTP authentication, and engagement statistics.
* **⭐ BI Dashboard for Export Performance Analysis:** Executive Microsoft Power BI dashboard for Ananta Impex with star-schema data modeling, Power Query transformations, and custom DAX KPIs.
* **Technical ML Prototypes:** Airplane Ticket Price Prediction, Housing Price Valuation Engine, and PackPal inventory coordinator.

### 4. 🌐 3D Interactive Hero Canvas
* Built with **Three.js** featuring a 2,200-particle dynamic galaxy field, a floating wireframe icosahedron, and dual glowing torus rings with mouse-tracking parallax.

---

## 🗂️ Project Directory Structure

```text
Portfolio/
├── index.html                   # Main portfolio landing page
├── styles.css                   # Glassmorphic dark styling, responsive rules & animations
├── main.js                      # Preloader loop, Three.js hero, GSAP triggers, modal logic
├── case-study-spotify.html      # Deep-dive PRD: Spotify Smarter Music Discovery
├── case-study-swiggy.html       # Deep-dive PRD: Swiggy SmartCart Group Ordering
├── case-study-airbnb.html       # Deep-dive PRD: Airbnb Co-Travel Hub & Split Escrow
├── Tirth_Chokshi_PM_Resume.pdf  # Downloadable PM resume
├── TirthChokshi_Resume.pdf      # Resume fallback alias
├── vercel.json                  # Static deployment routing for Vercel
├── icon.png                     # Favicon
├── task.md                      # Project tracking and status log
└── README.md                    # Project documentation
```

---

## 💻 Tech Stack & Libraries

* **Core:** HTML5, CSS3 (Custom Glassmorphism, CSS Variables, Flexbox/Grid)
* **Scripting:** Vanilla JavaScript (ES6+)
* **3D & Graphics:** [Three.js](https://threejs.org/) (r128)
* **Animations:** [GSAP 3](https://greensock.com/gsap/) with [ScrollTrigger](https://greensock.com/scrolltrigger/)
* **Typography:** Space Grotesk & Inter (Google Fonts)
* **Deployment Target:** Vercel (@vercel/static) / GitHub Pages

---

## 🚀 Local Development Setup

To run this website locally on your computer:

### Option 1: VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Right-click `index.html` and select **"Open with Live Server"**.

### Option 2: Python Local Server
```bash
# Python 3
python -m http.server 3000
```
Then visit `http://localhost:3000` in your web browser.

### Option 3: Node.js (npx serve)
```bash
npx serve .
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)
This repository includes a `vercel.json` configuration file:
1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com) and import the repository.
3. Click **Deploy**. Vercel will immediately deploy the static assets with zero build configuration needed.

### Deploy to GitHub Pages
1. Push code to your `main` or `master` branch.
2. In your GitHub repository, navigate to **Settings** ➔ **Pages**.
3. Under **Build and deployment**, select **Source:** `Deploy from a branch` and choose `/ (root)`.
4. Click **Save**.

---

## 📬 Contact & Connect

* **Full Name:** Tirth Chokshi
* **Email:** [tirthchokshi20@gmail.com](mailto:tirthchokshi20@gmail.com)
* **Phone:** [+91 7228864643](tel:+917228864643)
* **LinkedIn:** [linkedin.com/in/tirth-chokshi-44b355295](https://linkedin.com/in/tirth-chokshi-44b355295)
* **GitHub:** [github.com/tirth12345](https://github.com/tirth12345)
* **LeetCode:** [leetcode.com/tirthchokshi20](https://leetcode.com/tirthchokshi20)
* **Location:** Ahmedabad, Gujarat, India (Indian Citizen)

---
*Designed & Built by Tirth Chokshi · 2025*

