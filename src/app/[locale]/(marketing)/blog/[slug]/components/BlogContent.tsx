import type { Text } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import React from 'react';

type BlogContentProps = {
  content: any;
  resolvedAssets: any[];
  preBlogBanner?: any;
};

export const BlogContent: React.FC<BlogContentProps> = ({ content, resolvedAssets, preBlogBanner }) => {
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
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const assetId = node.data.target.sys.id;
        const asset = resolvedAssets.find((item: any) => item.sys.id === assetId);

        if (!asset) {
          return null;
        }

        const { file, title } = asset.fields;
        const contentType = file.contentType.split('/')[0];

        if (contentType === 'image') {
          return (
            <img
              src={`https:${file.url}`}
              alt={title}
              style={{ maxWidth: '100%', height: 'auto' }}
              className="contentImage"
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
      [BLOCKS.TABLE]: (node: any) => {
        return (
          <table style={{ width: '100%', borderCollapse: 'collapse', margin: '1em 0' }}>
            <thead>
              {node.content
                .filter((rowNode: any) => rowNode.nodeType === 'table-row')
                .map((rowNode: any, rowIndex: number) => (
                  <tr key={rowIndex}>
                    {rowNode.content
                      .filter((cellNode: any) => cellNode.nodeType === 'table-header-cell')
                      .map((headerNode: any, headerIndex: number) => (
                        <th
                          key={headerIndex}
                          style={{
                            padding: '8px',
                            color: '#000',
                            textAlign: 'left',
                            border: '1px solid #ddd',
                            backgroundColor: '#f4f4f4',
                          }}
                        >
                          {headerNode.content.map((paragraphNode: any, paragraphIndex: number) =>
                            paragraphNode.nodeType === 'paragraph'
                              ? paragraphNode.content.map((textNode: any) =>
                                textNode.nodeType === 'text' ? textNode.value : null,
                              )
                              : null,
                          )}
                        </th>
                      ))}
                  </tr>
                ))}
            </thead>
            <tbody>
              {node.content
                .filter((rowNode: any) => rowNode.nodeType === 'table-row')
                .map((rowNode: any, rowIndex: number) => (
                  <tr key={rowIndex}>
                    {rowNode.content
                      .filter((cellNode: any) => cellNode.nodeType === 'table-cell')
                      .map((cellNode: any, cellIndex: number) => (
                        <td
                          key={cellIndex}
                          style={{
                            padding: '8px',
                            textAlign: 'left',
                            color: '#fff',
                            border: '1px solid #ddd',
                          }}
                        >
                          {cellNode.content.map((paragraphNode: any, paragraphIndex: number) =>
                            paragraphNode.nodeType === 'paragraph'
                              ? paragraphNode.content.map((textNode: any) =>
                                textNode.nodeType === 'text' ? textNode.value : null,
                              )
                              : null,
                          )}
                        </td>
                      ))}
                  </tr>
                ))}
            </tbody>
          </table>
        );
      },
    },
  };

  return (
    <div className="rich-text-container">
      {preBlogBanner && (
        <div
          style={{
            width: '100%',
            backgroundColor: '#2c172a',
            padding: '1rem 2rem',
            borderRadius: '13.84px',
            height: 'auto',
            marginBottom: '2rem',
          }}
        >
          {documentToReactComponents(preBlogBanner.fields.blogBanner, renderOptions)}
        </div>
      )}
      {content && documentToReactComponents(content, renderOptions)}
    </div>
  );
};
