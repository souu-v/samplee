import { useState, useCallback } from "react";

const LANGUAGES = [
  { code: "Japanese", label: "🇯🇵 日本語" },
  { code: "English", label: "🇺🇸 English" },
  { code: "Chinese", label: "🇨🇳 中文" },
  { code: "Korean", label: "🇰🇷 한국어" },
  { code: "French", label: "🇫🇷 Français" },
  { code: "Spanish", label: "🇪🇸 Español" },
  { code: "German", label: "🇩🇪 Deutsch" },
  { code: "Italian", label: "🇮🇹 Italiano" },
  { code: "Portuguese", label: "🇧🇷 Português" },
  { code: "Arabic", label: "🇸🇦 العربية" },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .app {
    min-height: 100vh;
    background: #0a0a0f;
    font-family: 'DM Mono', monospace;
    color: #e8e4d9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px 16px;
    position: relative;
    overflow: hidden;
  }

  .bg-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.15;
    pointer-events: none;
  }
  .bg-orb-1 { width: 500px; height: 500px; background: #4f7fff; top: -150px; left: -100px; }
  .bg-orb-2 { width: 400px; height: 400px; background: #ff4fa0; bottom: -100px; right: -80px; }
  .bg-orb-3 { width: 300px; height: 300px; background: #4fffb0; top: 40%; left: 50%; transform: translate(-50%,-50%); }

  .wrapper {
    width: 100%;
    max-width: 780px;
    position: relative;
    z-index: 1;
  }

  .header {
    text-align: center;
    margin-bottom: 36px;
  }

  .header-tag {
    display: inline-block;
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #4f7fff;
    border: 1px solid #4f7fff44;
    padding: 4px 12px;
    border-radius: 100px;
    margin-bottom: 14px;
  }

  .header h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(32px, 6vw, 52px);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1;
    background: linear-gradient(135deg, #e8e4d9 0%, #4f7fff 60%, #ff4fa0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 24px;
    backdrop-filter: blur(20px);
  }

  .lang-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }

  .lang-select {
    flex: 1;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    color: #e8e4d9;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    padding: 10px 14px;
    cursor: pointer;
    outline: none;
    appearance: none;
    transition: border-color 0.2s;
  }
  .lang-select:focus { border-color: #4f7fff88; }
  .lang-select option { background: #1a1a2e; }

  .swap-btn {
    background: rgba(79,127,255,0.15);
    border: 1px solid rgba(79,127,255,0.3);
    color: #4f7fff;
    width: 38px;
    height: 38px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    flex-shrink: 0;
  }
  .swap-btn:hover { background: rgba(79,127,255,0.3); transform: rotate(180deg); }

  .panels {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  @media (max-width: 580px) { .panels { grid-template-columns: 1fr; } }

  .panel {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .panel-label {
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(232,228,217,0.4);
  }

  textarea {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    color: #e8e4d9;
    font-family: 'DM Mono', monospace;
    font-size: 14px;
    line-height: 1.7;
    padding: 16px;
    resize: none;
    height: 180px;
    outline: none;
    transition: border-color 0.2s;
    width: 100%;
  }
  textarea:focus { border-color: #4f7fff66; }
  textarea::placeholder { color: rgba(232,228,217,0.2); }

  .output-box {
    background: rgba(79,127,255,0.04);
    border: 1px solid rgba(79,127,255,0.15);
    border-radius: 12px;
    padding: 16px;
    height: 180px;
    font-size: 14px;
    line-height: 1.7;
    overflow-y: auto;
    position: relative;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .placeholder-text {
    color: rgba(232,228,217,0.2);
    font-size: 13px;
  }

  .translate-btn {
    margin-top: 20px;
    width: 100%;
    background: linear-gradient(135deg, #4f7fff, #7b4fff);
    border: none;
    border-radius: 12px;
    color: white;
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.05em;
    padding: 16px;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
  }
  .translate-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 30px rgba(79,127,255,0.35); }
  .translate-btn:active:not(:disabled) { transform: translateY(0); }
  .translate-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .loading-dots span {
    display: inline-block;
    animation: blink 1.2s infinite;
    font-size: 20px;
  }
  .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
  .loading-dots span:nth-child(3) { animation-delay: 0.4s; }

  @keyframes blink {
    0%, 80%, 100% { opacity: 0.2; }
    40% { opacity: 1; }
  }

  .copy-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 6px;
    color: rgba(232,228,217,0.6);
    font-size: 11px;
    padding: 4px 8px;
    cursor: pointer;
    font-family: 'DM Mono', monospace;
    transition: all 0.15s;
  }
  .copy-btn:hover { background: rgba(255,255,255,0.14); color: #e8e4d9; }

  .char-count {
    font-size: 10px;
    color: rgba(232,228,217,0.25);
    text-align: right;
  }
`;

export default function TranslatorApp() {
  const [sourceLang, setSourceLang] = useState("Japanese");
  const [targetLang, setTargetLang] = useState("English");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const translate = useCallback(async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setOutputText("");

    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `Translate the following text from ${sourceLang} to ${targetLang}. Return ONLY the translated text, nothing else.\n\n${inputText}`
          }]
        })
      });

      const data = await response.json();
      const result = data.content?.map(b => b.text || "").join("") || "翻訳に失敗しました。";
      setOutputText(result);
    } catch {
      setOutputText("エラーが発生しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  }, [inputText, sourceLang, targetLang]);

  const swapLangs = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInputText(outputText);
    setOutputText(inputText);
  };

  const copyOutput = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) translate();
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />

        <div className="wrapper">
          <div className="header">
            <div className="header-tag">AI Powered</div>
            <h1>TRANSLATOR</h1>
          </div>

          <div className="card">
            <div className="lang-row">
              <select className="lang-select" value={sourceLang} onChange={e => setSourceLang(e.target.value)}>
                {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
              </select>

              <button className="swap-btn" onClick={swapLangs} title="入れ替え">⇄</button>

              <select className="lang-select" value={targetLang} onChange={e => setTargetLang(e.target.value)}>
                {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
              </select>
            </div>

            <div className="panels">
              <div className="panel">
                <div className="panel-label">入力</div>
                <textarea
                  placeholder="翻訳したいテキストを入力..."
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={handleKey}
                />
                <div className="char-count">{inputText.length} 文字</div>
              </div>

              <div className="panel">
                <div className="panel-label">翻訳結果</div>
                <div className="output-box">
                  {loading ? (
                    <div className="loading-dots">
                      <span>●</span><span>●</span><span>●</span>
                    </div>
                  ) : outputText ? (
                    <>
                      {outputText}
                      <button className="copy-btn" onClick={copyOutput}>
                        {copied ? "✓ コピー済" : "コピー"}
                      </button>
                    </>
                  ) : (
                    <span className="placeholder-text">翻訳結果がここに表示されます</span>
                  )}
                </div>
                {outputText && <div className="char-count">{outputText.length} 文字</div>}
              </div>
            </div>

            <button className="translate-btn" onClick={translate} disabled={loading || !inputText.trim()}>
              {loading ? "翻訳中..." : "翻訳する　→　(⌘+Enter)"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
