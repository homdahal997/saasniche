import { useEffect, useState } from "react";

export function useUserRole() {
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    fetch("/api/auth/session")
      .then(res => res.json())
      .then(data => setRole(data?.user?.role || null));
  }, []);
  return role;
}
