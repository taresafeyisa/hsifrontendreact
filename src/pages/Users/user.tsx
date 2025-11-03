import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/datatable/data-table";
import { UserNav } from "@/components/datatable/user-nav";
import { getAccessToken } from "@/Services/authService"; // Assuming getAccessToken is available

export default function TaskPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      const accessToken = getAccessToken(); // Get the stored access token

      if (!accessToken) {
        const msg = "No access token found, user is not authenticated.";
        console.error(msg);
        setError(msg);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://localhost:7014/api/Auth/users", {
          method: "GET",
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${accessToken}`, // Include token here
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const json = await response.json();
        console.log("API Response:", json); // inspect response shape

        // Normalize common wrappers: { data: [...] } or { items: [...] }
        const payload = (json && (json.data ?? json.items ?? json)) || [];
        setUsers(Array.isArray(payload) ? payload : [payload]);
      } catch (err) {
        console.error("Failed to load users:", err);
        setError(String(err));
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <div className="md:hidden">
        <img
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground light"
          className="block dark:hidden"
        />
        <img
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground dark"
          className="hidden dark:block"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 sm:gap-6 mt-10">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Users List
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of users in your system.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <UserNav />
          </div>
        </div>

        <DataTable data={users} columns={columns} />
      </div>
    </>
  );
}
