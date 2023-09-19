export const getDirectoryHandle = (): Promise<FileSystemDirectoryHandle> =>
  new Promise(async (resolve, reject) => {
    try {
      const handle = await window.showDirectoryPicker();
      resolve(handle);
    } catch (e) {
      reject(e);
    }
  });

export const getDirectoryEntries = (
  handle: FileSystemDirectoryHandle
): Promise<Array<FileSystemDirectoryHandle | FileSystemFileHandle>> =>
  new Promise(async (resolve, reject) => {
    try {
      const entries = [];
      for await (const entry of handle.values()) {
        entries.push(entry);
      }
      resolve(entries);
    } catch (e) {
      reject(e);
    }
  });

export const writeFile = (
  dirHandle: FileSystemDirectoryHandle,
  name: string,
  content: string | Blob
): Promise<FileSystemFileHandle> =>
  new Promise(async (resolve, reject) => {
    try {
      const newFileHandle = await dirHandle.getFileHandle(name, {
        create: true,
      });
      const writable = await newFileHandle.createWritable();
      await writable.write(content);
      await writable.close();
      resolve(newFileHandle);
    } catch (e) {
      reject(e);
    }
  });

export const deleteFile = (
  dirHandle: FileSystemDirectoryHandle,
  name: string
) =>
  new Promise(async (resolve, reject) => {
    try {
      await dirHandle.removeEntry(name);
      resolve(name);
    } catch (e) {
      reject(e);
    }
  });
