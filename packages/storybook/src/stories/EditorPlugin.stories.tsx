import type { Meta, StoryObj } from '@storybook/react';
import { JsonViewer } from 'react-json-view-next';
import { withClipboard } from 'react-json-view-next/plugins/clipboard';
import { withAdd, withDelete, withEdit, withEditor } from 'react-json-view-next/plugins/editor';

const sampleUserData = {
  id: 101,
  username: 'jericbas',
  active: true,
  roles: ['maintainer', 'architect'],
  profile: {
    bio: 'Software engineer & open-source author',
    location: 'Tokyo',
    stars: 540
  }
};

const meta: Meta<typeof JsonViewer> = {
  title: 'Plugins/Editor',
  component: JsonViewer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Interactive editing capabilities via the tree-shakeable Editor Plugin (`react-json-view-next/plugins/editor`). Supports `withEditor`, granular factories (`withEdit`, `withAdd`, `withDelete`), Ctrl/Cmd + click editing, type preview, add-key modal, and validation banners.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof JsonViewer>;

export const FullEditor: Story = {
  args: {
    src: sampleUserData,
    name: 'user',
    theme: 'onedark',
    plugins: [
      withEditor({
        onEdit: edit => console.log('Edit submitted:', edit),
        onAdd: add => console.log('Add submitted:', add),
        onDelete: del => console.log('Delete submitted:', del)
      })
    ]
  }
};

export const GranularEditOnly: Story = {
  args: {
    src: sampleUserData,
    name: 'user',
    theme: 'onedark',
    plugins: [
      withEdit(edit => {
        console.log('Edit only:', edit);
      })
    ]
  }
};

export const GranularAddOnly: Story = {
  args: {
    src: sampleUserData,
    name: 'user',
    theme: 'onedark',
    plugins: [
      withAdd(add => {
        console.log('Add only:', add);
      })
    ]
  }
};

export const GranularDeleteOnly: Story = {
  args: {
    src: sampleUserData,
    name: 'user',
    theme: 'onedark',
    plugins: [
      withDelete(del => {
        console.log('Delete only:', del);
      })
    ]
  }
};

export const CustomValidationRule: Story = {
  args: {
    src: sampleUserData,
    name: 'user',
    theme: 'onedark',
    plugins: [
      withEditor({
        validationMessage: 'Validation Failed: String must be at least 3 characters',
        onEdit: edit => {
          if (typeof edit.new_value === 'string' && edit.new_value.length < 3) {
            return false;
          }
          console.log('Valid edit:', edit);
        }
      })
    ]
  }
};

export const EditorWithClipboard: Story = {
  args: {
    src: sampleUserData,
    name: 'user',
    theme: 'onedark',
    plugins: [
      withClipboard({ copyPath: true }),
      withEditor({
        onEdit: () => {},
        onAdd: () => {},
        onDelete: () => {}
      })
    ]
  }
};
