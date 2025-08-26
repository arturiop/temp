"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const HOST = "https://1431ffb63976.ngrok-free.app";

const RunWorkers: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [engines, setEngines] = useState<{ reddit: boolean; youtube: boolean }>({
        reddit: false,
        youtube: false,
    });
    const [keywords, setKeywords] = useState("");
    const [limit, setLimit] = useState(5);
    const { toast } = useToast();
    
    const handleSubmit = async () => {
        console.log("Run with:", {
            engines,
            keywords,
            limit,
        });

        const body = {
            engines: [...(engines.youtube ? ["youtube"] : []), ...(engines.reddit ? ["reddit"] : [])],
            keywords: [keywords],
            limit,
        };
        try {
            const res = await fetch(HOST + "/api/worker/run-workers", {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
    
                },
            });
    
            const data = await res.json()
    
            toast({
                title: "Job started: ID -" + data.job_id,
                description: `Refresh page to see new data`,
            })
            
        } catch (error) {
            toast({
                title: "Some error happened",
            })
        }



        setOpen(false);
    };

    return (
        <>
            {/* Button */}
            <Button onClick={() => setOpen(true)}>Run Workers</Button>

            {/* Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Select Engines & Parameters</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                        {/* Engines */}
                        <div className="space-y-2">
                            <Label>Select Engines</Label>
                            <div className="flex items-center gap-3">
                                <Checkbox id="reddit" checked={engines.reddit} onCheckedChange={(val) => setEngines((prev) => ({ ...prev, reddit: !!val }))} />
                                <Label htmlFor="reddit">Reddit</Label>

                                <Checkbox id="youtube" checked={engines.youtube} onCheckedChange={(val) => setEngines((prev) => ({ ...prev, youtube: !!val }))} />
                                <Label htmlFor="youtube">YouTube</Label>
                            </div>
                        </div>

                        {/* Keywords */}
                        <div className="space-y-2">
                            <Label htmlFor="keyword">Keyword</Label>
                            <Input id="keywords" placeholder="Enter search keyword" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
                        </div>

                        {/* Limit */}
                        <div className="space-y-2">
                            <Label htmlFor="limit">Limit</Label>
                            <Input
                                id="limit"
                                type="number"
                                min={1}
                                max={50}
                                value={limit}
                                onChange={(e) => (Number(e.target.value) <= 50 ? setLimit(Number(e.target.value)) : null)}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit}>Run</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default RunWorkers;
