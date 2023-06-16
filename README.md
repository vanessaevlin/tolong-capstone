## API

This API jwt-auth & Dataset requires [Node.js](https://nodejs.org/) v16 to run.

Install the dependencies and start the server.

### jwt-auth
#### How to run
1. Initialize project
```sh
npm init --y
```
2. Install the dependencies
```sh
npm i express bycrypt cookie-parser cors dotenv jsonwebtoken mysql2 nodemon sequelize
```
3. Start the server
```sh
node index.js
```
### Dataset
#### How to run
1. Initialize project
```sh
npm init --y
```
2. Install the dependencies
```sh
npm i express
```
3. Start the server
```sh
node index.js
```

## Deploy ML Model to Cloud Run

### How to run
Machine learning model is found in linkmodel.txt
1. Build and push container image
```sh
gcloud builds submit --tag gcr.io/<project_id>/<image_name>
```

2. Deploy to Cloud Run
```sh
gcloud run deploy --image gcr.io/<project_id>/<function_name> --platform managed
```

### POST (send image file)
https://getprediction-h2zmlw7akq-et.a.run.app/
```sh
{
    "prediction": "Cut"
}
```
