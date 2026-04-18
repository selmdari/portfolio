import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';

// ── Helpers used by the dev-splat-tool write API ──────────────────────────────

function serializeAnnotations(annotations) {
  if (!annotations.length) return '';
  const items = annotations
    .map(a => {
      const pos = a.position.map(v => Number(v).toFixed(2)).join(', ');
      return `  - position: [${pos}]\n    label: "${a.label}"`;
    })
    .join('\n');
  return `splatAnnotations:\n${items}`;
}

function updateFrontmatter(fileContent, annotations) {
  const fmMatch = fileContent.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) throw new Error('No YAML frontmatter found in file');

  const originalFm = fmMatch[1];

  // Remove existing splatAnnotations block (key + all indented continuation lines)
  const cleaned = originalFm
    .replace(/^splatAnnotations:[^\n]*(?:\n[ \t]+[^\n]*)*/m, '')
    .replace(/\n{2,}/g, '\n')
    .trim();

  const annotationsYaml = serializeAnnotations(annotations);
  const newFm = annotationsYaml ? `${cleaned}\n${annotationsYaml}` : cleaned;

  // Reconstruct: new header + everything after the original closing ---
  return `---\n${newFm}\n---` + fileContent.slice(fmMatch[0].length);
}

// ─────────────────────────────────────────────────────────────────────────────

export default defineConfig({
  site: 'https://selmdari.github.io',
  base: '/portfolio',
  integrations: [mdx()],
  vite: {
    plugins: [
      {
        name: 'splat-annotations-api',
        // Only active during `astro dev` — not included in production builds
        configureServer(server) {
          server.middlewares.use('/dev-api/annotations', (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.end('Method Not Allowed');
              return;
            }

            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => {
              res.setHeader('Content-Type', 'application/json');
              try {
                const { slug, annotations } = JSON.parse(body);
                const contentDir = resolve(process.cwd(), 'content/projects');

                // Try .mdx first, then .md
                let filePath = join(contentDir, `${slug}.mdx`);
                try { await readFile(filePath); } catch {
                  filePath = join(contentDir, `${slug}.md`);
                }

                const original = await readFile(filePath, 'utf-8');
                const updated = updateFrontmatter(original, annotations);
                await writeFile(filePath, updated, 'utf-8');

                res.end(JSON.stringify({ ok: true }));
              } catch (err) {
                res.statusCode = 500;
                res.end(JSON.stringify({ ok: false, error: String(err) }));
              }
            });
          });
        },
      },
    ],
  },
});
