export const swrConfig = {
  // @ts-ignore
  fetcher: (...args) => fetch(...args).then(res => res.json()),
  revalidateOnFocus: false,
  shouldRetryOnError: false,
}
