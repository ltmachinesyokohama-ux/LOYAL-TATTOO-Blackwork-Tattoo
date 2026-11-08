
/*
 * LOYAL BLACKWORK — MULTI-PAGE DISCOVERY ENGINE
 * Version: 2.0.0
 * Date: 2026-11-08
 *
 * Author: Ihori / 伊彫
 * Studio: LOYAL TATTOO
 * Engineering: LT MACHINES
 * Organization: Loyal Arts Inc.
 *
 * Official website:
 * https://www.bavariancustomirons.jp/
 *
 * Blackwork hub:
 * https://www.bavariancustomirons.jp/blog/2026/03/03/192809
 *
 * PURPOSE
 * - Apply one runtime to all 105 registered source records
 * - Deduplicate canonical URLs (101 unique paths)
 * - Create a visible, categorized archive on the blackwork hub
 * - Add contextual internal links to every other target page
 * - Detect and restore seven original images on the hub
 * - Preserve existing image alt text
 * - Improve missing alt text where a real caption exists
 * - Preserve existing JSON-LD, canonical and robots metadata
 * - Inspect JSON-LD, images, canonical and indexing signals
 * - Provide an on-page debugging API
 *
 * Seven-image restoration runs only on the blackwork hub.
 * Other pages retain their own original image collections.
 *
 * This code makes no changes to existing JSON-LD.
 * Search rankings and SERP image selection remain with Google.
 *
 * Deploy sitewide. JavaScript only; no script wrapper.
 */

(function (w, d) {
  'use strict';

  var HOST = 'www.bavariancustomirons.jp';
  var ORIGIN = 'https://' + HOST;
  var HUB = '/blog/2026/03/03/192809';
  var VERSION = '2.0.0';

  if (
    w.location.hostname !== HOST &&
    w.location.hostname !== 'bavariancustomirons.jp'
  ) return;

  /*
   * FULL OFFICIAL URL REGISTRY
   *
   * Source records: 105
   * Duplicated URLs are consolidated at runtime.
   *
   * Entry format:
   * [Full URL, descriptive title]
   */

  var RAW = [

    // 01 — BLACKWORK / BLACKOUT / COVER-UP

    [
      'https://www.bavariancustomirons.jp/blog/2026/03/03/192809',
      'ブラックワーク公式総合記事'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/10/04/125059',
      '菊花図・ブラックアウト'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/23/161828',
      '白筋彫り・ホワイトライン'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/07/11/212320',
      '神奈川沖浪裏・ブラックアーム'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/23/121641',
      '神奈川沖浪裏・関連技術'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/25/185755',
      'ブラックアウト・複数回施術'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/17/013900',
      '鷹図・洋彫カバーアップ'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/14/153933',
      'ブラック＆グレー解説'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/16/035107',
      'アブストラクト・川崎'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2026/10/14/015343',
      'カバーアップ技術記事'
    ],

    // 02 — WESTERN-STYLE / ORIGINAL ARTWORKS

    [
      'https://www.bavariancustomirons.jp/blog/2025/08/03/221031',
      'No.118 アルジャーノンに花束を'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/03/02/010530',
      'No.118 洋彫・制作解説'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/01/120204',
      'No.107 アブストラクト'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/03/07/050607',
      'ダークアート・有機的ブラックワーク'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/05/004052',
      'No.308 蛇・臓物'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/05/003120',
      'No.111 太陽ニ殺サレタ'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/01/124041',
      'No.111 目玉・骨・悪魔・触手'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/01/124157',
      'No.112 ダークアート'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/04/235130',
      'No.110 髑髏蟲蟲'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/10/23/045232',
      '髑髏蟲蟲・関連記事'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/07/27/235118',
      'No.106 黒龍骨'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/07/28/123500',
      'No.104 髑髏百足'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/07/28/123548',
      'No.103 幻想の花'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/07/28/123421',
      'No.105 十字架とひまわり'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/01/124441',
      'No.115 ひまわりと十字架'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/01/123936',
      'No.110 九尾の狐と炎'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/01/124314',
      'No.114 リアリスティック・タイガー'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/01/142128',
      'No.117 ゾンビマリア'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/01/163436',
      'No.117 タイガーゾンビ'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/07/19/200533',
      'スカル・Petita Sancta'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/07/19/190516',
      'Petita Sancta・王の咆哮'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/07/19/192659',
      'No.19 スモール・アブストラクト'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/01/012118',
      'No.101 洋彫・トラッシュポルカ'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/01/120519',
      'No.108 オリエンタル・フルスリーブ'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/01/120635',
      'レッグ作品・写真と映像'
    ],

    // 03 — LARGE-SCALE WORKS / BACKPIECES

    [
      'https://www.bavariancustomirons.jp/blog/2025/07/10/235916',
      '境界・フルスリーブ作品集'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2020/12/23/213527',
      '異界・バックピース作品集'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/05/004749',
      '羽音・女性バックピース'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/04/01/033026',
      '梟・バックピース'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/10/220206',
      'No.320 フクロウ'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/05/003615',
      'No.303 総身彫'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/05/005505',
      'No.305 フロントピース'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/05/010413',
      'No.306 蛇頭'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/05/010239',
      'No.302 雷神と太陽'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/06/121848',
      'No.333 般若'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/05/005846',
      'No.300 不動明王'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/05/005814',
      'No.301 倶利伽羅双龍'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/04/01/012750',
      '般若・和洋折衷バックピース'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/05/15/020242',
      '不動明王・フルボディ'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/05/06/221040',
      '唐獅子牡丹・制作工程'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/02/172030',
      'No.116 唐獅子牡丹'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/29/221644',
      '雪中鷹・和洋折衷'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/09/01/020708',
      '般若・地域別バックピース'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/09/01/020713',
      '般若・東京バックピース'
    ],

    // 04 — WESTERN-STYLE TECHNICAL ARTICLES

    [
      'https://www.bavariancustomirons.jp/blog/2025/08/31/192543',
      'ヨーロピアンスタイル・洋彫'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/12/204206',
      'フルスリーブ・技術解説'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/26/041123',
      '洋彫と和彫・様式解説'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/26/061222',
      '腕の背景と余白の設計'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/27/030634',
      'バックピース・構図解説'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/26/044327',
      'フルスリーブ・横浜川崎'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/26/060356',
      'フルスリーブ・川崎駅'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/26/044125',
      'フルスリーブ・茅ヶ崎'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/26/044241',
      'フルスリーブ・湘南'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/14/162104',
      'トラッシュポルカ・大阪'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/14/162110',
      'トラッシュポルカ・歌舞伎町'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/14/162511',
      'トラッシュポルカ・横浜川崎'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/14/161405',
      'トラッシュポルカ・茅ヶ崎'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/26/031539',
      '洋彫・造形思想'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/11/02/030233',
      '西洋構造芸術刺青・料金区分'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/05/04/215240',
      '伊彫・作品制作工程'
    ],

    // 05 — BOTANICAL / FLORAL / ORNAMENTAL

    [
      'https://www.bavariancustomirons.jp/blog/2021/10/27/030517',
      'ボタニカル総合解説'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2026/04/17/040209',
      'フローラル・胸部洋彫'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2023/02/07/175903',
      'フローラル作品特集'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2026/02/25/160348',
      'ひまわり・ボタニカル'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/07/16/123643',
      '曼荼羅と花・レッグスリーブ'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/07/28/123526',
      'No.102 オリエンタル×ボタニカル'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/07/16/133557',
      'ひまわり・傷跡作品'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/07/17/140236',
      'イタリアン・ボタニカル'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/07/19/190331',
      'ミニマル・十字架'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/07/18/000607',
      'ひまわり・ワンポイント'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/07/19/193528',
      '曼荼羅・装飾デザイン'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/14/234445',
      'ボタニカル・フルスリーブ'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/07/19/191626',
      'エビス・黒線主体小型作品'
    ],

    // 06 — GENERAL INFORMATION / BOOKING

    [
      'https://www.bavariancustomirons.jp/blog/2020/12/22/210901',
      'タトゥーデザイン・意味と決め方'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/07/19/194423',
      'タトゥー作品・映像案内'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/09/02/123826',
      'タトゥー作品図鑑'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/21/152117',
      '横浜・和彫と洋彫'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2019/12/09/021837',
      '伊彫・公式プロフィール'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2019/12/31/214539',
      '料金・サイズ・制作時間'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2021/05/20/223736',
      '相談・予約方法'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/09/10/230114',
      '初回相談・問い合わせ'
    ],

    // 07 — LT MACHINES / FREIHEIT

    [
      'https://www.bavariancustomirons.jp/items/80563228',
      'FREIHEIT タトゥーマシン'
    ],
    [
      'https://www.bavariancustomirons.jp/items/138077746',
      'FREIHEIT Titanium'
    ],
    [
      'https://www.bavariancustomirons.jp/items/140617483',
      'FREIHEIT 関連製品'
    ],
    [
      'https://www.bavariancustomirons.jp/categories/7325286',
      'LT MACHINES 製品カテゴリー'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/26/224454',
      'LT MACHINES ワークショップ'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2026/04/16/114502',
      'FREIHEIT 関連イベント'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2026/01/11/145228',
      'タトゥーマシン製作・開発'
    ],

    // 08 — JAPANESE / WESTERN HYBRID

    [
      'https://www.bavariancustomirons.jp/blog/2025/08/29/221644',
      '現代和彫と大型構図'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/08/27/030634',
      'バックピースの構造'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/05/06/221040',
      '唐獅子牡丹・和洋折衷'
    ],
    [
      'https://www.bavariancustomirons.jp/blog/2025/04/01/012750',
      '般若・和洋折衷'
    ],

    // 09 — OFFICIAL INDEXES

    [
      'https://www.bavariancustomirons.jp/',
      '公式トップページ'
    ],
    [
      'https://www.bavariancustomirons.jp/blog',
      '公式ブログ・作品一覧'
    ],
    [
      'https://www.bavariancustomirons.jp/about',
      '公式スタジオ情報'
    ]
  ];

  /*
   * Category boundaries correspond to the 105 input records.
   */

  var GROUPS = [
    {
      name: 'ブラックワーク・ブラックアウト・カバーアップ',
      from: 1,
      to: 10
    },
    {
      name: '洋彫・ブラックワーク代表作品',
      from: 11,
      to: 35
    },
    {
      name: '大型作品・バックピース',
      from: 36,
      to: 54
    },
    {
      name: '洋彫・技法と様式解説',
      from: 55,
      to: 70
    },
    {
      name: 'ボタニカル・フローラル・装飾',
      from: 71,
      to: 83
    },
    {
      name: '作品選定・料金・相談',
      from: 84,
      to: 91
    },
    {
      name: 'LT MACHINES・FREIHEIT',
      from: 92,
      to: 98
    },
    {
      name: '和洋折衷・関連大型作品',
      from: 99,
      to: 102
    },
    {
      name: '公式インデックス',
      from: 103,
      to: 105
    }
  ];

  /*
   * URL NORMALIZATION
   */

  function normalizePath(path) {
    return (path || '/').replace(/\/+$/, '') || '/';
  }

  function toPath(url) {
    try {
      var u = new URL(url, ORIGIN);

      if (
        u.hostname !== HOST &&
        u.hostname !== 'bavariancustomirons.jp'
      ) return '';

      return normalizePath(u.pathname);

    } catch (e) {
      return '';
    }
  }

  /*
   * BUILD UNIQUE PAGE REGISTRY
   */

  var LOOKUP = Object.create(null);
  var ENTRIES = [];

  RAW.forEach(function (row, i) {

    var path = toPath(row[0]);

    if (!path) return;

    var grp = 0;

    for (var g = 0; g < GROUPS.length; g++) {
      if (
        i + 1 >= GROUPS[g].from &&
        i + 1 <= GROUPS[g].to
      ) {
        grp = g;
        break;
      }
    }

    if (!LOOKUP[path]) {

      var obj = {
        path: path,
        url: row[0],
        label: row[1],
        groups: [grp],
        order: i + 1
      };

      LOOKUP[path] = obj;
      ENTRIES.push(obj);

    } else if (
      LOOKUP[path].groups.indexOf(grp) === -1
    ) {

      LOOKUP[path].groups.push(grp);

    }

  });

  /*
   * PAGE SCOPE
   *
   * Exact matches only.
   * Non-registered URLs remain untouched.
   */

  var path = normalizePath(w.location.pathname);
  var active = LOOKUP[path];

  if (
    !active ||
    w.__LOYAL_BLACKWORK_MULTI_V2__
  ) return;

  w.__LOYAL_BLACKWORK_MULTI_V2__ = true;

  var hubPage = path === HUB;

  var DEBUG =
    /(?:\?|&)loyal_blackwork_debug=1(?:&|$)/
      .test(w.location.search);

  /*
   * PUBLIC DIAGNOSTIC STATE
   */

  var status = {

    version: VERSION,
    currentURL: ORIGIN + path,
    matched: true,

    registryRecords: RAW.length,
    registryUnique: ENTRIES.length,

    category:
      GROUPS[active.groups[0]].name,

    relatedLinks: 0,
    hubLinks: 0,

    pageImages: 0,
    missingAlt: 0,
    pageAltImprovements: 0,

    imagesKnownBefore: 0,
    imagesAdded: 0,
    imagesInDOM: 0,
    imagesLoaded: 0,

    sevenImageStructuredData: 0,

    jsonLdParsed: 0,
    jsonLdErrors: 0,

    canonical: '',
    robots: '',
    ogImage: '',

    issues: [],
    imageRecords: []

  };

  w.LOYAL_BLACKWORK_STATUS = status;

  w.LOYAL_BLACKWORK_URLS =
    ENTRIES.map(function (x) {
      return x.url;
    });

  /*
   * ORIGINAL SEVEN-IMAGE REGISTRY
   *
   * Image restoration is restricted to the blackwork hub.
   */

  var IMG_ROOT =
    'https://baseec-img-mng.akamaized.net/' +
    'images/user/blog/442982/blog/';

  var IMG_QUERY =
    '?im=Resize%2Cwidth%3D2048%2Ctype%3Ddownsize' +
    '&imformat=generic&q=90';

  var WORK_118 =
    ORIGIN + '/blog/2025/08/03/221031';

  var WORK_107 =
    ORIGIN + '/blog/2025/08/01/120204';

  var WORK_KIKU =
    ORIGIN + '/blog/2025/10/04/125059';

  var SEVEN = [

    [
      '127c70a2fade149a1c80fa5c8e51789f.jpg',
      'No.118《アルジャーノンに花束を》天使と黒の陰影を描いたフルスリーブタトゥー',
      WORK_118
    ],

    [
      '0af94a59d08be0a514a73d8a85022f4b.jpg',
      'No.118《アルジャーノンに花束を》十字架と前腕のブラック＆グレー',
      WORK_118
    ],

    [
      '00d9dfd14c2a2c2baa8b88b78d64a621.jpg',
      'No.118《アルジャーノンに花束を》天使からひまわりへ続くフルスリーブ',
      WORK_118
    ],

    [
      '5d85d6cd947d517736088fe72446d49e.jpg',
      'No.118《アルジャーノンに花束を》天使の羽根と人物の陰影',
      WORK_118
    ],

    [
      '8beb5aff74f53b48620af3f79437cd2a.jpg',
      'No.107 アブストラクトブラックワークのフルスリーブとグレー階調',
      WORK_107
    ],

    [
      '49107690405ce23ac888c0ccede512e8.jpg',
      '菊花図・ブラックアウトカバーアップと菊の輪郭',
      WORK_KIKU
    ],

    [
      'a1007ddfef7c65a8768522c230bd26d1.jpg',
      'LOYAL TATTOOの黒い線と陰影を用いた洋彫タトゥー',
      ORIGIN + HUB
    ]

  ].map(function (row) {

    return {
      file: row[0],
      src: IMG_ROOT + row[0] + IMG_QUERY,
      alt: row[1],
      page: row[2]
    };

  });

  /*
   * DIAGNOSTICS
   */

  function issue(message) {
    if (
      status.issues.indexOf(message) === -1
    ) {
      status.issues.push(message);
    }
  }

  function fileName(url) {

    if (
      !url ||
      typeof url !== 'string'
    ) return '';

    try {

      return new URL(url, ORIGIN)
        .pathname
        .split('/')
        .pop()
        .toLowerCase();

    } catch (e) {
      return '';
    }

  }

  /*
   * IMAGE MATCHING
   *
   * Supports standard and lazy-loaded images.
   * CDN query parameters do not affect filename matching.
   */

  function hasImageFile(img, file) {

    var attrs = [
      'src',
      'data-src',
      'data-original',
      'data-lazy-src',
      'srcset',
      'data-srcset'
    ];

    var values = [
      img.currentSrc || ''
    ];

    attrs.forEach(function (a) {
      values.push(
        img.getAttribute(a) || ''
      );
    });

    var picture =
      img.parentElement &&
      img.parentElement.tagName === 'PICTURE'
        ? img.parentElement
        : null;

    if (picture) {

      Array.prototype.forEach.call(
        picture.querySelectorAll('source'),
        function (s) {
          values.push(
            s.getAttribute('srcset') || ''
          );
        }
      );

    }

    for (var i = 0; i < values.length; i++) {

      var parts =
        values[i].split(/[\s,]+/);

      for (
        var j = 0;
        j < parts.length;
        j++
      ) {

        if (
          fileName(parts[j]) === file
        ) return true;

      }

    }

    return false;

  }

  function findKnown(file, outsideFallback) {

    var imgs =
      d.querySelectorAll('img');

    for (
      var i = 0;
      i < imgs.length;
      i++
    ) {

      if (
        outsideFallback &&
        imgs[i].closest(
          '#loyal-blackwork-seven-gallery-v2'
        )
      ) continue;

      if (
        hasImageFile(imgs[i], file)
      ) return imgs[i];

    }

    return null;

  }

  /*
   * IMAGE ALT ENRICHMENT
   *
   * 1. Preserve existing authored alt text.
   * 2. Use exact descriptions for known original images.
   * 3. Reuse genuine figure captions where alt is absent.
   * 4. Restore valid lazy image src where missing.
   */

  function improveImages() {

    var imgs =
      d.querySelectorAll('img');

    var updated = 0;

    Array.prototype.forEach.call(
      imgs,
      function (img) {

        if (
          img.closest(
            '#loyal-blackwork-seven-gallery-v2'
          )
        ) return;

        var known = null;

        for (
          var j = 0;
          j < SEVEN.length;
          j++
        ) {

          if (
            hasImageFile(
              img,
              SEVEN[j].file
            )
          ) {

            known = SEVEN[j];
            break;

          }

        }

        if (
          known &&
          !(img.getAttribute('alt') || '').trim()
        ) {

          img.alt = known.alt;
          updated++;

        } else if (
          !img.hasAttribute('alt')
        ) {

          var figure =
            img.closest('figure');

          var caption =
            figure &&
            figure.querySelector(
              'figcaption'
            );

          var original = caption
            ? (
                caption.textContent || ''
              )
                .trim()
                .replace(/\s+/g, ' ')
            : '';

          if (
            original.length >= 12 &&
            original.length <= 160
          ) {

            img.alt = original;
            updated++;

          }

        }

        if (
          !img.getAttribute('src')
        ) {

          var lazySource =
            img.getAttribute('data-src') ||
            img.getAttribute('data-original');

          if (
            lazySource &&
            /^https?:\/\//i.test(lazySource)
          ) {

            img.setAttribute(
              'src',
              lazySource
            );

          }

        }

      }
    );

    status.pageAltImprovements += updated;

    status.pageImages =
      d.querySelectorAll('img').length;

    status.missingAlt =
      Array.prototype.filter.call(
        d.querySelectorAll('img'),
        function (img) {
          return !img.hasAttribute('alt');
        }
      ).length;

  }

  /*
   * SAFE DOM HELPERS
   */

  function element(tag, txt) {

    var e =
      d.createElement(tag);

    if (
      typeof txt === 'string'
    ) {
      e.textContent = txt;
    }

    return e;

  }

  function target() {

    return (
      d.querySelector('article') ||
      d.querySelector('main') ||
      d.querySelector('[role="main"]') ||
      d.body
    );

  }

  function addAnchor(list, entry) {

    var li =
      element('li');

    var a =
      element('a', entry.label);

    a.href = entry.url;
    a.title = entry.url;

    li.appendChild(a);
    list.appendChild(li);

  }

  /*
   * COMPLETE VISIBLE URL INDEX
   *
   * Runs on the official blackwork hub only.
   * All unique official URLs are grouped by topic.
   * Uses ordinary crawlable <a href> links.
   */

  function addHubIndex() {

    if (
      !hubPage ||
      d.getElementById(
        'loyal-blackwork-full-index-v2'
      )
    ) return;

    var nav =
      element('nav');

    nav.id =
      'loyal-blackwork-full-index-v2';

    nav.setAttribute(
      'aria-label',
      'LOYAL BLACKWORK 関連記事総合索引'
    );

    nav.style.cssText =
      'max-width:1040px;' +
      'margin:36px auto;' +
      'padding:16px;' +
      'border-top:1px solid #aaa;' +
      'line-height:1.75;';

    nav.appendChild(
      element(
        'h2',
        'LOYAL BLACKWORK｜公式作品・技術資料 総合索引'
      )
    );

    nav.appendChild(
      element(
        'p',
        'ブラックワーク、洋彫、カバーアップ、フルスリーブ、バックピース、関連機材の公式資料を分類しています。'
      )
    );

    var used =
      Object.create(null);

    GROUPS.forEach(function (g, idx) {

      var listEntries =
        ENTRIES.filter(function (x) {

          return (
            x.groups.indexOf(idx) >= 0 &&
            !used[x.path]
          );

        });

      if (
        !listEntries.length
      ) return;

      var details =
        element('details');

      if (
        idx === 0 ||
        idx === 1
      ) {
        details.open = true;
      }

      details.appendChild(
        element(
          'summary',
          g.name +
          '（' +
          listEntries.length +
          '）'
        )
      );

      var ul =
        element('ul');

      ul.style.cssText =
        'margin:8px 0 18px;' +
        'padding-left:24px;';

      listEntries.forEach(
        function (x) {

          addAnchor(ul, x);

          used[x.path] = true;
          status.hubLinks++;

        }
      );

      details.appendChild(ul);
      nav.appendChild(details);

    });

    target().appendChild(nav);

  }

  /*
   * CONTEXTUAL INTERNAL LINK ENGINE
   *
   * Runs on all registered pages except the hub.
   * Related works are chosen from shared categories.
   */

  function relatedEntries() {

    var selected = [];
    var seen =
      Object.create(null);

    function push(x) {

      if (
        x &&
        x.path !== path &&
        !seen[x.path] &&
        selected.length < 9
      ) {

        selected.push(x);
        seen[x.path] = true;

      }

    }

    // Primary category page

    push(LOOKUP[HUB]);

    // Nearest same-category source records

    var grp =
      active.groups[0];

    var own =
      ENTRIES.filter(function (x) {

        return (
          x.groups.indexOf(grp) !== -1
        );

      });

    var ownIndex =
      own.indexOf(active);

    for (
      var offset = 1;
      offset < own.length &&
      selected.length < 7;
      offset++
    ) {

      if (
        ownIndex - offset >= 0
      ) {

        push(
          own[ownIndex - offset]
        );

      }

      if (
        ownIndex + offset < own.length
      ) {

        push(
          own[ownIndex + offset]
        );

      }

    }

    // Core authoritative pages

    [
      '/blog/2025/08/03/221031',
      '/blog/2025/10/04/125059',
      '/blog/2025/08/23/161828',
      '/blog/2025/08/14/153933',
      '/blog/2025/08/31/192543',
      '/items/80563228'
    ].forEach(function (p) {

      push(LOOKUP[p]);

    });

    return selected;

  }

  function addRelated() {

    if (
      hubPage ||
      d.getElementById(
        'loyal-blackwork-related-v2'
      )
    ) return;

    var nav =
      element('nav');

    nav.id =
      'loyal-blackwork-related-v2';

    nav.setAttribute(
      'aria-label',
      'LOYAL BLACKWORK 関連公式資料'
    );

    nav.style.cssText =
      'max-width:960px;' +
      'margin:32px auto;' +
      'padding:14px;' +
      'border-top:1px solid #aaa;' +
      'line-height:1.75;';

    nav.appendChild(
      element(
        'h2',
        'LOYAL TATTOO｜関連作品・技術資料'
      )
    );

    var list =
      element('ul');

    list.style.cssText =
      'padding-left:24px;';

    var links =
      relatedEntries();

    links.forEach(function (x) {
      addAnchor(list, x);
    });

    nav.appendChild(list);

    target().appendChild(nav);

    status.relatedLinks =
      links.length;

  }

  /*
   * SEVEN ORIGINAL IMAGES
   *
   * On the main blackwork article only.
   *
   * Existing images are retained.
   * Missing images are restored through ordinary
   * visible <img src> elements.
   */

  function createSevenGallery() {

    if (
      !hubPage ||
      d.getElementById(
        'loyal-blackwork-seven-gallery-v2'
      )
    ) return;

    var missing =
      SEVEN.filter(function (x) {

        return !findKnown(
          x.file,
          false
        );

      });

    status.imagesKnownBefore =
      7 - missing.length;

    if (
      !missing.length
    ) return;

    var section =
      element('section');

    section.id =
      'loyal-blackwork-seven-gallery-v2';

    section.setAttribute(
      'aria-label',
      'ブラックワーク公式作品写真'
    );

    section.style.cssText =
      'max-width:1040px;' +
      'margin:30px auto;' +
      'padding:14px;';

    section.appendChild(
      element(
        'h2',
        'ブラックワーク｜公式作品写真'
      )
    );

    var grid =
      element('div');

    grid.style.cssText =
      'display:grid;' +
      'grid-template-columns:' +
      'repeat(auto-fit,minmax(180px,1fr));' +
      'gap:16px;';

    missing.forEach(function (x) {

      var fig =
        element('figure');

      fig.setAttribute(
        'data-loyal-file',
        x.file
      );

      fig.style.cssText =
        'margin:0;' +
        'min-width:0;';

      var anchor =
        element('a');

      anchor.href = x.page;

      var img =
        element('img');

      img.setAttribute(
        'src',
        x.src
      );

      img.setAttribute(
        'alt',
        x.alt
      );

      img.setAttribute(
        'loading',
        'lazy'
      );

      img.setAttribute(
        'decoding',
        'async'
      );

      img.style.cssText =
        'width:100%;' +
        'height:auto;' +
        'display:block;';

      img.addEventListener(
        'error',
        function () {

          issue(
            'Image failed to load: ' +
            x.file
          );

          fig.remove();

          refreshStatus();

        },
        { once: true }
      );

      anchor.appendChild(img);
      fig.appendChild(anchor);

      var caption =
        element(
          'figcaption',
          x.alt
        );

      caption.style.cssText =
        'font-size:13px;' +
        'line-height:1.6;' +
        'margin-top:6px;';

      fig.appendChild(caption);

      grid.appendChild(fig);

      status.imagesAdded++;

    });

    section.appendChild(grid);

    target().appendChild(section);

  }

  /*
   * METADATA DIAGNOSTICS
   *
   * Existing metadata remains unchanged.
   */

  function checkMetadata() {

    var canon =
      d.querySelector(
        'link[rel="canonical"]'
      );

    status.canonical =
      canon ? canon.href : '';

    if (
      canon &&
      toPath(canon.href) !== path
    ) {

      issue(
        'Canonical differs from current path.'
      );

    }

    var robots =
      d.querySelectorAll(
        'meta[name="robots"],' +
        'meta[name="googlebot"]'
      );

    var data = [];

    Array.prototype.forEach.call(
      robots,
      function (r) {

        data.push(
          r.content || ''
        );

      }
    );

    status.robots =
      data.join('; ');

    if (
      /noindex|noimageindex/i
        .test(status.robots)
    ) {

      issue(
        'Indexing-restrictive robots metadata detected.'
      );

    }

    var og =
      d.querySelector(
        'meta[property="og:image"]'
      );

    status.ogImage =
      og ? og.content : '';

  }

  /*
   * READ-ONLY JSON-LD AUDIT
   *
   * Existing JSON-LD is never replaced or rewritten.
   */

  function checkJsonLd() {

    var scripts =
      d.querySelectorAll(
        'script[type="application/ld+json"]'
      );

    var matches = [];
    var parsed = 0;
    var errors = 0;

    function visit(node, depth) {

      if (
        !node ||
        typeof node !== 'object' ||
        depth > 10
      ) return;

      if (
        Array.isArray(node)
      ) {

        node.forEach(function (x) {
          visit(x, depth + 1);
        });

        return;

      }

      var types =
        [].concat(
          node['@type'] || []
        );

      var article =
        types.indexOf('BlogPosting') >= 0 ||
        types.indexOf('Article') >= 0 ||
        types.indexOf('TechArticle') >= 0;

      var url =
        node.url ||
        node['@id'] ||
        (
          node.mainEntityOfPage &&
          (
            node.mainEntityOfPage['@id'] ||
            node.mainEntityOfPage
          )
        );

      if (
        article &&
        toPath(
          typeof url === 'string'
            ? url
            : ''
        ) === path
      ) {

        matches.push(node);

      }

      if (
        node['@graph']
      ) {

        visit(
          node['@graph'],
          depth + 1
        );

      }

    }

    Array.prototype.forEach.call(
      scripts,
      function (s) {

        try {

          visit(
            JSON.parse(s.textContent),
            0
          );

          parsed++;

        } catch (e) {

          errors++;

        }

      }
    );

    status.jsonLdParsed =
      parsed;

    status.jsonLdErrors =
      errors;

    if (
      errors
    ) {

      issue(
        'One or more JSON-LD scripts contain invalid JSON.'
      );

    }

    if (
      matches.length > 1
    ) {

      issue(
        'Multiple Article/BlogPosting nodes target this page.'
      );

    }

    /*
     * Original seven-image JSON-LD comparison
     */

    if (hubPage) {

      var imageNames =
        Object.create(null);

      matches.forEach(function (post) {

        var images =
          Array.isArray(post.image)
            ? post.image
            : (
                post.image
                  ? [post.image]
                  : []
              );

        images.forEach(function (x) {

          var u =
            typeof x === 'string'
              ? x
              : (
                  x &&
                  (
                    x.contentUrl ||
                    x.url ||
                    x['@id']
                  )
                );

          var n =
            fileName(u);

          if (
            n
          ) {
            imageNames[n] = true;
          }

        });

      });

      status.sevenImageStructuredData =
        SEVEN.filter(function (x) {

          return !!imageNames[x.file];

        }).length;

      if (
        !matches.length
      ) {

        issue(
          'Matching original BlogPosting was not found; existing JSON-LD was preserved.'
        );

      }

    }

  }

  /*
   * CURRENT IMAGE COVERAGE
   */

  function refreshStatus() {

    status.imageRecords =
      SEVEN.map(function (x) {

        var img =
          findKnown(
            x.file,
            false
          );

        return {

          file: x.file,

          inDOM:
            !!img,

          loaded:
            !!(
              img &&
              img.complete &&
              img.naturalWidth > 0
            ),

          artwork:
            x.page

        };

      });

    status.imagesInDOM =
      status.imageRecords.filter(
        function (x) {

          return x.inDOM;

        }
      ).length;

    status.imagesLoaded =
      status.imageRecords.filter(
        function (x) {

          return x.loaded;

        }
      ).length;

    status.pageImages =
      d.querySelectorAll('img').length;

    status.missingAlt =
      Array.prototype.filter.call(
        d.querySelectorAll('img'),
        function (img) {

          return !img.hasAttribute('alt');

        }
      ).length;

    if (
      DEBUG &&
      w.console
    ) {

      w.console.log(
        '[LOYAL BLACKWORK v2]',
        status
      );

      if (
        w.console.table
      ) {

        w.console.table(
          status.imageRecords
        );

      }

    }

    return status;

  }

  /*
   * REMOVE FALLBACK DUPLICATES
   *
   * Handles images that appear after initial rendering.
   */

  function repairDuplicateFallbacks() {

    if (
      !hubPage
    ) return;

    var gallery =
      d.getElementById(
        'loyal-blackwork-seven-gallery-v2'
      );

    if (
      !gallery
    ) return;

    Array.prototype.forEach.call(
      gallery.querySelectorAll(
        'figure[data-loyal-file]'
      ),
      function (fig) {

        if (
          findKnown(
            fig.getAttribute(
              'data-loyal-file'
            ),
            true
          )
        ) {

          fig.remove();

        }

      }
    );

    if (
      !gallery.querySelector('figure')
    ) {

      gallery.remove();

    }

  }

  /*
   * MAIN EXECUTION
   */

  function run() {

    checkMetadata();
    checkJsonLd();
    improveImages();

    if (
      hubPage
    ) {

      addHubIndex();

    } else {

      addRelated();

    }

    refreshStatus();

    /*
     * Delay image fallback slightly to allow
     * normal page content and lazy-image markup
     * to initialize.
     */

    w.setTimeout(
      function () {

        createSevenGallery();

        repairDuplicateFallbacks();

        refreshStatus();

      },
      900
    );

    /*
     * Second pass for delayed original images.
     */

    w.setTimeout(
      function () {

        repairDuplicateFallbacks();

        improveImages();

        refreshStatus();

      },
      2800
    );

  }

  /*
   * PUBLIC DEBUG FUNCTION
   *
   * window.LOYAL_BLACKWORK_STATUS
   *
   * window.LOYAL_BLACKWORK_URLS
   *
   * window.LOYAL_BLACKWORK_AUDIT()
   *
   * Debug URL parameter:
   * loyal_blackwork_debug=1
   */

  w.LOYAL_BLACKWORK_AUDIT =
    function () {

      checkMetadata();

      checkJsonLd();

      repairDuplicateFallbacks();

      return refreshStatus();

    };

  if (
    d.readyState === 'loading'
  ) {

    d.addEventListener(
      'DOMContentLoaded',
      run,
      { once: true }
    );

  } else {

    run();

  }

})(window, document);
