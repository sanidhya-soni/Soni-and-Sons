const { DynamoDBClient, CreateTableCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "ap-south-1" });

const params = {
  TableName: "sns-user-details",
  KeySchema: [
    { AttributeName: "userId", KeyType: "HASH" } // partition key
  ],
  AttributeDefinitions: [
    { AttributeName: "userId", AttributeType: "S" },
    { AttributeName: "user_name", AttributeType: "S" } // S represents string type
  ],
  GlobalSecondaryIndexes: [ // add the GSI definition
    {
      IndexName: "user_nameIndex",
      KeySchema: [
        { AttributeName: "user_name", KeyType: "HASH" } // GSI partition key
      ],
      Projection: {
        ProjectionType: "ALL"
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      }
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10, // Increase the initial read capacity units
    WriteCapacityUnits: 10, // Increase the initial write capacity units
  },
  BillingMode: "PROVISIONED", // Set the billing mode to provisioned
  AutoScalingSettingsUpdate: {
    AutoScalingDisabled: false, // Enable autoscaling
    AutoScalingRoleArn: "arn:aws:iam::373425558498:user/AlmostAdmin", // Specify the ARN of your IAM role for autoscaling
    ProvisionedReadCapacityUnits: 10, // The maximum read capacity units to autoscale
    ProvisionedWriteCapacityUnits: 10, // The maximum write capacity units to autoscale
    ScalingPolicyUpdate: {
      TargetTrackingScalingPolicyConfiguration: {
        PredefinedMetricSpecification: {
          PredefinedMetricType: "DynamoDBReadCapacityUtilization", // Autoscaling based on DynamoDB's read capacity utilization
        },
        ScaleOutCooldown: 60, // The cooldown period before increasing capacity
        ScaleInCooldown: 60, // The cooldown period before decreasing capacity
        TargetValue: 70, // The target utilization percentage
      },
    },
  },
};

const command = new CreateTableCommand(params);

client.send(command).then((data) => {
  console.log("Table created:", data);
}).catch((error) => {
  console.error("Error creating table:", error);
});
