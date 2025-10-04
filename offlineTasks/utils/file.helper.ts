import fs from 'fs'
import path from 'path'

export function saveFile(subfolder: string, filename: string, content: string) {
    const folder = path.join(__dirname, '..', subfolder)

    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true })
    }

    const filePath = path.join(folder, filename)
    fs.writeFileSync(filePath, content)

    console.log(`\n ✅ >>> Saved file: ${filePath}`)
}

export function loadFile(subfolder: string, filename: string): string {
    const folder = path.join(__dirname, '..', subfolder)
    const filePath = path.join(folder, filename)

    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`)
    }

    const content = fs.readFileSync(filePath, 'utf8').trim()
    console.log(`>>> Loaded file: ${filePath}`)
    return content
}
