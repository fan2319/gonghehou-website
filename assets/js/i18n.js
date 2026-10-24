/* ============================================================
   九江昭盛元科技有限公司 · 界面文字字典（中 / 英 / 俄）
   产品数据与站点正文来自 data/*.json，由后台管理
   ============================================================ */
const LANGS = ['zh', 'en', 'ru'];
const LANG_META = {
  zh: { label: '中文',     short: '中文', htmlLang: 'zh-CN', dir: 'ltr' },
  en: { label: 'English',  short: 'EN',   htmlLang: 'en',    dir: 'ltr' },
  ru: { label: 'Русский',  short: 'RU',   htmlLang: 'ru',    dir: 'ltr' }
};

const I18N = {
  zh: {
    meta: {
      title: '九江昭盛元科技有限公司 | 跨境供应链 · 茶叶出口',
      desc: '供应链管理服务；货物与技术进出口、进出口代理。茶叶产地直采，可选袋泡茶、果茶、花草茶与 OEM/ODM 贴牌代工。'
    },
    nav: { about:'关于我们', products:'产品中心', stories:'产品故事', capability:'服务能力', why:'为什么选择我们', terms:'合作条款', faq:'常见问题', contact:'联系合作' },

    hero: { eyebrow:'江西 · 九江 · 修水',
      cta1:'查看产品', cta2:'发送询盘',
      f1:'供应链管理经验', f2:'在营品类', f3:'运输方式', f4:'中俄直连' },

    about: { label:'关于我们', qualTitle:'经营范围（可在国家企业信用信息公示系统核验）' },

    prod: { label:'产品中心', title:'产品中心',
      lead:'茶叶品类已可供货；瓷器与机电泵阀陆续上架，敬请询盘。',
      note:'图示为实物拍摄。各品类规格、起订量与打样周期，请在询盘中说明采购规模与销售渠道。',
      subAll:'全部', readStory:'读它的故事' },

    story: { label:'产品故事', title:'每一样东西，都有一段来历',
      lead:'我们不只想告诉您这是什么，还想告诉您它从哪儿来、经过了谁的手。' +
            '下面每一段，都是真实的地理与历史，不是包装出来的说法。',
      empty:'故事整理中，即将上线。',
      era:'年代', readMore:'展开全文', readLess:'收起' },

    cap: { label:'服务能力' },

    faq: { label:'常见问题', title:'常见问题' },

    contact: { label:'联系合作', title:'联系合作',
      lead:'告诉我们品类、规格、数量与目的港，我们给出实时方案。',
      addr:'地址', phone:'电话', wx:'微信', mail:'邮箱', cn:'中国', ru:'俄罗斯',
      formTitle:'发送询盘',
      fName:'您的称呼 *', fCompany:'公司 / 机构', fContact:'联系方式（电话 / 邮箱 / Telegram）*',
      fCountry:'国家 / 地区', fMsg:'需求说明（品类、数量、包装、目的港等）',
      q1:'预计采购量：未确定 / 仅咨询', q2:'样品（< 5 kg 或少量）', q3:'小批量（5–50 kg）',
      q4:'常规订单（50–500 kg）', q5:'大批量（> 500 kg / 长期供货）',
      t1:'购买产品', t2:'经销代理 / 渠道合作', t3:'企业团购 / 礼盒定制', t4:'OEM / ODM 贴牌', t5:'其他',
      consent:'我同意为处理本次询盘而处理我的个人数据（姓名、联系方式等）',
      consentOpen:'查看数据处理说明',
      consentText:'您提交的信息仅用于回复本次询盘与后续商务沟通，保存于俄罗斯境内服务器，不用于其他目的。您可随时要求删除。',
      btn:'提交询盘' },

    footer: { links:'快速导航', contact:'联系方式' },

    msg: { send:'提交中…',
      ok:'✓ 已收到，我们会尽快与您联系',
      errNetwork:'提交失败 — 别担心，直接联系我们更快：',
      fbTitle:'一键联系我们',
      fbTip:'点击任一按钮即可直接对话，我们通常在数小时内回复。',
      errFill:'请填写姓名与联系方式',
      errConsent:'请先勾选个人数据处理同意',
      copied:'✓ 已复制' }
  },

  en: {
    meta: {
      title: 'Zhaoshengyuan | Cross-border Supply Chain · Tea Export from China',
      desc: 'Supply-chain management, import & export of goods and technology, import-export agency. Tea sourced at origin; tea bags, fruit and herbal blends, OEM/ODM.'
    },
    nav: { about:'About', products:'Products', stories:'Stories', capability:'Services', why:'Why Us', terms:'Terms', faq:'FAQ', contact:'Contact' },

    hero: { eyebrow:'Jiangxi · Jiujiang · Xiushui',
      cta1:'View Products', cta2:'Send Enquiry',
      f1:'Supply-chain experience', f2:'Active categories', f3:'Transport modes', f4:'RU & CN direct' },

    about: { label:'About Us', qualTitle:'Registered business scope (verifiable on the National Enterprise Credit Information Publicity System)' },

    prod: { label:'Products', title:'Products',
      lead:'Tea categories are available now; porcelain and pumps are being added — enquiries welcome.',
      note:'All photos are real. For exact specifications, MOQ and sampling lead times, please state your volume and sales channel.',
      subAll:'All', readStory:'Read its story' },

    story: { label:'Product Stories', title:'Every item has a history',
      lead:'We want to tell you not only what this is, but where it comes from and whose hands it passed through. ' +
            'Each passage below is real geography and real history — not a packaging claim.',
      empty:'Stories are being prepared.',
      era:'Period', readMore:'Read full story', readLess:'Show less' },

    cap: { label:'Services' },

    faq: { label:'FAQ', title:'FAQ' },

    contact: { label:'Contact', title:'Get in Touch',
      lead:'Tell us the category, spec, quantity and destination port — we will quote in real time.',
      addr:'Address', phone:'Phone', wx:'WeChat', mail:'Email', cn:'China', ru:'Russia',
      formTitle:'Send an Enquiry',
      fName:'Your name *', fCompany:'Company / organisation', fContact:'Contact (phone / email / Telegram) *',
      fCountry:'Country / region', fMsg:'Requirements (category, quantity, packaging, destination…)',
      q1:'Volume: not decided / enquiry only', q2:'Samples (< 5 kg or small qty)', q3:'Small batch (5–50 kg)',
      q4:'Standard order (50–500 kg)', q5:'Bulk (> 500 kg / long-term)',
      t1:'Buying products', t2:'Distribution / channel', t3:'Corporate gifting', t4:'OEM / ODM', t5:'Other',
      consent:'I consent to the processing of my personal data (name, contact details) for handling this enquiry',
      consentOpen:'Data processing notice',
      consentText:'The data you submit is used only to answer this enquiry and for related business communication. It is stored on servers located in the Russian Federation and is not used for other purposes. You may request deletion at any time.',
      btn:'Submit Enquiry' },

    footer: { links:'Quick Links', contact:'Contact' },

    msg: { send:'Sending…',
      ok:'✓ Received — we will be in touch shortly',
      errNetwork:'Submission failed — no worries, contact us directly instead:',
      fbTitle:'Contact us in one tap',
      fbTip:'Tap any button below to reach us — we usually reply within hours.',
      errFill:'Please provide your name and contact details',
      errConsent:'Please tick the consent box first',
      copied:'✓ Copied' }
  },

  ru: {
    meta: {
      title: 'Чжаошэнъюань | Трансграничные поставки · Экспорт чая из Китая',
      desc: 'Управление цепями поставок, импорт и экспорт товаров и технологий, агентская ВЭД. Чай от источника; пакетики, фруктовые и травяные купажи, OEM/ODM.'
    },
    nav: { about:'О компании', products:'Продукция', stories:'Истории', capability:'Услуги', why:'Почему мы', terms:'Условия', faq:'Вопросы', contact:'Контакты' },

    hero: { eyebrow:'Цзянси · Цзюцзян · Сюшуй',
      cta1:'Продукция', cta2:'Отправить запрос',
      f1:'Опыт в поставках', f2:'Активных категорий', f3:'Способов перевозки', f4:'RU и CN напрямую' },

    about: { label:'О компании', qualTitle:'Зарегистрированный вид деятельности (проверяется в Национальной системе раскрытия информации)' },

    prod: { label:'Продукция', title:'Продукция',
      lead:'Чайные категории доступны; фарфор и насосы добавляются — запросы принимаются.',
      note:'Все фото реальные. Точные характеристики, минимальный объём и сроки образцов уточняйте в запросе.',
      subAll:'Все', readStory:'Читать историю' },

    story: { label:'Истории продуктов', title:'У каждой вещи есть история',
      lead:'Мы хотим рассказать не только о том, что это такое, но и о том, откуда оно пришло ' +
            'и через чьи руки прошло. Каждый текст ниже — реальная география и реальная история, ' +
            'а не маркетинговая формулировка.',
      empty:'Истории готовятся к публикации.',
      era:'Эпоха', readMore:'Читать полностью', readLess:'Свернуть' },

    cap: { label:'Услуги' },

    faq: { label:'Вопросы', title:'Частые вопросы' },

    contact: { label:'Контакты', title:'Свяжитесь с нами',
      lead:'Укажите категорию, характеристики, объём и порт назначения — рассчитаем актуальное предложение.',
      addr:'Адрес', phone:'Телефон', wx:'WeChat', mail:'E-mail', cn:'Китай', ru:'Россия',
      formTitle:'Отправить запрос',
      fName:'Ваше имя *', fCompany:'Компания / организация', fContact:'Контакт (телефон / e-mail / Telegram) *',
      fCountry:'Страна / регион', fMsg:'Требования (категория, объём, упаковка, назначение…)',
      q1:'Объём: не определён / только запрос', q2:'Образцы (< 5 кг или немного)', q3:'Мелкая партия (5–50 кг)',
      q4:'Стандартный заказ (50–500 кг)', q5:'Крупный объём (> 500 кг / долгосрочно)',
      t1:'Покупка продукции', t2:'Дистрибуция', t3:'Корпоративные подарки', t4:'OEM / ODM', t5:'Другое',
      consent:'Я даю согласие на обработку моих персональных данных (имя, контактные данные) для рассмотрения данного запроса',
      consentOpen:'Уведомление об обработке данных',
      consentText:'Переданные данные используются только для ответа на запрос и последующей деловой переписки, хранятся на серверах, расположенных на территории Российской Федерации, и не используются в иных целях. Вы можете потребовать удаления в любое время.',
      btn:'Отправить запрос' },

    footer: { links:'Навигация', contact:'Контакты' },

    msg: { send:'Отправка…',
      ok:'✓ Запрос получен — мы свяжемся с вами',
      errNetwork:'Не удалось отправить — ничего страшного, свяжитесь с нами напрямую:',
      fbTitle:'Связаться в один клик',
      fbTip:'Нажмите любую кнопку ниже — обычно отвечаем в течение нескольких часов.',
      errFill:'Укажите имя и контактные данные',
      errConsent:'Пожалуйста, поставьте отметку о согласии на обработку данных',
      copied:'✓ Скопировано' }
  }
};
