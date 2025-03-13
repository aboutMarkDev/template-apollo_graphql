/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_MEMBER } from "../../services/graphql";
import Button from "../Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMembersContext } from "../../context/Members";
import { DeleteMemberProps } from "../../types/index.types";

const DeleteMember = ({ setIsModalOpen, memberId }: DeleteMemberProps) => {
  const { refetch } = useMembersContext();
  const [deleteMember] = useMutation(DELETE_MEMBER);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteMember = async () => {
    if (!memberId) {
      throw new Error("No member id provided");
    }

    setIsLoading(true);

    try {
      const res = await deleteMember({ variables: { memberId } });
      toast.success(res.data.deleteMember);
      navigate("/welcome");
      setIsModalOpen(false);
      if (refetch) return refetch();
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="flex flex-col justify-between w-full">
      <h1 className="font-medium">
        Are you sure you want to delete this member?
      </h1>
      <footer className="flex justify-end space-x-3">
        <Button variant="muted" onClick={() => setIsModalOpen(false)}>
          No
        </Button>
        <Button
          variant="danger"
          onClick={handleDeleteMember}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Yes"}
        </Button>
      </footer>
    </section>
  );
};

export default DeleteMember;
