import { Post, User, Platform, Status, RiskLevel, Label } from '@/types';

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "admin",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    id: "2", 
    name: "Mike Rodriguez",
    role: "reviewer",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
  },
  {
    id: "3",
    name: "Emily Johnson", 
    role: "reviewer",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
  },
  {
    id: "4",
    name: "David Park",
    role: "reviewer", 
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
  }
];

export const mockPosts: Post[] = [
  {
    id: "1",
    platform: "reddit" as Platform,
    source: { subreddit: "r/depression" },
    author: "struggling_student_23",
    text: "I've been dealing with severe depression for the past 6 months and it's getting worse. I can barely get out of bed, my grades are failing, and I've stopped talking to my friends and family. I've thought about therapy but I can't afford it and my insurance doesn't cover mental health. I don't know what to do anymore. Has anyone been through something similar? I feel so alone and hopeless.",
    url: "https://reddit.com/r/depression/post123",
    timestamp: "2024-08-20T10:30:00Z",
    keyword_hits: ["severe depression", "can't afford therapy", "insurance doesn't cover", "hopeless"],
    relevance_score: 5,
    label: "Potential Lead" as Label,
    risk_level: "Crisis" as RiskLevel,
    status: "New" as Status,
    last_update: "2024-08-20T10:30:00Z",
    notes: [],
    outreach_events: [],
    audit: [
      {
        id: "audit_1",
        post_id: "1",
        actor_user_id: "system",
        type: "create",
        payload: { source: "reddit_ingestion" },
        at: "2024-08-20T10:30:00Z"
      }
    ]
  },
  {
    id: "2",
    platform: "youtube" as Platform,
    source: { channel: "MentalHealthSupport" },
    author: "Alex Recovery",
    text: "Day 127 sober from alcohol and I'm struggling with anxiety attacks. They're getting more frequent and intense. I've been to AA meetings but I think I need professional help for the anxiety too. My sponsor suggested finding a therapist who specializes in addiction and anxiety disorders. Does anyone know how to find affordable mental health care? My job doesn't offer great insurance.",
    url: "https://youtube.com/watch?v=abc123",
    timestamp: "2024-08-20T09:15:00Z",
    keyword_hits: ["127 days sober", "anxiety attacks", "need professional help", "affordable mental health care"],
    relevance_score: 4,
    label: "Potential Lead" as Label,
    risk_level: "High" as RiskLevel,
    status: "Assigned" as Status,
    assignee_id: "2",
    last_update: "2024-08-20T09:45:00Z",
    notes: [
      {
        id: "note_1",
        post_id: "2",
        author_user_id: "2",
        text: "Person is in recovery but needs dual diagnosis support. Reached out via YouTube comment.",
        at: "2024-08-20T09:45:00Z"
      }
    ],
    outreach_events: [
      {
        id: "outreach_1",
        post_id: "2",
        actor_user_id: "2",
        kind: "initial_dm",
        details: "Sent supportive YouTube comment with resource information",
        at: "2024-08-20T09:45:00Z"
      }
    ],
    audit: [
      {
        id: "audit_2",
        post_id: "2",
        actor_user_id: "system",
        type: "create",
        payload: { source: "youtube_ingestion" },
        at: "2024-08-20T09:15:00Z"
      },
      {
        id: "audit_3",
        post_id: "2",
        actor_user_id: "2",
        type: "assign",
        payload: { assignee_id: "2" },
        at: "2024-08-20T09:45:00Z"
      }
    ]
  },
  {
    id: "3",
    platform: "reddit" as Platform,
    source: { subreddit: "r/mentalhealth" },
    author: "wellness_journey_99",
    text: "Just wanted to share that I've been in therapy for 2 years now and it's completely changed my life! I was struggling with panic attacks and social anxiety, but with the right therapist and some medication, I'm doing so much better. For anyone on the fence about getting help, please don't wait like I did. There are sliding scale options and community mental health centers that can help.",
    url: "https://reddit.com/r/mentalhealth/post456",
    timestamp: "2024-08-20T08:22:00Z",
    keyword_hits: ["therapy for 2 years", "panic attacks", "social anxiety", "sliding scale options"],
    relevance_score: 2,
    label: "Not Relevant" as Label,
    risk_level: "Low" as RiskLevel,
    status: "Closed – No Fit" as Status,
    last_update: "2024-08-20T08:22:00Z",
    notes: [],
    outreach_events: [],
    audit: [
      {
        id: "audit_4",
        post_id: "3",
        actor_user_id: "system",
        type: "create",
        payload: { source: "reddit_ingestion" },
        at: "2024-08-20T08:22:00Z"
      }
    ]
  },
  {
    id: "4",
    platform: "reddit" as Platform,
    source: { subreddit: "r/addiction" },
    author: "clean_and_confused",
    text: "I've been clean from opioids for 8 months but I'm having a really hard time with the emotional side of recovery. I feel empty and numb most of the time. My counselor at the rehab center said I might have underlying depression that was masked by my drug use. I need to find a therapist who understands addiction but my insurance is complicated and I don't know where to start looking. The thought of calling around to find someone feels overwhelming.",
    url: "https://reddit.com/r/addiction/post789",
    timestamp: "2024-08-19T16:45:00Z",
    keyword_hits: ["clean from opioids", "underlying depression", "insurance is complicated", "feels overwhelming"],
    relevance_score: 4,
    label: "Potential Lead" as Label,
    risk_level: "High" as RiskLevel,
    status: "In Outreach" as Status,
    assignee_id: "3",
    last_update: "2024-08-19T17:30:00Z",
    notes: [
      {
        id: "note_2", 
        post_id: "4",
        author_user_id: "3",
        text: "Person in recovery needs dual diagnosis support. Reached out with insurance navigation help.",
        at: "2024-08-19T17:30:00Z"
      }
    ],
    outreach_events: [
      {
        id: "outreach_2",
        post_id: "4", 
        actor_user_id: "3",
        kind: "initial_dm",
        details: "Sent Reddit DM with insurance navigation resources and therapist directory",
        at: "2024-08-19T17:30:00Z"
      }
    ],
    audit: [
      {
        id: "audit_5",
        post_id: "4",
        actor_user_id: "system", 
        type: "create",
        payload: { source: "reddit_ingestion" },
        at: "2024-08-19T16:45:00Z"
      }
    ]
  },
  {
    id: "5",
    platform: "youtube" as Platform,
    source: { channel: "AnxietySupport" },
    author: "Jennifer Anxious",
    text: "Comment: I've been having panic attacks for 3 years and they're getting worse. I can't drive anymore because I'm afraid I'll have an attack while driving. I've tried meditation apps and breathing exercises but nothing works. My doctor wants to prescribe anti-anxiety medication but I'm scared of becoming dependent. I know I need therapy but I live in a small town and there aren't many options. Has anyone done online therapy? Is it effective?",
    url: "https://youtube.com/watch?v=def456",
    timestamp: "2024-08-19T14:12:00Z",
    keyword_hits: ["panic attacks for 3 years", "can't drive", "scared of becoming dependent", "small town", "online therapy"],
    relevance_score: 4,
    label: "Potential Lead" as Label,
    risk_level: "Medium" as RiskLevel,
    status: "Waiting Reply" as Status,
    assignee_id: "4",
    last_update: "2024-08-19T15:00:00Z",
    notes: [
      {
        id: "note_3",
        post_id: "5", 
        author_user_id: "4",
        text: "Person with severe panic disorder in rural area. Provided telehealth options.",
        at: "2024-08-19T15:00:00Z"
      }
    ],
    outreach_events: [
      {
        id: "outreach_3",
        post_id: "5",
        actor_user_id: "4", 
        kind: "initial_dm",
        details: "Sent supportive comment with telehealth therapy resources",
        at: "2024-08-19T15:00:00Z"
      }
    ],
    audit: [
      {
        id: "audit_6",
        post_id: "5",
        actor_user_id: "system",
        type: "create", 
        payload: { source: "youtube_ingestion" },
        at: "2024-08-19T14:12:00Z"
      }
    ]
  }
];

// Helper functions for working with mock data
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getPostsByAssignee = (assigneeId: string): Post[] => {
  return mockPosts.filter(post => post.assignee_id === assigneeId);
};

export const getPostsByStatus = (status: Status): Post[] => {
  return mockPosts.filter(post => post.status === status);
};
