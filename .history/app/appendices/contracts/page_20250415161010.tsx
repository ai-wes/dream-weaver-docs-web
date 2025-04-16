import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link'; // Although not linking yet, good to have

// This is an async Server Component
export default async function ContractsAppendixPage() {

  const contractsDir = path.join(process.cwd(), 'newdocs', '7_Appendices', 'contracts');
  let contractFiles: string[] = [];

  try {
    const entries = await fs.readdir(contractsDir);
    contractFiles = entries.filter(
      (file) => file.endsWith('.sol') && !file.startsWith('.') // Filter for .sol files, ignore hidden
    );
    contractFiles.sort(); // Sort alphabetically
  } catch (error) {
    console.error(`Error reading contracts directory at ${contractsDir}:`, error);
    // Optionally, render an error message instead of an empty list
    // throw new Error("Could not load contract files."); // Or throw an error
  }

  return (
    <article className="prose prose-invert max-w-none dark:prose-invert p-6">
      <h1>Contracts Appendix</h1>
      <p>The following Solidity (.sol) contract files are part of the project:</p>
      {contractFiles.length > 0 ? (
        <ul>
          {contractFiles.map((fileName) => (
            <li key={fileName}>
              <Link href={`/appendices/contracts/${encodeURIComponent(fileName)}`}>
                <code>{fileName}</code>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No contract files found or could not read the directory.</p>
      )}
    </article>
  );
}

// Optional: Add metadata
export async function generateMetadata() {
  return {
    title: 'Appendices - Contracts',
  };
}