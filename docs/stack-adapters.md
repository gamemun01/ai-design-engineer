# Stack Adapters — AI Design Engineer

This reference maps abstract framework concepts (design tokens, component
contracts, UI states, accessibility) to concrete implementations per supported
stack. AI agents and developers should consult this file when translating
skill outputs into working code.

---

## Supported Stacks

<!-- markdownlint-disable MD013 -->
| Stack ID | Framework | Styling | Component Library | Language |
| --- | --- | --- | --- | --- |
| `react` | React 18+ / Next.js | Tailwind CSS | shadcn/ui (Radix) | TypeScript |
| `vue` | Vue 3 / Nuxt 3 | Tailwind CSS or UnoCSS | Radix Vue / PrimeVue | TypeScript |
| `angular` | Angular 17+ | Angular CSS / Tailwind | Angular Material / PrimeNG | TypeScript |
| `svelte` | Svelte 5 / SvelteKit | Tailwind CSS | Melt UI / Skeleton | TypeScript |
| `blazor` | Blazor (.NET 8-10) | Scoped CSS / Bootstrap | MudBlazor / Radzen | C# |
| `winforms` | WinForms (.NET 8-10) | WinForms Designer | Built-in Controls | C# / VB.NET |
<!-- markdownlint-enable MD013 -->

---

## 1. Component Patterns

### React Component Pattern

```tsx
// Functional component with hooks
interface Props {
  title: string;
  isLoading?: boolean;
}
export function MyComponent({ title, isLoading = false }: Props) {
  const [data, setData] = useState<string | null>(null);
  return <section>{/* ... */}</section>;
}
```

### Vue 3 Component Pattern

```vue
<script setup lang="ts">
interface Props {
  title: string;
  isLoading?: boolean;
}
const props = withDefaults(defineProps<Props>(), { isLoading: false });
const data = ref<string | null>(null);
</script>
<template>
  <section><!-- ... --></section>
</template>
```

### Angular 17+ Component Pattern

```typescript
@Component({
  selector: 'app-my-component',
  standalone: true,
  template: `<section><!-- ... --></section>`,
})
export class MyComponent {
  @Input() title!: string;
  @Input() isLoading = false;
  data = signal<string | null>(null);
}
```

### Svelte 5 Component Pattern

```svelte
<script lang="ts">
  let { title, isLoading = false }: { title: string; isLoading?: boolean } = $props();
  let data: string | null = $state(null);
</script>
<section><!-- ... --></section>
```

### Blazor Component Pattern

```razor
<MyComponent Title="@title" IsLoading="@isLoading" />

@code {
    [Parameter] public string Title { get; set; } = "";
    [Parameter] public bool IsLoading { get; set; }
    private string? Data { get; set; }
}
```

### WinForms Component Pattern

```csharp
public partial class MyUserControl : UserControl
{
    public string Title { get; set; } = "";
    public bool IsLoading { get; set; }
    private string? Data { get; set; }

    public MyUserControl()
    {
        InitializeComponent();
    }
}
```

---

## 2. State Management

<!-- markdownlint-disable MD013 -->
| Concept | React | Vue 3 | Angular 17+ | Svelte 5 | Blazor | WinForms |
| --- | --- | --- | --- | --- | --- | --- |
| Local state | `useState` | `ref()` | `signal()` | `$state()` | Component state property | Control property |
| Global state | Context / Zustand | Pinia | NgRx / Signals store | `$state` in `.svelte.ts` | CascadingParameter / State container | BindingSource / Event |
| Derived state | `useMemo` | `computed()` | `computed` signal | `$derived` | Computed property | `PropertyChanged` event |
| Side effects | `useEffect` | `watch()` / `onMounted()` | `effect()` / `ngOnInit` | `$effect` | `OnInitializedAsync` / `OnParametersSetAsync` | `Load` / `VisibleChanged` |
<!-- markdownlint-enable MD013 -->

---

## 3. Styling Systems

### Design Token → Styling Mapping

<!-- markdownlint-disable MD013 -->
| Token | React (Tailwind) | Vue (Tailwind) | Angular (CSS/Tailwind) | Svelte (Tailwind) | Blazor (Scoped CSS/Bootstrap) | WinForms |
| --- | --- | --- | --- | --- | --- | --- |
| `spacing-xxs` (8px) | `p-2` | `p-2` | `p-2` or `.spacing-xxs` | `p-2` | `padding: 8px` or `p-1` (Bootstrap) | `Padding = new Padding(8)` |
| `spacing-xs` (12px) | `p-3` | `p-3` | `p-3` or `.spacing-xs` | `p-3` | `padding: 12px` or `p-2` | `Padding = new Padding(12)` |
| `spacing-sm` (16px) | `p-4` | `p-4` | `p-4` or `.spacing-sm` | `p-4` | `padding: 16px` or `p-3` | `Padding = new Padding(16)` |
| `spacing-md` (24px) | `p-6` | `p-6` | `p-6` or `.spacing-md` | `p-6` | `padding: 24px` or `p-4` | `Padding = new Padding(24)` |
| `spacing-lg` (32px) | `p-8` | `p-8` | `p-8` or `.spacing-lg` | `p-8` | `padding: 32px` or `px-5` | `Padding = new Padding(32)` |
<!-- markdownlint-enable MD013 -->

### Color Token → Styling Mapping

<!-- markdownlint-disable MD013 -->
| Token | React (Tailwind/shadcn) | Angular (Material) | Blazor (MudBlazor) | WinForms |
| --- | --- | --- | --- | --- |
| `color-bg` | `bg-background` | `$mat-sys-background` | `Class="mud-paper"` | `BackColor = SystemColors.Control` |
| `color-surface` | `bg-card` | `$mat-sys-surface` | `Class="mud-paper mud-elevation-1"` | `BackColor = SystemColors.Window` |
| `color-primary` | `bg-primary` | `$mat-sys-primary` | `Color="Color.Primary"` | `ForeColor = Color.FromArgb(0,100,200)` |
| `color-danger` | `bg-destructive` | `$mat-sys-error` | `Color="Color.Error"` | `ForeColor = Color.FromArgb(220,50,50)` |
| `color-text` | `text-foreground` | `$mat-sys-on-background` | `Class="mud-typography"` | `ForeColor = SystemColors.ControlText` |
<!-- markdownlint-enable MD013 -->

### No Magic Numbers Rule (Per Stack)

<!-- markdownlint-disable MD013 -->
| Stack | Forbidden Pattern | Correct Pattern |
| --- | --- | --- |
| React/Vue/Svelte (Tailwind) | `p-[17px]`, `bg-[#ff5500]` | `p-4`, `bg-primary` |
| Angular (CSS) | `padding: 17px` | `padding: var(--spacing-sm)` |
| Blazor | `style="padding:17px"` | `.my-class { padding: var(--spacing-sm) }` |
| WinForms | `Padding = new Padding(17)` | `Padding = new Padding(16)` (nearest token) |
<!-- markdownlint-enable MD013 -->

---

## 4. The 5 UI States

Every data-driven component must implement these states regardless of stack.

### React UI States

```tsx
if (isLoading) return <Skeleton aria-busy="true" />;
if (error) return <ErrorPanel message={error} onRetry={onRetry} />;
if (data.length === 0) return <EmptyState action="Create first item" />;
// Ideal + Partial states in main render
```

### Vue 3 UI States

```vue
<LoadingSkeleton v-if="isLoading" />
<ErrorPanel v-else-if="error" :message="error" @retry="onRetry" />
<EmptyState v-else-if="!data.length" action="Create first item" />
<template v-else><!-- Ideal + Partial states --></template>
```

### Angular UI States

```html
<app-skeleton *ngIf="isLoading"></app-skeleton>
<app-error-panel *ngIf="error" [message]="error" (retry)="onRetry()"></app-error-panel>
<app-empty-state *ngIf="!data.length" action="Create first item"></app-empty-state>
<!-- Ideal + Partial states via @else -->
```

### Svelte 5 UI States

```svelte
{#if isLoading}
  <Skeleton aria-busy="true" />
{:else if error}
  <ErrorPanel {error} onretry={onRetry} />
{:else if !data.length}
  <EmptyState action="Create first item" />
{:else}
  <!-- Ideal + Partial states -->
{/if}
```

### Blazor UI States

```razor
@if (IsLoading)
{
    <MudSkeleton />
}
else if (Error is not null)
{
    <ErrorPanel Message="@Error" OnRetry="@OnRetry" />
}
else if (!Data.Any())
{
    <EmptyState Action="Create first item" />
}
else
{
    @* Ideal + Partial states *@
}
```

### WinForms UI States

```csharp
private void UpdateState()
{
    if (IsLoading) { ShowLoadingPanel(); return; }
    if (Error is not null) { ShowErrorPanel(Error); return; }
    if (Data.Count == 0) { ShowEmptyState(); return; }
    ShowIdealState(); // + handle partial/truncated via AutoEllipsis
}
```

---

## 5. Accessibility Patterns

<!-- markdownlint-disable MD013 -->
| Requirement | React (Radix/shadcn) | Vue (Radix Vue) | Angular (Material) | Svelte (Melt UI) | Blazor (MudBlazor) | WinForms |
| --- | --- | --- | --- | --- | --- | --- |
| Focus visible | `focus-visible:ring-2` | `focus-visible:ring-2` | `mat-focus-indicator` | `focus-visible:ring-2` | `@bind-readonly:tabindex` | `Control.Focus()` + custom border |
| Screen reader labels | `aria-label` | `aria-label` | `aria-label` + `MatLabel` | `aria-label` | `aria-label` | `AccessibleDescription` |
| Semantic HTML | `<button>`, `<nav>` | `<button>`, `<nav>` | `<button>`, `<nav>` | `<button>`, `<nav>` | Standard HTML tags | `Text`, `Button` controls |
| Live regions | `aria-live="polite"` | `aria-live="polite"` | `aria-live-region` | `aria-live="polite"` | `aria-live="polite"` | `LiveSetting` property |
| Keyboard nav | Tab / Arrow keys | Tab / Arrow keys | Tab / Arrow keys | Tab / Arrow keys | Tab / Arrow keys | `TabIndex`, `ProcessCmdKey` |
<!-- markdownlint-enable MD013 -->

---

## 6. Build & Validation Commands

<!-- markdownlint-disable MD013 -->
| Task | React | Vue | Angular | Svelte | Blazor | WinForms |
| --- | --- | --- | --- | --- | --- | --- |
| Install | `npm install` | `npm install` | `npm install` | `npm install` | `dotnet restore` | `dotnet restore` |
| Build | `npm run build` | `npm run build` | `ng build` | `npm run build` | `dotnet build` | `dotnet build` |
| Lint | `npx eslint .` | `npx eslint .` | `ng lint` | `npx eslint .` | `dotnet format` | `dotnet format` |
| Test | `npm test` | `npm test` | `ng test` | `npm test` | `dotnet test` | `dotnet test` |
| Dev server | `npm run dev` | `npm run dev` | `ng serve` | `npm run dev` | `dotnet watch` | `dotnet run` |
<!-- markdownlint-enable MD013 -->

---

## 7. Dependency Control Rules

### React Dependency Control

- **Allowed:** `react`, `react-dom`, `next`, `lucide-react`, `clsx`,
  `tailwind-merge`, `@radix-ui/*`, `tailwindcss`
- **Blocked:** Any package not in the project's `package.json` without
  explicit human approval

### Vue 3 Dependency Control

- **Allowed:** `vue`, `nuxt`, `radix-vue`, `primevue`, `@vueuse/core`,
  `tailwindcss`, `unocss`
- **Blocked:** Any package not in the project's `package.json` without
  explicit human approval

### Angular 17+ Dependency Control

- **Allowed:** `@angular/*`, `@angular/material`, `primeng`, `tailwindcss`,
  `rxjs`
- **Blocked:** Any package not in the project's `package.json` without
  explicit human approval

### Svelte 5 Dependency Control

- **Allowed:** `svelte`, `@sveltejs/kit`, `@melt-ui/svelte`,
  `@skeletonlabs/skeleton`, `tailwindcss`
- **Blocked:** Any package not in the project's `package.json` without
  explicit human approval

### Blazor Dependency Control

- **Allowed:** `MudBlazor`, `Radzen.Blazor`, `Microsoft.AspNetCore.Components.*`
- **Blocked:** Any NuGet package not in the project's `.csproj` without
  explicit human approval

### WinForms Dependency Control

- **Allowed:** Standard `System.Windows.Forms`, `System.Drawing`,
  `Microsoft.Extensions.*`
- **Blocked:** Any NuGet package not in the project's `.csproj` without
  explicit human approval

---

## 8. Icon Systems

| Stack | Icon Library | Usage Example |
| --- | --- | --- |
| React | Lucide React | `<AlertCircle className="h-4 w-4" />` |
| Vue | Lucide Vue Next | `<AlertCircle :size="16" />` |
| Angular | Material Icons | `<mat-icon>error</mat-icon>` |
| Svelte | Lucide Svelte | `<AlertCircle size={16} />` |
| Blazor | MudBlazor Icons | `<MudIcon Icon="@Icons.Material.Filled.Error" />` |
| WinForms | System.Drawing / SVG | `Icon.FromHandle(...)`, `PictureBox.Image` |

---

## 9. Stack-Specific Design Decisions

### WinForms & CSS Tokens: Full Adapter vs. Partial Support

When mapping CSS design tokens to WinForms (`System.Drawing`), **Partial
Support** is the recommended strategy. Attempting a **Full Adapter** to
translate all CSS tokens is an anti-pattern that requires excessive
development effort with minimal return. WinForms is built on native Windows
Controls and a pixel-based layout architecture, which is not designed to
support CSS-like mechanisms.

#### Recommended: Partial Support

- **Color Tokens:** Map core colors (e.g., Background, Text, Primary,
  Success, Danger) to `System.Drawing.Color` (using helper methods to
  convert hex/RGBA from CSS).
- **Typography:** Map basic properties: Font Family, Font Size, and
  Font Weight.
- **Spacing/Padding:** Map static pixel values to the `Padding` or `Margin`
  properties of supported controls.

#### Why avoid Full Adapter?

- CSS features like the Box Model, advanced borders (e.g., corner-specific
  `border-radius`), Flexbox, and cascading/inheritance are extremely
  difficult to implement on native WinForms controls.
- To fully support CSS layout and rendering in WinForms, you would have to
  override the `OnPaint` method of every control and redraw them manually.
  This is equivalent to rebuilding a custom UI framework on top of
  `System.Drawing`.

---

### Blazor: Hosting Model Selection (Server vs. WebAssembly)

For modern .NET applications (.NET 8/9+), the best approach is to use a
**Blazor Web App with Interactive Auto mode**. This mode dynamically
combines the benefits of both hosting models: fast initial load using
Server-side rendering (SSR), and smooth client-side interaction using
WebAssembly (WASM) once the assets are downloaded.

If a strict choice between hosting models is required (Global Mode), use the
following decision matrix:

<!-- markdownlint-disable MD013 -->
| Factor | Blazor Server | Blazor WebAssembly (WASM) |
| --- | --- | --- |
| **Initial Load** | Very fast (sends minimal HTML/CSS) | Slower (must download .NET runtime and DLLs) |
| **Server Resource Usage** | High (must maintain SignalR connections and UI state in memory per user) | Very low (Server only serves static files) |
| **Offline Support** | Not supported (connection loss = app freezes) | Supported (supports full PWA capabilities) |
| **Source Code Security** | High (all code and business logic remain on the server) | Lower (DLLs are downloaded to client, can be decompiled) |
<!-- markdownlint-enable MD013 -->

#### Default Selection Criteria

- **Choose Blazor Server as default when:** Building internal enterprise
  tools or back-offices where users have stable internet connections,
  maximum source code security is required, and direct integration with
  internal databases or services (without a public Web API layer) is
  preferred.
- **Choose Blazor WASM as default when:** Building public-facing web
  applications that scale to a large number of users without overloading
  server memory, or when offline operation is a key requirement.

---

## How to Use This Document

1. **AI Agents:** When generating code, detect the active stack from the
   project's config files (`package.json`, `.csproj`, etc.) and use the
   corresponding adapter section.
2. **Developers:** Reference this when porting designs between stacks or
   onboarding to a new framework.
3. **Review:** When auditing code, verify the implementation matches the
   correct adapter column for the project's stack.
