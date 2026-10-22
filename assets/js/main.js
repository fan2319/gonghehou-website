/* ============================================================
   九江昭盛元科技有限公司 · 前端逻辑
   数据来自 data/site.json 与 data/products.json（后台管理）
   ============================================================ */
(function () {
  'use strict';

  function $(s, root) { return (root || document).querySelector(s); }
  function $$(s, root) { return Array.prototype.slice.call((root || document).querySelectorAll(s)); }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  /* 取三语值：优先当前语言，回退中文，再回退英文 */
  function t(v, lang) {
    if (v == null) return '';
    if (typeof v === 'string') return v;
    if (typeof v === 'object') {
      return v[lang] || v.zh || v.en || v.ru || '';
    }
    return String(v);
  }

  var cur = 'zh';
  var SITE = null;   // data/site.json
  var PROD = null;   // data/products.json
  var filterCat = 'all';

  /* 内联占位图：不依赖任何外部服务，中俄都能显示 */
  var PH = 'data:image/svg+xml;charset=utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450">' +
    '<rect width="600" height="450" fill="#eef1f5"/>' +
    '<circle cx="300" cy="200" r="52" fill="#cfd8e2"/>' +
    '<text x="300" y="300" font-size="20" fill="#8a96a4" text-anchor="middle" font-family="sans-serif">Photo</text></svg>');

  /* ============================================================
     语言
     ============================================================ */
  function detect() {
    try {
      var s = localStorage.getItem('zsy_lang');
      if (s && LANGS.indexOf(s) > -1) return s;
    } catch (e) {}
    var n = (navigator.language || 'zh').toLowerCase();
    if (n.indexOf('ru') === 0) return 'ru';
    if (n.indexOf('zh') === 0 || n.indexOf('cn') > -1) return 'zh';
    return 'en';
  }

  function setLang(lang, noPersist) {
    cur = LANGS.indexOf(lang) > -1 ? lang : 'zh';
    if (!noPersist) { try { localStorage.setItem('zsy_lang', cur); } catch (e) {} }
    document.documentElement.lang = LANG_META[cur].htmlLang;
    document.documentElement.dir = LANG_META[cur].dir;
    var d = I18N[cur];
    if (d && d.meta) {
      document.title = d.meta.title;
      var md = $('meta[name="description"]');
      if (md) md.setAttribute('content', d.meta.desc);
    }
    $$('[data-i18n]').forEach(function (el) {
      var v = getKey(d, el.getAttribute('data-i18n'));
      if (v != null) el.textContent = v;
    });
    $$('[data-i18n-ph]').forEach(function (el) {
      var v = getKey(d, el.getAttribute('data-i18n-ph'));
      if (v != null) el.setAttribute('placeholder', v);
    });
    $$('#langswitch button').forEach(function (b) {
      b.classList.toggle('on', b.getAttribute('data-lang') === cur);
    });
    renderData();
  }

  function getKey(obj, path) {
    if (!obj) return null;
    return path.split('.').reduce(function (o, k) { return (o == null) ? null : o[k]; }, obj);
  }

  /* ============================================================
     渲染 CMS 数据
     ============================================================ */
  function renderData() {
    if (!SITE) return;
    var L = cur;

    // 首屏
    $('#heroTitle').textContent = t(SITE.hero_titles, L) || '九江昭盛元科技有限公司';
    $('#heroSub').textContent = t(SITE.hero_subs, L) || '';
    if (SITE.hero_img) $('#heroBg').style.backgroundImage = 'url("' + SITE.hero_img + '")';

    // 关于
    $('#aboutTitle').textContent = t(SITE.about_titles, L) || t(I18N[L].about, 'label');
    $('#aboutDesc').textContent = t(SITE.about_descs, L) || '';
    var ai = $('#aboutImg');
    if (SITE.about_img) { ai.src = SITE.about_img; ai.style.display = 'block'; }
    else { ai.style.display = 'none'; }

    $('#qualList').innerHTML = (SITE.qual_items || [])
      .map(function (q) { return '<li>' + esc(t(q, L)) + '</li>'; }).join('');
    $('#qualNote').textContent = t(SITE.qual_note, L) || '';

    // 能力
    $('#capTitle').textContent = t(SITE.cap_title, L) || '';
    $('#capLead').textContent = t(SITE.cap_lead, L) || '';
    $('#capList').innerHTML = (SITE.cap_items || [])
      .map(function (c, i) { return '<li><b>' + (i + 1) + '</b><span>' + esc(t(c, L)) + '</span></li>'; }).join('');
    $('#capNote').textContent = t(SITE.cap_note, L) || '';

    // 为什么选择我们
    $('#whyTitle').textContent = t(SITE.why_title, L) || '';
    $('#whyGrid').innerHTML = (SITE.why_items || [])
      .map(function (w) {
        return '<div class="mini-card"><h4>' + esc(t(w.title, L)) + '</h4><p>' + esc(t(w.text, L)) + '</p></div>';
      }).join('');

    // 合作条款
    $('#termTitle').textContent = t(SITE.term_title, L) || '';
    $('#termGrid').innerHTML = (SITE.term_items || [])
      .map(function (x) {
        return '<div class="mini-card"><h4>' + esc(t(x.title, L)) + '</h4><p>' + esc(t(x.text, L)) + '</p></div>';
      }).join('');
    $('#termNote').textContent = t(SITE.term_note, L) || '';

    // FAQ
    $('#faqList').innerHTML = (SITE.faq_list || [])
      .map(function (f) {
        return '<details class="fq"><summary>' + esc(t(f.q, L)) + '</summary><div class="fa">' + esc(t(f.a, L)) + '</div></details>';
      }).join('');

    // 联系信息
    $('#cAddr').textContent = t(SITE.contact_addr, L) || '';
    $('#cTelCn').textContent = SITE.contact_phone_cn || '';
    $('#cTelRu').textContent = SITE.contact_phone_ru || '';
    $('#cMail1').textContent = SITE.contact_email_1 || '';
    $('#cMail2').textContent = SITE.contact_email_2 || '';
    $('#wxCopy').textContent = SITE.contact_wechat || '';
    $('#footerNote').textContent = t(SITE.footer_note, L) || '';
    $('#footerCopy').textContent = '© ' + new Date().getFullYear() + ' ' +
      (L === 'ru' ? 'ООО «Цзюцзян Чжаошэнъюань Технологии»' :
       L === 'en' ? 'Jiujiang Zhaoshengyuan Technology Co., Ltd.' :
       '九江昭盛元科技有限公司');

    var navKeys = ['about','products','capability','why','terms','faq','contact'];
    $('#footerLinks').innerHTML = navKeys.map(function (k) {
      return '<li><a href="#' + k + '">' + esc(I18N[L].nav[k]) + '</a></li>';
    }).join('');
    $('#footContact').innerHTML =
      '<li><a href="tel:' + (SITE.contact_phone_cn || '').replace(/\s/g, '') + '">' + esc(SITE.contact_phone_cn) + '</a></li>' +
      '<li><a href="tel:' + (SITE.contact_phone_ru || '').replace(/\s/g, '') + '">' + esc(SITE.contact_phone_ru) + '</a></li>' +
      '<li><a href="mailto:' + esc(SITE.contact_email_1) + '">' + esc(SITE.contact_email_1) + '</a></li>';

    renderProducts();
  }

  /* ============================================================
     产品（后台增删改查）
     ============================================================ */
  function renderProducts() {
    if (!PROD) return;
    var L = cur;
    var cats = PROD.categories || [];
    var items = (PROD.products || []).filter(function (p) { return p.published !== false; });

    // 分类按钮：只显示有商品的分类（+ 全部）
    var used = {};
    items.forEach(function (p) { used[p.category] = (used[p.category] || 0) + 1; });
    var html = '<button type="button" class="catbtn' + (filterCat === 'all' ? ' on' : '') +
               '" data-cat="all">' + (L === 'ru' ? 'Все' : L === 'en' ? 'All' : '全部') + '</button>';
    cats.forEach(function (c) {
      var n = used[c.key] || 0;
      html += '<button type="button" class="catbtn' + (filterCat === c.key ? ' on' : '') +
              '" data-cat="' + esc(c.key) + '">' + esc(t(c.label, L)) +
              (n ? ' <span class="cnt">' + n + '</span>' : '') + '</button>';
    });
    $('#catFilter').innerHTML = html;
    $$('#catFilter .catbtn').forEach(function (b) {
      b.onclick = function () { filterCat = b.getAttribute('data-cat'); renderProducts(); };
    });

    var list = items.filter(function (p) { return filterCat === 'all' || p.category === filterCat; });
    list.sort(function (a, b) { return (a.order || 99) - (b.order || 99); });

    $('#prodGrid').innerHTML = list.map(function (p) {
      var specs = (p.specs || []).map(function (s) {
        return '<li><b>' + esc(t(s.k, L)) + '</b><span>' + esc(t(s.v, L)) + '</span></li>';
      }).join('');
      return '' +
        '<article class="pcard">' +
          '<div class="pcard-img"><img src="' + esc(p.image || PH) + '" alt="' + esc(t(p.name, L)) + '" loading="lazy" onerror="this.src=\'' + PH + '\'"></div>' +
          '<div class="pcard-body">' +
            '<span class="pcard-cat">' + esc(catLabel(p.category, L)) + '</span>' +
            '<h3>' + esc(t(p.name, L)) + '</h3>' +
            '<span class="pcard-sub">' + esc(t(p.subtitle, L)) + '</span>' +
            '<p>' + esc(t(p.desc, L)) + '</p>' +
            (specs ? '<ul class="spec-list">' + specs + '</ul>' : '') +
            '<a class="btn outline sm" href="#contact" data-enq="' + esc(t(p.name, L)) + '">' +
              (L === 'ru' ? 'Запросить цену' : L === 'en' ? 'Get a quote' : '获取报价') + '</a>' +
          '</div>' +
        '</article>';
    }).join('');

    var empty = $('#prodEmpty');
    if (!list.length) { empty.style.display = 'block'; empty.textContent = t(PROD.emptyText, L) || ''; }
    else { empty.style.display = 'none'; }

    // 点“获取报价”把产品名带进留言框
    $$('#prodGrid [data-enq]').forEach(function (a) {
      a.onclick = function () {
        var ta = document.querySelector('#contactForm [name=msg]');
        var nm = a.getAttribute('data-enq');
        var pre = (L === 'ru' ? 'Интересуют: ' : L === 'en' ? 'Interested in: ' : '我想了解：') + nm;
        if (ta && ta.value.indexOf(pre) === -1) ta.value = pre + (ta.value ? '\n' + ta.value : '');
      };
    });
  }

  function catLabel(key, L) {
    var c = (PROD && PROD.categories || []).filter(function (x) { return x.key === key; })[0];
    return c ? t(c.label, L) : key;
  }

  /* ============================================================
     导航 / 交互
     ============================================================ */
  function initNav() {
    var bar = $('#topbar'), links = $('#navlinks'), tg = $('#navtoggle');
    tg.onclick = function () { links.classList.toggle('open'); };
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') links.classList.remove('open');
    });
    var onScroll = function () { bar.classList.toggle('scrolled', window.scrollY > 30); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initReveal() {
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    $$('section').forEach(function (s) { s.classList.add('reveal'); io.observe(s); });
  }

  function initWechat() {
    var el = $('#wxCopy');
    if (!el) return;
    el.onclick = function () {
      var txt = el.textContent.trim();
      var done = function () {
        var old = el.textContent;
        el.textContent = I18N[cur].msg.copied;
        el.classList.add('copied');
        setTimeout(function () { el.textContent = old; el.classList.remove('copied'); }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(done, fb);
      } else { fb(); }
      function fb() {
        var ta = document.createElement('textarea');
        ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    };
  }

  /* ============================================================
     表单 → Cloudflare Worker → Telegram + 邮件
     ============================================================ */
  var ENDPOINT = 'https://gonghehou-form.tunnir243.workers.dev';

  function initForm() {
    var form = $('#contactForm'), msgEl = $('#formmsg');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var M = I18N[cur].msg;
      var name = (form.name.value || '').trim();
      var contact = (form.contact.value || '').trim();
      if (!name || !contact) {
        msgEl.className = 'formmsg bad'; msgEl.textContent = M.errFill; return;
      }
      var payload = {
        name: name, contact: contact,
        company: (form.company.value || '').trim(),
        country: (form.country.value || '').trim(),
        qty: form.qty.value, type: form.type.value,
        msg: (form.msg.value || '').trim(),
        lang: cur
      };
      msgEl.className = 'formmsg'; msgEl.textContent = M.send;
      if (!ENDPOINT) {
        setTimeout(function () { msgEl.className = 'formmsg ok'; msgEl.textContent = M.ok; form.reset(); }, 600);
        return;
      }
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function (r) { return r.json(); })
        .then(function (j) {
          if (j && j.ok) { msgEl.className = 'formmsg ok'; msgEl.textContent = M.ok; form.reset(); }
          else { msgEl.className = 'formmsg bad'; msgEl.textContent = M.errNetwork; }
        })
        .catch(function () { msgEl.className = 'formmsg bad'; msgEl.textContent = M.errNetwork; });
    });
  }

  /* ============================================================
     启动
     ============================================================ */
  function loadJSON(url) {
    /* 单文件版：数据已内联，直接用，避免 file:// 下 fetch 被浏览器拦截 */
    if (url.indexOf('site.json') > -1 && window.__ZSY_SITE__) return Promise.resolve(window.__ZSY_SITE__);
    if (url.indexOf('products.json') > -1 && window.__ZSY_PROD__) return Promise.resolve(window.__ZSY_PROD__);
    return fetch(url, { cache: 'no-store' }).then(function (r) {
      if (!r.ok) throw new Error(url + ' ' + r.status);
      return r.json();
    });
  }

  /* ============================================================
     对外钩子：供管理后台在 iframe 里实时刷新预览
     用法：iframe.contentWindow.ZSY.setData(siteObj, prodObj, 'zh')
     ============================================================ */
  window.ZSY = {
    setData: function (site, prod, lang) {
      if (site) SITE = site;
      if (prod) PROD = prod;
      if (lang && LANGS.indexOf(lang) > -1) cur = lang;
      setLang(cur, true);
    },
    getLang: function () { return cur; }
  };

  function boot() {
    setLang(detect(), true);
    initNav(); initWechat(); initForm();

    Promise.all([
      loadJSON('data/site.json').catch(function (e) { console.warn(e); return null; }),
      loadJSON('data/products.json').catch(function (e) { console.warn(e); return null; })
    ]).then(function (res) {
      SITE = res[0] || {};
      PROD = res[1] || { categories: [], products: [] };
      setLang(cur, true);
      initReveal();
    });

    $$('#langswitch button').forEach(function (b) {
      b.onclick = function () { setLang(b.getAttribute('data-lang')); };
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
