import { memo } from 'react';
import Markdown from 'react-markdown';
import type { Catalog } from './types';

type MarkdownNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: MarkdownNode[];
};

const headingId = (slug: string) => 'studio-markdown-' + slug;

function headingSlug(text: string) {
  return text.toLowerCase().trim()
    .replace(/[^\p{L}\p{M}\p{N}_\s-]/gu, '')
    .replace(/\s/g, '-') || 'section';
}

export const markdownHeadingId = (text: string) => headingId(headingSlug(text));

function headingText(node: MarkdownNode): string {
  if (node.type === 'text') return node.value ?? '';
  if (node.tagName === 'img') return String(node.properties?.alt ?? '');
  return node.children?.map(headingText).join('') ?? '';
}

function headingAnchors(leadingHeading?: string) {
  return (tree: MarkdownNode) => {
    const used = new Set(leadingHeading ? [headingSlug(leadingHeading)] : []);
    function visit(node: MarkdownNode) {
      if (node.tagName && /^h[1-6]$/.test(node.tagName)) {
        const base = headingSlug(headingText(node));
        let slug = base;
        for (let number = 1; used.has(slug); number++) slug = base + '-' + number;
        used.add(slug);
        node.properties = { ...node.properties, id: headingId(slug), tabIndex: -1 };
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
}

function fragmentId(hash: string) {
  try { return headingId(decodeURIComponent(hash.slice(1))); }
  catch { return undefined; }
}

type Props = {
  body: string;
  sourcePath?: string;
  leadingHeading?: string;
  documents?: Catalog['documents'];
  onOpenDocument?: (path: string, anchor?: string) => void;
};

export const MarkdownContent = memo(function MarkdownContent({ body, sourcePath, leadingHeading, documents, onOpenDocument }: Props) {
  return <Markdown
    skipHtml
    rehypePlugins={[[headingAnchors, leadingHeading]]}
    components={{
      img: ({ alt }) => <span className="image-label">ภาพอ้างอิง: {alt || 'ดูจากต้นฉบับ'}</span>,
      a: ({ href, children }) => {
        if (!href) return <>{children}</>;
        if (/^(https?:|mailto:|\/\/)/i.test(href)) {
          return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
        }
        if (href.startsWith('#')) {
          const id = fragmentId(href);
          return id ? <a href={'#' + encodeURIComponent(id)}>{children}</a> : <>{children}</>;
        }
        // Only library documents have a repository path to resolve relative links against.
        if (!sourcePath) return <>{children}</>;
        try {
          const source = new URL(sourcePath, 'https://source.local/');
          const target = new URL(href, source);
          if (target.origin !== source.origin) return <>{children}</>;
          const path = decodeURI(target.pathname.slice(1));
          if (path === sourcePath && target.hash) {
            const id = fragmentId(target.hash);
            return id ? <a href={'#' + encodeURIComponent(id)}>{children}</a> : <>{children}</>;
          }
          if (documents && Object.hasOwn(documents, path) && onOpenDocument) {
            return <button className="inline-link" onClick={() => onOpenDocument(path, target.hash ? fragmentId(target.hash) : undefined)}>{children}</button>;
          }
          const repoUrl = 'https://github.com/gamemun01/ai-design-engineer/blob/main' + target.pathname + target.search + target.hash;
          return <a href={repoUrl} target="_blank" rel="noopener noreferrer">{children}</a>;
        } catch {
          return <>{children}</>;
        }
      },
    }}
  >{body}</Markdown>;
});
