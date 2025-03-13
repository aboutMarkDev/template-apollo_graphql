import { GraphQLError } from "graphql";

/**
 * * This will generate the id for member and for role database.
 * ? Implement this to avoid the same id for both database
 * @param {string} dbName
 * @param {[]} arr
 * @returns Number
 */
export default function getId(dbName, arr) {
  // If there's data inside of an array use the id of the last element to create for the new data/member and just increment it.
  // Otherwise, return 1 or 101.
  const lastId = arr.length > 0 ? parseInt(arr[arr.length - 1].id) + 1 : null;

  // If the lastId is null return 1 or 101 it depends on the dbName, otherwise return the lastId.
  switch (dbName) {
    case "Members":
      return lastId ?? 1;

    case "Roles":
      return lastId ?? 101;

    default:
      throw new GraphQLError(`Unknown database name: ${dbName}`, {
        extensions: {
          code: "INTERNAL_SERVER_ERROR",
        },
      });
  }
}
