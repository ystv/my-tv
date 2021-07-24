pipeline {
    agent any

    environment {
        REGISTRY_ENDPOINT = credentials('docker-registry-endpoint')
    }

    stages {
        stage('Update Components') {
            steps {
                sh "docker pull nginx:stable-alpine"
                sh "docker pull node:alpine"
            }
        }
        stage('Build') {
            stages {
                stage('Staging') {
                    when {
                        branch 'master'
                        not {
                            expression { return env.TAG_NAME ==~ /v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/ }
                        }
                    }
                    steps {
                        sh "docker build --build-arg REACT_APP_BUILD_ID_ARG=${env.BUILD_ID} --build-arg REACT_APP_SECURITY_BASEURL_ARG=https://auth.dev.ystv.co.uk --build-arg REACT_APP_API_BASEURL_ARG=https://api.dev.ystv.co.uk --build-arg REACT_APP_PUBLIC_BASEURL_ARG=https://dev.ystv.co.uk --build-arg REACT_APP_CREATOR_BASEURL_ARG=https://creator.dev.ystv.co.uk -t $REGISTRY_ENDPOINT/ystv/my-tv:$BUILD_ID ."
                    }
                }
                stage('Production') {
                    when {
                        expression { return env.TAG_NAME ==~ /v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/ } // Checking if it is main semantic version release
                    }
                    steps {
                        sh "docker build --build-arg REACT_APP_BUILD_ID_ARG=${env.BUILD_ID} --build-arg REACT_APP_SECURITY_BASEURL_ARG=https://auth.ystv.co.uk --build-arg REACT_APP_API_BASEURL_ARG=https://api.ystv.co.uk --build-arg REACT_APP_PUBLIC_BASEURL_ARG=https://ystv.co.uk --build-arg REACT_APP_CREATOR_BASEURL_ARG=https://creator.ystv.co.uk -t $REGISTRY_ENDPOINT/ystv/my-tv:$BUILD_ID ."
                    }
                }
            }
        }
        stage('Registry Upload') {
            steps {
                sh 'docker push $REGISTRY_ENDPOINT/ystv/my-tv:$BUILD_ID' // Uploaded to registry
            }
        }
        stage('Deploy') {
            stages {
                stage('Staging') {
                    when {
                        branch 'master'
                        not {
                            expression { return env.TAG_NAME ==~ /v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/ }
                        }
                    }
                    environment {
                        TARGET_SERVER = credentials('staging-server-address')
                    }
                    steps {
                        sshagent(credentials : ['staging-server-key']) {
                            script {
                                sh '''ssh -tt deploy@$TARGET_SERVER << EOF
                                    docker pull $REGISTRY_ENDPOINT/ystv/my-tv:$BUILD_ID
                                    docker rm -f ystv-my-tv
                                    docker run -d -p 8002:80 --name ystv-my-tv $REGISTRY_ENDPOINT/ystv/my-tv:$BUILD_ID
                                    docker image prune -a -f --filter "label=site=my-tv" --filter "label=stage=final" // remove old image
                                    exit 0
                                EOF'''
                            }
                        }
                    }
                }
                stage('Production') {
                    when {
                        expression { return env.TAG_NAME ==~ /v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/ } // Checking if it is main semantic version release
                    }
                    environment {
                        TARGET_SERVER = credentials('prod-server-address')
                    }
                    steps {
                        sshagent(credentials : ['prod-server-key']) {
                            script {
                                sh '''ssh -tt deploy@$TARGET_SERVER << EOF
                                    docker pull $REGISTRY_ENDPOINT/ystv/my-tv:$BUILD_ID
                                    docker rm -f ystv-my-tv
                                    docker run -d -p 8002:80 --name ystv-my-tv $REGISTRY_ENDPOINT/ystv/my-tv:$BUILD_ID
                                    docker image prune -a -f --filter "label=site=my-tv" --filter "label=stage=final"' // remove old image
                                    exit 0
                                EOF'''
                            }
                        }
                    }
                }
            }
        }
    }
    post {
        success {
            echo 'Very cash-money'
        }
        failure {
            echo 'That is not ideal'
        }
        always {
            script {
                try {
                    sh "docker image prune -f --filter label=site=my-tv --filter label=stage=builder --filter label=build=\$((${env.BUILD_NUMBER} - 1))" // Removing the pervious local builder image (keeps latest one for potential yarn install caching goodness)
                }
                catch (err) {
                    echo "Couldn't find old build to delete"
                    echo err.getMessage()
                }
            }
            sh 'docker image rm $REGISTRY_ENDPOINT/ystv/my-tv:$BUILD_ID || true' // Removing the local builder image
            sh 'docker image prune -a -f --filter "label=site=my-tv" --filter "label=stage=final" || true' // remove old image
        }
    }
}
