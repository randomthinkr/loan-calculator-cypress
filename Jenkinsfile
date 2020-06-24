pipeline {

    agent any

    stages {
        stage('Build the Test Automation Application') {
            steps {
                sh 'npm install'
            }
        }

        stage('End to End Testing') {
            steps {
                sh 'npx cypress run'
            }
        }
    }
}