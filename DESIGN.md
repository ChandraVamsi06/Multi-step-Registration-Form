# Design Document

## 🏗️ Architecture Overview
The application follows a modular component-based architecture. The main `MultiStepForm` container acts as the orchestrator, managing the layout and determining which step component to render based on the global state.

### Directory Structure
- `/store`: Contains the centralized Zustand store for state and logic.
- `/components/steps`: Individual form pages (Personal, Address, Account, Review).
- `/components/ui`: Reusable, accessible UI atoms (Input, Button).
- `/schemas`: Zod validation schemas separated from UI logic.

## 🧠 State Management: Why Zustand?
I chose **Zustand** over Redux or Context API for three reasons:
1. **Simplicity**: It requires less boilerplate code, keeping the application lightweight.
2. **Performance**: It prevents unnecessary re-renders by allowing components to subscribe only to the specific data they need.
3. **Built-in Persistence**: The `persist` middleware made checking the "Data Persistence" requirement (saving to localStorage) extremely efficient and reliable without writing custom synchronization logic.

## 🛡️ Validation Strategy
Validation is handled by **Zod** integrated with **React Hook Form**.
- **Schema-First**: Defining schemas separately (`formSchema.js`) ensures logic is reusable and testable.
- **Real-time Feedback**: Errors are shown immediately via the `Input` component, using `aria-invalid` attributes to ensure screen readers announce errors correctly.
- **Async Validation**: The "Username Availability" check uses a simulated async function in the `onSubmit` handler of the Account step to mimic real-world server latency.

## ♿ Accessibility (a11y)
- **Keyboard Navigation**: The form is fully navigable using Tab.
- **Focus Management**: React Hook Form automatically focuses the first invalid input when validation fails.
- **Semantic HTML**: Proper use of `<label>`, `<input>`, and role attributes ensures compatibility with assistive technologies.