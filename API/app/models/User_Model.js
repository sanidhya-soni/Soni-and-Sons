const { DynamoDBClient, PutItemCommand, QueryCommand, GetItemCommand } = require('@aws-sdk/client-dynamodb');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const client = new DynamoDBClient({ region: 'ap-south-1' });

class UserModel {
  static async createUser(user_name, first_name, last_name, contact_no, email, password, sec_ques, sec_ans) {
    const userId = uuidv4();

    if (!user_name || !email || !password) {
      throw new Error("Missing required fields"); // Throw an error if any required field is missing
    }

    // Check if the username already exists
    const existingUser = await UserModel.getUserByUsername(user_name);
    if (existingUser) {
      const err = new Error("Username already exists");
      err.code = 11000;
      throw err;
    }

    const params = {
      TableName: 'sns-user-details', // your DynamoDB table name
      Item: {
        "userId": { S: userId, required: true },
        "user_name": { S: user_name },
        "first_name": { S: first_name },
        "last_name": { S: last_name },
        "contact_no": { S: contact_no },
        "email": { S: email },
        "password": { S: password },
        "sec_ques": { S: sec_ques },
        "sec_ans": { S: sec_ans },
      }
    };
    try {
      await client.send(new PutItemCommand(params));
      return { userId, user_name, email };
    } catch (error) {
      console.log('Error creating user:', error);
      throw error;
    }
  }

  static async getUserByUsername(user_name) {
    // console.log(user_name);
    const params = {
      TableName: 'sns-user-details',
      IndexName: 'user_nameIndex',
      KeyConditionExpression: 'user_name = :user_name',
      ExpressionAttributeValues: {
        ':user_name': { 'S': user_name },
      },
    };
    try {
      const result = await client.send(new QueryCommand(params));
      // console.log(result.Items[0]);
      return result.Items[0];
    } catch (error) {
      console.log('Error retrieving user:', error);
      throw error;
    }
  }

  static async getUserById(userId) {
    const params = {
      TableName: "sns-user-details",
      Key: {
        userId: { S: userId }
      }
    };

    try {
      const response = await client.send(new GetItemCommand(params));
      const { password, sec_ques, sec_ans, userId, ...user } = this.parseDynamoDBOutput(response.Item);
      return user;
    } catch (error) {
      console.error('Error retrieving user:', error);
      throw error;
    }
  }

  static parseDynamoDBOutput(dynamoDBOutput) {
    const parsedOutput = {};
    for (const key in dynamoDBOutput) {
      if (dynamoDBOutput.hasOwnProperty(key)) {
        const value = dynamoDBOutput[key];
        parsedOutput[key] = value[Object.keys(value)[0]];
      }
    }
    return parsedOutput;
  }
}

module.exports = UserModel;
