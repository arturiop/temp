import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Trash2, 
  Download, 
  AlertTriangle,
  Users,
  Tags,
  Settings as SettingsIcon,
  Shield
} from "lucide-react";
import { mockUsers } from "@/data/mockData";
import { Status, RiskLevel, Label as PostLabel } from "@/types";

export default function Settings() {
  const [activeTab, setActiveTab] = useState<"users" | "taxonomies" | "keywords" | "data">("users");

  // Mock state for demonstration
  const [users, setUsers] = useState(mockUsers);
  const [statuses] = useState<Status[]>([
    "New",
    "Assigned", 
    "In Outreach",
    "Waiting Reply",
    "Converted",
    "Closed – No Fit"
  ]);
  const [riskLevels] = useState<RiskLevel[]>(["Crisis", "High", "Medium", "Low"]);
  const [labels] = useState<PostLabel[]>(["Potential Lead", "Not Relevant"]);
  const [keywords, setKeywords] = useState("bankruptcy, cash flow, revenue down, consultants, B2B SaaS, customer acquisition cost, Series A, sales funnel");

  const tabs = [
    { id: "users", label: "Users", icon: Users },
    { id: "taxonomies", label: "Taxonomies", icon: Tags },
    { id: "keywords", label: "Keywords", icon: SettingsIcon },
    { id: "data", label: "Data Management", icon: Shield }
  ];

  const addUser = () => {
    const newUser = {
      id: String(users.length + 1),
      name: "New User",
      role: "reviewer" as const,
      avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=User${users.length + 1}`
    };
    setUsers([...users, newUser]);
  };

  const deleteUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  const updateUserRole = (userId: string, role: "admin" | "reviewer") => {
    setUsers(users.map(u => u.id === userId ? { ...u, role } : u));
  };

  const resetDemoData = () => {
    if (confirm("Are you sure you want to reset all demo data? This action cannot be undone.")) {
      console.log("Resetting demo data...");
      // In real app, this would call an API endpoint
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Manage users, taxonomies, and system configuration
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "users" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage team members and their permissions
                  </CardDescription>
                </div>
                <Button onClick={addUser}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={user.avatar_url} />
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">
                        user{user.id}@company.com
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Select
                      value={user.role}
                      onValueChange={(role: "admin" | "reviewer") => updateUserRole(user.id, role)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="reviewer">Reviewer</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <Label className="text-sm">Active</Label>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteUser(user.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "taxonomies" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Statuses */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statuses</CardTitle>
                <CardDescription>
                  Workflow status options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {statuses.map((status) => (
                  <div key={status} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">{status}</span>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Status
                </Button>
              </CardContent>
            </Card>

            {/* Risk Levels */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Risk Levels</CardTitle>
                <CardDescription>
                  Priority classification options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {riskLevels.map((risk) => (
                  <div key={risk} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">{risk}</span>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Risk Level
                </Button>
              </CardContent>
            </Card>

            {/* Labels */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Labels</CardTitle>
                <CardDescription>
                  Classification labels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {labels.map((label) => (
                  <div key={label} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">{label}</span>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Label
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "keywords" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Keywords</CardTitle>
              <CardDescription>
                Keywords used for content ingestion and matching (view-only for now)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="keywords">Current Keywords</Label>
                <Textarea
                  id="keywords"
                  placeholder="Enter keywords separated by commas..."
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  rows={6}
                  className="mt-2"
                />
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  Keywords are used to identify relevant posts during ingestion.
                </p>
                <Button>Save Keywords</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "data" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Export Data</CardTitle>
              <CardDescription>
                Download all system data as CSV files
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export All Data
              </Button>
            </CardContent>
          </Card>

          <Card className="border-destructive/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
              </div>
              <CardDescription>
                Irreversible actions that affect all system data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-destructive">Reset Demo Data</h4>
                      <p className="text-sm text-muted-foreground">
                        This will restore the original demo posts and clear all modifications.
                      </p>
                    </div>
                    <Button variant="destructive" onClick={resetDemoData}>
                      Reset Data
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}