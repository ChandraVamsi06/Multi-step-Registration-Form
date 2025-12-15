# Multi-Step Registration Form

A fully accessible, responsive multi-step registration form built with React, Tailwind CSS, and Zustand.

## 🚀 Features
- **Multi-Step Wizard**: Broken down into Personal, Address, Account, and Review steps.
- **Form Validation**: Strict validation using **Zod** (Age 18+, Strong Password, Phone format).
- **State Persistence**: Uses `localStorage` to save progress automatically. If you refresh, data remains.
- **Accessibility**: Fully keyboard navigable with ARIA labels and focus management.
- **Async Validation**: Simulates a server check for username availability.

## 🛠️ Tech Stack
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Forms**: React Hook Form
- **Validation**: Zod
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🏃‍♂️ How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/ChandraVamsi06/Multi-step-Registration-Form.git
   cd Multi-step-Registration-Form

2. **Install dependencies**
   ```bash
   npm install

3. **Start the development server**
   ```bash
   npm run dev

4. Open the App Visit `http://localhost:5173` in your browser.