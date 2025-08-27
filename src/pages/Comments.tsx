import { useState, useMemo, useEffect } from "react";
import { Search, Filter, Plus, Download, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
import ProcessComments from "@/components/process-comments";

const HOST = "https://1431ffb63976.ngrok-free.app";

const Timestamp: React.FC<{ iso: string }> = ({ iso }) => {
    const date = new Date(iso);
    return <span>{date.toLocaleString()}</span>;
};

const RELEVANCE_MAP = {
    0: "None",
    1: "Low",
    2: "Medium",
    3: "High",
};

// urgency: [0=NONE, 1=LOW, 2=MEDIUM, 3=HIGH, 4=CRITICAL]
const URGENCY_MAP = {
    0: "None",
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Critical",
};

// category: [0=NONE, 1=DRUG_ADDICTION, 2=MENTAL_HEALTH, 3=OTHER]
const CATEGORY_MAP = {
    0: "None",
    1: "Drug Addiction",
    2: "Mental Health",
    3: "Other",
};

// subtype: [0=NONE, 1=SUBSTANCE_USE, 2=ALCOHOL, 3=ANXIETY_DEPRESSION, 4=SELF_HARM, 5=SUICIDAL_IDEATION]
const SUBTYPE_MAP = {
    0: "None",
    1: "Substance Use",
    2: "Alcohol",
    3: "Anxiety / Depression",
    4: "Self-harm",
    5: "Suicidal Ideation",
};

export default function CommentsQueue({ mediaItemUUID }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [comments, setComments] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const pageSize = 10; // matches backend default
    const [loading, setLoading] = useState(false);

    const fetchComments = async () => {
        setLoading(true);
        const offset = (page - 1) * pageSize;
        const res = await fetch(`${HOST}/api/comments?limit=${pageSize}&offset=${offset}&media_item_uuid=${mediaItemUUID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
            },
        });
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
                <ProcessComments />
            </div>

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

                                        <TableHead>Relevance</TableHead>
                                        <TableHead>Urgency</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Subtype</TableHead>

                                        <TableHead>Created at Platform</TableHead>
                                        <TableHead>Processed At</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {comments.map((c) => (
                                        <TableRow key={c.id} className="hover:bg-muted/30">
                                            <TableCell className="text-sm">{truncateText(c.comment_id || "", 6)}</TableCell>
                                            <TableCell className="text-sm">{c.media_item_id_ext}</TableCell>
                                            <TableCell className="text-sm">
                                                {c.author}
                                            </TableCell>
                                            <TableCell className="max-w-md text-sm leading-relaxed">
                                                <a
                                                    href={c.url}
                                                    onClick={(e) => e.stopPropagation()}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm font-semibold hover:underline">
                                                    {truncateText(c.body || "", 200)}
                                                </a>
                                            </TableCell>
                                            <TableCell>
                                                <PlatformBadge platform={c.platform} />
                                            </TableCell>
                                            <TableCell>
                                                <p>{c.relevance ? RELEVANCE_MAP[c.relevance] : "-"}</p>
                                            </TableCell>
                                            <TableCell>
                                                <p>{c.urgency ? URGENCY_MAP[c.urgency] : "-"}</p>
                                            </TableCell>
                                            <TableCell>
                                                <p>{c.category ? CATEGORY_MAP[c.category] : "-"}</p>
                                            </TableCell>
                                            <TableCell>
                                                <p>{c.subtype ? SUBTYPE_MAP[c.subtype] : "-"}</p>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-xs text-muted-foreground">{formatRelativeTime(c.created_at_platform)}</span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-xs text-muted-foreground">{c.processed_at}</span>
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
                    <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled={comments.length < pageSize} onClick={() => setPage((p) => p + 1)}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
