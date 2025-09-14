# Vercel Error Handling Guide

This guide provides information about common Vercel error codes, their meanings, and troubleshooting steps to resolve them.

## Error Categories

### Function Errors

| Error Code | HTTP Status | Description | Troubleshooting |
|------------|-------------|-------------|----------------|
| BODY_NOT_A_STRING_FROM_FUNCTION | 502 | Function returned a non-string body | Ensure your function returns a proper string response |
| EDGE_FUNCTION_INVOCATION_FAILED | 500 | Edge function execution failed | Check logs for runtime errors in your edge function |
| EDGE_FUNCTION_INVOCATION_TIMEOUT | 504 | Edge function timed out | Optimize your edge function or increase timeout limit |
| FUNCTION_INVOCATION_FAILED | 500 | Serverless function execution failed | Check function logs for runtime errors |
| FUNCTION_INVOCATION_TIMEOUT | 504 | Serverless function timed out | Optimize your function or increase timeout in vercel.json |
| FUNCTION_PAYLOAD_TOO_LARGE | 413 | Request body too large for function | Reduce payload size or use streaming for large data |
| FUNCTION_RESPONSE_PAYLOAD_TOO_LARGE | 500 | Function response too large | Reduce response size or use streaming for large responses |
| FUNCTION_THROTTLED | 503 | Function rate limited | Upgrade your plan or optimize function usage |
| MIDDLEWARE_INVOCATION_FAILED | 500 | Middleware execution failed | Check middleware logs for runtime errors |
| MIDDLEWARE_INVOCATION_TIMEOUT | 504 | Middleware timed out | Optimize your middleware code |
| NO_RESPONSE_FROM_FUNCTION | 502 | Function did not return a response | Ensure your function always returns a response |
| MICROFRONTENDS_MIDDLEWARE_ERROR | 500 | Error in microfrontends middleware | Check microfrontends configuration and middleware |

### Deployment Errors

| Error Code | HTTP Status | Description | Troubleshooting |
|------------|-------------|-------------|----------------|
| DEPLOYMENT_BLOCKED | 403 | Deployment access blocked | Check team permissions or payment status |
| DEPLOYMENT_DELETED | 410 | Deployment has been deleted | Deploy a new version of your project |
| DEPLOYMENT_DISABLED | 402 | Deployment disabled (payment required) | Update payment information |
| DEPLOYMENT_NOT_FOUND | 404 | Deployment not found | Verify deployment URL or redeploy your project |
| DEPLOYMENT_NOT_READY_REDIRECTING | 303 | Deployment still initializing | Wait for deployment to complete |
| DEPLOYMENT_PAUSED | 503 | Deployment is paused | Resume the deployment in Vercel dashboard |
| NOT_FOUND | 404 | Resource not found | Check URL path and ensure resources exist |

### DNS Errors

| Error Code | HTTP Status | Description | Troubleshooting |
|------------|-------------|-------------|----------------|
| DNS_HOSTNAME_EMPTY | 502 | Empty hostname in DNS configuration | Add a valid hostname to your DNS configuration |
| DNS_HOSTNAME_NOT_FOUND | 502 | Hostname not found in DNS | Verify DNS configuration and domain settings |
| DNS_HOSTNAME_RESOLVE_FAILED | 502 | Failed to resolve hostname | Check DNS provider and configuration |
| DNS_HOSTNAME_RESOLVED_PRIVATE | 404 | Hostname resolved to private IP | Use public IP addresses in your DNS configuration |
| DNS_HOSTNAME_SERVER_ERROR | 502 | DNS server error | Contact your DNS provider |

### Image Optimization Errors

| Error Code | HTTP Status | Description | Troubleshooting |
|------------|-------------|-------------|----------------|
| INVALID_IMAGE_OPTIMIZE_REQUEST | 400 | Invalid image optimization request | Check image URL and parameters |
| OPTIMIZED_EXTERNAL_IMAGE_REQUEST_FAILED | 502 | Failed to fetch external image | Verify external image URL is accessible |
| OPTIMIZED_EXTERNAL_IMAGE_REQUEST_INVALID | 502 | Invalid external image request | Check external image URL format |
| OPTIMIZED_EXTERNAL_IMAGE_REQUEST_UNAUTHORIZED | 502 | Unauthorized external image request | Ensure external image doesn't require authentication |
| OPTIMIZED_EXTERNAL_IMAGE_TOO_MANY_REDIRECTS | 502 | Too many redirects for external image | Fix redirect chain for external image |

### Request Errors

| Error Code | HTTP Status | Description | Troubleshooting |
|------------|-------------|-------------|----------------|
| INVALID_REQUEST_METHOD | 405 | Method not allowed | Use correct HTTP method for the endpoint |
| MALFORMED_REQUEST_HEADER | 400 | Malformed request header | Fix request headers format |
| REQUEST_HEADER_TOO_LARGE | 431 | Request header too large | Reduce header size |
| RESOURCE_NOT_FOUND | 404 | Resource not found | Check URL path and ensure resources exist |
| URL_TOO_LONG | 414 | URL too long | Shorten URL or use POST with body instead |
| RANGE_* errors | 416 | Invalid range request | Fix range request headers |

### Routing Errors

| Error Code | HTTP Status | Description | Troubleshooting |
|------------|-------------|-------------|----------------|
| ROUTER_CANNOT_MATCH | 502 | Router cannot match path | Check routes configuration in vercel.json |
| ROUTER_EXTERNAL_TARGET_CONNECTION_ERROR | 502 | Cannot connect to external target | Verify external target is accessible |
| ROUTER_EXTERNAL_TARGET_ERROR | 502 | Error from external target | Check external target logs |
| ROUTER_EXTERNAL_TARGET_HANDSHAKE_ERROR | 502 | Handshake error with external target | Check SSL/TLS configuration |
| ROUTER_TOO_MANY_HAS_SELECTIONS | 502 | Too many has selections in router | Simplify routing rules |
| TOO_MANY_FILESYSTEM_CHECKS | 502 | Too many filesystem checks | Optimize routing configuration |
| TOO_MANY_FORKS | 502 | Too many process forks | Optimize serverless functions |

### Runtime Errors

| Error Code | HTTP Status | Description | Troubleshooting |
|------------|-------------|-------------|----------------|
| INFINITE_LOOP_DETECTED | 508 | Infinite loop detected | Fix recursive logic in your code |
| MIDDLEWARE_RUNTIME_DEPRECATED | 503 | Middleware runtime deprecated | Update to latest middleware version |

### Sandbox Errors

| Error Code | HTTP Status | Description | Troubleshooting |
|------------|-------------|-------------|----------------|
| SANDBOX_NOT_FOUND | 404 | Sandbox not found | Redeploy your project |
| SANDBOX_NOT_LISTENING | 502 | Sandbox not listening | Check for startup errors in your application |
| SANDBOX_STOPPED | 410 | Sandbox stopped | Restart your development environment |

### Cache Errors

| Error Code | HTTP Status | Description | Troubleshooting |
|------------|-------------|-------------|----------------|
| FALLBACK_BODY_TOO_LARGE | 502 | Fallback body too large for cache | Reduce fallback response size |

## Platform Errors

The following errors are related to the Vercel platform itself. If you encounter these errors, contact Vercel support:

- FUNCTION_THROTTLED (500)
- INTERNAL_CACHE_ERROR (500)
- INTERNAL_CACHE_KEY_TOO_LONG (500)
- INTERNAL_CACHE_LOCK_FULL (500)
- INTERNAL_CACHE_LOCK_TIMEOUT (500)
- INTERNAL_DEPLOYMENT_FETCH_FAILED (500)
- INTERNAL_EDGE_FUNCTION_INVOCATION_FAILED (500)
- INTERNAL_EDGE_FUNCTION_INVOCATION_TIMEOUT (500)
- INTERNAL_FUNCTION_INVOCATION_FAILED (500)
- INTERNAL_FUNCTION_INVOCATION_TIMEOUT (500)
- INTERNAL_FUNCTION_NOT_FOUND (500)
- INTERNAL_FUNCTION_NOT_READY (500)
- INTERNAL_FUNCTION_SERVICE_UNAVAILABLE (500)
- INTERNAL_MICROFRONTENDS_BUILD_ERROR (500)
- INTERNAL_MICROFRONTENDS_INVALID_CONFIGURATION_ERROR (500)
- INTERNAL_MICROFRONTENDS_UNEXPECTED_ERROR (500)
- INTERNAL_MISSING_RESPONSE_FROM_CACHE (500)
- INTERNAL_OPTIMIZED_IMAGE_REQUEST_FAILED (500)
- INTERNAL_ROUTER_CANNOT_PARSE_PATH (500)
- INTERNAL_STATIC_REQUEST_FAILED (500)
- INTERNAL_UNARCHIVE_FAILED (500)
- INTERNAL_UNEXPECTED_ERROR (500)

## Debugging Best Practices

### 1. Check Vercel Logs

Always start by checking your deployment logs in the Vercel dashboard:

1. Go to your project in the Vercel dashboard
2. Navigate to the "Deployments" tab
3. Select the problematic deployment
4. Click on "View Logs"

### 2. Local Development Testing

Test your application locally before deploying:

```bash
vercel dev
```

This helps identify issues before they reach production.

### 3. Environment Variables

Verify that all required environment variables are properly set in the Vercel dashboard.

### 4. Function Optimization

For function-related errors:

- Reduce function size and dependencies
- Optimize database queries
- Implement proper error handling
- Add timeouts to external API calls

### 5. Deployment Configuration

Ensure your `vercel.json` is properly configured:

```json
{
  "version": 2,
  "builds": [...],
  "routes": [...],
  "functions": {
    "api/*.js": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```

### 6. Common Fixes for Specific Errors

#### DEPLOYMENT_NOT_FOUND (404)

- Verify the deployment URL
- Check if the deployment was deleted
- Redeploy your application

#### FUNCTION_INVOCATION_TIMEOUT (504)

- Increase function timeout in `vercel.json`
- Optimize function code
- Consider breaking down complex functions

#### FUNCTION_PAYLOAD_TOO_LARGE (413)

- Reduce request payload size
- Use streaming for large data
- Implement pagination

#### ROUTER_CANNOT_MATCH (502)

- Check routes configuration in `vercel.json`
- Ensure route patterns are correct
- Verify destination paths exist

## Getting Help

If you've tried the troubleshooting steps and still encounter issues:

1. Check [Vercel Documentation](https://vercel.com/docs)
2. Search [Vercel GitHub Issues](https://github.com/vercel/vercel/issues)
3. Ask on [Vercel Community](https://github.com/vercel/community)
4. Contact [Vercel Support](https://vercel.com/support)