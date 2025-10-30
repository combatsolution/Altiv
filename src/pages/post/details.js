import { Helmet } from 'react-helmet-async';
import { useParams, useSearchParams } from 'src/routes/hook';
import { useGetPost, useGetLatestPosts, useGetComments } from 'src/api/blog';
// sections
import { PostDetailsHomeView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export default function PostDetailsHomePage() 

{
  const params = useParams();
  const { title } = params;
  const searchParams = useSearchParams(); 
  const {categoryId} = searchParams;
  const { post, postError, postLoading } = useGetPost(`${title}`);

  return (
    <>
      <Helmet>
        
        {/* Title: use optional chaining */}
        <title>{`Post: ${post?.metaTitle || "Loading..."}`}</title>

        {/* Meta tags */}
        <meta name="description" content={post?.metaDescription || ""} />
        <meta name="canonical" content={post?.metaCanonicalURL || ""} />
        <meta name="tags" content={post?.metaTags || ""} />


        <script type="application/ld+json"> 
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post?.metaTitle,
            description: post?.metaDescription,
            image: post?.imageUrl,
            author: { "@type": "Person", name: post?.author || "Anonymous" },
            publisher: {
              "@type": "Organization",
              name: "Altiv",
              logo: { "@type": "ImageObject", url: "https://staging.altiv.ai/assets/Altivlogo.png" }
            },
            datePublished: post?.date,
            mainEntityOfPage: { "@type": "WebPage", "@id": window.location.href }
          })}
        </script>

      </Helmet>

      {/* ✅ render your component with all props */}
      <PostDetailsHomeView
        post={post}
        postError={postError}
        postLoading={postLoading}
        categoryId={categoryId}
      />
    </>
  );
}