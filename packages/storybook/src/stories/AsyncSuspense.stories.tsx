import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';
import { Suspense, useMemo } from 'react';
import ReactJson from 'react-json-view-next';

function fetchMockJsonData(delayMs = 1200): Promise<object> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        status: 'success',
        message: 'Resolved via React 19 native use() unwrapping!',
        timestamp: new Date().toISOString(),
        payload: {
          items: ['item1', 'item2', 'item3'],
          count: 3
        }
      });
    }, delayMs);
  });
}

const AsyncJsonComponent: React.FC<{ delayMs?: number }> = ({ delayMs = 1200 }) => {
  const promise = useMemo(() => fetchMockJsonData(delayMs), [delayMs]);

  return (
    <Suspense
      fallback={
        <div style={{ padding: '16px', color: '#666', fontStyle: 'italic' }}>
          ⏳ Loading async data with React 19 Suspense...
        </div>
      }
    >
      <ReactJson src={promise} name="async-promise" theme="monokai" />
    </Suspense>
  );
};

const meta: Meta<typeof AsyncJsonComponent> = {
  title: 'Advanced/AsyncSuspense',
  component: AsyncJsonComponent
};

export default meta;
type Story = StoryObj<typeof AsyncJsonComponent>;

export const NativeReact19Promise: Story = {
  render: () => <AsyncJsonComponent delayMs={1000} />
};
