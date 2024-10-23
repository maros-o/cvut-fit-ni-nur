"use client";

import { useState, createContext, useEffect, useCallback } from "react";

type ContextData = {};

export const TestSessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const contextData: ContextData = {};

  return (
    <TestSessionContext.Provider value={contextData}>
      {children}
    </TestSessionContext.Provider>
  );
};

const TestSessionContext = createContext<ContextData>({} as ContextData);

export default TestSessionContext;
