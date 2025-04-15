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
  // __dirname is not available in ES modules/Next.js Edge/Server runtime,
  // so we use process.cwd() and the known path structure.
  const mdFilePath = path.join(process.cwd(), 'app', 'project-overview', 'intro', 'page.md');

  let content = '';
  try {
    content = await fs.readFile(mdFilePath, 'utf-8');
  } catch (error) {
    console.error(`Error reading markdown file at ${mdFilePath}:`, error);
    // If the markdown file doesn't exist, render a 404 page
    notFound();
  }

  return (
    <article className="prose prose-invert max-w-none dark:prose-invert">
      {/* prose classes from @tailwindcss/typography for basic styling */}
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
//     title: 'Project Overview - Intro', // Placeholder title
//   };
// }