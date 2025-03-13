/* eslint-disable  @typescript-eslint/no-explicit-any */
import { ApolloQueryResult, OperationVariables } from "@apollo/client";

export type Member = {
  id: string;
  name: string;
  age: number;
  email: string;
};

export interface MemberDetails extends Member {
  role: {
    as: string;
  };
}

export type MembersContextType = {
  loading: boolean;
  error?: Error;
  data?: GetMembersResponse;
  refetch?:
    | ((
        variables?: Partial<OperationVariables> | undefined
      ) => Promise<ApolloQueryResult<any>>)
    | undefined;
};

export interface GetMembersResponse {
  members: Member[];
}

export interface GetMemberById {
  member: MemberDetails;
}

export interface AddMemberProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UpdateMemberProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: GetMemberById;
  refetch:
    | ((
        variables?: Partial<OperationVariables> | undefined
      ) => Promise<ApolloQueryResult<any>>)
    | undefined;
}

export interface DeleteMemberProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  memberId: string | undefined;
}
