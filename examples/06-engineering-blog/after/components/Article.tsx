// AFTER: Article — real h1, prose measure, JSON-LD Article schema, author bio
// Skills applied: 03 (UX), 04 (tokens), 06 (code), 07 (SEO + a11y)

interface ArticleProps {
  title: string;
  author: string;
  authorBio: string;
  datePublished: string;
  readingTime: string;
  coverImage: string;
  children: React.ReactNode;
}

export function Article({
  title,
  author,
  authorBio,
  datePublished,
  readingTime,
  coverImage,
  children,
}: ArticleProps) {
  // JSON-LD Article schema — for search-engine rich results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    author: { "@type": "Person", name: author },
    datePublished,
    image: coverImage,
  };

  return (
    <article className="mx-auto max-w-prose px-4 py-12">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="space-y-3">
        {/* One real h1 per article */}
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground">
          By {author} · {new Date(datePublished).toLocaleDateString()} · {readingTime}
        </p>
      </header>

      {/* Prose body — readable measure, relaxed leading, focus-visible links */}
      <div className="mt-8 space-y-6 leading-relaxed text-foreground [&_a]:text-primary [&_a]:underline [&_a:focus]:outline-none [&_a:focus-visible]:ring-2 [&_a:focus-visible]:ring-ring [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground">
        {children}
      </div>

      {/* Author bio at the end (deferred per UX brief) */}
      <footer className="mt-12 rounded-xl border border-border bg-card p-6">
        <h2 className="text-sm font-semibold text-muted-foreground">Written by</h2>
        <p className="mt-1 text-base font-semibold text-foreground">{author}</p>
        <p className="mt-1 text-sm text-muted-foreground">{authorBio}</p>
      </footer>
    </article>
  );
}
