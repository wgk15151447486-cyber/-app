import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ projectId: string }>;
}

export default async function PaymentSuccessPage({ params }: Props) {
  const { projectId } = await params;

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6 sm:py-24 text-center">
      <CheckCircle className="mx-auto size-12 text-green-500" />
      <h1 className="mt-4 text-2xl font-bold tracking-tight">Payment Successful</h1>
      <p className="mt-2 text-muted-foreground">
        Your project is now unlocked. You can access complete shopping details
        including product links, supplier information, and more.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href={`/projects/${projectId}`}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground"
        >
          View project
        </Link>
        <Link
          href={`/projects/${projectId}/variants`}
          className="inline-flex h-10 items-center justify-center rounded-lg border px-6 text-sm font-medium transition-colors hover:bg-muted"
        >
          Browse design variants
        </Link>
      </div>
    </div>
  );
}
