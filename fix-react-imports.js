import fs from "fs"
import path from "path"

const PROJECT_DIR = path.join(process.cwd(), "src")

function cleanReactImportsInFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8")
  const lines = content.split("\n")

  const cleanedLines = []
  let seenReactImport = false

  for (const line of lines) {
    const trimmed = line.trim()

    // Match all types of React imports
    const isReactImport =
      trimmed === 'import React from "react"' ||
      trimmed === "import React from 'react'" ||
      trimmed === 'import * as React from "react"' ||
      trimmed === "import * as React from 'react'"

    if (isReactImport) {
      if (!seenReactImport) {
        // Keep the first valid one
        cleanedLines.push('import * as React from "react"')
        seenReactImport = true
      } else {
        // Skip duplicates
        continue
      }
    } else {
      cleanedLines.push(line)
    }
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
      cleanReactImportsInFile(fullPath)
    }
  }
}

walk(PROJECT_DIR)
console.log("\n🚀 Done cleaning duplicate React imports!")
