import octokit from './octokit.js';

const MAX_PER_PAGE = 100;

async function search(author, limit=100) {
  const repositories = {};
  const promises = [];

  //const results = await query(author);

  const pages = Array.from({length: Math.ceil(limit / MAX_PER_PAGE)}, (_, i) => i + 1)

  pages.forEach((page) => {
    promises.push(
      query(author, page)
    );
  });

  const queries = await Promise.all(promises);

  const results = queries;

  results.forEach((result) => {
    result.data.items.forEach((commit) => {
      if (repositories[commit.repository.full_name]) {
        repositories[commit.repository.full_name] += 1;
      } else {
        repositories[commit.repository.full_name] = 1;
      }
    });
  });

  return repositories;
}

async function query(author, page=1) {
  return await octokit.request('GET /search/commits', {
    q: `author:${author}`,
    sort: 'author-date',
    page: page,
    per_page: 100,
    order: 'desc',
    mediaType: {
      previews: [
        'cloak'
      ]
    }
  });
}

export default search;
