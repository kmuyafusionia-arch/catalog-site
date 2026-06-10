const { getStore } = require("@netlify/blobs");

const ADMIN_ID = "fusionia";
const ADMIN_PW = "nieg3j3532f";
const BLOB_KEY = "catalog";

// ストアはハンドラーの外で初期化する！
const store = getStore({
  name: "workwear",
  siteID: "musical-longma-2e09c0"
});
// ===== 初期データ =====
const INITIAL = {
  cats: [{ id: 1, name: "Tシャツ", img: null, active: true }],
  prods: [],
  colorMaster: [],
  nextCatId: 2,
  nextProdId: 1,
  nextColorId: 1,
};

exports.handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers };

  // GET: データ取得
  if (event.httpMethod === "GET") {
    try {
      const data = await store.get(BLOB_KEY);
      return { 
        statusCode: 200, 
        headers, 
        body: data ? data : JSON.stringify(INITIAL) 
      };
    } catch (e) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
    }
  }

  // POST: データ保存
  if (event.httpMethod === "POST") {
    const auth = event.headers["authorization"] || "";
    const encoded = Buffer.from(`${ADMIN_ID}:${ADMIN_PW}`).toString("base64");
    
    if (auth !== `Basic ${encoded}`) {
      return { statusCode: 401, headers, body: JSON.stringify({ error: "Unauthorized" }) };
    }

    try {
      // event.body は既に文字列なのでそのまま保存
      await store.set(BLOB_KEY, event.body);
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
    } catch (e) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
    }
  }

  return { statusCode: 405, headers };
};
