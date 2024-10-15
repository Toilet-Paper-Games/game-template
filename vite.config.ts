import react from '@vitejs/plugin-react';
import * as fs from 'fs/promises';
import * as path from 'path';
import { env } from 'process';
import { defineConfig, PluginOption } from 'vite';

async function TPGamesManifestPlugin(): Promise<PluginOption[]> {
  return [
    {
      name: 'transform-file',
      apply: 'build',

      async buildStart() {
        const tpGamesManifest = await fs.readFile(
          path.resolve(__dirname, 'tpgames.json'),
          'utf-8',
        );

        this.emitFile({
          type: 'asset',
          fileName: 'tpgames.json',
          source: tpGamesManifest.replace(/%BASE_URL%/g, env.BASE_URL),
        });
      },
    },
    {
      name: 'custom-server',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.method === 'GET' && req.url === '/tpgames.json') {
            const tpGamesManifest = await fs.readFile(
              path.resolve(__dirname, 'tpgames.json'),
              'utf-8',
            );

            res.setHeader('Content-Type', 'application/json');
            // allow cors for all sites
            res.setHeader('Access-Control-Allow-Origin', '*');

            const forwardedProto = req.headers['x-forwarded-proto'];
            const forwardedHost = req.headers['x-forwarded-host'];

            const originalProto = req.headers['x-original-proto'] ?? 'http';
            const originalHost = req.headers.host;

            if (forwardedProto && forwardedHost) {
              res.end(
                tpGamesManifest.replace(
                  /%BASE_URL%/g,
                  `${forwardedProto}://${forwardedHost}`,
                ),
              );
            } else {
              res.end(
                tpGamesManifest.replace(
                  /%BASE_URL%/g,
                  `${originalProto}://${originalHost}`,
                ),
              );
            }

            return;
          }

          next();
        });
      },
    },
  ];
}

const plugins: PluginOption[] = [
  react({
    jsxImportSource: '@emotion/react',
    babel: {
      plugins: ['@emotion/babel-plugin'],
    },
  }),
  TPGamesManifestPlugin(),
];

// https://vitejs.dev/config/
export default defineConfig({
  appType: 'spa',
  root: './src',
  base: './',
  publicDir: 'public',
  assetsInclude: ['**/*.json'],
  server: {
    host: true,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: false,
    minify: true,
    rollupOptions: {
      input: {
        controller: path.resolve(__dirname, 'src/controller/index.html'),
        hoster: path.resolve(__dirname, 'src/hoster/index.html'),
        main: path.resolve(__dirname, 'src/index.html'),
      },
    },
  },
  plugins,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '#': path.resolve(__dirname, './assets'),
    },
  },
});
