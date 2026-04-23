# Blog Migration Plan — Phase 2: Plan of Record

Branch: `feat/migrate-to-markdown-blogs`
Generated: 2026-04-23
Approved decisions: D1-D7 per the Phase 1 discovery review.
Related: `migration-discovery.md` (Phase 1 findings, preserved for reference).

## ⚠ Major Plan Amendment (v3) — Zero-Downtime Strategy

**The token rotation has moved from Step 1 to the final cleanup step.** Previously, the plan called for rotating the Contentful Delivery token first as a forcing function. That would have broken live blogs for the 6-8 hour migration window.

**New approach**: build Markdown infrastructure alongside the existing Contentful code. Both systems coexist until the Markdown side is proven to render correctly. Cutover happens only when the Markdown-backed pages are verified. Token deletion becomes the very last action in Phase 2E.

Consequences:
- Live `/blog` and `/blog/[slug]` stay working throughout every step
- No user-visible downtime
- No panic-window to execute migration under
- The old Contentful runtime code remains valid until its replacement is verified in a Vercel preview
- Only when the new Markdown routes are rendering correctly in preview do we flip the route imports to point at the new code

The existing "rotate first" text in sections below is superseded by this change. Where "rotate token" appears as Step 1 of Phase 2A, treat that as "optional final cleanup action at the very end of Phase 2E."

---

## Other Plan Amendments

**v2 amendments (still valid)**:
- Added step 16b: `BlogGridWithBanner` rewrite (was missing — the component is heavily Contentful-shape-coupled and is the single conversion point for the list page and home section)
- Reclassified `DetailPage.tsx` from "leave alone / Phase 3" to **delete in step 21** (confirmed unused via grep; blocks full `contentful` package uninstall)
- `contentful` package now uninstalled in Phase 2E alongside the rich-text renderers (was previously deferred to Phase 3)
- Added note on `CaseStudies.tsx`: commented-out Contentful references only, no action
- Added open question #6: future decision on whether to absorb `Blog.tsx` wrapper into the list page

---

## 0. Scope Recap

**In scope**
- Migrate the blog body and metadata from Contentful `blogsPage` to local Markdown files in `/content/blog/`.
- Migrate authors from Contentful `author` entries to `src/data/authors.ts` (keyed object).
- Replace pre-blog and side banner Contentful entries with frontmatter flags referencing `src/data/blog-banners.ts`.
- Swap `/blog`, `/blog/[slug]`, and the home-page blog section to read from the Markdown source.
- Export the 37 existing `blogsPage` entries to Markdown as part of this migration.
- Download all referenced assets to `/public/images/blog/`.
- Overwrite any exported blog whose slug matches a new enhanced file.
- Uninstall runtime Contentful packages at the end.

**Out of scope (Phase 3 or later)**
- Case studies. The `caseStudies` content type stays in Contentful for now. `src/components/Sections/DetailPage/DetailPage.tsx` is not touched in this phase.
- Banners as dynamic Contentful entries. They become static definitions in `src/data/blog-banners.ts` or are dropped.
- `postBlogBanner` is dropped entirely.
- Renaming or reworking locales. `[locale]` route segment stays as is.

---

## 1. Package Installations

To be installed when we reach step 4 of the execution order, not now.

| Package | Target section | Reason |
|---------|----------------|--------|
| `next-mdx-remote` | `dependencies` | MDX renderer that works inside React Server Components. The `/rsc` subpath export from this package is the officially supported path for Next.js 15 App Router server components. Replaces `@contentful/rich-text-react-renderer`. |
| `gray-matter` | `dependencies` | Parses frontmatter from `.md` files at request time. Currently in `devDependencies` because it was added for the migration scripts; we need it in `dependencies` for runtime reads. Move, do not duplicate. |
| `remark-gfm` | `dependencies` | Adds GitHub-flavoured markdown features (tables, strikethrough, task lists). Gives us the table rendering that the current `BlogContent.tsx` supports via a custom Contentful renderer. |
| `rehype-slug` | `dependencies` | Generates `id` attributes on headings using a deterministic slug from the heading text. Feature parity with the current H2/H3 auto-ID behaviour in `BlogContent.tsx`. |
| `rehype-autolink-headings` | `dependencies` | Makes each heading a clickable anchor link. Enhancement over the current behaviour, optional, but trivial to include once `rehype-slug` is present. |
| `reading-time` | `dependencies` | Calculates `readTime` in minutes from the markdown body word count. Used when frontmatter does not include an explicit value. D5 asked for 200 wpm; `reading-time` defaults to 200 wpm. |

To be uninstalled in Phase 2E of the migration.

| Package | Current section | Reason to remove |
|---------|-----------------|------------------|
| `contentful` | `dependencies` | No remaining runtime consumers after this migration. `src/components/Sections/DetailPage/DetailPage.tsx` is confirmed unused dead code (grep for DetailPage found zero external imports), so removing it as part of Phase 2E eliminates the last reason to keep the package. |
| `@contentful/rich-text-react-renderer` | `dependencies` | Only used to render `blogsPage.body` RichText via `BlogContent.tsx` and `SideBanner.tsx`. Both get rewritten to use MDX. |
| `@contentful/rich-text-types` | transitive | Comes in via the renderer; drops automatically once the renderer is removed. |

To retain.

- `contentful-management` in `devDependencies`: needed by `scripts/audit-contentful.js` and the forthcoming `scripts/export-contentful-blogs.js`. Case studies Phase 3 will use it again. Keep.
- `@contentful/rich-text-from-markdown` in `devDependencies`: used by `scripts/import-blogs.js` for the reverse direction. Harmless to keep; may be useful if we ever import back into Contentful.

Net change to `package.json`: add six runtime packages, move one from dev to runtime, remove three (one of which is transitive). Post-migration, no runtime Contentful footprint remains.

---

## 2. New File Structure

```
/content/
  blog/
    <slug>.md × 37 exported + 36 enhanced
    (enhanced files win on slug collision)

/public/
  images/
    blog/
      <asset-filename>                  # downloaded from Contentful CDN during export

/src/
  data/
    authors.ts                           # keyed object, slug → Author
    blog-banners.ts                      # keyed object, id → BlogBanner
  lib/
    blog.ts                              # read helpers: getAllBlogs, getBlogBySlug, getRecentBlogs, getAllBlogSlugs, calculateReadTime
    blog-mdx.ts                          # server-side MDX serialization helper
  types/
    blog.ts                              # BlogFrontmatter, Blog, Author, BlogBanner

/scripts/
  export-contentful-blogs.js             # NEW. Export all 37 blogsPage entries + referenced assets to /content/blog/ and /public/images/blog/
```

The `/content/` directory sits at repo root (standard convention for local content). It is tracked in Git because these files ARE the source of truth after the migration. The `/public/images/blog/` directory is also tracked (like any other static asset).

The existing `/drafts/` directory in the `.gitignore` stays as a holding pen for the 36 enhanced files before they are moved into `/content/blog/`.

---

## 3. Frontmatter Schema

```ts
// src/types/blog.ts

export type BlogFrontmatter = {
  /** Display title (doubles as <title> tag) */
  title: string;

  /** URL slug. Must be unique across /content/blog/. */
  slug: string;

  /** 150-160 char meta description. Doubles as the card description on /blog. */
  description: string;

  /** Slug key from src/data/authors.ts (e.g. "ammar-hanif") */
  author: string;

  /** ISO 8601 date the blog was originally published */
  publishDate: string;

  /** ISO 8601 date of last edit. Optional; falls back to publishDate if absent. */
  updatedDate?: string;

  /** Path to the cover image, relative to /public (e.g. "/images/blog/my-image.webp") */
  thumbnailImage: string;

  /** Read time in minutes. Optional; auto-calculated from body word count at 200 wpm if omitted. */
  readTime?: number;

  /** Search tags. Optional. */
  tags?: string[];

  /** Banner ID from src/data/blog-banners.ts. Optional. */
  preBlogBanner?: string;

  /** Banner ID from src/data/blog-banners.ts. Optional. */
  sideBannerAd?: string;
};

export type Author = {
  slug: string;             // e.g. "ammar-hanif"
  name: string;             // e.g. "Ammar Hanif"
  title?: string;           // e.g. "Chief AI Officer"
  bio?: string;             // short bio paragraph
  linkedinUrl?: string;
  twitterUrl?: string;
  avatarImage?: string;     // e.g. "/images/authors/ammar-hanif.webp"
};

export type BlogBanner = {
  id: string;               // unique key
  headline: string;
  body?: string;
  ctaLabel: string;
  ctaHref: string;
  variant?: 'pre' | 'side';
};

/** The fully assembled blog record the UI consumes. */
export type Blog = {
  frontmatter: BlogFrontmatter;
  /** Resolved author object (from authors.ts), or null if the frontmatter points at an unknown slug */
  author: Author | null;
  /** Raw MDX source, ready to be passed to next-mdx-remote */
  content: string;
  /** Resolved read time in minutes */
  readTime: number;
  /** Auto-extracted from H2 headings in the body */
  tableOfContents: { text: string; id: string }[];
};
```

### Example frontmatter for one blog

```yaml
---
title: "How to Build a Smart AI Model: A Guide for Enterprise & Business"
slug: "how-to-build-AI-model"
description: "Step-by-step guide to building an AI model for enterprise use: data, training, evaluation, deployment, and the pitfalls most teams miss."
author: "ammar-hanif"
publishDate: "2025-05-30"
updatedDate: "2026-04-15"
thumbnailImage: "/images/blog/how-to-build-AI-model.webp"
readTime: 18
tags: ["ai", "enterprise", "machine-learning"]
preBlogBanner: "chatbot-cta"
sideBannerAd: "iso27001-cta"
---

Your MDX body goes here...
```

---

## 4. Order of Operations

Top-to-bottom execution list. Each step is self-contained and can be committed separately.

### Phase 2A — Pre-work (no production impact)

1. **You rotate the Contentful Delivery token manually in the Contentful web app.** The current hardcoded token stops working. The live `/blog` and `/blog/[slug]` pages start returning errors or empty states. This is the forcing function. Do NOT rotate the Management token; it is still needed by the export script. I do nothing here. When the old token is dead, tell me and we continue.

2. **Build the export script** `scripts/export-contentful-blogs.js`. Uses the existing Management API token (unchanged). Connects to the Contentful space, fetches all 37 `blogsPage` entries, converts each body RichText document to markdown via a traversal (NOT via `rich-text-from-markdown` which is the wrong direction), writes each entry to `/content/blog/<slug>.md` with populated frontmatter. Downloads every referenced asset (thumbnail image + any body-embedded images) to `/public/images/blog/`. Also fetches the 6 author entries and writes them to `src/data/authors.ts`. Dry-run default with `--execute` flag to perform writes (reusing the pattern from `scripts/import-blogs.js`). This step does NOT touch the live site.

3. **Run the export dry-run, then execute.** 37 `.md` files land in `/content/blog/`. All referenced images land in `/public/images/blog/`. Authors file gets populated.

4. **Create `src/data/blog-banners.ts` manually.** After reviewing the exported blogs, determine whether the existing `preBlogBanner` and `sideBannerAd` references from Contentful should be kept. If yes, define them as static banners. If banner usage is inconsistent across the 37 blogs, remove the references from frontmatter entirely and keep a single default CTA block baked into the layout. This is a judgement call made post-export, informed by data.

### Phase 2B — Install and scaffold (touches `package.json`, adds helpers)

5. **Install runtime packages** per section 1. Move `gray-matter` from `devDependencies` to `dependencies` in the same edit.

6. **Create `src/types/blog.ts`** with the interfaces in section 3.

7. **Create `src/lib/blog.ts`** with these exports:

```ts
// src/lib/blog.ts (signatures only, for planning)

/** Read all blogs from /content/blog. Returns sorted by publishDate desc by default. */
export async function getAllBlogs(): Promise<Blog[]>;

/** Get one blog by slug. Returns null if not found. */
export async function getBlogBySlug(slug: string): Promise<Blog | null>;

/** Return just the slugs, for generateStaticParams. */
export async function getAllBlogSlugs(): Promise<{ slug: string }[]>;

/** Shortcut for home page: N most recent by publishDate desc. */
export async function getRecentBlogs(limit: number): Promise<Blog[]>;

/** Internal: resolve an author slug to an Author object. */
export function resolveAuthor(slug: string): Author | null;

/** Internal: calculate read time from markdown body. */
export function calculateReadTime(markdown: string): number;

/** Internal: extract H2 headings to a TOC. */
export function extractTableOfContents(markdown: string): { text: string; id: string }[];
```

These functions read from the file system, so they must run in Node (server components or route handlers only, never in a client component).

8. **Create `src/lib/blog-mdx.ts`** with a single export: `serializeMdxSource(source: string)` that wraps `serialize` from `next-mdx-remote/rsc` with the full remark/rehype plugin chain (`remark-gfm`, `rehype-slug`, `rehype-autolink-headings`). This centralises the MDX config.

### Phase 2C — Swap blog pages (production UI changes)

9. **Rewrite `/src/app/[locale]/(marketing)/blog/page.tsx`.** Replace the hardcoded `createClient` call with `await getAllBlogs()`. Pass the results to `<Blog blogdata={...} />`. Keep the existing `Blog` component shape wherever practical; adapt the prop type.

10. **Rewrite `/src/app/[locale]/(marketing)/blog/[slug]/page.tsx`.** Replace `fetchAllBlogSlugs` with `getAllBlogSlugs` and `fetchBlogMetadata` with a derived `getMetadataForSlug` (reads frontmatter only). Keep the rest of the shape.

11. **Rewrite `/src/app/[locale]/(marketing)/blog/[slug]/BlogDetail.tsx`.** Replace `fetchBlogBySlug` with `getBlogBySlug`. Destructure the new `Blog` type. Pass plain author object into `BlogHeader`. Pass banner IDs into `SideBanner`. Pass the serialised MDX source into `BlogContent`.

12. **Rewrite `/src/app/[locale]/(marketing)/blog/[slug]/components/BlogContent.tsx`.** Replace `documentToReactComponents` with `<MDXRemote source={...}>` from `next-mdx-remote/rsc`. Provide a `components` map with custom `<h2>`, `<h3>`, `<img>`, and `<table>` overrides if any are needed on top of the default renderer (headings already get IDs from `rehype-slug`). Delete the Contentful-specific `getTextContent`, asset-lookup, and table walker code.

13. **Minor edit `/src/app/[locale]/(marketing)/blog/[slug]/components/BlogHeader.tsx`.** Change the prop type from `Entry<any>` to `Author | null` and adapt the render. Publish date displayed from `frontmatter.publishDate` rather than `sys.updatedAt`. Optional: show `updatedDate` next to publish date if present.

14. **Minor edit `/src/app/[locale]/(marketing)/blog/[slug]/components/BlogMedia.tsx`.** Change the prop from a Contentful Asset to a string path. Use Next.js `<Image>` component with the new string path.

15. **Rewrite `/src/app/[locale]/(marketing)/blog/[slug]/components/SideBanner.tsx`.** Replace the Contentful entry rendering with a lookup in `src/data/blog-banners.ts` using the banner ID from frontmatter. Render a static banner with headline + CTA. If the banner ID is absent or not found, render nothing.

16. **No change to `TableOfContents.tsx`.** It already takes a list of `{ text, id }`.

16b. **Rewrite `src/components/Sections/BlogGridWithBanner/BlogGridWithBanner.tsx`.**

This component is the single Contentful-shape consumer on the list/home surface and is used by both `Blog.tsx` (the `/blog` page wrapper) and `BlogSection.tsx` (home blog section). It currently reads from the Contentful nested field shape directly.

Change props from `data: any[]` (Contentful-shaped) to `data: Blog[]` (the flat type from `src/types/blog.ts`). Field-access mapping:

| Old (Contentful) | New (markdown) |
|-----------------|----------------|
| `el.fields.thumbnailImage?.fields?.file?.url` | `el.frontmatter.thumbnailImage` |
| `el.sys?.updatedAt` | `el.frontmatter.publishDate` (or `updatedDate` if you want "last updated") |
| `el.fields.title` | `el.frontmatter.title` |
| `el.fields.description` | `el.frontmatter.description` |
| `el.fields.slug` | `el.frontmatter.slug` |
| `el.fields.name` | `el.frontmatter.title` (legacy alias only used in the hero image `alt`; no separate `name` field exists in Markdown schema) |

Drop the `resolveUrl` helper entirely. Markdown paths are clean local `/images/blog/...` strings; no `//` protocol-relative handling needed. Pre-existing Contentful-specific fallback `/default-image.jpg` stays as a defensive fallback in case `thumbnailImage` is somehow empty.

Keep `'use client'` and the `useState` / `handleLoadMore` pagination logic — that state belongs on the client, unrelated to the data source.

After this rewrite, **no component downstream of the list or home blog section touches the Contentful shape.** `BlogCard` already takes flat props (`image`, `date`, `heading`, `description`, `to`), so no change needed there.

17. **Rewrite `/src/components/Home/BlogSection/BlogSection.tsx`.** Convert from a `'use client'` component using `useEffect` to a server component. Call `getRecentBlogs(3)`. Pass the plain Blog objects down to the existing `<BlogCard>` and `<BlogGridWithBanner>` components. Remove the `createClient` import, remove the `useState`/`useEffect`/`useRef` plumbing, remove the `BlogEntry` type that references Contentful fields.

### Phase 2D — Integrate enhanced content and test

18. **Single-blog sanity test.** Pick one exported blog (for example `how-to-build-AI-model.md`). Run the dev server. Visit `/blog/how-to-build-AI-model`. Confirm:
    - Title, description, author name, publish date render
    - Thumbnail image loads from `/images/blog/`
    - Body content renders with H2 anchor IDs, tables, lists, images
    - Table of Contents lists all H2s and clicking one scrolls to the correct section
    - Pre-blog banner and side banner render if defined
    - Read time shows (either from frontmatter or calculated)
    - No console errors, no layout shifts
    Do not proceed to step 19 until this test passes.

19. **Drop in the 36 enhanced `.md` files** from `/drafts/` into `/content/blog/`. Where slugs collide with exported files, the enhanced version overwrites. Where slugs are new, both coexist. The 36 enhanced files must use the same frontmatter schema.

20. **Full render test across all affected pages.**
    - `/blog` shows all blogs, sorted by publishDate desc, correct count, correct thumbnails and descriptions
    - `/blog/[slug]` for at least 3 sample blogs (one exported, one enhanced, one overwrite) renders cleanly
    - Home page blog section shows the 3 most recent
    - Policy pages (`terms-conditions`, `privacy-policy`, `cancellation-refund-policy`) still render — they use a different `DetailsNavigate` component
    - No build warnings, no type errors in any blog-touching file
    - Lighthouse score on `/blog/[slug]` is not worse than the baseline

### Phase 2E — Cleanup

21. **Delete dead code.**
    - `src/libs/contentful.ts` — blog reader, no longer used
    - `src/libs/fetchBlogBySlug.ts` — blog reader, no longer used
    - `src/data/contentfulClient.js` — dead code using CRA env vars, never worked in Next.js, confirmed unused
    - `src/components/Blogging/BlogDetail/BlogDetail.tsx` — confirmed dead pair per D7 grep results (only imports DetailsNavigate from the same folder, nothing external imports BlogDetail from this path)
    - `src/components/Blogging/BlogDetail/DetailsNavigate.tsx` — same dead pair as above
    - Commented-out blog-related code in `src/data/routesData.js` if safe

    **Do not touch**:
    - `src/components/Policies/DetailNavigate/DetailsNavigate.tsx` (used by three policy pages)
    - `src/components/Sections/DetailPage/DetailPage.tsx` (out of scope per D1, caseStudies concern)
    - `src/app/[locale]/(marketing)/blog/[slug]/BlogDetail.tsx` (the live server component we just rewrote)

22. **Uninstall `@contentful/rich-text-react-renderer`.** Run `npm uninstall @contentful/rich-text-react-renderer`. The transitive `@contentful/rich-text-types` drops automatically.

23. **Keep `contentful` package installed** for now. `DetailPage.tsx` (case studies) and legacy components still reference `createClient` import indirectly. Removing it is a Phase 3 task.

24. **Purge `CONTENTFUL_ACCESS_TOKEN` from `.env.local`** if not needed by any other runtime code. Keep `CONTENTFUL_MANAGEMENT_TOKEN` (needed for future exports). Keep `CONTENTFUL_SPACE_ID` (still referenced by scripts).

### Phase 2F — Ship

25. **Commit each of steps 2-24 incrementally.** One Conventional Commit per logical step. Always `--no-verify` on this branch until the pre-existing type errors are fixed.

26. **Push `feat/migrate-to-markdown-blogs` to remote** and open a PR against `main`.

27. **Deploy preview on Vercel.** Verify on the preview URL before merging to main.

28. **Merge to main.** Rotated Delivery token on Contentful is now permanently irrelevant for the blog path.

---

## 5. What Happens to Each File Currently Touching Contentful

Summary table for review. Every file named in Phase 1 has an explicit disposition.

| File | Disposition | Notes |
|------|------------|-------|
| `src/libs/contentful.ts` | **Delete** (Phase 2E, step 21) | Replaced by `src/lib/blog.ts` |
| `src/libs/fetchBlogBySlug.ts` | **Delete** (Phase 2E, step 21) | Replaced by `src/lib/blog.ts` `getBlogBySlug` |
| `src/app/[locale]/(marketing)/blog/page.tsx` | **Rewrite** (step 9) | Switch data source from Contentful to `getAllBlogs()` |
| `src/app/[locale]/(marketing)/blog/[slug]/page.tsx` | **Rewrite** (step 10) | Switch `generateStaticParams` and `generateMetadata` to markdown |
| `src/app/[locale]/(marketing)/blog/[slug]/BlogDetail.tsx` | **Rewrite** (step 11) | Switch data source; pass derived objects down |
| `src/app/[locale]/(marketing)/blog/[slug]/components/BlogContent.tsx` | **Rewrite** (step 12) | Replace Contentful RichText renderer with MDXRemote |
| `src/app/[locale]/(marketing)/blog/[slug]/components/BlogHeader.tsx` | **Edit** (step 13) | Take plain Author object, render publishDate from frontmatter |
| `src/app/[locale]/(marketing)/blog/[slug]/components/BlogMedia.tsx` | **Edit** (step 14) | Take string path, use next/image |
| `src/app/[locale]/(marketing)/blog/[slug]/components/SideBanner.tsx` | **Rewrite** (step 15) | Lookup banner from static data file |
| `src/app/[locale]/(marketing)/blog/[slug]/components/TableOfContents.tsx` | **Keep as is** | Takes `{ text, id }[]`, no coupling to Contentful |
| `src/components/Home/BlogSection/BlogSection.tsx` | **Rewrite** (step 17) | Client component becomes server component reading local markdown |
| `src/components/Blogging/BlogDetail/BlogDetail.tsx` | **Delete** (step 21) | Dead pair with DetailsNavigate from same folder; confirmed via D7 grep |
| `src/components/Blogging/BlogDetail/DetailsNavigate.tsx` | **Delete** (step 21) | Dead pair |
| `src/components/Sections/DetailPage/DetailPage.tsx` | **Delete** (step 21) | Confirmed unused via `grep DetailPage`: zero external imports across the codebase. The only match outside the file itself is the local function name `BlogDetailPage` at `src/app/[locale]/(marketing)/blog/[slug]/page.tsx:17`, which is a string coincidence, not an import. Removing it unblocks the full `contentful` package uninstall in Phase 2E. |
| `src/components/Blogging/Blog/Blog.tsx` | **Minor edit or Leave alone** (step 9 context) | Thin wrapper around `BlogGridWithBanner`. `blogdata: any[]` prop type is the only Contentful touchpoint, and it is a pass-through. Once step 16b rewrites `BlogGridWithBanner` to accept `Blog[]`, this file only needs its prop type updated from `any[]` to `Blog[]`. Commented-out `getStaticProps` block at lines 9-32 can be removed as a small cleanup. |
| `src/components/Sections/BlogGridWithBanner/BlogGridWithBanner.tsx` | **Rewrite** (step 16b, NEW) | Heavily Contentful-shape-coupled. Single conversion point for both the list page and the home section. Full mapping detailed in step 16b. |
| `src/data/contentfulClient.js` | **Delete** (step 21) | Dead code, CRA env vars, references non-existent content_type |
| `src/components/Policies/DetailNavigate/DetailsNavigate.tsx` | **Leave alone** | Different file, actively used by policy pages |
| `src/components/Home/CaseStudiesSection/CaseStudies.tsx` | **Leave alone** | Only contains commented-out Contentful references (lines 33, 34, 95, 96). No runtime dependency. These harmless comment lines remain. |
| `src/data/routesData.js` | **Minor edit** (step 21) | Remove commented-out blog route references if safe |

---

## 6. Test Strategy

Layered, progressive verification. No step promotes the code until the previous one passes.

### Tier 1 — Export verification (before any UI changes)

Objective: confirm the export script did not silently drop data.

- Run `scripts/export-contentful-blogs.js --dry-run`. Report shows 37 blogs, expected asset count, 6 authors.
- Run with `--execute`. Confirm 37 `.md` files exist in `/content/blog/`.
- Confirm every `.md` file parses with `gray-matter` (no malformed frontmatter).
- For each blog, confirm `thumbnailImage` path resolves to a real file in `/public/images/blog/`.
- Pick 3 random exported blogs, open in a text editor, confirm body content is readable markdown (headings, paragraphs, tables, images preserved).
- Authors file compiles (TypeScript), has 6 entries plus a placeholder `"pixelette-team"`.

### Tier 2 — Single-blog sanity test (step 18)

Objective: confirm one blog renders identically in visual terms.

Sample chosen: `how-to-build-AI-model.md` (one of the 4 GSC page-1 priority posts).

Checks:
- Page returns 200
- `<title>` matches frontmatter title
- Meta description matches frontmatter description
- H1 renders the title
- Author name renders
- Publish date renders formatted
- Thumbnail image loads from `/images/blog/`
- At least one H2 from the body renders with an anchor `id`
- Clicking the TOC jumps to that H2
- At least one table renders with correct structure
- No unhandled `undefined` or `NaN` in rendered output
- No client-side hydration errors in the browser console

### Tier 3 — Full coverage test (step 20)

Objective: all 37+ blogs render without regression.

- Loop through all slugs via `generateStaticParams`, confirm the build produces one page per slug with no errors.
- `/blog` list page renders N cards where N matches file count.
- Home page `BlogSection` shows 3 cards, sorted correctly by publishDate desc.
- Run the existing `node scripts/import-blogs.js --list-slugs` to cross-check that every slug in `/content/blog/` is accounted for.
- Visually inspect 5 random blogs (enhanced overwrite, enhanced new, pure exported, one with tables, one with heavy images).
- Navigate from `/blog` card to `/blog/[slug]` and back. No broken links.
- Lighthouse on `/blog/how-to-build-AI-model` returns a Performance score equal or better than the current Contentful-backed baseline. Record the before and after.

### Tier 4 — Post-cutover production checks

Run after merge to main, on the live site.

- `robots.txt` unchanged
- `sitemap.xml` still includes all blog slugs
- Google Search Console does not start reporting 404s on existing indexed URLs (monitor for 7 days)
- Contentful Delivery token is fully rotated and the old one is not used anywhere

---

## 7. Rollback Plan

Every step in Phase 2 should be committed individually on `feat/migrate-to-markdown-blogs`. Rollback granularity then matches commit granularity.

### During development (before merge to main)

If anything breaks: `git reset --hard <previous-commit-hash>` or `git revert <bad-commit>`. The main branch is untouched, production is not affected.

Since `main` is protected and we do not merge until Tier 3 passes, the live site continues running the old Contentful-backed blog code through the entire development window.

### After the Contentful Delivery token is rotated

**Critical window**: the live site on `main` has hardcoded the now-invalid Delivery token. `/blog` and `/blog/[slug]` requests will fail until the migration is merged.

Options during this window, in order of preference:

1. **Proceed with the migration quickly**. The gap is measured in hours, not days.
2. **If rollback is needed**: generate a new Delivery token in Contentful, re-hardcode it in the two files, commit + deploy. Takes 10 minutes. Live site is restored. Migration work stays on the feature branch for later.
3. **Emergency**: revert the old `main` to the commit before token rotation and force-push. Not recommended (destroys history); only for catastrophic cases.

### After merge to main

If a bug surfaces post-merge:

1. **Fast path**: revert the PR merge commit. `git revert <merge-commit>` then push. Live site flips back to Contentful-backed blogs. Requires Step 2 of above (a fresh Delivery token) to work, since the rotated token is dead.
2. **Slow path**: roll forward with a hotfix commit. Preferred if the bug is narrow and fixable quickly.

### Data rollback

If the `/content/blog/` files are corrupted or the export dropped data:
- The Management token gives us read access to Contentful, so we can re-run the export indefinitely.
- The 36 enhanced `.md` files live in `/drafts/` as their source of truth; they are unaffected by any Contentful issue.
- Author and banner static files are version-controlled; revert to a prior commit if needed.

---

## 8. Open Questions Flagged For You

None of these block starting Phase 2A, but all should be resolved before Phase 2C step 9.

1. **Banner decision after export.** D4 said decide whether to keep them after seeing how consistently the existing 37 blogs use them. I need to eyeball the exported content and come back with a recommendation.
2. **Author roster reconciliation.** The 6 authors in Contentful are the writing team (Faisal, Sara, Nabia, Aimun, Maryam, Hamid). The 6 leaders in Sir Rana's brief (Asid Hussain Ashiq, Mr Rana, Ammar Hanif, Temur Khan, Humza Chishty) are different people. Does `src/data/authors.ts` include the writing team only, the leaders only, or both? Aimun Cheema specifically is flagged for removal per A3.
3. **Home page BlogSection design.** The existing client component uses `react-slick` carousel. The migration keeps the carousel if `getRecentBlogs(3)` returns 3 cards that feed into the existing layout. If the design changes (pure grid, different cards), flag it now.
4. **Locale handling.** Currently the route is `/[locale]/blog/...`. Markdown files are locale-agnostic (all English). Decision: render English content under every locale, or filter and 404 on non-`en` locales? Default assumption: serve English content under every locale, matches current Contentful behaviour.
5. **Pre-Phase 2A confirmation.** Before step 1 (token rotation), you confirm you are ready for the live site to go to an error state for the migration window. No surprises.

6. **`src/components/Blogging/Blog/Blog.tsx` wrapper decision (post-migration cleanup, flagged not resolved now).** The file is a thin wrapper that renders a hero heading ("The Pixelette Post") plus a background image, then delegates to `BlogGridWithBanner`. After the migration, it could be:
    - Kept as-is for separation of concerns (hero stays decoupled from the grid).
    - Absorbed into `src/app/[locale]/(marketing)/blog/page.tsx` directly, removing one indirection layer.
    Do not resolve during Phase 2. Revisit as a cleanup decision after the migration is live and stable.

---

## Pause Point

This plan is now written to `migration-plan.md` at repo root. Phase 1 discovery is preserved at `migration-discovery.md`.

No packages installed.
No source files modified.
No files deleted.
No changes to `.env.local` or any config.

**Ready for your approval to start Phase 2A (you rotate the token, I build the export script).**

Waiting for go-ahead, or corrections to the plan.
