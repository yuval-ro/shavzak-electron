/**
 * @file /src/renderer/src/hooks/react-query.js
 */
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

function useRead(collection) {
  const query = useQuery({
    queryKey: [collection],
    queryFn: async () => {
      const docs = await window.api.db({ action: 'read', collection })
      return docs
    }
  })
  return query?.data ?? []
}

function usePost(collection) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: [collection],
    mutationFn: async (docs) => {
      await window.api.db({ collection, action: 'post', docs: Array.isArray(docs) ? docs : [docs] })
    },
    onSuccess: () => {
      queryClient.invalidateQueries([collection])
    }
  })
  return mutation.mutate
}

function useDelete(collection) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: [collection],
    mutationFn: async (docs) => {
      await window.api.db({
        collection,
        action: 'delete',
        docs: Array.isArray(docs) ? docs : [docs]
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries([collection])
    }
  })
  return mutation.mutate
}

export function useQueryStore(collections) {
  return Object.fromEntries(
    collections.map((collection) => [
      collection,
      {
        read: useRead(collection),
        post: usePost(collection),
        delete: useDelete(collection)
      }
    ])
  )
}
