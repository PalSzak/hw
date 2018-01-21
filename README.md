# Homework

## Configuration handling

Your have to provide a valid configuration file under `./configuration/config.json`. If you need more information about available configuration options, please check `./configuration/config.sample.json`!

The mandatory configuration parameter:
 * 500px_consumer-key

A sample configuration with all the available options:
```
{
  "500px_consumer-key" : "your secret key goes here"
  "db_name" : "HW",
  "db_url" : '"mongodb://localhost:27017"
}
```

## Remaining Things TODO:

 * Proper mongodb setup - indexing for sorted queries
 * Virtualization - remove ugly global here, and introduce real config handling
 * Implement remaining integration tests for Food dao
 * Introduce E2E test level top of virtualization
 * Filter out client data to remove `_id` field (security reason)
 * split ui template to pieces (header for includes; image for images)
 * add error pages for ui
 * implement food dao unit tests
 * ... query project for 'TODO' string you may find some
