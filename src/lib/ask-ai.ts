import { SITE, tagline } from "./site.ts";

/**
 * "Ask AI about us": four prefilled prompts, as four plain anchors.
 *
 * Same mechanism as any other footer link: a query string, no script, no embed,
 * and nothing leaves the reader's browser until they click.
 *
 * The prompt is generated from `tagline` (the `llms.txt` blockquote) so this
 * row cannot assert something the site does not already say.
 */

export interface AskAiService {
  readonly label: string;
  readonly base: string;
  /**
   * Query parameter carrying the prompt. Three take `q`; Grok takes `text`.
   * The wrong name still produces a working link to an empty chat.
   */
  readonly param: string;
}

export const askAiServices: readonly AskAiService[] = [
  { label: "ChatGPT", base: "https://chatgpt.com/", param: "q" },
  { label: "Claude", base: "https://claude.ai/new", param: "q" },
  { label: "Perplexity", base: "https://www.perplexity.ai/", param: "q" },
  { label: "Grok", base: "https://x.com/i/grok", param: "text" },
];

/**
 * Deliberately short. Everything past the first paragraph is better delivered
 * by the model fetching `llms.txt` than by pasting the site into a URL.
 */
export function askAiPrompt(site: URL | string = SITE): string {
  const origin = new URL("/", site);
  const index = new URL("/llms.txt", origin).href;
  const ask =
    `Read ${index}, the project's own index of its website with a markdown version of every ` +
    "page, and then tell me what openpreflight actually does, who it is built for, and how its " +
    "approach differs from GitHub Actions or a conventional CI platform. Be " +
    "specific about what the site claims and what it does not, and cite the pages you used.";

  return [
    `Here is how openpreflight (${origin.href}) describes itself:`,
    tagline,
    ask,
  ].join("\n\n");
}

export function askAiHref(service: AskAiService, prompt: string): string {
  const url = new URL(service.base);
  url.searchParams.set(service.param, prompt);
  return url.href;
}

const prompt = askAiPrompt();

export const askAiLinks = askAiServices.map((service) => ({
  label: service.label,
  href: askAiHref(service, prompt),
}));
