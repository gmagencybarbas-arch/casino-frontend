"use client";

import { BlockRenderer } from "@/blocks/BlockRenderer";
import { LazyBlock } from "@/components/LazyBlock";
import type { LayoutBlock } from "@/types/layout";

interface BlocksAreaProps {
  blocks: LayoutBlock[];
}

export function BlocksArea({ blocks }: BlocksAreaProps) {
  return (
    <div className="space-y-8">
      {blocks.map((block, index) => (
        <LazyBlock key={`${block.type}-${index}`}>
          <BlockRenderer block={block} />
        </LazyBlock>
      ))}
    </div>
  );
}
