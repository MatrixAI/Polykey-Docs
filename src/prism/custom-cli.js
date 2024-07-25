import { Prism } from 'prism-react-renderer';

Prism.languages.pkcli = {
  comment: {
    pattern: /#.*/,
    greedy: true,
  },
  keyword:
    /\b(?:vaults|create|list|delete|log|rename|list|-h|secrets|get|update|agent|start|status|stop|identities|authenticate|stat)\b/,
  command: {
    pattern: /(^\s*|\s+)(polykey)(?=\s|$)/,
    lookbehind: true,
  },
  parameter: {
    pattern: /--?\w+/,
    alias: 'operator',
  },
  string: {
    pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
    greedy: true,
  },
  function: {
    pattern: /\b\w+(?=\()/,
    alias: 'function',
  },
  number: {
    pattern: /\b\d+(?:\.\d+)?\b/,
    alias: 'number',
  },
};
