import * as esbuild from 'esbuild';
import * as fs from 'fs-extra';
import * as path from 'path';

const lambdasDir = path.resolve(__dirname, 'src', 'lambdas');
const buildDir = path.resolve(__dirname, 'build', 'lambdas');

async function buildAllLambdas() {
    const functions = fs.readdirSync(lambdasDir);

    await Promise.all(functions.map(async (func) => {
        const funcPath = path.join(lambdasDir, func);

        if (fs.existsSync(path.join(funcPath, 'handler.ts'))) {
            await esbuild.build({
                entryPoints: [path.join(funcPath, 'handler.ts')],
                bundle: true,
                platform: 'node',
                target: 'node20',
                outdir: path.join(buildDir, func),
                sourcemap: true,
                minify: true,
                external: [],
                loader: {
                    '.test.ts': 'empty'
                }
            });
            console.log(`✅ Built ${func}`);
        }
    }));
}

buildAllLambdas().catch((err) => {
    console.error(err);
    process.exit(1);
});
