# 🏦 SecureBank Employee Portal - Design System Quick Start Guide

## Overview

This guide provides everything needed to work with the new banking employee portal design system.

---

## 🎯 Quick Links

- **Design System Documentation**: `frontend/DESIGN_SYSTEM.md`
- **Implementation Summary**: `frontend/IMPLEMENTATION_SUMMARY.md`
- **Theme Variables**: `frontend/src/styles/theme.scss`
- **Global Styles**: `frontend/src/styles/global.scss`

---

## 🚀 Getting Started

### 1. Install Dependencies (if needed)
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm start
```

The application will open at `http://localhost:3000`

### 3. View Design System in Action

- **Employee Portal**: `/employee/dashboard` (requires login)
- **About Page**: `/about`
- **Home Page**: `/`

---

## 🎨 Color Reference

Always use CSS custom properties from `src/styles/theme.scss`:

```scss
// Primary - Headers, Navigation, Primary Buttons
background-color: var(--color-primary); // #0A1F44 (Deep Navy)

// Secondary - Success, Verified, Highlights, Hover
background-color: var(--color-secondary); // #2ECC71 (Emerald Green)

// Accent - Call-to-Action, Important Labels
background-color: var(--color-accent); // #F1C40F (Gold)

// Background - Pages, Light Areas
background-color: var(--color-bg); // #F4F6F8 (Light Gray)

// Text - Body, Default
color: var(--color-text); // #333333 (Charcoal)
```

---

## 📐 Spacing Reference

Always use spacing variables:

```scss
padding: var(--spacing-base);    // 16px - Standard padding/margin
padding: var(--spacing-lg);      // 24px - Large sections
padding: var(--spacing-md);      // 12px - Medium elements
padding: var(--spacing-sm);      // 8px  - Small elements
padding: var(--spacing-xs);      // 4px  - Minimal spacing

margin: var(--spacing-base);     // 16px - Standard margin
```

---

## 🔘 Button Usage

### Primary Button (Navy)
```jsx
<button className="btn btn-primary">Login</button>
```

### Secondary Button (Emerald Green - Verify)
```jsx
<button className="btn btn-secondary">Verify</button>
```

### Accent Button (Gold - Submit to SWIFT)
```jsx
<button className="btn btn-accent">Submit to SWIFT</button>
```

### Small Button Variant
```jsx
<button className="btn btn-secondary btn-sm">Verify</button>
```

### Button Group
```jsx
<div className="btn-group">
  <button className="btn btn-secondary">Verify</button>
  <button className="btn btn-accent">Submit</button>
</div>
```

---

## 📊 Table Implementation

### Using TransactionTable Component
```jsx
import TransactionTable from '../components/TransactionTable';

// In your component:
<TransactionTable 
  transactions={payments}
  onReload={loadPayments}
/>
```

### Table Structure
```html
<table className="table">
  <thead>
    <tr>
      <th>Customer Name</th>
      <th>Account</th>
      <th>Amount</th>
      <th>Currency</th>
      <th>SWIFT Code</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td>123456789</td>
      <td>5000.00</td>
      <td>USD</td>
      <td>SWIFT123</td>
      <td>
        <span className="status-badge pending">Pending</span>
      </td>
      <td>
        <button className="btn btn-secondary btn-sm">Verify</button>
      </td>
    </tr>
  </tbody>
</table>
```

### Status Badges
```jsx
// Pending - Gold
<span className="status-badge pending">Pending</span>

// Verified - Emerald
<span className="status-badge verified">Verified</span>

// Submitted - Navy
<span className="status-badge submitted">Submitted</span>
```

---

## 📱 Responsive Classes

All components are mobile-responsive. Key breakpoints:

```scss
// Desktop: >= 769px
// Default styles apply

// Tablet: 481px - 768px
@media (max-width: 768px) {
  /* Sidebar hides, header simplifies */
}

// Mobile: <= 480px
@media (max-width: 480px) {
  /* Stacked layout, single column */
}
```

---

## 🧩 Component Usage Guide

### Header Component
```jsx
import Header from './components/Header';

<Header onToggleSidebar={handleToggleSidebar} />
```

**Props**:
- `onToggleSidebar`: Function to toggle sidebar visibility

**Features**:
- Fixed at top
- Responsive navigation
- Hamburger menu on mobile

### Sidebar Component
```jsx
import Sidebar from './components/Sidebar';

<Sidebar open={sidebarOpen} onClose={handleCloseSidebar} />
```

**Props**:
- `open`: Boolean - show/hide sidebar
- `onClose`: Function - close sidebar callback

**Features**:
- Left-aligned quick navigation
- Active link indication
- Mobile overlay
- Auto-closes on link click on mobile

### Footer Component
```jsx
import Footer from './components/Footer';

<Footer />
```

**Features**:
- Security features list
- Compliance information
- Contact details
- No props required

### TransactionTable Component
```jsx
import TransactionTable from './components/TransactionTable';

<TransactionTable 
  transactions={paymentArray}
  onReload={refreshFunction}
/>
```

**Props**:
- `transactions`: Array of transaction objects
- `onReload`: Function to refresh data

**Features**:
- Renders verify button for Pending status
- Renders submit button for Verified status
- Status badges with color coding
- Empty state handling

---

## 📄 Creating a New Page with Layout

### Step 1: Create Your Page Component
```jsx
// pages/MyPage.jsx
export default function MyPage() {
  return (
    <div className="main-content">
      <h1>My Page</h1>
      <div className="card">
        {/* Your content */}
      </div>
    </div>
  );
}
```

### Step 2: Add Route with Layout in App.js
```jsx
<Route
  path="/my-page"
  element={
    <EmployeeLayout
      sidebarOpen={sidebarOpen}
      onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      onCloseSidebar={() => setSidebarOpen(false)}
    >
      <MyPage />
    </EmployeeLayout>
  }
/>
```

### Step 3: Use Design System Classes
```jsx
<div className="card">
  <h1>Title</h1>
  <p>Body text</p>
  <button className="btn btn-primary">Action</button>
</div>
```

---

## 🎨 Styling New Components

### Using Global Classes
```jsx
// Card container
<div className="card">
  <h2>Title</h2>
  <p>Content</p>
</div>

// Form group
<div className="form-group">
  <label>Email</label>
  <input type="email" />
</div>

// Alert/Message
<div className="alert alert-success">
  Transaction verified successfully!
</div>

<div className="alert alert-error">
  An error occurred. Please try again.
</div>

<div className="alert alert-info">
  This is an informational message.
</div>
```

### Custom SCSS in New Files
```scss
// Import variables
@import '../styles/theme.scss';

.my-component {
  background: var(--color-bg);
  padding: var(--spacing-base);
  border-radius: var(--radius-base);
  color: var(--color-text);

  h1 {
    color: var(--color-primary);
  }

  button {
    background: var(--color-secondary);

    &:hover {
      opacity: 0.9;
    }
  }
}
```

---

## 📋 Common Patterns

### Form with Validation
```jsx
<div className="card">
  <h2>Update Payment</h2>
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Amount</label>
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)}
      />
    </div>

    <div className="btn-group">
      <button className="btn btn-primary" type="submit">
        Save
      </button>
      <button className="btn btn-secondary" type="button">
        Cancel
      </button>
    </div>
  </form>
</div>
```

### Status Timeline
```jsx
<div className="card">
  <h2>Transaction Status</h2>
  <div style={{ padding: 'var(--spacing-base)' }}>
    <p>
      <span className="status-badge pending">Pending</span>
      Created on 2024-01-01 10:00 AM
    </p>
    <p>
      <span className="status-badge verified">Verified</span>
      Verified on 2024-01-01 11:00 AM
    </p>
    <p>
      <span className="status-badge submitted">Submitted</span>
      Submitted on 2024-01-01 12:00 PM
    </p>
  </div>
</div>
```

### Data List
```jsx
<div className="card">
  <h2>Transaction Details</h2>
  <dl style={{ 
    display: 'grid', 
    gridTemplateColumns: '150px 1fr',
    gap: 'var(--spacing-md)',
    padding: 'var(--spacing-base)'
  }}>
    <dt><strong>Customer:</strong></dt>
    <dd>John Doe</dd>

    <dt><strong>Amount:</strong></dt>
    <dd>$5,000.00 USD</dd>

    <dt><strong>SWIFT Code:</strong></dt>
    <dd>SWIFT123</dd>
  </dl>
</div>
```

---

## 🔍 Debugging

### Check Color Application
```javascript
// Open DevTools Console
console.log(getComputedStyle(document.documentElement).getPropertyValue('--color-primary'));
// Should output: " #0A1F44"
```

### Verify Spacing
```javascript
// Check if spacing variable is available
const spacing = getComputedStyle(document.documentElement).getPropertyValue('--spacing-base');
console.log(spacing); // Should output: " 16px"
```

### Mobile Responsive Testing
1. Open DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Test at 768px and 480px breakpoints
4. Verify sidebar collapses and header adjusts

---

## 📚 Typography Hierarchy

```html
<!-- Headings (All Navy, Bold) -->
<h1>Main Page Title - 28px</h1>
<h2>Section Title - 24px</h2>
<h3>Subsection - 20px</h3>
<h4>Minor Heading - 18px</h4>

<!-- Body Text (Charcoal, 14px) -->
<p>Regular paragraph text with 1.5 line height.</p>

<!-- Links (Navy, Hover = Emerald) -->
<a href="/about">View security details</a>

<!-- Labels (Small, 12px) -->
<label>Email Address</label>
```

---

## 🔐 Security Best Practices

The design system emphasizes security:

1. **Color Psychology**: Navy conveys trust and security
2. **Clear Status**: Transaction status is always visible
3. **Action Buttons**: Clear, distinct buttons for sensitive actions
4. **Audit Trail**: Footer mentions logging and security
5. **Compliance**: About page documents all security features

---

## 📞 Support & Troubleshooting

### Issue: Styles not loading
- **Solution**: Ensure `index.js` imports `./styles/global.scss`
- **Check**: Look for SCSS compilation errors in console

### Issue: Sidebar not toggling on mobile
- **Solution**: Check `window.innerWidth` in DevTools
- **Check**: Verify breakpoint is < 768px

### Issue: Colors not matching
- **Solution**: Use CSS custom properties (e.g., `var(--color-primary)`)
- **Check**: Verify theme.scss is imported in global.scss

### Issue: Spacing inconsistent
- **Solution**: Always use `--spacing-*` variables
- **Check**: Don't hardcode pixel values

---

## ✅ Checklist for New Features

- [ ] Import required components/styles
- [ ] Use CSS custom properties for colors
- [ ] Apply spacing with `--spacing-*` variables
- [ ] Use 6px border-radius for interactive elements
- [ ] Test responsive design at 768px and 480px
- [ ] Verify dark/light contrast (WCAG AA)
- [ ] Update navigation links if adding new pages
- [ ] Add route to EmployeeLayout wrapper if employee feature
- [ ] Test on mobile device or DevTools

---

## 📖 Additional Resources

- **React Documentation**: https://react.dev
- **React Router**: https://reactrouter.com
- **SCSS Documentation**: https://sass-lang.com
- **Web Accessibility**: https://www.w3.org/WAI/WCAG21/quickref/
- **Banking Security Standards**: https://www.pcisecuritystandards.org/

---

## 🎉 You're Ready!

The design system is fully implemented and ready for use. Start building secure, beautiful interfaces for the SecureBank employee portal.

For questions, refer to:
- `DESIGN_SYSTEM.md` - Complete design documentation
- `IMPLEMENTATION_SUMMARY.md` - Implementation details
- Component files for implementation examples

Happy coding! 🚀
