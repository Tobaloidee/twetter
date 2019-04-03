// Imports
import Server from "./server";

// Utils
import Logger from "./utils/logger";

const PORT = 8080 || process.env.PORT;

Server.listen(PORT, () => {
  Logger.info(`Express server listening on PORT ${PORT}`);
});
