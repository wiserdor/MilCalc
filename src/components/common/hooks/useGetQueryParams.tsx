const useGetQueryParams = () => {
  const search = window.location.search
  const params = new URLSearchParams(search)

  return {
    get: (key: string) => params.get(key),
    getAll: () => {
      const paramsObject: { [key: string]: string } = {}
      params.forEach((value, key) => {
        paramsObject[key] = value
      })
      return paramsObject
    },
    doesExist: (key: string) => params.has(key),
  }
}

export default useGetQueryParams
