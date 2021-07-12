
1. Utworz

- npx react-native init MegaFind

2. Uruchom/debug

- 

3. Release debug

- npx mkdirp android/app/src/main/assets/ && react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/ 
