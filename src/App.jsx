import { useState, useEffect, useRef, useCallback } from "react";

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

function validateExpression(expr, nums, target) {
  const tokens = expr.replace(/[+\-*/()]/g, " ").trim().split(/\s+/).filter(Boolean);
  const usedNums = tokens.map(Number).filter(n => !isNaN(n));
  const sortedUsed = [...usedNums].sort((a, b) => a - b);
  const sortedNums = [...nums].sort((a, b) => a - b);
  if (JSON.stringify(sortedUsed) !== JSON.stringify(sortedNums))
    return { ok: false, msg: "①〜⑤の数字を各1回ずつ全部使ってね！" };
  try {
    const safe = expr.replace(/[^0-9+\-*/().]/g, "");
    // eslint-disable-next-line no-new-func
    const result = Function('"use strict"; return (' + safe + ")")();
    if (Math.abs(result - target) < 0.0001) return { ok: true, msg: `正解！= ${target} 🍀` };
    return { ok: false, msg: `その式は ${Number(result.toFixed(4))} になるよ` };
  } catch { return { ok: false, msg: "式が正しくないよ。確認してね。" }; }
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
  const fospa = () => { setRunning(false); setPhase("fospa"); if (isTutorial) setTutStep(5); };

  const checkAnswer = () => {
    if (!cards) return;
    const r = validateExpression(expr, cards.nums, cards.target);
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
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = shadowNormal;
    playPakon();
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
      padding: "80px 22px 54px", color: "white", fontFamily: "Georgia,serif", boxSizing: "border-box",
    }}>
      <div style={{ textAlign: "center", marginBottom: "29px" }}>
        <div style={{ fontSize: "94px", fontWeight: "900", letterSpacing: "5px", color: "#4ade80", lineHeight: 1 }}>🍀 CLOVER™️</div>
        <div style={{ fontSize: "20px", letterSpacing: "3px", color: "#4ade8044", marginTop: "7px" }}>♣ NUMBER CARD GAME ♣</div>
        {bestTime !== null && <div style={{ fontSize: "25px", color: "#fbbf24", marginTop: "11px" }}>🏆 ベスト: {fmt(bestTime)}秒</div>}
      </div>

      {phase === "start" && (
        <div style={{ width: "100%", maxWidth: "756px", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "43px" }}><CloverCard number="？" size="large" /></div>
          <div style={{ background: "#111f14", border: "1px solid #4ade8020", borderRadius: "32px", padding: "36px 36px", marginBottom: "43px" }}>
            <div style={{ fontSize: "28px", lineHeight: "2.2", color: "#86efac" }}>
              52枚の山からカードを引いて<br/>
              <span style={{ color: "#60a5fa", fontWeight: "bold" }}>①②③④⑤</span> に書かれた数字を四則計算で繋げて並び替えて{" "}
              <span style={{ color: "#ef4444", fontWeight: "bold" }}>⑥</span> の数字(target)にしよう！！<br/>タイムを競うカードゲームだよ！
            </div>
            <div style={{ fontSize: "27px", color: "#5cb85c", marginTop: "25px", fontStyle: "italic" }}>to be happy... 🍀</div>
          </div>
          <div style={{ fontSize: "25px", color: "#aaa", marginBottom: "22px" }}>⬇️ のボタンを押すと…</div>
          <div style={{ marginBottom: "25px" }}>
            <button
              onPointerDown={e=>btnDown(e,"0 3px 0 #c0145a")}
              onPointerUp={e=>btnUp(e,"0 10px 0 #c0145a, 0 12px 24px rgba(255,105,180,0.4)",()=>startGame(true))}
              onPointerLeave={e=>btnLeave(e,"0 10px 0 #c0145a, 0 12px 24px rgba(255,105,180,0.4)")}
              style={{ background: "linear-gradient(145deg,#ff79c4,#ff1493)", border: "none", borderRadius: "25px", color: "white", fontWeight: "bold", fontSize: "36px", padding: "32px 0", cursor: "pointer", width: "100%", letterSpacing: "2px", boxShadow: "0 10px 0 #c0145a, 0 12px 24px rgba(255,105,180,0.4)", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>やり方を学ぶ 📖</button>
          </div>
          <PBtn label="スタート 🃏" onClick={() => startGame(false)} />
          <div style={{ fontSize: "23px", color: "#86efac", marginTop: "29px", lineHeight: "2.0", textAlign: "left" }}>📖 ピンク→チュートリアルで試し遊び！<br/>🃏 黄色字→本番スタート！</div>
          <div style={{ marginTop: "36px", fontSize: "38px", fontWeight: "bold", color: "white", letterSpacing: "1px" }}>by NPO法人 Foster Partner®️</div>
        </div>
      )}

      {(phase === "dealing" || phase === "playing") && cards && (
        <div style={{ width: "100%", maxWidth: "900px", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <button
              onPointerDown={e=>btnDown(e,"0 2px 0 #166534")}
              onPointerUp={e=>btnUp(e,"0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)", () => {
                if (isTutorial) {
                  if (tutStep <= 1) { dealingTimeoutsRef.current.forEach(id => clearTimeout(id)); dealingTimeoutsRef.current = []; setPhase("start"); setIsTutorial(false); setRunning(false); }
                  else setTutStep(s => s - 1);
                } else { dealingTimeoutsRef.current.forEach(id => clearTimeout(id)); dealingTimeoutsRef.current = []; setPhase("start"); setRunning(false); clearExpr(); }
              })}
              onPointerLeave={e=>btnLeave(e,"0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)")}
              style={{ background: "linear-gradient(145deg,#1e4a2a,#1a3a22)", border: "2px solid #4ade80", borderRadius: "14px", color: "#4ade80", fontWeight: "900", padding: "14px 24px", cursor: "pointer", fontSize: "22px", flexShrink: 0, boxShadow: "0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>← 戻る</button>
            {isTutorial
              ? <div style={{ flex: 1, background: "#ff69b4", color: "white", borderRadius: "14px", padding: "20px 24px", fontSize: "32px", fontWeight: "bold", boxShadow: "0 3px 12px rgba(255,105,180,0.5)" }}>チュートリアル中 🩷 — 説明に沿って操作手順を覚えてね</div>
              : <div style={{ flex: 1, textAlign: "left", fontSize: "18px", color: "#4ade8066" }}>タイトルへ戻る</div>}
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ fontSize: "120px", fontWeight: "900", fontFamily: "monospace", color: running ? "#4ade80" : "#1e3a22", marginBottom: "18px", letterSpacing: "2px" }}>{fmt(time)}</div>
            {isTutorial && tutStep === 1 && (
              <div>
                <div style={{ background: "#ff69b4", color: "white", borderRadius: "14px", padding: "28px 16px", fontSize: "50px", fontWeight: "bold", lineHeight: "1.6", margin: "16px 0", boxShadow: "0 4px 20px rgba(255,105,180,0.5)", border: "2px solid #ff1493", animation: "pulse-pink 2s infinite" }}>👆 スタートと同時に<br/>タイムが動き出すよ！⏱</div>
                <button onPointerDown={e=>btnDown(e,"0 2px 0 #c0145a")} onPointerUp={e=>btnUp(e,"0 8px 0 #c0145a",advanceTutorial)} onPointerLeave={e=>btnLeave(e,"0 8px 0 #c0145a")} style={{ background: "#ff69b4", border: "none", borderRadius: "18px", color: "white", fontWeight: "bold", padding: "24px 50px", cursor: "pointer", fontSize: "60px", marginBottom: "24px", boxShadow: "0 8px 0 #c0145a", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>次へ →</button>
              </div>
            )}
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ fontSize: "30px", letterSpacing: "4px", color: "#ef4444cc", marginBottom: "10px", fontWeight: "bold" }}>⑥ TARGET</div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
              {dealtCount >= 1 ? (allRevealed ? <CloverCard number={cards.target} isTarget size="normal" /> : <CardBack size="normal" />) : null}
            </div>
            {isTutorial && tutStep === 2 && (
              <div>
                <div style={{ background: "#ff69b4", color: "white", borderRadius: "14px", padding: "28px 16px", fontSize: "50px", fontWeight: "bold", lineHeight: "1.6", margin: "16px 0", boxShadow: "0 4px 20px rgba(255,105,180,0.5)", border: "2px solid #ff1493", animation: "pulse-pink 2s infinite" }}>これが👆⑥ターゲット<br/>この数字を答えにするのが<br/>目標だよ！</div>
                <button onPointerDown={e=>btnDown(e,"0 2px 0 #c0145a")} onPointerUp={e=>btnUp(e,"0 8px 0 #c0145a",advanceTutorial)} onPointerLeave={e=>btnLeave(e,"0 8px 0 #c0145a")} style={{ background: "#ff69b4", border: "none", borderRadius: "18px", color: "white", fontWeight: "bold", padding: "24px 50px", cursor: "pointer", fontSize: "60px", marginBottom: "24px", boxShadow: "0 8px 0 #c0145a", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>次へ →</button>
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
                <div style={{ background: "#ff69b4", color: "white", borderRadius: "14px", padding: "28px 16px", fontSize: "50px", fontWeight: "bold", lineHeight: "1.6", margin: "16px 0", boxShadow: "0 4px 20px rgba(255,105,180,0.5)", border: "2px solid #ff1493", animation: "pulse-pink 2s infinite" }}>👆 ①②③④⑤の5枚！<br/>この数字を並べ替えて<br/>四則計算記号(+-×÷)で繋いで<br/>上のターゲットの数字にするよ</div>
                <div style={{ background: "#e8336d", color: "white", borderRadius: "14px", padding: "20px 16px", fontSize: "50px", fontWeight: "bold", lineHeight: "1.6", margin: "12px 0", boxShadow: "0 4px 20px rgba(232,51,109,0.5)", border: "2px solid #c0145a" }}>記号(+-×÷)は<br/>何度使ってもいいよ</div>
                <div style={{ fontSize: "36px", color: "white", marginBottom: "16px", textAlign: "left", textDecoration: "underline", textDecorationStyle: "wavy", textDecorationColor: "#ef4444" }}>※解法は一つではないよ</div>
                <button onPointerDown={e=>btnDown(e,"0 2px 0 #c0145a")} onPointerUp={e=>btnUp(e,"0 8px 0 #c0145a",advanceTutorial)} onPointerLeave={e=>btnLeave(e,"0 8px 0 #c0145a")} style={{ background: "#ff69b4", border: "none", borderRadius: "18px", color: "white", fontWeight: "bold", padding: "24px 50px", cursor: "pointer", fontSize: "60px", marginBottom: "24px", boxShadow: "0 8px 0 #c0145a", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>次へ →</button>
              </div>
            )}
          </div>

          {/* フォスパボタン - 立体版 */}
          {phase === "playing" && (isTutorial ? tutStep >= 4 : true) && (
            <div style={{ position: "relative" }}>
              {isTutorial && tutStep === 4 && (
                <div>
                  <div style={{ background: "#ff69b4", color: "white", borderRadius: "14px", padding: "28px 16px", fontSize: "50px", fontWeight: "bold", lineHeight: "1.6", margin: "16px 0", boxShadow: "0 4px 20px rgba(255,105,180,0.5)", border: "2px solid #ff1493", animation: "pulse-pink 2s infinite" }}>
                    出来たら<br/>「フォスパ」と言って、<br/>👇のボタンを押すよ
                  </div>
                  <div style={{ fontSize: "34px", color: "white", marginBottom: "16px", textAlign: "left", textDecoration: "underline", textDecorationStyle: "wavy", textDecorationColor: "#ef4444", whiteSpace: "nowrap" }}>※バスや電車の中では、心の中でね笑</div>
                </div>
              )}
              <button
                onPointerUp={() => { playPakon(); fospa(); }}
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
              >フォスパ！🙋</button>
            </div>
          )}

          {phase === "dealing" && (
            <div style={{ position: "relative", minHeight: "120px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {countdown !== null
                ? <div style={{ fontSize: countdown === "GO!" ? "120px" : "160px", fontWeight: "900", color: countdown === "GO!" ? "#4ade80" : "#fbbf24", fontFamily: "monospace", animation: "countdown-pop 0.3s ease-out", textShadow: countdown === "GO!" ? "0 0 40px #4ade80" : "0 0 40px #fbbf24" }}>{countdown}</div>
                : <div style={{ color: "#4ade8033", fontSize: "28px", letterSpacing: "2px" }}>カードを配っています…</div>}
            </div>
          )}
        </div>
      )}

      {phase === "fospa" && cards && (
        <div style={{ width: "100%", maxWidth: "900px", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <button onPointerDown={e=>btnDown(e,"0 2px 0 #166534")} onPointerUp={e=>btnUp(e,"0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)",goBackToPlaying)} onPointerLeave={e=>btnLeave(e,"0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)")} style={{ background: "linear-gradient(145deg,#1e4a2a,#1a3a22)", border: "2px solid #4ade80", borderRadius: "14px", color: "#4ade80", fontWeight: "900", padding: "14px 24px", cursor: "pointer", fontSize: "28px", flexShrink: 0, boxShadow: "0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>← 戻る</button>
            {isTutorial
              ? <div style={{ flex: 1, background: "#ff69b4", color: "white", borderRadius: "14px", padding: "14px 20px", fontSize: "28px", fontWeight: "bold" }}>チュートリアル中 🩷</div>
              : <div style={{ flex: 1, textAlign: "left", fontSize: "22px", color: "#4ade8066" }}>解き直したい時は戻れるよ</div>}
          </div>
          <div style={{ fontSize: "36px", color: "#4ade80", letterSpacing: "2px", marginBottom: "16px" }}>フォスパ！ ⏱ {fmt(time)}秒</div>
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
              {exprTokens.length > 0 ? tokensToDisplay(exprTokens) : <span style={{ color: "#2a4a2a", fontSize: "28px" }}>ここに式が入るよ</span>}
            </div>
          )}
          {(!isTutorial || tutStep !== 5) && (
            <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
              <button onPointerDown={e=>btnDown(e,"0 2px 0 #0a1a0f")} onPointerUp={e=>btnUp(e,"0 7px 0 #0a1a0f",backspaceExpr)} onPointerLeave={e=>btnLeave(e,"0 7px 0 #0a1a0f")} style={{ background: "#1a2f1e", border: "1px solid #4ade8033", borderRadius: "14px", color: "#86efac", fontWeight: "bold", width: "90px", height: "80px", fontSize: "36px", cursor: "pointer", flexShrink: 0, boxShadow: "0 7px 0 #0a1a0f", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>⌫</button>
              <button onPointerDown={e=>btnDown(e,"0 2px 0 #0a1a0f")} onPointerUp={e=>btnUp(e,"0 7px 0 #0a1a0f",clearExpr)} onPointerLeave={e=>btnLeave(e,"0 7px 0 #0a1a0f")} style={{ background: "#1a2f1e", border: "1px solid #4ade8033", borderRadius: "14px", color: "#86efac", fontWeight: "bold", flex: 1, height: "80px", fontSize: "32px", cursor: "pointer", boxShadow: "0 7px 0 #0a1a0f", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>全消し</button>
            </div>
          )}
          {feedback && (
            <div style={{ padding: "20px", borderRadius: "14px", marginBottom: "16px", fontSize: "32px", background: feedback.ok ? "#4ade8018" : "#ef444418", border: `1px solid ${feedback.ok ? "#4ade80" : "#ef4444"}`, color: feedback.ok ? "#4ade80" : "#fca5a5" }}>{feedback.msg}</div>
          )}
          {isTutorial && tutStep === 6 && (
            <div style={{ position: "relative", zIndex: 100, background: "#ff69b4", color: "white", borderRadius: "14px", padding: "18px 22px", fontSize: "38px", fontWeight: "bold", lineHeight: "1.6", margin: "12px 0", boxShadow: "0 4px 20px rgba(255,105,180,0.5)", border: "2px solid #ff1493", animation: "pulse-pink 2s infinite" }}>
              式が入力されたよ！<br/><span style={{ fontSize: "32px" }}>👇の「答え合わせ」ボタンを押してね。</span>
            </div>
          )}
          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{ flex: 2 }}>
              <button
                onPointerDown={e=>btnDown(e,"0 2px 0 #166534")}
                onPointerUp={e=>btnUp(e,"0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)",checkAnswer)}
                onPointerLeave={e=>btnLeave(e,"0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)")}
                style={{ background: "linear-gradient(145deg,#22c55e,#16a34a)", border: "none", borderRadius: "22px", color: "white", fontWeight: "bold", fontSize: "40px", padding: "28px 0", cursor: "pointer", width: "100%", letterSpacing: "2px", boxShadow: isTutorial && tutStep === 6 ? "0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3), 0 0 0 3px #ff69b4" : "0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>答え合わせ！</button>
            </div>
            <div style={{ flex: 1 }}><GBtn label="やり直す" onClick={() => startGame(false)} /></div>
          </div>
        </div>
      )}

      {/* ABOUT */}
      {phase === "about" && (
        <div style={{ width: "100%", maxWidth: "756px" }}>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <div style={{ fontSize: "52px", fontWeight: "900", color: "#4ade80" }}>🍀 CLOVER™️について</div>
          </div>

          {/* カード1: 監修 */}
          <div style={{ background: "#111f14", border: "1px solid #4ade8033", borderRadius: "24px", padding: "32px", marginBottom: "20px" }}>
            <div style={{ fontSize: "30px", fontWeight: "bold", color: "#4ade80", marginBottom: "16px" }}>🏢 監修</div>
            <div style={{ fontSize: "26px", color: "#86efac", lineHeight: "1.9" }}>
              CLOVER™️は、<strong style={{ color: "white" }}>NPO法人 Foster Partner®️</strong>が監修して作ったゲームアプリです。
            </div>
          </div>

          {/* カード2: 誕生の背景 */}
          <div style={{ background: "#111f14", border: "1px solid #4ade8033", borderRadius: "24px", padding: "32px", marginBottom: "20px" }}>
            <div style={{ fontSize: "30px", fontWeight: "bold", color: "#4ade80", marginBottom: "16px" }}>📖 誕生の背景</div>
            <div style={{ fontSize: "26px", color: "#86efac", lineHeight: "1.9" }}>
              以前、似たロジックのカードゲームが世にありましたが、今はどこにも販売されていません。<br/>
              その寂しさから、ロジックを逆算してデジタル版として<strong style={{ color: "white" }}>CLOVER™️</strong>を組み立てました！
            </div>
          </div>

          {/* カード3: こんな人に */}
          <div style={{ background: "#111f14", border: "1px solid #4ade8033", borderRadius: "24px", padding: "32px", marginBottom: "20px" }}>
            <div style={{ fontSize: "30px", fontWeight: "bold", color: "#4ade80", marginBottom: "16px" }}>👨‍👩‍👧‍👦 こんな人に</div>
            <div style={{ fontSize: "26px", color: "#86efac", lineHeight: "1.9" }}>
              四則計算ができれば<strong style={{ color: "white" }}>小学3年生(?)から</strong>プレイ可能！<br/>
              大人だから強いとも言えないので、子どもから大人まで本気で勝負できます。<br/><br/>
              家族が揃っているのにやることない…そんな時に！<br/>
              <span style={{ color: "#fbbf24" }}>・在宅勤務でおうち時間が増えた</span><br/>
              <span style={{ color: "#fbbf24" }}>・おじいちゃん・おばあちゃんの認知機能低下防止と孫の学習を同時に</span><br/>
              <span style={{ color: "#fbbf24", fontWeight: "bold" }}>・家族全員が本気で競える！</span>
            </div>
          </div>

          {/* カード4: 名前の由来 */}
          <div style={{ background: "#111f14", border: "1px solid #4ade8033", borderRadius: "24px", padding: "32px", marginBottom: "32px" }}>
            <div style={{ fontSize: "30px", fontWeight: "bold", color: "#4ade80", marginBottom: "16px" }}>🍀 CLOVERの由来</div>
            <div style={{ fontSize: "26px", color: "#86efac", lineHeight: "1.9" }}>
              四葉のクローバー → 幸せを呼ぶ → 一見困難でも、工夫すれば（並び変えて四則計算で組むことで）答えを導き出せるかもしれない、という意味を込めました！<br/><br/>
              <strong style={{ color: "#fbbf24", fontSize: "28px" }}>※CLO<span style={{ color: "#ef4444" }}>LOVE</span>R™️の中には「LOVE（愛）」があるのがまたポイント笑</strong>
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            <div style={{ flex: 1 }}>
              <PBtn label="次の問題へ 🃏（本番！）" onClick={() => startGame(false)} />
            </div>
            <div style={{ flex: 1 }}>
              <GBtn label="タイトルへ" onClick={() => setPhase("start")} />
            </div>
          </div>
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
            <div style={{ fontSize: "80px", fontWeight: "900", color: "#4ade80", marginBottom: "8px" }}>{isTutorial ? <span>チュートリアル<br/>完了！🎉</span> : "せいかい！🍬"}</div>
            <div style={{ fontSize: "104px", fontFamily: "monospace", fontWeight: "900", color: "#4ade80", marginBottom: "8px" }}>{fmt(time)}秒</div>
            {isTutorial ? (
              <div style={{ marginBottom: "32px" }}>
                <div style={{ fontSize: "26px", color: "#86efac", lineHeight: "1.8", marginBottom: "24px" }}>⬆️ はクリアしたタイムだよ！<br/>本番では記録が出るたびに更新されるよ🏆<br/>👇 新記録なら「新記録」と金色に点滅するよ！</div>
                <div style={{ background: "#ff69b422", border: "2px solid #ff69b4", borderRadius: "24px", padding: "24px", marginBottom: "24px", color: "#ff69b4", fontSize: "28px", fontWeight: "bold" }}>やり方はわかったかな？<br/>さぁいよいよチャレンジだ👇</div>
                <div style={{ marginBottom: "20px" }}>
                  <PBtn label="次の問題へ 🃏（本番！）" onClick={() => startGame(false)} />
                </div>
                <button
                  onPointerDown={e=>btnDown(e,"0 2px 0 #166534")}
                  onPointerUp={e=>btnUp(e,"0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)",()=>setPhase("about"))}
                  onPointerLeave={e=>btnLeave(e,"0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)")}
                  style={{ background: "linear-gradient(145deg,#1e4a2a,#1a3a22)", border: "2px solid #4ade80", borderRadius: "22px", color: "#4ade80", fontWeight: "bold", fontSize: "28px", padding: "24px 0", cursor: "pointer", width: "100%", boxShadow: "0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>🍀 CLOVER™️について読む</button>
              </div>
            ) : (
              <>
                {isNewRecord && <div style={{ color: "#fbbf24", fontSize: "40px", fontWeight: "900", marginBottom: "12px", animation: "blink-gold 1.8s infinite" }}>🎉 新記録！ 🎉</div>}
                {bestTime !== null && <div style={{ color: "#fbbf24", fontSize: "30px", marginBottom: "12px" }}>🏆 ただ今のベスト：{fmt(bestTime)}秒</div>}
                <div style={{ color: "#555", fontSize: "24px", marginBottom: "8px" }}>{feedback?.msg}</div>
                <div style={{ fontSize: "28px", color: "#5cb85c", fontStyle: "italic", marginBottom: "32px" }}>to be happy... 🍀</div>
                <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
                  <div style={{ flex: 1 }}><PBtn label="次の問題へ 🃏" onClick={() => startGame(false)} /></div>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <button
                    onPointerDown={e=>btnDown(e,"0 2px 0 #166534")}
                    onPointerUp={e=>btnUp(e,"0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)",()=>setPhase("about"))}
                    onPointerLeave={e=>btnLeave(e,"0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)")}
                    style={{ background: "linear-gradient(145deg,#1e4a2a,#1a3a22)", border: "2px solid #4ade80", borderRadius: "22px", color: "#4ade80", fontWeight: "bold", fontSize: "28px", padding: "24px 0", cursor: "pointer", width: "100%", boxShadow: "0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.3)", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>🍀 CLOVER™️について読む</button>
                </div>
              </>
            )}
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ flex: 1 }}>
                <button onPointerDown={e=>btnDown(e,"0 3px 0 #c0145a")} onPointerUp={e=>btnUp(e,"0 10px 0 #c0145a, 0 12px 24px rgba(255,105,180,0.4)",()=>startGame(true))} onPointerLeave={e=>btnLeave(e,"0 10px 0 #c0145a, 0 12px 24px rgba(255,105,180,0.4)")} style={{ background: "linear-gradient(145deg,#ff79c4,#ff1493)", border: "none", borderRadius: "24px", color: "white", fontWeight: "bold", fontSize: "28px", padding: "32px 0", cursor: "pointer", width: "100%", boxShadow: "0 10px 0 #c0145a, 0 12px 24px rgba(255,105,180,0.4)", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>やり方を学ぶ 📖</button>
              </div>
              <div style={{ flex: 1 }}><GBtn label="タイトルへ" onClick={() => setPhase("start")} /></div>
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
