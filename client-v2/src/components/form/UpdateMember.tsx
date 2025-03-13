/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation } from "@apollo/client";
import { useState } from "react";
import { UPDATE_MEMBER } from "../../services/graphql";
import Button from "../Button";
import toast from "react-hot-toast";
import { UpdateMemberProps } from "../../types/index.types";

const UpdateMember = ({ setIsModalOpen, data, refetch }: UpdateMemberProps) => {
  const [updateMember] = useMutation(UPDATE_MEMBER);

  // ? TRY TO OPTIMIZE THE DATA...

  // Form field state
  const [newName, setNewName] = useState(data?.member.name);
  const [newEmail, setNewEmail] = useState(data?.member.email);
  const [newAge, setNewAge] = useState(data?.member.age);
  const [newRole, setNewRole] = useState(data?.member.role.as);

  //   Form loading state
  const [isFormLoading, setIsFormLoading] = useState(false);

  const handleUpdateMember = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ? Validation, if user didn't change the inputs do nothing.
    if (
      newName === data?.member.name &&
      newEmail === data?.member.email &&
      newAge === data?.member.age &&
      newRole === data?.member.role.as
    ) {
      setIsModalOpen(false);
      return;
    }

    setIsFormLoading(true);
    try {
      const res = await updateMember({
        variables: {
          memberId: data?.member.id,
          newName,
          newEmail,
          newAge,
          newRole,
        },
      });
      toast.success(res.data.updateMember);
      setIsModalOpen(false);
      if (refetch) return refetch();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsFormLoading(false);
    }
  };
  return (
    <form onSubmit={handleUpdateMember} className="space-y-3 w-full">
      <div className="flex flex-col space-y-1 text-sm">
        <label
          htmlFor="name"
          className="font-medium after:content-['_*'] after:text-red-500"
        >
          New Name
        </label>
        <input
          id="name"
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border border-gray-500 rounded h-8 px-1"
        />
      </div>

      <div className="flex flex-col space-y-1 text-sm">
        <label
          htmlFor="email"
          className="font-medium after:content-['_*'] after:text-red-500"
        >
          New Email
        </label>
        <input
          id="email"
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="border border-gray-500 rounded h-8 px-1"
        />
      </div>

      <div className="flex space-x-4">
        <div className="flex flex-col space-y-1 w-24 text-sm">
          <label
            htmlFor="age"
            className="font-medium after:content-['_*'] after:text-red-500"
          >
            New Age
          </label>
          <input
            id="age"
            type="number"
            value={newAge}
            onChange={(e) => setNewAge(Number(e.target.value))}
            className="border border-gray-500 rounded h-8 px-1"
          />
        </div>

        <div className="flex flex-col space-y-1 flex-1 text-sm">
          <label
            htmlFor="role"
            className="font-medium after:content-['_*'] after:text-red-500"
          >
            New Role
          </label>
          <input
            id="role"
            type="text"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="border border-gray-500 rounded h-8 px-1"
          />
        </div>
      </div>

      <footer className="flex justify-end space-x-3 mt-5 pt-2 border-t border-gray-300">
        <Button onClick={() => setIsModalOpen(false)} size="sm" variant="muted">
          Close
        </Button>

        <Button type="submit" disabled={isFormLoading} size="sm">
          {isFormLoading ? "Loading..." : "Update"}
        </Button>
      </footer>
    </form>
  );
};

export default UpdateMember;
