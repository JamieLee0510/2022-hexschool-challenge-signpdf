module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        jest: true,
        // 沒有node是因為這個react 專案是在Browser中進行
        // 但如果用node，就可以讓該文件(.eslintrc.js)可以 module.exports
        node: true,
    },
    extends: [
        // 安裝語法(npm 5+) npx install-peerdeps --dev eslint-config-airbnb
        'airbnb',
        // 因為airbnb而自動安裝的依賴
        'plugin:jsx-a11y/recommended',

        // for unit test library
        'plugin:testing-library/react',
        'plugin:jest-dom/recommended',

        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    overrides: [
        {
            files: ['*.ts', '*.tsx', '*.d.ts'], // Your TypeScript files extension

            // // As mentioned in the comments, you should extend TypeScript plugins here,
            // // instead of extending them outside the `overrides`.
            // // If you don't want to extend any rules, you don't need an `extends` attribute.
            // extends: [
            //     'plugin:@typescript-eslint/recommended',
            //     'plugin:@typescript-eslint/recommended-requiring-type-checking',
            // ],

            parserOptions: {
                ecmaVersion: 2018,
                sourceType: 'module',
                // 用來定義希望使用語言中哪些額外的功能
                ecmaFeatures: {
                    jsx: true,
                },
                tsconfigRootDir: __dirname,
                parser: '@typescript-eslint/parser',
                project: './tsconfig.json',
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'react-hooks',
        'jsx-a11y',
        'simple-import-sort',
        // for test library
        'jest-dom',
        'testing-library',

        'prettier',
    ],
    rules: {
        // react label htmlFor input id
        'jsx-a11y/label-has-associated-control': [
            'error',
            {
                required: {
                    some: ['nesting', 'id'],
                },
            },
        ],
        'jsx-a11y/label-has-for': [
            'error',
            {
                required: {
                    some: ['nesting', 'id'],
                },
            },
        ],
        // 還沒有npm install 過的dependency，不能import
        //  0=off, 1=warn, 2=error. Defaults to 0.
        'import/no-extraneous-dependencies': [2, { devDependencies: true }],
        // 在unit test 中，要正確使用await/async和findBy
        'testing-library/await-async-query': 'error',
        'testing-library/no-await-sync-query': 'error',
        // 好像要升級成 testing-library/no-debugging-utils
        'testing-library/no-debugging-utils': 'warn',
        // input-check在測試時"orr，使用 expect(element).toBeChecked()｜｜expect(element).not.toBeChecked();;
        // 而不是  expect(element)。toHaveProperty('checked', true|false)
        // 下面都是測試規則
        'jest-dom/prefer-checked': 'error',
        'jest-dom/prefer-enabled-disabled': 'error',
        'jest-dom/prefer-required': 'error',
        'jest-dom/prefer-to-have-attribute': 'error',
        // 這個不太懂，為啥要關掉 propType？？
        'react/prop-types': ['off'],
        // allow jsx in js
        'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
        // import 時的副檔名，會去除掉。因此同個folder下，不要重名
        'import/extensions': [
            'error',
            'never',
            {
                scss: 'always',
                png: 'always',
            },
        ],

        // single export的規則，0== 也沒差
        'import/prefer-default-export': 0,
        // export空的規則，0==沒差
        'import/no-anonymous-default-export': 0,
        // 這個好像是node環境才會需要設置的
        'import/no-unresolved': 0,
        // sort import related rule
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'sort-imports': 'off',
        'import/order': 'off',

        // 禁止先使用變量後聲明該變量，但off掉了
        'no-use-before-define': 'off',
        // 是ts在no-shadow規則的延伸，但其實不太清楚（？
        // 禁止聲明變量覆蓋外層變量，但off掉了,所以可以用let來覆蓋
        // Note: you must disable the base rule as it can report incorrect errors
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        // 可以透過comment豁免Typescript的類型檢查
        '@typescript-eslint/ban-ts-comment': 0,
        // 禁止在Typescript中用any
        '@typescript-eslint/no-explicit-any': 'error',
        // 基於foo?.a?.b?.c的規則
        '@typescript-eslint/prefer-optional-chain': 'warn',
        // 基於const a: string = 'str'---warning
        '@typescript-eslint/no-inferrable-types': 'warn',
        // 可能為null的操作，like ()=> foo ?? 'a string';
        '@typescript-eslint/prefer-nullish-coalescing': 'warn',
        // react hook eslint
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        // 禁止key=index 的rule，但目前把它off
        'react/no-array-index-key': 'off',
        // disallow missing React when using JSX, but off
        'react/react-in-jsx-scope': 'off',
        // 換行符的設置，windows默認為CRLF，但mac/linux默認為LF，
        // 使用 endOfLine: 'auto'，不讓prettier檢測文件每行結束的格式
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
        // jsx 的換行規則，like allow or not <App>Hello</App>
        'react/jsx-one-expression-per-line': 'off',
        // jsx 中的換行規則，{}裡的檢查
        'react/jsx-curly-newline': 'off',
        // 提醒不要修改參數的入參，但由於state就是要修改的（如vuex、redux）
        // 所以就用白名單的方式l來修改
        'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
    },
    // 解析專案中的.js .jsx .ts .tsx
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                paths: ['src'],
            },
        },
    },
}
