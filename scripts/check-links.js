const fs = require('fs');
const path = require('path');

function findMdFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    // Skip dependency, tooling, VCS, and archive directories.
    if (file === 'node_modules' || file === '.git' || file === '.antigravitycli' || file === '.kilo' || file === '.claude' || file === 'deprecated') {
      continue;
    }
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      findMdFiles(filePath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const mdFiles = findMdFiles('.');
console.log(`Found ${mdFiles.length} markdown file(s) to check.`);

let brokenLinkCount = 0;

// Regular expression to find markdown links: [text](url)
// It avoids matching images like ![alt](url)
const linkRegex = /(?<!\!)\[([^\]]+)\]\(([^)]+)\)/g;

for (const file of mdFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const dir = path.dirname(file);
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    const text = match[1];
    let url = match[2].trim();

    // Skip web links, anchors, or template placeholders
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('#') || url.startsWith('mailto:') || url.includes('{{')) {
      continue;
    }

    let targetPath = '';
    if (url.startsWith('file:///')) {
      // Decode URI component (handles spaces and other characters encoded in file:/// URLs)
      let decodedUrl = decodeURIComponent(url);
      // Remove file:/// prefix
      let localPath = decodedUrl.substring(8);
      // For Windows: absolute path might start with a drive letter, e.g. "D:/path/..."
      // If it starts with a drive letter (e.g. "D:"), it's an absolute path.
      if (localPath.match(/^[a-zA-Z]:/)) {
        targetPath = path.resolve(localPath);
      } else {
        // Fallback: resolve relative to the root/cwd
        targetPath = path.resolve(localPath);
      }
    } else {
      // Relative path: resolve from the directory of the markdown file
      // If there's an anchor like path/to/file.md#L10-L20, strip the anchor
      const anchorIdx = url.indexOf('#');
      if (anchorIdx !== -1) {
        url = url.substring(0, anchorIdx);
      }
      if (!url) {
        // Just an anchor link within the same file (already skipped above but safety check)
        continue;
      }
      targetPath = path.resolve(dir, url);
    }

    if (!fs.existsSync(targetPath)) {
      console.error(`Error in ${file}: Broken link [${text}](${url}) -> Resolved path does not exist: ${targetPath}`);
      brokenLinkCount++;
    }
  }
}

if (brokenLinkCount > 0) {
  console.error(`\nValidation FAILED. Found ${brokenLinkCount} broken link(s).`);
  process.exit(1);
} else {
  console.log('\nValidation PASSED. All markdown links are valid.');
  process.exit(0);
}
