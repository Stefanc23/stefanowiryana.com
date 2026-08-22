import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi2';

export default function ProjectNotFound() {
  return (
    <section className="mx-auto grid min-h-[70svh] w-full max-w-7xl place-items-center px-5 py-20 text-center sm:px-8 lg:px-10">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
          Project not found
        </p>
        <h1 className="mt-5 text-5xl font-semibold leading-none tracking-[-0.05em] text-light sm:text-7xl">
          This project file isn&apos;t available.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-light/65">
          It may have moved, returned to draft, or never existed at this
          address.
        </p>
        <Link
          href="/dev"
          className="mt-9 inline-flex items-center gap-2 rounded-xl bg-light px-5 py-3 text-sm font-semibold text-dark transition hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
        >
          <HiArrowLeft className="size-4" aria-hidden="true" />
          Return to projects
        </Link>
      </div>
    </section>
  );
}
