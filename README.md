# personal portfolio & blog

a cozy Frieren-themed personal website with a game-y terminal easter egg.

## features

- portfolio showcase for coding projects
- blog powered by Supabase
- interactive terminal with Frieren easter eggs (try typing `frieren`, `magic`, or `flower field`)
- contact form
- responsive design

## tech stack

- **frontend:** static HTML, CSS, vanilla JavaScript
- **blog backend:** Supabase (free tier)
- **hosting:** GitHub Pages

## local development

```bash
# serve the static site locally
cd docs
python3 -m http.server 8080

# then visit http://localhost:8080
```

## deploying to github pages

1. go to your repo settings on GitHub
2. navigate to Pages
3. set source to "Deploy from a branch"
4. select `main` branch and `/docs` folder
5. save - your site will be live at `https://yourusername.github.io/frances-website`

## setting up supabase for blog

1. create a free account at [supabase.com](https://supabase.com)
2. create a new project
3. create a `posts` table with:
   - `id` (int8, primary key, auto-increment)
   - `title` (text)
   - `body` (text)
   - `created_at` (timestamptz, default: now())
4. go to Settings > API to get your URL and anon key
5. update `docs/js/supabase-config.js` with your credentials

## project structure

```
frances-website/
├── docs/                  # static site for GitHub Pages
│   ├── index.html
│   ├── blog.html
│   ├── portfolio.html
│   ├── contact.html
│   ├── css/style.css
│   └── js/
│       ├── main.js
│       └── supabase-config.js
├── templates/             # Flask templates (legacy/local dev)
├── app.py                 # Flask app (for local development)
└── PLANNING.md
```

frances
