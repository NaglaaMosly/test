const sonarqubeScanner = require('sonarqube-scanner');
sonarqubeScanner(
  {
    serverUrl: 'http://10.95.0.181:31500',
    options: {
      'sonar.sources': '.',
      'sonar.inclusions': 'src/**',
      'sonar.branch' : 'develop'
    },
  },
  () => {}
);
