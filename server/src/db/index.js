import { configDotenv } from "dotenv";
configDotenv();

const membersDb = process.env.MEMBERS_PATH;
const rolesDb = process.env.ROLES_PATH;

export { rolesDb, membersDb };
