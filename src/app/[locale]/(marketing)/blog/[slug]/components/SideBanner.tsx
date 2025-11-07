import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import type { Text } from '@contentful/rich-text-types';

interface SideBannerProps {
  sideBannerAd: any;
  resolvedAssets: any[];
}

export const SideBanner: React.FC<SideBannerProps> = ({ sideBannerAd, resolvedAssets }) => {
  const getTextContent = (node: any): string => {
    const textNode = node.content?.find((child: any) => 'value' in child) as Text | undefined;
    return textNode?.value || '';
  };

  const renderOptions = {
    renderNode: {
      [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => {
        const textContent = getTextContent(node);
        const id = textContent.replace(/\s+/g, '-').toLowerCase();
        return <h2 id={id}>{children}</h2>;
      },
      [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => {
        const textContent = getTextContent(node);
        const id = textContent.replace(/\s+/g, '-').toLowerCase();
        return <h3 id={id}>{children}</h3>;
      },
      [BLOCKS.HEADING_4]: (node: any, children: React.ReactNode) => {
        const textContent = getTextContent(node);
        const id = textContent.replace(/\s+/g, '-').toLowerCase();
        return <h4 id={id} style={{ fontSize: '24px' }}>{children}</h4>;
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const assetId = node.data.target.sys.id;
        const asset = resolvedAssets.find((item: any) => item.sys.id === assetId);

        if (!asset) return null;

        const { file, title } = asset.fields;
        const contentType = file.contentType.split('/')[0];

        if (contentType === 'image') {
          return (
            <img
              src={`https:${file.url}`}
              alt={title}
              style={{ maxWidth: '60%', height: 'auto', paddingBottom: '10px' }}
            />
          );
        }

        if (contentType === 'video') {
          return (
            <video controls style={{ maxWidth: '100%' }}>
              <source src={`https:${file.url}`} type={file.contentType} />
            </video>
          );
        }

        return <span>Unsupported asset type</span>;
      },
    },
  };

  return (
    <div
      id="hiddenSectionBlog"
      className="custom-col"
      style={{
        width: '450px',
        backgroundColor: '#0F0F0FB2',
        padding: '2rem',
        borderRadius: '13.84px',
        position: 'sticky',
        top: '20px',
        zIndex: 10,
      }}
    >
      <div>
        {sideBannerAd && documentToReactComponents(sideBannerAd.fields.sideAdbanner, renderOptions)}
      </div>
    </div>
  );
}; 