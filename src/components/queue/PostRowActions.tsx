import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { mockUsers } from "@/data/mockData";
import { Status, RiskLevel, Post } from "@/types";

interface PostRowActionsProps {
  post: Post;
  onAssign: (postId: string, userId: string) => void;
  onMarkFalsePositive: (postId: string) => void;
  onSetStatus: (postId: string, status: Status) => void;
  onSetRisk: (postId: string, risk: RiskLevel) => void;
  onOpenDetails: (postId: string) => void;
}

const statuses: Status[] = ["New", "Assigned", "In Outreach", "Waiting Reply", "Converted", "Closed – No Fit"];
const riskLevels: RiskLevel[] = ["Crisis", "High", "Medium", "Low"];

export function PostRowActions({
  post,
  onAssign,
  onMarkFalsePositive,
  onSetStatus,
  onSetRisk,
  onOpenDetails
}: PostRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover border border-border">
        <DropdownMenuItem 
          onClick={() => onOpenDetails(post.id)}
          className="hover:bg-accent"
        >
          Open Details
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={() => onMarkFalsePositive(post.id)}
          className="hover:bg-accent"
        >
          Mark False Positive
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
          Assign to
        </div>
        {mockUsers.map((user) => (
          <DropdownMenuItem
            key={user.id}
            onClick={() => onAssign(post.id, user.id)}
            className="hover:bg-accent pl-4"
          >
            {user.name}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        
        <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
          Set Status
        </div>
        {statuses.map((status) => (
          <DropdownMenuItem
            key={status}
            onClick={() => onSetStatus(post.id, status)}
            className="hover:bg-accent pl-4"
          >
            {status}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        
        <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
          Set Risk
        </div>
        {riskLevels.map((risk) => (
          <DropdownMenuItem
            key={risk}
            onClick={() => onSetRisk(post.id, risk)}
            className="hover:bg-accent pl-4"
          >
            {risk}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}