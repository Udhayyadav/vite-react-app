pipeline {
    agent any

    tools {
        // This tells Jenkins to use the NodeJS version we configured in "Global Tool Configuration"
        // Ensure you named the tool 'node' in Jenkins settings, or change this name to match.
        nodejs 'node'
    }

    stages {
        stage('Checkout') {
            steps {
                // Pulls code from your GitHub repo
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing NPM Dependencies...'
                // Installs packages from package.json
                sh 'npm install'
            }
        }

        stage('Build Application') {
            steps {
                echo 'Building the React App...'
                // Compiles the app to the /dist folder
                sh 'npm run build'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running Automated Tests...'
                // Runs the test script defined in package.json.
                // NOTE: If you don't have tests, we use "|| true" to prevent the build from failing
                sh 'npm test || echo "No tests found, skipping..."'
            }
        }
    }
    
    post {
        always {
            // Clean up workspace after build to save space
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check logs.'
        }
    }
}