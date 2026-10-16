/**
 * Copyright (c) 2026 Tetsuya Higashi
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import type { SiteProfile } from "../shared/ts/lib/profile";

/** TypeScript のドキュメント (www.typescriptlang.org/docs) の設定. 本文は main の中の article. */
export const site: SiteProfile = {
  name: "TypeScript Doc",
  host: "www.typescriptlang.org",
  pathPrefix: "/docs/",
  homeUrl: "https://www.typescriptlang.org/docs/handbook/intro.html",
  contentSelectors: ["main article"],
  removeSelectors: [".prev-next"],
  titleSuffix: / - .*$/,
  // 左のメニュー (目次). サーバーが HTML に出す. グループは, リンクのないボタンの項目
  menu: { type: "html", selector: "#sidebar" },
};
