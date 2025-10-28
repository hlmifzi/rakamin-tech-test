import AuthForm from "@/components/AuthForm/AuthForm";

export default function AuthPage({ searchParams }: { searchParams?: { jobID?: string } }) {
  const jobID = searchParams?.jobID ?? "";
  return <AuthForm jobID={jobID} />;
}