# TypescriptStudyBackEnd
nestjs+prisma

git clone https://github.com/koumk/TypescriptStudyBackEnd.git
rm -rf dist/
rm -rf bin/
rm -rf node_modules/
rm -f package-lock.json
npm install
npx prisma generate
npx prisma migrate dev --name init
tsconfig.json
    "outDir": "./dist"
npm run build
npm run start

