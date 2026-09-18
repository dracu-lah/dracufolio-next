import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/**
 * Blog prose, styled here rather than with a typography plugin so the four
 * faces keep their jobs: Bricolage on the headings, Geist on the paragraphs,
 * Google Sans Code on the code and the inline identifiers. Nothing here
 * invents a new size; every step comes from the one type scale.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children, ...props }) => (
      <h2
        className="font-display mt-14 mb-4 scroll-mt-28 text-3xl font-bold tracking-tight"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="font-display mt-10 mb-3 scroll-mt-28 text-xl font-bold tracking-tight"
        {...props}
      >
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="mb-5 text-lg leading-relaxed text-muted-foreground" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="mb-6 flex flex-col gap-2.5" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol
        className="mb-6 flex list-decimal flex-col gap-2.5 pl-5"
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="text-lg leading-relaxed text-muted-foreground" {...props}>
        {children}
      </li>
    ),
    strong: ({ children, ...props }) => (
      <strong className="font-semibold text-foreground" {...props}>
        {children}
      </strong>
    ),
    a: ({ href = "", children, ...props }) => {
      const external = href.startsWith("http");
      const className =
        "text-foreground underline underline-offset-4 transition-opacity duration-300 hover:opacity-70";
      return external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          {...props}
        >
          {children}
        </a>
      ) : (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    },
    code: ({ children, ...props }) => (
      <code
        className="rounded-md squircle border border-border bg-card px-1.5 py-0.5 font-mono text-base text-foreground"
        {...props}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre
        className="mb-6 overflow-x-auto rounded-xl squircle border border-border bg-card p-5 font-mono text-base leading-relaxed [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0"
        {...props}
      >
        {children}
      </pre>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="mb-6 border-l-2 border-border pl-5 text-lg leading-relaxed text-muted-foreground"
        {...props}
      >
        {children}
      </blockquote>
    ),
    hr: (props) => <hr className="my-10 border-border" {...props} />,
    ...components,
  };
}
