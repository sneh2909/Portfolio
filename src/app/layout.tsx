import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sneh Shah — Machine Learning Engineer",
  description:
    "ML Engineer specializing in conversational AI, LLM post-training, and RL. Currently at NoBroker (Convozen.ai).",
  keywords: [
    "Sneh Shah",
    "Machine Learning Engineer",
    "NoBroker",
    "Convozen",
    "LLM",
    "GRPO",
    "RAG",
    "ASR",
    "Reinforcement Learning",
  ],
  openGraph: {
    title: "Sneh Shah — Machine Learning Engineer",
    description:
      "ML Engineer specializing in conversational AI, LLM post-training, and RL.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Runs before paint to prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.classList.add(t==='light'?'light':'dark');})();`,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
