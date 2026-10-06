"use client";

import { useState } from "react";

export default function SignOutButton() {
  const [loading, setLoading] = useState(false);

  function handleSignOut() {
    setLoading(true);

    const form = document.createElement("form");

    form.method = "POST";
    form.action = "/auth/signout";

    document.body.appendChild(form);
    form.submit();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={loading}
      className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/5 disabled:opacity-50"
    >
      {loading ? "Signing out..." : "Sign Out"}
    </button>
  );
}