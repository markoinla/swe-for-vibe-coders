import { useState } from 'preact/hooks';

export interface QuizOption {
  text: string;
  correct?: boolean;
  /** Shown after the learner picks this option. */
  explain?: string;
}

interface QuizProps {
  question: string;
  options: QuizOption[];
}

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

/**
 * A single multiple-choice question with immediate feedback. Interactive island —
 * hydrated on the client with `client:visible`. Keep questions checking
 * understanding, not recall of trivia.
 */
export default function Quiz({ question, options }: QuizProps) {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;
  const chosen = answered ? options[picked] : null;
  const gotItRight = chosen?.correct ?? false;

  return (
    <div data-quiz class="my-8 rounded-card border border-line-strong bg-elevated p-[22px] shadow-[var(--shadow-card)]">
      <div>
        <span class="inline-block rounded-full bg-accent-soft px-[9px] py-[3px] text-[0.72rem] font-bold uppercase tracking-wider text-accent">
          Check yourself
        </span>
        <p class="mt-3 text-[1.12rem] font-semibold leading-snug">{question}</p>
      </div>

      <ul class="mt-[18px] flex list-none flex-col gap-2.5 p-0">
        {options.map((opt, i) => {
          const isPicked = picked === i;
          let state: 'idle' | 'correct' | 'wrong' = 'idle';
          if (answered && opt.correct) state = 'correct';
          else if (answered && isPicked && !opt.correct) state = 'wrong';
          return (
            <li key={i}>
              <button
                type="button"
                disabled={answered}
                onClick={() => setPicked(i)}
                class={cx(
                  'flex w-full items-start gap-3 rounded-btn border px-[15px] py-[13px] text-left text-base transition-colors',
                  state === 'idle' &&
                    'border-line-strong bg-surface text-body enabled:hover:border-accent enabled:hover:bg-accent-soft',
                  state === 'correct' && 'border-success bg-success-soft text-body',
                  state === 'wrong' && 'border-danger bg-danger-soft text-body',
                  !answered && 'cursor-pointer',
                )}
              >
                <span
                  aria-hidden="true"
                  class={cx(
                    'grid h-6 w-6 shrink-0 place-items-center rounded-md text-[0.85rem] font-bold',
                    state === 'idle' && 'bg-sunken text-muted',
                    state === 'correct' && 'bg-success text-white',
                    state === 'wrong' && 'bg-danger text-white',
                  )}
                >
                  {state === 'correct' ? '✓' : state === 'wrong' ? '✗' : String.fromCharCode(65 + i)}
                </span>
                <span>{opt.text}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {answered && (
        <div
          class={cx(
            'mt-4 rounded-btn px-4 py-3.5 text-[0.98rem] leading-snug',
            gotItRight ? 'bg-success-soft text-success' : 'bg-danger-soft text-danger',
          )}
        >
          <strong>{gotItRight ? 'Correct.' : 'Not quite.'}</strong>{' '}
          {chosen?.explain ??
            (gotItRight
              ? 'Nice work.'
              : 'Take another look — the right answer is highlighted above.')}
          {!gotItRight && (
            <button
              type="button"
              class="mt-2.5 block cursor-pointer font-bold underline"
              onClick={() => setPicked(null)}
            >
              Try again
            </button>
          )}
        </div>
      )}
    </div>
  );
}
