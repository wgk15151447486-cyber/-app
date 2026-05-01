import { Card, CardContent } from "@/components/ui/card";
import { FileText, Image as ImageIcon, ShoppingBag, Info } from "lucide-react";

export function PdfPreview() {
  return (
    <Card>
      <CardContent className="space-y-4 py-6">
        <div className="flex items-center gap-3">
          <FileText className="size-10 text-primary" />
          <div>
            <p className="font-medium">Project Export PDF</p>
            <p className="text-sm text-muted-foreground">
              One-click download of your complete furnishing plan.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-2">
            <Info className="mt-0.5 size-4 text-muted-foreground shrink-0" />
            <span className="text-sm text-muted-foreground">
              Project title, room type, purpose, and budget
            </span>
          </div>
          <div className="flex items-start gap-2">
            <ImageIcon className="mt-0.5 size-4 text-muted-foreground shrink-0" />
            <span className="text-sm text-muted-foreground">
              Room design image and variant title
            </span>
          </div>
          <div className="flex items-start gap-2">
            <FileText className="mt-0.5 size-4 text-muted-foreground shrink-0" />
            <span className="text-sm text-muted-foreground">
              Design summary, why it works, and style tags
            </span>
          </div>
          <div className="flex items-start gap-2">
            <ShoppingBag className="mt-0.5 size-4 text-muted-foreground shrink-0" />
            <span className="text-sm text-muted-foreground">
              Complete shopping list with budget totals
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
