import { AuthContext } from "./../../context/AuthContext";
import { useContext } from "react";
type UseCanParams = {
  permisions?: string[];
  roles?: string[];
};

export function useCan({ permisions, roles }: UseCanParams) {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return false;
  }

  if (permisions.length > 0) {
    const hasAllPermissions = permisions.every((permision) => {
      return user.permissions.includes(permision);
    });

    if (!hasAllPermissions) {
      return false;
    }
  }

  if (roles.length > 0) {
    const hasAllRoles = roles.every((role) => {
      return user.roles.includes(role);
    });

    if (!hasAllRoles) {
      return false;
    }
  }

  return true;
}
