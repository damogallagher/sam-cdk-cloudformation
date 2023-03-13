import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cdkHandler = new lambda.Function(this, "CDKHandler", {
      runtime: lambda.Runtime.NODEJS_18_X, // So we can use async in widget.js
      handler: 'index.lambdaHandler',
      code: lambda.Code.fromInline(`
              exports.lambdaHandler = async (event, context) => {
                try {
                    return {
                        'statusCode': 200,
                        'body': JSON.stringify({
                            message: 'hello world',
                        }) 
                    }
                } catch (err) {
                    console.log(err);
                    return err;
                }
            };
    `),
    });


    const cdkApi = new apigateway.RestApi(this, "cdk-api", {
      restApiName: "CDK Service",
      description: "This service demonstrates AWS CDK Functionality."
    });

    const getCDKIntegration = new apigateway.LambdaIntegration(cdkHandler, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    });

    cdkApi.root.addMethod("GET", getCDKIntegration); // GET /

    new cdk.CfnOutput(this, 'apiEndpoint', {
      value: `https://${cdkApi.restApiId}.execute-api.eu-west-1.amazonaws.com/${cdkApi.deploymentStage.stageName}/`,
      exportName: 'apiEndpoint',
    });
  }
}
