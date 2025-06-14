import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the
    // `VITE_` prefix.
    return {
        // https://github.com/vitejs/vite/issues/1973#issuecomment-787571499
        assetsInclude: ['**/*.jpg', '**/*.svg'],
        define: {
            __APP_ENV__: process.env.VITE_VERCEL_ENV,
        },
        build: {
            outDir: 'build',
        },
        plugins: [react()],
    };
});