import { SidebarTrigger } from "@/components/ui/sidebar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockUsers } from "@/data/mockData";

interface TopBarProps {
  currentUser: string;
  onUserChange: (userId: string) => void;
}

export function TopBar({ currentUser, onUserChange }: TopBarProps) {
  const user = mockUsers.find(u => u.id === currentUser);

  return (
    <header className="h-14 flex items-center justify-between px-4 border-b bg-card">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground">
          Login as:
        </div>
        <Select value={currentUser} onValueChange={onUserChange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {mockUsers.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                <div className="flex items-center gap-2">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={user.avatar_url} />
                    <AvatarFallback className="text-xs">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span>{user.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({user.role})
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </header>
  );
}