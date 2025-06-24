import fs from "fs"
import path from "path"

const TARGET_DIR = path.join(process.cwd(), "src/components/student-sections")
const OLD_IMPORT = "../../../lib/student-data"
const NEW_IMPORT = "../../lib/student-data"

function fixImportInFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8")

  if (content.includes(OLD_IMPORT)) {
    const updated = content.replaceAll(OLD_IMPORT, NEW_IMPORT)
    fs.writeFileSync(filePath, updated, "utf8")
    console.log("✅ Fixed import in:", filePath)
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      walk(fullPath)
    } else if (file.endsWith(".tsx")) {
      fixImportInFile(fullPath)
    }
  }
}

walk(TARGET_DIR)
console.log("\n🚀 Finished fixing broken lib/student-data imports!")
