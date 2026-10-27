import type { Meta, StoryObj } from '@storybook/react';
import ReactJson from 'react-json-view-next';
import { withVirtualizer } from 'react-json-view-next/plugins/virtual';

const thousandItems = new Array(1000).fill(null).map((_, i) => ({
  id: `item-${i + 1}`,
  name: `User record #${i + 1}`,
  score: Math.round(Math.random() * 100),
  active: i % 2 === 0
}));

const meta: Meta<typeof ReactJson> = {
  title: 'Plugins/VirtualPlugin',
  component: ReactJson
};

export default meta;
type Story = StoryObj<typeof ReactJson>;

export const VirtualizedOneThousandNodes: Story = {
  render: () => (
    <ReactJson
      src={thousandItems}
      name="users1000"
      plugins={[
        withVirtualizer({
          itemHeight: 24,
          maxHeight: 400,
          overscan: 5
        })
      ]}
    />
  )
};

export const VirtualizedTenThousandNodes: Story = {
  render: () => {
    const tenThousand = new Array(10000).fill(null).map((_, i) => ({
      index: i,
      uuid: `rec_${i}`,
      timestamp: Date.now() + i
    }));

    return (
      <ReactJson
        src={tenThousand}
        name="largeDataset"
        plugins={[
          withVirtualizer({
            itemHeight: 24,
            maxHeight: 450,
            overscan: 8
          })
        ]}
      />
    );
  }
};
