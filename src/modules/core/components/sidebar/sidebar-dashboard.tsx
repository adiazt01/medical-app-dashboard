import {
    BookOpen,
    Bot,
    BriefcaseMedical,
    MapPin,
    Settings2,
    User,
  } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SideBarBody } from "./sidebar-body"
import { SideBarUser } from "./sidebar-user"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Productos",
      url: "#",
      icon: BriefcaseMedical,
      isActive: false,
      items: [
        {
          title: "Ver todos",
          url: "/dashboard/products",
        },
      ],
    },
    {
      title: "Sucursales",
      url: "#",
      icon: MapPin,
      isActive: false,
      items: [
        {
          title: "Ver todas",
          url: "/dashboard/branches",
        },
        {
          title: "Ver medicamentos",
          url: "/dashboard/branches/medicines",
        }
      ],
    },
    {
      title: "Usuarios",
      url: "#",
      icon: User,
      isActive: false,
      items: [
        {
          title: "Ver todos",
          url: "/dashboard/users",
        },
      ]
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
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
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
}
export function SidebarDashboard({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <SideBarBody  items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SideBarUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}