
const https = require("https");
function getP(q) {
  return new Promise(r => {
    https.get("https://unsplash.com/napi/search/photos?query=" + q + "&per_page=1", res => {
      let d = ""; res.on("data", c => d+=c);
      res.on("end", () => {
        try { r(JSON.parse(d).results[0].id); } catch(e) { r("error"); }
      })
    })
  })
}
async function run() {
  const queries = ["opera singer", "jazz band", "birthday cake", "church inside", "cumbia dance", "man singing microphone", "woman singing microphone", "tango dance"];
  for (const q of queries) {
    console.log(q, await getP(q));
  }
}
run();

