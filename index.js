const fs = require('fs')
const path = require('path')

const startPath = path.join(__dirname, 'some-directory');

function listObjects(currentPath) {
    const files = fs.readdirSync(currentPath)
    const filesCheck = (files) => {
        let filesAmount = 0
        let directoriesAmount = 0

        for (let file of files) {
            const status = fs.statSync(path.join(currentPath, file))
            const statCheck = (status) => {

                if (status.isDirectory()) {
                    directoriesAmount = directoriesAmount + 1
                    listObjects(path.join(currentPath, file));
                } else {
                    if (file !== 'info.json') {
                        filesAmount = filesAmount + 1
                    }
                }

            }

            statCheck(status)
        }
        const infoPath = path.join(currentPath, 'info.json')

        const data = {
            filesAmount,
            directoriesAmount,
            infoPath
        }

        fs.writeFileSync(infoPath, JSON.stringify(data))
    }
    filesCheck(files)
}

listObjects(startPath);