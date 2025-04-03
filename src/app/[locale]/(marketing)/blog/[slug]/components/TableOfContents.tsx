import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

type TOCItem = {
  id: string;
  text: string;
};

type TableOfContentsProps = {
  items: TOCItem[];
};

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <div
      style={{
        width: 'fit-content',
        backgroundColor: '#0F0F0FB2',
        padding: '1rem',
        borderRadius: '13.84px',
        marginBottom: '2rem',
      }}
    >
      <div className="toc">
        <div
          style={{ display: 'flex', justifyContent: 'space-between', width: '100%', cursor: 'pointer', gap: '1rem' }}
          onClick={toggleCollapse}
        >
          <div>
            <h5>In this article</h5>
          </div>
          {isCollapsed ? <IoIosArrowDown size={20} /> : <IoIosArrowUp size={20} />}
        </div>
        {!isCollapsed && (
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <a href={`#${item.id}`} style={{ color: 'white' }}>
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
