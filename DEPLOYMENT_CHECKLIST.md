# Vercel Deployment Checklist

## Pre-Deployment Configuration Checks

### 1. Verify vercel.json Configuration

- [x] Ensure `version` is set to 2
- [x] Check that `builds` section is properly configured
  - [x] Backend server configuration is correct
  - [x] Frontend build configuration is correct
- [x] Verify `routes` are correctly mapped
- [x] Confirm environment variables are set
- [x] **IMPORTANT**: Ensure you're not using both `builds` and `functions` properties together
  - Vercel does not allow using both properties simultaneously
  - Function settings should be configured within the `builds` section using the `config` property

### 2. Backend Configuration

- [ ] Verify all required environment variables are set in Vercel dashboard
- [ ] Check database connection strings are properly configured
- [ ] Ensure API endpoints are correctly defined
- [ ] Confirm middleware is properly set up

### 3. Frontend Configuration

- [ ] Verify build script is correctly defined in package.json
- [ ] Check that API endpoints are correctly configured to point to production URLs
- [ ] Ensure static assets are properly referenced

## Common Deployment Errors and Solutions

### Error: The `functions` property cannot be used in conjunction with the `builds` property

**Solution**: Remove the `functions` property from vercel.json. Instead, configure function settings within the `builds` section using the `config` property:

```json
"builds": [
  {
    "src": "backend/server.js",
    "use": "@vercel/node",
    "config": {
      "maxDuration": 10,
      "memory": 1024
    }
  }
]
```

### Error: Invalid request: should NOT have additional property `experimental`

**Solution**: Remove the `experimental` property from vercel.json. Vercel does not allow using the `experimental` property in the configuration. If you need features like optimized function deployment or cold start prevention, check Vercel's documentation for officially supported configuration options.

### Error: Invalid request: should NOT have additional property `protection`

**Solution**: Remove the `protection` property from vercel.json. Vercel does not allow using the `protection` property in the configuration. If you need to implement security headers, check Vercel's documentation for officially supported methods to add security headers to your deployment.

### Error: Build Failed

**Possible Solutions**:
- Check build logs for specific errors
- Verify all dependencies are correctly installed
- Ensure build scripts are correctly defined in package.json

### Error: API Routes Not Working

**Possible Solutions**:
- Verify routes configuration in vercel.json
- Check that API endpoints are correctly defined
- Ensure environment variables are properly set

## Post-Deployment Checks

- [ ] Verify frontend is loading correctly
- [ ] Test API endpoints
- [ ] Check authentication flows
- [ ] Verify database connections
- [ ] Test file uploads
- [ ] Monitor error logs

## Optimization Tips

- Use the `experimental.optimizeFunctionDeployment` setting for better performance
- Enable cold start prevention for improved responsiveness
- Configure appropriate memory and duration settings for functions
- Implement security headers through the `protection` property

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [VERCEL_ERROR_GUIDE.md](./VERCEL_ERROR_GUIDE.md) - For troubleshooting specific error codes
- [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) - For detailed deployment configuration information