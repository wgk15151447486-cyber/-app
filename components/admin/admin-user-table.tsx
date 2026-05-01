import { Badge } from "@/components/ui/badge";
import type { Profile } from "@/types/database";

interface Props {
  users: Profile[];
}

export function AdminUserTable({ users }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
              Email
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
              Role
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
              Plan
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
              Joined
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-muted/30">
              <td className="px-4 py-3 font-medium">{user.email}</td>
              <td className="px-4 py-3">
                <Badge
                  variant={user.role === "admin" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {user.role}
                </Badge>
              </td>
              <td className="px-4 py-3 text-muted-foreground text-xs">
                {user.plan}
              </td>
              <td className="px-4 py-3 text-right text-muted-foreground text-xs tabular-nums">
                {new Date(user.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-8 text-center text-muted-foreground"
              >
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
