import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { useParams } from 'src/routes/hook';
import { useGetPost, useGetLatestPosts, useGetComments } from 'src/api/blog';
// sections
import { PostDetailsHomeView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export default function PostDetailsHomePage() {

  const params = useParams();
  const { title } = params;
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('category') ? parseInt(searchParams.get('category'), 10) : null;
  const { post, postError, postLoading } = useGetPost(`${title}`);

  return (
    <>
      <Helmet>
        <title> {`post:${post.metaTitle}`}</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="canonical" content={post.metaCanonicalURL} />
        <meta name="keywords" content={post.metaTags} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: post.imageUrl,
            author: { "@type": "Person", name: post.author || "Anonymous" },
            publisher: {
              "@type": "Organization",
              name: "Altiv",
              logo: { "@type": "ImageObject", url: "https://staging.altiv.ai/assets/Altivlogo.png" }
            },
            datePublished: post.date,
            mainEntityOfPage: { "@type": "WebPage", "@id": window.location.href }
          })}
        </script>

      </Helmet>

      <PostDetailsHomeView post={post} />
    </>
  );
}
