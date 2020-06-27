pipeline {

    agent any

    stages {
        stage('Build the Test Automation Application') {
            nodejs('nodejs-14_40') {
                sh 'npm install'
            }
        }

        stage('End to End Testing') {
            steps {
                nodejs('nodejs-14_40') {
                    sh 'npx cypress run'
                }
            }
        }
    }
}