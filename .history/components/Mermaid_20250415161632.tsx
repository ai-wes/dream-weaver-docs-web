"use client";
import { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidProps {
  code: string;
}

export default function Mermaid({ code }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      // Generate a unique id for each diagram
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      ref.current.id = id;
      try {
        mermaid.initialize({ startOnLoad: false });
        mermaid.render(id, code, (svgCode) => {
          if (ref.current) {
            ref.current.innerHTML = svgCode;
          }
        });
      } catch (err) {
        if (ref.current) {
          ref.current.innerHTML = `<pre style='color:red;'>Mermaid render error: ${String(err)}</pre>`;
        }
      }
    }
  }, [code]);

  return <div ref={ref} className="mermaid" />;
} 