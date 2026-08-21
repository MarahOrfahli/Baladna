import { useStore } from 'zustand/react';
import { createTableStore } from './tableStore';
import { useState } from 'react';

export const useTableStore = (config) => {
  const { columns, searchKeys, filters, rowsPerPage } = config;

  const [store] = useState(() =>
    createTableStore({ columns, searchKeys, filters, rowsPerPage })
  );

  const state = useStore(store);
  return { store, ...state };
};