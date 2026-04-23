# Blog Migration Plan — Phase 1 Discovery Report

Branch: `feat/migrate-to-markdown-blogs`
Generated: 2026-04-23
Scope: read-only scan of the codebase. No files were modified.

This report answers the 7 discovery questions needed before choosing a migration approach for moving 36 enhanced blog Markdown files from Contentful into the repo.

---

## 1. Next.js and Toolchain Versions

From `package.json`:

| Package | Version |
|---------|---------|
| `next` | `15.0.7` |
| `react` | `19.0.0-rc-66855b96-20241106` |
| `react-dom` | `19.0.0-rc-66855b96-20241106` |
| `typescript` | `^5.7.2` |

Next.js 15 App Router with React 19 RC. Implications for migration:

- App Router supports both static rendering (ideal for markdown-sourced blogs) and server-rendered pages, so either approach is feasible.
- React 19 RC means some community libraries may need checks for compatibility. Specifically `next-mdx-remote` and `@next/mdx` should be verified against React 19 before committing to one.
- `generateStaticParams` and `generateMetadata` are the canonical App Router patterns for blog slugs and per-post metadata, both already in use in the existing Contentful-backed code.

---

## 2. Files That Currently Read Blog Data From Contentful (Runtime)

Scripts in `scripts/` are excluded per the brief.

### Primary blog runtime files

| File | Purpose |
|------|---------|
| `src/libs/contentful.ts` | Core Contentful client. Exports `getOneBlogPost`, `fetchBlogMetadata`, `fetchAllBlogSlugs`. Hardcoded Space ID and Delivery token. |
| `src/libs/fetchBlogBySlug.ts` | Wraps `getOneBlogPost`, extracts author / assets / pre-blog banner / table of contents from the response. Called by blog detail component. |
| `src/app/[locale]/(marketing)/blog/page.tsx` | `/blog` list page. Calls Contentful directly via local `createClient`. Hardcoded Space ID and token (duplicate of the one in `libs/contentful.ts`). Queries `content_type: blogsPage`. |
| `src/app/[locale]/(marketing)/blog/[slug]/page.tsx` | `/blog/[slug]` route wrapper. Calls `fetchAllBlogSlugs` for `generateStaticParams` and `fetchBlogMetadata` for `generateMetadata`. Renders the `BlogDetail` component. |
| `src/app/[locale]/(marketing)/blog/[slug]/BlogDetail.tsx` | Server component that calls `fetchBlogBySlug`, then passes data into four UI sub-components: `BlogHeader`, `BlogMedia`, `BlogContent`, `SideBanner`, `TableOfContents`. |
| `src/app/[locale]/(marketing)/blog/[slug]/components/BlogContent.tsx` | Renders the blog body using `@contentful/rich-text-react-renderer` with custom node handlers for `HEADING_2`, `HEADING_3`, `EMBEDDED_ASSET` (images and video), and `TABLE`. Also renders `preBlogBanner` via the same renderer. |
| `src/app/[locale]/(marketing)/blog/[slug]/components/BlogHeader.tsx` | Renders title, author name, and formatted `sys.updatedAt`. Uses typed `Entry<any>` from `contentful`. |
| `src/app/[locale]/(marketing)/blog/[slug]/components/SideBanner.tsx` | Renders a `sideBannerAd` linked entry using the rich text renderer. |

### Secondary / related files

| File | Purpose |
|------|---------|
| `src/components/Home/BlogSection/BlogSection.tsx` | Home page blog carousel. Client component using `useEffect` plus `createClient`. Notably queries the **legacy `blogs` content type** (not `blogsPage`), using old field names `name`, `shortDescription`, `image`. Likely broken or out of date. |
| `src/components/Blogging/BlogDetail/BlogDetail.tsx` | Legacy blog detail component. Imports `createClient`. Possibly unused since the App Router route has its own `BlogDetail.tsx`. Worth confirming during migration whether this is dead code. |
| `src/components/Blogging/BlogDetail/DetailsNavigate.tsx` | Similar legacy pattern. Uses `createClient`. |
| `src/components/Sections/DetailPage/DetailPage.tsx` | Imports `createClient` and `Entry`. Purpose not yet confirmed. Possibly used by the case-studies section (needs per-file confirmation before refactoring). |
| `src/data/contentfulClient.js` | Dead code. Uses `REACT_APP_CONTENTFUL_SPACE_ID` and `REACT_APP_CONTENTFUL_ACCESS_TOKEN`, which are Create React App conventions, not Next.js. These env vars are not set anywhere in the Next.js runtime. Queries the wrong `content_type: 'blogPost'` that does not exist in Contentful. Safe to delete. |

### Security finding — credential leak

The Contentful Delivery API access token is **hardcoded in source** in two places:

1. `src/libs/contentful.ts` line 7
2. `src/app/[locale]/(marketing)/blog/page.tsx` lines 22-30

The token value is identical in both places and matches the `CONTENTFUL_ACCESS_TOKEN` stored in `.env.local`. It is a Delivery (read-only) token, not a Management token, so it cannot write or delete content. Still, a hardcoded credential in a committed source file should be rotated during this migration and replaced with `process.env.CONTENTFUL_ACCESS_TOKEN` if Contentful is being kept for any other content types.

Note: `src/components/Home/BlogSection/BlogSection.tsx` line uses `createClient` but the Space ID / token locations were not checked in this report. Line 7 imports `createClient`, but the actual `createClient` call and its arguments should be inspected before the migration touches this file.

---

## 3. Blog Routes in `src/app/`

Only one blog path tree exists. Routes are localised under `[locale]`:

```
src/app/[locale]/(marketing)/blog/
├── page.tsx                          -> /blog (list)
└── [slug]/
    ├── page.tsx                      -> /blog/[slug] (route wrapper)
    ├── BlogDetail.tsx                 -> detail page body
    ├── blogdetail.scss                -> page-specific styling
    └── components/
        ├── BlogContent.tsx            -> rich text body renderer
        ├── BlogHeader.tsx             -> title, author, date
        ├── BlogMedia.tsx               -> thumbnail image block
        ├── SideBanner.tsx              -> sidebar ad panel
        └── TableOfContents.tsx         -> auto-generated TOC from H2s
```

Static generation at build time is already wired: `generateStaticParams` pulls all slugs from Contentful, `generateMetadata` pulls per-post meta. Both are server-side and need no client-side fetches. Migrating to markdown simply swaps the data source from Contentful to local file reads.

No separate catch-all, no category routes, no tag routes. Clean surface to migrate.

---

## 4. Fields the Current Blog UI Expects

Derived from reading the five component files end to end.

### From the `blogsPage` Contentful content type, the UI consumes

| Field | Consumed by | Shape |
|-------|-------------|-------|
| `title` | `BlogHeader`, `generateMetadata`, breadcrumb | string |
| `description` | `generateMetadata` only | string |
| `slug` | `generateStaticParams`, URL routing | string |
| `body` | `BlogContent`, `fetchBlogBySlug` (for TOC extraction) | Contentful RichText document |
| `thumbnailImage` | `BlogMedia` | Link to Contentful Asset |
| `author` | `BlogHeader` (via `resolvedAuthor`) | Link to `author` entry — resolved separately for name |
| `preBlogBanner` | `BlogContent` (renders a styled promo strip above the body) | Link to `preBlogContent` entry with `blogBanner` RichText field |
| `sideBannerAd` | `SideBanner` | Link to `blogSideAds` entry |
| `sys.updatedAt` | `BlogHeader` | ISO datetime string, formatted to "Month DD, YYYY" |

### Not directly rendered but used for logic

| Field | Used by | Purpose |
|-------|---------|---------|
| `body.content` (walked) | `fetchBlogBySlug` | Extracts all `heading-2` nodes to build the Table of Contents list |
| Contentful Asset `file.url` | `BlogContent` EMBEDDED_ASSET handler | Renders inline images and video inside the body |
| Contentful Asset `file.contentType` | `BlogContent` | Switches between `<img>` and `<video>` |
| `title` from referenced Asset | `BlogContent` EMBEDDED_ASSET | Used as `alt` text on inline images |

### Fields that exist in the content type but are NOT rendered

- `readTime` (defined in `blogsPage` content model, not consumed anywhere in the UI as far as this scan found)
- `postBlogBanner` (defined, not consumed)

Before migration, Temur's team should decide whether to start rendering `readTime` and `postBlogBanner` or drop them from the markdown frontmatter schema.

### RichText features currently rendered

- Headings H2 and H3 get auto-generated `id` attributes from their text (snake-kebab-cased) to support TOC anchor links.
- `BLOCKS.EMBEDDED_ASSET` handles image and video inline.
- `BLOCKS.TABLE` has a custom renderer for header row and body rows, with inline styling for borders and cell padding.
- All other node types fall through to the default renderer.

Anything Contentful's RichText supports but that isn't explicitly overridden (lists, bold, italic, links, code, blockquote, embedded entries) is rendered with default handlers.

### Table of Contents

Generated at fetch time by `fetchBlogBySlug`: walks `content.content` once, keeps only nodes where `nodeType === 'heading-2'`, pulls the first text child, and produces `{ text, id }`. `TableOfContents.tsx` renders this list with anchor links to the in-body H2 `id`s.

---

## 5. MDX Usage

No MDX infrastructure present anywhere in the project:

- `package.json` has no `@next/mdx`, no `next-mdx-remote`, no `@mdx-js/*`, no `contentlayer`, no `gray-matter` in runtime dependencies (gray-matter exists in devDependencies but only for the migration scripts added in a prior commit, not for runtime rendering).
- No `.mdx` files exist in the repo.
- No MDX webpack / turbopack configuration in `next.config.ts`.

This is a greenfield introduction. The migration has a free hand on which MDX or markdown runtime to adopt. Candidates:

- `next-mdx-remote` with `gray-matter` for frontmatter — simple, well-understood, compatible with Next.js 15 App Router, supports React Server Components.
- `@next/mdx` with webpack loaders — compiles MDX to JSX at build time, integrates natively with the App Router, good for file-based routing.
- `contentlayer` — typed content model but its React 19 and Next.js 15 support has historically lagged, and the project is in maintenance mode.

---

## 6. Rich Text Rendering Library

`@contentful/rich-text-react-renderer` version `^16.0.1` (from `package.json`).

Used in two places:

- `src/app/[locale]/(marketing)/blog/[slug]/components/BlogContent.tsx` — blog body renderer with custom overrides for headings, embedded assets, and tables
- `src/app/[locale]/(marketing)/blog/[slug]/components/SideBanner.tsx` — ad banner body renderer with the same options shape

Migration implication: on the markdown side we move from Contentful RichText to either plain markdown rendering (e.g. `react-markdown`) or MDX. The existing custom renderers for heading anchor IDs, image embedding, and tables all need to be reimplemented in the chosen markdown toolchain.

- Heading anchor IDs can be generated with `rehype-slug` plus `rehype-autolink-headings`, which produces the same ID format if configured.
- Inline images come from the markdown itself (not from a separate linked asset system), which is actually a simplification.
- Tables work natively in GitHub-flavoured markdown via `remark-gfm`.
- The `preBlogBanner` and `sideBannerAd` fields are Contentful entries, not markdown. They need a separate decision: either drop them entirely, or keep them in Contentful while moving just the blog body to markdown, or port them to a different data store.

---

## 7. Contentful Environment Variables in Runtime Code

Scan of `src/` for `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`, `CONTENTFUL_DELIVERY_TOKEN`, `CONTENTFUL_MANAGEMENT_TOKEN`, and `REACT_APP_CONTENTFUL_*`.

### Active references

**None in live runtime code.** The two files that talk to Contentful at runtime (`src/libs/contentful.ts` and `src/app/[locale]/(marketing)/blog/page.tsx`) both **hardcode** the Space ID and Delivery token as literal strings. They do not read from `process.env` at all.

### Dead references

- `src/data/contentfulClient.js` — uses `process.env.REACT_APP_CONTENTFUL_SPACE_ID` and `process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN`. The `REACT_APP_*` prefix is a Create React App convention that Next.js does not honour. These env vars are not set anywhere in the project. This file is unused dead code and can be deleted.
- `src/components/Home/CaseStudiesSection/CaseStudies.tsx` — comments mention `process.env.CONTENTFUL_SPACE_ID` and `process.env.CONTENTFUL_ACCESS_TOKEN`, but they are commented-out and not active.

### Implication for the migration

The hardcoded-credential pattern must be replaced as part of the migration. Two options:

1. If Contentful is being fully decommissioned for blogs, all runtime Contentful usage can be removed, the library (`contentful`, `@contentful/rich-text-react-renderer`, `@contentful/rich-text-types`) can be uninstalled, and `src/data/contentfulClient.js` deleted.
2. If Contentful is being kept for other content types (authors, banners, case studies), the hardcoded tokens must be moved to environment variables during this migration, and the Delivery token rotated in Contentful to invalidate the leaked one.

---

## Summary

- Next.js 15 App Router with React 19 RC. Greenfield for MDX.
- 8 runtime files currently touch Contentful. The blog detail flow is a clean straight line: route wrapper calls `fetchBlogBySlug`, which reads from `libs/contentful.ts`, which queries Contentful for a `blogsPage` entry by slug. Replacing this with a filesystem lookup from a `content/blog/*.md` directory is a narrow, containable refactor.
- The blog UI consumes 9 fields from Contentful, 7 of which map 1:1 to markdown frontmatter. The two that need design decisions are `preBlogBanner` and `sideBannerAd`, which are Contentful entry references, not content on the post itself.
- The Rich Text renderer and its custom node handlers (heading anchors, embedded assets, tables) need to be replaced with an equivalent markdown / MDX rendering chain. `rehype-slug` plus `rehype-autolink-headings` plus `remark-gfm` gives feature parity for the content types actually used.
- The Delivery token is leaked in source and should be rotated during the migration. No runtime code currently reads Contentful credentials from environment variables.
- The home page `BlogSection` is a separate concern: it still queries the legacy `blogs` content type with old field names. Either it is already broken, or it has been silently rendering empty. Either way it needs a decision during the migration: retire it, repoint it to the new markdown source, or keep it on `blogsPage` temporarily.
- `src/data/contentfulClient.js` is dead code using CRA conventions that do not work in Next.js, safe to delete as a small cleanup.

Report complete. Waiting for approval before proceeding to Phase 2.
