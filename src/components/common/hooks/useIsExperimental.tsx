import useGetQueryParams from './useGetQueryParams'

const useIsExperimental = () => {
  const { get } = useGetQueryParams()
  const isExperimentalQueryParams = get('experimental')
  return Boolean(isExperimentalQueryParams)
}

export default useIsExperimental
