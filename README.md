# Task

## Descriprion

Fetch resources from url values in object and replace it with data.

**Note:** Object property may contain primitive, array or other object as value

### Start

#### Create mock file with 50 records, run parser and simulate network requests(0-1000ms response time, 5% failure with 429 status code).

`npm run start`

#### Create mock file with 1000 records, run parser and run clean mode(no response time, no failure).

`npm run start records=1000 clean`

### Output

Results saved under `result/proccessed.json`

#### input(mock.json):

```
{
    "id": 1,
    "field": "2ff573d8ca087",
    "fieldObj": {
      "a": "2ff573d8ca087",
      "2ff573d8ca087": "https://0.1873390583296286.google.com"
    },
    "fieldArray": ["2ff573d8ca087"],
    "fieldBoolean": false
  }
```

#### output(proccessed.json):

```
{
    "id": 1,
    "field": "2ff573d8ca087",
    "fieldObj": {
      "a": "2ff573d8ca087",
      "2ff573d8ca087": {
        "url":"https://0.1873390583296286.google.com"
        "data": {
          "data": "SOME_STRING_DATA_0.39658132547157",
          "status": 200,
          "timeResponse": 39.658132547156995
        }
      }
    },
    "fieldArray": ["2ff573d8ca087"],
    "fieldBoolean": false
}
```
