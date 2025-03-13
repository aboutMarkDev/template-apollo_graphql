// ? THIS WILL ACT AS PROTECTED ROUTE.
// ? RENDER THE MEMBERS HERE.

import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";
import AddMember from "../../components/form/AddMember";
import { Member } from "../../types/index.types";
import Button from "../../components/Button";
import { useMembersContext } from "../../context/Members";

const Welcome = () => {
  const { loading, error, data } = useMembersContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <p>Error</p>;

  return (
    <section className="h-screen px-5 py-8 flex flex-col gap-8 overflow-hidden">
      <h1 className="text-center text-5xl font-bold">User Lists</h1>

      {/* Modal Button */}
      <div>
        <Button className="float-end" onClick={() => setIsModalOpen(true)}>
          Add Member
        </Button>
      </div>

      {/* Modal component here */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Member"
      >
        <AddMember setIsModalOpen={setIsModalOpen} />
      </Modal>

      {data?.members.length ? (
        <ul className="flex flex-wrap justify-center gap-10 px-5 py-8 overflow-auto">
          {data?.members.map((member: Member) => (
            <li
              key={member.id}
              className="border min-h-[14rem] w-[22rem] rounded-lg px-3 py-5 flex flex-col justify-between"
            >
              <div>
                <h3>{member.name}</h3>
                <p>{member.age} years old</p>
              </div>
              <div className="text-end">
                <Link
                  to={`/member/${member.id}`}
                  className="text-sm text-blue-500 hover:underline underline-offset-4"
                >
                  View more...
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Empty Lists</p>
      )}
    </section>
  );
};

export default Welcome;
