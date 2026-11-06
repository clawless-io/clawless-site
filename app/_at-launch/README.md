# app/_at-launch (not routed)

Next.js treats folders that start with an underscore as private: nothing in
here is served. These pages render the project documents from the source
repository (LICENSE, CLA.md, SECURITY.md, CONTRIBUTING.md, PRIVACY.md), which
is not public until launch, so they are parked here while `PRELAUNCH` is true
(components/oss/content.ts).

Launch day, in the same commit that sets `PRELAUNCH = false`:

    git mv app/_at-launch/license      app/license
    git mv app/_at-launch/cla          app/cla
    git mv app/_at-launch/security     app/security
    git mv app/_at-launch/contributing app/contributing
    git mv app/_at-launch/privacy/app  app/privacy/app
    git rm app/_at-launch/README.md

Then re-run scripts/sync-oss-docs.sh against the release tag, add /docs/ and
/contributing/ to app/sitemap.ts, drop the noindex on /docs, and rebuild.
Nothing outside this folder links to these routes while PRELAUNCH is true.
