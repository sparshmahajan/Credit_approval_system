export const envConfig = () => {
  if (!process.env.DB_NAME) {
    throw new Error("DB_NAME must be defined");
  }
  if (!process.env.DB_USER) {
    throw new Error("DB_USER must be defined");
  }
  if (!process.env.DB_PASS) {
    throw new Error("DB_PASS must be defined");
  }
  if (!process.env.DB_HOST) {
    throw new Error("DB_HOST must be defined");
  }
  if (!process.env.DB_PORT) {
    throw new Error("DB_PORT must be defined");
  }
  if (!process.env.DB_DIALECT) {
    throw new Error("DB_DIALECT must be defined");
  }
};
