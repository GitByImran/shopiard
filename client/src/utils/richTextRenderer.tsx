import React from "react";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

interface RichTextRendererProps {
  richText: any; // Adjust the type according to your data structure
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ richText }) => {
  if (!richText) {
    return null;
  }

  // Define rendering options
  const options = {
    renderNode: {
      // Define custom rendering for specific nodes
      // Example: Render paragraph nodes as div elements
      [BLOCKS.PARAGRAPH]: ({ node, children }: any) => <div>{children}</div>,
      // Add more custom renderings as needed
    },
    renderMark: {
      // Define custom rendering for specific marks
      // Example: Render bold text with <strong> tag
      [MARKS.BOLD]: (text: any) => <strong>{text}</strong>,
      // Add more custom renderings as needed
    },
  };

  // Convert the rich text to React components using the defined options
  const reactComponents = documentToReactComponents(richText, options);

  return <div>{reactComponents}</div>;
};

export default RichTextRenderer;
