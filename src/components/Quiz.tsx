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
    <div class="quiz" data-answered={answered}>
      <div class="quiz-q">
        <span class="quiz-badge">Check yourself</span>
        <p class="quiz-question">{question}</p>
      </div>
      <ul class="quiz-options">
        {options.map((opt, i) => {
          const isPicked = picked === i;
          const reveal = answered;
          let state = 'idle';
          if (reveal && opt.correct) state = 'correct';
          else if (reveal && isPicked && !opt.correct) state = 'wrong';
          return (
            <li key={i}>
              <button
                type="button"
                class={`quiz-option ${state}`}
                disabled={answered}
                onClick={() => setPicked(i)}
              >
                <span class="marker" aria-hidden="true">
                  {state === 'correct' ? '✓' : state === 'wrong' ? '✗' : String.fromCharCode(65 + i)}
                </span>
                <span>{opt.text}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {answered && (
        <div class={`quiz-feedback ${gotItRight ? 'good' : 'bad'}`}>
          <strong>{gotItRight ? 'Correct.' : 'Not quite.'}</strong>{' '}
          {chosen?.explain ??
            (gotItRight
              ? 'Nice work.'
              : 'Take another look — the right answer is highlighted above.')}
          {!gotItRight && (
            <button type="button" class="quiz-retry" onClick={() => setPicked(null)}>
              Try again
            </button>
          )}
        </div>
      )}

      <style>{`
        .quiz {
          border: 1px solid var(--border-strong);
          border-radius: var(--radius);
          background: var(--bg-elevated);
          padding: 22px;
          margin: 32px 0;
          box-shadow: var(--shadow);
        }
        .quiz-badge {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--accent);
          background: var(--accent-soft);
          padding: 3px 9px;
          border-radius: 999px;
        }
        .quiz-question {
          font-size: 1.12rem;
          font-weight: 600;
          margin: 12px 0 0;
          line-height: 1.5;
        }
        .quiz-options {
          list-style: none;
          padding: 0;
          margin: 18px 0 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .quiz-option {
          width: 100%;
          text-align: left;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 13px 15px;
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-sm);
          background: var(--bg);
          color: var(--text);
          font-size: 1rem;
          font-family: inherit;
          cursor: pointer;
          transition: border-color 0.12s ease, background 0.12s ease;
        }
        .quiz-option:not(:disabled):hover {
          border-color: var(--accent);
          background: var(--accent-soft);
        }
        .quiz-option:disabled {
          cursor: default;
        }
        .quiz-option .marker {
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          border-radius: 6px;
          background: var(--bg-sunken);
          display: grid;
          place-items: center;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
        }
        .quiz-option.correct {
          border-color: var(--success);
          background: var(--success-soft);
        }
        .quiz-option.correct .marker {
          background: var(--success);
          color: #fff;
        }
        .quiz-option.wrong {
          border-color: var(--danger);
          background: var(--danger-soft);
        }
        .quiz-option.wrong .marker {
          background: var(--danger);
          color: #fff;
        }
        .quiz-feedback {
          margin-top: 16px;
          padding: 14px 16px;
          border-radius: var(--radius-sm);
          font-size: 0.98rem;
          line-height: 1.55;
        }
        .quiz-feedback.good {
          background: var(--success-soft);
          color: var(--success);
        }
        .quiz-feedback.bad {
          background: var(--danger-soft);
          color: var(--danger);
        }
        .quiz-retry {
          display: block;
          margin-top: 10px;
          background: none;
          border: none;
          padding: 0;
          font: inherit;
          font-weight: 700;
          color: inherit;
          text-decoration: underline;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
