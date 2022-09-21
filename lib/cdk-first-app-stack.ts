import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

// Importaciones manuales
// import * as lambda from '@aws-cdk/aws-lambda'; WRONG!
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path'

export class CdkFirstAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // Definicion de tabla en Dynamodb
    const tablaSaludos = new dynamodb.Table( this, "TablaSaludos", {
      partitionKey: { name : 'id', type : dynamodb.AttributeType.STRING },
    })
    
    // Funcion de Lambda
    const guardarSaludoFunction = new lambda.Function( this, "GuardarSaludoFunction", {
      runtime : lambda.Runtime.NODEJS_14_X,
      handler : 'handler.guardarSaludo',
      code : lambda.Code.fromAsset( path.resolve(__dirname, 'lambda')),
      environment : {
        TABLA_SALUDOS : tablaSaludos.tableName,
      },
      // example resource
      // const queue = new sqs.Queue(this, 'CdkFirstAppQueue', {
      //   visibilityTimeout: cdk.Duration.seconds(300)
      // });

    })

    // Permisos lambda - tabla dynamodb | L2
    tablaSaludos.grantReadWriteData( guardarSaludoFunction );

    // creacion de API Gateway con un metodo y un path | L2
    const saludoAPI = new apigw.RestApi( this, 'saludoApi' )

    saludoAPI.root
      .resourceForPath( 'hello' )
      .addMethod( "POST", new apigw.LambdaIntegration( guardarSaludoFunction ) )

  }
}
