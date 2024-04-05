import { app } from "./config/app";
import { config } from "dotenv";
import { sequelizeConnect } from "./config/sequelize";
import { envConfig } from "./config/envConfig";
config();

const start = async () => {
  const port = process.env.PORT || 3000;
  envConfig();
  try {
    await sequelizeConnect();

    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
