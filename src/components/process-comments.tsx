"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const HOST = "https://1431ffb63976.ngrok-free.app";

const ProcessComments: React.FC = () => {
    const { toast } = useToast();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async () => {
        const res = await fetch(HOST + "/api/worker/process-comments", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",

            },
        });

        await res.json();

        toast({
            title: "10 Comments processed",
            description: `Refresh page to see new data`,
        });
    };

    if (isProcessing) {
        return <Button disabled>Processing...</Button>;
    }

    return <Button onClick={handleSubmit}>Process Comments</Button>;
};

export default ProcessComments;
