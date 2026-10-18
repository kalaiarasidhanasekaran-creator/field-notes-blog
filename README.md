# The Art of Being Kalai

A small multi-page personal site with a searchable journal, a portfolio gallery, a publish guide, responsive layouts, and a saved light/dark theme. The collage artwork uses CSS shapes and gentle 3D transforms; no image library or build process is required.

## Pages

- `index.html` — journal with topic filters, search, and article reader
- `portfolio.html` — portfolio mosaic with category filters
- `publish.html` — step-by-step instructions for adding stories and projects

## Add a journal post

Open `app.js` and add an object to the `posts` array. Keep the fields shown by the example on the Publish page. Categories are `Technology`, `Life`, and `Ideas`. Commit the edit in GitHub, and Pages publishes the update.

## Add portfolio work

1. Upload an image into the repository.
2. Add a project entry to the `projects` array in `portfolio.js`.
3. Set its `image` path (for example, `image: 'my-work.jpg'`) and add a caption, category, title, and short description. The included tiles are CSS starter artwork to replace with your own portfolio images.

## Update on GitHub

The site lives at https://kalaiarasidhanasekaran-creator.github.io/field-notes-blog/ and its public repository is https://github.com/kalaiarasidhanasekaran-creator/field-notes-blog. To write directly in your browser, open `app.js` or `portfolio.js` in the repository and choose the pencil icon. Save with **Commit changes**; GitHub Pages rebuilds the site automatically.

For local work, clone the repository, edit files, then run `git add .`, `git commit -m "Add a new post"`, and `git push` from your project folder.

## Run locally

Open `index.html` in a browser. Google Fonts load online, with system fallbacks available offline.
