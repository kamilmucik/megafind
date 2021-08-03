pipeline {
    agent any
    environment {
        ANDROID_HOME= "/Users/kamilmucik/Library/Android/sdk"
        ANDROID_SDK_ROOT= "/Users/kamilmucik/Library/Android/sdk"
        ANDROID_AVD_HOME= "/Users/kamilmucik/.android/avd"
        PATH = "$PATH:$ANDROID_HOME/sdk:$ANDROID_HOME/tools"
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
                script {
                    try {
                        sh 'rm -rf android/app/src/main/res/drawable-*'
                        sh 'npx mkdirp android/app/src/main/assets/ && react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/'
                        sh 'cd android/ && ./gradlew assembleDebug'
                        // sh 'gradle clean android -b collector/build.gradle'
                    } finally { //Make checkstyle results available
                        //checkstyle canComputeNew: false, defaultEncoding: '', healthy: '', pattern: 'publicapi/frontend/tslint-result.xml', unHealthy: ''
                    }
                }
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
            }
        }
    }
}