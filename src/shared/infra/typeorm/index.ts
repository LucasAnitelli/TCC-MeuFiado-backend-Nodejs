import { createConnection } from 'typeorm';

require("dotenv").config();

const rootDir = process.env.NODE_ENV === "development" ?
  "src" :
  "build";

const extensionFile = process.env.NODE_ENV === "development" ?
  "ts" :
  "js";

const config: any = {

  type: "postgres",
  //url: process.env.DATABASE_URL,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT || 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: process.env.TYPEORM_SYNCHRONIZE,
  extra: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  entities: [
    rootDir + `/modules/**/infra/typeorm/entities/*.${extensionFile}`
  ],
  migrations: [
    rootDir + `/shared/infra/typeorm/migrations/*.${extensionFile}`
  ],
  cli: {
    "migrationsDir": rootDir + "/shared/infra/typeorm/migrations"
  }
};

createConnection(config);