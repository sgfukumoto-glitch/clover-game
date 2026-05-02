import { useState, useEffect, useRef, useCallback, useMemo } from "react";

const T = {
  ja: {
    title: "🍀 CLOVER™️",
    subtitle: "♣ NUMBER CARD GAME ♣",
    best: "🏆 ベスト",
    sec: "秒",
    reset: "リセット",
    resetConfirm: "ベストタイムをリセットしますか？",
    howToPlay: "やり方を学ぶ 📖",
    start: "スタート 🃏",
    hint1: "⬇️ のボタンを押すと…",
    desc: (
      <>
        52枚の山からカードを引いて<br/>
        <span style={{ color: "#60a5fa", fontWeight: "bold" }}>①②③④⑤</span> に書かれた数字を四則計算で繋げて並び替えて{" "}
        <span style={{ color: "#ef4444", fontWeight: "bold" }}>⑥</span> の数字(target)にしよう！！<br/>タイムを競うカードゲームだよ！
      </>
    ),
    toBeHappy: "to be happy... 🍀",
    tutHint1: "📖 ピンク→チュートリアルで試し遊び！",
    tutHint2: "🃏 黄色字→本番スタート！",
    by: "by NPO法人 Foster Partner®️",
    back: "← 戻る",
    surrender: "降参 →",
    surrenderTitle: "解答例", surrenderSub: "こんな解き方があったよ！", surrenderNext: "次の問題へ 🃏",
    tutBanner: "チュートリアル中 🩷 — 説明に沿って操作手順を覚えてね",
    backToTitle: "タイトルへ戻る",
    next: "次へ →",
    tut1: <>👆 スタートと同時に<br/>タイムが動き出すよ！⏱</>,
    target: "⑥ TARGET",
    tut2: <>これが👆⑥ターゲット<br/>この数字を答えにするのが<br/>目標だよ！</>,
    tut3: <>👆 ①②③④⑤の5枚！<br/>この数字を並べ替えて<br/>四則計算記号(+-×÷)で繋いで<br/>上のターゲットの数字にするよ</>,
    tut3b: <>記号(+-×÷)は<br/>何度使ってもいいよ</>,
    tut3c: "※解法は一つではないよ",
    tut4: <>出来たら<br/>「フォスパ」と言って、<br/>👇のボタンを押すよ<br/><br/>わからない時は<br/>「降参」ボタン👆を押すよ</>,
    tut4b: "※バスや電車の中では、心の中でね笑",
    tut4surrender: "わからなくて解答を知りたい場合は「降参」ボタンを押すよ。",
    fospa: "フォスパ！🙋",
    dealing: "カードを配っています…",
    fospaTime: "フォスパ！ ⏱",
    tutBanner2: "チュートリアル中 🩷",
    backOk: "解き直したい時は戻れるよ",
    tut5: <>このように、数字と演算記号を<br/>組み合わせて解答していくよ！<br/><br/>出来たら「答え合わせ」を押してね</>,
    tut6: <>式が入力されたよ！<br/><span style={{ fontSize: "32px" }}>👇の「答え合わせ」ボタンを押してね。</span></>,
    exprPlaceholder: "ここに式が入るよ",
    check: "答え合わせ！",
    retry: "やり直す",
    errAll: "①〜⑤の数字を各1回ずつ全部使ってね！",
    errExpr: "式が正しくないよ。確認してね。",
    correct: (t) => `正解！= ${t} 🍀`,
    wrong: (v) => `その式は ${v} になるよ`,
    tutComplete: <>チュートリアル<br/>完了！🎉</>,
    correct2: "せいかい！🍬",
    tutResult1: "⬆️ はクリアしたタイムだよ！\n本番では記録が出るたびに更新されるよ🏆\n👇 新記録なら「新記録」と金色に点滅するよ！",
    tutResult2: <>やり方はわかったかな？<br/>さぁいよいよチャレンジだ👇</>,
    nextGame: "次の問題へ 🃏（本番！）",
    about: "🍀 CLOVER™️について読む",
    newRecord: "🎉 新記録！ 🎉",
    currentBest: "🏆 ただ今のベスト：",
    nextGame2: "次の問題へ 🃏",
    toTitle: "タイトルへ",
    aboutTitle: "🍀 CLOVER™️について",
    about1title: "🏢 監修",
    about1: <><strong style={{ color: "white" }}>NPO法人 Foster Partner®️</strong>が監修して作ったゲームアプリです。</>,
    about2title: "📖 誕生の背景",
    about2: <>以前、似たロジックのカードゲームが世にありましたが、今はどこにも販売されていません。<br/>その寂しさから、ロジックを逆算してデジタル版として<strong style={{ color: "white" }}>CLOVER™️</strong>を組み立てました！</>,
    about3title: "👨‍👩‍👧‍👦 こんな人に",
    about3: <>四則計算ができれば<strong style={{ color: "white" }}>小学3年生(?)から</strong>プレイ可能！<br/>大人だから強いとも言えないので、子どもから大人まで本気で勝負できます。<br/><br/>家族が揃っているのにやることない…そんな時に！<br/><span style={{ color: "#fbbf24" }}>・在宅勤務でおうち時間が増えた</span><br/><span style={{ color: "#fbbf24" }}>・祖父母と孫でボケ防止にも笑</span><br/><span style={{ color: "#fbbf24", fontWeight: "bold" }}>・家族全員が本気で競える！</span></>,
    about4title: "🍀 CLOVERの由来",
    about4: <>四葉のクローバー → 幸せを呼ぶ → 一見困難でも、工夫すれば（並び変えて四則計算で組むことで）答えを導き出せるかもしれない、という意味を込めました！<br/><br/><strong style={{ color: "#fbbf24", fontSize: "28px" }}>※C<span style={{ color: "#ef4444" }}>LOVE</span>R™️の中には「LOVE（愛）」があるのがまたポイント笑</strong></>,
  },
  en: {
    title: "🍀 CLOVER™️",
    subtitle: "♣ NUMBER CARD GAME ♣",
    best: "🏆 Best",
    sec: "s",
    reset: "Reset",
    resetConfirm: "Reset your best time?",
    howToPlay: "How to Play 📖",
    start: "Start 🃏",
    hint1: "⬇️ Press a button below…",
    desc: (
      <>
        Draw cards from a 52-card deck!<br/>
        Use <span style={{ color: "#60a5fa", fontWeight: "bold" }}>①②③④⑤</span> with arithmetic operations to reach the{" "}
        <span style={{ color: "#ef4444", fontWeight: "bold" }}>⑥</span> target number!<br/>Race against the clock!
      </>
    ),
    toBeHappy: "to be happy... 🍀",
    tutHint1: "📖 Pink → Try the tutorial first!",
    tutHint2: "🃏 Yellow → Start the real game!",
    by: "by NPO Foster Partner®️",
    back: "← Back",
    surrender: "Skip →",
    surrenderTitle: "Answer", surrenderSub: "Here's one way to solve it!", surrenderNext: "Next Game 🃏",
    tutBanner: "Tutorial 🩷 — Follow the instructions to learn how to play!",
    backToTitle: "Back to Title",
    next: "Next →",
    tut1: <>👆 The timer starts<br/>as soon as the game begins！⏱</>,
    target: "⑥ TARGET",
    tut2: <>👆 This is the ⑥ Target!<br/>Your goal is to make<br/>this number!</>,
    tut3: <>👆 These are the 5 cards ①②③④⑤!<br/>Rearrange them with<br/>arithmetic operators(+-×÷)<br/>to reach the target!</>,
    tut3b: <>You can use operators<br/>as many times as you like!</>,
    tut3c: "※ There may be multiple solutions!",
    tut4: <>When you're ready,<br/>shout "Fospa!" and<br/>press 👇 the button!<br/><br/>If you're stuck,<br/>press the "Skip" button 👆</>,
    tut4b: "※ On the bus/train, just think it 😄",
    tut4surrender: "If you're stuck and want to see the answer, press the \"Skip\" button.",
    fospa: "Fospa！🙋",
    dealing: "Dealing cards…",
    fospaTime: "Fospa！ ⏱",
    tutBanner2: "Tutorial 🩷",
    backOk: "You can go back to rethink!",
    tut5: <>Combine numbers and operators<br/>like this to build your answer!<br/><br/>Then press "Check Answer"!</>,
    tut6: <>Expression entered!<br/><span style={{ fontSize: "32px" }}>👇 Press "Check Answer"!</span></>,
    exprPlaceholder: "Your expression goes here",
    check: "Check Answer！",
    retry: "Try Again",
    errAll: "Use each of ①~⑤ exactly once!",
    errExpr: "Invalid expression. Please check!",
    correct: (t) => `Correct！= ${t} 🍀`,
    wrong: (v) => `That equals ${v}`,
    tutComplete: <>Tutorial<br/>Complete！🎉</>,
    correct2: "Correct！🍬",
    tutResult1: "⬆️ That's your clear time!\nIn the real game, your best is saved！🏆\n👇 A new record flashes gold!",
    tutResult2: <>Got the hang of it？<br/>Now it's time to play for real！👇</>,
    nextGame: "Next Game 🃏 (Real!)",
    about: "🍀 About CLOVER™️",
    newRecord: "🎉 New Record！ 🎉",
    currentBest: "🏆 Current Best：",
    nextGame2: "Next Game 🃏",
    toTitle: "Title",
    aboutTitle: "🍀 About CLOVER™️",
    about1title: "🏢 Supervised By",
    about1: <>This app was created under the supervision of <strong style={{ color: "white" }}>NPO Foster Partner®️</strong>.</>,
    about2title: "📖 The Story Behind It",
    about2: <>There used to be a card game with similar logic, but it disappeared from stores. Out of nostalgia, we reverse-engineered the logic and rebuilt it digitally as <strong style={{ color: "white" }}>CLOVER™️</strong>!</>,
    about3title: "👨‍👩‍👧‍👦 Who Is It For?",
    about3: <>Anyone who can do basic arithmetic — <strong style={{ color: "white" }}>from about 3rd grade</strong> and up!<br/>Adults don't necessarily have the advantage, so the whole family can compete for real.<br/><br/>Perfect for when the family is home but bored！<br/><span style={{ color: "#fbbf24" }}>・Working from home? Great indoor activity!</span><br/><span style={{ color: "#fbbf24" }}>・Grandparents vs grandkids — great for the brain!</span><br/><span style={{ color: "#fbbf24", fontWeight: "bold" }}>・The whole family competing for real！</span></>,
    about4title: "🍀 The Name CLOVER",
    about4: <>Four-leaf clover → brings happiness → even something that looks difficult might have a solution if you rearrange and combine it creatively！<br/><br/><strong style={{ color: "#fbbf24", fontSize: "28px" }}>※ C<span style={{ color: "#ef4444", fontWeight:"900" }}>LOVE</span>R™️ — there's LOVE right in the name！ 😄</strong></>,
  },
};

function buildDeck() {
  const deck = [];
  for (let n = 1; n <= 10; n++) for (let i = 0; i < 3; i++) deck.push(n);
  for (let n = 11; n <= 17; n++) for (let i = 0; i < 2; i++) deck.push(n);
  for (let n = 18; n <= 25; n++) deck.push(n);
  return deck;
}
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function findSolution(nums, target) {
  const ops = ["+", "-", "*", "/"];
  const opSymbols = { "+": "+", "-": "-", "*": "×", "/": "÷" };
  function perms(arr) {
    if (arr.length <= 1) return [arr];
    const r = [];
    for (let i = 0; i < arr.length; i++) {
      const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
      for (const p of perms(rest)) r.push([arr[i], ...p]);
    }
    return r;
  }
  function opCombos(n) {
    if (n === 0) return [[]];
    const r = [];
    for (const op of ops) for (const rest of opCombos(n - 1)) r.push([op, ...rest]);
    return r;
  }
  function evaluate(vals, operators) {
    let result = vals[0];
    for (let i = 0; i < operators.length; i++) {
      const v = vals[i + 1];
      if (operators[i] === "+") result += v;
      else if (operators[i] === "-") result -= v;
      else if (operators[i] === "*") result *= v;
      else { if (v === 0) return null; result /= v; }
    }
    return result;
  }
  for (const perm of perms(nums))
    for (const combo of opCombos(4)) {
      const val = evaluate(perm, combo);
      if (val !== null && Math.abs(val - target) < 0.0001) {
        const expr = perm.map((n, i) => i === 0 ? n : `${opSymbols[combo[i-1]]} ${n}`).join(" ");
        return expr;
      }
    }
  return null;
}

function canSolve(nums, target) {
  const ops = ["+", "-", "*", "/"];
  function perms(arr) {
    if (arr.length <= 1) return [arr];
    const r = [];
    for (let i = 0; i < arr.length; i++) {
      const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
      for (const p of perms(rest)) r.push([arr[i], ...p]);
    }
    return r;
  }
  function opCombos(n) {
    if (n === 0) return [[]];
    const r = [];
    for (const op of ops) for (const rest of opCombos(n - 1)) r.push([op, ...rest]);
    return r;
  }
  function evaluate(vals, operators) {
    let result = vals[0];
    for (let i = 0; i < operators.length; i++) {
      const v = vals[i + 1];
      if (operators[i] === "+") result += v;
      else if (operators[i] === "-") result -= v;
      else if (operators[i] === "*") result *= v;
      else { if (v === 0) return null; result /= v; }
    }
    return result;
  }
  for (const perm of perms(nums))
    for (const combo of opCombos(4)) {
      const val = evaluate(perm, combo);
      if (val !== null && Math.abs(val - target) < 0.0001) return true;
    }
  return false;
}
function drawCards() {
  for (let i = 0; i < 500; i++) {
    const deck = shuffle(buildDeck());
    const target = deck[0];
    const nums = deck.slice(1, 6);
    if (canSolve(nums, target)) return { target, nums };
  }
  return { target: 10, nums: [1, 2, 3, 4, 5] };
}

function validateExpression(expr, nums, target, t) {
  const tokens = expr.replace(/[+\-*/()]/g, " ").trim().split(/\s+/).filter(Boolean);
  const usedNums = tokens.map(Number).filter(n => !isNaN(n));
  const sortedUsed = [...usedNums].sort((a, b) => a - b);
  const sortedNums = [...nums].sort((a, b) => a - b);
  if (JSON.stringify(sortedUsed) !== JSON.stringify(sortedNums))
    return { ok: false, msg: t.errAll };
  try {
    const safe = expr.replace(/[^0-9+\-*/().]/g, "");
    // eslint-disable-next-line no-new-func
    const result = Function('"use strict"; return (' + safe + ")")();
    if (Math.abs(result - target) < 0.0001) return { ok: true, msg: t.correct(target) };
    return { ok: false, msg: t.wrong(Number(result.toFixed(4))) };
  } catch { return { ok: false, msg: t.errExpr }; }
}

const TUTORIAL_CARDS = { target: 18, nums: [1, 17, 5, 2, 6] };

function CloverSVG({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 112" style={{ display: "block", overflow: "visible" }}>
      <line x1="50" y1="54" x2="36" y2="108" stroke="#3a9a3a" strokeWidth="5" strokeLinecap="round"/>
      {[0, 90, 180, 270].map(deg => (
        <g key={deg} transform={`rotate(${deg} 50 50)`}>
          <path d="M50,50 C50,50 30,38 30,22 C30,12 42,8 50,18 C58,8 70,12 70,22 C70,38 50,50 50,50Z"
            fill="#e8f8e8" stroke="#3a9a3a" strokeWidth="2.5" />
        </g>
      ))}
      <circle cx="50" cy="50" r="5" fill="#3a9a3a"/>
      <text x="50" y="24" textAnchor="middle" dominantBaseline="middle" fontSize="20" fontWeight="900" fill="#111" fontFamily="Arial,sans-serif" stroke="white" strokeWidth="5" paintOrder="stroke">＋</text>
      <text x="76" y="50" textAnchor="middle" dominantBaseline="middle" fontSize="18" fontWeight="900" fill="#111" fontFamily="Arial,sans-serif" stroke="white" strokeWidth="5" paintOrder="stroke">÷</text>
      <text x="50" y="76" textAnchor="middle" dominantBaseline="middle" fontSize="22" fontWeight="900" fill="#111" fontFamily="Arial,sans-serif" stroke="white" strokeWidth="5" paintOrder="stroke">－</text>
      <text x="24" y="50" textAnchor="middle" dominantBaseline="middle" fontSize="20" fontWeight="900" fill="#111" fontFamily="Arial,sans-serif" stroke="white" strokeWidth="5" paintOrder="stroke">×</text>
      <text x="56" y="106" fontSize="6" fill="#3a9a3a" fontStyle="italic" fontFamily="Georgia,serif">to be happy…</text>
    </svg>
  );
}

function CloverCard({ number, isTarget = false, size = "normal" }) {
  const d = {
    large:  { w: 240, h: 348, numSz: 120, svgSz: 192, r: 26, bw: 7 },
    normal: { w: 185, h: 270, numSz: 90,  svgSz: 136, r: 22, bw: 5 },
    small:  { w: 139, h: 220, numSz: 70,  svgSz: 116, r: 17, bw: 5 },
    xsmall: { w: 123, h: 195, numSz: 58,  svgSz: 92,  r: 14, bw: 4 },
  }[size];
  return (
    <div style={{
      width: d.w, height: d.h, borderRadius: d.r, background: "white",
      border: `${d.bw}px solid ${isTarget ? "#ef4444" : "#f97316"}`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between",
      padding: "6px 3px 2px", boxSizing: "border-box",
      boxShadow: "0 3px 14px rgba(0,0,0,0.45)", flexShrink: 0,
    }}>
      <div style={{ fontSize: d.numSz, fontWeight: "900", color: "#111", lineHeight: 1, fontFamily: "Georgia,serif" }}>{number}</div>
      <CloverSVG size={d.svgSz} />
    </div>
  );
}

function CardBack({ size = "normal" }) {
  const d = {
    large:  { w: 88,  h: 128, r: 10, fs: 28 },
    normal: { w: 68,  h: 98,  r: 9,  fs: 22 },
    small:  { w: 50,  h: 72,  r: 7,  fs: 16 },
    xsmall: { w: 40,  h: 58,  r: 6,  fs: 12 },
  }[size];
  return (
    <div style={{
      width: d.w, height: d.h, borderRadius: d.r,
      background: "linear-gradient(160deg,#1a3a22,#0d2414)",
      border: "2px solid #4ade8033",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: d.fs, flexShrink: 0, boxShadow: "0 3px 14px rgba(0,0,0,0.45)",
    }}>🍀</div>
  );
}

function TutorialBubble({ text }) {
  return (
    <div style={{
      position: "relative", zIndex: 100, background: "#ff69b4", color: "white",
      borderRadius: "14px", padding: "28px 32px", fontSize: "50px", fontWeight: "bold",
      lineHeight: "1.6", margin: "16px 0", boxShadow: "0 4px 20px rgba(255,105,180,0.5)",
      border: "2px solid #ff1493", animation: "pulse-pink 2s infinite",
    }}>{text}</div>
  );
}

function AnimatedExprDemo({ nums, onUsedIdxsChange, onDone }) {
  const sequence = [
    { type: "num", idx: 0, val: String(nums[0]) },
    { type: "op", val: "*" },
    { type: "op", val: "(" },
    { type: "num", idx: 3, val: String(nums[3]) },
    { type: "op", val: "+" },
    { type: "num", idx: 2, val: String(nums[2]) },
    { type: "op", val: ")" },
    { type: "op", val: "+" },
    { type: "num", idx: 1, val: String(nums[1]) },
    { type: "op", val: "-" },
    { type: "num", idx: 4, val: String(nums[4]) },
  ];
  const FINAL_EXPR = `${nums[0]}*(${nums[3]}+${nums[2]})+${nums[1]}-${nums[4]}`;
  const [started, setStarted] = useState(false);
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);
  const usedIdxs = sequence.slice(0, shown).filter(s => s.type === "num").map(s => s.idx);
  const displayStr = sequence.slice(0, shown).map(s => s.val).join("").replace(/\*/g, "×");
  useEffect(() => { onUsedIdxsChange(usedIdxs); }, [shown]);
  useEffect(() => { const t = setTimeout(() => setStarted(true), 3000); return () => clearTimeout(t); }, []);
  useEffect(() => {
    if (!started) return;
    if (shown < sequence.length) { const t = setTimeout(() => setShown(s => s + 1), 700); return () => clearTimeout(t); }
    else if (!done) { const t = setTimeout(() => { setDone(true); onDone(FINAL_EXPR); }, 600); return () => clearTimeout(t); }
  }, [started, shown, done]);
  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ position: "relative", zIndex: 100, background: "#ff69b4", color: "white", borderRadius: "14px", padding: "18px 22px", fontSize: "50px", fontWeight: "bold", lineHeight: "1.6", margin: "12px 0", boxShadow: "0 4px 20px rgba(255,105,180,0.5)", border: "2px solid #ff1493", animation: "pulse-pink 2s infinite" }}>
        このように、数字と演算記号を<br/>組み合わせて解答していくよ！<br/><br/>出来たら「答え合わせ」を押してね
      </div>
      <div style={{ background: "#111f14", border: "2px solid #4ade8033", borderRadius: "16px", padding: "20px 20px", fontSize: "68px", fontFamily: "monospace", fontWeight: "bold", color: "white", textAlign: "center", marginTop: "8px", minHeight: "80px", letterSpacing: "1px", wordBreak: "break-all" }}>
        {displayStr || <span style={{ color: "#2a4a2a", fontSize: "28px" }}>3秒後にデモが始まるよ…</span>}
        {started && !done && <span style={{ animation: "blink 0.8s infinite" }}>|</span>}
      </div>
    </div>
  );
}

// ===== BGM =====
let bgmCtx = null;
let bgmNodes = [];
let bgmPlaying = false;
let bgmTimer = null;

function playBGM() {
  if (bgmPlaying) return;
  bgmPlaying = true;
  try {
    bgmCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (bgmCtx.state === 'suspended') bgmCtx.resume();
  } catch(e) { bgmPlaying = false; }
}

function stopBGM() {
  bgmPlaying = false;
  if (bgmTimer) { clearTimeout(bgmTimer); bgmTimer = null; }
  bgmNodes.forEach(n => { try { n.stop(); } catch {} });
  bgmNodes = [];
  if (bgmCtx) { try { bgmCtx.close(); } catch {} bgmCtx = null; }
}

function _n(ctx, nodes, freq, t, dur, vol, left) {
  try {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.type = 'triangle';
    o.frequency.setValueAtTime(freq, t);
    const v = left ? vol * 0.5 : vol;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(v, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur * 0.85);
    o.start(t); o.stop(t + dur);
    nodes.push(o);
  } catch(e) {}
}

function startBGMNotes() {
  if (!bgmCtx || !bgmPlaying) return;
  try {
    const BPM = 180, beat = 60 / BPM, e = beat / 2, q = beat, h = beat * 2, s = beat / 4;
    // 右手音
    const E3=165, Fs4=370, G4=392, Ds4=311, C4=262, E4=330;
    const Fs5=740, G5=784, A5=880, B5=988, C6=1047, D6=1175, E6=1319, G6=1568, B6=1976;
    const Ds5=622;
    // 左手音（RHの1オクターブ下 + ループ用）
    const G3=196, Ds3=156, C3=131, Fs3=185, E3L=165, A3=220, B3=247, D4=294, E4L=330, A4=440, B4=494, Fs4L=370;

    const ctx = bgmCtx, nd = bgmNodes;
    const p = (f,t,d,v=0.13,l=false) => _n(ctx,nd,f,t,d,v,l);
    const grace = (f1,f2,t,dur,v=0.13) => { p(f1,t,s*0.4,v*0.7); p(f2,t+s*0.4,dur-s*0.4,v); };

    let t = ctx.currentTime;

    const loop = (st) => {
      let r = st, l = st;

      // ===== RHイントロ4小節 =====
      // G5(8) D#5(8) G5(4) F#5(8) D#5(8) F#5(4) F#5(8) C5(8) D#5(8) E5(8) F#5(8) 休(8) E4(4)
      p(G5,r,e,0.14); r+=e; p(Ds5,r,e,0.13); r+=e; p(G5,r,q,0.18); r+=q;
      p(Fs5,r,e,0.14); r+=e; p(Ds5,r,e,0.13); r+=e; p(Fs5,r,q,0.18); r+=q;
      p(Fs5,r,e,0.13); r+=e; p(C4*2,r,e,0.13); r+=e; p(Ds5,r,e,0.13); r+=e; p(E4*2,r,e,0.13); r+=e;
      p(Fs5,r,e*0.4,0.15); r+=e; r+=e; p(E4,r,q,0.13); r+=q;

      // ===== LHイントロ（RHの1オクターブ下）=====
      p(G4,l,e,0.09,true); l+=e; p(Ds4,l,e,0.08,true); l+=e; p(G4,l,q,0.10,true); l+=q;
      p(Fs4,l,e,0.09,true); l+=e; p(Ds4,l,e,0.08,true); l+=e; p(Fs4,l,q,0.10,true); l+=q;
      p(Fs4,l,e,0.08,true); l+=e; p(C4,l,e,0.08,true); l+=e; p(Ds4,l,e,0.08,true); l+=e; p(E4,l,e,0.08,true); l+=e;
      p(Fs4,l,e*0.4,0.09,true); l+=e; l+=e; p(E3,l,q,0.09,true); l+=q;

      // ===== RHループ =====
      // | grace(F#5→)G5(8) G5(8) >D6(4) |
      grace(Fs5,G5,r,e,0.13); r+=e; p(G5,r,e,0.13); r+=e; p(D6,r,q,0.19); r+=q;
      // | grace(A5→)B5(8) B5(8) >G6(4) |
      grace(A5,B5,r,e,0.13); r+=e; p(B5,r,e,0.13); r+=e; p(G6,r,q,0.19); r+=q;
      // | grace(B5→)D6(8) D6(8) >B6(4) |
      grace(B5,D6,r,e,0.13); r+=e; p(D6,r,e,0.13); r+=e; p(B6,r,q,0.19); r+=q;
      // | grace(A5→)B5(8) B5(8) >G6(4) |
      grace(A5,B5,r,e,0.13); r+=e; p(B5,r,e,0.13); r+=e; p(G6,r,q,0.19); r+=q;
      // | G5(8) B5(8) >D6(4) |
      p(G5,r,e,0.13); r+=e; p(B5,r,e,0.13); r+=e; p(D6,r,q,0.18); r+=q;
      // | A5(8) C6(8) >E6(4) |
      p(A5,r,e,0.13); r+=e; p(C6,r,e,0.13); r+=e; p(E6,r,q,0.18); r+=q;
      // | B5(8) D6(8) >G6(4) |
      p(B5,r,e,0.13); r+=e; p(D6,r,e,0.13); r+=e; p(G6,r,q,0.18); r+=q;
      // | G5(8) G5(8) >G5(4) |
      p(G5,r,e,0.13); r+=e; p(G5,r,e,0.13); r+=e; p(G5,r,q,0.18); r+=q;

      // ===== LHループ =====
      // | G3(8) D4(8) G4(4) | ×2
      p(G3,l,e,0.09,true); l+=e; p(D4,l,e,0.08,true); l+=e; p(G4,l,q,0.10,true); l+=q;
      p(G3,l,e,0.09,true); l+=e; p(D4,l,e,0.08,true); l+=e; p(G4,l,q,0.10,true); l+=q;
      // | B3(8) F#4(8) B4(4) |
      p(B3,l,e,0.09,true); l+=e; p(Fs4L,l,e,0.08,true); l+=e; p(B4,l,q,0.10,true); l+=q;
      // | A3(8) E4(8) A4(4) |
      p(A3,l,e,0.09,true); l+=e; p(E4L,l,e,0.08,true); l+=e; p(A4,l,q,0.10,true); l+=q;
      // | G3(8) D4(8) G4(4) |
      p(G3,l,e,0.09,true); l+=e; p(D4,l,e,0.08,true); l+=e; p(G4,l,q,0.10,true); l+=q;
      // | A3(8) E4(8) A4(4) |
      p(A3,l,e,0.09,true); l+=e; p(E4L,l,e,0.08,true); l+=e; p(A4,l,q,0.10,true); l+=q;
      // | B3(8) F#4(8) B4(4) |
      p(B3,l,e,0.09,true); l+=e; p(Fs4L,l,e,0.08,true); l+=e; p(B4,l,q,0.10,true); l+=q;
      // | G3(2) |
      p(G3,l,h,0.11,true); l+=h;

      return r;
    };

    for (let i = 0; i < 3; i++) t = loop(t);
    const more = () => {
      if (!bgmPlaying) return;
      if (t - ctx.currentTime < 15) t = loop(t);
      if (bgmPlaying) bgmTimer = setTimeout(more, 3000);
    };
    bgmTimer = setTimeout(more, 3000);
  } catch(e) {}
}
// ===== BGM END =====

function startBGMNotes() {
  if (!bgmCtx || !bgmPlaying) return;
  try {
    const BPM = 140, beat = 60 / BPM, e = beat / 2, q = beat, s = beat / 4;
    const E4=330, Ds5=622, E5=659, Fs5=740, G5=784, A5=880, B5=988;
    const C5=523, C6=1047, Ds6=1245, E6=1319, F6=1397, Fs6=1480, G6=1568, A6=1760;
    const G3=196, Ds3=156, C3=131, A3=220, D4=294;
    const ctx = bgmCtx, nd = bgmNodes;
    const p = (f,t,d,v=0.13,l=false) => _n(ctx,nd,f,t,d,v,l);

    let t = ctx.currentTime;

    const loop = (st) => {
      let r = st, l = st;
      // 右手イントロ
      p(G5,r,e,0.14); r+=e; p(Ds5,r,e,0.13); r+=e; p(G5,r,q,0.18); r+=q;
      p(Fs5,r,e,0.14); r+=e; p(Ds5,r,e,0.13); r+=e; p(Fs5,r,q,0.18); r+=q;
      p(Fs5,r,e,0.13); r+=e; p(C5,r,e,0.13); r+=e; p(Ds5,r,e,0.13); r+=e; p(E5,r,e,0.13); r+=e;
      p(Fs5,r,e*0.4,0.14); r+=e; r+=e; p(E4,r,q,0.13); r+=q;
      // 右手ループ
      p(Fs5,r,s*0.35,0.10); r+=s*0.35;
      p(G5,r,e-s*0.35,0.14); r+=e-s*0.35;
      p(A5,r,e,0.13); r+=e; p(B5,r,e,0.13); r+=e; p(C6,r,e,0.13); r+=e;
      p(Ds6,r,e,0.13); r+=e; p(E6,r,e,0.13); r+=e; p(Fs6,r,e,0.13); r+=e;
      p(E6,r,e,0.13); r+=e; p(F6,r,e,0.13); r+=e;
      p(G6,r,q,0.20); r+=q;
      p(Fs5,r,q,0.15); r+=q;
      r+=e; p(A6,r,e,0.13); r+=e; p(E5,r,q,0.15); r+=q;
      r+=e; p(A6,r,e,0.13); r+=e; p(Ds5,r,q,0.15); r+=q;
      r+=e; p(A6,r,e,0.13); r+=e;
      p(Ds5,r,e,0.13); r+=e; p(C5,r,e,0.13); r+=e; p(B5,r,e,0.13); r+=e;
      // 左手
      [[G3,D4],[G3,D4],[Ds3,A3],[Ds3,A3],[C3,G3],[C3,G3],[G3,D4],[G3,D4],
       [G3,D4],[G3,D4],[G3,D4],[G3,D4],[Ds3,A3],[Ds3,A3],[C3,G3],[C3,G3],
       [G3,D4],[G3,D4],[Ds3,A3],[Ds3,A3],[C3,G3],[C3,G3],[G3,D4],[G3,D4],
      ].forEach(([b,m]) => { p(b,l,e,0.09,true); l+=e; p(m,l,e,0.07,true); l+=e; });
      return r;
    };

    for (let i = 0; i < 3; i++) t = loop(t);
    const more = () => {
      if (!bgmPlaying) return;
      if (t - ctx.currentTime < 15) t = loop(t);
      if (bgmPlaying) bgmTimer = setTimeout(more, 3000);
    };
    bgmTimer = setTimeout(more, 3000);
  } catch(e) {}
}
// ===== BGM END =====

function playKyuririn() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;

    const baseFreq = 1046.50; // C6（ド）
    const totalNotes = 32;
    const totalDur = 1.5;
    const step = totalDur / totalNotes;

    for (let i = 0; i < totalNotes; i++) {
      const t = now + i * step;
      const ratio = Math.pow(16, i / (totalNotes - 1));
      const freq = baseFreq * ratio;
      const noteDur = step * 3.0;

      // 最後の6音はどんどん大きく際立たせる
      const isEnding = i >= totalNotes - 6;
      const endBoost = isEnding ? 1.0 + (i - (totalNotes - 6)) * 0.25 : 1.0;

      [1, 2, 3].forEach((harmonic) => {
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = "sine";
        o.frequency.setValueAtTime(freq * harmonic, t);
        g.gain.setValueAtTime(0.0, t);
        g.gain.linearRampToValueAtTime((0.15 / harmonic) * endBoost, t + 0.006);
        g.gain.exponentialRampToValueAtTime(0.001, t + noteDur * (isEnding ? 1.6 : 1.0));
        o.start(t); o.stop(t + noteDur * 1.8);
      });
    }
  } catch(e) {}
}

// パコン効果音
function playPakon() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o1 = ctx.createOscillator();
    const g1 = ctx.createGain();
    o1.connect(g1); g1.connect(ctx.destination);
    o1.type = "square";
    o1.frequency.setValueAtTime(180, ctx.currentTime);
    o1.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);
    g1.gain.setValueAtTime(0.5, ctx.currentTime);
    g1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    o1.start(ctx.currentTime);
    o1.stop(ctx.currentTime + 0.15);
    const bufferSize = ctx.sampleRate * 0.05;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    const noise = ctx.createBufferSource();
    const gn = ctx.createGain();
    noise.buffer = buffer;
    noise.connect(gn); gn.connect(ctx.destination);
    gn.gain.setValueAtTime(0.3, ctx.currentTime);
    gn.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    noise.start(ctx.currentTime);
  } catch(e) {}
}

export default function App() {
  const [phase, setPhase] = useState("start");
  const [lang, setLang] = useState("ja");
  const t = T[lang];
  const [cards, setCards] = useState(null);
  const [revealedCount, setRevealedCount] = useState(-1);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [expr, setExpr] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [bestTime, setBestTime] = useState(() => {
    try { const s = localStorage.getItem("clover_best"); return s ? Number(s) : null; } catch { return null; }
  });
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [isTutorial, setIsTutorial] = useState(false);
  const [tutStep, setTutStep] = useState(0);
  const [usedNums, setUsedNums] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [dealtCount, setDealtCount] = useState(0);
  const [allRevealed, setAllRevealed] = useState(false);
  const [exprTokens, setExprTokens] = useState([]);
  const timerRef = useRef(null);
  const dealingTimeoutsRef = useRef([]);

  const startGame = useCallback((tutorial = false) => {
    stopBGM();
    if (!tutorial) { try { playBGM(); } catch(err) {} }
    dealingTimeoutsRef.current.forEach(id => clearTimeout(id));
    dealingTimeoutsRef.current = [];
    setIsTutorial(tutorial); setTutStep(0); setPhase("dealing"); setCountdown(null);
    setExpr(""); setFeedback(null); setUsedNums([]); setExprTokens([]);
    setTime(0); setRunning(false); setRevealedCount(-1); setDealtCount(0); setAllRevealed(false);
    const drawn = tutorial ? TUTORIAL_CARDS : drawCards();
    setCards(drawn);
    [400, 800, 1200, 1600, 2000, 2400].forEach((d, i) => {
      const id = setTimeout(() => {
        setDealtCount(i + 1);
        if (i === 5) {
          const c3 = setTimeout(() => setCountdown(3), 400);
          const c2 = setTimeout(() => setCountdown(2), 1400);
          const c1 = setTimeout(() => setCountdown(1), 2400);
          const cGo = setTimeout(() => {
            setCountdown("GO!"); setAllRevealed(true);
            try { startBGMNotes(); } catch(err) {}
            const cStart = setTimeout(() => {
              setCountdown(null); setPhase("playing"); setRunning(true);
              if (tutorial) setTutStep(1);
            }, 800);
            dealingTimeoutsRef.current.push(cStart);
          }, 3400);
          [c3, c2, c1, cGo].forEach(id => dealingTimeoutsRef.current.push(id));
        }
      }, d);
      dealingTimeoutsRef.current.push(id);
    });
  }, []);

  useEffect(() => {
    if (running) timerRef.current = setInterval(() => setTime(t => t + 10), 10);
    else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [running]);

  const goBackToPlaying = () => { setPhase("playing"); setRunning(true); if (isTutorial) setTutStep(4); };
  const solutionExpr = useMemo(() => cards ? (findSolution(cards.nums, cards.target) ?? "…") : "…", [cards]);
  const fospa = () => { setRunning(false); setPhase("fospa"); if (isTutorial) setTutStep(5); };

  const checkAnswer = () => {
    if (!cards) return;
    const r = validateExpression(expr, cards.nums, cards.target, t);
    setFeedback(r);
    if (r.ok) {
      if (!isTutorial && (bestTime === null || time < bestTime)) {
        setBestTime(time); setIsNewRecord(true);
        try { localStorage.setItem("clover_best", String(time)); } catch {}
      } else { setIsNewRecord(false); }
      setTimeout(() => setPhase("result"), 900);
    }
  };

  const advanceTutorial = () => setTutStep(s => s + 1);
  const fmt = ms => `${Math.floor(ms / 1000)}.${String(Math.floor((ms % 1000) / 10)).padStart(2, "0")}`;
  const tokensToDisplay = (tokens) => tokens.map(t => t.val).join("").replace(/\*/g, "×").replace(/\//g, "÷");
  const tokensToExpr = (tokens) => tokens.map(t => t.val).join("");
  const tokensToUsedIdxs = (tokens) => tokens.filter(t => t.type === "num").map(t => t.idx);
  const clearExpr = () => { setExpr(""); setUsedNums([]); setExprTokens([]); };
  const backspaceExpr = () => {
    if (!cards) return;
    const newTokens = exprTokens.slice(0, -1);
    setExprTokens(newTokens); setExpr(tokensToExpr(newTokens)); setUsedNums(tokensToUsedIdxs(newTokens));
  };
  const appNum = (idx, val) => {
    if (!cards) return;
    const token = { type: "num", idx, val: String(val) };
    const newTokens = [...exprTokens, token];
    setExprTokens(newTokens); setExpr(tokensToExpr(newTokens)); setUsedNums(tokensToUsedIdxs(newTokens));
  };
  const appOp = (val) => {
    if (!cards) return;
    const token = { type: "op", val };
    const newTokens = [...exprTokens, token];
    setExprTokens(newTokens); setExpr(tokensToExpr(newTokens));
  };

  // 立体ボタン共通ハンドラ
  const btnDown = (e, shadowPressed) => {
    e.currentTarget.style.transform = "translateY(5px)";
    e.currentTarget.style.boxShadow = shadowPressed;
  };
  const btnUp = (e, shadowNormal, cb) => {
    try {
      if (e.currentTarget) {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = shadowNormal;
      }
    } catch {}
    playPakon();
    if (navigator.vibrate) navigator.vibrate(30);
    if (cb) cb();
  };
  const btnLeave = (e, shadowNormal) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = shadowNormal;
  };

  const PBtn = ({ label, onClick, color = "#16a34a", textColor = "#fbbf24" }) => {
    const sNormal = `0 8px 0 ${color}99, 0 10px 20px ${color}44`;
    const sPressed = `0 2px 0 ${color}99`;
    return (
      <button
        onPointerDown={e => btnDown(e, sPressed)}
        onPointerUp={e => btnUp(e, sNormal, onClick)}
        onPointerLeave={e => btnLeave(e, sNormal)}
        style={{
          background: `linear-gradient(145deg,${color}ee,${color})`, border: "none", borderRadius: "25px",
          color: textColor, fontWeight: "bold", fontSize: "36px", padding: "40px 0",
          cursor: "pointer", width: "100%", letterSpacing: "2px",
          boxShadow: sNormal, transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s",
        }}>{label}</button>
    );
  };

  const GBtn = ({ label, onClick }) => {
    const sNormal = "0 8px 0 #0a1a0f, 0 10px 20px rgba(0,0,0,0.3)";
    const sPressed = "0 2px 0 #0a1a0f";
    return (
      <button
        onPointerDown={e => btnDown(e, sPressed)}
        onPointerUp={e => btnUp(e, sNormal, onClick)}
        onPointerLeave={e => btnLeave(e, sNormal)}
        style={{
          background: "#111f14", border: "1px solid #4ade8033", borderRadius: "22px",
          color: "#86efac", fontWeight: "bold", fontSize: "32px", padding: "28px 0",
          cursor: "pointer", width: "100%",
          boxShadow: sNormal, transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s",
        }}>{label}</button>
    );
  };

  return (
    <div style={{
      minHeight: "100svh", background: "#0a1a0f", display: "flex", flexDirection: "column", alignItems: "center",
      padding: "80px 22px 80px", color: "white", fontFamily: "Georgia,serif", boxSizing: "border-box",
    }}>
      {phase === "start" && (
        <div style={{ width: "100%", maxWidth: "756px", textAlign: "center" }}>
          <div style={{ textAlign: "center", marginBottom: "29px" }}>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "12px", paddingRight: "8px" }}>
              <button
                onPointerDown={e=>btnDown(e,"0 3px 0 #333")}
                onPointerUp={e=>btnUp(e,"0 10px 0 #333",()=>setLang(l=>l==="ja"?"en":"ja"))}
                onPointerLeave={e=>btnLeave(e,"0 10px 0 #333")}
                style={{ background: "linear-gradient(145deg,#444,#222)", border: "3px solid #888", borderRadius: "30px", color: "white", fontWeight: "bold", fontSize: "38px", padding: "10px 20px", cursor: "pointer", boxShadow: "0 10px 0 #111", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s", letterSpacing: "2px" }}>
                {lang === "ja" ? "🇺🇸 English" : "🇯🇵 日本語"}
              </button>
            </div>
            <div style={{ fontSize: "94px", fontWeight: "900", letterSpacing: "5px", color: "#4ade80", lineHeight: 1 }}>{t.title}</div>
            <div style={{ fontSize: "20px", letterSpacing: "3px", color: "#4ade8044", marginTop: "7px" }}>{t.subtitle}</div>
            {bestTime !== null && (
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "11px", justifyContent: "center" }}>
                <div style={{ fontSize: "25px", color: "#fbbf24" }}>{t.best}: {fmt(bestTime)}{t.sec}</div>
                <button
                  onPointerDown={e=>btnDown(e,"0 2px 0 #7f1d1d")}
                  onPointerUp={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 6px 0 #7f1d1d"; playKyuririn(); setBestTime(null); try { localStorage.removeItem("clover_best"); } catch {} }}
                  onPointerLeave={e=>btnLeave(e,"0 6px 0 #7f1d1d")}
                  style={{ background: "linear-gradient(145deg,#ef4444,#dc2626)", border: "none", borderRadius: "12px", color: "white", fontWeight: "bold", fontSize: "18px", padding: "8px 18px", cursor: "pointer", boxShadow: "0 6px 0 #7f1d1d", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>{t.reset}</button>
              </div>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "43px" }}><CloverCard number="？" size="large" /></div>
          <div style={{ background: "#111f14", border: "1px solid #4ade8020", borderRadius: "32px", padding: "36px 36px", marginBottom: "43px" }}>
            <div style={{ fontSize: "28px", lineHeight: "2.2", color: "#86efac" }}>{t.desc}</div>
            <div style={{ fontSize: "27px", color: "#5cb85c", marginTop: "25px", fontStyle: "italic" }}>{t.toBeHappy}</div>
          </div>
          <div style={{ fontSize: "25px", color: "#aaa", marginBottom: "22px" }}>{t.hint1}</div>
          <div style={{ marginBottom: "25px" }}>
            <button
              onPointerDown={e=>btnDown(e,"0 3px 0 #c0145a")}
              onPointerUp={e=>btnUp(e,"0 10px 0 #c0145a, 0 12px 24px rgba(255,105,180,0.4)",()=>startGame(true))}
              onPointerLeave={e=>btnLeave(e,"0 10px 0 #c0145a, 0 12px 24px rgba(255,105,180,0.4)")}
              style={{ background: "linear-gradient(145deg,#ff79c4,#ff1493)", border: "none", borderRadius: "25px", color: "white", fontWeight: "bold", fontSize: "36px", padding: "32px 0", cursor: "pointer", width: "100%", letterSpacing: "2px", boxShadow: "0 10px 0 #c0145a, 0 12px 24px rgba(255,105,180,0.4)", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>{t.howToPlay}</button>
          </div>
          <PBtn label={t.start} onClick={() => startGame(false)} />
          <div style={{ fontSize: "23px", color: "#86efac", marginTop: "29px", lineHeight: "2.0", textAlign: "left" }}>{t.tutHint1}<br/>{t.tutHint2}</div>
          <div style={{ marginTop: "36px", fontSize: "38px", fontWeight: "bold", color: "white", letterSpacing: "1px" }}>{t.by}</div>
          <a href="http://nextchallenge.jp" target="_blank" style={{ color: "#4ade80", fontSize: "24px", textDecoration: "none", letterSpacing: "1px" }}>nextchallenge.jp</a>
        </div>
      )}

      {(phase === "dealing" || phase === "playing") && cards && (
        <div style={{ width: "100%", maxWidth: "900px", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <button
              onPointerDown={e=>btnDown(e,"0 2px 0 #166534")}
              onPointerUp={e=>btnUp(e,"0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)", () => {
                if (isTutorial) {
                  if (tutStep <= 1) { dealingTimeoutsRef.current.forEach(id => clearTimeout(id)); dealingTimeoutsRef.current = []; stopBGM(); setPhase("start"); setIsTutorial(false); setRunning(false); }
                  else setTutStep(s => s - 1);
                } else { dealingTimeoutsRef.current.forEach(id => clearTimeout(id)); dealingTimeoutsRef.current = []; stopBGM(); setPhase("start"); setRunning(false); clearExpr(); }
              })}
              onPointerLeave={e=>btnLeave(e,"0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)")}
              style={{ background: "linear-gradient(145deg,#1e4a2a,#1a3a22)", border: "2px solid #4ade80", borderRadius: "14px", color: "#4ade80", fontWeight: "900", padding: "14px 24px", cursor: "pointer", fontSize: "22px", flexShrink: 0, boxShadow: "0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>{t.back}</button>
            {isTutorial
              ? <div style={{ flex: 1, background: "#ff69b4", color: "white", borderRadius: "14px", padding: "20px 24px", fontSize: "32px", fontWeight: "bold", boxShadow: "0 3px 12px rgba(255,105,180,0.5)" }}>{t.tutBanner}</div>
              : <div style={{ flex: 1, textAlign: "left", fontSize: "18px", color: "#4ade8066" }}>{t.backToTitle}</div>}
            {phase === "playing" && allRevealed && (
              <button
                onPointerDown={e=>btnDown(e,"0 2px 0 #166534")}
                onPointerUp={e=>btnUp(e,"0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)", () => { setRunning(false); setPhase("surrender"); })}
                onPointerLeave={e=>btnLeave(e,"0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)")}
                style={{ background: "linear-gradient(145deg,#1e4a2a,#1a3a22)", border: "2px solid #4ade80", borderRadius: "14px", color: "#4ade80", fontWeight: "900", padding: "14px 24px", cursor: "pointer", fontSize: "22px", flexShrink: 0, boxShadow: "0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>{t.surrender}</button>
            )}
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ fontSize: "120px", fontWeight: "900", fontFamily: "monospace", color: running ? "#4ade80" : "#1e3a22", marginBottom: "18px", letterSpacing: "2px" }}>{fmt(time)}</div>
            {isTutorial && tutStep === 1 && (
              <div>
                <div style={{ background: "#ff69b4", color: "white", borderRadius: "14px", padding: "28px 16px", fontSize: "50px", fontWeight: "bold", lineHeight: "1.6", margin: "16px 0", boxShadow: "0 4px 20px rgba(255,105,180,0.5)", border: "2px solid #ff1493", animation: "pulse-pink 2s infinite" }}>{t.tut1}</div>
                <button onPointerDown={e=>btnDown(e,"0 2px 0 #c0145a")} onPointerUp={e=>btnUp(e,"0 8px 0 #c0145a",advanceTutorial)} onPointerLeave={e=>btnLeave(e,"0 8px 0 #c0145a")} style={{ background: "#ff69b4", border: "none", borderRadius: "18px", color: "white", fontWeight: "bold", padding: "24px 50px", cursor: "pointer", fontSize: "60px", marginBottom: "24px", boxShadow: "0 8px 0 #c0145a", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>{t.next}</button>
              </div>
            )}
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ fontSize: "30px", letterSpacing: "4px", color: "#ef4444cc", marginBottom: "10px", fontWeight: "bold" }}>{t.target}</div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
              {dealtCount >= 1 ? (allRevealed ? <CloverCard number={cards.target} isTarget size="normal" /> : <CardBack size="normal" />) : null}
            </div>
            {isTutorial && tutStep === 2 && (
              <div>
                <div style={{ background: "#ff69b4", color: "white", borderRadius: "14px", padding: "28px 16px", fontSize: "50px", fontWeight: "bold", lineHeight: "1.6", margin: "16px 0", boxShadow: "0 4px 20px rgba(255,105,180,0.5)", border: "2px solid #ff1493", animation: "pulse-pink 2s infinite" }}>{t.tut2}</div>
                <button onPointerDown={e=>btnDown(e,"0 2px 0 #c0145a")} onPointerUp={e=>btnUp(e,"0 8px 0 #c0145a",advanceTutorial)} onPointerLeave={e=>btnLeave(e,"0 8px 0 #c0145a")} style={{ background: "#ff69b4", border: "none", borderRadius: "18px", color: "white", fontWeight: "bold", padding: "24px 50px", cursor: "pointer", fontSize: "60px", marginBottom: "24px", boxShadow: "0 8px 0 #c0145a", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>{t.next}</button>
              </div>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px", margin: "10px 0", opacity: 0.2 }}>
            <div style={{ flex: 1, height: "2px", background: "#4ade80" }}/><span style={{ fontSize: "20px" }}>🍀</span><div style={{ flex: 1, height: "2px", background: "#4ade80" }}/>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "4px" }}>
              {["①","②","③","④","⑤"].map((n, i) => <div key={i} style={{ width: 139, textAlign: "center", fontSize: "36px", fontWeight: "900", color: "#aaa" }}>{n}</div>)}
            </div>
            <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "20px" }}>
              {cards.nums.map((n, i) => (
                dealtCount >= i + 2
                  ? (allRevealed ? <CloverCard key={i} number={n} size="small" /> : <CardBack key={i} size="small" />)
                  : <div key={i} style={{ width: 139, height: 220 }} />
              ))}
            </div>
            {isTutorial && tutStep === 3 && (
              <div>
                <div style={{ background: "#ff69b4", color: "white", borderRadius: "14px", padding: "28px 16px", fontSize: "50px", fontWeight: "bold", lineHeight: "1.6", margin: "16px 0", boxShadow: "0 4px 20px rgba(255,105,180,0.5)", border: "2px solid #ff1493", animation: "pulse-pink 2s infinite" }}>{t.tut3}</div>
                <div style={{ background: "#e8336d", color: "white", borderRadius: "14px", padding: "20px 16px", fontSize: "50px", fontWeight: "bold", lineHeight: "1.6", margin: "12px 0", boxShadow: "0 4px 20px rgba(232,51,109,0.5)", border: "2px solid #c0145a" }}>{t.tut3b}</div>
                <div style={{ fontSize: "36px", color: "white", marginBottom: "16px", textAlign: "left", textDecoration: "underline", textDecorationStyle: "wavy", textDecorationColor: "#ef4444" }}>{t.tut3c}</div>
                <button onPointerDown={e=>btnDown(e,"0 2px 0 #c0145a")} onPointerUp={e=>btnUp(e,"0 8px 0 #c0145a",advanceTutorial)} onPointerLeave={e=>btnLeave(e,"0 8px 0 #c0145a")} style={{ background: "#ff69b4", border: "none", borderRadius: "18px", color: "white", fontWeight: "bold", padding: "24px 50px", cursor: "pointer", fontSize: "60px", marginBottom: "24px", boxShadow: "0 8px 0 #c0145a", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>{t.next}</button>
              </div>
            )}
          </div>

          {/* フォスパボタン - 立体版 */}
          {phase === "playing" && allRevealed && (isTutorial ? tutStep >= 4 : true) && (
            <div style={{ position: "relative" }}>
              {isTutorial && tutStep === 4 && (
                <div>
                  <div style={{ background: "#ff69b4", color: "white", borderRadius: "14px", padding: "28px 16px", fontSize: "50px", fontWeight: "bold", lineHeight: "1.6", margin: "16px 0", boxShadow: "0 4px 20px rgba(255,105,180,0.5)", border: "2px solid #ff1493", animation: "pulse-pink 2s infinite" }}>{t.tut4}</div>
                  <div style={{ fontSize: "34px", color: "white", marginBottom: "16px", textAlign: "left", textDecoration: "underline", textDecorationStyle: "wavy", textDecorationColor: "#ef4444", whiteSpace: "nowrap" }}>{t.tut4b}</div>
                </div>
              )}
              <button
                onPointerUp={() => { playPakon(); if (navigator.vibrate) navigator.vibrate(30); fospa(); }}
                onPointerDown={e => {
                  e.currentTarget.style.transform = "translateY(6px)";
                  e.currentTarget.style.boxShadow = "0 2px 0 #166534, 0 4px 10px rgba(74,222,128,0.3)";
                }}
                onPointerLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.4)";
                }}
                style={{
                  background: "linear-gradient(145deg,#22c55e,#16a34a)",
                  border: "none", borderRadius: "22px", color: "white",
                  fontWeight: "bold", fontSize: "40px", padding: "28px 0",
                  cursor: "pointer", width: "100%", letterSpacing: "2px",
                  boxShadow: "0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.4)",
                  touchAction: "manipulation", WebkitTapHighlightColor: "transparent",
                  transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s",
                }}
              >{t.fospa}</button>
            </div>
          )}

          {phase === "dealing" && (
            <div style={{ position: "relative", minHeight: "120px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {countdown !== null
                ? <div style={{ fontSize: countdown === "GO!" ? "120px" : "160px", fontWeight: "900", color: countdown === "GO!" ? "#4ade80" : "#fbbf24", fontFamily: "monospace", animation: "countdown-pop 0.3s ease-out", textShadow: countdown === "GO!" ? "0 0 40px #4ade80" : "0 0 40px #fbbf24" }}>{countdown}</div>
                : <div style={{ color: "#4ade8033", fontSize: "28px", letterSpacing: "2px" }}>{t.dealing}</div>}
            </div>
          )}
        </div>
      )}

      {phase === "fospa" && cards && (
        <div style={{ width: "100%", maxWidth: "900px", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <button onPointerDown={e=>btnDown(e,"0 2px 0 #166534")} onPointerUp={e=>btnUp(e,"0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)",goBackToPlaying)} onPointerLeave={e=>btnLeave(e,"0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)")} style={{ background: "linear-gradient(145deg,#1e4a2a,#1a3a22)", border: "2px solid #4ade80", borderRadius: "14px", color: "#4ade80", fontWeight: "900", padding: "14px 24px", cursor: "pointer", fontSize: "28px", flexShrink: 0, boxShadow: "0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>{t.back}</button>
            {isTutorial
              ? <div style={{ flex: 1, background: "#ff69b4", color: "white", borderRadius: "14px", padding: "14px 20px", fontSize: "28px", fontWeight: "bold" }}>{t.tutBanner2}</div>
              : <div style={{ flex: 1, textAlign: "left", fontSize: "22px", color: "#4ade8066" }}>{t.backOk}</div>}
          </div>
          <div style={{ fontSize: "36px", color: "#4ade80", letterSpacing: "2px", marginBottom: "16px" }}>{t.fospaTime} {fmt(time)}{t.sec}</div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <CloverCard number={cards.target} isTarget size="normal" />
            <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
              {cards.nums.map((n, i) => (
                <div key={i} style={{ opacity: usedNums.includes(i) ? 0.25 : 1, transition: "opacity 0.2s" }}>
                  <CloverCard number={n} size="small" />
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "14px" }}>
            {cards.nums.map((n, i) => {
              const bg = ["#3b82f6", "#ec4899", "#f97316", "#8b5cf6", "#10b981"][i];
              const sN = `0 7px 0 ${bg}99, 0 9px 18px ${bg}44`;
              const sP = `0 2px 0 ${bg}99`;
              return (
                <button key={i}
                  onPointerDown={e=>btnDown(e,sP)}
                  onPointerUp={e=>btnUp(e,sN,()=>appNum(i,n))}
                  onPointerLeave={e=>btnLeave(e,sN)}
                  style={{
                    background: `linear-gradient(145deg,${bg}ee,${bg})`,
                    border: "none", borderRadius: "14px", color: "white", fontWeight: "900",
                    width: "120px", height: "120px", fontSize: "52px",
                    cursor: isTutorial && tutStep === 5 ? "default" : "pointer",
                    opacity: usedNums.includes(i) ? 0.25 : 1, transition: "opacity 0.2s",
                    boxShadow: sN, transform: "translateY(0)",
                    pointerEvents: isTutorial && tutStep === 5 ? "none" : "auto",
                  }}>{n}</button>
              );
            })}
          </div>
          {isTutorial && tutStep === 5 && (
            <AnimatedExprDemo nums={cards.nums} onUsedIdxsChange={(idxs) => setUsedNums(idxs)}
              onDone={(finalExpr) => {
                setExpr(finalExpr);
                const nums = cards.nums;
                const tokens = [
                  { type:"num", idx:0, val:String(nums[0]) }, { type:"op", val:"*" }, { type:"op", val:"(" },
                  { type:"num", idx:3, val:String(nums[3]) }, { type:"op", val:"+" },
                  { type:"num", idx:2, val:String(nums[2]) }, { type:"op", val:")" }, { type:"op", val:"+" },
                  { type:"num", idx:1, val:String(nums[1]) }, { type:"op", val:"-" },
                  { type:"num", idx:4, val:String(nums[4]) },
                ];
                setExprTokens(tokens); setUsedNums([0,3,2,1,4]); setTutStep(6);
              }}
            />
          )}
          {isTutorial && tutStep === 6 && (
            <div style={{ position: "relative", zIndex: 100, background: "#ff69b4", color: "white", borderRadius: "14px", padding: "18px 22px", fontSize: "38px", fontWeight: "bold", lineHeight: "1.6", margin: "12px 0", boxShadow: "0 4px 20px rgba(255,105,180,0.5)", border: "2px solid #ff1493", animation: "pulse-pink 2s infinite" }}>
              式が入力されたよ！<br/><span style={{ fontSize: "32px" }}>👇の「答え合わせ」ボタンを押してね。</span>
            </div>
          )}
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "16px" }}>
            {[["＋", "+"], [" － ", "-"], ["×", "*"], ["÷", "/"], ["（", "("], ["）", ")"]].map(([l, v]) => {
              const sN = "0 7px 0 #0a1a0f, 0 9px 18px rgba(0,0,0,0.3)";
              const sP = "0 2px 0 #0a1a0f";
              return (
                <button key={l}
                  onPointerDown={e=>btnDown(e,sP)}
                  onPointerUp={e=>btnUp(e,sN,()=>appOp(v))}
                  onPointerLeave={e=>btnLeave(e,sN)}
                  style={{
                    background: "#1a2f1e", border: "2px solid #4ade8033", borderRadius: "14px", color: "#4ade80",
                    fontWeight: "900", width: "120px", height: "120px", fontSize: "52px",
                    cursor: isTutorial && tutStep === 5 ? "default" : "pointer",
                    boxShadow: sN, transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s",
                    pointerEvents: isTutorial && tutStep === 5 ? "none" : "auto",
                  }}>{l}</button>
              );
            })}
          </div>
          {(!isTutorial || tutStep !== 5) && (
            <div style={{ background: "#111f14", border: "2px solid #4ade8033", borderRadius: "16px", padding: "20px 20px", fontSize: exprTokens.length > 12 ? "48px" : exprTokens.length > 8 ? "58px" : "68px", fontFamily: "monospace", fontWeight: "bold", color: "white", textAlign: "center", marginBottom: "12px", minHeight: "80px", wordBreak: "break-all", letterSpacing: "1px", transition: "font-size 0.2s" }}>
              {exprTokens.length > 0 ? tokensToDisplay(exprTokens) : <span style={{ color: "#2a4a2a", fontSize: "28px" }}>{t.exprPlaceholder}</span>}
            </div>
          )}
          {(!isTutorial || tutStep !== 5) && (
            <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
              <button onPointerDown={e=>btnDown(e,"0 2px 0 #0a1a0f")} onPointerUp={e=>btnUp(e,"0 7px 0 #0a1a0f",backspaceExpr)} onPointerLeave={e=>btnLeave(e,"0 7px 0 #0a1a0f")} style={{ background: "#1a2f1e", border: "1px solid #4ade8033", borderRadius: "14px", color: "#86efac", fontWeight: "bold", width: "90px", height: "80px", fontSize: "36px", cursor: "pointer", flexShrink: 0, boxShadow: "0 7px 0 #0a1a0f", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>⌫</button>
              <button onPointerDown={e=>btnDown(e,"0 2px 0 #0a1a0f")} onPointerUp={e=>btnUp(e,"0 7px 0 #0a1a0f",clearExpr)} onPointerLeave={e=>btnLeave(e,"0 7px 0 #0a1a0f")} style={{ background: "#1a2f1e", border: "1px solid #4ade8033", borderRadius: "14px", color: "#86efac", fontWeight: "bold", flex: 1, height: "80px", fontSize: "32px", cursor: "pointer", boxShadow: "0 7px 0 #0a1a0f", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>{lang === "ja" ? "全消し" : "All Clear"}</button>
            </div>
          )}
          {feedback && (
            <div style={{ padding: "20px", borderRadius: "14px", marginBottom: "16px", fontSize: "32px", background: feedback.ok ? "#4ade8018" : "#ef444418", border: `1px solid ${feedback.ok ? "#4ade80" : "#ef4444"}`, color: feedback.ok ? "#4ade80" : "#fca5a5" }}>{feedback.msg}</div>
          )}
          {isTutorial && tutStep === 6 && (
            <div style={{ position: "relative", zIndex: 100, background: "#ff69b4", color: "white", borderRadius: "14px", padding: "18px 22px", fontSize: "38px", fontWeight: "bold", lineHeight: "1.6", margin: "12px 0", boxShadow: "0 4px 20px rgba(255,105,180,0.5)", border: "2px solid #ff1493", animation: "pulse-pink 2s infinite" }}>
              {t.tut6}
            </div>
          )}
          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{ flex: 2 }}>
              <button
                onPointerDown={e=>btnDown(e,"0 2px 0 #166534")}
                onPointerUp={e=>btnUp(e,"0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)",checkAnswer)}
                onPointerLeave={e=>btnLeave(e,"0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)")}
                style={{ background: "linear-gradient(145deg,#22c55e,#16a34a)", border: "none", borderRadius: "22px", color: "white", fontWeight: "bold", fontSize: "40px", padding: "28px 0", cursor: "pointer", width: "100%", letterSpacing: "2px", boxShadow: isTutorial && tutStep === 6 ? "0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3), 0 0 0 3px #ff69b4" : "0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>{t.check}</button>
            </div>
            <div style={{ flex: 1 }}><GBtn label={t.retry} onClick={() => startGame(false)} /></div>
          </div>
        </div>
      )}

      {/* ABOUT */}
      {phase === "about" && (
        <div style={{ width: "100%", maxWidth: "756px" }}>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <div style={{ fontSize: "52px", fontWeight: "900", color: "#4ade80" }}>{t.aboutTitle}</div>
          </div>
          <div style={{ background: "#111f14", border: "1px solid #4ade8033", borderRadius: "24px", padding: "32px", marginBottom: "20px" }}>
            <div style={{ fontSize: "30px", fontWeight: "bold", color: "#4ade80", marginBottom: "16px" }}>{t.about1title}</div>
            <div style={{ fontSize: "26px", color: "#86efac", lineHeight: "1.9" }}>{t.about1}</div>
          </div>
          <div style={{ background: "#111f14", border: "1px solid #4ade8033", borderRadius: "24px", padding: "32px", marginBottom: "20px" }}>
            <div style={{ fontSize: "30px", fontWeight: "bold", color: "#4ade80", marginBottom: "16px" }}>{t.about2title}</div>
            <div style={{ fontSize: "26px", color: "#86efac", lineHeight: "1.9" }}>{t.about2}</div>
          </div>
          <div style={{ background: "#111f14", border: "1px solid #4ade8033", borderRadius: "24px", padding: "32px", marginBottom: "20px" }}>
            <div style={{ fontSize: "30px", fontWeight: "bold", color: "#4ade80", marginBottom: "16px" }}>{t.about3title}</div>
            <div style={{ fontSize: "26px", color: "#86efac", lineHeight: "1.9" }}>{t.about3}</div>
          </div>
          <div style={{ background: "#111f14", border: "1px solid #4ade8033", borderRadius: "24px", padding: "32px", marginBottom: "32px" }}>
            <div style={{ fontSize: "30px", fontWeight: "bold", color: "#4ade80", marginBottom: "16px" }}>{t.about4title}</div>
            <div style={{ fontSize: "26px", color: "#86efac", lineHeight: "1.9" }}>{t.about4}</div>
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <div style={{ flex: 1 }}><PBtn label={t.nextGame} onClick={() => startGame(false)} /></div>
            <div style={{ flex: 1 }}><GBtn label={t.toTitle} onClick={() => { stopBGM(); setPhase("start"); }} /></div>
          </div>
        </div>
      )}

      {/* SURRENDER */}
      {phase === "surrender" && (
        <div style={{ textAlign: "center", width: "100%", maxWidth: "720px" }}>
          <div style={{ fontSize: "80px", marginBottom: "16px" }}>🍀</div>
          <div style={{ fontSize: "40px", fontWeight: "900", color: "#4ade80", marginBottom: "8px" }}>
            {cards ? t.surrenderTitle : "Loading..."}
          </div>
          <div style={{ fontSize: "24px", color: "#86efac", marginBottom: "24px" }}>{t.surrenderSub}</div>

          {cards && (
            <>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "16px", letterSpacing: "3px", color: "#ef4444cc", marginBottom: "8px", fontWeight: "bold" }}>{t.target}</div>
                  <CloverCard number={cards.target} isTarget size="normal" />
                </div>
                <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "nowrap" }}>
                  {cards.nums.map((n, i) => <CloverCard key={i} number={n} size="xsmall" />)}
                </div>
              </div>
              <div style={{ background: "#111f14", border: "2px solid #4ade8055", borderRadius: "20px", padding: "24px", marginBottom: "32px" }}>
                <div style={{ fontSize: "16px", color: "#4ade8088", marginBottom: "12px", letterSpacing: "2px" }}>例えば…</div>
                <div style={{ fontSize: "36px", fontWeight: "900", color: "white", fontFamily: "monospace", letterSpacing: "2px", wordBreak: "break-all" }}>
                  {solutionExpr} = {cards.target}
                </div>
              </div>
            </>
          )}

          <button
            onPointerDown={e=>{ e.currentTarget.style.transform="translateY(4px)"; e.currentTarget.style.boxShadow="0 4px 0 #166534"; }}
            onPointerUp={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 10px 0 #166534"; clearExpr(); startGame(false); }}
            onPointerLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 10px 0 #166534"; }}
            style={{ background: "linear-gradient(145deg,#22c55e,#16a34a)", border: "none", borderRadius: "25px", color: "white", fontWeight: "bold", fontSize: "34px", padding: "28px 0", cursor: "pointer", width: "100%", letterSpacing: "2px", boxShadow: "0 10px 0 #166534", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>{t.surrenderNext}</button>
        </div>
      )}

      {/* RESULT */}
      {phase === "result" && (
        <div style={{ textAlign: "center", width: "100%", maxWidth: "720px", position: "relative" }}>
          {!isTutorial && isNewRecord && (
            <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
              {[...Array(40)].map((_, i) => (
                <div key={i} style={{ position: "absolute", left: `${(i * 7.3) % 100}%`, top: `-${10 + (i * 13) % 20}px`, fontSize: `${16 + (i * 7) % 24}px`, animation: `confetti-fall ${2 + (i * 0.17) % 3}s linear ${(i * 0.23) % 2}s infinite`, opacity: 0.9 }}>
                  {["🎉","🍀","✨","🌟","💚","🎊","⭐"][i % 7]}
                </div>
              ))}
            </div>
          )}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: "104px", marginBottom: "12px" }}>🍀</div>
            <div style={{ fontSize: "80px", fontWeight: "900", color: "#4ade80", marginBottom: "8px" }}>{isTutorial ? t.tutComplete : t.correct2}</div>
            <div style={{ fontSize: "104px", fontFamily: "monospace", fontWeight: "900", color: "#4ade80", marginBottom: "8px" }}>{fmt(time)}{t.sec}</div>
            {isTutorial ? (
              <div style={{ marginBottom: "32px" }}>
                <div style={{ fontSize: "26px", color: "#86efac", lineHeight: "1.8", marginBottom: "24px" }}>{t.tutResult1}</div>
                <div style={{ background: "#ff69b422", border: "2px solid #ff69b4", borderRadius: "24px", padding: "24px", marginBottom: "24px", color: "#ff69b4", fontSize: "28px", fontWeight: "bold" }}>{t.tutResult2}</div>
                <div style={{ marginBottom: "20px" }}>
                  <PBtn label={t.nextGame} onClick={() => startGame(false)} />
                </div>
                <button onPointerDown={e=>btnDown(e,"0 2px 0 #166534")} onPointerUp={e=>btnUp(e,"0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)",()=>setPhase("about"))} onPointerLeave={e=>btnLeave(e,"0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)")} style={{ background: "linear-gradient(145deg,#1e4a2a,#1a3a22)", border: "2px solid #4ade80", borderRadius: "22px", color: "#4ade80", fontWeight: "bold", fontSize: "28px", padding: "24px 0", cursor: "pointer", width: "100%", boxShadow: "0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>{t.about}</button>
              </div>
            ) : (
              <>
                {isNewRecord && <div style={{ color: "#fbbf24", fontSize: "40px", fontWeight: "900", marginBottom: "12px", animation: "blink-gold 1.8s infinite" }}>{t.newRecord}</div>}
                {bestTime !== null && (
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", marginBottom: "12px" }}>
                    <div style={{ color: "#fbbf24", fontSize: "30px" }}>{t.currentBest}{fmt(bestTime)}{t.sec}</div>
                    <button
                      onPointerDown={e=>btnDown(e,"0 2px 0 #7f1d1d")}
                      onPointerUp={e=>{ try { if(e.currentTarget){ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 6px 0 #7f1d1d"; } } catch {} playKyuririn(); setBestTime(null); try { localStorage.removeItem("clover_best"); } catch {} }}
                      onPointerLeave={e=>btnLeave(e,"0 6px 0 #7f1d1d")}
                      style={{ background: "linear-gradient(145deg,#ef4444,#dc2626)", border: "none", borderRadius: "12px", color: "white", fontWeight: "bold", fontSize: "18px", padding: "8px 18px", cursor: "pointer", boxShadow: "0 6px 0 #7f1d1d", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s", flexShrink: 0 }}>{t.reset}</button>
                  </div>
                )}
                <div style={{ color: "#555", fontSize: "24px", marginBottom: "8px" }}>{feedback?.msg}</div>
                <div style={{ fontSize: "28px", color: "#5cb85c", fontStyle: "italic", marginBottom: "32px" }}>{t.toBeHappy}</div>
                <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
                  <div style={{ flex: 1 }}><PBtn label={t.nextGame2} onClick={() => startGame(false)} /></div>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <button onPointerDown={e=>btnDown(e,"0 2px 0 #166534")} onPointerUp={e=>btnUp(e,"0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)",()=>setPhase("about"))} onPointerLeave={e=>btnLeave(e,"0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)")} style={{ background: "linear-gradient(145deg,#1e4a2a,#1a3a22)", border: "2px solid #4ade80", borderRadius: "22px", color: "#4ade80", fontWeight: "bold", fontSize: "28px", padding: "24px 0", cursor: "pointer", width: "100%", boxShadow: "0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>{t.about}</button>
                </div>
              </>
            )}
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ flex: 1 }}>
                <button onPointerDown={e=>btnDown(e,"0 3px 0 #c0145a")} onPointerUp={e=>btnUp(e,"0 10px 0 #c0145a, 0 12px 24px rgba(255,105,180,0.4)",()=>startGame(true))} onPointerLeave={e=>btnLeave(e,"0 10px 0 #c0145a, 0 12px 24px rgba(255,105,180,0.4)")} style={{ background: "linear-gradient(145deg,#ff79c4,#ff1493)", border: "none", borderRadius: "24px", color: "white", fontWeight: "bold", fontSize: "28px", padding: "32px 0", cursor: "pointer", width: "100%", boxShadow: "0 10px 0 #c0145a, 0 12px 24px rgba(255,105,180,0.4)", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>{t.howToPlay}</button>
              </div>
              <div style={{ flex: 1 }}><GBtn label={t.toTitle} onClick={() => { stopBGM(); setPhase("start"); }} /></div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse-pink { 0%, 100% { box-shadow: 0 4px 20px rgba(255,105,180,0.5); } 50% { box-shadow: 0 6px 28px rgba(255,105,180,0.9); transform: scale(1.01); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes blink-gold { 0%, 100% { color: #fbbf24; opacity: 1; } 50% { color: #f59e0b; opacity: 0.3; } }
        @keyframes confetti-fall { 0% { transform: translateY(-20px) rotate(0deg); opacity: 1; } 100% { transform: translateY(110vh) rotate(720deg); opacity: 0.2; } }
        @keyframes countdown-pop { 0% { transform: scale(1.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
}
