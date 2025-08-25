import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlatformBadge, StatusBadge } from "@/components/ui/status-badge";
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import { Search, Table } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

const HOST = "https://1431ffb63976.ngrok-free.app"

const Timestamp: React.FC<{ iso: string }> = ({ iso }) => {
    const date = new Date(iso);
    return <span>{date.toLocaleString()}</span>;
  };

export default function CommentsQueue() {
    const [searchQuery, setSearchQuery] = useState("");
    const [comments, setComments] = useState<any[]>([]);
  
    useEffect(() => {
      const fetchComments = async () => {
        const res = await fetch(HOST + "/api/comments", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        });
        const data = await res.json();
        setComments(data);
      };
      fetchComments();
    }, []);
  
    const filteredComments = useMemo(() => {
      return comments.filter((c) => {
        if (!searchQuery) return true;
        const searchLower = searchQuery.toLowerCase();
        return (
          c.body?.toLowerCase().includes(searchLower) ||
          c.author?.toLowerCase().includes(searchLower) ||
          c.comment_id.toLowerCase().includes(searchLower)
        );
      });
    }, [searchQuery, comments]);
  
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
        </Card>
  
        {/* Comments Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>UUID</TableHead>
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
                  {filteredComments.map((c) => (
                    <TableRow key={c.id} className="hover:bg-muted/30">
                      <TableCell className="text-sm">{truncateText(c.id, 8)}</TableCell>
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
          </CardContent>
        </Card>
      </div>
    );
  }