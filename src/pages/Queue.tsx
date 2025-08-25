import { useState, useMemo, useEffect } from "react";
import { Search, Filter, Plus, Download, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge, RiskBadge, LabelBadge, PlatformBadge } from "@/components/ui/status-badge";
import { BulkActionsBar } from "@/components/queue/BulkActionsBar";
import { PostRowActions } from "@/components/queue/PostRowActions";
import { AuditTrail } from "@/components/queue/AuditTrail";
import { mockUsers } from "@/data/mockData";
import { Post, Status, RiskLevel } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { usePostActions } from "@/hooks/usePostActions";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const Timestamp: React.FC<{ iso: string }> = ({ iso }) => {
    const date = new Date(iso);
    return <span>{date.toLocaleString()}</span>;
  };
type TPost = {
    author: string
    title: string
    body: string
    platform: "reddit" | "youtube"
    score: string | number
    created_at_platform: string
    processing_status: number
    id: string

    fetched_at: string
    comments: []
    content_id: string
    content_type: string
}

const HOST = "https://1431ffb63976.ngrok-free.app"

export default function Queue() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [selectedPostForDetails, setSelectedPostForDetails] = useState<Post | null>(null);
  
  const [posts, setPosts] = useState<TPost[]>([]);

  useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(HOST + "/api/media_item", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true",
                },
            });

            const data = await res.json();
            setPosts(data)
            console.log(data);
        }

        fetchPosts()
  }, [])

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      if (!searchQuery) return true;
      const searchLower = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(searchLower) ||
        post.body.toLowerCase().includes(searchLower)
      );
    });
  }, [searchQuery, posts]);


  const truncateText = (text: string, maxLength: number = 200) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };


  const formatRelativeTime = (isoString: string) => {
    return formatDistanceToNow(new Date(isoString), { addSuffix: true });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Queue</h1>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search posts, authors, or sources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        </Card>

      {/* Posts Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>UUID</TableHead>
                  <TableHead>{"ID (ext)"}</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Post Content</TableHead>
                  <TableHead>Author ID</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Created at Platform</TableHead>
                  <TableHead>Fetched</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post) => (
                  <TableRow key={post.id} className="hover:bg-muted/30">
                    <TableCell>
                        <p className="text-sm bold leading-relaxed">
                        {truncateText(post.id, 10)}
                        </p>
                    </TableCell>
                    <TableCell>
                        <p className="text-sm bold leading-relaxed">
                          {post.content_id}
                        </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <PlatformBadge platform={post.platform} />
                        {/* <span className="text-xs text-muted-foreground">
                          {post.subreddit || post.channel}
                        </span> */}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold">{post.title}</p>
                        <p className="text-sm leading-relaxed">
                          {truncateText(post.body, 400)}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">{post.author}</span>
                    </TableCell>
                    <TableCell>
                      {post?.risk_level && <RiskBadge risk={post.risk_level} />}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={post.processing_status as any} />
                    </TableCell>
                    {/* <TableCell>
                      {post.label && <LabelBadge label={post.label} />}
                    </TableCell> */}
                    <TableCell>
                      {post.score !== undefined && (
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">{post.score}</span>
                          <span className="text-xs text-muted-foreground">/5</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-muted-foreground">
                        {formatRelativeTime(post.created_at_platform)}
                      </span>
                    </TableCell>
                    <TableCell>
                        <Timestamp iso={post.fetched_at}/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}