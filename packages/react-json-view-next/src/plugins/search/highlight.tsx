import type React from 'react';

export function highlightText(
  text: string,
  query: string,
  caseSensitive = false,
  highlightColor = '#ffd700'
): React.ReactNode {
  if (!query || !text) return text;

  const flags = caseSensitive ? 'g' : 'gi';
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, flags);
  const parts = text.split(regex);

  if (parts.length <= 1) return text;

  return (
    <>
      {parts.map((part, index) => {
        const isMatch = caseSensitive ? part === query : part.toLowerCase() === query.toLowerCase();

        if (isMatch) {
          return (
            <mark
              key={`match-${index}-${part}`}
              style={{
                backgroundColor: highlightColor,
                color: '#000000',
                padding: '0 2px',
                borderRadius: '2px',
                fontWeight: 'bold'
              }}
            >
              {part}
            </mark>
          );
        }
        return part;
      })}
    </>
  );
}
