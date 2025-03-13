import {
  addNewMember,
  deleteMemberById,
  getMemberById,
  getMembers,
  getRoleByParent,
  getRoles,
  updateMemberById,
} from "../../../controllers/members.js";

export const resolvers = {
  Query: {
    members: getMembers,
    member: getMemberById,
    roles: getRoles,
  },
  /**
   * * Nested Resolver (Member -> Role)
   * ? We can fetch member fields with roles field.
   * ex: query GetMembers{
   *        members {
   *            id
   *            name
   *            role {
   *                as
   *            }
   *        }
   *    }
   */
  Member: {
    role: getRoleByParent,
  },

  Mutation: {
    addMember: addNewMember,
    updateMember: updateMemberById,
    deleteMember: deleteMemberById,
  },
};
