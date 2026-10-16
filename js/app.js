(function () {
  'use strict';

  /* ====== PENGATURAN: ubah data di sini ====== */
  var CONFIG = {
    wa: '6285141314131',
    waDisplay: '0851 4131 4131',
    instagram: 'https://instagram.com/alvastudio',
    tiktok: 'https://tiktok.com/@alvastudio',
    handle: '@alvastudio',
    address: 'Komplek Pertokoan Tefa Center SMK Al Falah Moga, Jl. Raya Moga–Guci',
    mapsQuery: 'Tefa Center SMK Al Falah Moga',
    hours: '',                       // contoh: 'Senin–Sabtu, 09.00–17.00 WIB'
    prices: {                        // contoh: basic: 'Rp 25.000'. Kosong = "Hubungi kami"
      basic: '', favorit: '', premium: '',
      logo: '', poster: '', feed: '', undangan: '', kemasan: '', kartu: ''
    },
    images: {
      hero: 'assets/images/photo-01.jpg',
      about: 'assets/images/photo-02.jpg',
      p1: 'assets/images/photo-01.jpg',
      p2: 'assets/images/photo-02.jpg',
      p3: 'assets/images/photo-03.jpg',
      p4: 'assets/images/photo-04.jpg',
      p5: 'assets/images/photo-05.jpg',
      p6: 'assets/images/photo-06.jpg',
      p7: 'assets/images/photo-07.jpg',
      p8: 'assets/images/photo-08.jpg',
      p9: 'assets/images/photo-09.jpg',
      p10: 'assets/images/photo-01.jpg',
      p11: 'assets/images/photo-04.jpg',
      p12: 'assets/images/photo-06.jpg',
      p13: 'assets/images/photo-09.jpg'
    },                      // foto contoh untuk beranda dan portofolio
    testimonials: []                 // contoh: [{ nama: 'Nisa', peran: 'Siswi', teks: 'Hasil fotonya bagus.' }]
  };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var uid = 0;

  /* ====== ikon ====== */
  var ICON = {
    wa: '<path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5z"/><path d="M9 9.5c.3 2.6 2.4 4.7 5 5l1.2-1.3-1.8-1-.8.7c-.8-.3-1.5-1-1.8-1.8l.7-.8-1-1.8z"/>',
    camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
    strip: '<rect x="7" y="2.5" width="10" height="19" rx="1.5"/><rect x="9.5" y="5" width="5" height="3.2"/><rect x="9.5" y="10.4" width="5" height="3.2"/><rect x="9.5" y="15.8" width="5" height="3.2"/>',
    nib: '<path d="M12 3l6 8-6 10-6-10z"/><circle cx="12" cy="11" r="1.5"/><path d="M12 12.5V21"/>',
    spark: '<path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z"/>',
    trend: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
    bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.3"/>',
    lamp: '<path d="M8 3h8l3 9H5z"/><path d="M12 12v8M8 20h8"/>',
    cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5"/>',
    ig: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".8"/>',
    tt: '<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.3 2.5 2 4.2 5 4.4"/>',
    pin: '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    left: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    up: '<path d="M12 19V5M6 11l6-6 6 6"/>'
  };

  /* ====== ilustrasi (SVG) ====== */
  var C = { ivory: '#F6F1E7', gold: '#C9A961', sage: '#A8C3B0', f9: '#0B3D2E', f7: '#14543F', f5: '#052E22' };
  var SKIN = ['#EBC9A6', '#D09A6E', '#B07650', '#8F5E40'];
  var HAIR = ['#1D1612', '#2B1D14', '#3A2A1C'];
  function pp(s, cloth, hair, hijab) { return { skin: SKIN[s], cloth: cloth, hair: HAIR[hair || 0], hijab: hijab || null }; }

  function person(x, y, s, o) {
    var g = '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">';
    g += '<path d="M-66 150C-66 84-36 56 0 56C36 56 66 84 66 150Z" fill="' + o.cloth + '"/>';
    g += '<path d="M-14 58L0 80L14 58" stroke="rgba(0,0,0,.16)" stroke-width="3" fill="none"/>';
    g += '<rect x="-10" y="26" width="20" height="34" rx="8" fill="' + o.skin + '"/>';
    if (o.hijab) {
      g += '<path d="M-46 14C-50 -48 50 -48 46 14C46 46 32 66 0 68C-32 66 -46 46 -46 14Z" fill="' + o.hijab + '"/>';
      g += '<ellipse cx="0" cy="8" rx="27" ry="31" fill="' + o.skin + '"/>';
    } else {
      g += '<ellipse cx="0" cy="0" rx="28" ry="32" fill="' + o.skin + '"/>';
      g += '<path d="M-31 -4C-36 -50 36 -50 31 -4C26 -24 12 -30 0 -28C-14 -30 -26 -24 -31 -4Z" fill="' + o.hair + '"/>';
    }
    return g + '</g>';
  }

  var PAL = [
    { a: '#14543F', b: '#052E22', l: 'rgba(201,169,97,.55)', d: 'ring' },
    { a: '#0B3D2E', b: '#03170F', l: 'rgba(201,169,97,.6)', d: 'arch' },
    { a: '#B9D0BF', b: '#6E9A80', l: 'rgba(11,61,46,.35)', d: 'plant' },
    { a: '#D9BF82', b: '#9A7B34', l: 'rgba(5,46,34,.4)', d: 'curtain' },
    { a: '#F6F1E7', b: '#D9CDB2', l: 'rgba(11,61,46,.35)', d: 'ring' },
    { a: '#1B6A4F', b: '#0B3D2E', l: 'rgba(246,241,231,.4)', d: 'curtain' },
    { a: '#2A6B54', b: '#0B3D2E', l: 'rgba(201,169,97,.55)', d: 'plant' }
  ];

  function deco(p) {
    var l = p.l, s = '', i, x, h;
    if (p.d === 'ring') {
      s = '<circle cx="200" cy="190" r="140" fill="none" stroke="' + l + '" stroke-width="10"/><circle cx="200" cy="190" r="118" fill="none" stroke="' + l + '" stroke-width="1.5"/>';
    } else if (p.d === 'arch') {
      s = '<path d="M70 500V230A130 130 0 0 1 330 230V500Z" fill="rgba(255,255,255,.05)" stroke="' + l + '" stroke-width="2"/>';
    } else if (p.d === 'curtain') {
      for (i = 0; i < 10; i++) s += '<rect x="' + (i * 40) + '" y="0" width="20" height="500" fill="' + l + '" opacity=".35"/>';
    } else {
      for (i = 0; i < 6; i++) {
        x = 330 + i * 10; h = 170 + i * 28;
        s += '<path d="M' + (300 + i * 14) + ' 500Q' + (310 + i * 12) + ' ' + (500 - h / 2) + ' ' + (x + i * 4 - 10) + ' ' + (500 - h) + '" stroke="' + l + '" stroke-width="2" fill="none"/>' +
          '<ellipse cx="' + (x + i * 4 - 10) + '" cy="' + (500 - h) + '" rx="7" ry="22" fill="' + l + '" transform="rotate(' + (i * 8 - 12) + ' ' + (x + i * 4 - 10) + ' ' + (500 - h) + ')"/>';
      }
    }
    return s;
  }

  var LAY = {
    none: [],
    solo: [[200, 250, 1.9]],
    duo: [[148, 272, 1.5], [254, 258, 1.62]],
    group: [[108, 296, 1.2], [200, 262, 1.42], [294, 296, 1.2]]
  };

  function scene(kind, pi, people, jit) {
    var p = PAL[pi], id = 'g' + (++uid), j = jit || 0, L = LAY[kind] || LAY.solo;
    var s = '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + p.a + '"/><stop offset="1" stop-color="' + p.b + '"/></linearGradient></defs>' +
      '<rect width="400" height="500" fill="url(#' + id + ')"/>' + deco(p);
    L.forEach(function (m, i) { s += person(m[0] + j, m[1] + j / 2, m[2], people[i % people.length]); });
    return s;
  }

  function svg(vb, inner, label) {
    return '<svg viewBox="' + vb + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + (label || '') + '">' + inner + '</svg>';
  }

  function polaroid(pi, people) {
    return '<rect width="400" height="500" fill="' + PAL[pi].b + '"/><rect width="400" height="500" fill="' + PAL[pi].a + '" opacity=".6"/>' + deco(PAL[pi]) +
      '<g transform="rotate(-5 200 250)"><rect x="61" y="55" width="290" height="370" fill="rgba(0,0,0,.28)"/>' +
      '<rect x="55" y="45" width="290" height="370" fill="#FBFAF6" rx="3"/>' +
      '<svg x="73" y="63" width="254" height="290" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">' + scene('solo', (pi + 3) % 7, people) + '</svg>' +
      '<text x="200" y="388" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-style="italic" font-size="24" fill="#0B3D2E">alva studio</text></g>';
  }

  function heroArt() {
    var id = 'h' + (++uid), s = '';
    s += '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14543F"/><stop offset="1" stop-color="#052E22"/></linearGradient>' +
      '<radialGradient id="' + id + 'g" cx=".5" cy=".42" r=".55"><stop offset="0" stop-color="#C9A961" stop-opacity=".3"/><stop offset="1" stop-color="#C9A961" stop-opacity="0"/></radialGradient></defs>';
    s += '<rect width="520" height="650" fill="url(#' + id + ')"/><rect width="520" height="650" fill="url(#' + id + 'g)"/>';
    s += '<path d="M20 96Q260 170 500 90" fill="none" stroke="#C9A961" stroke-opacity=".7" stroke-width="1.2"/>';
    var cols = ['#C9A961', '#A8C3B0', '#1B6A4F', '#D9BF82'];
    [[90, 114, -6], [190, 129, 3], [300, 130, -4], [410, 115, 5]].forEach(function (m, i) {
      s += '<g transform="rotate(' + m[2] + ' ' + m[0] + ' ' + m[1] + ')"><rect x="' + (m[0] - 20) + '" y="' + m[1] + '" width="40" height="52" fill="#FBFAF6"/><rect x="' + (m[0] - 16) + '" y="' + (m[1] + 5) + '" width="32" height="34" fill="' + cols[i] + '"/></g>';
    });
    s += '<circle cx="420" cy="260" r="56" fill="none" stroke="#C9A961" stroke-width="24" opacity=".14"/><circle cx="420" cy="260" r="56" fill="none" stroke="#F6F1E7" stroke-width="9" opacity=".92"/><path d="M420 316V650" stroke="#F6F1E7" stroke-opacity=".45" stroke-width="4"/>';
    for (var i = 0; i < 7; i++) {
      var x0 = 30 + i * 9, x1 = 20 + i * 20, y1 = 440 - i * 14, c = (i % 2) ? '#C9A961' : '#A8C3B0';
      s += '<path d="M' + x0 + ' 650Q' + (x0 + 8) + ' 540 ' + x1 + ' ' + y1 + '" fill="none" stroke="' + c + '" stroke-opacity=".7" stroke-width="2"/>' +
        '<ellipse cx="' + x1 + '" cy="' + (y1 - 16) + '" rx="8" ry="26" fill="' + c + '" opacity=".6" transform="rotate(' + (i * 7 - 18) + ' ' + x1 + ' ' + (y1 - 16) + ')"/>';
    }
    s += person(190, 395, 2.15, pp(1, C.sage, 0, C.ivory));
    s += person(342, 412, 2.2, pp(0, C.gold, 1));
    return svg('0 0 520 650', s, 'Ilustrasi dua teman berfoto di studio berlatar hijau tua');
  }

  function aboutArt() {
    var id = 'a' + (++uid), s = '';
    s += '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14543F"/><stop offset="1" stop-color="#0B3D2E"/></linearGradient></defs><rect width="400" height="500" fill="url(#' + id + ')"/>';
    [[34, 44, 92, 112, '#C9A961'], [146, 70, 70, 88, '#A8C3B0'], [232, 40, 130, 84, '#D9BF82'], [236, 138, 60, 74, '#A8C3B0'], [310, 138, 52, 74, '#C9A961']].forEach(function (f) {
      s += '<rect x="' + f[0] + '" y="' + f[1] + '" width="' + f[2] + '" height="' + f[3] + '" fill="rgba(246,241,231,.06)" stroke="#C9A961" stroke-opacity=".6" stroke-width="1.5"/><rect x="' + (f[0] + 8) + '" y="' + (f[1] + 8) + '" width="' + (f[2] - 16) + '" height="' + (f[3] - 16) + '" fill="' + f[4] + '" opacity=".45"/>';
    });
    s += person(130, 262, 1.35, pp(1, C.ivory, 0, C.sage));
    s += person(272, 270, 1.4, pp(2, C.gold, 2));
    s += '<rect x="0" y="388" width="400" height="112" fill="#E9DFC6"/><rect x="0" y="388" width="400" height="3" fill="#C9A961"/>';
    s += '<path d="M150 392L162 336H250L262 392Z" fill="#0B3D2E"/><circle cx="206" cy="362" r="7" fill="none" stroke="#C9A961" stroke-width="1.5"/>';
    s += '<rect x="318" y="350" width="52" height="38" rx="5" fill="#052E22"/><circle cx="344" cy="369" r="12" fill="#14543F" stroke="#C9A961" stroke-width="2"/><rect x="326" y="344" width="14" height="8" fill="#052E22"/>';
    s += '<rect x="36" y="414" width="90" height="10" rx="3" fill="#C9A961" opacity=".7"/><rect x="36" y="432" width="60" height="10" rx="3" fill="#0B3D2E" opacity=".25"/>';
    return svg('0 0 400 500', s, 'Ilustrasi siswa DKV bekerja di meja studio');
  }

  var FF = 'font-family="Cormorant Garamond, Georgia, serif"';
  var FB = 'font-family="Plus Jakarta Sans, Arial, sans-serif"';
  function logoArt() {
    return '<rect width="400" height="400" fill="#0B3D2E"/><circle cx="200" cy="168" r="104" fill="none" stroke="#C9A961" stroke-width="2"/><circle cx="200" cy="168" r="92" fill="none" stroke="#C9A961" stroke-width=".8"/>' +
      '<text x="200" y="208" text-anchor="middle" ' + FF + ' font-size="128" font-style="italic" fill="#F6F1E7">L</text>' +
      '<text x="200" y="322" text-anchor="middle" ' + FB + ' font-size="22" letter-spacing="9" font-weight="600" fill="#C9A961">KOPI LARAS</text>' +
      '<text x="200" y="352" text-anchor="middle" ' + FB + ' font-size="11" letter-spacing="5" fill="#A8C3B0">SEDUH · SENJA · MOGA</text>';
  }
  function posterArt() {
    return '<rect width="400" height="500" fill="#F6F1E7"/><path d="M0 250L400 120V500H0Z" fill="#0B3D2E"/><circle cx="296" cy="120" r="56" fill="#C9A961"/>' +
      '<text x="32" y="92" ' + FF + ' font-size="72" font-weight="600" fill="#0B3D2E">Moga</text><text x="32" y="156" ' + FF + ' font-size="72" font-style="italic" fill="#0B3D2E">Fest 26</text>' +
      '<rect x="32" y="392" width="120" height="1.5" fill="#C9A961"/><text x="32" y="424" ' + FB + ' font-size="14" letter-spacing="3" font-weight="600" fill="#F6F1E7">SABTU · 20 DES</text>' +
      '<text x="32" y="450" ' + FB + ' font-size="11" letter-spacing="3" fill="#A8C3B0">LAPANGAN DESA MOGA</text>';
  }
  function feedArt() {
    var cells = [['#0B3D2E', '#C9A961', 'text', 'NEW'], ['#C9A961', '#0B3D2E', 'dot'], ['#F6F1E7', '#0B3D2E', 'text', 'Menu'], ['#A8C3B0', '#0B3D2E', 'bars'], ['#14543F', '#C9A961', 'ring'], ['#F6F1E7', '#14543F', 'bars'], ['#052E22', '#C9A961', 'text', '“'], ['#D9BF82', '#052E22', 'ring'], ['#A8C3B0', '#14543F', 'dot']];
    var s = '<rect width="400" height="400" fill="#052E22"/>';
    cells.forEach(function (c, i) {
      var x = 8 + (i % 3) * 130, y = 8 + Math.floor(i / 3) * 130, cx = x + 61, cy = y + 61;
      s += '<rect x="' + x + '" y="' + y + '" width="122" height="122" fill="' + c[0] + '"/>';
      if (c[2] === 'text') s += '<text x="' + cx + '" y="' + (cy + 16) + '" text-anchor="middle" ' + FF + ' font-size="44" font-style="italic" fill="' + c[1] + '">' + c[3] + '</text>';
      if (c[2] === 'dot') s += '<circle cx="' + cx + '" cy="' + cy + '" r="30" fill="' + c[1] + '"/>';
      if (c[2] === 'ring') s += '<circle cx="' + cx + '" cy="' + cy + '" r="34" fill="none" stroke="' + c[1] + '" stroke-width="5"/>';
      if (c[2] === 'bars') s += '<rect x="' + (x + 24) + '" y="' + (y + 30) + '" width="74" height="8" fill="' + c[1] + '"/><rect x="' + (x + 24) + '" y="' + (y + 52) + '" width="52" height="8" fill="' + c[1] + '" opacity=".7"/><rect x="' + (x + 24) + '" y="' + (y + 74) + '" width="62" height="8" fill="' + c[1] + '" opacity=".5"/>';
    });
    return s;
  }
  function bannerArt() {
    return '<rect width="400" height="250" fill="#14543F"/><path d="M250 0H400V250H190Z" fill="#0B3D2E"/><path d="M250 0L190 250" stroke="#C9A961" stroke-width="2"/>' +
      '<text x="28" y="104" ' + FF + ' font-size="50" font-weight="600" fill="#F6F1E7">Grand</text><text x="28" y="156" ' + FF + ' font-size="50" font-style="italic" fill="#C9A961">Opening</text>' +
      '<text x="28" y="204" ' + FB + ' font-size="12" letter-spacing="4" font-weight="600" fill="#A8C3B0">SABTU · 10.00 WIB</text><circle cx="320" cy="125" r="48" fill="none" stroke="#C9A961" stroke-width="2"/><text x="320" y="132" text-anchor="middle" ' + FF + ' font-size="30" fill="#F6F1E7">20%</text>';
  }
  function cardArt() {
    return '<rect width="400" height="300" fill="#D3E2D8"/><g transform="rotate(8 250 150)"><rect x="150" y="80" width="200" height="120" rx="6" fill="#F6F1E7"/><rect x="168" y="102" width="70" height="6" fill="#0B3D2E"/><rect x="168" y="120" width="110" height="4" fill="#0B3D2E" opacity=".4"/><rect x="168" y="134" width="90" height="4" fill="#0B3D2E" opacity=".4"/><rect x="168" y="170" width="40" height="4" fill="#C9A961"/></g>' +
      '<g transform="rotate(-6 150 150)"><rect x="50" y="100" width="200" height="120" rx="6" fill="#0B3D2E"/><circle cx="150" cy="150" r="20" fill="none" stroke="#C9A961" stroke-width="1.5"/><text x="150" y="158" text-anchor="middle" ' + FF + ' font-size="24" font-style="italic" fill="#F6F1E7">L</text><text x="150" y="196" text-anchor="middle" ' + FB + ' font-size="8" letter-spacing="3" fill="#C9A961">KOPI LARAS</text></g>';
  }
  function boxArt() {
    return '<rect width="400" height="400" fill="#D9CDB2"/><ellipse cx="200" cy="344" rx="120" ry="20" fill="rgba(11,61,46,.18)"/>' +
      '<polygon points="200,80 320,140 200,200 80,140" fill="#F6F1E7"/><polygon points="80,140 200,200 200,330 80,270" fill="#14543F"/><polygon points="200,200 320,140 320,270 200,330" fill="#0B3D2E"/>' +
      '<polygon points="200,80 320,140 200,200 80,140" fill="none" stroke="#C9A961" stroke-width="1.5"/><circle cx="200" cy="140" r="22" fill="none" stroke="#C9A961" stroke-width="1.5"/>' +
      '<text x="200" y="148" text-anchor="middle" ' + FF + ' font-size="24" font-style="italic" fill="#0B3D2E">L</text>' +
      '<polygon points="96,170 184,214 184,252 96,208" fill="none" stroke="#C9A961" stroke-width="1.2"/><line x1="108" y1="190" x2="170" y2="221" stroke="#C9A961" stroke-width="2"/>';
  }

  function strip(n) {
    var sets = [
      [['duo', 0, [pp(1, C.ivory, 0, C.sage), pp(0, C.gold, 1)]], ['solo', 2, [pp(2, C.f9, 0)]], ['duo', 1, [pp(0, C.sage, 2), pp(3, C.ivory, 0, C.gold)]], ['group', 6, [pp(1, C.ivory, 0), pp(2, C.gold, 1, C.ivory), pp(0, C.sage, 2)]]],
      [['solo', 3, [pp(0, C.f9, 0, C.f9)]], ['duo', 5, [pp(2, C.ivory, 1), pp(1, C.gold, 0, C.ivory)]], ['solo', 0, [pp(3, C.sage, 2)]], ['duo', 4, [pp(0, C.f9, 0), pp(1, C.f9, 1, C.f9)]]],
      [['group', 1, [pp(0, C.ivory, 0), pp(1, C.sage, 1, C.ivory), pp(2, C.gold, 2)]], ['duo', 6, [pp(3, C.ivory, 0), pp(0, C.gold, 1)]], ['solo', 5, [pp(1, C.ivory, 0, C.sage)]], ['group', 0, [pp(2, C.gold, 0), pp(0, C.ivory, 1, C.gold), pp(1, C.sage, 2)]]]
    ][n % 3];
    var s = '<rect width="180" height="560" rx="6" fill="#0B3D2E"/>';
    sets.forEach(function (f, i) {
      s += '<svg x="14" y="' + (14 + i * 124) + '" width="152" height="114" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">' + scene(f[0], (f[1] + n) % 7, f[2], (i % 2 ? 10 : -10)) + '</svg>';
    });
    s += '<text x="90" y="540" text-anchor="middle" ' + FB + ' font-size="10" letter-spacing="3" font-weight="600" fill="#C9A961">ALVA STUDIO</text>';
    return svg('0 0 180 560', s, 'Photo strip empat bingkai');
  }

  /* ====== data portofolio ====== */
  var PORT = [
    { t: 'Self photo solo', k: 'foto', vb: '0 0 400 500', h: function () { return scene('solo', 1, [pp(0, C.ivory, 0)]); } },
    { t: 'Logo kedai kopi', k: 'desain', vb: '0 0 400 400', h: logoArt },
    { t: 'Duo sahabat', k: 'foto', vb: '0 0 400 500', h: function () { return scene('duo', 2, [pp(1, C.gold, 1), pp(2, C.ivory, 0, C.f9)]); } },
    { t: 'Poster acara desa', k: 'desain', vb: '0 0 400 500', h: posterArt },
    { t: 'Photo box bertiga', k: 'foto', vb: '0 0 400 500', h: function () { return scene('group', 0, [pp(2, C.ivory, 2), pp(0, C.sage, 0, C.ivory), pp(3, C.gold, 1)]); } },
    { t: 'Feed Instagram', k: 'desain', vb: '0 0 400 400', h: feedArt },
    { t: 'Foto wisuda', k: 'foto', vb: '0 0 400 500', h: function () { return scene('solo', 4, [pp(1, C.f9, 0, C.f9)]); } },
    { t: 'Banner promo', k: 'desain', vb: '0 0 400 250', h: bannerArt },
    { t: 'Polaroid aesthetic', k: 'foto', vb: '0 0 400 500', h: function () { return polaroid(5, [pp(0, C.ivory, 0, C.sage)]); } },
    { t: 'Kartu nama', k: 'desain', vb: '0 0 400 300', h: cardArt },
    { t: 'Couple session', k: 'foto', vb: '0 0 400 500', h: function () { return scene('duo', 3, [pp(0, C.f9, 0), pp(1, C.ivory, 0, C.gold)]); } },
    { t: 'Kemasan produk', k: 'desain', vb: '0 0 400 400', h: boxArt },
    { t: 'Foto grup kelas', k: 'foto', vb: '0 0 400 500', h: function () { return scene('group', 5, [pp(1, C.ivory, 0), pp(2, C.gold, 1, C.ivory), pp(0, C.sage, 2), pp(3, C.ivory, 0)]); } }
  ];

  /* ====== util ====== */
  function waLink(text) { return 'https://wa.me/' + CONFIG.wa + (text ? '?text=' + encodeURIComponent(text) : ''); }
  function artOrImage(slot, fallbackHtml) {
    var src = CONFIG.images[slot];
    if (src) {
      var alt = slot === 'hero' ? 'Foto bersama pengunjung ALVA STUDIO dengan latar hijau' :
                slot === 'about' ? 'Foto tiga pengunjung ALVA STUDIO' :
                'Contoh hasil foto ALVA STUDIO';
      var loading = slot === 'hero' ? 'eager' : 'lazy';
      var imageHeight = /^p\d+$/.test(slot) ? 'auto' : '100%';
      return '<img src="' + src + '" alt="' + alt + '" loading="' + loading + '" decoding="async" style="display:block;width:100%;height:' + imageHeight + ';object-fit:cover;object-position:center">';
    }
    return fallbackHtml;
  }

  /* ====== isi halaman ====== */
  try {
    $$('[data-i]').forEach(function (el) {
      var n = el.getAttribute('data-i');
      if (ICON[n]) el.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICON[n] + '</svg>';
    });
    $$('[data-wa]').forEach(function (a) { a.href = waLink(a.getAttribute('data-wa')); });
    $$('[data-ig]').forEach(function (a) { a.href = CONFIG.instagram; });
    $$('[data-tt]').forEach(function (a) { a.href = CONFIG.tiktok; });
    $$('[data-handle]').forEach(function (a) { a.textContent = CONFIG.handle; });
    $$('[data-wa-number]').forEach(function (a) { a.textContent = CONFIG.waDisplay; });
    $$('[data-address]').forEach(function (a) { a.textContent = CONFIG.address; });
    if (CONFIG.hours) $$('[data-hours]').forEach(function (a) { a.textContent = CONFIG.hours; });
    $('#mapLink').href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(CONFIG.mapsQuery);
    $$('[data-price]').forEach(function (el) {
      var v = CONFIG.prices[el.getAttribute('data-price')];
      el.textContent = v || (el.classList.contains('price') ? 'Hubungi kami' : 'Sesuai brief');
      if (!v && el.classList.contains('price')) el.style.fontSize = '28px';
    });
    $('#yr').textContent = new Date().getFullYear();
  } catch (e) { if (window.console) console.error(e); }

  try {
    $('#heroArt').innerHTML = artOrImage('hero', heroArt());
    // Gunakan foto asli dari assets, bukan ilustrasi SVG dekoratif.
    $('#polArt').innerHTML = artOrImage('p1', heroArt());
    $('#stripArt').innerHTML = artOrImage('p5', strip(0));
    $('#aboutArt').innerHTML = artOrImage('about', aboutArt());
  } catch (e) { if (window.console) console.error(e); }

  try {
    var words = ['Self Photo', 'Photo Box', 'Desain Grafis', 'Tefa DKV', 'Sejak 2024'], g = '';
    for (var r = 0; r < 2; r++) words.forEach(function (w) { g += '<span>' + w + '</span><i class="sep"></i>'; });
    $('#marquee').innerHTML = '<div class="marquee-group">' + g + '</div><div class="marquee-group">' + g + '</div>';
  } catch (e) { if (window.console) console.error(e); }

  try {
    var m = $('#masonry'), mh = '';
    PORT.forEach(function (p, i) {
      mh += '<figure class="tile" data-kind="' + p.k + '" data-title="' + p.t + '" tabindex="0" role="button" aria-label="Perbesar: ' + p.t + '">' +
        '<div class="art">' + artOrImage('p' + (i + 1), svg(p.vb, p.h(), p.t)) + '</div>' +
        '<figcaption><span>' + (p.k === 'foto' ? 'Foto' : 'Desain') + '</span><b>' + p.t + '</b></figcaption></figure>';
    });
    m.innerHTML = mh;
  } catch (e) { if (window.console) console.error(e); }

  try {
    // Galeri photo strip memakai foto asli dari assets/images, bukan ilustrasi SVG.
    var rh = '';
    var railImages = [
      ['photo-01.jpg', 'Foto ALVA STUDIO 1'],
      ['photo-02.jpg', 'Foto ALVA STUDIO 2'],
      ['photo-03.jpg', 'Foto ALVA STUDIO 3'],
      ['photo-04.jpg', 'Foto ALVA STUDIO 4'],
      ['photo-05.jpg', 'Foto ALVA STUDIO 5'],
      ['photo-06.jpg', 'Foto ALVA STUDIO 6'],
      ['photo-07.jpg', 'Foto ALVA STUDIO 7'],
      ['photo-08.jpg', 'Foto ALVA STUDIO 8'],
      ['photo-09.jpg', 'Foto ALVA STUDIO 9']
    ];
    railImages.forEach(function (item) {
      rh += '<figure class="strip"><img src="assets/images/' + item[0] + '" alt="' + item[1] + '" loading="lazy" decoding="async"></figure>';
    });
    $('#rail').innerHTML = rh;
    var rail = $('#rail');
    $('#next').addEventListener('click', function () { rail.scrollBy({ left: 260, behavior: 'smooth' }); });
    $('#prev').addEventListener('click', function () { rail.scrollBy({ left: -260, behavior: 'smooth' }); });
  } catch (e) { if (window.console) console.error(e); }

  try {
    if (CONFIG.testimonials.length) {
      $('#voices').innerHTML = CONFIG.testimonials.map(function (t) {
        var d = document.createElement('div');
        d.textContent = t.teks;
        return '<article class="vcard"><span class="stars" aria-label="Bintang 5">★★★★★</span><p>' + d.innerHTML + '</p><small>' + (t.nama || '') + (t.peran ? ' · ' + t.peran : '') + '</small></article>';
      }).join('');
    }
  } catch (e) { if (window.console) console.error(e); }

  /* ====== interaksi ====== */
  try {
    var head = $('.site-head'), toTop = $('#toTop'), nav = $('#nav'), tgl = $('#navToggle');
    function onScroll() {
      var y = window.scrollY || document.documentElement.scrollTop;
      head.classList.toggle('scrolled', y > 24);
      toTop.hidden = y < 700;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

    function setNav(open) {
      if (open) nav.setAttribute('data-open', ''); else nav.removeAttribute('data-open');
      tgl.setAttribute('aria-expanded', open ? 'true' : 'false');
      tgl.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
    }
    tgl.addEventListener('click', function () { setNav(!nav.hasAttribute('data-open')); });
    $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { setNav(false); }); });

    $$('.tab').forEach(function (b) {
      b.addEventListener('click', function () {
        var f = b.getAttribute('data-filter');
        $$('.tab').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        $$('.tile').forEach(function (t) { t.hidden = !(f === 'all' || t.getAttribute('data-kind') === f); });
      });
    });

    var lb = $('#lb'), lbBody = $('#lbBody'), lbCap = $('#lbCap'), lastTile = null;
    // Pastikan pratinjau selalu tertutup saat halaman pertama kali dimuat.
    lb.hidden = true;
    lb.setAttribute('aria-hidden', 'true');
    function openLb(t) {
      lastTile = t;
      lbBody.innerHTML = '';
      lbBody.appendChild($('.art', t).firstElementChild.cloneNode(true));
      lbCap.textContent = t.getAttribute('data-title');
      lb.hidden = false;
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      $('#lbClose').focus();
    }
    function closeLb() {
      lb.hidden = true;
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastTile) lastTile.focus();
    }
    $$('.tile').forEach(function (t) {
      t.addEventListener('click', function () { openLb(t); });
      t.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(t); } });
    });
    $('#lbClose').addEventListener('click', closeLb);
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lb.hidden) closeLb(); });

    /* formulir -> WhatsApp */
    function fmtDate(v) { var p = v.split('-'); return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : v; }
    function msg() {
      var n = $('#f-nama').value.trim(), l = $('#f-layanan').value, t = $('#f-tanggal').value, x = $('#f-pesan').value.trim();
      var parts = ['Halo ALVA STUDIO, saya ' + (n || '[nama]') + '.', 'Saya ingin ' + l + (t ? ' pada tanggal ' + fmtDate(t) : '') + '.'];
      if (x) parts.push(x);
      return parts.join(' ');
    }
    var send = $('#waSend');
    function upd() { send.href = waLink(msg()); }
    $$('#bookForm input, #bookForm select, #bookForm textarea').forEach(function (el) {
      el.addEventListener('input', upd); el.addEventListener('change', upd);
    });
    $('#bookForm').addEventListener('submit', function (e) { e.preventDefault(); });
    upd();

    /* salin nomor */
    var copyBtn = $('#copyWa');
    copyBtn.addEventListener('click', function () {
      var txt = CONFIG.waDisplay;
      function done(t) { copyBtn.textContent = t; setTimeout(function () { copyBtn.textContent = 'Salin'; }, 1800); }
      function sel() {
        var rg = document.createRange(); rg.selectNodeContents($('#waNum'));
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(rg); done('Pilih lalu salin');
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(function () { done('Tersalin'); }, sel);
      } else { sel(); }
    });
  } catch (e) { if (window.console) console.error(e); }
})();
