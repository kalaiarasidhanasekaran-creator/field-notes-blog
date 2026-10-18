# Field Notes — personal blog

A responsive, static personal blog. It has topic filters, search, article reader dialogs, a saved light/dark theme, and no build step or server requirement.

## Preview locally

Open `index.html` in a browser. Fonts load from Google Fonts; the page uses system fallbacks if those fonts are unavailable.

## Make it yours

1. In `index.html`, change the `Field Notes` site name, headline, intro, about text, and `hello@example.com` email address.
2. In `app.js`, replace the six clearly marked starter/example posts with your own writing. Each post has an `id`, `category` (`Technology`, `Life`, or `Ideas`), `date` (`YYYY-MM-DD`), `title`, `excerpt`, `icon`, `read`, `subtitle`, and `body` (an array of paragraphs).
3. Add a new object to the `posts` array in `app.js`. To add a topic, add a filter button in `index.html` with `data-filter="Your topic"`.
4. Update the description and page title in `index.html`.

The sample articles are generic starter copy, not personal facts about the site owner. Replace them before sharing if you want the journal to contain only your words.

## Publish with GitHub Pages

1. Create a new, empty repository on GitHub.
2. From this folder, run:

   ```powershell
   git init
   git add .
   git commit -m "Build personal blog"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
   git push -u origin main
   ```

3. In the repository on GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**, choose `main` and `/(root)`, then save.
5. GitHub will show the published site URL in the Pages section after its first deployment.

No domain, credentials, tracking scripts, or backend are required. Posts are edited in `app.js` and published through a Git commit and push. To add a custom domain later, configure it in GitHub Pages and point your domain's DNS records to GitHub Pages.
