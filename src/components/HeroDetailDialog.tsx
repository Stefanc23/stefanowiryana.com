'use client';

import { useEffect, useRef } from 'react';
import { HiX } from 'react-icons/hi';

import type { HeroNode } from '@/types/content';

interface HeroDetailDialogProps {
  node: HeroNode | null;
  onDismiss: () => void;
}

const HeroDetailDialog = ({ node, onDismiss }: HeroDetailDialogProps) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;

    if (node && !element.open) {
      element.showModal();
    } else if (!node && element.open) {
      element.close();
    }
  }, [node]);

  return (
    <dialog
      ref={dialog}
      className="hero-detail-dialog fixed inset-x-0 top-auto bottom-0 m-0 h-auto max-h-[85svh] w-full max-w-none overflow-y-auto rounded-t-3xl border border-light/12 bg-dark p-0 text-light shadow-2xl backdrop:bg-dark/65 backdrop:backdrop-blur-sm md:inset-y-0 md:right-0 md:left-auto md:h-[100svh] md:max-h-none md:w-[26rem] md:rounded-none md:rounded-l-3xl"
      aria-labelledby="hero-detail-title"
      onClose={onDismiss}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      {node && (
        <div className="relative min-h-full p-6 sm:p-8 md:px-9 md:py-12">
          <button
            type="button"
            className="absolute top-5 right-5 grid size-10 place-items-center rounded-full border border-light/12 bg-light/[0.055] text-light/70 transition hover:border-primary/60 hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
            aria-label="Close capability details"
            autoFocus
            onClick={() => dialog.current?.close()}
          >
            <HiX className="size-5" aria-hidden />
          </button>

          <p className="pr-12 text-[0.68rem] font-semibold tracking-[0.24em] text-primary uppercase">
            {node.category}
          </p>
          <h2
            id="hero-detail-title"
            className="mt-4 max-w-xs text-3xl leading-tight font-semibold tracking-[-0.035em] text-light sm:text-4xl"
          >
            {node.title}
          </h2>
          <div
            className="mt-6 h-px w-full bg-linear-to-r from-primary/65 via-secondary/35 to-transparent"
            aria-hidden
          />
          <p className="mt-6 text-base leading-8 text-light/70">{node.body}</p>

          {node.evidence.length > 0 && (
            <dl className="mt-8 grid grid-cols-2 gap-3">
              {node.evidence.map((evidence) => (
                <div
                  key={`${evidence.value}-${evidence.label}`}
                  className="rounded-2xl border border-light/10 bg-light/[0.045] p-4"
                >
                  <dt className="text-xs leading-5 text-light/50">
                    {evidence.label}
                  </dt>
                  <dd className="mt-2 text-base font-semibold text-secondary">
                    {evidence.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {node.tags.length > 0 && (
            <div className="mt-8" aria-label="Related skills">
              <p className="text-[0.68rem] font-semibold tracking-[0.2em] text-light/45 uppercase">
                Related skills
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {node.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md border border-light/10 bg-light/[0.045] px-2.5 py-1.5 text-xs text-light/70"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
};

export default HeroDetailDialog;
