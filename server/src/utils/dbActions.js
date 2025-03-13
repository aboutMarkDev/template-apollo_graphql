import fs from "fs";

/**
 * ? This will check if the json file exists and parse the json, otherwise return an empty array.
 * @param {.JSON} db
 * @returns .json || []
 */
const checkDb = (db) => {
  if (fs.existsSync(db)) {
    const dataBuffer = fs.readFileSync(db);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } else {
    return [];
  }
};

/**
 * ? This will overwrite the currentDb by updatedDb, or it will save what is changes has made to updatedDb
 * @param {.JSON} currentDb
 * @param {.JSON} updatedDb
 */
const saveDb = (currentDb, updatedDb) => {
  const dataJSON = JSON.stringify(updatedDb);
  fs.writeFileSync(currentDb, dataJSON);
};

export { checkDb, saveDb };
