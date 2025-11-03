import { User } from "lucide-react";

import { ModeToggle } from "./mode-toggle";
import { SidebarTrigger } from "./ui/sidebar";
import { UserDropdown } from "./user-dropdown";

export function SiteHeader() {
  const user = {
    name: "John Henry",
    email: "john.henry@example.com",
  };

  // Get initials — e.g. "JH"

  return (
    <header className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
      {/* Left: Sidebar trigger */}
      <SidebarTrigger />

      {/* Right: Theme toggle + user menu */}
      <div className="flex items-center gap-4">
        <ModeToggle />

        <UserDropdown
          user={user}
          trigger={
            <button
              className="p-2 rounded-full hover:bg-accent transition-colors"
              aria-label="User menu"
            >
              <User className="h-6 w-6 text-muted-foreground" />
            </button>
          }
          side="bottom"
          align="end"
        />
      </div>
    </header>
  );
}
