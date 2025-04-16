import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ContractPageProps {
  params: {
    contract: string;
  };
}

export default async function ContractFilePage({ params }: ContractPageProps) {
  const { contract } = params;
  // Security: Only allow .sol files, prevent path traversal
  if (!contract.endsWith('.sol') || contract.includes('..') || contract.includes('/')) {
    notFound();
  }

  const filePath = path.join(process.cwd(), 'newdocs', '7_Appendices', 'contracts', contract);
  let code = '';
  try {
    code = await fs.readFile(filePath, 'utf-8');
  } catch (error) {
    notFound();
  }

  return (
    <article className="prose prose-invert max-w-none dark:prose-invert p-6">
      <h1>{contract}</h1>
      <SyntaxHighlighter language="solidity" style={vscDarkPlus} wrapLongLines>
        {code}
      </SyntaxHighlighter>
    </article>
  );
}

export async function generateMetadata({ params }: ContractPageProps) {
  return {
    title: `Contract: ${params.contract}`,
  };
} 