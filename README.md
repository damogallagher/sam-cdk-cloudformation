# sam-cdk-cloudformation

## SAM
cd sam
sam init
sam build

### Initial deployment
sam deploy --guided

### Subsequent deployment
sam deploy --config-env <<profile name>>

## Cloudformation
cd cloudformation
aws cloudformation validate-template --template-body file://template.yaml --profile <<profile name>>

aws cloudformation deploy --stack-name cloudformation-lambda-api --template-file template.yaml --capabilities CAPABILITY_IAM --profile <<profile name>>


## CDK
cd cdk
cdk init app --language typescript
npm install
npm run build
cdk deploy --profile <<profile name>>
