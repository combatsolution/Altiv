import orderBy from "lodash/orderBy";
import { useCallback, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// @mui
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Iconify from "src/components/iconify";

// routes
import { paths } from "src/routes/paths";
import { useSearchParams } from "src/routes/hook";

// hooks
import { useDebounce } from "src/hooks/use-debounce";

// _mock
import { POST_SORT_OPTIONS } from "src/_mock";

// api
import { useGetPostsByFilters, useGetCategories } from "src/api/blog";

// components
import { useSettingsContext } from "src/components/settings";
import PostList from "../post-list";
import PostSort from "../post-sort";
import PostSearch from "../post-search";

// ----------------------------------------------------------------------

export default function PostListHomeView() {
  const settings = useSettingsContext();
  const [sortBy, setSortBy] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const searchParams = useSearchParams();
  const scrollContainerRef = useRef(null);

  const { categories: fetchedCategories = [], categoriesLoading } = useGetCategories();
  const [blogType, setBlogType] = useState("blog");

  // Load category from URL
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) setSelectedCategory(String(categoryFromUrl));
  }, [searchParams]);

  // UI categories (All + fetched + AI-readiness)
  const categories = [
    { _id: "all", name: "All" },
    ...fetchedCategories,
    { _id: "Ai-readiness", name: "Ai-readiness" },
  ];

  const showArrows = categories.length > 3;

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 200;

    container.scrollTo({
      left: container.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount),
      behavior: "smooth",
    });
  };

  const debouncedQuery = useDebounce(searchQuery);

  // ----------------------------------
  // API FILTER
  // ----------------------------------
  // FILTER
  const filter = {
    where: {
      and: [
        { publish: "published" },
        { blogType },
      ]
    }
  };

  const filterString = encodeURIComponent(JSON.stringify(filter));
  const { posts: apiPosts = [], postsLoading } = useGetPostsByFilters(filterString, 
    ((selectedCategory && selectedCategory !== 'all' && selectedCategory !== 'Ai-readiness') ?
     selectedCategory : null));

  // Now apiPosts is available for use below
  const finalPosts = apiPosts;
  const finalPostsLoading = postsLoading;


  const aiReadinessPost = {
    id: "ai-readiness-1",
    title: "AI Readiness: Transforming the Future of Work",
    slug: "ai-readiness",
    description:
      "Explore how AI Readiness empowers organizations to adapt, upskill, and thrive in the era of automation. Learn key steps to assess and improve your AI adoption maturity.",
    coverUrl: "/assets/images/ai-readiness-banner.jpg",
    createdAt: new Date().toISOString(),
    tags: ["AI", "Readiness", "Future of Work"],
    navigateTo: "/ai-readiness-companyfobopage",
  };

  // ----------------------------------
  // FINAL POSTS LOGIC
  // ----------------------------------

  // if (selectedCategory === "Ai-readiness") {
  //   finalPosts = [aiReadinessPost];
  //   finalPostsLoading = false;
  // }

  // ----------------------------------
  // SEARCH FILTER
  // ----------------------------------
  const searchResults = debouncedQuery
    ? finalPosts.filter((post) => {
      const q = debouncedQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        (post.tags || []).some((tag) => tag.toLowerCase().includes(q))
      );
    })
    : finalPosts;
  console.log("RRRRRRRRRRRRR", searchResults);
  // ----------------------------------
  // SORTING
  // ----------------------------------

  const dataFiltered = applyFilter({
    inputData: searchResults,
    sortBy,
  });

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <Typography variant="h4" sx={{ my: { xs: 3, md: 5 } }}>
        Blog
      </Typography>

      {/* Search & Sort & Categories */}
      <Stack
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: "flex-end", sm: "center" }}
        direction={{ xs: "column", sm: "row" }}
        sx={{ mb: { xs: 3, md: 5 } }}
      >
        {/* <PostSearch
          query={debouncedQuery}
          results={searchResults}
          onSearch={(v) => setSearchQuery(v)}
          loading={false}
          hrefItem={(title) => paths.post.details(title)}
        /> */}

        {/* Categories */}
        {!categoriesLoading && categories.length > 0 && (
        <Box
          sx={{
            width: "100%",
            position: "relative",
            display: "flex",
            alignItems: "center",

            mx: { xs: -2, sm: 0 },
            px: { xs: 2, sm: 0 },
          }}
        >
          <Stack
            ref={scrollContainerRef}
            direction="row"
            spacing={1.2}
            sx={{
              width: "100%",
              py: 1.5,

              // 🔥 MOBILE: Wrap chips into multiple rows
              flexWrap: { xs: "wrap", sm: "nowrap" },

              // 🔥 DESKTOP: horizontal scroll
              overflowX: { xs: "visible", sm: "auto" },
              whiteSpace: { xs: "normal", sm: "nowrap" },

              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {categories.map((cat) => {
              const catId = String(cat._id || cat.id);
              const selected = selectedCategory === catId;

              return (
                <Chip
                  key={catId}
                  label={cat.name}
                  variant={selected ? "filled" : "outlined"}
                  color={selected ? "primary" : "default"}
                  onClick={() => {
                    setSelectedCategory(catId);
                    setBlogType(catId === "Ai-readiness" ? "company-fobo" : "blog");
                  }}
                  sx={{
                    flexShrink: 0,
                    fontSize: { xs: "0.78rem", sm: "0.9rem" },
                    height: { xs: 32, sm: 36 },
                    px: { xs: 1.4, sm: 2 },
                    borderRadius: "22px",
                  }}
                />
              );
            })}
          </Stack>
        </Box>
        )}

        <PostSort sort={sortBy} onSort={setSortBy} sortOptions={POST_SORT_OPTIONS} />
      </Stack>

      {/* Post List */}
      <PostList posts={dataFiltered} loading={finalPostsLoading} selectedCategory={selectedCategory} />
    </Container>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({ inputData, sortBy }) => {
  if (sortBy === "latest") return orderBy(inputData, ["createdAt"], ["desc"]);
  if (sortBy === "oldest") return orderBy(inputData, ["createdAt"], ["asc"]);
  if (sortBy === "popular") return orderBy(inputData, ["totalViews"], ["desc"]);
  return inputData;
};
