"""
Overwatch Meta Tier List - AI Image Analysis PoC Script
-----------------------------------------------------------
TierMakerなどのヒーローティアリスト画像をマルチモーダルAI（Gemini 1.5 Flash / 2.0 Flash）
に渡し、S/A/B/C/Dの各行に配置されたヒーローを構造化JSONとして抽出するPoCスクリプト。
"""

import os
import sys
import json
import base64

# Gemini Vision API用のシステムプロンプト定義
PROMPT_TIERLIST_ANALYZER = """
あなたは対戦FPSゲーム「オーバーウォッチ (Overwatch)」のエキスパートかつ画像解析モデルです。
与えられた画像は、オーバーウォッチのヒーローティアリスト（TierMakerなどのグリッド画像）です。

画像内の左側にある行ラベル（S, A, B, C, D など）と、その行に横並びに配置されているヒーローのポートレートアイコンを正確に識別してください。

【厳格な指示】
1. 画像内のすべての行（S, A, B, C, Dなど）を特定してください。
2. 各行に配置されているヒーローの公式英語名称（例: "D.Va", "Winston", "Tracer", "Juno", "Ana" など）を左から順に抽出してください。
3. 新スキンや別スキン、別角度のアイコンが使用されている場合でも、顔立ち・特徴（メカ、仮面、武器など）からオーバーウォッチの対応ヒーローを特定してください。
4. 出力は必ず以下の形式の有効な純粋なJSONのみを返してください（コードブロック構文以外の余計なテキストは含めないでください）。

{
  "creator_detected": "画像のタイトルやウォーターマークから推測される配信者名またはNull",
  "patch_detected": "画像内にパッチ表記がある場合はその文字列、なければNull",
  "tiers": {
    "S": ["D.Va", "Zarya", "Tracer", "Juno", "Ana", "Kiriko"],
    "A": ["Winston", "Sigma", "Sojourn", "Ashe", "Venture", "Bastion"],
    "B": ["Doomfist", "Junker Queen", "Ramattra", "Genji", "Cassidy"],
    "C": ["Mauga", "Reinhardt", "Orisa", "Soldier: 76", "Mei"],
    "D": ["Roadhog", "Widowmaker", "Symmetra", "Moira"]
  },
  "confidence_score": 0.95,
  "analysis_notes": "特筆すべきメタ傾向や解析上の留意点"
}
"""

def mock_analyze(image_path: str):
    """
    APIキーがない場合でも動作確認できるシミュレーション実行
    """
    print(f"[*] Analyzing image: {image_path}")
    print("[*] Processing with Gemini Vision model...")
    
    # 添付画像（TierMaker）に基づく模範抽出データ
    result = {
        "status": "success",
        "model": "gemini-2.0-flash-exp",
        "creator_detected": "Community Top500 Streamer",
        "patch_detected": "Season 13 Mid-Patch",
        "tiers": {
            "S": ["D.Va", "Reinhardt", "Zarya", "Illari", "Kiriko", "Lucio"],
            "A": ["Illari", "Sigma", "Sojourn", "Bastion", "Tracer", "Cassidy", "Symmetra", "Wrecking Ball"],
            "B": [
                "Winston", "Doomfist", "Roadhog", "Junker Queen", "Wrecking Ball", "Reaper",
                "Ashe", "Echo", "Pharah", "Torbjorn", "Junkrat", "Hanzo", "Sombra", "Genji",
                "Baptiste", "Brigitte", "Ana"
            ],
            "C": [
                "Ramattra", "Mauga", "Reinhardt", "Orisa", "Brigitte", "Venture",
                "Soldier: 76", "Mei", "Lifeweaver", "Zenyatta"
            ],
            "D": ["Widowmaker", "Genji", "Moira", "Mercy"]
        },
        "confidence_score": 0.94,
        "analysis_notes": "TierMakerレイアウトを検出。S帯にD.Va・キリコ・ルシオ等の高機動キャラが集約されています。"
    }
    return result

def real_gemini_analyze(image_path: str, api_key: str):
    """
    実際のGEMINI_API_KEYを用いた実行
    """
    try:
        import google.generativeai as genai
    except ImportError:
        print("[!] 'google-generativeai' が未インストールです: pip install google-generativeai")
        return None

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-1.5-flash")

    with open(image_path, "rb") as f:
        image_bytes = f.read()

    response = model.generate_content([
        PROMPT_TIERLIST_ANALYZER,
        {"mime_type": "image/png", "data": image_bytes}
    ])
    
    clean_json = response.text.strip().replace("```json", "").replace("```", "")
    return json.loads(clean_json)

if __name__ == "__main__":
    target_img = sys.argv[1] if len(sys.argv) > 1 else "sample_tierlist.png"
    api_key = os.environ.get("GEMINI_API_KEY")

    if api_key:
        print("[+] GEMINI_API_KEY detected. Running live Vision inference...")
        res = real_gemini_analyze(target_img, api_key)
    else:
        print("[i] GEMINI_API_KEY not set. Running simulated PoC inference...")
        res = mock_analyze(target_img)

    print("\n--- [Analysis Result JSON] ---")
    print(json.dumps(res, indent=2, ensure_ascii=False))
