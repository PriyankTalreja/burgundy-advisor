import { Sidebar } from "./Sidebar";
import { ReactNode } from "react";

export const AppShell = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen min-w-[1280px] bg-background text-foreground">
    <Sidebar />
    <main className="ml-[240px] min-h-screen">
      <div className="mx-auto max-w-[1440px] px-10 py-10">{children}</div>
    </main>
  </div>
);
