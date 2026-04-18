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
  const usedNums = tokens.map(Number);
  if (JSON.stringify([...usedNums].sort((a,b)=>a-b)) !== JSON.stringify([...nums].sort((a,b)=>a-b)))
    return { ok: false, msg: "①〜⑤の数字を全部使ってね！" };
  try {
    const safe = expr.replace(/[^0-9+\-*/().]/g, "");
    // eslint-disable-next-line no-new-func
    const result = Function('"use strict"; return (' + safe + ")")();
    if (Math.abs(result - target) < 0.0001) return { ok: true, msg: `正解！= ${target} 🍀` };
    return { ok: false, msg: `その式は ${Number(result.toFixed(4))} になるよ` };
  } catch { return { ok: false, msg: "式が正しくないよ。確認してね。" }; }
}
 
// ── Clover SVG: 4 touching heart-shaped leaves, operator in each center ──
// Each leaf is a proper heart. Center of clover at (cx,cy).
// Leaves touch at center — no gap between them.
function CloverSVG({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 112" style={{ display: "block", overflow: "visible" }}>
      {/* Stem FIRST = behind everything */}
      <line x1="50" y1="54" x2="36" y2="108" stroke="#5cb85c" strokeWidth="4" strokeLinecap="round"/>
 
      {/* 4 heart leaves — outline only, light fill so operators pop */}
      {[0, 90, 180, 270].map(deg => (
        <g key={deg} transform={`rotate(${deg} 50 50)`}>
          <path
            d="M50,50 C50,50 34,40 34,27 C34,19 41,14 50,22 C59,14 66,19 66,27 C66,40 50,50 50,50Z"
            fill="#f0faf0" stroke="#5cb85c" strokeWidth="2"
          />
        </g>
      ))}
 
      {/* Center dot on top of leaves */}
      <circle cx="50" cy="50" r="4.5" fill="#5cb85c"/>
 
      {/* Operators — BIG, BOLD, on top of leaves */}
      <text x="50" y="27" textAnchor="middle" dominantBaseline="middle" fontSize="16" fontWeight="900" fill="#111" fontFamily="Georgia,serif" stroke="white" strokeWidth="3" paintOrder="stroke">＋</text>
      <text x="73" y="50" textAnchor="middle" dominantBaseline="middle" fontSize="15" fontWeight="900" fill="#111" fontFamily="Georgia,serif" stroke="white" strokeWidth="3" paintOrder="stroke">÷</text>
      <text x="50" y="73" textAnchor="middle" dominantBaseline="middle" fontSize="17" fontWeight="900" fill="#111" fontFamily="Georgia,serif" stroke="white" strokeWidth="3" paintOrder="stroke">－</text>
      <text x="27" y="50" textAnchor="middle" dominantBaseline="middle" fontSize="16" fontWeight="900" fill="#111" fontFamily="Georgia,serif" stroke="white" strokeWidth="3" paintOrder="stroke">×</text>
 
      {/* to be happy */}
      <text x="55" y="106" fontSize="6" fill="#5cb85c" fontStyle="italic" fontFamily="Georgia,serif">to be happy...</text>
    </svg>
  );
}
 
// ── Card ──────────────────────────────────────────────────────────────
function CloverCard({ number, isTarget = false, size = "normal" }) {
  const d = {
    large:  { w: 88,  h: 128, numSz: 44, svgSz: 70, r: 10, bw: 3 },
    normal: { w: 68,  h: 98,  numSz: 32, svgSz: 54, r: 9,  bw: 2 },
    small:  { w: 50,  h: 72,  numSz: 22, svgSz: 38, r: 7,  bw: 2 },
    xsmall: { w: 52,  h: 60,  numSz: 18, svgSz: 30, r: 6,  bw: 2 },
  }[size];
  return (
    <div style={{
      width: d.w, height: d.h, borderRadius: d.r,
      background: "white",
      border: `${d.bw}px solid ${isTarget ? "#ef4444" : "#f97316"}`,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "space-between",
      padding: "6px 3px 2px", boxSizing: "border-box",
      boxShadow: "0 3px 14px rgba(0,0,0,0.45)",
      flexShrink: 0,
    }}>
      <div style={{
        fontSize: d.numSz, fontWeight: "900", color: "#111",
        lineHeight: 1, fontFamily: "Georgia,serif",
      }}>{number}</div>
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
      fontSize: d.fs, flexShrink: 0,
      boxShadow: "0 3px 14px rgba(0,0,0,0.45)",
    }}>🍀</div>
  );
}
 
// ── Main App ──────────────────────────────────────────────────────────
export default function App() {
  const [phase, setPhase] = useState("start");
  const [cards, setCards] = useState(null);
  const [revealedCount, setRevealedCount] = useState(-1);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [expr, setExpr] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [bestTime, setBestTime] = useState(null);
  const timerRef = useRef(null);
 
  const startGame = useCallback(() => {
    setPhase("dealing"); setExpr(""); setFeedback(null);
    setTime(0); setRunning(false); setRevealedCount(-1);
    const drawn = drawCards();
    setCards(drawn);
    [400,800,1200,1600,2000,2400].forEach((d, i) => {
      setTimeout(() => {
        setRevealedCount(i);
        if (i === 5) setTimeout(() => { setPhase("playing"); setRunning(true); }, 500);
      }, d);
    });
  }, []);
 
  useEffect(() => {
    if (running) timerRef.current = setInterval(() => setTime(t => t + 10), 10);
    else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [running]);
 
  const fospa = () => { setRunning(false); setPhase("fospa"); };
  const checkAnswer = () => {
    if (!cards) return;
    const r = validateExpression(expr, cards.nums, cards.target);
    setFeedback(r);
    if (r.ok) {
      if (bestTime === null || time < bestTime) setBestTime(time);
      setTimeout(() => setPhase("result"), 900);
    }
  };
  const fmt = ms => `${Math.floor(ms/1000)}.${String(Math.floor((ms%1000)/10)).padStart(2,"0")}`;
  const app = v => setExpr(e => e + v);
 
  const PBtn = ({ label, onClick }) => (
    <button onClick={onClick} style={{
      background:"linear-gradient(135deg,#16a34a,#15803d)", border:"none",
      borderRadius:"12px", color:"white", fontWeight:"bold", fontSize:"17px",
      padding:"13px 0", cursor:"pointer", width:"100%", letterSpacing:"2px",
      boxShadow:"0 5px 20px rgba(74,222,128,0.3)",
    }}>{label}</button>
  );
  const GBtn = ({ label, onClick }) => (
    <button onClick={onClick} style={{
      background:"#111f14", border:"1px solid #4ade8033", borderRadius:"12px",
      color:"#86efac", fontWeight:"bold", fontSize:"14px",
      padding:"12px 0", cursor:"pointer", width:"100%",
    }}>{label}</button>
  );
 
  return (
    <div style={{
      minHeight:"100vh", background:"#0a1a0f",
      display:"flex", flexDirection:"column", alignItems:"center",
      padding:"14px 12px 20px", color:"white",
      fontFamily:"Georgia,serif", boxSizing:"border-box",
    }}>
      {/* HEADER — always visible */}
      <div style={{ textAlign:"center", marginBottom:"10px" }}>
        <div style={{ fontSize:"34px", fontWeight:"900", letterSpacing:"5px", color:"#4ade80", lineHeight:1 }}>
          🍀 CLOVER
        </div>
        <div style={{ fontSize:"9px", letterSpacing:"3px", color:"#4ade8044", marginTop:"2px" }}>
          ♣ NUMBER CARD GAME ♣
        </div>
        {bestTime !== null && (
          <div style={{ fontSize:"12px", color:"#fbbf24", marginTop:"4px" }}>🏆 ベスト: {fmt(bestTime)}秒</div>
        )}
      </div>
 
      {/* ── START ── */}
      {phase === "start" && (
        <div style={{ width:"100%", maxWidth:"340px", textAlign:"center" }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:"16px" }}>
            <CloverCard number="？" size="large" />
          </div>
          <div style={{
            background:"#111f14", border:"1px solid #4ade8020",
            borderRadius:"14px", padding:"14px 16px", marginBottom:"16px",
          }}>
            <div style={{ fontSize:"14px", lineHeight:"1.9", color:"#86efac" }}>
              52枚の山からカードを引いて<br/>
              <span style={{ color:"#60a5fa", fontWeight:"bold" }}>①②③④⑤</span> を四則計算で{" "}
              <span style={{ color:"#ef4444", fontWeight:"bold" }}>⑥</span> にしよう！
            </div>
            <div style={{ fontSize:"12px", color:"#5cb85c", marginTop:"8px", fontStyle:"italic" }}>
              to be happy... 🍀
            </div>
          </div>
          <PBtn label="カードを切る 🃏" onClick={startGame} />
        </div>
      )}
 
      {/* ── DEALING / PLAYING — compact, one screen ── */}
      {(phase==="dealing"||phase==="playing") && cards && (
        <div style={{ width:"100%", maxWidth:"400px", textAlign:"center" }}>
          {/* Timer — compact */}
          <div style={{
            fontSize:"34px", fontWeight:"900", fontFamily:"monospace",
            color: running ? "#4ade80" : "#1e3a22",
            marginBottom:"10px", letterSpacing:"2px",
          }}>{fmt(time)}</div>
 
          {/* Target */}
          <div style={{ fontSize:"13px", letterSpacing:"4px", color:"#ef4444cc", marginBottom:"6px", fontWeight:"bold" }}>
            ⑥ TARGET
          </div>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:"10px" }}>
            {revealedCount >= 0
              ? <CloverCard number={cards.target} isTarget size="normal" />
              : <CardBack size="normal" />}
          </div>
 
          <div style={{ display:"flex", alignItems:"center", gap:"6px", margin:"6px 0", opacity:0.2 }}>
            <div style={{ flex:1, height:"1px", background:"#4ade80" }}/>
            <span style={{ fontSize:"10px" }}>🍀</span>
            <div style={{ flex:1, height:"1px", background:"#4ade80" }}/>
          </div>
 
          {/* 5 cards — all in one row with xsmall */}
          <div style={{ fontSize:"9px", letterSpacing:"3px", color:"#4ade8044", marginBottom:"6px" }}>
            ①②③④⑤
          </div>
          <div style={{ display:"flex", gap:"6px", justifyContent:"center", marginBottom:"14px" }}>
            {cards.nums.map((n, i) => (
              revealedCount >= i+1
                ? <CloverCard key={i} number={n} size="small" />
                : <CardBack key={i} size="small" />
            ))}
          </div>
 
          {phase==="playing" && (
            <button
              onPointerUp={fospa}
              style={{
                background:"linear-gradient(135deg,#16a34a,#15803d)", border:"none",
                borderRadius:"12px", color:"white", fontWeight:"bold", fontSize:"17px",
                padding:"13px 0", cursor:"pointer", width:"100%", letterSpacing:"2px",
                boxShadow:"0 5px 20px rgba(74,222,128,0.3)", touchAction:"manipulation",
                WebkitTapHighlightColor:"transparent",
              }}
            >フォスパ！🙋</button>
          )}
          {phase==="dealing" && (
            <div style={{ color:"#4ade8033", fontSize:"12px", letterSpacing:"2px" }}>カードを配っています…</div>
          )}
        </div>
      )}
 
      {/* ── FOSPA ── */}
      {phase==="fospa" && cards && (
        <div style={{ width:"100%", maxWidth:"440px", textAlign:"center" }}>
          <div style={{ fontSize:"13px", color:"#4ade80", letterSpacing:"2px", marginBottom:"10px" }}>
            フォスパ！ ⏱ {fmt(time)}秒
          </div>
 
          {/* Mini cards — ⑥ on top, ①②③④⑤ one row */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"5px", marginBottom:"12px" }}>
            <CloverCard number={cards.target} isTarget size="small" />
            <div style={{ display:"flex", gap:"4px", justifyContent:"center" }}>
              {cards.nums.map((n,i) => <CloverCard key={i} number={n} size="xsmall" />)}
            </div>
          </div>
 
          {/* Number tap */}
          <div style={{ display:"flex", gap:"4px", justifyContent:"center", marginBottom:"8px" }}>
            {cards.nums.map((n, i) => (
              <button key={i} onClick={() => app(String(n))} style={{
                background:["#3b82f6","#ec4899","#f97316","#8b5cf6","#10b981"][i],
                border:"none", borderRadius:"9px", color:"white",
                fontWeight:"900", width:"52px", height:"52px", fontSize:"22px", cursor:"pointer",
              }}>{n}</button>
            ))}
          </div>
 
          {/* Operators */}
          <div style={{ display:"flex", gap:"6px", justifyContent:"center", marginBottom:"10px" }}>
            {[["＋","+"],[" － ","-"],["×","*"],["÷","/"],["（","("],["）",")"]].map(([l,v]) => (
              <button key={l} onClick={() => app(v)} style={{
                background:"#111f14", border:"2px solid #4ade8033",
                borderRadius:"9px", color:"#4ade80",
                fontWeight:"900", width:"48px", height:"48px",
                fontSize:"22px", cursor:"pointer",
              }}>{l}</button>
            ))}
          </div>
 
          {/* Expression */}
          <div style={{
            background:"#111f14", border:"2px solid #4ade8033",
            borderRadius:"11px", padding:"12px 14px",
            fontSize:"26px", fontFamily:"monospace", fontWeight:"bold",
            color:"white", textAlign:"center", marginBottom:"8px",
            minHeight:"52px", wordBreak:"break-all", letterSpacing:"2px",
          }}>
            {expr
              ? expr.replace(/\*/g,"×").replace(/\//g,"÷")
              : <span style={{ color:"#2a4a2a", fontSize:"15px" }}>ここに式が入るよ</span>}
          </div>
 
          <div style={{ display:"flex", gap:"6px", marginBottom:"10px" }}>
            <button onClick={() => setExpr(e => e.slice(0,-1))} style={{
              background:"#111f14", border:"1px solid #4ade8033", borderRadius:"9px",
              color:"#86efac", fontWeight:"bold", width:"52px", height:"44px",
              fontSize:"18px", cursor:"pointer", flexShrink:0,
            }}>⌫</button>
            <button onClick={() => setExpr("")} style={{
              background:"#111f14", border:"1px solid #4ade8033", borderRadius:"9px",
              color:"#86efac", fontWeight:"bold", flex:1, height:"44px",
              fontSize:"13px", cursor:"pointer",
            }}>全消し</button>
          </div>
 
          {feedback && (
            <div style={{
              padding:"12px", borderRadius:"9px", marginBottom:"10px", fontSize:"15px",
              background: feedback.ok ? "#4ade8018" : "#ef444418",
              border:`1px solid ${feedback.ok ? "#4ade80" : "#ef4444"}`,
              color: feedback.ok ? "#4ade80" : "#fca5a5",
            }}>{feedback.msg}</div>
          )}
 
          <div style={{ display:"flex", gap:"8px" }}>
            <div style={{ flex:2 }}><PBtn label="答え合わせ！" onClick={checkAnswer} /></div>
            <div style={{ flex:1 }}><GBtn label="やり直す" onClick={startGame} /></div>
          </div>
        </div>
      )}
 
      {/* ── RESULT ── */}
      {phase==="result" && (
        <div style={{ textAlign:"center", width:"100%", maxWidth:"340px" }}>
          <div style={{ fontSize:"52px", marginBottom:"6px" }}>🍀</div>
          <div style={{ fontSize:"32px", fontWeight:"900", color:"#4ade80", marginBottom:"4px" }}>
            せいかい！🍬
          </div>
          <div style={{
            fontSize:"52px", fontFamily:"monospace", fontWeight:"900",
            color:"#4ade80", marginBottom:"4px",
          }}>{fmt(time)}秒</div>
          {bestTime !== null && time <= bestTime && (
            <div style={{ color:"#fbbf24", fontSize:"15px", marginBottom:"6px" }}>🏆 新記録！</div>
          )}
          <div style={{ color:"#555", fontSize:"12px", marginBottom:"4px" }}>{feedback?.msg}</div>
          <div style={{ fontSize:"14px", color:"#5cb85c", fontStyle:"italic", marginBottom:"22px" }}>
            to be happy... 🍀
          </div>
          <div style={{ display:"flex", gap:"8px" }}>
            <div style={{ flex:1 }}><PBtn label="もう一回！" onClick={startGame} /></div>
            <div style={{ flex:1 }}><GBtn label="タイトルへ" onClick={() => setPhase("start")} /></div>
          </div>
        </div>
      )}
    </div>
  );
}
