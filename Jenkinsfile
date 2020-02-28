pipeline {
    agent none
    triggers {
        pollSCM('*/1 * * * *')
    }
    environment {
        CI = 'true'
        DOCKER_REGISTER = credentials('oyster-docker-register')
        oyster_web_sentry_dsn = credentials('oyster_web_sentry_dsn')
        docker_hub_username = credentials('docker_hub_username')
        docker_hub_password = credentials('docker_hub_password')
    }
    stages {
        stage('CI') {
            agent {
                docker {
                    image 'node:12.14.0-stretch'
                }
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
                        sh "cd client && sed '1 a   oysterWebSentryDsn: \"$oyster_web_sentry_dsn\",' src/environments/environment.prod.ts && npm run build"
                        sh "cd client && cat src/environments/environment.prod.ts"
                        sh "cd client &&  git checkout src/environments/environment.prod.ts"
                    }
                }
            }
        }
        stage("Dockerize") {
            agent {
                docker {
                    image 'docker:19.03.5'
                    args '-v /var/run/docker.sock:/var/run/docker.sock'
                }
            }
            stages {
                stage('Build Image') {
                    steps {
                        sh "cd client && docker build . -t $DOCKER_REGISTER/oyster-web:latest"
                        sh "cd server && docker build . -t $DOCKER_REGISTER/oyster-server:latest"
                    }
                }
                stage('Registry Login') {
                    steps {
                        sh "echo $docker_hub_password | docker login -u $docker_hub_username --password-stdin"
                    }
                }
                stage('Publish image') {
                    steps {
                        sh "docker push $DOCKER_REGISTER/oyster-web:latest"
                        sh "docker push $DOCKER_REGISTER/oyster-server:latest"
                    }
                }
                stage('Remove image') {
                    steps {
                        sh "docker image rm $DOCKER_REGISTER/oyster-web:latest"
                        sh "docker image rm $DOCKER_REGISTER/oyster-server:latest"
                    }
                }
            }
        }

    }
    post {
        always {
            rocketSend currentBuild.currentResult
        }
    }
}