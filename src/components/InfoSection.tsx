export default function InfoSection() {
  return (
    <section className="card">
      <h2>What&rsquo;s happening?</h2>
      <p>
        Claude Fable 5 — Anthropic&rsquo;s first Mythos-class model — has been included in Pro,
        Max, Team, and select Enterprise plans at up to 50% of weekly usage limits since it
        returned on July 1. That included access was set to end July 7, but on deadline day
        Anthropic extended it by five days, to <strong>July 12, 2026</strong>.
      </p>
      <p>
        After the cutoff, Fable 5 doesn&rsquo;t disappear — it moves to metered usage credits at
        $10 / $50 per million input / output tokens. Anthropic says it will return to
        subscription plans once capacity allows.
      </p>
      <ul className="sources">
        <li>
          <a
            href="https://thenewstack.io/anthropic-extends-fable-5/"
            target="_blank"
            rel="noreferrer"
          >
            The New Stack — extension to July 12
          </a>
        </li>
        <li>
          <a
            href="https://www.anthropic.com/news/redeploying-fable-5"
            target="_blank"
            rel="noreferrer"
          >
            Anthropic — Redeploying Fable 5
          </a>
        </li>
        <li>
          <a
            href="https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans"
            target="_blank"
            rel="noreferrer"
          >
            Anthropic — usage credits for paid plans
          </a>
        </li>
      </ul>
    </section>
  )
}
