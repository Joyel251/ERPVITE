import fs from 'fs'
import path from 'path'

const IMPORT_REGEX = /import(?:["'\s]*[\w*{}\n, ]+from\s*)?["'\s]([^"']+)["'\s];?/g

const SRC_DIR = path.join(process.cwd(), 'src')
const thirdPartyDeps = new Set()

function scanFiles(dir) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      scanFiles(fullPath)
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf-8')
      const matches = content.matchAll(IMPORT_REGEX)

      for (const match of matches) {
        const dep = match[1]
        if (
          !dep.startsWith('.') && // ignore local files
          !dep.startsWith('@/') && // ignore alias
          !dep.startsWith('types/') && // ignore type-only
          !dep.startsWith('react-dom/client') // internal alias
        ) {
          const rootDep = dep.split('/')[0].startsWith('@')
            ? dep.split('/').slice(0, 2).join('/')
            : dep.split('/')[0]
          thirdPartyDeps.add(rootDep)
        }
      }
    }
  }
}

scanFiles(SRC_DIR)

console.log('\n🔍 Suggested Dependencies:')
thirdPartyDeps.forEach(dep => console.log('→', dep))
console.log('\n✅ Run this to install them:\n')
console.log('npm install ' + Array.from(thirdPartyDeps).join(' '))
