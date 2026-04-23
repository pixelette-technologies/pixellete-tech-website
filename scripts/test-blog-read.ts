/* eslint-disable no-console */
/**
 * One-off test script for the markdown blog read pipeline.
 * Run: npx tsx scripts/test-blog-read.ts
 *
 * Exercises src/lib/blog.ts end-to-end against content/blog/*.md.
 * Pure read-only. No side effects.
 */

import { getAllBlogs, getBlogBySlug, getBlogSlugs } from '../src/lib/blog';

function main() {
  console.log('=== BLOG READ PIPELINE TEST ===\n');

  const slugs = getBlogSlugs();
  console.log(`1. getBlogSlugs() returned ${slugs.length} slug(s):`);
  slugs.forEach(s => console.log(`   - ${s}`));
  console.log('');

  const all = getAllBlogs();
  console.log(`2. getAllBlogs() returned ${all.length} blog(s), sorted by publishDate desc.`);
  console.log('');

  if (all.length === 0) {
    console.log('No blogs to inspect. Populate content/blog/ with .md files and re-run.');
    return;
  }

  const first = all[0]!;
  console.log('3. First blog frontmatter:');
  console.log(JSON.stringify(first.frontmatter, null, 2));
  console.log('');

  console.log('4. First blog body (first 200 chars):');
  console.log('---');
  console.log(first.content.substring(0, 200));
  console.log('---');
  console.log('');

  // Round-trip: fetch the first blog by its own slug
  const sameBlog = getBlogBySlug(first.frontmatter.slug);
  const roundTripOk = sameBlog?.frontmatter.slug === first.frontmatter.slug;
  console.log(`5. Round-trip getBlogBySlug("${first.frontmatter.slug}"): ${roundTripOk ? 'OK' : 'FAIL'}`);
  console.log('');

  console.log('=== TEST COMPLETE ===');
}

main();
