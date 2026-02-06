module.exports = {
  apps: [
    {
      name: 'discord-block-builder',
      script: 'server.js',
      cwd: __dirname,
      watch: false,
      env: {
        NODE_ENV: 'production'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};

// Also run relaunch-bots.js to re-create bot files and start bots under PM2 on boot
module.exports.apps.push({
  name: 'relaunch-bots',
  script: 'relaunch-bots.js',
  cwd: __dirname,
  watch: false,
  env: { NODE_ENV: 'production' },
  env_production: { NODE_ENV: 'production' }
});
