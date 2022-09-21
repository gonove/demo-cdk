"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkFirstAppStack = void 0;
const cdk = require("aws-cdk-lib");
// import * as sqs from 'aws-cdk-lib/aws-sqs';
// Importaciones manuales
// import * as lambda from '@aws-cdk/aws-lambda'; WRONG!
const lambda = require("aws-cdk-lib/aws-lambda");
const dynamodb = require("aws-cdk-lib/aws-dynamodb");
const apigw = require("aws-cdk-lib/aws-apigateway");
const path = require("path");
class CdkFirstAppStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // The code that defines your stack goes here
        // Definicion de tabla en Dynamodb
        const tablaSaludos = new dynamodb.Table(this, "TablaSaludos", {
            partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
        });
        // Funcion de Lambda
        const guardarSaludoFunction = new lambda.Function(this, "GuardarSaludoFunction", {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'handler.guardarSaludo',
            code: lambda.Code.fromAsset(path.resolve(__dirname, 'lambda')),
            environment: {
                TABLA_SALUDOS: tablaSaludos.tableName,
            },
        });
        // Permisos lambda - tabla dynamodb | L2
        tablaSaludos.grantReadWriteData(guardarSaludoFunction);
        // creacion de API Gateway con un metodo y un path | L2
        const saludoAPI = new apigw.RestApi(this, 'saludoApi');
        saludoAPI.root
            .resourceForPath('hello')
            .addMethod("POST", new apigw.LambdaIntegration(guardarSaludoFunction));
    }
}
exports.CdkFirstAppStack = CdkFirstAppStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLWZpcnN0LWFwcC1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNkay1maXJzdC1hcHAtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW1DO0FBRW5DLDhDQUE4QztBQUU5Qyx5QkFBeUI7QUFDekIsd0RBQXdEO0FBQ3hELGlEQUFpRDtBQUNqRCxxREFBcUQ7QUFDckQsb0RBQW9EO0FBQ3BELDZCQUE0QjtBQUU1QixNQUFhLGdCQUFpQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQzdDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDOUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsNkNBQTZDO1FBQzdDLGtDQUFrQztRQUNsQyxNQUFNLFlBQVksR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUM3RCxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUcsSUFBSSxFQUFFLElBQUksRUFBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRTtTQUNwRSxDQUFDLENBQUE7UUFFRixvQkFBb0I7UUFDcEIsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUUsSUFBSSxFQUFFLHVCQUF1QixFQUFFO1lBQ2hGLE9BQU8sRUFBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDcEMsT0FBTyxFQUFHLHVCQUF1QjtZQUNqQyxJQUFJLEVBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDaEUsV0FBVyxFQUFHO2dCQUNaLGFBQWEsRUFBRyxZQUFZLENBQUMsU0FBUzthQUN2QztTQU1GLENBQUMsQ0FBQTtRQUVGLHdDQUF3QztRQUN4QyxZQUFZLENBQUMsa0JBQWtCLENBQUUscUJBQXFCLENBQUUsQ0FBQztRQUV6RCx1REFBdUQ7UUFDdkQsTUFBTSxTQUFTLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFFLElBQUksRUFBRSxXQUFXLENBQUUsQ0FBQTtRQUV4RCxTQUFTLENBQUMsSUFBSTthQUNYLGVBQWUsQ0FBRSxPQUFPLENBQUU7YUFDMUIsU0FBUyxDQUFFLE1BQU0sRUFBRSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBRSxxQkFBcUIsQ0FBRSxDQUFFLENBQUE7SUFFOUUsQ0FBQztDQUNGO0FBcENELDRDQW9DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbi8vIGltcG9ydCAqIGFzIHNxcyBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc3FzJztcblxuLy8gSW1wb3J0YWNpb25lcyBtYW51YWxlc1xuLy8gaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ0Bhd3MtY2RrL2F3cy1sYW1iZGEnOyBXUk9ORyFcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIGR5bmFtb2RiIGZyb20gJ2F3cy1jZGstbGliL2F3cy1keW5hbW9kYic7XG5pbXBvcnQgKiBhcyBhcGlndyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtYXBpZ2F0ZXdheSc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnXG5cbmV4cG9ydCBjbGFzcyBDZGtGaXJzdEFwcFN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgLy8gVGhlIGNvZGUgdGhhdCBkZWZpbmVzIHlvdXIgc3RhY2sgZ29lcyBoZXJlXG4gICAgLy8gRGVmaW5pY2lvbiBkZSB0YWJsYSBlbiBEeW5hbW9kYlxuICAgIGNvbnN0IHRhYmxhU2FsdWRvcyA9IG5ldyBkeW5hbW9kYi5UYWJsZSggdGhpcywgXCJUYWJsYVNhbHVkb3NcIiwge1xuICAgICAgcGFydGl0aW9uS2V5OiB7IG5hbWUgOiAnaWQnLCB0eXBlIDogZHluYW1vZGIuQXR0cmlidXRlVHlwZS5TVFJJTkcgfSxcbiAgICB9KVxuICAgIFxuICAgIC8vIEZ1bmNpb24gZGUgTGFtYmRhXG4gICAgY29uc3QgZ3VhcmRhclNhbHVkb0Z1bmN0aW9uID0gbmV3IGxhbWJkYS5GdW5jdGlvbiggdGhpcywgXCJHdWFyZGFyU2FsdWRvRnVuY3Rpb25cIiwge1xuICAgICAgcnVudGltZSA6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLFxuICAgICAgaGFuZGxlciA6ICdoYW5kbGVyLmd1YXJkYXJTYWx1ZG8nLFxuICAgICAgY29kZSA6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCggcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2xhbWJkYScpKSxcbiAgICAgIGVudmlyb25tZW50IDoge1xuICAgICAgICBUQUJMQV9TQUxVRE9TIDogdGFibGFTYWx1ZG9zLnRhYmxlTmFtZSxcbiAgICAgIH0sXG4gICAgICAvLyBleGFtcGxlIHJlc291cmNlXG4gICAgICAvLyBjb25zdCBxdWV1ZSA9IG5ldyBzcXMuUXVldWUodGhpcywgJ0Nka0ZpcnN0QXBwUXVldWUnLCB7XG4gICAgICAvLyAgIHZpc2liaWxpdHlUaW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcygzMDApXG4gICAgICAvLyB9KTtcblxuICAgIH0pXG5cbiAgICAvLyBQZXJtaXNvcyBsYW1iZGEgLSB0YWJsYSBkeW5hbW9kYiB8IEwyXG4gICAgdGFibGFTYWx1ZG9zLmdyYW50UmVhZFdyaXRlRGF0YSggZ3VhcmRhclNhbHVkb0Z1bmN0aW9uICk7XG5cbiAgICAvLyBjcmVhY2lvbiBkZSBBUEkgR2F0ZXdheSBjb24gdW4gbWV0b2RvIHkgdW4gcGF0aCB8IEwyXG4gICAgY29uc3Qgc2FsdWRvQVBJID0gbmV3IGFwaWd3LlJlc3RBcGkoIHRoaXMsICdzYWx1ZG9BcGknIClcblxuICAgIHNhbHVkb0FQSS5yb290XG4gICAgICAucmVzb3VyY2VGb3JQYXRoKCAnaGVsbG8nIClcbiAgICAgIC5hZGRNZXRob2QoIFwiUE9TVFwiLCBuZXcgYXBpZ3cuTGFtYmRhSW50ZWdyYXRpb24oIGd1YXJkYXJTYWx1ZG9GdW5jdGlvbiApIClcblxuICB9XG59XG4iXX0=