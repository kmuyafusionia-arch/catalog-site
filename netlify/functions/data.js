const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
  // 環境変数の代わりに、ここに直接トークンを書いてみる
  const store = getStore({
    name: "workwear",
    siteID: "musical-longma-2e09c0",
    token: "nfp_F6yqRGUejRvJHP97woeVJkLzhtNJUXcdf36f" 
  });

  try {
    await store.set("check", "ok");
    return { statusCode: 200, body: "成功！" };
  } catch (error) {
    console.error("エラー詳細:", error);
    return { statusCode: 502, body: JSON.stringify({ error: error.message }) };
  }
};

