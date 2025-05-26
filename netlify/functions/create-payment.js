const { createClient } = require('@libsql/client');

exports.handler = async (event, context) => {
  console.log('Create payment function called:', event.httpMethod);
  
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Use Stripe MCP to create a payment link with success and cancel URLs
    // This is a simplified version that uses a pre-created price ID
    const priceId = 'price_1RSyPkJz2f0nYpSKBtQFL0kI';
    
    // Get the host from the request headers
    const host = event.headers.host || 'localhost:8888';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    
    // Create success and cancel URLs
    const successUrl = `${protocol}://${host}/payment-success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${protocol}://${host}/payment-cancel`;
    
    console.log('Creating payment with success URL:', successUrl);
    
    // In a real implementation, we would create a Stripe Checkout session with these URLs
    // For now, we'll use the pre-created payment link and append our success URL as a query parameter
    const paymentLinkUrl = `https://buy.stripe.com/8x2aEYd0ueCZ05w1rhgnK01?redirect_success_url=${encodeURIComponent(successUrl)}`;
    
    // Generate a unique session ID to track this payment
    const sessionId = 'sess_' + Math.random().toString(36).substring(2, 15);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        url: paymentLinkUrl,
        id: sessionId,
        successUrl: successUrl,
        cancelUrl: cancelUrl
      })
    };

  } catch (error) {
    console.error('Error creating payment:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to create payment',
        details: error.message
      })
    };
  }
};
