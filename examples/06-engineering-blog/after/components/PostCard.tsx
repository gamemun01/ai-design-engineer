// AFTER: PostCard — next/image with dimensions, real heading, tags, tokenized
// Skills applied: 04 (tokens), 06 (code), 07 (perf + a11y)

import Image from "next/image";

interface PostCardProps {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  readingTime: string;
  cover: string;
  tags: string[];
}

export function PostCard({
  slug,
  title,
  excerpt,
  author,
  readingTime,
  cover,
  tags,
}: PostCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      {/* Cover — explicit width + height (no CLS) */}
      <a href={`/blog/${slug}`} className="block focus-visible:ring-2 focus-visible:ring-ring focus:outline-none">
        <Image
          src={cover}
          alt=""
          width={800}
          height={450}
          className="aspect-video w-full object-cover"
        />
      </a>
      <div className="space-y-3 p-6">
        {/* Tags as links (not div soup) */}
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag}>
              <a
                href={`/blog/tag/${tag.toLowerCase()}`}
                className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus:outline-none"
              >
                {tag}
              </a>
            </li>
          ))}
        </ul>
        {/* Real heading (h3 in a list context; the page h1 lives elsewhere) */}
        <h3 className="text-lg font-bold tracking-tight text-foreground">
          <a
            href={`/blog/${slug}`}
            className="hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring focus:outline-none rounded"
          >
            {title}
          </a>
        </h3>
        <p className="text-sm text-muted-foreground">{excerpt}</p>
        <p className="text-xs text-muted-foreground">
          {author} · {readingTime}
        </p>
      </div>
    </article>
  );
}
