const { contextBridge } = require("electron");
const fs = require("fs");
const path = require("path");

contextBridge.exposeInMainWorld("hajimeData", {
  load: () => {
    const dataPath = path.join(__dirname, "data", "mock.json");
    return JSON.parse(fs.readFileSync(dataPath, "utf8"));
  }
});
