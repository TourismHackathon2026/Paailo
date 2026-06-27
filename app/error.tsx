"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-center">
      <div className="max-w-md rounded-2xl border border-amber-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Something went wrong</h2>
        <p className="mt-3 text-sm text-slate-600">
          Paaila could not load the latest Supabase data. Please verify your environment variables and try again.
        </p>
        <button
          onClick={() => reset()}
          className="mt-5 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
