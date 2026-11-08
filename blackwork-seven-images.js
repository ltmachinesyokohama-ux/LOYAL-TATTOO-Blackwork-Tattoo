
/*
 * LOYAL BLACKWORK — 7 IMAGE DISCOVERY ENGINE
 * Version: 1.0.0
 * Date: 2026-11-08
 * Author: Ihori / LOYAL TATTOO
 * Organization: Loyal Arts Inc.
 *
 * Official category:
 * https://www.bavariancustomirons.jp/blog/2026/03/03/192809
 *
 * GitHub:
 * https://github.com/ltmachinesyokohama-ux/LOYAL-TATTOO-Blackwork-Tattoo
 *
 * PURPOSE
 * - Identify all seven original blackwork images
 * - Improve accessible image descriptions
 * - Restore missing images to the visible page
 * - Preserve existing structured data
 * - Audit canonical and indexing signals
 * - Report seven-image coverage
 *
 * Search ranking and SERP image count are determined by Google.
 *
 * Save as JavaScript only. No surrounding script tags.
 */

(function (w, d) {
  'use strict';

  var HOST = 'www.bavariancustomirons.jp';
  var PATH = '/blog/2026/03/03/192809';
  var PAGE = 'https://' + HOST + PATH;
  var VERSION = '1.0.0';

  if (
    w.location.hostname !== HOST ||
    w.location.pathname.replace(/\/+$/, '') !== PATH ||
    w.__LOYAL_BLACKWORK_SEVEN__
  ) return;

  w.__LOYAL_BLACKWORK_SEVEN__ = true;

  var ROOT =
    'https://baseec-img-mng.akamaized.net/' +
    'images/user/blog/442982/blog/';

  var QUERY =
    '?im=Resize%2Cwidth%3D2048%2Ctype%3Ddownsize' +
    '&imformat=generic&q=90';

  var WORK_118 =
    'https://www.bavariancustomirons.jp/blog/2025/08/03/221031';

  var WORK_107 =
    'https://www.bavariancustomirons.jp/blog/2025/08/01/120204';

  var WORK_KIKU =
    'https://www.bavariancustomirons.jp/blog/2025/10/04/125059';

  /*
   * IMAGE REGISTRY
   * Seven official image URLs from the existing BlogPosting.
   *
   * Each entry:
   * [filename, descriptive alt text, artwork source]
   */

  var FILES = [

    [
      '127c70a2fade149a1c80fa5c8e51789f.jpg',
      'ブラックワークのフルスリーブ《アルジャーノンに花束を》No.118、肩の天使と黒の陰影、刺青師伊彫の作品',
      WORK_118
    ],

    [
      '0af94a59d08be0a514a73d8a85022f4b.jpg',
      '《アルジャーノンに花束を》No.118、十字架と前腕の細密なブラック＆グレー表現',
      WORK_118
    ],

    [
      '00d9dfd14c2a2c2baa8b88b78d64a621.jpg',
      '《アルジャーノンに花束を》No.118、天使からひまわりへ続く腕一本のフルスリーブタトゥー',
      WORK_118
    ],

    [
      '5d85d6cd947d517736088fe72446d49e.jpg',
      '《アルジャーノンに花束を》No.118、天使の羽根と人物の陰影を描いたブラックワーク',
      WORK_118
    ],

    [
      '8beb5aff74f53b48620af3f79437cd2a.jpg',
      'No.107 アブストラクト・ブラックワーク、腕全体の抽象的な黒とグレーのフルスリーブ',
      WORK_107
    ],

    [
      '49107690405ce23ac888c0ccede512e8.jpg',
      '菊花図のブラックアウト・カバーアップ、黒い腕に描かれた菊の輪郭',
      WORK_KIKU
    ],

    [
      'a1007ddfef7c65a8768522c230bd26d1.jpg',
      'LOYAL TATTOOによる黒い線と陰影を用いた洋彫タトゥー作品',
      PAGE
    ]

  ].map(function (item) {
    return {
      file: item[0],
      src: ROOT + item[0] + QUERY,
      alt: item[1],
      page: item[2]
    };
  });

  var DEBUG =
    /(?:\?|&)loyal_blackwork_debug=1(?:&|$)/
      .test(w.location.search);

  var state = {
    version: VERSION,
    page: PAGE,
    expected: 7,
    foundBefore: 0,
    addedToDOM: 0,
    visibleAfter: 0,
    structuredImages: 0,
    canonical: '',
    robots: '',
    issues: [],
    images: []
  };

  w.LOYAL_BLACKWORK_STATUS = state;

  function issue(message) {
    state.issues.push(message);
  }

  function filename(url) {
    if (!url || typeof url !== 'string') return '';

    try {
      return new URL(url, PAGE)
        .pathname.split('/').pop().toLowerCase();
    } catch (e) {
      return '';
    }
  }

  function candidates(element) {
    return [
      element.currentSrc,
      element.getAttribute('src'),
      element.getAttribute('data-src'),
      element.getAttribute('data-original')
    ];
  }

  /*
   * Find original images by filename.
   * Query parameters may differ between CDN renditions.
   */

  function findImage(file) {
    var images = d.querySelectorAll('img');

    for (var i = 0; i < images.length; i++) {
      var urls = candidates(images[i]);

      for (var j = 0; j < urls.length; j++) {
        if (filename(urls[j]) === file) {
          return images[i];
        }
      }
    }

    return null;
  }

  /*
   * Preserve any existing authored alt text.
   */

  function setAltIfEmpty(img, description) {
    var current = img.getAttribute('alt');

    if (!current || !current.trim()) {
      img.setAttribute('alt', description);
    }
  }

  /*
   * Visible gallery fallback:
   * Only creates images missing from the current DOM.
   *
   * Uses genuine img src attributes and captions.
   * Does not add duplicate images already found.
   */

  function createMissingGallery(missing) {
    if (
      !missing.length ||
      d.getElementById('loyal-blackwork-seven-gallery')
    ) return;

    var section = d.createElement('section');

    section.id = 'loyal-blackwork-seven-gallery';

    section.setAttribute(
      'aria-label',
      'ブラックワーク作品画像'
    );

    section.style.cssText =
      'max-width:1000px;' +
      'margin:32px auto;' +
      'padding:12px;';

    var heading = d.createElement('h2');

    heading.textContent =
      'ブラックワークタトゥー｜作品画像';

    section.appendChild(heading);

    var grid = d.createElement('div');

    grid.style.cssText =
      'display:grid;' +
      'grid-template-columns:' +
      'repeat(auto-fit,minmax(180px,1fr));' +
      'gap:16px;';

    missing.forEach(function (item) {

      var figure = d.createElement('figure');

      figure.style.cssText =
        'margin:0;min-width:0;';

      var anchor = d.createElement('a');

      anchor.href = item.page;

      var img = d.createElement('img');

      img.src = item.src;
      img.alt = item.alt;
      img.decoding = 'async';
      img.loading = 'lazy';

      img.style.cssText =
        'display:block;' +
        'width:100%;' +
        'height:auto;';

      anchor.appendChild(img);
      figure.appendChild(anchor);

      var caption = d.createElement('figcaption');

      caption.textContent = item.alt;

      caption.style.cssText =
        'font-size:13px;' +
        'line-height:1.6;' +
        'margin-top:6px;';

      figure.appendChild(caption);
      grid.appendChild(figure);
    });

    section.appendChild(grid);

    var target =
      d.querySelector('article') ||
      d.querySelector('main') ||
      d.body;

    target.appendChild(section);

    state.addedToDOM = missing.length;
  }

  /*
   * Read-only JSON-LD inspection.
   *
   * Existing nodes, dates, images and author identifiers
   * remain untouched.
   */

  function checkJsonLd() {
    var scripts = d.querySelectorAll(
      'script[type="application/ld+json"]'
    );

    var matching = [];

    function visit(node) {
      if (!node || typeof node !== 'object') return;

      if (Array.isArray(node)) {
        node.forEach(visit);
        return;
      }

      var types = [].concat(node['@type'] || []);

      if (
        types.indexOf('BlogPosting') >= 0 &&
        (
          node['@id'] === PAGE + '#article' ||
          node.url === PAGE
        )
      ) {
        matching.push(node);
      }

      if (node['@graph']) {
        visit(node['@graph']);
      }
    }

    for (var i = 0; i < scripts.length; i++) {
      try {
        visit(JSON.parse(scripts[i].textContent));
      } catch (e) {
        issue(
          'JSON-LD syntax issue in script ' + (i + 1)
        );
      }
    }

    if (!matching.length) {
      issue(
        'Official BlogPosting JSON-LD was not found. ' +
        'Retain the separate original JSON-LD.'
      );
      return;
    }

    if (matching.length > 1) {
      issue(
        'Multiple BlogPosting nodes detected.'
      );
    }

    var indexes = {};

    matching.forEach(function (post) {
      var list = Array.isArray(post.image)
        ? post.image
        : [post.image];

      list.forEach(function (value) {
        var url = typeof value === 'string'
          ? value
          : (
              value &&
              (value.contentUrl || value.url)
            );

        var key = filename(url);

        if (key) {
          indexes[key] = true;
        }
      });
    });

    state.structuredImages =
      FILES.filter(function (item) {
        return !!indexes[item.file];
      }).length;

    if (state.structuredImages < 7) {
      issue(
        'BlogPosting contains ' +
        state.structuredImages +
        '/7 reference photos.'
      );
    }
  }

  /*
   * Canonical and robots diagnostics.
   * No changes are made to the existing metadata.
   */

  function checkIndexing() {
    var canonical = d.querySelector(
      'link[rel="canonical"]'
    );

    state.canonical = canonical
      ? canonical.href
      : '';

    if (
      state.canonical &&
      state.canonical.replace(/\/+$/, '') !== PAGE
    ) {
      issue(
        'Canonical URL differs from official page.'
      );
    }

    var robots = d.querySelectorAll(
      'meta[name="robots"],meta[name="googlebot"]'
    );

    var values = [];

    for (var i = 0; i < robots.length; i++) {
      values.push(robots[i].content || '');
    }

    state.robots = values.join('; ');

    if (/noindex|noimageindex/i.test(state.robots)) {
      issue(
        'Robots metadata restricts indexing or image indexing.'
      );
    }
  }

  /*
   * Main execution.
   */

  function run() {
    checkIndexing();

    var missing = [];

    FILES.forEach(function (item, index) {
      var img = findImage(item.file);

      if (img) {
        setAltIfEmpty(img, item.alt);

        if (index === 0) {
          img.setAttribute(
            'fetchpriority',
            'high'
          );

          img.setAttribute(
            'loading',
            'eager'
          );
        }
      } else {
        missing.push(item);
      }
    });

    state.foundBefore = 7 - missing.length;

    createMissingGallery(missing);

    state.visibleAfter =
      FILES.filter(function (item) {
        return !!findImage(item.file);
      }).length;

    state.images = FILES.map(function (item) {
      return {
        filename: item.file,
        inDOM: !!findImage(item.file),
        source: item.page
      };
    });

    checkJsonLd();

    if (DEBUG && w.console) {
      if (w.console.table) {
        w.console.table(state.images);
      }

      w.console.log(
        '[LOYAL BLACKWORK]',
        state
      );
    }
  }

  if (d.readyState === 'loading') {
    d.addEventListener(
      'DOMContentLoaded',
      run,
      { once: true }
    );
  } else {
    run();
  }

})(window, document);
