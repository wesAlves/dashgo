import { Stack } from "@chakra-ui/react";
import {
  RiDashboardLine,
  RiContactsLine,
  RiInputMethodLine,
  RiGitMergeLine,
} from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine} href="/dashboard">
          Dashboard
        </NavLink>
        <NavLink icon={RiContactsLine} href="/users">
          Users
        </NavLink>
      </NavSection>
      <NavSection title="AuThomation">
        <NavLink icon={RiInputMethodLine} href="/forms">
          Forms
        </NavLink>
        <NavLink icon={RiGitMergeLine} href="/authomation">
          Authomation
        </NavLink>
      </NavSection>
    </Stack>
  );
}
