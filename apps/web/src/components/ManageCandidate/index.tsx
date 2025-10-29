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
    // Support both legacy and new keys
    phone: attributesMap.phone_number || attributesMap.phone || '',
    dob: attributesMap.date_of_birth || attributesMap.dob || '',
    domicile: attributesMap.domicile.replaceAll('-', ' ') || '',
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