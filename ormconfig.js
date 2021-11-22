module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "extra": {
    "ssl": {
      "require": true,
      "rejectUnauthorized": false
    }
  },
  "entities": [
    "./build/modules/**/infra/typeorm/entities/*.js"
  ],
  "migrations": [
    "./build/shared/infra/typeorm/migrations/*.js"
  ],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}