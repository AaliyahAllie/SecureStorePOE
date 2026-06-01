# 🎨 SecureBank Design System - Visual Reference

## Color Palette

```
┌─────────────────────────────────────────────────────┐
│                  PRIMARY COLORS                     │
├─────────────────────────────────────────────────────┤

█ Deep Navy Blue (#0A1F44)
  └─ Headers, Navigation, Primary Buttons
  └─ Example: .btn-primary, .app-header, h1/h2/h3

█ Emerald Green (#2ECC71)
  └─ Success, Verified, Hover States
  └─ Example: .btn-secondary, .status-badge.verified

█ Gold (#F1C40F)
  └─ Call-to-Action, Important Labels
  └─ Example: .btn-accent, .status-badge.pending

█ Light Gray (#F4F6F8)
  └─ Page Backgrounds, Subtle Areas
  └─ Example: body, .app-bg

█ Charcoal (#333333)
  └─ Body Text, Main Content
  └─ Example: p, body text

└─────────────────────────────────────────────────────┘
```

## Typography Scale

```
┌──────────────────────────────────────────┐
│           TYPOGRAPHY SIZES               │
├──────────────────────────────────────────┤

H1  [████████████] 28px  Bold  Navy
    Main page titles

H2  [██████████] 24px  Bold  Navy
    Section headings

H3  [████████] 20px  Bold  Navy
    Subsection headings

H4  [██████] 18px  Bold  Navy
    Minor headings

Body [████] 14px  Regular  Charcoal
     Main text content

Small [██] 12px  Regular  Charcoal
      Labels, helper text

└──────────────────────────────────────────┘
```

## Spacing System

```
┌─────────────────────────────────┐
│    SPACING & PADDING SCALE      │
├─────────────────────────────────┤

XS  |  4px   ──────
SM  |  8px   ────────────
MD  | 12px   ────────────────
BASE| 16px   ──────────────────  ← Standard
LG  | 24px   ─────────────────────────
XL  | 32px   ───────────────────────────────

Applied to:
• Padding & Margins
• Gap (flexbox/grid)
• Card spacing
• Component padding

└─────────────────────────────────┘
```

## Component Specifications

### Header Component
```
╔════════════════════════════════════════════════════╗
║  🏦 SecureBank | Home | Transactions | About  [☰] ║
║  Dark Navy Background - 64px Height - Fixed        ║
╚════════════════════════════════════════════════════╝
```

### Sidebar Component
```
┌────────────┐
│ Dashboard  │ ← NavLink (Navy)
│ ⏳ Pending  │
│ ✓ Verified │
│            │
│ Navigation │
│ Links      │
│ with       │
│ Active     │
│ States     │
│            │
└────────────┘
Width: 240px
Collapses on mobile (<768px)
```

### Transaction Table
```
┌─────────────────────────────────────────────────────────────────┐
│ Customer Name│Account│Amount│Currency│SWIFT│Status│Actions     │
├─────────────────────────────────────────────────────────────────┤
│ John Doe     │123456 │5000  │USD     │SWI01│⊙ Pending│[Verify]  │
│ Jane Smith   │789012 │3500  │EUR     │SWI02│✓ Verified│[SWIFT]  │
│ Bob Johnson  │345678 │2000  │GBP     │SWI03│✓ Verified│[SWIFT]  │
└─────────────────────────────────────────────────────────────────┘
```

### Button States
```
Primary Button (Navy)
┌──────────────┐
│   PRIMARY    │  Default - Background: #0A1F44
└──────────────┘
┌──────────────┐
│   PRIMARY    │  Hover - Darker navy
└──────────────┘
┌──────────────┐
│   PRIMARY    │  Disabled - Opacity 0.6
└──────────────┘

Secondary Button (Emerald) - Verify
┌──────────────┐
│   VERIFY     │  Background: #2ECC71
└──────────────┘

Accent Button (Gold) - Submit to SWIFT
┌──────────────┐
│ SUBMIT SWIFT │  Background: #F1C40F, Text: #0A1F44
└──────────────┘
```

### Status Badges
```
[Pending]   - Gold background, gold text
[Verified]  - Emerald background, green text
[Submitted] - Navy background, navy text
```

## Layout Structure

```
┌──────────────────────────────────────────────┐
│         FIXED HEADER (64px) - Navy           │
├──────────┬──────────────────────────────────┤
│          │                                  │
│ SIDEBAR  │       MAIN CONTENT               │
│ 240px    │       (Flexible)                 │
│          │                                  │
│ Left Nav │  • Transaction Tables            │
│ Links    │  • Forms                         │
│          │  • Cards                         │
│          │  • Stats                         │
│          │                                  │
├──────────┴──────────────────────────────────┤
│  FOOTER - Security Info & Compliance        │
└──────────────────────────────────────────────┘
```

## Mobile Layout (< 768px)

```
┌──────────────────────┐
│   FIXED HEADER (64px)│
├──────────────────────┤
│                      │
│   MAIN CONTENT       │
│   (Full Width)       │
│                      │
│   [☰] Menu Button    │
│   Toggles Sidebar    │
│                      │
├──────────────────────┤
│  FOOTER              │
└──────────────────────┘

Sidebar: Slides in from left with overlay
```

## Color Usage Examples

### Text
```
Primary Text (Navy):      Headers, Navigation Links
Body Text (Charcoal):     Paragraphs, Labels, Content
Success Text (Emerald):   Verified status, Confirmation
```

### Backgrounds
```
Primary (Navy):           Headers, Primary Buttons
Secondary (Emerald):      Hover states, Secondary Buttons
Accent (Gold):           CTA buttons, Important labels
Background (Light Gray):  Page background, Card backgrounds
White:                   Cards, Modals, Input fields
```

### Borders & Dividers
```
Subtle dividers:  rgba(0, 0, 0, 0.08)
Status indicators: Color-matched (green, gold, navy)
```

## Border Radius

```
All Interactive Elements: 6px

├─ Buttons
├─ Input fields
├─ Card containers
├─ Status badges
└─ Modals/Dropdowns
```

## Responsive Breakpoints

```
Desktop     ≥ 769px   Sidebar visible, full layout
Tablet      481-768px Sidebar hidden/toggled
Mobile      ≤ 480px   Stacked layout, touch-optimized
```

## Shadow System

```
Subtle (Cards):      0 1px 2px rgba(0,0,0,0.04)
Elevated (Hover):    0 4px 12px rgba(0,0,0,0.04)
Header:             0 2px 8px rgba(0,0,0,0.04)
```

## Z-Index Scale

```
Header      1000  ← Fixed header (highest)
Sidebar     900   ← Sidebar overlay
Modal       1001  ← Modal dialogs
Default     0     ← Normal content
```

## Animation & Transitions

```
Standard transition: 0.2s ease

├─ Link hover color change
├─ Button shadow on hover
├─ Sidebar slide-in animation
└─ Focus state transitions
```

## Accessibility Features

```
✓ Color contrast WCAG AA
✓ Focus indicators on interactive elements
✓ ARIA labels on buttons
✓ Keyboard navigation support
✓ Semantic HTML structure
```

## Security-Focused Design Elements

```
Navy Header           → Authority & Security
Emerald Verification  → Trust & Success
Gold Call-to-Action   → Important Actions (Verify)
Clear Status Badges   → Transaction Transparency
Security Footer       → Compliance Information
About Page           → Security Documentation
```

## Quick Reference

### When to Use Each Color

**Deep Navy (#0A1F44)**
- Main navigation
- Page headers
- Primary buttons
- Strong emphasis text

**Emerald Green (#2ECC71)**
- Verified/Success states
- Hover effects on links
- Secondary buttons
- Positive indicators

**Gold (#F1C40F)**
- Critical call-to-action (SWIFT submission)
- Important labels
- Warnings/Alerts
- Attention-grabbing elements

**Light Gray (#F4F6F8)**
- Page background
- Card backgrounds
- Subtle dividers
- Secondary backgrounds

**Charcoal (#333333)**
- Body text
- Form labels
- Content text
- Default text color

---

## Component Quick Template

### Card
```
┌─────────────────────┐
│ Title               │ ← H2, Navy
├─────────────────────┤
│ Card content        │ ← Body text, Charcoal
│ with 16px padding   │
│                     │
│ [Button]            │ ← 6px radius
└─────────────────────┘
```

### Form Group
```
┌──────────────┐
│ Label        │ ← Bold, Charcoal
├──────────────┤
│ [Input]      │ ← 6px radius, border on focus
│              │
└──────────────┘
```

### Alert
```
┌─────────────────────────────────────┐
│ ✓ Success message in green          │ ← Emerald
│                                     │
│ Padding: 16px, Radius: 6px          │
└─────────────────────────────────────┘
```

---

## Files to Reference

- **Colors**: `frontend/src/styles/theme.scss` (CSS variables)
- **Layout**: `frontend/src/styles/global.scss`
- **Components**: `frontend/src/components/`
- **Full Specs**: `frontend/DESIGN_SYSTEM.md`

---

**Quick Reference Card** ✅ Print-friendly design system overview
