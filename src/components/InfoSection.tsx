export default function InfoSection() {
  return (
    <section className="card card-info">
      <h2>What&rsquo;s happening?</h2>
      <p>
        Fable 5 has been included in paid Claude plans at up to 50% of weekly usage limits
        since July 1. The cutoff was set for July 7 — then extended on deadline day.
      </p>
      <dl className="facts">
        <dt>Included until</dt>
        <dd>July 12, 2026 · 11:59:59 PM PT</dd>
        <dt>What changes</dt>
        <dd>Moves from plan-included to metered usage credits</dd>
        <dt>Price after</dt>
        <dd>$10 / $50 per million input / output tokens</dd>
        <dt>Coming back?</dt>
        <dd>Anthropic says yes, once capacity allows</dd>
      </dl>
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
