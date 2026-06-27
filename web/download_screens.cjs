const fs = require('fs');
const https = require('https');

const data = JSON.parse(fs.readFileSync('C:/Users/chess/.gemini/antigravity-ide/brain/6e2ab971-48c8-49b5-8f5a-79c38e9b295b/.system_generated/steps/12/output.txt', 'utf8'));

const downloadFile = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
};

async function main() {
    for (const screen of data.screens) {
        const title = screen.title.replace(/[^a-zA-Z0-9]/g, '_');
        const url = screen.htmlCode.downloadUrl;
        console.log(`Downloading ${title}...`);
        await downloadFile(url, `./temp_screens/${title}.html`);
        console.log(`Done ${title}.`);
    }
}

main();
