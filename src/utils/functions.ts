export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    'Bytes',
    'KiB',
    'MiB',
    'GiB',
    'TiB',
    'PiB',
    'EiB',
    'ZiB',
    'YiB',
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export type base64Content = string;
export type mimeType = string;

export const blobToString = async (
  blob: Blob
): Promise<[base64Content, mimeType]> =>
  new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const base64String = (event.target!.result as string).split(',')[1]; // Remove the data URL prefix
      resolve([base64String, blob.type]);
    };

    reader.readAsDataURL(blob);
  });

export const stringToBlob = ([base64String, mimeType]: [
  base64Content,
  mimeType
]) => {
  const binaryData = atob(base64String);
  const byteNumbers = new Array(binaryData.length);

  for (let i = 0; i < binaryData.length; i++) {
    byteNumbers[i] = binaryData.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};
