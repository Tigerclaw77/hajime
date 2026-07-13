import { spawn, spawnSync } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const baseUrl = "http://127.0.0.1:3100";
const environment = {
  ...process.env,
  NEXT_DIST_DIR: ".next-smoke",
  NEXT_PUBLIC_SITE_URL: baseUrl,
};

const server = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "dev",
    "--hostname",
    "127.0.0.1",
    "--port",
    "3100",
  ],
  { env: environment, stdio: "inherit" },
);

async function waitForServer() {
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${baseUrl}/sign-in`);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }
    await delay(250);
  }
  throw new Error("Next.js did not become ready within 60 seconds.");
}

function runPlaywright() {
  return new Promise((resolve, reject) => {
    const testProcess = spawn(
      process.execPath,
      ["node_modules/@playwright/test/cli.js", "test"],
      { env: environment, stdio: "inherit" },
    );
    testProcess.once("error", reject);
    testProcess.once("exit", (code) => resolve(code ?? 1));
  });
}

function stopServer() {
  if (!server.pid) return;
  if (process.platform === "win32") {
    spawnSync("taskkill", ["/pid", String(server.pid), "/T", "/F"], {
      stdio: "ignore",
    });
    return;
  }
  server.kill("SIGTERM");
}

let exitCode = 1;
try {
  await waitForServer();
  exitCode = await runPlaywright();
} finally {
  stopServer();
}

process.exit(exitCode);
