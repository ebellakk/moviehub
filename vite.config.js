import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the
    // `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), '');
    return {
        // https://github.com/vitejs/vite/issues/1973#issuecomment-787571499
        assetsInclude: ['**/*.jpg', '**/*.svg'],
        define: {
            __APP_ENV__: JSON.stringify(env.APP_ENV),
        },
        build: {
            outDir: 'build',
        },
        plugins: [react()],
    };
});