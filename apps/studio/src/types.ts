export type Skill = { id: string; title: string; description: string; version: string; category: string; sourcePath: string; body: string; tags: string[] };
export type Catalog = { version: string; skills: Skill[]; documents: Record<string, { title: string; body: string }>; referencePaths: string[] };
export type Run = { id: string; content: string; model: string; createdAt: string; elapsedMs: number; incomplete?: boolean };
export type Workspace = { kind: string; version: number; name: string; stage: string; task: string; context: string; skillIds: string[]; referencePaths: string[]; runs: Run[] };
export type Connection = { baseUrl: string; model: string; protocol: 'chat' | 'responses'; timeoutSeconds: number; hasApiKey: boolean };
