'use client'
import React, { useEffect, useMemo, useState } from "react";

type User = {
  id: string;
  name: string;
  email?: string;
  role?: string;
};

const mockUsers = (): User[] => [
  { id: "u-1", name: "Maria Example", email: "maria@example.com", role: "Admin" },
  { id: "u-2", name: "Mark Taylor", email: "mark@example.com", role: "User" },
  { id: "u-3", name: "Anna Bell", email: "anna@example.com", role: "HR" },
  { id: "u-4", name: "John Doe", email: "john@example.com", role: "User" },
];

export default function UsersPageClient() {
  const [users, setUsers] = useState<User[]>([]);
  const [q, setQ] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    // replace with real fetch if needed
    setUsers(mockUsers());
  }, []);

  // match anywhere (case-insensitive) in name — updates as user types
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return users;
    return users.filter((u) => u.name.toLowerCase().includes(s));
  }, [q, users]);

  function openModal() {
    setForm({ name: "", email: "", role: "" });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id =
      typeof crypto !== "undefined" && (crypto as any).randomUUID
        ? (crypto as any).randomUUID()
        : `u-${Date.now()}`;
    if (!form.name.trim()) return;
    const newUser: User = {
      id,
      name: form.name.trim(),
      email: form.email.trim() || undefined,
      role: form.role.trim() || undefined,
    };
    setUsers((prev) => [newUser, ...prev]);
    closeModal();
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 w-full max-w-lg">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name (type to search)..."
            className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-400"
            autoFocus
          />

          {/* Add New placed next to search */}
          <button
            onClick={openModal}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md border-2 border-indigo-600 hover:bg-indigo-700 text-sm"
            aria-label="Add new user"
          >
            + Add New
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {results.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8 border-2 border-dashed border-gray-200 rounded-md">
            No users match "{q}"
          </div>
        ) : (
          results.map((u) => (
            <div
              key={u.id}
              role="button"
              tabIndex={0}
              className="p-4 rounded-lg bg-white/40 border-2 border-gray-200/90 hover:border-indigo-400 hover:bg-white/60 transform hover:scale-105 transition duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">ID</div>
                  <div className="text-xs text-gray-700 font-mono">{u.id}</div>
                </div>
                <div className="text-3xl">👤</div>
              </div>

              <div className="mt-3">
                <div className="text-xs text-gray-500">Name</div>
                <div className="text-lg font-semibold">{u.name}</div>

                {u.email && <div className="mt-2 text-sm text-gray-600">{u.email}</div>}
                {u.role && <div className="mt-1 text-xs text-gray-500">Role: {u.role}</div>}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={closeModal} />
          <form
            onSubmit={handleSubmit}
            className="relative z-10 w-full max-w-md bg-white rounded-lg p-6 border-2 border-gray-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <h3 id="modal-title" className="text-lg font-semibold mb-3">
              Register new user
            </h3>

            <label className="block mb-2">
              <div className="text-xs text-gray-600 mb-1">Name</div>
              <input
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                autoFocus
              />
            </label>

            <label className="block mb-2">
              <div className="text-xs text-gray-600 mb-1">Email</div>
              <input
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </label>

            <label className="block mb-4">
              <div className="text-xs text-gray-600 mb-1">Role</div>
              <input
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </label>

            <div className="flex items-center justify-end gap-2">
              <button type="button" onClick={closeModal} className="px-3 py-2 border rounded-md">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}