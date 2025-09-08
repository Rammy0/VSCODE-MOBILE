# VSCode Mobile - Build APK via GitHub Actions

This repository contains a web-layer (www/) for a VSCode-like mobile app (Monaco + Capacitor-ready).  
It includes a GitHub Actions workflow that will **build an Android APK (release)** for you on push to `main`/`master`.

How to get an installable APK without installing Android SDK locally
1. Create a new GitHub repository and push all files from this repo.
2. On GitHub, go to **Actions** → you should see the "Build Android APK (Capacitor)" workflow.
3. Run the workflow (or push to `main`). It will:
   - Install Node.js, Java, Android command-line tools.
   - Initialize Capacitor Android (if not already present) and run `./gradlew assembleRelease`.
   - Upload the resulting APK as a workflow artifact (downloadable from the Actions run).

Notes & signing
- The APK produced in CI will be a release build. To install on a phone, Android requires it be signed. Gradle will sign release builds only if you provide a signing config.
- If you want a **signed** final APK (for Play Store or normal installs), you should:
  1. Create a keystore locally: `keytool -genkey -v -keystore upload-keystore.jks -alias upload -keyalg RSA -keysize 2048 -validity 10000`
  2. Add the keystore to the Android project and configure `android/gradle.properties` and `android/app/build.gradle` with signing configs.
  3. For GitHub Actions, store keystore and passwords as Encrypted Secrets and update the workflow to import them before building.

If you want, I can:
- Add the keystore-aware signing steps to the workflow (you'll need to provide secrets).
- Produce a preconfigured `android/` project instead of letting the workflow run `npx cap add android`.
- Help you push this repo to GitHub and configure the Actions run.

