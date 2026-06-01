# SecureBank Employee Portal - Design System Documentation

## 🎨 Color Scheme

All colors are defined as CSS custom properties in `src/styles/theme.scss`:

- **Primary**: Deep Navy Blue (`#0A1F44`) - Used for headers, navigation bars, and primary buttons
- **Secondary**: Emerald Green (`#2ECC71`) - Used for success states, verified transactions, and highlights
- **Accent**: Gold (`#F1C40F`) - Used for call-to-action buttons (Submit to SWIFT) and important labels
- **Background**: Light Gray (`#F4F6F8`) - Used for page backgrounds
- **Text**: Charcoal (`#333333`) - Used for all body text

## 📐 Layout Rules

### Fixed Header (64px)
- Located in `src/components/Header.jsx`
- Contains SecureBank branding, navigation links (Home, Transactions, About)
- Sidebar toggle button (hamburger ☰) appears on mobile screens (<768px)
- Navigation links remain visible on desktop

### Left Sidebar (240px)
- Located in `src/components/Sidebar.jsx`
- Quick links:
  - 📊 Dashboard
  - ⏳ Pending Payments
  - ✓ Verified Payments
- Collapses/hides on mobile screens (<768px)
- Overlay mechanism prevents body scroll on mobile when open

### Main Content Area
- Flexible layout with responsive behavior
- Contains transaction tables with standardized columns:
  - Customer Name
  - Account
  - Amount
  - Currency
  - SWIFT Code
  - Status (with color badges)
  - Actions (Verify & Submit to SWIFT buttons)

### Footer
- Located in `src/components/Footer.jsx`
- Displays security features, compliance info, and contact details
- Sticky to bottom of viewport

## 🔧 Components

### Header.jsx
```jsx
<Header onToggleSidebar={toggleSidebarFunction} />
```
- Responsive: Hides text labels on mobile, shows hamburger menu toggle

### Sidebar.jsx
```jsx
<Sidebar open={sidebarOpen} onClose={closeSidebarFunction} />
```
- Props:
  - `open`: Boolean to show/hide sidebar
  - `onClose`: Callback to close sidebar on link click

### Footer.jsx
```jsx
<Footer />
```
- No props required, renders security and compliance info

### TransactionTable.jsx
```jsx
<TransactionTable 
  transactions={paymentArray} 
  onReload={reloadFunction} 
/>
```
- Props:
  - `transactions`: Array of transaction objects
  - `onReload`: Callback to refresh data after action
- Shows "Verify" button (secondary color) for Pending status
- Shows "Submit to SWIFT" button (accent color) for Verified status

## 📄 Pages

### About Page (`src/pages/About.jsx`)
- Describes portal purpose and security features
- Covers:
  - Transport security (TLS/SSL)
  - Data integrity (cryptographic hashing)
  - Input validation & sanitization
  - Attack protection mechanisms
  - Audit logging
- Compliance with banking standards (PCI DSS, GDPR, SOX, ISO 27001)

### Employee Dashboard (`src/pages/EmployeeDashboard.jsx`)
- Main page after employee login
- Displays transaction statistics via `StatsCards` component
- Search functionality via `SearchBar` component
- Transaction table via `TransactionTable` component

## 🎯 Spacing & Typography

### Base Spacing: 16px (`--spacing-base`)
- Use for major padding/margins
- Subsizes: xs(4px), sm(8px), md(12px), lg(24px), xl(32px)

### Border Radius: 6px (`--radius-base`)
- Applied to buttons, cards, inputs, and form elements

### Typography
- **Headings**: Bold, Deep Navy (#0A1F44)
  - H1: 28px
  - H2: 24px
  - H3: 20px
- **Body Text**: Charcoal (#333333), 14px
- **Links**: Navy by default, Emerald Green on hover

## 🔒 Security Features Highlighted

The design system emphasizes security:
- Color scheme includes navy for authority/security feel
- Dedicated security disclaimer in footer
- Status badges show verification state clearly
- Audit-ready structure with clear action tracking

## 📱 Responsive Design

### Breakpoints:
- **Desktop**: >= 769px - Sidebar visible, normal layout
- **Tablet**: 481px - 768px - Sidebar hidden/toggled, simplified header
- **Mobile**: <= 480px - Stacked layout, single column

### Mobile Behavior:
- Header remains fixed and visible
- Sidebar slides in from left on toggle, with overlay
- Main content takes full width
- Tables adapt with horizontal scroll if needed
- Button groups stack vertically

## 🚀 Usage Example

```jsx
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import TransactionTable from "./components/TransactionTable";

function EmployeeLayout({ children, sidebarOpen, onToggleSidebar, onCloseSidebar }) {
  return (
    <div className="app-container">
      <Header onToggleSidebar={onToggleSidebar} />
      <div className="app-shell">
        <Sidebar open={sidebarOpen} onClose={onCloseSidebar} />
        {children}
      </div>
      <Footer />
    </div>
  );
}

// In your page component:
<TransactionTable 
  transactions={payments} 
  onReload={loadPayments} 
/>
```

## 📦 File Structure

```
src/
├── styles/
│   ├── theme.scss          # Color & spacing variables
│   └── global.scss         # Global styles, layout, responsive
├── components/
│   ├── Header.jsx          # Fixed header with nav
│   ├── Sidebar.jsx         # Left sidebar with quick links
│   ├── Footer.jsx          # Footer with security info
│   └── TransactionTable.jsx # Reusable transaction table
├── pages/
│   ├── About.jsx           # About page (design system showcase)
│   └── EmployeeDashboard.jsx # Uses new components
└── App.js                  # Routes with EmployeeLayout wrapper
```

## ✅ Implementation Checklist

- [x] Theme variables with CSS custom properties
- [x] Global SCSS with responsive layout
- [x] Header component with navigation
- [x] Sidebar component with quick links
- [x] Footer component with security info
- [x] TransactionTable component
- [x] About page with security & compliance details
- [x] Mobile responsive design (sidebar collapse)
- [x] Color scheme applied consistently
- [x] 16px base spacing applied
- [x] 6px border radius applied
- [x] Proper typography hierarchy
- [x] Status badges for transaction states
