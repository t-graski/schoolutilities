import { defineConfig } from 'orval';

export default defineConfig({
    schoolutilities: {
        output: {
            mode: 'tags-split',
            target: '../frontend/schoolutilities.ts',
            schemas: 'src/model',
            client: 'react-query',
            mock: true,
        },
        input: {
            target: './swagger.json',
        },
        hooks: {
            afterAllFilesWrite: 'prettier --write',
        },
    },
});