module.exports = {
  apps: [
    {
      name: "titanium",
      script: "npm",
      args: "start",
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],

  deploy: {
    production: {
      user: "olaoluwa",
      host: "164.92.84.16",
      ref: "origin/master",
      repo: "git@github.com:Olaoluwa402/test-titan.git",
      path: "/var/www/production",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.cjs --env production",
    },
  },
};
