# Project Planning – website

## Overview

my personal website:
portfolio & blog

tech stack: html, css, javascript, supabase (static site hosted on github pages)

features:
- [x] dynamic blog (stored in supabase)
- [x] portfolio of coding projects
- [x] home/about section that reflects personal voice and values
- [x] contact form (basic, can add email integration later)
- [x] links to socials
- [x] frieren-themed terminal with easter eggs
- [x] custom cursor (frieren's staff) + twinkle effects
- [x] research page for angelman syndrome project

---

## Completed Features

### Homepage
- [x] hero section with typewriter effect
- [x] about me section with personal story
- [x] featured projects grid
- [x] frieren tagline

### Blog
- [x] supabase integration for dynamic posts
- [x] blog listing page
- [x] individual post pages
- [x] terminal-based post creation (login, write command)
- [x] line break formatting support

### Portfolio
- [x] project cards with teal borders
- [x] github links with purple buttons (teal on hover)
- [x] tags for technologies
- [x] wilkinsonlabtools, signl, profmeet, research, this website
- [x] "coming soon" placeholder

### Research Page
- [x] dedicated page for angelman syndrome motor analysis
- [x] abstract with methodology, results, future directions
- [x] poster image from linkedin
- [x] back link to portfolio

### Terminal (~ spells ~)
- [x] navigation commands (go blog, go portfolio, etc.)
- [x] cat files: frieren.txt, apothecary.txt, currently-consuming.md, grimoire.txt
- [x] frieren character easter eggs
- [x] admin commands (login, write, logout)

### Styling
- [x] custom frieren-inspired color palette
- [x] custom cursor (frieren's staff svg)
- [x] twinkle effect on click
- [x] responsive design
- [x] teal project cards, purple buttons

---

## Deployment

- [x] static site in /docs folder
- [ ] push to deploy branch
- [ ] merge to main
- [ ] enable github pages from main/docs

---

## Notes
- switched from flask to static site for simplicity
- using supabase for blog backend (anon key is public by design, rls protects data)
- frieren + apothecary diaries themed throughout

