# Soufiane El Mdari — Engineering Portfolio

Built with [Astro](https://astro.build) and deployed via GitHub Pages.

## Setup

```bash
npm install
npm run dev        # local dev at localhost:4321
```

## Adding a new project

1. Create a new file in `content/projects/your-project-name.mdx`
2. Copy the frontmatter from `example-project.mdx` and fill in your details
3. Add your thumbnail image to `public/images/projects/your-project-name/`
4. Write your project write-up in Markdown below the frontmatter
5. Push to main — GitHub Actions deploys automatically

## Frontmatter fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Project name |
| `summary` | string | One sentence description (shown on card hover) |
| `thumbnail` | string | Path to thumbnail image (4:3 ratio works best) |
| `date` | string | Format: YYYY-MM |
| `disciplines` | array | e.g. `["FEA", "Structural"]` |
| `processes` | array | e.g. `["Simulation", "Post-processing"]` |
| `tools` | array | e.g. `["ANSYS", "Python"]` |
| `featured` | boolean | Optional, slightly highlights the card |

## Discipline pill colours

These disciplines have dedicated colours: `Hardware`, `Electronics`, `Firmware`,
`Robotics`, `Design`, `FEA`, `Structural`, `Civil`, `Mechanical`, `Software`.

Any other discipline will render with a neutral grey pill.

## Components available in MDX

```mdx
import ImageRow from '../../components/ImageRow.astro';
import ModelViewer from '../../components/ModelViewer.astro';

<ImageRow caption="Optional caption">
  ![Alt text](/images/left.jpg)
  ![Alt text](/images/right.jpg)
</ImageRow>

<ModelViewer src="/models/part.glb" caption="Optional caption" />
```
