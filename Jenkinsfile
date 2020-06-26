pipeline {

    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
        }
    }

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