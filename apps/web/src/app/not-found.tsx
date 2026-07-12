import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-canvas px-6">
      <div className="max-w-sm text-center">
        <div className="eyebrow">Not found</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">This page is unavailable.</h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          The project may not exist or may belong to another account.
        </p>
        <Link className="button button-primary mt-6" href="/projects">
          Return to projects
        </Link>
      </div>
    </main>
  );
}
