import Link from "next/link";
import { getProject } from "@/lib/projects/get-project";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckoutButton } from "./checkout-button";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ projectId: string }>;
}

export default async function CheckoutPage({ params }: Props) {
  const { projectId } = await params;
  const project = await getProject(projectId);

  if (project.is_paid) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 sm:px-6 sm:py-24 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Already Unlocked</h1>
        <p className="mt-2 text-muted-foreground">
          This project is already unlocked. You can view all shopping details.
        </p>
        <Link
          href={`/projects/${projectId}`}
          className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground"
        >
          Back to project
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-2xl font-bold tracking-tight">Unlock Project</h1>
      <p className="mt-1 text-muted-foreground">
        One-time payment to access complete shopping details for this project.
      </p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">{project.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between border-t pt-4">
            <span className="font-medium">Single project unlock</span>
            <span className="text-lg font-bold">$4.99</span>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>&#10003; Product links and supplier information</li>
            <li>&#10003; Detailed purchase reasons</li>
            <li>&#10003; Price comparisons</li>
            <li>&#10003; Lifetime access for this project</li>
          </ul>
          <CheckoutButton projectId={projectId} />
        </CardContent>
      </Card>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Secure payment powered by Stripe.{" "}
        <Link href={`/projects/${projectId}`} className="text-primary hover:underline">
          Cancel and go back
        </Link>
      </p>
    </div>
  );
}
