import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./Table";
import { Typography } from "../Typography/Typography";

interface RowData {
  id: string;
  namaLengkap: string;
  email: string;
  phone: string;
  dob: string;
  domicile: string;
  gender: string;
  linkedin: string;
}

const meta: Meta<typeof Table<RowData>> = {
  title: "Components/Table",
  component: Table<RowData>,
};

export default meta;

const data: RowData[] = [
  {
    id: "1",
    namaLengkap: "Andi Wijaya",
    email: "andi@example.com",
    phone: "+62 812 3456 7890",
    dob: "1995-02-12",
    domicile: "Jakarta",
    gender: "Male",
    linkedin: "https://linkedin.com/in/andi",
  },
  {
    id: "2",
    namaLengkap: "Siti Rahma",
    email: "siti@example.com",
    phone: "+62 813 2345 6789",
    dob: "1996-08-21",
    domicile: "Bandung",
    gender: "Female",
    linkedin: "https://linkedin.com/in/siti",
  },
];

export const Basic: StoryObj<typeof Table<RowData>> = {
  args: {
    columns: [
      { key: "namaLengkap", title: "NAMA LENGKAP", isFixed: true },
      { key: "email", title: "EMAIL ADDRESS" },
      { key: "phone", title: "PHONE NUMBERS" },
      { key: "dob", title: "DATE OF BIRTH" },
      { key: "domicile", title: "DOMICILE" },
      { key: "gender", title: "GENDER" },
      {
        key: "linkedin",
        title: "LINK LINKEDIN",
        render: (row: RowData) => (
          <a href={row.linkedin} target="_blank" rel="noreferrer" className="text-primary">
            Link
          </a>
        ),
      },
    ],
    data,
    selectionKey: "namaLengkap",
  },
};