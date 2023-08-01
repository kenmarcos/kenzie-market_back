const devEnv = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ["./src/entities/**/*.ts"],
  migrations: ["./src/database/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
  logging: true,
};

// const prodEnv = {
//   type: "postgres",
//   url: process.env.DATABASE_URL,
//   entities: ["./dist/entities/**/*.js"],
//   migrations: ["./dist/database/migrations/*.js"],
//   cli: {
//     migrationsDir: "./dist/database/migrations",
//   },
//   ssl:
//     process.env.NODE_ENV === "production"
//       ? { rejectUnauthorized: false }
//       : false,
// };

// module.exports = process.env.NODE_ENV === "production" ? prodEnv : devEnv;
module.exports = devEnv;
