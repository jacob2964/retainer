/* tslint:disable */

// @ts-nocheck
const { writeFile, existsSync, mkdirSync } = require('fs');
const { argv } = require('yargs');

require('dotenv').config();
const application_id = argv.application_id;
const application_secret = argv.application_secret;
const test_secret = argv.test_secret;
const surge_url = argv.surge_url;

console.log("LOOK HERE")
console.log(test_secret)
console.log(surge_url)


function writeFileUsingFS(targetPath, environmentFileContent) {
  writeFile(targetPath, environmentFileContent, function (err) {
    if (err) {
      console.log(err);
    }
    if (environmentFileContent !== '') {
      console.log(`wrote variables to ${targetPath}`);
    }
  });
}


// Providing path to the `environments` directory
const envDirectory = './src/environments';

// creates the `environments` directory if it does not exist
if (!existsSync(envDirectory)) {
  mkdirSync(envDirectory);
}

//creates the `environment.prod.ts` and `environment.ts` file if it does not exist
writeFileUsingFS('./src/environments/environment.prod.ts', '');
writeFileUsingFS('./src/environments/environment.ts', '');


// choose the correct targetPath based on the environment chosen
const targetPath = './src/environments/environment.prod.ts';

//actual content to be compiled dynamically and pasted into respective environment files
const environmentFileContent = `
  // This file was autogenerated by dynamically running set-env.ts and using dotenv for managing API key secrecy
  export const environment = {
    production: true,
    applicationID: "${application_id}",
    secret: "${application_secret}",
    redirectUrl: "https://retainer.surge.sh/"
  };
`;

writeFileUsingFS(targetPath, environmentFileContent); // appending data into the target file

/* tslint:enable */