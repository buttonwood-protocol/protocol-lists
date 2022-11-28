const fs = require('fs/promises')
const path = require('path')

const rootPath = path.join(__dirname, '..')

async function main () {
  await fs.copyFile(
    path.join(rootPath, 'src', 'protocol-list.schema.json'),
    path.join(rootPath, 'dist', 'protocol-list.schema.json'),
  )
}

main().catch(console.error)
