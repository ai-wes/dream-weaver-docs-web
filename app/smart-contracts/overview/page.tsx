import { promises as fs } from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote';
import { Mermaid } from '@/components/Mermaid'; // Assuming Mermaid component exists
import { components } from '@/components/mdx-components'; // Assuming shared MDX components

export default async function SmartContractsOverviewPage() {
  const filePath = path.join(process.cwd(), 'app', 'smart-contracts', 'overview', 'page.md');
  let source = '';
  try {
    source = await fs.readFile(filePath, 'utf8');
  } catch (error) {
    console.error("Error reading markdown file:", error);
    // Handle error appropriately, maybe return a 404 or an error message
    return <div>Error loading content.</div>;
  }

  // Add Mermaid component if needed, or other custom components
  const mdxComponents = { ...components, Mermaid };

  return (
    <div className="prose dark:prose-invert max-w-none p-6">
      <MDXRemote source={source} components={mdxComponents} />
    </div>
  );
}

export const metadata = {
  title: 'Smart Contracts Overview - Dream Weaver Docs',
  description: 'Overview of the smart contracts powering the Dream Weaver ecosystem.',
};
