import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['danger', 'warning', 'success', 'default'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Badge',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning Badge',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success Badge',
  },
};

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Default Badge',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="default">Default</Badge>
    </div>
  ),
};