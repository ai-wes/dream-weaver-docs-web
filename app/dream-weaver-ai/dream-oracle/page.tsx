import fs from 'fs/promises'; // Use promises for async/await
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';

// Define the expected props (Next.js passes params for dynamic routes, though not strictly needed here)
interface PageProps {
  params?: { slug?: string[] }; // Adjust based on actual route structure if needed
}

// This is an async Server Component
export default async function MarkdownPage({ params }: PageProps) {
  // Construct the path to the markdown file relative to the page component
  // Use process.cwd() and the known path structure.
  const mdFilePath = path.join(process.cwd(), 'app', 'dream-weaver-ai', 'dream-oracle', 'page.md'); // <-- Updated path

  let content = '';
  try {
    content = await fs.readFile(mdFilePath, 'utf-8');
  } catch (error) {
    console.error(`Error reading markdown file at ${mdFilePath}:`, error);
    // If the markdown file doesn't exist, render a 404 page
    notFound();
  }

  // NOTE: The markdown file contains <style> tags.
  // react-markdown by default does not render style tags for security reasons.
  // To render them, you might need to use rehype-raw or configure components.
  // For now, the styles defined in the markdown won't apply.
  // Consider moving styles to a global CSS file or using Tailwind classes.

  return (
    <article className="prose prose-invert max-w-none dark:prose-invert">
      {/* prose classes from @tailwindcss/typography for basic styling */}
      {/* Add rehypePlugins={[rehypeRaw]} to ReactMarkdown if you need to render the inline styles/HTML */}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </article>
  );
}

// Optional: Add metadata if needed, can also be dynamic based on content
// export async function generateMetadata({ params }: PageProps) {
//   // You could potentially read the title from the markdown frontmatter here
//   return {
//     title: 'DreamWeaver AI - Dream Oracle', // Placeholder title
//   };
// }