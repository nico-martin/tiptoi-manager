import React from 'react';

const StorageContext = React.createContext<{
  totalSpace: number;
  availableSpace: number;
  persisted: boolean;
  setItem: (key: string, value: string) => Promise<void>;
  getItem: (key: string) => string;
}>({
  totalSpace: 0,
  availableSpace: 0,
  persisted: false,
  setItem: () => new Promise((resolve) => resolve()),
  getItem: () => '',
});

export const StorageContextProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const [persisted, setPersisted] = React.useState<boolean>(false);
  const [totalSpace, setTotalSpace] = React.useState<number>(0);
  const [availableSpace, setAvailableSpace] = React.useState<number>(0);

  const persist: () => Promise<void> = () =>
    navigator.storage
      .persist()
      .then(() =>
        navigator.storage
          .persisted()
          .then((persisted) => setPersisted(persisted))
      );

  const checkSpace: () => Promise<void> = () =>
    navigator.storage.estimate().then((estimate) => {
      setTotalSpace(estimate.quota);
      setAvailableSpace(estimate.usage);
      /*
      console.log((estimate.usage / estimate.quota) * 100 + '%);
      console.log((estimate.quota / 1024 / 1024).toFixed(2) + ' MB');
       */
    });

  const setItem = async (key: string, value: string) => {
    !persisted && (await persist());
    window.sessionStorage.setItem(key, value);
    await checkSpace();
  };

  const getItem = (key: string): string =>
    window.sessionStorage.getItem(key) || null;

  return (
    <StorageContext.Provider
      value={{ totalSpace, availableSpace, persisted, setItem, getItem }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export const useStorageContext = () => React.useContext(StorageContext);
