import fs from 'fs'
import path from 'path'

const SRC_DIR = './src'

// Helper to compute relative import path
function getRelativePath(fromFile, targetPath) {
  const relative = path.relative(path.dirname(fromFile), targetPath)
  return relative.startsWith('.') ? relative : './' + relative
}

// Recursively find all `.ts` and `.tsx` files
function findAllFiles(dir, files = []) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file)
    if (fs.statSync(fullPath).isDirectory()) {
      findAllFiles(fullPath, files)
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      files.push(fullPath)
    }
  })
  return files
}

// Replace @/ with relative path in import statements
function replaceImportsInFile(filePath) {
  let code = fs.readFileSync(filePath, 'utf-8')
  const matches = code.matchAll(/from ['"]@\/([^'"]+)['"]/g)

  for (const match of matches) {
    const importPath = match[1]
    const absoluteTarget = path.join(SRC_DIR, importPath)
    const relativePath = getRelativePath(filePath, absoluteTarget).replace(/\\/g, '/')
    code = code.replace(match[0], `from '${relativePath}'`)
  }

  fs.writeFileSync(filePath, code, 'utf-8')
  console.log(`✔ Fixed imports in: ${filePath}`)
}

// Run the script
const allFiles = findAllFiles(SRC_DIR)
allFiles.forEach(replaceImportsInFile)

console.log('\n✅ All @/ imports replaced with relative paths.')
