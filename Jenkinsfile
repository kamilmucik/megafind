pipeline {
    agent any
    environment {
        ANDROID_HOME= "/Users/kamilmucik/Library/Android/sdk"
        ANDROID_SDK_ROOT= "/Users/kamilmucik/Library/Android/sdk"
        ANDROID_AVD_HOME= "/Users/kamilmucik/.android/avd"
        PATH = "$PATH:$ANDROID_HOME/sdk:$ANDROID_HOME/tools:/usr/local/bin"
      }
    parameters {
        string(name: 'YOUR_USERNAME', defaultValue: 'ubuntu')
        password(name: 'YOUR_PASSWORD', defaultValue: 'secret')
      }
    stages {
        stage ('Prepare') {
          steps {
            echo "PATH is: $PATH"
          }
        }
        stage('Build') {
            steps {
                echo 'Building..'
//                 script {
//                     try {
//                         sh 'npm install'
//                         sh 'rm -rf android/app/src/main/res/drawable-*'
//                         sh 'npx mkdirp android/app/src/main/assets/ && react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/'
//                         sh 'cd android/ && ./gradlew assembleDebug'
//                     } finally { //Make checkstyle results available
//                         //checkstyle canComputeNew: false, defaultEncoding: '', healthy: '', pattern: 'publicapi/frontend/tslint-result.xml', unHealthy: ''
//                     }
//                 }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                echo "Hello ${params.YOUR_USERNAME}"
                echo "Your password is ${YOUR_PASSWORD}"
                echo "secret"

                sh 'touch file.txt'
                sh "sshpass -p ${YOUR_PASSWORD} scp file.txt ubuntu@e-strix.pl:/var/www/e-strix.pl/public_html/pobierz/"

                sh 'rsync -v'
//                 wrap([$class: 'MaskPasswordsBuildWrapper', varPasswordPairs: [[var: 'KEY', password: KEY]], varMaskRegexes: []]) {
//                             sh "echo ${KEY}"
//                         }
//                 withCredentials([string(credentialsId: 'pass', variable: 'password1')]) {
//                     echo "'${password1}'!"
//                 }

// stage('Deploy') {
//             when {
//               expression {
//                 currentBuild.result == null || currentBuild.result == 'SUCCESS'
//               }
//             }
//             steps {
//                 sh 'make publish'
//             }
//         }
//                 sh 'scp android/app/build/outputs/apk/debug/app-debug.apk ubuntu@e-strix.pl:/var/www/e-strix.pl/public_html/pobierz/megafind-0.0.1_RC.apk'
            }
        }
    }
}