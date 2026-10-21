import OssMarkdown from './OssMarkdown';
import { DocHeader, SourceNote } from './DocChrome';
import { getProject, source, PROJECT_DOCS, type ProjectSlug } from '@/lib/oss-docs';

const P = '/preview';

/**
 * One template for the repository's own project documents. Rendered verbatim:
 * the site must never carry a paraphrase of a policy that could drift from the
 * file it summarizes.
 */
export default function ProjectDocPage({ slug, preface }: { slug: ProjectSlug; preface?: React.ReactNode }) {
  const d = getProject(slug);
  const { commit } = source();
  const file = PROJECT_DOCS[slug].file;
  return (
    <div className="oss-wrap py-12">
      <article className="mx-auto max-w-[780px]">
        <DocHeader crumbs={[['Project', `${P}/build/`], [d.title]]} file={file} commit={commit} />
        {preface && <div className="mt-8">{preface}</div>}
        <div className="mt-8">
          {d.plain ? (
            <>
              <h1 className="oss-h2 mb-6">License</h1>
              <p className="oss-body mb-6">
                Clawless Computer is licensed under the GNU Affero General Public License, version 3. The full text of the license follows.
              </p>
              <pre className="oss-pre !whitespace-pre-wrap !text-[0.8rem] !leading-[1.65]">{d.body}</pre>
            </>
          ) : (
            <OssMarkdown source={d.body} />
          )}
        </div>
        <SourceNote file={file} />
      </article>
    </div>
  );
}
