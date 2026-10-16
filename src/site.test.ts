/**
 * Copyright (c) 2026 Tetsuya Higashi
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { describe, expect, it } from "vitest";
import { isDocUrl } from "../shared/ts/lib/docUrl";
import { extractPage } from "../shared/ts/lib/extract";
import { collectSegments } from "../shared/ts/lib/segments";
import { site } from "./site";

/** 作り物の TypeScript のドキュメント風のページ (ドキュメントの文章は使わない). */
const PAGE = `<html><head><title>TypeScript: Sample - The Sample Page</title></head><body>
<nav aria-label="top menu">Top menu</nav>
<main role="main"><nav aria-label="sidebar" id="sidebar"><ul>
<li class="closed"><button aria-expanded="false">Group<span></span></button>
<ul><li><a href="/docs/handbook/one.html">One</a></li></ul></li>
<li><a href="/docs/handbook/two.html">Two</a></li></ul></nav>
<article><div class="markdown"><h1>Sample</h1>
<p>Call <code>run</code> now. See <a href="other.html">Other</a>.</p>
<pre><code>const x = 1;</code></pre></div>
<div class="prev-next">Next page</div></article></main>
<article id="community-links">Community</article></body></html>`;

describe("TypeScript site profile", () => {
  it("opens only the docs of the site", () => {
    expect(isDocUrl(site.homeUrl, site)).toBe(true);
    expect(isDocUrl("https://www.typescriptlang.org/play/", site)).toBe(false);
    expect(isDocUrl("https://example.com/docs/a.html", site)).toBe(false);
  });

  it("takes the article in the main, strips the site name, and makes the links absolute", () => {
    const page = extractPage(PAGE, site.homeUrl, site);
    expect(page.title).toBe("TypeScript: Sample");
    expect(page.html).not.toContain("Top menu");
    expect(page.html).not.toContain("Next page");
    expect(page.html).not.toContain("Community");
    expect(page.html).toContain('href="https://www.typescriptlang.org/docs/handbook/other.html"');
  });

  it("does not translate the code blocks", () => {
    const root = document.createElement("div");
    root.innerHTML = extractPage(PAGE, site.homeUrl, site).html;
    const texts = collectSegments(root).map((element) => element.textContent);
    expect(texts).toEqual(["Sample", "Call run now. See Other."]);
  });

  it("reads the sidebar, with the group that has a button instead of a link", () => {
    const { menu } = extractPage(PAGE, site.homeUrl, site);
    expect(menu.map((item) => [item.title, item.url])).toEqual([
      ["Group", undefined],
      ["Two", "https://www.typescriptlang.org/docs/handbook/two.html"],
    ]);
    expect(menu[0].children.map((item) => item.title)).toEqual(["One"]);
  });
});
