pipeline {
    agent {
        docker {
            image '12.14.0-stretch'
        }
    }
    environment {
        CI = 'true' 
    }
    stages {
        stage('Server Build') {
            steps {
                sh "cd server"
                sh 'npm install'
            }
        }
        stage('Server Test') { 
            steps {
                sh "cd server"
                sh 'npm run test' 
            }
        }
    }
}