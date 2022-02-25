const devEnv = {
  type: "postgres",
  url: "postgresql://postgres:kenziemarket_pass@localhost:5432/kenziemarket_db",
  entities: ["./src/entities/**/*.ts"],
  migrations: ["./src/database/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
  logging: true,
};

module.exports = devEnv;
