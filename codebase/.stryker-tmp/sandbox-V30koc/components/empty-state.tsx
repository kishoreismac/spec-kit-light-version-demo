// @ts-nocheck
"use client";

type Props = {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
};

export function EmptyState({ title, description, actionLabel, onAction }: Props) {
  return (
    <section className="card" aria-live="polite">
      <h2>{title}</h2>
      <p className="muted">{description}</p>
      <button type="button" className="btn btn-secondary mt-3" onClick={onAction}>
        {actionLabel}
      </button>
    </section>
  );
}
