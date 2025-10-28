"use client";

import { Typography, Table, EmptyState } from "@rakamin/ui";
import type { Candidate } from "@/services/api/candidate.action";

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

const dummyData: RowData[] = [
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
    dob: "30 January 2001",
    domicile: "Bandung",
    gender: "Female",
    linkedin: "https://linkedin.com/in/siti",
  },
  {
    id: "3",
    namaLengkap: "Siti Rahma",
    email: "siti@example.com",
    phone: "+62 813 2345 6789",
    dob: "30 January 2001",
    domicile: "Bandung",
    gender: "Female",
    linkedin: "https://linkedin.com/in/siti",
  },
  {
    id: "4",
    namaLengkap: "Siti Rahma",
    email: "siti@example.com",
    phone: "+62 813 2345 6789",
    dob: "30 January 2001",
    domicile: "Bandung",
    gender: "Female",
    linkedin: "https://linkedin.com/in/siti",
  },
  {
    id: "5",
    namaLengkap: "Siti Rahma",
    email: "siti@example.com",
    phone: "+62 813 2345 6789",
    dob: "30 January 2001",
    domicile: "Bandung",
    gender: "Female",
    linkedin: "https://linkedin.com/in/siti",
  },
  {
    id: "6",
    namaLengkap: "Budi Santoso",
    email: "budi@example.com",
    phone: "+62 811 9876 5432",
    dob: "1994-05-30",
    domicile: "Surabaya",
    gender: "Male",
    linkedin: "https://linkedin.com/in/budi/asdasdasdasd/asdasdasdasdsadasdasd/",
  },
];

type ManageCandidatePageType = { 
  jobID: string;
  candidates: Candidate[];
  jobTitle?: string;
}

// Transform candidate attributes to flat object for table
const transformCandidateToRowData = (candidate: Candidate): RowData => {
  const attributesMap = candidate.attributes.reduce((acc, attr) => {
    acc[attr.key] = attr.value;
    return acc;
  }, {} as Record<string, string>);

  return {
    id: candidate.id,
    namaLengkap: attributesMap.full_name || '',
    email: attributesMap.email || '',
    phone: attributesMap.phone || '',
    dob: attributesMap.dob || '',
    domicile: attributesMap.domicile || '',
    gender: attributesMap.gender || '',
    linkedin: attributesMap.linkedin_link || '',
  };
};

export default function ManageCandidatePage({ jobID, candidates, jobTitle }: ManageCandidatePageType) {
  // Transform candidates data for table
  const tableData = candidates.map(transformCandidateToRowData);
  return (
    <div>
      <Typography variant="TextXLBold" className="mb-6">
        {jobTitle || "Manage Candidates"}
      </Typography>

      {tableData?.length > 0 ? (
        <Table<RowData>
          columns={[
            { key: "namaLengkap", title: "NAMA LENGKAP", width: "210px", isFixed: true },
            { key: "email", title: "EMAIL ADDRESS", width: "189px" },
            { key: "phone", title: "PHONE NUMBERS", width: "189px" },
            { key: "dob", title: "DATE OF BIRTH", width: "189px" },
            { key: "domicile", title: "DOMICILE", width: "189px" },
            { key: "gender", title: "GENDER", width: "125px" },
            {
              key: "linkedin",
              title: "LINK LINKEDIN",
              width: "249px",
              render: (row: RowData) => (
                <a href={row.linkedin} target="_blank" rel="noreferrer" className="text-primary inline-block w-[249px] truncate">
                  <Typography variant="TextMRegular" className="truncate">
                    {row.linkedin}
                  </Typography>
                </a>
              ),
            },
          ]}
          data={tableData}
          selectionKey="namaLengkap"
        />
      ) : (
        <EmptyState
          icon="/empty/empty-candidate.svg"
          title="No candidates found"
          description="Share your job vacancies so that more candidates will apply."
        />
      )}
     
    </div>
  );
}