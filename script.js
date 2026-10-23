(function () {
  var $ = function (id) {
    return document.getElementById(id);
  };
  /* Put your files in /assets and set the paths here. Leave '' to keep the text logo. */
  var ASSETS = { logo: "" };
  var stage = $("stage"),
    holder = $("holder"),
    TOTAL = 45500;
  var THEMES = [
    ["original", "Original"],
    ["orange", "🟠 Orange"],
    ["cherry", "🍒 Cherry"],
    ["gold", "👑 GoldRush"],
    ["industrial", "🔨 Industrial"],
    ["science", "🛰️ Science"],
    ["lava", "🔥 LAVA"],
  ];
  var SCENES = [
    [
      "01 · CONNECT",
      "Connect Phantom.",
      "One tap. Your wallet is your identity. No email, no password.",
    ],
    [
      "02 · CHAT",
      "Talk with real holders.",
      "Live public room. Reply, send images, mods set the cooldown.",
    ],
    [
      "03 · WHALE ROOM",
      "Whales only. 🐋",
      "1M+ tokens to get in. The sharpest talk stays with the biggest holders.",
    ],
    ["04 · PRIVATE", "Private DMs.", "Open a one-on-one with any holder."],
    [
      "05 · RANKINGS",
      "Rankings that matter.",
      "Top holders and top activity, always on display.",
    ],
    [
      "06 · COMMUNITIES",
      "Build your own room.",
      "Any token. Holders-only access. Whales can create one every 24h.",
    ],
    [
      "07 · THEMES",
      "7 themes. Your vibe.",
      "Original, Orange, Cherry, GoldRush, Industrial, Science, Lava.",
    ],
    [
      "08 · STREAKS + MODS",
      "Streaks and mod tools.",
      "Daily login streaks, pinned announcements, adjustable cooldowns.",
    ],
  ];

  /* dots */
  var dots = $("dots");
  SCENES.forEach(function () {
    dots.appendChild(document.createElement("i"));
  });
  function setDot(i) {
    [].forEach.call(dots.children, function (d, k) {
      d.classList.toggle("on", k <= i);
    });
  }

  /* chips */
  var chips = $("chips");
  THEMES.forEach(function (t) {
    var b = document.createElement("b");
    b.textContent = t[1];
    chips.appendChild(b);
  });

  /* engine */
  var events = [],
    tweens = [],
    elapsed = 0,
    last = 0,
    paused = false,
    ei = 0;
  function at(t, fn) {
    events.push({ t: t, fn: fn, i: events.length });
  }
  function tw(t, d, fn) {
    tweens.push({ t: t, d: d, fn: fn, done: false });
  }
  function run() {
    while (ei < events.length && events[ei].t <= elapsed) events[ei++].fn();
    for (var i = 0; i < tweens.length; i++) {
      var w = tweens[i];
      if (w.done || elapsed < w.t) continue;
      var p = Math.min(1, (elapsed - w.t) / w.d);
      w.fn(p);
      if (p >= 1) w.done = true;
    }
    if (elapsed >= TOTAL) restart();
  }
  function loop(now) {
    if (!last) last = now;
    var dt = Math.min(100, now - last);
    last = now;
    if (!paused) {
      elapsed += dt;
      run();
    }
    requestAnimationFrame(loop);
  }

  /* helpers */
  function setCap(i) {
    var c = $("cap");
    c.classList.remove("in");
    void c.offsetWidth;
    c.querySelector(".k").textContent = SCENES[i][0];
    c.querySelector("h2").textContent = SCENES[i][1];
    c.querySelector("p").textContent = SCENES[i][2];
    c.classList.add("in");
    setDot(i);
  }
  function pane(id) {
    ["p-id", "p-chat", "p-rank", "p-rooms", "p-mod"].forEach(function (p) {
      $(p).classList.toggle("on", p === id);
    });
  }
  function tab(t) {
    [].forEach.call($("tabs").children, function (b) {
      b.classList.toggle("on", b.dataset.t === t);
    });
  }
  function toast(t) {
    var e = $("toast");
    e.textContent = t;
    e.classList.add("on");
    setTimeout(function () {
      e.classList.remove("on");
    }, 1500);
  }
  function press(id) {
    var e = $(id);
    e.classList.remove("press");
    void e.offsetWidth;
    e.classList.add("press");
  }
  function type(id, txt, t, d, cls) {
    tw(t, d, function (p) {
      var e = $(id);
      var n = Math.round(p * txt.length);
      e.textContent = n ? txt.slice(0, n) : "";
      if (cls) e.classList.toggle("t", n > 0);
    });
  }
  function msg(who, tier, txt, col, o) {
    o = o || {};
    var d = document.createElement("div");
    d.className = "m" + (o.me ? " me" : "") + (o.wh ? " wh" : "");
    d.innerHTML =
      '<div class="av" style="background:' +
      col +
      '">' +
      who[0].toUpperCase() +
      '</div><div class="bub"><div class="who">' +
      who +
      (tier ? '<span class="bd">' + tier + "</span>" : "") +
      "</div>" +
      (o.rep ? '<div class="rep">' + o.rep + "</div>" : "") +
      txt +
      (o.img ? '<div class="img">🖼️</div>' : "") +
      "</div>";
    var m = $("msgs");
    m.appendChild(d);
    while (m.children.length > 7) m.removeChild(m.firstChild);
  }
  function clear() {
    $("msgs").innerHTML = "";
  }
  function setTheme(k) {
    stage.dataset.theme = k;
  }
  var C = ["#39ff88", "#00d1ff", "#ffcf4a", "#ff4d6d", "#b794ff"];

  /* build timeline */
  function build() {
    events = [];
    tweens = [];
    ei = 0;

    /* intro 0-3000 */
    at(0, function () {
      stage.dataset.mode = "intro";
    });

    /* 01 connect 3000 */
    at(3000, function () {
      stage.dataset.mode = "app";
      setCap(0);
      pane("p-id");
      tab("");
      $("pin").textContent = "No announcements yet";
    });
    at(3700, function () {
      press("phb");
    });
    at(4000, function () {
      $("wal").textContent = "✅ 7xKp…9fQ2 connected";
    });
    type("idn", "kingsol", 4200, 800);
    at(5100, function () {
      $("pfp").classList.add("set");
      $("pfp").textContent = "K";
    });
    at(5900, function () {
      press("joinb");
    });
    at(6300, function () {
      toast("Welcome, kingsol 🐋");
    });

    /* 02 public chat 7000 */
    at(7000, function () {
      setCap(1);
      pane("p-chat");
      tab("pub");
      clear();
      $("inp").textContent = "Message…";
    });
    tw(7000, 900, function (p) {
      $("act").textContent = Math.round(143 * p);
    });
    at(7500, function () {
      msg("mati.sol", "🐬 Dolphin", "gm holders ☀️", C[1]);
    });
    at(8200, function () {
      msg("lucho", "🐟 Fish", "day 2 here, this chat is alive", C[2]);
    });
    at(8900, function () {
      msg("sofi", "🐟 Fish", "who else is holding through the dip?", C[3]);
    });
    at(9600, function () {
      msg("anon_42", "🐋 Whale", "holding. always.", C[4]);
    });
    type("inp", "Strong hands only 💪", 9900, 900, true);
    at(10900, function () {
      press("snd");
      $("inp").textContent = "Message…";
      $("inp").classList.remove("t");
      msg("kingsol", "🐋 Whale", "Strong hands only 💪", C[0], { me: 1 });
    });
    at(11500, function () {
      msg("mati.sol", "🐬 Dolphin", "this one 👇", C[1], {
        rep: "↳ Replying to kingsol",
        img: 1,
      });
    });

    /* 03 whale 12500 */
    at(12500, function () {
      setCap(2);
      tab("wha");
      clear();
      $("pin").textContent = "🔒 Required tokens to chat: 1,000,000";
    });
    at(13000, function () {
      msg("anon_42", "🐋 Whale", "whale room is quiet and sharp 🐋", C[4], {
        wh: 1,
      });
    });
    at(13700, function () {
      msg("whale_9", "🐋 Whale", "big news dropping tonight", C[2], { wh: 1 });
    });
    at(14400, function () {
      msg("kingsol", "🐋 Whale", "in. who is joining the call?", C[0], {
        wh: 1,
        me: 1,
      });
    });
    at(15100, function () {
      msg("moonrik", "🐋 Whale", "all in 🙌", C[3], { wh: 1 });
    });
    at(15900, function () {
      $("pin").classList.add("hot");
    });

    /* 04 DM 17000 */
    at(17000, function () {
      setCap(3);
      tab("pri");
      clear();
      $("pin").classList.remove("hot");
      $("pin").textContent = "🔒 Private chat with mati.sol";
    });
    at(17500, function () {
      msg("mati.sol", "🐬 Dolphin", "hey, saw your card, nice streak", C[1]);
    });
    at(18400, function () {
      msg("kingsol", "🐋 Whale", "thanks! come to the whale room", C[0], {
        me: 1,
      });
    });
    at(19200, function () {
      msg("mati.sol", "🐬 Dolphin", "on my way 🚀", C[1]);
    });

    /* 05 rankings 20500 */
    at(20500, function () {
      setCap(4);
      pane("p-rank");
      tab("");
      $("pin").textContent = "🏆 Rankings";
      buildRank();
    });
    for (var i = 0; i < 7; i++)
      (function (i) {
        tw(20800 + i * 160, 700, function (p) {
          var f = document.querySelectorAll(".fl")[i];
          if (f) f.style.width = Math.round(RK[i][2] * p) + "%";
        });
      })(i);

    /* 06 rooms 25500 */
    at(25500, function () {
      setCap(5);
      pane("p-rooms");
      $("pin").textContent = "🏛️ Communities";
      $("rooms").innerHTML = "";
      $("rm1").textContent = "";
      $("rm2").textContent = "";
      $("sw").classList.remove("on");
    });
    at(25900, function () {
      $("rm1").textContent = "9xQe…Npump";
    });
    type("rm2", "Meme Lords", 26300, 700);
    at(27300, function () {
      $("sw").classList.add("on");
    });
    at(28100, function () {
      press("crb");
    });
    at(28500, function () {
      toast("Room created ✅");
      addRoom("Meme Lords", "Holders only · you", "NEW", 1);
    });
    at(28900, function () {
      addRoom("Degen Hub", "Open · 312 members", "", 0);
    });
    at(29300, function () {
      addRoom("Whale Council", "1M+ only · 41 members", "", 1);
    });

    /* 07 themes 30000 */
    at(30000, function () {
      setCap(6);
      pane("p-chat");
      tab("pub");
      $("pin").textContent = "🎨 Pick your style";
      clear();
      msg("sofi", "🐟 Fish", "new theme just dropped 👀", C[3]);
      msg("mati.sol", "🐬 Dolphin", "lava looks insane", C[1]);
      $("sheet").classList.add("on");
    });
    THEMES.forEach(function (t, i) {
      at(30500 + i * 700, function () {
        setTheme(t[0]);
        [].forEach.call($("chips").children, function (c, k) {
          c.classList.toggle("on", k === i);
        });
        toast(t[1]);
      });
    });
    at(35300, function () {
      $("sheet").classList.remove("on");
      setTheme("original");
    });

    /* 08 streaks + mods 35500 */
    at(35500, function () {
      setCap(7);
      pane("p-chat");
      clear();
      $("pin").textContent = "🔥 Daily login streak";
      var s = document.createElement("div");
      s.className = "stk";
      s.innerHTML =
        '<div class="fire">🔥</div><div class="num" id="sn">1</div><div class="l">DAY STREAK</div>';
      $("msgs").appendChild(s);
    });
    tw(35700, 1400, function (p) {
      var e = $("sn");
      if (e) e.textContent = Math.max(1, Math.round(41 * p));
    });
    at(37400, function () {
      pane("p-mod");
      $("pin").textContent = "⚙️ Mod tools";
      [].forEach.call($("seg").children, function (b) {
        b.classList.remove("on");
      });
      $("ann").textContent = "";
      $("annb").classList.remove("press");
    });
    at(37800, function () {
      $("seg").children[1].classList.add("on");
    });
    type("ann", "Whale call tonight 9PM", 38000, 800);
    at(38900, function () {
      press("annb");
      $("pin").textContent = "📢 Whale call tonight 9PM";
      $("pin").classList.add("hot");
      toast("Announcement posted");
    });

    /* CTA 39500 */
    at(39600, function () {
      stage.dataset.mode = "cta";
      setTheme("original");
      $("pin").classList.remove("hot");
    });
  }

  var RK = [
    ["kingsol 🐋", "4.2M", 100],
    ["anon_42 🐋", "3.1M", 74],
    ["whale_9 🐋", "2.4M", 57],
    ["moonrik 🐋", "1.6M", 38],
    ["mati.sol 🐬", "320K", 20],
    ["sofi 🐟", "88K", 14],
    ["lucho 🐟", "21K", 9],
  ];
  var ACT = [
    ["mati.sol", "812 msgs", 100],
    ["sofi", "640 msgs", 78],
    ["kingsol", "590 msgs", 72],
  ];
  function buildRank() {
    function row(i, p, n, v) {
      return (
        '<div class="rk"><div class="p">' +
        p +
        '</div><div><div class="nm"><span>' +
        n +
        "</span><span>" +
        v +
        '</span></div><div class="trk"><div class="fl"></div></div></div></div>'
      );
    }
    var h1 = "",
      h2 = "";
    for (var i = 0; i < 4; i++) h1 += row(i, i + 1, RK[i][0], RK[i][1]);
    $("r1").innerHTML = h1;
    /* only 4 holders + 3 activity visible, map to RK indexes 0..6 */
    var ra = "";
    for (var j = 0; j < 3; j++) {
      ra += row(4 + j, j + 1, ACT[j][0], ACT[j][1]);
    }
    $("r2").innerHTML = ra;
    RK = [
      RK[0],
      RK[1],
      RK[2],
      RK[3],
      ["", "", ACT[0][2]],
      ["", "", ACT[1][2]],
      ["", "", ACT[2][2]],
    ];
    RK[0][2] = 100;
    RK[1][2] = 74;
    RK[2][2] = 57;
    RK[3][2] = 38;
  }
  function addRoom(n, s, nw, lock) {
    var d = document.createElement("div");
    d.className = "room";
    d.innerHTML =
      '<div class="ri">' +
      (lock ? "🔒" : "🌐") +
      '</div><div class="rn">' +
      n +
      "<small>" +
      s +
      "</small></div>" +
      (nw ? '<span class="nw">' + nw + "</span>" : "");
    $("rooms").appendChild(d);
  }

  /* reset + restart */
  function resetDom() {
    stage.dataset.mode = "intro";
    setTheme("original");
    clear();
    pane("");
    tab("");
    $("idn").textContent = "";
    $("wal").textContent = "";
    $("pfp").classList.remove("set");
    $("pfp").textContent = "📷";
    $("act").textContent = "0";
    $("pin").textContent = "No announcements yet";
    $("pin").classList.remove("hot");
    $("sheet").classList.remove("on");
    $("inp").textContent = "Message…";
    $("inp").classList.remove("t");
    $("rooms").innerHTML = "";
    $("r1").innerHTML = "";
    $("r2").innerHTML = "";
    RK = [
      ["kingsol 🐋", "4.2M", 100],
      ["anon_42 🐋", "3.1M", 74],
      ["whale_9 🐋", "2.4M", 57],
      ["moonrik 🐋", "1.6M", 38],
      ["mati.sol 🐬", "320K", 20],
      ["sofi 🐟", "88K", 14],
      ["lucho 🐟", "21K", 9],
    ];
    setDot(-1);
    /* retrigger intro animation */
    var o = document.querySelector(".ov.intro");
    o.style.display = "none";
    void o.offsetWidth;
    o.style.display = "";
  }
  function restart() {
    elapsed = 0;
    last = 0;
    resetDom();
    build();
    run();
  }

  /* layout */
  function fit() {
    var land = stage.dataset.ratio === "land";
    var W = land ? 1280 : 720,
      H = land ? 720 : 1280;
    var fw = $("fit").clientWidth,
      fh = $("fit").clientHeight;
    var s = Math.min(fw / W, fh / H);
    stage.style.width = W + "px";
    stage.style.height = H + "px";
    stage.style.transform = "scale(" + s + ")";
    holder.style.width = W * s + "px";
    holder.style.height = H * s + "px";
  }
  function setFmt(r) {
    stage.dataset.ratio = r;
    $("bFmt").textContent = r === "land" ? "▯ 9:16" : "▭ 16:9";
    fit();
  }

  /* controls */
  function togglePause() {
    paused = !paused;
    stage.classList.toggle("paused", paused);
    $("bPlay").textContent = paused ? "▶ Play" : "⏸ Pause";
  }
  $("bPlay").onclick = togglePause;
  $("bRe").onclick = restart;
  $("bFmt").onclick = function () {
    setFmt(stage.dataset.ratio === "land" ? "port" : "land");
  };
  $("bHide").onclick = function () {
    $("ctl").classList.add("hide");
    $("fit").style.bottom = "0";
    fit();
  };
  document.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
      e.preventDefault();
      togglePause();
    } else if (e.key === "r" || e.key === "R") restart();
    else if (e.key === "f" || e.key === "F") $("bFmt").click();
    else if (e.key === "h" || e.key === "H") {
      var c = $("ctl");
      var hide = !c.classList.contains("hide");
      c.classList.toggle("hide", hide);
      $("fit").style.bottom = hide ? "0" : "46px";
      fit();
    }
  });
  window.addEventListener("resize", fit);

  function applyAssets() {
    if (!ASSETS.logo) return;
    document.querySelectorAll(".lg").forEach(function (el) {
      el.innerHTML =
        '<img src="' + ASSETS.logo + '" alt="Meme Social Network">';
    });
    var l = document.querySelector(".top .l");
    if (l) l.innerHTML = '<img src="' + ASSETS.logo + '" alt="MSN">';
  }
  if (window.innerHeight > window.innerWidth) stage.dataset.ratio = "port";
  $("bFmt").textContent = stage.dataset.ratio === "land" ? "▯ 9:16" : "▭ 16:9";
  applyAssets();
  fit();
  resetDom();
  build();
  requestAnimationFrame(loop);
})();
