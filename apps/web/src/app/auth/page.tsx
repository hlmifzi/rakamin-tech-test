import AuthForm from "@/components/AuthForm/AuthForm";

export default async function AuthPage({ searchParams }: { searchParams?: { jobID?: string } }) {
  const searchParamsResult = await searchParams ?? {};
  const jobID = searchParamsResult?.jobID ?? "";
  return <AuthForm jobID={jobID} />;
}