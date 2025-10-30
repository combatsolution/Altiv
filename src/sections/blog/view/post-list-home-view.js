import orderBy from 'lodash/orderBy';
import { useCallback, useState, useRef, useEffect } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';
// routes
import { paths } from 'src/routes/paths';
import { useSearchParams } from 'src/routes/hook';
// hooks
import { useDebounce } from 'src/hooks/use-debounce';
// _mock
import { POST_SORT_OPTIONS } from 'src/_mock';
// api
import { useGetPostsByFilters, useGetCategories, useGetCategoriesPost } from 'src/api/blog';
// components
import { useSettingsContext } from 'src/components/settings';
//
import PostList from '../post-list';
import PostSort from '../post-sort';
import PostSearch from '../post-search';

// ----------------------------------------------------------------------

export default function PostListHomeView() {
  const settings = useSettingsContext();

  const [sortBy, setSortBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const searchParams = useSearchParams();
  const scrollContainerRef = useRef(null);

  const { categories: fetchedCategories = [], categoriesLoading } = useGetCategories();

  // Set initial category from URL if present
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      // Convert to string for consistent comparison
      setSelectedCategory(String(categoryFromUrl));
      console.log('Setting category from URL:', categoryFromUrl);
    }
  }, [searchParams]);

  // Add 'All' category at the beginning
  const categories = [{ _id: 'all', name: 'All' }, ...fetchedCategories, 
    { _id: 'Ai-readiness', name: 'Ai-readiness', description: 'Ai-readiness Insights' },
  ];

  const showArrows = categories.length > 3;

  const scroll = (direction) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollAmount = 200; // Adjust this value based on your needs

    container.scrollTo({
      left: container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
      behavior: 'smooth',
    });
  };

  const debouncedQuery = useDebounce(searchQuery);

  const filter = {
    where: {
      publish: 'published',
    },
  };

  const newFilterString = encodeURIComponent(JSON.stringify(filter));
  
  const { posts: allPosts, postsLoading: allPostsLoading } = useGetPostsByFilters(newFilterString);
  
  const categoryResult = useGetCategoriesPost(
    newFilterString,
    selectedCategory === 'all' ? null : selectedCategory
  );
  
  const categoryPosts = selectedCategory === 'all' ? [] : categoryResult.posts || [];
  const categoryPostsLoading = selectedCategory === 'all' ? false : categoryResult.postsLoading;

  const posts = selectedCategory === 'all' ? allPosts : categoryPosts;
  const postsLoading = selectedCategory === 'all' ? allPostsLoading : categoryPostsLoading;

  // Local search function
  const getSearchResults = useCallback(() => {
    if (!debouncedQuery.trim()) return [];
    
    const query = debouncedQuery.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(query)))
    );
  }, [debouncedQuery, posts]);

  const searchResults = getSearchResults();
  const searchLoading = false; // No loading state needed for local search

  // Use search results when there's a query, otherwise use the filtered posts
  const dataFiltered = applyFilter({
    inputData: debouncedQuery ? searchResults : posts,
    sortBy,
  });

  const handleSortBy = useCallback((newValue) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback((inputValue) => {
    setSearchQuery(inputValue);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Typography
        variant="h4"
        sx={{
          my: { xs: 3, md: 5 },
        }}
      >
        Blog
      </Typography>

      <Stack
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-end', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ mb: { xs: 3, md: 5 } }}
      >
        <PostSearch
          query={debouncedQuery}
          results={searchResults}
          onSearch={handleSearch}
          loading={searchLoading}
          hrefItem={(title) => paths.post.details(title)}
        />

        {!categoriesLoading && categories.length > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            {showArrows && (
              <IconButton
                onClick={() => scroll('left')}
                size="small"
                sx={{
                  position: 'absolute',
                  left: -40,
                  zIndex: 1,
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <Iconify icon="eva:arrow-ios-back-fill" width={20} />
              </IconButton>
            )}

            <Stack
              ref={scrollContainerRef}
              direction="row"
              spacing={1}
              sx={{
                overflowX: 'auto',
                maxWidth: { xs: '100%', sm: '400px' },
                py: 1,
                px: showArrows ? 0.5 : 0,
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
              }}
            >
              {categories.map((category) => (
                <Chip
                  key={category._id || category.id}
                  label={category.name}
                  variant={
                    String(selectedCategory) === String(category._id || category.id) ? 'filled' : 'outlined'
                  }
                  color={String(selectedCategory) === String(category._id || category.id) ? 'primary' : 'default'}
                  onClick={() => {
                    const catId = String(category._id || category.id);
                    setSelectedCategory(catId);
                    console.log('Category clicked:', catId, 'Current selected:', selectedCategory);
                  }}
                  sx={{
                    flexShrink: 0,
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                    '& .MuiChip-label': {
                      px: 1.5,
                    },
                    ...(String(selectedCategory) === String(category._id || category.id) && {
                      bgcolor: 'success.main',
                      color: 'primary.contrastText',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    }),
                  }}
                />
              ))}
            </Stack>

            {showArrows && (
              <IconButton
                onClick={() => scroll('right')}
                size="small"
                sx={{
                  position: 'absolute',
                  right: -40,
                  zIndex: 1,
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <Iconify icon="eva:arrow-ios-forward-fill" width={20} />
              </IconButton>
            )}
          </Box>
        )}

        <PostSort sort={sortBy} onSort={handleSortBy} sortOptions={POST_SORT_OPTIONS} />
      </Stack>

      <PostList posts={dataFiltered} loading={postsLoading} selectedCategory={selectedCategory} />
    </Container>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({ inputData, sortBy }) => {
  if (sortBy === 'latest') {
    return orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    return orderBy(inputData, ['createdAt'], ['asc']);
  }

  if (sortBy === 'popular') {
    return orderBy(inputData, ['totalViews'], ['desc']);
  }

  return inputData;
};
