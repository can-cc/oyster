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
        oyster_web_sentry_dsn = credentials('oyster_web_sentry_dsn')
    }
    stages {
        stage('Server build') {
            steps {
                sh 'cd server && npm install'
            }
        }
        stage('Server test') { 
            steps {
                sh 'cd server && npm run test:ci' 
            }
        }
        stage('Client install') {
            steps {
                sh 'cd client && npm install' 
            }
        }
        stage('Client test') {
            steps {
                sh 'cd client && npm run test:ci' 
            }
        }
        stage('Client build') {
            steps {
                sh "cd client && sed '1 a   oysterWebSentryDsn: \"$oyster_web_sentry_dsn\"' src/environments/environment.prod.ts"
                sh "cd client && cat src/environments/environment.prod.ts"
                sh 'cd client && npm run build' 
                sh "cd client &&  git checkout src/environments/environment.prod.ts"
            }
        }
    }
    post {
        always {
            rocketSend currentBuild.currentResult
        }
    }
}