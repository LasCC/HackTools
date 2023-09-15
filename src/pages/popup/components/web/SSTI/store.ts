// src/pages/popup/components/web/SSTI/store.ts
import create from 'zustand';
import payloads from '../../../../popup/assets/data/Web/SSTI/SSTI.json';



export interface DataType {
  id: number;
  name: string;
  engine: string;
  language: string[];
  required_charsets: string[];
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
}

interface State {
  templateType: TemplateType | null,
  payloads: string[],
  guessing: boolean,
  detectTemplate: (snippet: string, userHints: string[]) => Record<string, number>,
  setTemplateType: (templateType: TemplateType) => void,
  setGuessing: (guessing: boolean) => void,
}


interface TemplateEngine {
  regex: RegExp;
  languages: string[];
}

const templateEngines: Record<string, TemplateEngine> = {
  Jinja: { regex: /^({{.*}}|{%.*%}|{#.*#})$/g, languages: ['Python'] },
  Twig: { regex: /^({{.*}}|{%.*%}|{#.*#})$/g, languages: ['PHP'] },
  Smarty: { regex: /^({{.*}}|{.*})$/g, languages: ['PHP'] },
  Blade: { regex: /^({{.*}}|{.*})$/g, languages: ['PHP'] },
  Thymeleaf: { regex: /^(th:.*)$/g, languages: ['Java'] },
};

function detectTemplate(snippet: string, userHints: string[]) {
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
  
  const results = {};

  for (const [engine, { regex, languages }] of Object.entries(templateEngines)) {
    if (userHints.some(hint => languages.includes(hint))) {
      const matches = snippet.match(regex);
      const matchCount = matches ? matches.length : 0;
      const confidence = matchCount / snippet.length;
      results[engine] = Math.round(confidence * 100);
    }
  }
  return Object.entries(results)
  .filter(([, confidence]: [string, number]) => confidence > 0)
  .sort(([, a]: [string, number], [, b]: [string, number]) => b - a)
  .reduce((obj, [key, val]: [string, number]) => ({ ...obj, [key]: val }), {});
}

const setTemplateType = (set) => (templateType: TemplateType) => {
  set({ templateType });
}

const setGuessing = (set) => (guessing: boolean) => {
  set({ guessing });
}

export const useTemplateStore = create<State>((set) => ({
  templateType: null,
  payloads: [],
  guessing: true,
  detectTemplate,
  setTemplateType: setTemplateType(set),
  setGuessing: setGuessing(set),
}));