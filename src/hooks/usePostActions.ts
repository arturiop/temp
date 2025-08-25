import { useState } from 'react';
import { Post, Status, RiskLevel, AuditEvent } from '@/types';
import { mockPosts } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export function usePostActions() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const { toast } = useToast();

  const createAuditEvent = (
    postId: string, 
    type: AuditEvent['type'], 
    payload: Record<string, any>, 
    actorUserId: string = "1" // Default to first user for now
  ): AuditEvent => ({
    id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    post_id: postId,
    actor_user_id: actorUserId,
    type,
    payload,
    at: new Date().toISOString()
  });

  const updatePost = (postId: string, updates: Partial<Post>, auditType: AuditEvent['type'], auditPayload: Record<string, any>) => {
    setPosts(prevPosts => {
      return prevPosts.map(post => {
        if (post.id === postId) {
          const auditEvent = createAuditEvent(postId, auditType, auditPayload);
          return {
            ...post,
            ...updates,
            last_update: new Date().toISOString(),
            audit: [...post.audit, auditEvent]
          };
        }
        return post;
      });
    });
  };

  const updateMultiplePosts = (postIds: string[], updates: Partial<Post>, auditType: AuditEvent['type'], auditPayload: Record<string, any>) => {
    setPosts(prevPosts => {
      return prevPosts.map(post => {
        if (postIds.includes(post.id)) {
          const auditEvent = createAuditEvent(post.id, auditType, auditPayload);
          return {
            ...post,
            ...updates,
            last_update: new Date().toISOString(),
            audit: [...post.audit, auditEvent]
          };
        }
        return post;
      });
    });
  };

  const assignPost = (postId: string, userId: string) => {
    updatePost(
      postId, 
      { assignee_id: userId, status: "Assigned" as Status }, 
      "assign", 
      { assignee_id: userId }
    );
    toast({
      title: "Post assigned",
      description: "Post has been successfully assigned.",
    });
  };

  const assignMultiplePosts = (postIds: string[], userId: string) => {
    updateMultiplePosts(
      postIds, 
      { assignee_id: userId, status: "Assigned" as Status }, 
      "assign", 
      { assignee_id: userId }
    );
    toast({
      title: "Posts assigned",
      description: `${postIds.length} posts have been assigned.`,
    });
  };

  const markFalsePositive = (postId: string) => {
    updatePost(
      postId, 
      { label: "Not Relevant", status: "Closed – No Fit" as Status }, 
      "triage", 
      { label: "Not Relevant", status: "Closed – No Fit" }
    );
    toast({
      title: "Marked as false positive",
      description: "Post has been marked as not relevant.",
    });
  };

  const markMultipleFalsePositive = (postIds: string[]) => {
    updateMultiplePosts(
      postIds, 
      { label: "Not Relevant", status: "Closed – No Fit" as Status }, 
      "triage", 
      { label: "Not Relevant", status: "Closed – No Fit" }
    );
    toast({
      title: "Marked as false positives",
      description: `${postIds.length} posts have been marked as not relevant.`,
    });
  };

  const setPostStatus = (postId: string, status: Status) => {
    updatePost(
      postId, 
      { status }, 
      "status_change", 
      { status }
    );
    toast({
      title: "Status updated",
      description: `Post status changed to ${status}.`,
    });
  };

  const setMultiplePostStatus = (postIds: string[], status: Status) => {
    updateMultiplePosts(
      postIds, 
      { status }, 
      "status_change", 
      { status }
    );
    toast({
      title: "Status updated",
      description: `${postIds.length} posts status changed to ${status}.`,
    });
  };

  const setPostRisk = (postId: string, riskLevel: RiskLevel) => {
    updatePost(
      postId, 
      { risk_level: riskLevel }, 
      "triage", 
      { risk_level: riskLevel }
    );
    toast({
      title: "Risk level updated",
      description: `Post risk level changed to ${riskLevel}.`,
    });
  };

  const setMultiplePostRisk = (postIds: string[], riskLevel: RiskLevel) => {
    updateMultiplePosts(
      postIds, 
      { risk_level: riskLevel }, 
      "triage", 
      { risk_level: riskLevel }
    );
    toast({
      title: "Risk level updated",
      description: `${postIds.length} posts risk level changed to ${riskLevel}.`,
    });
  };

  return {
    posts,
    assignPost,
    assignMultiplePosts,
    markFalsePositive,
    markMultipleFalsePositive,
    setPostStatus,
    setMultiplePostStatus,
    setPostRisk,
    setMultiplePostRisk
  };
}