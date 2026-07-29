import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of the Equal Horizons website.",
};

export default function TermsPage() {
  return (
    <section className="legal-page">
      <div className="legal-inner">
        <p className="editorial-index">LEGAL</p>
        <h1>Terms of Service</h1>
        <p className="legal-updated">Last updated July 29, 2026</p>

        <div className="legal-section">
          <h2>1. About these terms</h2>
          <p>
            These terms govern your use of the Equal Horizons website. By using
            this site, you agree to these terms. If you do not agree, please do
            not use the site.
          </p>
        </div>

        <div className="legal-section">
          <h2>2. Early-stage information</h2>
          <p>
            Equal Horizons is a student-founded, early-stage initiative. Content
            on this site describes research interests, concepts, and exploratory
            projects. It is provided for general information only and is not
            medical, legal, engineering, or other professional advice.
          </p>
        </div>

        <div className="legal-section">
          <h2>3. No product or safety guarantee</h2>
          <p>
            Concepts and prototypes shown here are not represented as finished,
            tested, approved, or commercially available products. Do not rely on
            this site as a substitute for qualified professional guidance or use
            any described concept in a safety-critical situation.
          </p>
        </div>

        <div className="legal-section">
          <h2>4. Acceptable use</h2>
          <p>
            You may use this site only for lawful purposes. You may not attempt
            to disrupt the site, access systems without permission, submit
            malicious material, impersonate another person, or use the site in a
            way that infringes another person&apos;s rights.
          </p>
        </div>

        <div className="legal-section">
          <h2>5. Your submissions</h2>
          <p>
            If you contact us, you confirm that you have the right to share the
            information you submit. Please do not send confidential, sensitive,
            medical, or proprietary information through the contact form. A
            submission does not create a partnership, advisory, employment, or
            professional relationship.
          </p>
        </div>

        <div className="legal-section">
          <h2>6. Intellectual property</h2>
          <p>
            Unless otherwise stated, the site&apos;s original text, branding,
            illustrations, and design belong to Equal Horizons or their
            respective licensors. You may view and share links to the site, but
            may not reproduce or commercially exploit its content without
            permission.
          </p>
        </div>

        <div className="legal-section">
          <h2>7. Third-party links</h2>
          <p>
            We may link to websites we do not operate. We are not responsible
            for their content, availability, privacy practices, or services.
          </p>
        </div>

        <div className="legal-section">
          <h2>8. Disclaimers and liability</h2>
          <p>
            The site is provided “as is” and “as available” without warranties
            of any kind to the fullest extent permitted by law. To that same
            extent, Equal Horizons and its founders will not be liable for
            indirect, incidental, special, consequential, or punitive damages
            arising from use of, or inability to use, this site.
          </p>
        </div>

        <div className="legal-section">
          <h2>9. Changes</h2>
          <p>
            We may update the site or these terms as the initiative develops.
            The date above shows when these terms were last revised. Continued
            use after an update means you accept the revised terms.
          </p>
        </div>

        <div className="legal-section">
          <h2>10. Contact</h2>
          <p>
            Questions about these terms can be sent through our{" "}
            <Link href="/contact">contact page</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
