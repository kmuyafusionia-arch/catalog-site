const { getStore } = require("@netlify/blobs");

// 環境変数から認証情報を取得する関数
const getStoreWithAuth = () => {
  // 環境変数 NETLIFY_BLOBS_TOKEN がもしあればそれを使う
  // なければ、最低限サイトIDだけで接続を試みる
  return getStore({
    name: "workwear",
    siteID: "musical-longma-2e09c0",
    token: process.env.NETLIFY_BLOBS_TOKEN || undefined 
  });
};

exports.handler = async (event) => {
  try {
    const store = getStoreWithAuth();
    
    // ここで実際に何かをセットしてみる（デバッグ用）
    await store.set("check", "ok");
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Blobs接続成功！" })
    };
  } catch (error) {
    // ここでエラー内容をしっかりログに出す
    console.error("Blobs接続エラー詳細:", error);
    return {
      statusCode: 502,
      body: JSON.stringify({ error: error.message, stack: error.stack })
    };
  }
};
