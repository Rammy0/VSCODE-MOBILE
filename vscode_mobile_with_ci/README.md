# VSCode-Mobile-Scaffold
A ready-to-build scaffold for a **VSCode-like** mobile code editor app using **Ionic/Capacitor + Monaco Editor**.

This scaffold provides:
- A web-based editor UI (Monaco) that runs inside a mobile WebView (Capacitor).
- Pre-bundled Monaco languages (JavaScript, TypeScript, Python, Go, Java, C/C++) and themes.
- Instructions to build for Android (APK) and iOS (IPA).

## Important notes & limitations
- This scaffold is a **self-contained starter**. Bundling *every* extension (like full LSP servers) into a phone app is large and complex. Instead this scaffold includes:
  - Monaco editor with common language syntax highlighting/autocomplete.
  - A simple file explorer using the device filesystem (with Capacitor FileSystem).
  - A terminal panel that can connect to a remote shell (requires a separate backend) or integrate with Termux on Android.
- For full language servers (LSP) you have options:
  1. Run LSPs remotely (container / cloud) and connect via WebSocket.
  2. Use wasm-built language tools (some exist).
  3. Use local services (Termux or bundled native libraries) — advanced and device-specific.

## What you get in the zip
- `www/` — web assets (index.html, scripts, styles).
- `package.json` — node/npm metadata for the web layer.
- `capacitord.config.json` — Capacitor config template.
- `README.md` — this file with build instructions.

## How to build (Android)
1. Install Node.js (18+), npm, Ionic CLI, and Capacitor:
   ```
   npm install -g @ionic/cli
   npm i
   npx cap init
   ```
2. Add Android platform:
   ```
   npx cap add android
   npx cap copy
   ```
3. Open Android Studio:
   ```
   npx cap open android
   ```
   Then build a release APK and sign it.

## How to build (iOS)
1. On macOS with Xcode installed:
   ```
   npx cap add ios
   npx cap open ios
   ```
2. Use Xcode to build and sign.

## Extend with more features
- To add remote LSPs: build a small server with `code-server` or `theia` in a Docker container and connect via WebSocket.
- To add terminals: integrate with Termux (Android) via Intents or use an SSH backend.
- To include additional Monaco languages: add them in `www/lib/monaco-languages.js`.

## License & warnings
This scaffold is provided for educational and development purposes. It does **not** include any proprietary VS Code source. Respect extension licenses when bundling.
