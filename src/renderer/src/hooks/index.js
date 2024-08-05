/**
 * @file /src/renderer/src/hooks/index.js
 */
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

export function useGetCollection(collection) {
  const query = useQuery({
    queryKey: [collection],
    queryFn: async () => {
      const docs = await window.api.readAll({ collection })
      return docs
    }
  })
  return query?.data
}

export function usePostToCollection(collection) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: [collection],
    mutationFn: async (document) => {
      await window.api.putOne({ collection, document })
    },
    onSuccess: () => {
      queryClient.invalidateQueries([collection])
    }
  })
  return mutation.mutate
}

export function useDeleteFromCollection(collection) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: [collection],
    mutationFn: async (document) => {
      await window.api.removeOne({ collection, document })
    },
    onSuccess: () => {
      queryClient.invalidateQueries([collection])
    }
  })
  return mutation.mutate
}

export function useStore(collections) {
  return Object.fromEntries(
    collections.map((collection) => [
      collection,
      {
        data: useGetCollection(collection) ?? [],
        post: usePostToCollection(collection),
        delete: useDeleteFromCollection(collection)
      }
    ])
  )
}
