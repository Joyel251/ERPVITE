import fs from 'fs'
import path from 'path'

const TARGET_DIR = path.join(process.cwd(), 'src/components/ui')
const OLD_FRAGMENT = '../../student-sections'
const NEW_FRAGMENT = '../../ui'

function fixImportsInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  if (content.includes(OLD_FRAGMENT)) {
    const updated = content.replaceAll(OLD_FRAGMENT, NEW_FRAGMENT)
    fs.writeFileSync(filePath, updated, 'utf-8')
    console.log(`✅ Fixed: ${filePath}`)
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      walkDir(fullPath)
    } else if (file.endsWith('.tsx')) {
      fixImportsInFile(fullPath)
    }
  }
}

walkDir(TARGET_DIR)
console.log('\n🚀 Done fixing student-section imports in UI components!')
