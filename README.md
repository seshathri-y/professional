# Early learning language & literacy milestone — Local preview

This small static site provides guidance for families to support children's language development.

How to preview locally

1. Open the folder in a code editor and open `index.html` directly in your browser.
2. Or serve it from a simple HTTP server (recommended) to ensure linked assets load correctly:

```bash
# from the project root
python3 -m http.server 8000
# then open http://localhost:8000
```

Files of interest

- `index.html` — main page
- `css/styles.css` — styles
- `js/main.js` — small interactive behaviors

Next steps

- Add translations or i18n support for multiple languages.
- Add printable PDF resources and accessible ARIA attributes improvements.
- Add automated tests or linting in CI if this grows into a larger site.
