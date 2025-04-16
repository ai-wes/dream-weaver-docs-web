import fs from 'fs/promises';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import { Mermaid } from '@/components/Mermaid';

export default async function SmartContractsOverviewPage() {
  const filePath = path.join(process.cwd(), 'app', 'smart-contracts', 'overview', 'page.md');
  let content = '';
  try {
    content = await fs.readFile(filePath, 'utf8');
  } catch (error) {
    console.error('Error reading markdown file:', error);
    return <div>Error loading content.</div>;
  }

  // Custom renderer for code blocks (Mermaid support)
  const components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      const codeString = String(children).trim();
      if (match && match[1] === 'mermaid') {
        return <Mermaid code={codeString} />;
      }
      return (
        <pre className={className} {...props}>
          <code>{children}</code>
        </pre>
      );
    },
  };

  return (
    <div className="prose dark:prose-invert max-w-none p-6">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export const metadata = {
  title: 'Smart Contracts Overview - Dream Weaver Docs',
  description: 'Overview of the smart contracts powering the Dream Weaver ecosystem.',
};
