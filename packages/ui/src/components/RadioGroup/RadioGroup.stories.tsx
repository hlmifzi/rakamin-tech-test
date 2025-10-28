import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { RadioGroup } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Basic: Story = {
  render: () => {
    const [val, setVal] = useState<string>("female");
    return (
      <RadioGroup
        label="Pronoun (gender)"
        isMandatory
        name="pronoun"
        options={[
          { label: "She/her (Female)", value: "female" },
          { label: "He/him (Male)", value: "male" },
        ]}
        value={val}
        onChange={setVal}
      />
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [val, setVal] = useState<string>("");
    return (
      <RadioGroup
        label="Pronoun (gender)"
        isMandatory
        name="pronoun"
        options={[
          { label: "She/her (Female)", value: "female" },
          { label: "He/him (Male)", value: "male" },
        ]}
        value={val}
        onChange={setVal}
        error
        helperText="* field pronoun is required"
      />
    );
  },
};