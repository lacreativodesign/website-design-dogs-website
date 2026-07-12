export type ThemeMode = "light" | "dark";

export type ContentStatus = "planned" | "draft" | "approved";

export interface StructuredContentItem {
  id: string;
  title: string;
  status: ContentStatus;
}
