const { app, BrowserWindow } = require("electron");
const path = require("path");

async function runSmoke() {
  const win = new BrowserWindow({
    width: 1440,
    height: 960,
    show: false,
    backgroundColor: "#ffffff",
    webPreferences: {
      preload: path.join(__dirname, "..", "src", "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  await win.loadFile(path.join(__dirname, "..", "src", "renderer", "index.html"));

  const result = await win.webContents.executeJavaScript(`
    (async () => {
      const wait = () => new Promise((resolve) => setTimeout(resolve, 30));
      const waitFor = async (selector) => {
        for (let index = 0; index < 50; index += 1) {
          const element = document.querySelector(selector);
          if (element) return element;
          await wait();
        }
        throw new Error("Timed out waiting for " + selector);
      };
      const text = () => document.body.innerText;
      const clickScreen = async (screen) => {
        const button = await waitFor('[data-screen="' + screen + '"]');
        button.click();
        await wait();
      };

      await waitFor(".nav-button");
      const checks = [];
      checks.push(["landing", text().includes("Start your Japanese business.")]);
      checks.push(["nav", document.querySelectorAll(".nav-button").length === 8]);

      await clickScreen("pricing");
      checks.push(["pricing", text().includes("DIY Blueprint") && text().includes("Enterprise")]);

      await clickScreen("dashboard");
      checks.push(["dashboard", text().includes("Client dashboard") && text().includes("Upcoming tasks")]);

      await clickScreen("partners");
      checks.push(["partners", text().includes("Immigration attorney") && text().includes("Insurance")]);

      await clickScreen("documents");
      checks.push(["documents", text().includes("Requested") && text().includes("Under review")]);

      await clickScreen("timeline");
      checks.push(["timeline-gantt", text().includes("Business Plan") && text().includes("Gantt")]);
      document.querySelector('[data-mode="kanban"]').click();
      await wait();
      checks.push(["timeline-kanban", text().includes("Kanban") && text().includes("Completion")]);

      await clickScreen("admin");
      checks.push(["admin", text().includes("Revenue") && text().includes("Partner assignments")]);

      return checks;
    })();
  `);

  const failed = result.filter(([, passed]) => !passed);
  result.forEach(([name, passed]) => console.log(`${passed ? "PASS" : "FAIL"} ${name}`));

  if (failed.length > 0) {
    process.exitCode = 1;
  }

  win.destroy();
  app.quit();
}

app.whenReady().then(runSmoke).catch((error) => {
  console.error(error);
  app.exit(1);
});
