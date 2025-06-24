// remove-duplicate-imports.js

import fs from "fs"
import path from "path"

const SRC_DIR = path.join(process.cwd(), "src")

function removeDuplicateImports(filePath) {
  const content = fs.readFileSync(filePath, "utf8")
  const lines = content.split("\n")

  const seenImports = new Map()
  const cleanedLines = []

  for (const line of lines) {
    const trimmed = line.trim()

    // Only consider import lines
    if (trimmed.startsWith("import")) {
      const match = trimmed.match(/from\s+["']([^"']+)["']/)
      if (match) {
        const importPath = match[1]
        if (seenImports.has(importPath)) {
          continue // Skip duplicate
        }
        seenImports.set(importPath, true)
      }
    }

    cleanedLines.push(line)
  }

  fs.writeFileSync(filePath, cleanedLines.join("\n"), "utf8")
  console.log("✅ Cleaned:", filePath)
}

function walk(dir) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      walk(fullPath)
    } else if (file.endsWith(".tsx")) {
      removeDuplicateImports(fullPath)
    }
  }
}

walk(SRC_DIR)
console.log("\n🚀 All done! Duplicate imports removed.")
