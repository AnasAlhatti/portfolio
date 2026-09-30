# Anas Alhatti — Portfolio

A bilingual English/Turkish portfolio for full-stack, AI, and Android work. Built with React 19, Vite, Tailwind CSS 3, and Framer Motion. Fonts and project screenshots are served locally; no backend, analytics, or external font requests are required.

## Development

Use Node **22.12 or newer** and npm.

```sh
npm ci
npm start
```

Open the `/portfolio/` URL printed by Vite. English is the first-visit default. The EN/TR switch stores an explicit preference under `portfolio-language`; it still works when browser storage is blocked.

```sh
npm run lint
npm test
npm run test:coverage
npm run build
npm run preview
```

`npm run dev` is an alias for `npm start`; `npm run test:watch` starts interactive testing. The production output is `dist/`.

## Editing content

- `src/content/projects.js` contains stable project IDs, technical tags, repository/demo links, original screenshot imports, and the English CV.
- `src/content/translations.js` contains matching `en` and `tr` dictionaries. Change copy in both dictionaries; keep the same object keys and array lengths. Translation tests check parity and required screenshot captions.
- `src/i18n/LanguageContext.jsx` supplies the language provider; `src/i18n/useLanguage.js` exposes `language`, `setLanguage`, and `t(path, placeholders)` to components. Document language, title, and description update with the selected locale. English social metadata and one canonical URL are retained.
- `src/components/` contains the page sections, shared motion, navigation, responsive images, and native screenshot dialog.
- `src/index.css` contains the visual tokens, responsive layouts, focus styling, and reduced-motion rules.

Project names and technology names stay unchanged across languages. The downloaded CV is explicitly labelled as English. No Turkish CV is included.

See [project content sources](docs/project-sources.md) for the READMEs supporting the engineering choices and the limits of those claims.

## Images and fonts

After adding or replacing an image in `src/assets/`, run:

```sh
npm run assets
```

This generates 640/1280px WebP variants without enlarging smaller originals, the source-set module, and the PNG social preview. Commit the generated assets alongside the original screenshots. Keep `public/social-preview.svg` as the editable preview source. Space Grotesk and Inter are bundled through Fontsource with Latin and Latin Extended subsets for Turkish characters.

## Browser verification

Build and start the production preview, then run in another terminal:

```sh
npm run verify:browser
```

The script uses an installed Chrome through Playwright. Set `BROWSER_CHANNEL=msedge` to use Edge, or `PORTFOLIO_URL` to change the default `http://localhost:4173/portfolio/`. It checks English and Turkish at 360, 768, and 1440 pixels, assets, navigation, disclosures, modal focus, language persistence, scroll position, and console errors. Screenshots and results are saved to ignored `artifacts/`.

```sh
npm run audit
```

This measures both languages with mobile Lighthouse against the running preview and saves HTML/JSON reports to `artifacts/`. Automated accessibility checks complement keyboard and visual inspection; they do not establish full WCAG compliance.

## Deployment

GitHub Actions runs lint, tests, and build, then uploads `dist/` to GitHub Pages on pushes to `master` (the existing remote branch), `main`, or a manual workflow run. Vite's base is `/portfolio/`; update that value, canonical/social URLs, and the workflow together if the repository path or domain changes.

Development happens on a feature branch. Publishing the rebuilt portfolio is a separate step; the implementation itself does not push or deploy it.
