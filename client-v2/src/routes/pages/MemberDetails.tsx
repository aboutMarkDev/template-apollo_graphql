// * DYNAMIC ROUTE, THIS WILL DISPLAY SPECIFIC MEMBER DETAILS

import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import UpdateMember from "../../components/form/UpdateMember";
import { GET_MEMBER } from "../../services/graphql";
import Button from "../../components/Button";
import DeleteMember from "../../components/form/DeleteMember";
import { GetMemberById } from "../../types/index.types";

const MemberDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Actions
  const { loading, error, data, refetch } = useQuery<GetMemberById>(
    GET_MEMBER,
    {
      variables: {
        memberId: id,
      },
    }
  );

  // ? Create a context for model
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <p>Error fetching member</p>;

  return (
    <section className="h-screen px-5 py-8 space-y-4">
      <header className="w-full max-w-[18rem] flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer hover:underline underline-offset-4"
        >
          Back
        </button>

        <div className="space-x-2">
          <Button
            size="sm"
            variant="info"
            onClick={() => setIsUpdateModalOpen(true)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete
          </Button>
        </div>
      </header>

      <h1 className="text-3xl font-bold">Full Member Details</h1>
      <div className="font-light">
        <h3>Name: {data?.member.name}</h3>
        <h4>Age: {data?.member.age} years old</h4>
        <h5>Email: {data?.member.email}</h5>
        <h6>Role: {data?.member.role.as}</h6>
      </div>

      {/* Modal component */}
      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        title="Update Member"
      >
        <UpdateMember
          setIsModalOpen={setIsUpdateModalOpen}
          data={data}
          refetch={refetch}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Deleting Member"
      >
        <DeleteMember memberId={id} setIsModalOpen={setIsDeleteModalOpen} />
      </Modal>
    </section>
  );
};

export default MemberDetails;
