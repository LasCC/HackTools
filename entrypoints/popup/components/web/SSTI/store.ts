// src/pages/popup/components/web/SSTI/store.ts
import create from "zustand";
import payloads from "../../../../popup/assets/data/Web/SSTI/SSTI.json";

export interface DataType {
	id: number;
	name: string;
	engine: string;
	language: string[];
	required_sp_chars: string[];
	primitive: string;
	description?: string;
	payload: string;
}

export enum TemplateType {
	Jinja = "Jinja",
	Twig = "Twig",
	Thymeleaf = "Thymeleaf",
	Smarty = "smarty",
	//...
}

export enum Language {
	Python = "Python",
	PHP = "PHP",
	Java = "Java",
	Csharp = "C#",
}

interface State {
	templateType: TemplateType | null;
	payloads: string[];
	guessing: boolean;
	potentialTemplateEngine: DetectTemplateResult | null;
	detectTemplate: (
		snippet: string,
		userHints: string[]
	) => DetectTemplateResult;
	setTemplateType: (templateType: TemplateType) => void;
	setGuessing: (guessing: boolean) => void;
	setPotentialTemplateEngine: (
		potentialTemplateEngine: DetectTemplateResult | null
	) => void;
}

const setPotentialTemplateEngine =
	(set) => (potentialTemplateEngine: DetectTemplateResult | null) => {
		set({ potentialTemplateEngine });
	};

interface TemplateEngine {
	regex: RegExp;
	languages: string[];
}

const templateEngines: Record<string, TemplateEngine> = {
	Jinja: { regex: /^({{.*|{%.*|{#.*)$/g, languages: ["Python"] },
	Twig: { regex: /^({{.*|{%.*|{#.*)$/g, languages: ["PHP"] },
	Smarty: { regex: /^({{.*}}|{.*})$/g, languages: ["PHP"] },
	Blade: { regex: /^({{.*|{.*)$/g, languages: ["PHP"] },
	Thymeleaf: { regex: /^(th:.*)$/g, languages: ["Java"] },
	Razor: { regex: /^(@.*)$/g, languages: ["C#"] },
	Groovy: { regex: /^(\${.*)$/g, languages: ["Java"] },
	Handlebars: { regex: /^({{.*)$/g, languages: ["JavaScript"] },
	Jade: { regex: /^(.*=.*|#{.*)$/g, languages: ["JavaScript"] },
	Mako: { regex: /^(\${.*|<%)$/g, languages: ["Python"] },
	Spring: { regex: /^(\*{T\(.*|\*{.*)$/g, languages: ["Java"] },
};

interface DetectTemplateResult {
	[key: string]: {
		confidence: number;
		languages: string[];
	};
}

/**
 * This function is used to detect the template engine used in a given code snippet.
 * It uses regular expressions to match the syntax of different template engines.
 * The function also takes into account user hints about the possible languages used in the snippet.
 *
 * @param {string} snippet - The code snippet in which to detect the template engine.
 * @param {string[]} userHints - An array of user-provided hints about the possible languages used in the snippet.
 *
 * @returns {Record<string, number>} - An object where the keys are the names of the template engines and the values are the confidence scores (in percentage) of the engine being used in the snippet.
 */
function detectTemplate(
	snippet: string,
	userHints: string[]
): DetectTemplateResult {
	const results = {};
	let totalMatches = 0;

	for (const [engine, { regex, languages }] of Object.entries(
		templateEngines
	)) {
		if (
			userHints.length === 0 ||
			userHints.some((hint) => languages.includes(hint))
		) {
			const matches = snippet.match(regex);
			const matchCount = matches ? matches.length : 0;
			totalMatches += matchCount;
			results[engine] = { matchCount, languages };
		}
	}

	// Calculate confidence based on the number of matches for each engine
	for (const engine in results) {
		const { matchCount, languages } = results[engine];
		const confidence =
			totalMatches > 0 ? Math.round((matchCount / totalMatches) * 100) : 0;
		results[engine] = { confidence, languages };
	}

	return Object.entries(results)
		.filter(
			([, { confidence }]: [string, { confidence: number }]) => confidence > 0
		)
		.sort(
			(
				[, { confidence: a }]: [string, { confidence: number }],
				[, { confidence: b }]: [string, { confidence: number }]
			) => b - a
		)
		.reduce((obj, [key, val]: [string, any]) => ({ ...obj, [key]: val }), {});
}

const setTemplateType = (set) => (templateType: TemplateType) => {
	set({ templateType });
};

const setGuessing = (set) => (guessing: boolean) => {
	set({ guessing });
};

export const useTemplateStore = create<State>((set) => ({
	templateType: null,
	payloads: [],
	guessing: true,
	potentialTemplateEngine: null,
	detectTemplate: (snippet: string, userHints: string[]) => {
		const results = detectTemplate(snippet, userHints);
		setPotentialTemplateEngine(set)(results);
		return results;
	},
	setTemplateType: setTemplateType(set),
	setGuessing: setGuessing(set),
	setPotentialTemplateEngine: setPotentialTemplateEngine(set),
}));
