module.exports = {
  extends: [
    'next/core-web-vitals',
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  //For all files (except when overriding)
  rules: {
    'max-len': [
      'error',
      {
        code: 150,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'object-curly-spacing': ['error', 'always'],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    'comma-dangle': ['off', 'always-multiline'],
    'no-tabs': 'off',
    'space-infix-ops': ['error'],
    eqeqeq: ['error', 'smart'],
    'max-lines': ['error', 300],
    'max-lines-per-function': [
      'error',
      {
        max: 40,
      },
    ],
    'max-statements': ['off', 10],
    'max-depth': ['error', 2],
    'max-nested-callbacks': ['error', 3],
    complexity: [
      'error',
      {
        max: 10,
      },
    ],
    'max-params': ['error', 3],
    'import/first': 'error',
    'import/no-self-import': 'error',
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'arrow-parens': ['error', 'always'],
    'no-shadow': 'error',
    'no-console': 'off',
    'no-namespace': 'off',
    'no-empty-function': 'off',
    'guard-for-in': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off',
  },
  //For *.ts, tsx files
  overrides: [
    {
      files: ['**/*.{ts, tsx}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/ban-types': [
          'error',
          {
            types: {
              String: {
                message: 'Use string instead',
                fixWith: 'string',
              },
              Boolean: {
                message: 'Use boolean instead',
                fixWith: 'boolean',
              },
              Number: {
                message: 'Use number instead',
                fixWith: 'number',
              },
              Symbol: {
                message: 'Use symbol instead',
                fixWith: 'symbol',
              },
              Function: {
                message:
                  'The `Function` type accepts any function-like value\nIt provides no type safety when calling the function, which can be a common source of bugs\nIt also accepts things like class declaration, which will throw at runtime as the will not be called with `new`\nIf you are expecting the function to accept certain arguments, you should explicitly define the function shape',
              },
              Object: {
                message:
                  "The `Object` type actually means 'any non-nullish value', so it is marginally better than `unknown`\n If you want a type meaning 'any object', you probably want `Record<string, unknown> instead.\nIf you want a type meaning 'any value', you probably want `unknown` instead",
              },
              '{}': {
                message:
                  "`{}` actually means 'any non-nullish value'\nIf you want a type meaning 'any object', you probably want `Record<string, unknown> instead.\nIf you want a type meaning 'any value', you probably want `unknown` instead",
              },
            },
            extendDefaults: false,
          },
        ],
        '@typescript-eslint/type-annotation-spacing': [
          'error',
          {
            before: false,
            after: true,
            overrides: {
              arrow: {
                before: true,
                after: true,
              },
            },
          },
        ],
        semi: ['error', 'always'],
        indent: 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
          },
        ],
        'no-invalid-this': 'off',
        '@typescript-eslint/no-invalid-this': ['error'],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-empty-functions': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        // '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'variableLike',
            format: ['camelCase', 'PascalCase'],
          },
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          },
          {
            selector: 'parameter',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
          {
            selector: 'memberLike',
            modifiers: ['private'],
            format: ['camelCase'],
            leadingUnderscore: 'require',
          },
          {
            selector: 'variable',
            types: ['boolean'],
            format: ['camelCase'],
            prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
          },
          {
            selector: 'typeParameter',
            format: ['PascalCase'],
            prefix: ['T'],
          },
          {
            selector: 'interface',
            format: ['PascalCase'],
            custom: {
              regex: '^I[A-Z]',
              match: true,
            },
          },
        ],
        '@typescript-eslint/member-delimiter-style': [
          'off',
          {
            multiline: {
              delimiter: 'comma',
              requireLast: true,
            },
            singleLine: {
              delimiter: 'comma',
              requireLast: true,
            },
            overrides: {
              interface: {
                multiline: {
                  delimiter: 'semi',
                  requireLast: true,
                },
              },
            },
          },
        ],
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          {
            accessibility: 'explicit',
            overrides: {
              constructors: 'no-public',
            },
          },
        ],
      },
    },
    {
      files: ['**/*.tsx'],
      rules: {
        'max-lines': 'off',
        'max-lines-per-function': 'off',
      },
    },
    {
      files: ['**/*.test.{ts, tsx}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        project: './tsconfig.json',
      },
      rules: {
        'max-lines': 'off',
        'max-lines-per-function': 'off',
        'max-depth': 'off',
        'max-nested-callbacks': 'off',
        'no-console': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/naming-convention': 'off',
      },
    },
  ],
};
