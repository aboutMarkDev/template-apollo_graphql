/* eslint-disable  react-refresh/only-export-components */

import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { createContext } from "react";
import { GET_MEMBERS } from "../services/graphql";
import { GetMembersResponse, MembersContextType } from "../types/index.types";

const MembersContext = createContext<MembersContextType | undefined>(undefined);

const MembersProvider = ({ children }: { children: React.ReactNode }) => {
  const { loading, error, data, refetch } =
    useQuery<GetMembersResponse>(GET_MEMBERS);

  const value = {
    loading,
    error,
    data,
    refetch,
  };

  return (
    <MembersContext.Provider value={value}>{children}</MembersContext.Provider>
  );
};

export default MembersProvider;

export const useMembersContext = (): MembersContextType => {
  const context = useContext(MembersContext);

  if (!context) {
    throw new Error("useMembersContext must be used within provider");
  }
  return context;
};
