import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LogOut,
  Settings,
  User,
  CreditCard,
  Bell,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";

interface UserDropdownProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  /** Trigger UI (e.g. user icon button or sidebar button) */
  trigger: ReactNode;
  /** Direction for dropdown content — useful for sidebar or header */
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

export function UserDropdown({
  user,
  trigger,
  side = "bottom",
  align = "end",
}: UserDropdownProps) {
  // Generate initials (e.g. JH or TA)
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };
  const initials = getInitials(user.name);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent
        side={side}
        align={align}
        sideOffset={8}
        className="min-w-56 rounded-lg"
      >
        {/* User info header */}
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              {user.avatar ? (
                <AvatarImage src={user.avatar} alt={user.name} />
              ) : null}
              <AvatarFallback className="rounded-lg text-sm font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Main dropdown items (customizable) */}
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="h-4 w-4 mr-2" /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="h-4 w-4 mr-2" /> Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="h-4 w-4 mr-2" /> Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell className="h-4 w-4 mr-2" /> Notifications
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Sparkles className="h-4 w-4 mr-2" /> Upgrade to Pro
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive">
          <LogOut className="h-4 w-4 mr-2" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
