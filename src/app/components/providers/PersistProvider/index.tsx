// components/PersistProvider.tsx
'use client';

import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/app/stores";
import Loading from "@components/atom/Loading";



interface PersistProviderProps {
  children: React.ReactNode;
}

export default function PersistProvider({ children }: PersistProviderProps) {
  return (
    <PersistGate loading={<Loading />} persistor={persistor}>
      {children}
    </PersistGate>
  );
}