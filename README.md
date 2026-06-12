# 📄 Learnly — AI-Powered Learning Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe" />
</p>

Learnly is a modern, premium web application that transforms standard PDF files into interactive study guides. By leveraging advanced AI models, the platform acts as an intelligent learning workspace—instantly extracting concepts, generating comprehensive study aids, and letting users interact directly with their textbooks and documents.

---

## 🚀 Key Features

*   📄 **Intelligent PDF Parsing:** Upload document files and convert them into structured study resources.
*   💬 **Conversational AI Assistant:** Ask questions, clarify dense terminology, and query specific pages directly in a dedicated chat workspace.
*   🧠 **Dynamic Mind Maps:** Visualize conceptual relationships and hierarchies mapping out the contents of your PDFs.
*   📇 **Automated Flashcards:** Study terms, key ideas, and definitions using interactive cards generated directly from source documents.
*   🧪 **AI Quizzing Engine:** Generate customized multiple-choice tests and quiz questions to test knowledge retention.
*   ✍️ **Workspace Notes:** Take, edit, and reference study notes side-by-side with your learning materials.
*   📊 **Progress Analytics:** Keep track of study duration, flashcard reviews, and quiz accuracy.

---

## 🗺️ How it Works

1.  **Upload Your PDF** — Drag and drop or select any PDF file (textbooks, lecture slide collections, or research briefs up to 50MB).
2.  **Configure Study Space** — Customize your learning methods. Toggle between study channels like interactive quizzes, AI summaries, flashcards, or active chat.
3.  **Engage & Excel** — Review summaries, take quizzes, run through flashcards, and query the assistant to master the materials in half the time.

---

## 🛠️ Technology Stack

### Frontend & Client State
*   **React 18 & Vite** – Modern, high-performance web runtime and bundling
*   **Tailwind CSS & Shadcn/ui** – Responsive, fluid designs, customized for premium visual aesthetics
*   **React Router v6** – Structured client-side routing
*   **Zustand** – Light-weight, high-performance global state management

### Backend & Cloud Infrastructure
*   **Supabase (BaaS)** – Authentication, SQL Database, Object Storage, and Secure Edge Functions
*   **PostgreSQL** – Relational database storing user progress, documents metadata, and study notes
*   **Anthropic Claude & OpenRouter** – Large Language Model routing for high-quality context summaries and learning aid generations
*   **Stripe** – Payment processing integrations
*   **Resend** – Transactional and notification email services

---

## 💳 Membership Tiers

| Tier | Price | Best For | Features |
| :--- | :--- | :--- | :--- |
| **Basic Free** | $0/mo | Trial & light study | 5 uploads/month, standard summary cards, self-study flashcards |
| **Pro Student** | $9.99/mo | Full-time academics | Unlimited uploads, advanced quiz generator, full chat assistant access, export tools |
| **Research Team** | $29.99/mo | Collaboration & labs | Shared document spaces, shared folders, team analytics dashboards, priority support |

---

## 📁 Repository Structure

```
learnly/
├── public/                 # Static assets and icons
├── src/
│   ├── assets/            # Local images and visual assets
│   ├── components/        # React components (Layout, UI, Dashboard, Landing)
│   │   ├── ui/           # Custom reusable Shadcn primitives
│   │   ├── layout/       # Sidebar and wrapper layouts
│   │   └── landing/      # High-fidelity landing page sections
│   ├── pages/            # Page-level route views (Dashboard, Studio, Notes)
│   ├── hooks/            # Custom utility React hooks
│   ├── lib/              # Library and client configurations
│   ├── store/            # Zustand global stores
│   ├── services/         # API wrappers
│   ├── routes/           # Routing configuration
│   └── App.jsx           # Main application entry component
├── supabase/
│   ├── functions/        # Edge serverless functions
│   └── migrations/       # Relational database schemas and updates
└── [config files]        # Tailwind, Vite, Prettier, PostCSS configurations
```

---

## 💻 Getting Started

Follow these steps to run the application in a local development environment.

### Prerequisites

*   **Node.js 18+** installed on your system.
*   **npm** or **yarn** package manager.

### Local Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/learnly.git
    cd learnly
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Start Development Server**
    ```bash
    npm run dev
    ```

4.  **Access the Application**
    Open your browser and navigate to `http://localhost:3000`.

---

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for more information.
