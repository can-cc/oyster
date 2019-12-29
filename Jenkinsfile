pipeline {
    agent {
        docker {
            image 'node:12.14.0-stretch'
        }
    }
    triggers {
        pollSCM('*/1 * * * *')
    }
    environment {
        CI = 'true' 
    }
    stages {
        stage('Server Build') {
            steps {
                sh 'cd server && npm install'
            }
        }
        stage('Server Test') { 
            steps {
                sh 'cd server && npm run test' 
            }
        }
    }
}