import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Status, RiskLevel, Label } from "@/types";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Status variants
        "new": "bg-status-new/10 text-status-new border border-status-new/20",
        "status-assigned": "bg-status-assigned/10 text-status-assigned border border-status-assigned/20",
        "status-in-progress": "bg-status-in-progress/10 text-status-in-progress border border-status-in-progress/20",
        "status-waiting": "bg-status-waiting/10 text-status-waiting border border-status-waiting/20",
        "processed": "bg-status-converted/10 text-status-converted border border-status-converted/20",
        "failed": "bg-status-closed/10 text-status-closed border border-status-closed/20",
        
        // Risk variants
        "risk-crisis": "bg-risk-crisis/10 text-risk-crisis border border-risk-crisis/20",
        "risk-high": "bg-risk-high/10 text-risk-high border border-risk-high/20",
        "risk-medium": "bg-risk-medium/10 text-risk-medium border border-risk-medium/20",
        "risk-low": "bg-risk-low/10 text-risk-low border border-risk-low/20",
        
        // Label variants
        "label-potential": "bg-label-potential/10 text-label-potential border border-label-potential/20",
        "label-not-relevant": "bg-label-not-relevant/10 text-label-not-relevant border border-label-not-relevant/20",
        
        // Platform variants
        "platform-reddit": "bg-orange-500/10 text-orange-600 border border-orange-500/20",
        "platform-youtube": "bg-red-500/10 text-red-600 border border-red-500/20",
      },
    },
    defaultVariants: {
      variant: "new",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

// Helper components for specific badge types
interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getVariant = (status) => {
    switch (status) {
      case 0: return "new";
      case 1: return "status-in-progress";
      case 2: return "processed";
      case 3: return "failed";
    }
  };

  return (
    <Badge variant={getVariant(status) as any} className={className}>
      {getVariant(status)}
    </Badge>
  );
}

interface RiskBadgeProps {
  risk: RiskLevel;
  className?: string;
}

export function RiskBadge({ risk, className }: RiskBadgeProps) {
  const getVariant = (risk: RiskLevel) => {
    switch (risk) {
      case "Crisis": return "risk-crisis";
      case "High": return "risk-high";
      case "Medium": return "risk-medium";
      case "Low": return "risk-low";
      default: return "risk-low";
    }
  };

  return (
    <Badge variant={getVariant(risk) as any} className={className}>
      {risk}
    </Badge>
  );
}

interface LabelBadgeProps {
  label: Label;
  className?: string;
}

export function LabelBadge({ label, className }: LabelBadgeProps) {
  const getVariant = (label: Label) => {
    switch (label) {
      case "Potential Lead": return "label-potential";
      case "Not Relevant": return "label-not-relevant";
      default: return "label-not-relevant";
    }
  };

  return (
    <Badge variant={getVariant(label) as any} className={className}>
      {label}
    </Badge>
  );
}

interface PlatformBadgeProps {
  platform: "reddit" | "youtube";
  className?: string;
}

export function PlatformBadge({ platform, className }: PlatformBadgeProps) {
  const getVariant = (platform: "reddit" | "youtube") => {
    return platform === "reddit" ? "platform-reddit" : "platform-youtube";
  };

  return (
    <Badge variant={getVariant(platform) as any} className={className}>
      {platform}
    </Badge>
  );
}

export { Badge, badgeVariants };