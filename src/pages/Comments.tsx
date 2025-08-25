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

const HOST = "https://1431ffb63976.ngrok-free.app"

const Timestamp: React.FC<{ iso: string }> = ({ iso }) => {
    const date = new Date(iso);
    return <span>{date.toLocaleString()}</span>;
  };
  export default function CommentsQueue() {
    const [searchQuery, setSearchQuery] = useState("");
    const [comments, setComments] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const pageSize = 10; // matches backend default
    const [loading, setLoading] = useState(false);
  
    const fetchComments = async () => {
      setLoading(true);
      const offset = (page - 1) * pageSize;
      const res = await fetch(
        `${HOST}/api/comments?limit=${pageSize}&offset=${offset}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      const data = await res.json();
      setComments(data);
      setLoading(false);
    };
  
    useEffect(() => {
      fetchComments();
    }, [page]);
  
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
          <h1 className="text-2xl font-semibold text-foreground">Comments</h1>
        </div>
  
        {/* Search */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search comments, authors, or IDs..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1); // reset to first page on search
                  }}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
        </Card>
  
        {/* Comments Table */}
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-6 text-sm text-muted-foreground">Loading…</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Comment ID</TableHead>
                      <TableHead>Media Item (ext)</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Body</TableHead>
                      <TableHead>Platform</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Created at Platform</TableHead>
                      <TableHead>Fetched</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comments.map((c) => (
                      <TableRow key={c.id} className="hover:bg-muted/30">
                        <TableCell className="text-sm">{c.comment_id}</TableCell>
                        <TableCell className="text-sm">{c.media_item_id_ext}</TableCell>
                        <TableCell className="text-sm">{c.author || "-"}</TableCell>
                        <TableCell className="max-w-md text-sm leading-relaxed">
                          {truncateText(c.body || "", 200)}
                        </TableCell>
                        <TableCell>
                          <PlatformBadge platform={c.platform} />
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={c.processing_status as any} />
                        </TableCell>
                        <TableCell>
                          {c.score !== undefined && (
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-medium">{c.score}</span>
                              <span className="text-xs text-muted-foreground">/5</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="text-xs text-muted-foreground">
                            {formatRelativeTime(c.created_at_platform)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Timestamp iso={c.fetched_at} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
  
        {/* Pagination Controls */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Page {page}</span>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={comments.length < pageSize}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  }