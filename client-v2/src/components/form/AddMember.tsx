/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { ADD_MEMBER } from "../../services/graphql";
import Button from "../Button";
import { useMembersContext } from "../../context/Members";
import { AddMemberProps } from "../../types/index.types";

const AddMember = ({ setIsModalOpen }: AddMemberProps) => {
  const { refetch } = useMembersContext();
  // Mutations
  const [addMember] = useMutation(ADD_MEMBER);

  // Field States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [role, setRole] = useState("");

  //   Loading states
  const [isLoading, setIsLoading] = useState(false);

  const handleAddMember = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !age || !role) {
      toast.error("All fields required");
      return;
    }
    setIsLoading(true);

    try {
      const res = await addMember({
        variables: {
          name,
          email,
          age,
          role,
        },
      });
      toast.success(res.data.addMember);
      setName("");
      setEmail("");
      setAge(0);
      setRole("");
      setIsModalOpen(false);
      if (refetch) return refetch();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleAddMember} className="space-y-3 w-full">
      <div className="flex flex-col space-y-1 text-sm">
        <label
          htmlFor="name"
          className="font-medium after:content-['_*'] after:text-red-500"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-500 rounded h-8 px-1"
        />
      </div>

      <div className="flex flex-col space-y-1 text-sm">
        <label
          htmlFor="email"
          className="font-medium after:content-['_*'] after:text-red-500"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-500 rounded h-8 px-1"
        />
      </div>

      <div className="flex space-x-4">
        <div className="flex flex-col space-y-1 w-24 text-sm">
          <label
            htmlFor="age"
            className="font-medium after:content-['_*'] after:text-red-500"
          >
            Age
          </label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="border border-gray-500 rounded h-8 px-1"
          />
        </div>

        <div className="flex flex-col space-y-1 flex-1 text-sm">
          <label
            htmlFor="role"
            className="font-medium after:content-['_*'] after:text-red-500"
          >
            Role
          </label>
          <input
            id="role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border border-gray-500 rounded h-8 px-1"
          />
        </div>
      </div>

      <footer className="flex justify-end space-x-3 mt-5 pt-2 border-t border-gray-300">
        <Button onClick={() => setIsModalOpen(false)} size="sm" variant="muted">
          Close
        </Button>

        <Button type="submit" disabled={isLoading} size="sm">
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </footer>
    </form>
  );
};

export default AddMember;
