import { GITHUB_RELEASES, SITE_URL } from "./config";

export function buildNullThreatVsClamavHtml(nav: string): string {
  return `${nav}
<article>
  <h1>Null Threat vs ClamAV: which offline scanner should you use?</h1>
  <p>
    <strong>Null Threat</strong> and <strong>ClamAV</strong> both scan files locally without uploading them to the cloud.
    They solve different jobs: ClamAV is a mature signature engine; Null Threat is a desktop workflow that combines
    signatures, YARA rules, hash lookup, and deep analysis with risk scoring and quarantine.
  </p>

  <h2>Quick comparison</h2>
  <table border="1" cellpadding="8" cellspacing="0">
    <thead>
      <tr><th>Feature</th><th>Null Threat</th><th>ClamAV</th></tr>
    </thead>
    <tbody>
      <tr><td>Cloud uploads</td><td>Never</td><td>Never (local engine)</td></tr>
      <tr><td>License</td><td>GPL v3</td><td>GPL v2</td></tr>
      <tr><td>Desktop GUI</td><td>Yes</td><td>Requires third-party UI</td></tr>
      <tr><td>YARA rules</td><td>Built-in stage</td><td>Via tooling/integration</td></tr>
      <tr><td>Risk score 0–100</td><td>Yes, per engine</td><td>Signature hit / no hit</td></tr>
      <tr><td>Quarantine vault</td><td>Yes</td><td>Varies by frontend</td></tr>
      <tr><td>Offline after updates</td><td>Yes</td><td>Yes</td></tr>
      <tr><td>Price</td><td>Free</td><td>Free</td></tr>
    </tbody>
  </table>

  <h2>When to choose ClamAV</h2>
  <p>
    Pick ClamAV if you need a battle-tested signature engine for servers, mail gateways, or scripting into
    existing pipelines. It is the industry-standard open-source AV engine with massive signature coverage.
  </p>

  <h2>When to choose Null Threat</h2>
  <p>
    Pick <strong>Null Threat</strong> if you want an auditable desktop scanner for Windows, macOS, or Linux that
    combines four local engines, transparent risk scoring, folder watch, and quarantine — without a subscription
    or vendor cloud. Null Threat includes signature scanning and adds YARA, hash intelligence, and structural analysis
    in one offline workflow.
  </p>

  <h2>Can you use both?</h2>
  <p>
    Yes. Many security teams run ClamAV on servers and a desktop scanner for analyst workstations.
    Null Threat is designed as a privacy-first second opinion for files on your machine.
  </p>

  <h2>Offline malware scanner comparison 2026</h2>
  <p>
    For privacy-focused users in 2026, the decision is less “cloud vs local” and more “engine only vs full desktop pipeline.”
    Null Threat targets the latter: one local verdict with evidence you can inspect under GPL v3.
  </p>

  <p>
    <a href="${GITHUB_RELEASES}">Download Null Threat</a> ·
    <a href="${SITE_URL}/compare">Local vs cloud AV</a> ·
    <a href="${SITE_URL}/faq">FAQ</a> ·
    <a href="${SITE_URL}/">Null Threat homepage</a>
  </p>
</article>`;
}
