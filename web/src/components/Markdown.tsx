import React from 'react';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

export type Props = {
  /** Preferred prop */
  markdown?: string;
  /** Legacy alias used by pages like RequirementDetail/WikiBrowser */
  text?: string;
};

export default function Markdown({ markdown, text }: Props) {
  const source = markdown ?? text ?? '';
  const [html, setHtml] = React.useState<string>('');

  React.useEffect(() => {
    let alive = true;
    (async () => {
      const file = await remark().use(remarkHtml).process(source);
      if (alive) setHtml(String(file));
    })();
    return () => {
      alive = false;
    };
  }, [source]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
