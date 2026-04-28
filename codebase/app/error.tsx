"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <main className="container error-box">
      <h1>Something went wrong</h1>
      <p>We could not complete your request. Please try again.</p>
      <button type="button" className="btn btn-primary" onClick={reset}>
        Try Again
      </button>
    </main>
  );
}
