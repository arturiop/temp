import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { mockUsers } from "@/data/mockData";
import { Status, RiskLevel } from "@/types";

interface BulkActionsBarProps {
  selectedCount: number;
  onAssign: (userId: string) => void;
  onMarkFalsePositive: () => void;
  onSetStatus: (status: Status) => void;
  onSetRisk: (risk: RiskLevel) => void;
}

const statuses: Status[] = ["New", "Assigned", "In Outreach", "Waiting Reply", "Converted", "Closed – No Fit"];
const riskLevels: RiskLevel[] = ["Crisis", "High", "Medium", "Low"];

export function BulkActionsBar({
  selectedCount,
  onAssign,
  onMarkFalsePositive,
  onSetStatus,
  onSetRisk
}: BulkActionsBarProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">
        {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
      </span>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Assign to... <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-popover border border-border">
            {mockUsers.map((user) => (
              <DropdownMenuItem
                key={user.id}
                onClick={() => onAssign(user.id)}
                className="hover:bg-accent"
              >
                {user.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button 
          variant="outline" 
          size="sm"
          onClick={onMarkFalsePositive}
        >
          Mark False Positive
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Set Status <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-popover border border-border">
            {statuses.map((status) => (
              <DropdownMenuItem
                key={status}
                onClick={() => onSetStatus(status)}
                className="hover:bg-accent"
              >
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Set Risk <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-popover border border-border">
            {riskLevels.map((risk) => (
              <DropdownMenuItem
                key={risk}
                onClick={() => onSetRisk(risk)}
                className="hover:bg-accent"
              >
                {risk}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}