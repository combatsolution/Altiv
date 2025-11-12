import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetPosts() {
  const URL = endpoints.post.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      posts: data?.blogs || [],
      postsLoading: isLoading,
      postsError: error,
      postsValidating: isValidating,
      postsEmpty: !isLoading && !data?.blogs?.length,
    }),
    [data?.blogs, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetPost(slug) {
  const URL = slug ? `${endpoints.post.details}${slug}` : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      post: data?.blogs?.[0] || data,
      postLoading: isLoading,
      postError: error,
      postValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetLatestPosts(title) {
  const URL = title ? [endpoints.post.latest, { params: { title } }] : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      latestPosts: data?.blogs || [],
      latestPostsLoading: isLoading,
      latestPostsError: error,
      latestPostsValidating: isValidating,
      latestPostsEmpty: !isLoading && !data?.blogs?.length,
    }),
    [data?.blogs, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchPosts(query) {
  const URL = query ? [endpoints.post.search, { params: { query } }] : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.blogs || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.blogs?.length,
    }),
    [data?.blogs, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetComments(blogId) {
  const URL = blogId ? endpoints.comments.list(blogId) : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      comments: data?.data || [], // Extract comments from the data array
      commentsCount: data?.commentsCount?.count || 0,
      totalCommentCount: data?.totalCommentCount || 0,
      commentsLoading: isLoading,
      commentsError: error,
      commentsValidating: isValidating,
      refreshComments: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetCommentReplies(commentId) {
  const URL = commentId ? `${endpoints.comments.replies(commentId)}` : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      replies: data?.data || [],
      repliesLoading: isLoading,
      repliesError: error,
      repliesValidating: isValidating,
      repliesEmpty: !isLoading && !data?.data?.length,
      mutateReplies: mutate,
    }),
    [data?.data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
// ----------------------------------------------------------------------

export function useGetPostsByFilters(filterString) {
  const URL = filterString ? endpoints.post.byFilters(filterString) : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      posts: data?.blogs || [],
      postsLoading: isLoading,
      postsError: error,
      postsValidating: isValidating,
      postsEmpty: !isLoading && !data?.blogs?.length,
    }),
    [data?.blogs, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetCategories() {
  const URL = endpoints.post.categories;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      categories: data || [],
      categoriesLoading: isLoading,
      categoriesError: error,
      categoriesValidating: isValidating,
      categoriesEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

// export function useGetCategoriesPost(filterString, categoryId) {
//   const URL = categoryId !== null ? endpoints.post.byCategoryFilters(filterString, categoryId) : null;

//   const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

//   const memoizedValue = useMemo(
//     () => ({
//       posts: data?.blogs || [],
//       postsLoading: URL ? isLoading : false,
//       postsError: error,
//       postsValidating: isValidating,
//       postsEmpty: !isLoading && !data?.blogs?.length,
//     }),
//     [URL, data?.blogs, error, isLoading, isValidating]
//   );

//   return memoizedValue;
// }


export function useGetCategoriesPost(filterString, categoryId) {
  // ✅ use the new unified endpoint
  const URL =
    categoryId !== null
      ? endpoints.post.byFilters(filterString, categoryId)
      : endpoints.post.byFilters(filterString);

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      posts: data?.blogs || [],
      postsLoading: URL ? isLoading : false,
      postsError: error,
      postsValidating: isValidating,
      postsEmpty: !isLoading && !data?.blogs?.length,
    }),
    [URL, data?.blogs, error, isLoading, isValidating]
  );

  return memoizedValue;
}
