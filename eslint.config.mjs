import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 12,
      sourceType: 'module',
    },
    rules: {
      indent: ['error', 2], // Indentação de 2 espaços
      quotes: ['error', 'single'], // Uso de aspas simples
      semi: ['error', 'always'], // Sempre usar ponto e vírgula
      eqeqeq: ['error', 'always'], // Usar sempre === e !== ao invés de == e !=
      'no-console': 'warn', // Avisar sobre uso de console.log

      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Não permitir variáveis não utilizadas
      curly: ['error', 'all'], // Forçar o uso de chaves em todos os blocos

      'brace-style': ['error', '1tbs', { allowSingleLine: true }], // Estilo de chaves em uma linha
      'comma-dangle': ['error', 'always-multiline'], // Sempre usar vírgula no final de listas
      'no-trailing-spaces': 'error', // Remover espaços em branco no final de linhas
      'space-before-blocks': ['error', 'always'], // Forçar espaço antes de abrir chaves

      'keyword-spacing': ['error', { before: true, after: true }], // Espaço antes e depois de palavras-chave
      'space-infix-ops': 'error', // Espaço ao redor de operadores
      'space-in-parens': ['error', 'never'], // Não permitir espaços dentro de parênteses

      'array-bracket-spacing': ['error', 'never'], // Não permitir espaços dentro de colchetes de array
      'object-curly-spacing': ['error', 'always'], // Exigir espaços dentro de chaves de objetos
      'eol-last': ['error', 'always'], // Garantir uma linha em branco ao final dos arquivos

      'no-multiple-empty-lines': ['error', { max: 1 }], // Limitar múltiplas linhas vazias consecutivas
      'prefer-const': 'error', // Preferir const ao invés de let, quando possível
      'no-var': 'error', // Não permitir o uso de var, preferir let ou const

      'arrow-spacing': ['error', { before: true, after: true }], // Espaçamento ao redor de setas em funções
      'no-duplicate-imports': 'error', // Não permitir imports duplicados

      'no-underscore-dangle': ['error', { allowAfterThis: true }], // Não permitir uso de sublinhados no início/fim de variáveis
      'func-names': ['warn', 'as-needed'], // Forçar nome de funções apenas quando necessário

      // 'max-len': ['error', { 'code': 100 }], // Limitar o comprimento de linhas de código a 100 caracteres
      'no-mixed-operators': 'error', // Evitar operadores misturados sem parênteses
      'consistent-return': 'error', // Garantir retornos consistentes em funções
      'default-case': 'error', // Exigir o uso de default nos switch cases
      'dot-notation': ['error', { allowKeywords: true }], // Preferir a notação de ponto ao acessar propriedades
      yoda: ['error', 'never'], // Desativar condições "Yoda"
      camelcase: ['error', { properties: 'never' }], // Forçar o uso de camelCase
    },
  },
  pluginJs.configs.recommended,
];
