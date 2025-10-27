import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SearchSelect, SearchSelectProps } from "./SearchSelect";

const meta: Meta<SearchSelectProps> = {
  title: "Inputs/SearchSelect",
  component: SearchSelect,
  parameters: {
    docs: {
      description: {
        component:
          "SearchSelect berbasis Ant Design dengan dukungan pencarian, di-styling dengan Tailwind. Border berubah ke warna primary saat hover/focus, memiliki padding dan tinggi standar.",
      },
    },
  },
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    isMandatory: { control: "boolean" },
    disabled: { control: "boolean" },
    isError: { control: "boolean" },
    allowClear: { control: "boolean" },
    showSearch: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<SearchSelectProps>;

const acehOptions = [
  { value: "aceh-barat", label: "Kabupaten Aceh Barat" },
  { value: "aceh-barat-daya", label: "Kabupaten Aceh Barat Daya" },
  { value: "aceh-besar", label: "Kabupaten Aceh Besar" },
  { value: "aceh-jaya", label: "Kabupaten Aceh Jaya" },
  { value: "aceh-utara", label: "Kabupaten Aceh Utara" },
  { value: "banda-aceh", label: "Kota Banda Aceh" },
  { value: "lhokseumawe", label: "Kota Lhokseumawe" },
];

export const Default: Story = {
  args: {
    label: "Domisili",
    isMandatory: true,
    placeholder: "Cari domisili kabupaten/kota",
    options: acehOptions,
    allowClear: true,
    showSearch: true,
  },
};

export const ErrorState: Story = {
  args: {
    label: "Domisili",
    isMandatory: true,
    placeholder: "Cari domisili",
    options: acehOptions,
    isError: true,
  },
};