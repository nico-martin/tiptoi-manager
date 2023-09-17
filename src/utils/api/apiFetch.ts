export const apiGet = <T>(url: string): Promise<T> =>
  apiFetch({ url, method: 'GET' });

export const apiPost = <T>(
  url: string,
  data: Record<string, any>
): Promise<T> => apiFetch({ url, method: 'POST', body: data });

export const apiPut = <T>(url: string, data: Record<string, any>): Promise<T> =>
  apiFetch({ url, method: 'PUT', body: data });

export const apiDelete = <T>(url: string): Promise<T> =>
  apiFetch({ url, method: 'DELETE' });

const apiFetch = <T>({
  url,
  method,
  headers = {},
  body = {},
}: {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, any>;
  body?: Record<string, any> | FormData;
}): Promise<T> => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method,
      ...(method === 'POST' || method === 'PUT'
        ? { body: body instanceof FormData ? body : JSON.stringify(body) }
        : {}),
      headers: {
        ...headers,
        ...(body instanceof FormData
          ? {}
          : { 'Content-Type': 'application/json' }),
      },
    })
      .then((resp) => Promise.all([resp, resp.json()]))
      .then(([resp, data]) => {
        if (resp.status < 300) {
          resolve(data);
        } else {
          reject(
            typeof data === 'string'
              ? data
              : data?.message
              ? data.message
              : data.toString()
          );
        }
      })
      .catch(() => {
        reject('_error');
      });
  });
};
