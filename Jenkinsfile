String registryEndpoint = 'registry.comp.ystv.co.uk'

def image
String imageName = "ystv/my-tv:${env.BRANCH_NAME}-${env.BUILD_ID}"

pipeline {
  agent {
    label 'docker'
  }

  environment {
    HOME = '.'
    DOCKER_BUILDKIT = '1'
  }

  stages {
    stage('Update Components') {
        steps {
            sh "docker pull nginx:stable-alpine"
            sh "docker pull node:18"
        }
    }
    stage('Build image') {
      steps {
        script {
          docker.withRegistry('https://' + registryEndpoint, 'docker-registry') {
            image = docker.build(imageName, "--build-arg REACT_APP_BUILD_ID_ARG=${env.BRANCH_NAME}-${env.BUILD_ID} .")
          }
        }
      }
    }

    stage('Push image to registry') {
      steps {
        script {
          docker.withRegistry('https://' + registryEndpoint, 'docker-registry') {
            image.push()
            if (env.BRANCH_IS_PRIMARY) {
              image.push('latest')
            }
          }
        }
      }
    }

    stage('Deploy') {
      stages {
        stage('Development') {
          when {
            expression { env.BRANCH_IS_PRIMARY }
          }
          steps {
            build(job: 'Deploy Nomad Job', parameters: [
              string(name: 'JOB_FILE', value: 'my-tv-dev.nomad'),
              text(name: 'TAG_REPLACEMENTS', value: "${registryEndpoint}/${imageName}")
            ])
          }
        }

        stage('Production') {
          when {
            // Checking if it is semantic version release.
            expression { return env.TAG_NAME ==~ /v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/ }
          }
          steps {
            build(job: 'Deploy Nomad Job', parameters: [
              string(name: 'JOB_FILE', value: 'my-tv-prod.nomad'),
              text(name: 'TAG_REPLACEMENTS', value: "${registryEndpoint}/${imageName}")
            ])
          }
        }
      }
    }
  }
}
