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
          title: "Todos",
          url: "/dashboard/products",
        },
        {
          title: "Por sucursal",
          url: "/dashboard/products/branchs",
        }
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
          url: "/dashboard/branchs",
        },
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
  ],
}

export function SidebarDashboard({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <SideBarBody  items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
