import type { Board, Card } from "@/components/board-panel";

export const initialBoard: Board = {
  id: "b-sprint-24",
  title: "Sprint 24",
  columns: [
    { id: "c-todo", title: "To Do", wipLimit: 5 },
    { id: "c-doing", title: "Doing", wipLimit: 3 },
    { id: "c-review", title: "Review" },
    { id: "c-done", title: "Done" },
  ],
};

export const initialCards: Card[] = [
  {
    id: "card-1",
    title: "Fix login redirect loop",
    columnId: "c-todo",
    assignee: { name: "Eden", avatarUrl: "https://i.pravatar.cc/56?img=1" },
    due: "Fri",
  },
  {
    id: "card-2",
    title: "Board empty state copy",
    columnId: "c-todo",
    assignee: { name: "Mai", avatarUrl: "https://i.pravatar.cc/56?img=2" },
  },
  {
    id: "card-3",
    title: "Optimistic rollback test harness",
    columnId: "c-doing",
    assignee: { name: "Eden", avatarUrl: "https://i.pravatar.cc/56?img=1" },
    due: "Today",
  },
  {
    id: "card-4",
    title: "Token contrast audit",
    columnId: "c-doing",
    assignee: { name: "Sam", avatarUrl: "https://i.pravatar.cc/56?img=3" },
  },
  {
    id: "card-5",
    title: "Skeleton shimmer timing",
    columnId: "c-review",
    due: "Tomorrow",
  },
  {
    id: "card-6",
    title: "Project README",
    columnId: "c-done",
    assignee: { name: "Mai", avatarUrl: "https://i.pravatar.cc/56?img=2" },
  },
];
