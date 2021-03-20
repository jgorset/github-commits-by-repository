# GitHub commits by repository

A script to show commits for a given user, grouped by repository

```bash
$ github-commits-by-repository -h
Options:
      --version  Show version number                                   [boolean]
  -l, --limit    Limit to this number of commits         [number] [default: 100]
  -s, --sum      Sum the results                      [boolean] [default: false]
  -h, --help     Show help                                             [boolean]
```

## Installation

```bash
$ npm install github-commits-by-repository
```

## Configuration

To search GitHub enterprise, set these environment variables:

* `GITHUB_ACCESS_TOKEN`: A [GitHub access token](https://github.com/settings/tokens)
* `GITHUB_BASE_URL`: The (full) base URL of your GitHub Enterprise API (e.g. `https://github.yourcompany.com/api/v3`)

## Usage

### Search for one user

```bash
$ github-commits-by-repository jgorset --limit 100
{
  users: [
    {
      user: 'jgorset',
      commitsByRepository: {
        'schibsted/slack-calendar-topic': 40,
        'schibsted/pingdom-status-page': 30,
        'jgorset/facebook-messenger': 18,
        'schibsted/deathstar-middleware': 7,
        'jgorset/turbotest': 2,
        'Unleash/unleash': 1,
        'schibsted/schibsted.github.io': 1,
        'jgorset/label': 1
      }
    }
  ]
}
```

### Search for several users

```bash
$ github-commits-by-repository jgorset,timkurvers --limit 100
{
  users: [
    {
      user: 'jgorset',
      commitsByRepository: {
        'schibsted/slack-calendar-topic': 40,
        'schibsted/pingdom-status-page': 30,
        'jgorset/facebook-messenger': 18,
        'schibsted/deathstar-middleware': 7,
        'jgorset/turbotest': 2,
        'Unleash/unleash': 1,
        'schibsted/schibsted.github.io': 1,
        'jgorset/label': 1
      }
    },
    {
      user: 'timkurvers',
      commitsByRepository: {
        'timkurvers/redota': 50,
        'timkurvers/grumbles': 28,
        'timkurvers/timkurvers.github.io': 12,
        'timkurvers/dota2-model-viewer': 9,
        'timkurvers/advent-of-code': 1
      }
    },
  ]
}
```

### Sum the results

```bash
$ github-commits-by-repository jgorset,timkurvers --limit 100 --sum
{
  users: [...],
  sum: {
    users: [ 'jgorset', 'timkurvers' ],
    commitsByRepository: {
      'timkurvers/redota': 50,
      'schibsted/slack-calendar-topic': 40,
      'schibsted/pingdom-status-page': 30,
      'timkurvers/grumbles': 28,
      'jgorset/facebook-messenger': 18,
      'timkurvers/timkurvers.github.io': 12,
      'timkurvers/dota2-model-viewer': 9,
      'schibsted/deathstar-middleware': 7,
      'jgorset/turbotest': 2,
      'Unleash/unleash': 1,
      'schibsted/schibsted.github.io': 1,
      'jgorset/label': 1,
      'timkurvers/advent-of-code': 1
    }
  }
}
```
