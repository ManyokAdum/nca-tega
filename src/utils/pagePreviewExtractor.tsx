import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { ReactElement } from 'react';

export interface PagePreviewData {
    title: string;
    excerpt: string;
    url: string;
}

const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

const normalizeText = (text: string) =>
    text.replace(/\s+/g, " ").trim();

const collectTextBlocks = (doc: Document) => {
    // Collect meaningful blocks in natural document order
    const selectors = [
        "main h1",
        "main h2",
        "main h3",
        ".hero h1",
        ".hero h2",
        ".hero p",
        "section h1",
        "section h2",
        "section h3",
        "section p",
        "h1",
        "h2",
        "h3",
        "p",
        "li"
    ];

    const seen = new Set<string>();

    return selectors
        .flatMap(selector => Array.from(doc.querySelectorAll(selector)))
        .map(el => normalizeText(el.textContent || ""))
        .filter(text => {
            const isMeaningful = text.length > 0;
            const isDuplicate = seen.has(text);
            if (isMeaningful && !isDuplicate) {
                seen.add(text);
                return true;
            }
            return false;
        });
};

/**
 * Extracts preview data from a React component by rendering it to static markup.
 * This simulates a "read-only" extraction without full mounting or network navigation.
 */
export const extractPagePreview = (
    Component: React.ComponentType,
    route: string
): PagePreviewData => {
    // 1. Render component to static HTML string
    // Wrap in MemoryRouter because components likely contain <Link> logic which fails without a Router
    const htmlString = renderToStaticMarkup(
        <MemoryRouter>
            <Component />
        </MemoryRouter>
    );

    // 2. Parse the HTML string into a DOM Document
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    // 3. Extract Title
    // Priority: <title> tag -> first <h1> -> route-based fallback
    let title = normalizeText(doc.querySelector("title")?.textContent || "");
    if (!title) {
        title = normalizeText(doc.querySelector("h1")?.textContent || "");
    }
    if (!title) {
        const routeName = route.replace("/", "").replace(/-/g, " ");
        title = routeName
            ? routeName.charAt(0).toUpperCase() + routeName.slice(1)
            : "Overview";
    }

    // 4. Extract Excerpt
    // Collect all meaningful blocks to determine total content length
    const textBlocks = collectTextBlocks(doc);
    const totalLength = textBlocks.reduce((sum, block) => sum + block.length, 0);

    // Aim for ~20% of meaningful content, bounded for UX
    const targetLength = totalLength > 0
        ? clamp(Math.round(totalLength * 0.2), 120, 320)
        : 180;

    let excerpt = "";
    let accumulated = 0;

    for (const block of textBlocks) {
        // Avoid repeating the title as part of the excerpt
        if (block.toLowerCase() === title.toLowerCase()) {
            continue;
        }

        excerpt = excerpt ? `${excerpt} ${block}` : block;
        accumulated += block.length;

        if (accumulated >= targetLength) {
            break;
        }
    }

    // As a fallback, use meta description or body text if we couldn't assemble enough
    if (!excerpt) {
        const metaDesc = doc.querySelector('meta[name="description"]');
        excerpt = normalizeText(
            metaDesc?.getAttribute("content") || doc.body.textContent || ""
        );
    }

    // Final clean-up: enforce soft cap without cutting mid-word
    const MAX_LENGTH = clamp(targetLength + 60, 180, 360);
    if (excerpt.length > MAX_LENGTH) {
        let truncated = excerpt.substring(0, MAX_LENGTH);
        const lastSpace = truncated.lastIndexOf(" ");
        if (lastSpace > 0) {
            truncated = truncated.substring(0, lastSpace);
        }
        excerpt = `${truncated}...`;
    }

    return {
        title: title.trim(),
        excerpt: excerpt.trim(),
        url: route
    };
};
