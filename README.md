
1. Utworz

- npx react-native init MegaFind
- npm install @react-navigation/native
- expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
- npm install @react-navigation/stack
- npm install date-fns
- npm install @react-navigation/drawer
- npm install @react-native-async-storage/async-storage
- npm install @react-native-community/cameraroll --save
- npm install react-native-image-picker --save
- react-native link react-native-image-picker
2. Uruchom/debug

- react-native start --port 8082
- npm run android

3. Release debug


- rm -rf android/app/src/main/res/drawable-*
- npx mkdirp android/app/src/main/assets/ && react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/ 


- npx mkdirp android/app/src/main/assets/ && react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/ 

- cd android/ && ./gradlew assembleRelease

rm -rf android/app/src/main/res/drawable-*
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/build/intermediates/res/merged/release/
cd android && ./gradlew assembleRelease


DEBUG
- cd android/ && ./gradlew assembleDebug

scp app/build/outputs/apk/debug/app-debug.apk ubuntu@e-strix.pl:/var/www/e-strix.pl/public_html/pobierz/