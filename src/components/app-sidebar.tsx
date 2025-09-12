import * as React from "react"
import {
  BookOpen,
  Bot,
  Briefcase,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "User Management",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Users",
          url: "/users",
        },
        {
          title: "User Registration",
          url: "/userregistration",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Employee Records",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Employee Registration",
          url: "/employeeregistration",
        },
        {
          title: "All employees",
          url: "/employeeregistration",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },

  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
          <div className="flex items-center gap-3 p-2">
             <Briefcase className="w-5 h-5 text-muted-foreground" />
            {/* <img src="/logo.svg" alt="Company Logo" className="w-6 h-6" /> */}
          <span className="font-semibold text-sm truncate">Employee Record</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
       {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
