/**
 * Copyright (c) 2026 Tetsuya Higashi
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import type { SiteProfile } from "../shared/ts/lib/profile";

/** TypeScript のドキュメント (www.typescriptlang.org/docs) の設定. 本文は main の中の article. */
export const site: SiteProfile = {
  name: "TypeScript Doc Trans",
  host: "www.typescriptlang.org",
  pathPrefix: "/docs/",
  homeUrl: "https://www.typescriptlang.org/docs/handbook/intro.html",
  contentSelectors: ["main article"],
  removeSelectors: [".prev-next"],
  titleSuffix: / - .*$/,
  // 左のメニュー (目次). サーバーが HTML に出す. グループは, リンクのないボタンの項目
  menu: { type: "html", selector: "#sidebar" },
  // URL に版はない (いつも最新の TypeScript のドキュメント). メニューの Release Notes の一覧
  // (`release-notes/typescript-6-0.html` など) の, 一番新しい版を, 今の版として読み取って,
  // 翻訳のキャッシュを, 版ごとに分ける (版は選べない. TypeScript の版が上がったら, 新しく翻訳する)
  versionSource: {
    url: "https://www.typescriptlang.org/docs/handbook/intro.html",
    pattern: /release-notes\/typescript-(\d+-\d+)\.html/,
    highest: true,
  },
};
