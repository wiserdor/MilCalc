const useGetQueryParams = () => {
  const parseParams = () => {
    const params = new URLSearchParams(window.location.search);
    const paramsObject: { [key: string]: string | null } = {};
    params.forEach((value, key) => {
      paramsObject[key] = value;
    });
    return paramsObject;
  };

  return {
    get: (key: string) => {
      const params = new URLSearchParams(window.location.search);
      return params.get(key);
    },
    getAll: () => parseParams(),
    doesExist: (key: string) => {
      const params = new URLSearchParams(window.location.search);
      return params.has(key);
    }
  };
};

export default useGetQueryParams;
