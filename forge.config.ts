import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';
import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [new MakerSquirrel({}), new MakerZIP({}, ['darwin']), new MakerRpm({}), new MakerDeb({})],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      devContentSecurityPolicy: `img-src * self 'unsafe-inline' blob: data: gap:;`,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/view/login/index.html',
            js: './src/view/login/renderer.ts',
            name: 'login',
            preload: {
              js: './src/preload.ts',
            },
          },
          {
            html: './src/view/estoque/index.html',
            js: './src/view/estoque/renderer.ts',
            name: 'estoque',
            preload: {
              js: './src/preload.ts',
            },
          },
          {
            html: './src/view/producao/index.html',
            js: './src/view/producao/renderer.ts',
            name: 'producao',
            preload: {
              js: './src/preload.ts',
            },
          },
          {
            html: './src/view/index/index.html',
            js: './src/view/index/renderer.ts',
            name: 'Index',
            preload: {
              js: './src/preload.ts',
            },
          },
          {
            html: './src/view/inspecao/index.html',
            js: './src/view/inspecao/renderer.ts',
            name: 'inspecao',
            preload: {
              js: './src/preload.ts',
            },
          },
          {
            html: './src/view/funcionarios/index.html',
            js: './src/view/funcionarios/renderer.ts',
            name: 'funcionarios',
            preload: {
              js: './src/preload.ts',
            },
          }
        ],
      },
    }),
    
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
