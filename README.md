# Equal Horizons

The website for **Equal Horizons**, a student-founded, early-stage initiative focused on making assistive technology more affordable and accessible.

Built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion, ready to deploy on Vercel.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for styling
- **Framer Motion** for scroll-linked storytelling, sticky scene transitions, parallax, and micro-interactions
- **Resend** for the contact form's transactional email
- **lucide-react** for lightweight, consistent iconography
- Fonts: **Sora** (headings) and **Inter** (body), loaded via `next/font/google`

## Project structure

```
app/
  page.tsx                 Home
  about/                    About
  vision/                   Vision
  get-involved/              Get Involved
  contact/                   Contact
  api/contact/route.ts       Contact form email API (Resend)
  layout.tsx                 Root layout, fonts, metadata
  globals.css                 Global styles & design tokens
components/                  Navbar, Footer, form, animated visual, scroll storytelling
lib/motion.ts                 Shared Framer Motion variants
```

## Getting started locally

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   Copy the example file and fill in your own values:

   ```bash
   cp .env.example .env.local
   ```

   ```
   RESEND_API_KEY=re_your_api_key_here
   CONTACT_TO_EMAIL=hello@equalhorizons.org
   CONTACT_FROM_EMAIL=contact@equalhorizons.org
   ```

3. **Run the dev server**

   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000).

## Setting up Resend (for the contact form)

The contact form at `/contact` posts to `app/api/contact/route.ts`, which sends an email through [Resend](https://resend.com).

1. Create a free Resend account at [resend.com](https://resend.com).
2. Under **API Keys**, create a new key and copy it into `RESEND_API_KEY`.
3. Under **Domains**, add and verify the domain you want to send from (DNS records provided by Resend). Once verified, set `CONTACT_FROM_EMAIL` to an address on that domain, e.g. `contact@yourdomain.org`.
   - While testing, you can also use Resend's default `onboarding@resend.dev` sender before your domain is verified.
4. Set `CONTACT_TO_EMAIL` to the inbox that should receive form submissions.
5. Restart the dev server after changing `.env.local`.

The email subject line is always `New Equal Horizons Contact: [Reason]`, and the body includes the sender's name, email, organization (if provided), reason, message, and a UTC timestamp. Replies go directly to the sender's email address.

The form also includes a hidden honeypot field (`company_website`) — legitimate users never see or fill it, so any submission with that field populated is silently discarded as spam.

## Deploying on Vercel

1. Push this project to a GitHub/GitLab/Bitbucket repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. In **Project Settings → Environment Variables**, add:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL`
4. Deploy. Vercel will automatically detect the Next.js App Router project and configure the build.
5. Once live, verify the contact form end-to-end by submitting a test message.

## Content & scope notes

This site intentionally reflects Equal Horizons' current, early stage:

- No login, signup, or dashboards — there's no product to log into yet.
- No claims of launched products; the Vision page clearly labels every future direction as **in development**, **exploring**, or **future direction**.
- No fabricated user counts, testimonials, or metrics.
- No tax-deductibility or 501(c)(3) claims — update this copy only once that status is legally confirmed.

## Accessibility

- Semantic HTML landmarks (`header`, `nav`, `main`, `footer`) throughout.
- Visible focus rings on all interactive elements (`:focus-visible`).
- Form fields use associated `<label>`s and the submission status region uses `aria-live="polite"`.
- All decorative motion respects `prefers-reduced-motion`.

## Animated design preview

The redesign includes an original cel-shaded horizon environment rather than a stock image or prebuilt 3D scene.

- Open `preview/index.html` to review the standalone animated composition.
- Desktop and mobile captures are in `preview/screenshots/`.
- Motion previews are in `preview/video/`.
- The reusable animated artwork lives at `public/horizon-scene.svg`.
- The React parallax wrapper lives at `components/AnimeHorizonScene.tsx`.

The hero responds to pointer movement and page scroll, uses separate cloud/flower/tree/orbit/petal animation loops, and respects `prefers-reduced-motion`.

The homepage also includes a fixed page-progress line, a sticky four-stage process scene whose sun, clouds, route, island, orbit, and flower evolve with scroll position, plus scroll-linked project entrances. No technology-stack checklist, emoji feature list, or template-style “what makes us different” block appears in the public interface.
