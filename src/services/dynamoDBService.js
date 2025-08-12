// DynamoDB User Service
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand, QueryCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { CreateTableCommand, DescribeTableCommand, ListTablesCommand, DeleteTableCommand } from '@aws-sdk/client-dynamodb';

// AWS Configuration
const awsConfig = {
  region: 'ap-southeast-1', // Singapore region
  credentials: {
    accessKeyId: 'AKIASVLKCUXEEDKC7QXF',
    secretAccessKey: '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',
  }
};

// Initialize DynamoDB client
let dynamoClient;
let dynamoDocClient;

try {
  // Initialize DynamoDB client with provided credentials
  dynamoClient = new DynamoDBClient(awsConfig);
  dynamoDocClient = DynamoDBDocumentClient.from(dynamoClient);
  console.log('✅ DynamoDB client initialized with credentials for ap-southeast-1 region');
} catch (error) {
  console.error('❌ Error initializing DynamoDB client:', error);
}

// Table names
const TABLES = {
  USERS: 'vedic-maths-users',
  COURSES: 'vedic-maths-courses',
  ENROLLMENTS: 'vedic-maths-enrollments',
};

// Table schemas with GSI definitions
const TABLE_SCHEMAS = {
  USERS: {
    TableName: TABLES.USERS,
    KeySchema: [
      { AttributeName: 'userId', KeyType: 'HASH' } // Partition key
    ],
    AttributeDefinitions: [
      { AttributeName: 'userId', AttributeType: 'S' },
      { AttributeName: 'emailIndex', AttributeType: 'S' },
      { AttributeName: 'roleIndex', AttributeType: 'S' }
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'emailIndex',
        KeySchema: [
          { AttributeName: 'emailIndex', KeyType: 'HASH' }
        ],
        Projection: {
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      },
      {
        IndexName: 'roleIndex',
        KeySchema: [
          { AttributeName: 'roleIndex', KeyType: 'HASH' }
        ],
        Projection: {
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    },
    BillingMode: 'PROVISIONED'
  },
  COURSES: {
    TableName: TABLES.COURSES,
    KeySchema: [
      { AttributeName: 'courseId', KeyType: 'HASH' } // Partition key
    ],
    AttributeDefinitions: [
      { AttributeName: 'courseId', AttributeType: 'S' },
      { AttributeName: 'categoryIndex', AttributeType: 'S' },
      { AttributeName: 'instructorIndex', AttributeType: 'S' }
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'categoryIndex',
        KeySchema: [
          { AttributeName: 'categoryIndex', KeyType: 'HASH' }
        ],
        Projection: {
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      },
      {
        IndexName: 'instructorIndex',
        KeySchema: [
          { AttributeName: 'instructorIndex', KeyType: 'HASH' }
        ],
        Projection: {
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    },
    BillingMode: 'PROVISIONED'
  },
  ENROLLMENTS: {
    TableName: TABLES.ENROLLMENTS,
    KeySchema: [
      { AttributeName: 'enrollmentId', KeyType: 'HASH' } // Partition key
    ],
    AttributeDefinitions: [
      { AttributeName: 'enrollmentId', AttributeType: 'S' },
      { AttributeName: 'userId', AttributeType: 'S' },
      { AttributeName: 'courseId', AttributeType: 'S' },
      { AttributeName: 'statusIndex', AttributeType: 'S' }
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'userIdIndex',
        KeySchema: [
          { AttributeName: 'userId', KeyType: 'HASH' }
        ],
        Projection: {
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      },
      {
        IndexName: 'courseIdIndex',
        KeySchema: [
          { AttributeName: 'courseId', KeyType: 'HASH' }
        ],
        Projection: {
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      },
      {
        IndexName: 'statusIndex',
        KeySchema: [
          { AttributeName: 'statusIndex', KeyType: 'HASH' }
        ],
        Projection: {
          ProjectionType: 'ALL'
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    },
    BillingMode: 'PROVISIONED'
  }
};

// Table Management Class
class DynamoDBTableManager {
  constructor() {
    this.dynamoClient = dynamoClient;
  }

  // Test DynamoDB connectivity
  async testConnection() {
    try {
      console.log('🔌 Testing DynamoDB connection...');
      const command = new ListTablesCommand({});
      const result = await this.dynamoClient.send(command);
      console.log('✅ DynamoDB connection successful, existing tables:', result.TableNames || []);
      return { success: true, tables: result.TableNames || [] };
    } catch (error) {
      console.error('❌ DynamoDB connection failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Check if table exists
  async tableExists(tableName) {
    try {
      const command = new DescribeTableCommand({ TableName: tableName });
      await this.dynamoClient.send(command);
      return true;
    } catch (error) {
      if (error.name === 'ResourceNotFoundException') {
        return false;
      }
      throw error;
    }
  }

  // Create table if it doesn't exist
  async createTableIfNotExists(tableName) {
    try {
      console.log(`🔍 Checking if table ${tableName} exists...`);
      const exists = await this.tableExists(tableName);
      
      if (exists) {
        console.log(`ℹ️ Table ${tableName} already exists`);
        return { success: true, message: 'Table already exists' };
      }

      console.log(`📋 Looking for schema for table: ${tableName}`);
      console.log(`📋 Available schema keys:`, Object.keys(TABLE_SCHEMAS));
      console.log(`📋 Schema table names:`, Object.values(TABLE_SCHEMAS).map(s => s.TableName));
      
      // Find the schema key that matches the table name
      const schemaKey = Object.keys(TABLE_SCHEMAS).find(key => 
        TABLE_SCHEMAS[key].TableName === tableName
      );
      
      console.log(`🔑 Found schema key: ${schemaKey} for table: ${tableName}`);
      
      if (!schemaKey) {
        console.error(`❌ No schema found for table: ${tableName}`);
        console.error(`❌ Available schemas:`, Object.keys(TABLE_SCHEMAS));
        console.error(`❌ Schema table names:`, Object.values(TABLE_SCHEMAS).map(s => s.TableName));
        throw new Error(`No schema defined for table: ${tableName}`);
      }

      const schema = TABLE_SCHEMAS[schemaKey];
      console.log(`🏗️ Creating table: ${tableName} with schema:`, schema);

      const command = new CreateTableCommand(schema);
      await this.dynamoClient.send(command);
      
      console.log(`✅ Table ${tableName} created successfully`);
      return { success: true, message: 'Table created successfully' };
      
    } catch (error) {
      console.error(`❌ Error creating table ${tableName}:`, error);
      return { success: false, error: error.message };
    }
  }

  // Create all tables if they don't exist
  async createAllTablesIfNotExist() {
    console.log('🏗️ Checking and creating DynamoDB tables...');
    console.log('📋 Available table schemas:', Object.keys(TABLE_SCHEMAS));
    console.log('📋 Table names to create:', Object.values(TABLES));
    
    const results = {};
    
    for (const tableName of Object.values(TABLES)) {
      try {
        console.log(`🔍 Processing table: ${tableName}`);
        const result = await this.createTableIfNotExists(tableName);
        results[tableName] = result;
        
        if (result.success) {
          console.log(`✅ Table ${tableName}: ${result.message}`);
        } else {
          console.error(`❌ Table ${tableName}: ${result.error}`);
        }
      } catch (error) {
        console.error(`❌ Error with table ${tableName}:`, error);
        results[tableName] = { success: false, error: error.message };
      }
    }
    
    return results;
  }

  // List all tables
  async listTables() {
    try {
      const command = new ListTablesCommand({});
      const result = await this.dynamoClient.send(command);
      return { success: true, tables: result.TableNames || [] };
    } catch (error) {
      console.error('❌ Error listing tables:', error);
      return { success: false, error: error.message };
    }
  }

  // Delete table (use with caution!)
  async deleteTable(tableName) {
    try {
      console.log(`🗑️ Deleting table: ${tableName}`);
      const command = new DeleteTableCommand({ TableName: tableName });
      await this.dynamoClient.send(command);
      
      console.log(`✅ Table ${tableName} deleted successfully`);
      return { success: true, message: 'Table deleted successfully' };
      
    } catch (error) {
      console.error(`❌ Error deleting table ${tableName}:`, error);
      return { success: false, error: error.message };
    }
  }

  // Wait for table to be active
  async waitForTableActive(tableName, maxWaitTime = 60000) {
    const startTime = Date.now();
    
    while (Date.now() - startTime < maxWaitTime) {
      try {
        const command = new DescribeTableCommand({ TableName: tableName });
        const result = await this.dynamoClient.send(command);
        
        if (result.Table.TableStatus === 'ACTIVE') {
          console.log(`✅ Table ${tableName} is now active`);
          return { success: true, status: 'ACTIVE' };
        }
        
        if (result.Table.TableStatus === 'CREATING') {
          console.log(`⏳ Table ${tableName} is still creating...`);
          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
          continue;
        }
        
        if (result.Table.TableStatus === 'DELETING') {
          throw new Error(`Table ${tableName} is being deleted`);
        }
        
      } catch (error) {
        if (error.name === 'ResourceNotFoundException') {
          throw new Error(`Table ${tableName} not found`);
        }
        throw error;
      }
    }
    
    throw new Error(`Timeout waiting for table ${tableName} to become active`);
  }
}

// User Service Class
class DynamoDBUserService {
  constructor() {
    this.tableName = TABLES.USERS;
    this.hasDirectAccess = !!dynamoDocClient;
    this.tableManager = new DynamoDBTableManager();
  }

  // Initialize service - create table if needed
  async initialize() {
    if (!this.hasDirectAccess) {
      console.log('ℹ️ DynamoDB: No direct access, skipping table creation');
      return { success: false, error: 'No direct DynamoDB access' };
    }

    try {
      console.log('🔧 DynamoDB: Initializing user service...');
      
      // Create users table if it doesn't exist
      const createResult = await this.tableManager.createTableIfNotExists(TABLES.USERS);
      
      if (createResult.success) {
        // Wait for table to be active if it was just created
        if (createResult.message === 'Table created successfully') {
          console.log('⏳ Waiting for table to become active...');
          await this.tableManager.waitForTableActive(TABLES.USERS);
        }
        
        console.log('✅ DynamoDB: User service initialized successfully');
        return { success: true, message: 'User service ready' };
      } else {
        throw new Error(createResult.error);
      }
      
    } catch (error) {
      console.error('❌ DynamoDB: Error initializing user service:', error);
      return { success: false, error: error.message };
    }
  }

  // Create or update user
  async saveUser(userId, userData) {
    try {
      console.log('💾 DynamoDB: Saving user data:', { userId, userData });

      if (this.hasDirectAccess) {
        // Direct DynamoDB access
        const params = {
          TableName: this.tableName,
          Item: {
            userId: userId,
            email: userData.email,
            displayName: userData.displayName,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: userData.role,
            phone: userData.phone,
            isActive: userData.isActive || true,
            emailVerified: userData.emailVerified || false,
            createdAt: userData.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            lastLoginAt: userData.lastLoginAt,
            preferences: userData.preferences || {
              notifications: true,
              theme: 'light',
              language: 'en'
            },
            // GSI for email-based queries
            emailIndex: userData.email,
            // GSI for role-based queries
            roleIndex: userData.role,
          }
        };

        await dynamoDocClient.send(new PutCommand(params));
        console.log('✅ DynamoDB: User saved successfully');
        return { success: true, data: params.Item };
      } else {
        // Fallback to Lambda service
        console.log('ℹ️ DynamoDB: Using Lambda service fallback for user save');
        const { lambdaService } = await import('./lambdaService');
        return await lambdaService.createUser({ userId, ...userData });
      }
    } catch (error) {
      console.error('❌ DynamoDB: Error saving user:', error);
      
      // Fallback to Lambda service on error
      try {
        console.log('🔄 DynamoDB: Falling back to Lambda service');
        const { lambdaService } = await import('./lambdaService');
        return await lambdaService.createUser({ userId, ...userData });
      } catch (fallbackError) {
        console.error('❌ Lambda fallback also failed:', fallbackError);
        return { success: false, error: error.message };
      }
    }
  }

  // Get user by ID
  async getUser(userId) {
    try {
      console.log('🔍 DynamoDB: Getting user:', userId);

      if (this.hasDirectAccess) {
        // Direct DynamoDB access
        const params = {
          TableName: this.tableName,
          Key: {
            userId: userId
          }
        };

        const result = await dynamoDocClient.send(new GetCommand(params));
        
        if (result.Item) {
          console.log('✅ DynamoDB: User found:', result.Item);
          return { success: true, data: result.Item };
        } else {
          console.log('ℹ️ DynamoDB: User not found');
          return { success: false, error: 'User not found' };
        }
      } else {
        // Fallback to Lambda service
        console.log('ℹ️ DynamoDB: Using Lambda service fallback for user get');
        const { lambdaService } = await import('./lambdaService');
        return await lambdaService.getUser(userId);
      }
    } catch (error) {
      console.error('❌ DynamoDB: Error getting user:', error);
      
      // Fallback to Lambda service on error
      try {
        console.log('🔄 DynamoDB: Falling back to Lambda service');
        const { lambdaService } = await import('./lambdaService');
        return await lambdaService.getUser(userId);
      } catch (fallbackError) {
        console.error('❌ Lambda fallback also failed:', fallbackError);
        return { success: false, error: error.message };
      }
    }
  }

  // Get user by email
  async getUserByEmail(email) {
    try {
      console.log('🔍 DynamoDB: Getting user by email:', email);

      if (this.hasDirectAccess) {
        // Direct DynamoDB access using GSI
        const params = {
          TableName: this.tableName,
          IndexName: 'emailIndex',
          KeyConditionExpression: 'emailIndex = :email',
          ExpressionAttributeValues: {
            ':email': email
          }
        };

        const result = await dynamoDocClient.send(new QueryCommand(params));
        
        if (result.Items && result.Items.length > 0) {
          console.log('✅ DynamoDB: User found by email:', result.Items[0]);
          return { success: true, data: result.Items[0] };
        } else {
          console.log('ℹ️ DynamoDB: User not found by email');
          return { success: false, error: 'User not found' };
        }
      } else {
        // Fallback to Lambda service
        console.log('ℹ️ DynamoDB: Using Lambda service fallback for email lookup');
        const { lambdaService } = await import('./lambdaService');
        return await lambdaService.getUsers({ email });
      }
    } catch (error) {
      console.error('❌ DynamoDB: Error getting user by email:', error);
      
      // Fallback to Lambda service on error
      try {
        console.log('🔄 DynamoDB: Falling back to Lambda service');
        const { lambdaService } = await import('./lambdaService');
        return await lambdaService.getUsers({ email });
      } catch (fallbackError) {
        console.error('❌ Lambda fallback also failed:', fallbackError);
        return { success: false, error: error.message };
      }
    }
  }

  // Update user
  async updateUser(userId, updates) {
    try {
      console.log('📝 DynamoDB: Updating user:', { userId, updates });

      if (this.hasDirectAccess) {
        // Direct DynamoDB access
        const updateExpression = [];
        const expressionAttributeNames = {};
        const expressionAttributeValues = {};

        // Build update expression dynamically
        Object.keys(updates).forEach(key => {
          if (key !== 'userId' && key !== 'email') { // Don't allow updating these fields
            updateExpression.push(`#${key} = :${key}`);
            expressionAttributeNames[`#${key}`] = key;
            expressionAttributeValues[`:${key}`] = updates[key];
          }
        });

        // Always update the updatedAt timestamp
        updateExpression.push('#updatedAt = :updatedAt');
        expressionAttributeNames['#updatedAt'] = 'updatedAt';
        expressionAttributeValues[':updatedAt'] = new Date().toISOString();

        const params = {
          TableName: this.tableName,
          Key: {
            userId: userId
          },
          UpdateExpression: `SET ${updateExpression.join(', ')}`,
          ExpressionAttributeNames: expressionAttributeNames,
          ExpressionAttributeValues: expressionAttributeValues,
          ReturnValues: 'ALL_NEW'
        };

        const result = await dynamoDocClient.send(new UpdateCommand(params));
        console.log('✅ DynamoDB: User updated successfully:', result.Attributes);
        return { success: true, data: result.Attributes };
      } else {
        // Fallback to Lambda service
        console.log('ℹ️ DynamoDB: Using Lambda service fallback for user update');
        const { lambdaService } = await import('./lambdaService');
        return await lambdaService.updateUser(userId, updates);
      }
    } catch (error) {
      console.error('❌ DynamoDB: Error updating user:', error);
      
      // Fallback to Lambda service on error
      try {
        console.log('🔄 DynamoDB: Falling back to Lambda service');
        const { lambdaService } = await import('./lambdaService');
        return await lambdaService.updateUser(userId, updates);
      } catch (fallbackError) {
        console.error('❌ Lambda fallback also failed:', fallbackError);
        return { success: false, error: error.message };
      }
    }
  }

  // Delete user
  async deleteUser(userId) {
    try {
      console.log('🗑️ DynamoDB: Deleting user:', userId);

      if (this.hasDirectAccess) {
        // Direct DynamoDB access
        const params = {
          TableName: this.tableName,
          Key: {
            userId: userId
          }
        };

        await dynamoDocClient.send(new DeleteCommand(params));
        console.log('✅ DynamoDB: User deleted successfully');
        return { success: true };
      } else {
        // Fallback to Lambda service
        console.log('ℹ️ DynamoDB: Using Lambda service fallback for user deletion');
        const { lambdaService } = await import('./lambdaService');
        return await lambdaService.deleteUser(userId);
      }
    } catch (error) {
      console.error('❌ DynamoDB: Error deleting user:', error);
      
      // Fallback to Lambda service on error
      try {
        console.log('🔄 DynamoDB: Falling back to Lambda service');
        const { lambdaService } = await import('./lambdaService');
        return await lambdaService.deleteUser(userId);
      } catch (fallbackError) {
        console.error('❌ Lambda fallback also failed:', fallbackError);
        return { success: false, error: error.message };
      }
    }
  }

  // Get users with filters
  async getUsers(filters = {}) {
    try {
      console.log('🔍 DynamoDB: Getting users with filters:', filters);

      if (this.hasDirectAccess) {
        // Direct DynamoDB access
        let params = {
          TableName: this.tableName,
          Limit: filters.limit || 50
        };

        // Add filters if provided
        if (filters.role) {
          params.IndexName = 'roleIndex';
          params.KeyConditionExpression = 'roleIndex = :role';
          params.ExpressionAttributeValues = { ':role': filters.role };
        }

        if (filters.email) {
          params.IndexName = 'emailIndex';
          params.KeyConditionExpression = 'emailIndex = :email';
          params.ExpressionAttributeValues = { ':email': filters.email };
        }

        const result = await dynamoDocClient.send(new QueryCommand(params));
        console.log('✅ DynamoDB: Users retrieved successfully:', result.Items?.length || 0);
        return { success: true, data: result.Items || [] };
      } else {
        // Fallback to Lambda service
        console.log('ℹ️ DynamoDB: Using Lambda service fallback for users list');
        const { lambdaService } = await import('./lambdaService');
        return await lambdaService.getUsers(filters);
      }
    } catch (error) {
      console.error('❌ DynamoDB: Error getting users:', error);
      
      // Fallback to Lambda service on error
      try {
        console.log('🔄 DynamoDB: Falling back to Lambda service');
        const { lambdaService } = await import('./lambdaService');
        return await lambdaService.getUsers(filters);
      } catch (fallbackError) {
        console.error('❌ Lambda fallback also failed:', fallbackError);
        return { success: false, error: error.message };
      }
    }
  }
}

// Create and export service instances
export const dynamoDBUserService = new DynamoDBUserService();
export const dynamoDBTableManager = new DynamoDBTableManager();

// Export the classes for testing or custom instances
export { DynamoDBUserService, DynamoDBTableManager };

// Export table names and schemas for reference
export { TABLES, TABLE_SCHEMAS };
