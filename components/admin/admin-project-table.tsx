import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types/project";

interface ProjectRow extends Project {
  user_email?: string;
}

interface Props {
  projects: ProjectRow[];
}

const roomTypeLabels: Record<string, string> = {
  bedroom: "Bedroom",
  living_room: "Living Room",
  studio: "Studio",
  entire_home: "Entire Home",
  hotel_room: "Hotel Room",
  other: "Other",
};

const purposeLabels: Record<string, string> = {
  personal_use: "Personal Use",
  long_term_rental: "Long-term Rental",
  short_term_rental: "Short-term Rental",
  hotel_operation: "Hotel Operation",
};

export function AdminProjectTable({ projects }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
              Title
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
              User
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
              Type
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
              Purpose
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
              Status
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase">
              Paid
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
              Created
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-muted/30">
              <td className="px-4 py-3 font-medium max-w-[200px] truncate">
                {project.title}
              </td>
              <td className="px-4 py-3 text-muted-foreground text-xs">
                {project.user_email ?? project.user_id.slice(0, 8)}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {roomTypeLabels[project.room_type] ?? project.room_type}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {purposeLabels[project.purpose] ?? project.purpose}
              </td>
              <td className="px-4 py-3">
                <Badge variant="secondary" className="text-xs">
                  {project.status}
                </Badge>
              </td>
              <td className="px-4 py-3 text-center">
                {project.is_paid ? (
                  <span className="text-green-600 text-xs font-medium">Paid</span>
                ) : (
                  <span className="text-muted-foreground text-xs">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-right text-muted-foreground text-xs tabular-nums">
                {new Date(project.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
          {projects.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="px-4 py-8 text-center text-muted-foreground"
              >
                No projects yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
