# Kubefirst Console App

This is the Kubefirst Frontend project that shows all the Kubefirst installed services in a single place.

![ConsoleApp](/images/consoleApp.png)

## Setup Instructions

- Clone this repository. You will need `node` and `yarn` installed globally on your machine.
- Create a .env file in the root of the project
- You can copy the env values from `.env.local.example` to have a local installation experience or you can use `.env.cluster.example` to have a cluster install experience.
- Make sure you are using **NodeJS** >= v16.15.1
- Install dependencies `yarn install`
- Start the server `yarn dev`
- Go to `localhost:3000`
- Enjoy 🥳🎉

## Publish Docker image to ECR

### Build the Docker image

`docker build --tag public.ecr.aws/kubefirst/console:{version} .`}

- Test the docker image `docker run -p 8001:80 -t public.ecr.aws/kubefirst/console:{version}`
- Go to `http://localhost:8001` to see if the docker image is working

### Push Docker Image to ECR

Note: You might need an AWS Managament Account

1. Retrieve an authentication token and authenticate your Docker client to your registry.
   `aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/kubefirst`
2. Run the following command to push this image to your newly created AWS repository:
   `docker push public.ecr.aws/kubefirst/console:{version}`

3. Go to the [Console Chart](https://github.com/kubefirst/charts/tree/gh-pages/charts/console) and bump up the docker version and chart version. Follow the [README](https://github.com/kubefirst/charts) instructions.

### Chart

1. The console chart is stored in the [Charts repository](https://github.com/kubefirst/charts)
