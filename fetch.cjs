
const https = require("https");
function getP(q) {
  return new Promise(r => {
    https.get("https://unsplash.com/napi/search/photos?query=" + encodeURIComponent(q) + "&per_page=1", {
      headers: { "User-Agent": "Mozilla/5.0" }
    }, res => {
      let d = ""; res.on("data", c => d+=c);
      res.on("end", () => {
        try { r(JSON.parse(d).results[0].id); } catch(e) { r("error"); }
      })
    })
  })
}
async function run() {
  const queries = {
    opera: "opera singer",
    jazz: "jazz band",
    cumpleanos: "birthday party",
    iglesia: "church architecture",
    cumbia: "salsa dance",
    balada_pop_hombre: "man singing microphone",
    balada_pop_mujer: "woman singing microphone",
    tango: "tango dance"
  };
  for (const [k, q] of Object.entries(queries)) {
    console.log(k + ":" + await getP(q));
  }
}
run();

