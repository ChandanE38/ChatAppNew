# Vercel Deployment Configuration

## Optimized Settings

The deployment configuration for this MERN stack application has been optimized with the following settings:

### Function CPU and Memory

- **CPU**: Standard (1 vCPU)
- **Memory**: 1024 MB (1 GB)
- **Max Duration**: 10 seconds

These settings provide a balance between performance and cost efficiency for the backend server.

> **Important Note**: Function settings are configured within the `builds` section rather than using a separate `functions` property. Vercel does not allow using both `builds` and `functions` properties together in the same configuration.

### Cold Start Prevention

Cold start prevention is recommended to improve the responsiveness of the application, especially after periods of inactivity. This ensures that users experience minimal latency when accessing the application.

> **Note**: Previously, we used the `experimental` property for cold start prevention, but this is no longer supported by Vercel. Please refer to Vercel's official documentation for current methods to optimize cold starts.

### Deployment Protection

Standard protection has been enabled with the following security headers:

- **X-Frame-Options**: DENY (Prevents clickjacking attacks)
- **X-Content-Type-Options**: nosniff (Prevents MIME type sniffing)
- **Referrer-Policy**: strict-origin-when-cross-origin (Controls referrer information)
- **Content-Security-Policy**: Restricts resources that can be loaded

```json
"protection": {
  "standard": true,
  "headers": {
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://*.vercel.app;"
  }
}
```

## Build Configuration

The application uses the following build configuration:

- **Backend**: Uses `@vercel/node` for server-side rendering
- **Frontend**: Uses `@vercel/static-build` with the output directory set to `dist`

## Routes

The following routes are configured:

- `/api/*`: Directed to the backend server
- `/uploads/*`: Directed to the backend server for file uploads
- `/*`: Directed to the frontend static files

## Environment Variables

The application is configured to run in production mode:

```json
"env": {
  "NODE_ENV": "production"
}
```

## Monitoring and Optimization

To further optimize your deployment, consider monitoring the following metrics in the Vercel dashboard:

- Function execution time
- Memory usage
- Cold start frequency
- Error rates

Adjust the configuration as needed based on these metrics to balance performance and cost.