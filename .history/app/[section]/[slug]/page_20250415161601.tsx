"use client"; // Keep client directive if needed for hooks/interactivity later, but reading fs requires server

import fs from 'fs/promises';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import { Metadata } from 'next'; // For metadata
import Mermaid from '@/components/Mermaid';
import { useMemo } from 'react';
import rehypeRaw from 'rehype-raw';

// Define the expected props passed by Next.js for dynamic routes
interface DynamicPageProps {
  params: {
    section: string;
    slug: string;
  };
}

// Maps route segments to the corresponding directory name in newdocs/
const sectionDirectoryMap: { [key: string]: string } = {
  'project-overview': '0_Project_Overview',
  'dream-weaver-ai': '1_The_DreamWeaver',
  'dreamsoul': '2_The_Dream_Soul_Lucid_Core',
  'gameplay': '3_Immersive_Narrative_Gameplay',
  'blockchain': '4_Immutability_Polygon_Integration',
  'architecture': '5_Architecture_and_BluePrint_Deepdive',
  'roadmap': '6_Roadmap',
  'appendices': '7_Appendices',
};

// Maps route slugs within a section to the corresponding filename stem in newdocs/
const slugFileMap: { [key: string]: { [key: string]: string } } = {
  'project-overview': {
    'intro': '0.1_Project_Overview_and_Intro',
    'ecosystem': '0.2_HighLevel_Ecosystem_Review',
    'audience': '0.3_Who_is_it_for',
    'why': 'why-dreamweaver'
  },
  'dream-weaver-ai': {
    'graph-overview': '1.1a_DreamWeaver_Graph_Overview',
    'graph-deepdive': '1.1b_DreamWeaver_Graph_Deepdive',
    'dream-oracle': '1.2_Dream_oracle',
    'nodes-ownership': '1.3_DreamEssenceNodes_Pocket_Dimensions_And_Ownership',
    'milestones': 'dreamweaver-milestones'
  },
  'dreamsoul': {
    'overview': '2_dream_soul',
    'identity': '2.1_DreamSoul_Living_Identity',
    'ai-entity': '2.2_DreamSoul_AI_Entity'
  },
  'gameplay': {
    'loop': '4.1_Core_Loop_And_Progression',
    'wisps': '4.2_Wisps',
    'runes': '4.3_Dream_Runes',
    'combat': '4.4_Combat_System',
    'ar': '4.5_Augmented_Reality_Integration'
  },
  'blockchain': {
    'overview': 'blockchain'
  },
  'architecture': {
    'ai-systems': 'ai_systems_and_integrations',
    'example-flow': 'example_flow'
  },
  'roadmap': {
    'team': '6.0_The_Team',
    'detailed': '6.1_Detailed_Roadmap_And_Milestones'
  },
  'appendices': {
    'diagrams': '5.1_Overall_Architecture_Diagrams'
    // 'contracts' route needs special handling - excluded here
  }
};

// Async function to get content
async function getMarkdownContent(section: string, slug: string): Promise<string> {
  const sectionDir = sectionDirectoryMap[section];
  const fileNameStem = slugFileMap[section]?.[slug];

  if (!sectionDir || !fileNameStem) {
    console.error(`Could not map route /${section}/${slug} to newdocs file.`);
    notFound(); // Trigger 404
  }

  const mdFilePath = path.join(process.cwd(), 'newdocs', sectionDir, `${fileNameStem}.md`);

  try {
    const content = await fs.readFile(mdFilePath, 'utf-8');
    return content;
  } catch (error) {
    console.error(`Error reading markdown file at ${mdFilePath}:`, error);
    notFound(); // Trigger 404 if file reading fails
  }
}

// This is an async Server Component
export default async function DynamicMarkdownPage({ params }: DynamicPageProps) {
  const { section, slug } = params;
  const content = await getMarkdownContent(section, slug);

  // Custom renderer for code blocks
  const components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      const codeString = String(children).trim();
      if (match && match[1] === 'mermaid') {
        // Render Mermaid diagrams using the Mermaid component
        return <Mermaid code={codeString} />;
      }
      // Default: render code block as usual
      return (
        <pre className={className} {...props}>
          <code>{children}</code>
        </pre>
      );
    },
  };

  return (
    <article className="prose prose-invert max-w-none dark:prose-invert p-6">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}

// Optional: Generate dynamic metadata based on the route
// export async function generateMetadata({ params }: DynamicPageProps): Promise<Metadata> {
//   const { section, slug } = params;
//   // You could potentially fetch frontmatter from the markdown file here
//   // For simplicity, create a basic title
//   const title = `${section.replace('-', ' ')} - ${slug.replace('-', ' ')}`
//                 .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize words
//   return {
//     title: title,
//   };
// }

// Optional: Generate static params for SSG if needed
// export async function generateStaticParams() {
//   const paths: { section: string; slug: string }[] = [];
//   Object.keys(sectionDirectoryMap).forEach(section => {
//     if (slugFileMap[section]) {
//       Object.keys(slugFileMap[section]).forEach(slug => {
//         paths.push({ section, slug });
//       });
//     }
//   });
//   return paths;
// } 