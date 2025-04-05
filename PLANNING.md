# Project Planning – website

## Overview

my personal website:
portfolio & blog 

tech stack: python & flask

features:
- dynamic blog (stored in a database)
- portfolio of coding projects
- home/about section that reflects personal voice and values
- contact form (eventually with email integration)
- links to socials

---

## Overview - project Goals

- [x] Build a clean and functional Flask backend
- [ ] Create a homepage and navigation layout
- [ ] Display blog posts dynamically from a database
- [ ] Add new blog posts via form (admin-only or local)
- [ ] Create a portfolio/projects page with descriptions and links
- [ ] Style the site with TailwindCSS or custom CSS
- [ ] Deploy the app to Render with PostgreSQL
- [ ] Add README with project details and preview image

---

## Sprints & Milestones

### Sprint 1: Flask Backend Setup (Mini-Milestone)
**Goal:** Set up a working Flask app + SQLite database  
<strike>**Due:** April 7</strike>
**Tasks:**
- [x] Create config file
- [x] Initialize Flask app
- [x] Create `BlogPost` model
- [x] Create and test database
- [x] Run app with test route

---

### Sprint 2: Homepage & Layout
**Goal:** Set up basic templates (`base.html`, `home.html`)  
**Due:** April 9  
**Tasks:**
- [ ] Create reusable base layout
- [ ] Build homepage
- [ ] Add simple CSS or Tailwind setup
- [ ] Add navbar (Home, Blog, Portfolio, Contact)

---

### Sprint 3: Dynamic Blog
**Goal:** Show blog posts from the database  
**Due:** April 12  
**Tasks:**
- [ ] Create blog listing page
- [ ] Create single post view page
- [ ] Add dummy data to test it

---

### Sprint 4: Add Content Admin (Optional)
**Goal:** Add a local form to create blog posts  
**Due:** April 14  
**Tasks:**
- [ ] Add Flask-WTF form
- [ ] Handle POST requests
- [ ] Save new posts to the database

---

### Sprint 5: Portfolio Section
**Goal:** Build a section that shows your coding projects  
**Due:** April 16  
**Tasks:**
- [ ] Create portfolio template
- [ ] Add project data (local or DB)
- [ ] Include GitHub links and images

---

### Sprint 6: Contact Form + Deployment
**Goal:** Deploy site + optional contact functionality  
**Due:** April 18  
**Tasks:**
- [ ] Set up contact form (no backend email for now)
- [ ] Deploy site on Render
- [ ] Switch from SQLite to PostgreSQL
- [ ] Update README with live link and image

---

## Notes
- keeping blog & portfolio minimal to start but also pretty & polish later
- focus is on learning and building my site that represents me


