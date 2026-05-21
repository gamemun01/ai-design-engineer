<!-- markdownlint-disable -->
# 04 Design System — AI-Friendly Tokens & Component Contracts

> **"Design systems are the link between AI generation and production code."**

A good design system makes AI output **consistent, scalable, and production-ready**. Without it, every generated component looks different.

---

## 📚 Table of Contents

1. [Design Tokens (Core)](#design-tokens-core)
2. [Component Contracts](#component-contracts)
3. [Accessibility Requirements](#accessibility-requirements)
4. [JSON Export Format](#json-export-format)
<!-- Original:
5. [Token Examples](#token-examples)
-->
5. [Token Examples](#token-examples-in-real-projects)
6. [How to Use with AI](#how-to-use-with-ai)

---

## Design Tokens (Core)

Design tokens are **the single source of truth** for your design. They're not just for designers—they're the bridge to code.

### 1. Spacing Scale

```
Spacing is the most important token because it affects:
- Layout rhythm
- Readability
- Mobile responsiveness
- Visual hierarchy
```

**Token Definition:**

```json
{
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px",
    "xxl": "48px",
    "xxxl": "64px"
  }
}
```

**Usage Rules:**

- Never use arbitrary spacing (5px, 13px, 27px)
- Always use tokens—it enforces consistency
- Mobile-first: Start with spacing that works at 320px

**Examples:**

```css
/* Good: Using tokens */
button { padding: var(--spacing-md) var(--spacing-lg); }
card { padding: var(--spacing-lg); }
section { margin-bottom: var(--spacing-xl); }

/* Bad: Random values */
button { padding: 12px 20px; }
card { padding: 18px; }
section { margin-bottom: 28px; }
```

---

### 2. Typography Scale

**Token Definition:**

```json
{
  "typography": {
    "display": {
      "size": "48px",
      "lineHeight": "1.2",
      "fontWeight": 700,
      "family": "Poppins"
    },
    "h1": {
      "size": "32px",
      "lineHeight": "1.25",
      "fontWeight": 700,
      "family": "Poppins"
    },
    "h2": {
      "size": "24px",
      "lineHeight": "1.33",
      "fontWeight": 600,
      "family": "Poppins"
    },
    "h3": {
      "size": "20px",
      "lineHeight": "1.4",
      "fontWeight": 600,
      "family": "Inter"
    },
    "body": {
      "size": "16px",
      "lineHeight": "1.5",
      "fontWeight": 400,
      "family": "Inter"
    },
    "small": {
      "size": "14px",
      "lineHeight": "1.43",
      "fontWeight": 400,
      "family": "Inter"
    },
    "tiny": {
      "size": "12px",
      "lineHeight": "1.33",
      "fontWeight": 500,
      "family": "Inter"
    },
    "caption": {
      "size": "12px",
      "lineHeight": "1.33",
      "fontWeight": 400,
      "family": "Inter"
    }
  }
}
```

**Usage Rules:**

- Exactly 7 levels (display, h1-h3, body, small, caption)
- No custom sizes
- Line-height set per level (improves readability)
- Font weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

---

### 3. Color Tokens

**Semantic Color System:**

```json
{
  "colors": {
    "primary": "#6B63B5",
    "primary-light": "#D4D0E8",
    "primary-dark": "#4A4280",
    
    "secondary": "#FF6B9D",
    "secondary-light": "#FFB3D9",
    "secondary-dark": "#CC3366",
    
    "success": "#10B981",
    "warning": "#F59E0B",
    "danger": "#EF4444",
    "info": "#3B82F6",
    
    "neutral": {
      "50": "#F9FAFB",
      "100": "#F3F4F6",
      "200": "#E5E7EB",
      "300": "#D1D5DB",
      "400": "#9CA3AF",
      "500": "#6B7280",
      "600": "#4B5563",
      "700": "#374151",
      "800": "#1F2937",
      "900": "#111827"
    },
    
    "text": {
      "primary": "#111827",
      "secondary": "#6B7280",
      "tertiary": "#9CA3AF",
      "disabled": "#D1D5DB",
      "inverse": "#FFFFFF"
    },
    
    "background": {
      "primary": "#FFFFFF",
      "secondary": "#F9FAFB",
      "tertiary": "#F3F4F6"
    }
  }
}
```

**Contrast Requirements:**

```
Text on light background:
- Primary text: 4.5:1 contrast (WCAG AA)
- Secondary text: 3:1 contrast (WCAG AA)

Example: Text #111827 on background #FFFFFF = 21:1 (excellent)
Example: Text #9CA3AF on background #FFFFFF = 4.5:1 (OK, minimum)
Example: Text #D1D5DB on background #FFFFFF = 3:1 (WCAG AA for large text)
```

---

### 4. Border Radius Scale

```json
{
  "borderRadius": {
    "none": "0px",
    "sm": "4px",
    "md": "8px",
    "lg": "12px",
    "xl": "16px",
    "full": "9999px"
  }
}
```

**Usage Rules:**

- Buttons: lg (12px)
- Cards: lg (12px)
- Input fields: md (8px)
- Images: md (8px)
- Badges: full (9999px) for perfect circles

---

### 5. Shadow System

```json
{
  "shadows": {
    "none": "none",
    "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
  }
}
```

**Usage:**

- Default cards: shadow-md
- Hover effect: increase to shadow-lg
- Modals: shadow-xl
- Never: shadow-sm on interactive elements (barely visible)

---

### 6. Responsive Breakpoints

```json
{
  "breakpoints": {
    "mobile": "< 640px",
    "tablet": "640px - 1024px",
    "desktop": "> 1024px"
  }
}
```

**Important Mobile Constraints:**

```
Mobile (< 640px):
- Single column layout
- Padding: 16px sides
- Typography: Keep readable at small size
- Touch targets: 48px minimum

Tablet (640-1024px):
- 2-column or 2-column grid
- More breathing room than mobile
- Can show more detail

Desktop (> 1024px):
- Full-featured layout
- Multi-column
- Hover states enabled
```

---

## Component Contracts

A component contract is a **specification for how a component works**. It bridges design and code.

### Button Component Contract

```json
{
  "button": {
    "purpose": "Clickable action element",
    "variants": {
      "primary": {
        "description": "Main call-to-action",
        "background": "var(--color-primary)",
        "color": "var(--color-text-inverse)",
        "border": "none",
        "padding": "var(--spacing-sm) var(--spacing-lg)",
        "minHeight": "48px",
        "minWidth": "120px"
      },
      "secondary": {
        "description": "Secondary action",
        "background": "transparent",
        "color": "var(--color-primary)",
        "border": "2px solid var(--color-primary)",
        "padding": "calc(var(--spacing-sm) - 2px) var(--spacing-lg)",
        "minHeight": "48px"
      },
      "danger": {
        "description": "Delete or destructive action",
        "background": "var(--color-danger)",
        "color": "var(--color-text-inverse)",
        "border": "none",
        "padding": "var(--spacing-sm) var(--spacing-lg)",
        "minHeight": "48px"
      }
    },
    "states": {
      "default": "Normal state",
      "hover": {
        "description": "Mouse over",
        "change": "Opacity 0.9 or darker shade"
      },
      "focus": {
        "description": "Keyboard/accessibility focus",
        "change": "2px outline, 2px offset"
      },
      "active": {
        "description": "Currently pressed",
        "change": "Darker shade, scale 0.98"
      },
      "disabled": {
        "description": "Not clickable",
        "background": "var(--color-neutral-200)",
        "color": "var(--color-text-disabled)",
        "cursor": "not-allowed"
      },
      "loading": {
        "description": "Async operation in progress",
        "content": "Spinner icon + 'Loading...' text",
        "cursor": "not-allowed"
      }
    },
    "accessibility": {
      "semanticTag": "<button>",
      "ariaLabel": "Optional if text is clear",
      "ariaPressed": "For toggle buttons",
      "ariaLoading": "For loading state",
      "keyboardShortcuts": "Optional"
    },
    "responsive": {
      "mobile": "Full width or 48px minimum",
      "desktop": "Inline, 120px minimum"
    }
  }
}
```

### Card Component Contract

```json
{
  "card": {
    "purpose": "Container for grouped content",
    "states": {
      "default": {
        "background": "var(--color-background-primary)",
        "border": "none",
        "borderRadius": "var(--borderRadius-lg)",
        "padding": "var(--spacing-lg)",
        "shadow": "var(--shadow-md)"
      },
      "hover": {
        "shadow": "var(--shadow-lg)",
        "transform": "translateY(-2px) (optional)",
        "transition": "200ms ease"
      },
      "active": {
        "border": "2px solid var(--color-primary)"
      }
    },
    "content": {
      "title": "semantic <h2> or <h3>",
      "description": "<p>",
      "actions": "Buttons or links",
      "image": "Optional header image, 16:9 ratio"
    }
  }
}
```

<!-- Original separator and header:
---

## Accessibility Requirements
-->
---

## Strict AI-to-Code Contracts

To ensure scalability and zero-drift between design tokens and production
code, AI-to-code generators must follow strict compliance rules:

1. **No Inline Styling or Magic Numbers:** AI generators are strictly
   forbidden from writing inline `style={{ ... }}` tags or using arbitrary
   values like `p-[17px]`, `w-[327px]`, or custom HEX colors in Tailwind
   classes.
2. **Direct Token Mapping:** Every style choice must directly trace back to a
   defined design token (e.g., mapping `#6B63B5` directly to
   `var(--color-primary)` or Tailwind's `bg-primary` utility).
3. **Component Contract Strictness:** Generated components must implement
   *only* the variants, states, and props defined in their respective
   contracts. AI must not invent new API surface areas or styling variations.
4. **Theme Config Sovereignty:** Custom tokens must only be defined at the
   theme configuration layer (e.g., Tailwind CSS v4 `@theme` block or CSS
   custom properties), not within individual component implementations.

---

## Accessibility Requirements

Every component must meet these standards:

### 1. **Contrast** (WCAG 2.1 AA Minimum)

```
Normal text: 4.5:1 contrast
Large text (> 18px): 3:1 contrast

Test with: WebAIM Contrast Checker
```

### 2. **Semantic HTML**

```
Don't:
<div onclick="...">Click</div>

Do:
<button>Click</button>
```

### 3. **Focus States**

```
Required:
- 2px outline
- 2px offset
- Visible on all interactive elements
- Color: Brand primary or high-contrast

Example:
button:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### 4. **ARIA Labels**

```
<button aria-label="Close menu">
  <svg>...</svg>
</button>

<input aria-describedby="email-hint" />
<span id="email-hint">Format: user@example.com</span>
```

### 5. **Keyboard Navigation**

```
Required:
- Tab: Move forward through interactive elements
- Shift+Tab: Move backward
- Enter: Activate button
- Space: Toggle checkbox, activate button
- Escape: Close modal
```

---

## JSON Export Format

**Full token file for export to code:**

```json
{
  "version": "1.0.0",
  "name": "Yoga Studio Design System",
  "tokens": {
    "spacing": {
      "xs": "4px",
      "sm": "8px",
      "md": "16px",
      "lg": "24px",
      "xl": "32px"
    },
    "typography": {
      "h1": {
        "fontSize": "32px",
        "lineHeight": "1.25",
        "fontWeight": 700,
        "fontFamily": "Poppins"
      }
    },
    "colors": {
      "primary": "#6B63B5",
      "secondary": "#FF6B9D",
      "success": "#10B981",
      "danger": "#EF4444"
    },
    "borderRadius": {
      "sm": "4px",
      "md": "8px",
      "lg": "12px",
      "full": "9999px"
    },
    "shadows": {
      "sm": "0 1px 2px rgba(0,0,0,0.05)",
      "md": "0 4px 6px rgba(0,0,0,0.1)",
      "lg": "0 10px 15px rgba(0,0,0,0.1)"
    }
  },
  "components": {
    "button": { /* contract */ },
    "card": { /* contract */ },
    "input": { /* contract */ }
  }
}
```

---

## Token Examples in Real Projects

### Example 1: Button Component in React

```jsx
// Using tokens
export function Button({ variant = 'primary', children, ...props }) {
  const buttonClasses = {
    primary: 'bg-primary text-white px-lg py-sm rounded-lg hover:bg-primary-dark',
    secondary: 'border-2 border-primary text-primary px-lg py-sm rounded-lg',
    danger: 'bg-danger text-white px-lg py-sm rounded-lg hover:bg-danger-dark'
  }
  
  return (
    <button 
      className={`min-h-12 min-w-[120px] transition-all ${buttonClasses[variant]}`}
      {...props}
    >
      {children}
    </button>
  )
}
```

### Example 2: Card with Tokens

```jsx
export function Card({ title, description, image, onHover }) {
  return (
    <div 
      className="bg-background-primary rounded-lg p-lg shadow-md hover:shadow-lg transition-shadow"
      onMouseEnter={onHover}
    >
      {image && <img src={image} className="rounded-lg mb-lg" alt={title} />}
      <h2 className="text-h2 mb-md">{title}</h2>
      <p className="text-body text-secondary mb-lg">{description}</p>
    </div>
  )
}
```

---

## How to Use with AI

### Step 1: Define Your Tokens

Create a `tokens.json` file in your project root with all tokens.

### Step 2: Share with AI

In your prompt to AI, include:

```
"Use these design tokens for all styling:
- Spacing: Use only sm (8px), md (16px), lg (24px), xl (32px)
- Colors: Use primary (#6B63B5), secondary (#FF6B9D), success (#10B981), danger (#EF4444)
- Typography: Use h1, h2, body, small (see tokens.json)
- Border radius: lg (12px) for cards, md (8px) for inputs
- Shadows: md for cards, lg on hover

Output as Tailwind CSS classes using these token values."
```

### Step 3: AI Respects Tokens

Result: Consistent, production-ready code

```jsx
// AI generates this (using tokens)
<button className="px-lg py-md bg-primary text-white rounded-lg hover:shadow-lg">
  Click me
</button>

// NOT this (random values)
<button className="px-[20px] py-[12px] bg-[#6B63B5]...">
  Click me
</button>
```

---

## 🎯 Takeaways

1. **Design tokens = consistency** (same spacing, colors, typography everywhere)
2. **Component contracts = predictability** (developers know what to build)
3. **Accessibility = requirement** (WCAG 2.1 AA minimum, not optional)
4. **Mobile-first = constraint** (design for 320px, scale up)
5. **Tokens in prompts = better AI output** (AI respects constraints)
6. **JSON export = handoff** (designers → developers → AI)

---

## 🚀 Next Steps

→ **02-prompting-patterns**: Include tokens in your prompts

→ **05-ui-generation**: Use tokens when generating UI

→ **06-ai-to-code**: Export tokens for code generation

→ **07-review-critique**: Check token consistency in reviews
