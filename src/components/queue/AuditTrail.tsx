import { AuditEvent } from "@/types";
import { mockUsers } from "@/data/mockData";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AuditTrailProps {
  auditEvents: AuditEvent[];
}

export function AuditTrail({ auditEvents }: AuditTrailProps) {
  const getAuditDescription = (event: AuditEvent) => {
    const user = mockUsers.find(u => u.id === event.actor_user_id)?.name || "System";
    
    switch (event.type) {
      case "create":
        return `${user} created the post`;
      case "triage":
        return `${user} triaged the post`;
      case "assign":
        const assignee = mockUsers.find(u => u.id === event.payload.assignee_id)?.name || "Unknown";
        return `${user} assigned to ${assignee}`;
      case "status_change":
        return `${user} changed status to ${event.payload.status}`;
      case "note":
        return `${user} added a note`;
      case "outreach_event":
        return `${user} logged outreach: ${event.payload.kind}`;
      case "import":
        return `${user} imported via CSV`;
      default:
        return `${user} made changes`;
    }
  };

  const getAuditTypeColor = (type: string) => {
    switch (type) {
      case "create":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "assign":
        return "bg-green-100 text-green-800 border-green-200";
      case "status_change":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "triage":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "note":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "outreach_event":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Audit Trail</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {auditEvents.length === 0 ? (
            <p className="text-muted-foreground text-sm">No audit events recorded.</p>
          ) : (
            auditEvents
              .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
              .map((event) => (
                <div key={event.id} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getAuditTypeColor(event.type)}`}
                  >
                    {event.type.replace('_', ' ')}
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">
                      {getAuditDescription(event)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(event.at), { addSuffix: true })}
                    </p>
                    {event.payload && Object.keys(event.payload).length > 0 && (
                      <div className="mt-2 p-2 bg-muted rounded text-xs">
                        <pre className="text-muted-foreground">
                          {JSON.stringify(event.payload, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}