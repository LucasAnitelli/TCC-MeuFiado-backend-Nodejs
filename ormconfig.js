module.exports = {
    "url": process.env.DATABASE_URL,
    "type": "postgres",
    "entities": [
        "./src/modules/**/infra/typeorm/entities/*.ts"
    ],
    "migrations": [
        "./src/shared/infra/typeorm/migrations/*.ts"
    ],
    "cli": {
        "migrationsDir": "./src/shared/infra/typeorm/migrations"
    }
}