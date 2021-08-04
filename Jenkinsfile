pipeline {
    agent any
    environment {
        ANDROID_HOME= "/Users/kamilmucik/Library/Android/sdk"
        ANDROID_SDK_ROOT= "/Users/kamilmucik/Library/Android/sdk"
        ANDROID_AVD_HOME= "/Users/kamilmucik/.android/avd"
        PATH = "$PATH:$ANDROID_HOME/sdk:$ANDROID_HOME/tools:/usr/local/bin"
      }
    parameters {
        string(name: 'version_release', defaultValue: '0.0.1', description: 'Wersja publikacji')
        string(name: 'version_snapshot', defaultValue: '0.0.2-RC', description: 'Wersja rozwojowa')
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
                script {
                    try {
                        sh 'npm install'
                        sh 'rm -rf android/app/src/main/res/drawable-*'
                        sh 'npx mkdirp android/app/src/main/assets/ && react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/'
                        sh 'cd android/ && ./gradlew assembleDebug'
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

                sh 'ansible-playbook playbook_rc.yml -i hosts.yml --extra-vars "version=${version_snapshot}"'


                sh 'rm -rf android/app/src/main/res/drawable-*'
                sh 'echo "${version_release}" > version.properties'
                sh 'git add version.properties'
                sh 'git commit -m "Update version"'
                sh 'git push origin HEAD:master'
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
            }
        }
    }
}