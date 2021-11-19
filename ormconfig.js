module.exports = {
    "url": process.env.DATABASE_URL,
    "type": "postgres",
    "entities": [
        "./dist/modules/**/infra/typeorm/entities/*.js"
    ],
    "migrations": [
        "./dist/shared/infra/typeorm/migrations/*.js"
    ],
    "cli": {
        "migrationsDir": "./src/shared/infra/typeorm/migrations"
    }
}