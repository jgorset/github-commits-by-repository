#!/usr/bin/env node

import search from '../src/search.js';
import yargs from 'yargs';
import util from 'util';

const argv = yargs(process.argv.slice(2))
  .demandCommand(1)
  .option('limit', {
    alias: 'l',
    description: 'Limit to this number of commits',
    default: 100,
    type: 'number'
  })
  .option('sum', {
    alias: 's',
    description: 'Sum the results',
    default: false,
    type: 'boolean'
  })
  .help()
  .alias('help', 'h')
  .argv;

const USERS = argv._[0].split(',');
const LIMIT = argv.limit;
const SUM = argv.sum;

const output = {};

const promises = [];

console.log(
  util.inspect(await generate(), {
    showHidden: false,
    depth: null,
    colors: true
  })
);

async function generate() {
  output.users = [];

  USERS.forEach((user) => {
    let promise = search(user, LIMIT);

    promise.then((result) => {
      const representation = {
        user: user,
        commitsByRepository: sortObject(result)
      };

      output.users.push(representation);
    });

    promises.push(promise);
  });

  await Promise.all(promises).then((results) => {
    if (!SUM) return;

    const repositories = {};

    results.forEach((result) => {
      Object.entries(result).forEach(([key, value]) => {
        if (repositories[key]) {
          repositories[key] += value;
        } else {
          repositories[key] = value;
        }
      });
    });

    const representation = {
      users: USERS,
      commitsByRepository: sortObject(repositories)
    };

    output.sum = representation;
  });

  return output;
}

function sortObject(object) {
  // You'll just have to trust this
  return Object.entries(object)
    .sort(([,a],[,b]) => b-a)
    .reduce((r, [k,v]) => ({ ...r, [k]: v}), {});
};
