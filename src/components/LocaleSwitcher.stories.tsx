import type { Meta, StoryObj } from '@storybook/react';

import { LocaleSwitcher } from './LocaleSwitcher';

const meta = {
  component: LocaleSwitcher,
} satisfies Meta<typeof LocaleSwitcher>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
