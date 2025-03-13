import { GraphQLError } from "graphql";
import { membersDb, rolesDb } from "../db/index.js";
import { checkDb, saveDb } from "../utils/dbActions.js";
import getId from "../utils/idGenerator.js";

// * Queries
/**
 * ? This will get the members list, it can also fetch the roles properties because of nested resolver
 * @returns [Member]
 */
export const getMembers = () => checkDb(membersDb);

/**
 * ? This will get the member properties by id
 * @param {*} _ - also means parent param
 * @param {string} id - destructured from args param
 * @returns {} Member
 */
export const getMemberById = (_, { id }) => {
  const member = checkDb(membersDb);
  return member.find((member) => member.id === id);
};

/**
 * ? This will get the list of roles.
 * @returns [Role]
 */
export const getRoles = () => checkDb(rolesDb);

/**
 * ? This resolver requires to access the previous return data which is passed as parent argument.
 * @param {string} roleId - destructured from parent param
 * @return {} Role
 */
export const getRoleByParent = ({ roleId }, _) => {
  const roles = checkDb(rolesDb);
  return roles.find((role) => role.id === roleId);
};

// * Mutations
/**
 * ? This will create a new member and save it in the json files.
 * @param {string} name
 * @param {string} email
 * @param {number} age
 * @param {string} role
 * @returns String
 */
export const addNewMember = (_, { name, email, age, role }) => {
  // Get the json
  const members = checkDb(membersDb);
  const roles = checkDb(rolesDb);

  // Check if the member exists. If does throw an error, otherwise proceed to create.
  const memberExists = members.find(
    (mem) => mem.name === name || mem.email === email
  );

  if (memberExists) {
    throw new GraphQLError("Member already exists", {
      extensions: {
        code: "ALREADY_EXISTS",
      },
    });
  }

  // Object data
  const newRole = {
    id: String(getId("Roles", roles)),
    as: role,
  };

  const newMember = {
    id: String(getId("Members", members)),
    name,
    email,
    age,
    roleId: newRole.id,
  };

  // Add it in an array
  members.push(newMember);
  roles.push(newRole);

  // Save the changes in the json files
  saveDb(membersDb, members);
  saveDb(rolesDb, roles);

  return "New member created!";
};

/**
 * ? This will update member properties by id.
 * @param {string} id
 * @param {string} newName
 * @param {number} newAge
 * @param {string} newEmail
 * @param {string} newRole
 * @returns String
 */
export const updateMemberById = (
  _,
  { id, newName, newAge, newEmail, newRole }
) => {
  // Get the json files
  const members = checkDb(membersDb);
  const roles = checkDb(rolesDb);

  // Find the member, throw an error if member not found.
  const member = members.find((mem) => mem.id === id);

  if (!member) {
    throw new GraphQLError("Member not found!", {
      extensions: {
        code: "NOT_FOUND",
      },
    });
  }

  // Find the member role from the role array
  const memberRole = roles.find((role) => role.id === member.roleId);

  // Update the fields for both members and roles
  member.name = newName || member.name;
  member.age = newAge || member.age;
  member.email = newEmail || member.email;

  memberRole.as = newRole || memberRole.as;

  // Save the changes in json files.
  saveDb(membersDb, members);
  saveDb(rolesDb, roles);

  return `Member with id: ${member.id} updated successfully!`;
};

/**
 * ? This will delete the member by id from json files along with its data from roles database.
 * @param {string} id
 * @returns String
 */
export const deleteMemberById = (_, { id }) => {
  // Get the json files
  let members = checkDb(membersDb);
  let roles = checkDb(rolesDb);

  // Check if member exists, if not throw an error, otherwise delete it from the database.
  const member = members.find((mem) => mem.id === id);

  if (!member) {
    throw new GraphQLError("Member not found", {
      extensions: {
        code: "NOT_FOUND",
      },
    });
  }

  // Remove the data from array using filter method.
  members = members.filter((mem) => mem.id !== member.id);
  roles = roles.filter((role) => role.id !== member.roleId);

  // Save the changes in json files.
  saveDb(membersDb, members);
  saveDb(rolesDb, roles);

  return `Member deleted with id: ${member.id} successfully!`;
};
