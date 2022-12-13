import React, { FC, useEffect, useMemo, useState } from "react";
import { AppLayout } from "./components/Layout";

export const Providers: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AppLayout>{children}</AppLayout>;
};
