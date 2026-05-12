// Pre-launch gate. Default is `true`; flip to false at launch by setting
// NEXT_PUBLIC_PRE_LAUNCH=false in Cloudflare Pages env vars and redeploying.
// Hero-level LinkedIn Follow CTA is gated on this flag; footer Follow stays
// always-on.
export const PRE_LAUNCH = process.env.NEXT_PUBLIC_PRE_LAUNCH !== 'false';
