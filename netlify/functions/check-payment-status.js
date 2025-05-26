import { createClient } from '@libsql/client';
import crypto from 'crypto';

export const handler = async (event, context) => {
  console.log('Check payment status function called:', event.httpMethod);
  
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // We need to get the session ID or payment intent ID from the request
  // This would typically be passed as a query parameter
  const paymentId = event.queryStringParameters?.paymentId;
  
  if (!paymentId) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ 
        success: false,
        error: 'Missing payment ID',
        details: 'Payment ID is required to verify payment status'
      })
    };
  }

  try {
    // In a real implementation, we would verify the payment status with Stripe
    // For this demo, we'll simulate payment verification based on the payment ID
    
    // For our test environment, we'll approve any session ID that starts with 'sess_'
    const isPaymentCompleted = paymentId && paymentId.startsWith('sess_');
    
    if (!isPaymentCompleted) {
      return {
        statusCode: 402, // Payment Required
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Payment not completed',
          details: 'Please complete the payment process before checking status'
        })
      };
    }
    
    // If payment is verified, generate and store a token
    
    // Connect to Turso database
    if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_API_KEY) {
      throw new Error('Turso database configuration missing');
    }
    
    console.log('Connecting to Turso database...');
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_API_KEY
    });
    
    // Fetch an unused token from the database
    console.log('Fetching unused token from database...');
    
    let token;
    
    try {
      // First, try to get an existing unused token
      const result = await client.execute({
        sql: 'SELECT id, token FROM token_premium WHERE is_used = 0 LIMIT 1',
        args: []
      });
      
      console.log('Fetch result:', result);
      
      if (result.rows && result.rows.length > 0) {
        // We found an unused token, mark it as used
        const tokenId = result.rows[0].id;
        token = result.rows[0].token;
        
        console.log('Found unused token:', token, 'with ID:', tokenId);
        
        // Mark the token as used
        const updateResult = await client.execute({
          sql: 'UPDATE token_premium SET is_used = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
          args: [tokenId]
        });
        
        console.log('Marked token as used:', updateResult);
      } else {
        // No unused tokens found, generate a new one (fallback)
        console.log('No unused tokens found, generating a new one');
        token = generatePremiumToken();
        
        // Store the token in the database
        const insertResult = await client.execute({
          sql: 'INSERT INTO token_premium (token, is_used) VALUES (?, ?)',
          args: [token, 1] // Mark as used immediately since we're assigning it
        });
        
        console.log('Generated and stored new token:', token, insertResult);
      }
    } catch (dbError) {
      console.error('Database error:', dbError);
      // If there's an error with the database, generate a token but don't store it
      token = generatePremiumToken();
      console.log('Error occurred, generated fallback token:', token);
    }
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        token: token,
        message: 'Payment successful! Your premium token has been generated.'
      })
    };

  } catch (error) {
    console.error('Error checking payment status:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false,
        error: 'Failed to verify payment',
        details: error.message
      })
    };
  }
};

// Generate a unique premium token
function generatePremiumToken() {
  // Format: WOLF-XXXX-XXXX-XXXX
  const randomBytes = crypto.randomBytes(9); // 9 bytes = 18 hex characters
  const hexString = randomBytes.toString('hex').toUpperCase();
  
  // Split into groups of 4 characters
  const part1 = hexString.substring(0, 4);
  const part2 = hexString.substring(4, 8);
  const part3 = hexString.substring(8, 12);
  
  return `WOLF-${part1}-${part2}-${part3}`;
}
