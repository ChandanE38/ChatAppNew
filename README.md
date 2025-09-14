# Chat App - Vercel Deployment Guide

## Overview
This is a MERN stack chat application with real-time messaging using Socket.io. This guide will help you deploy the application to Vercel.

## Deployment Steps

### 1. Set Up Vercel Account
- Create a Vercel account at [vercel.com](https://vercel.com) if you don't have one
- Install the Vercel CLI: `npm install -g vercel`

### 2. Configure Environment Variables
In your Vercel project settings, add the following environment variables:

- `JWT_SECRET`: Your JWT secret key
- `MONGO_DB_URL`: Your MongoDB connection string
- `NODE_ENV`: Set to `production`

### 3. Deploy to Vercel

```bash
# Login to Vercel
vercel login

# Deploy from the project root
vercel
```

### 4. Troubleshooting Common Vercel Errors

#### DEPLOYMENT_NOT_FOUND (Deployment404)
- Ensure your project is properly linked to Vercel
- Check if the deployment was deleted or if you're accessing the wrong URL

#### DEPLOYMENT_NOT_READY_REDIRECTING (Deployment303)
- The deployment is still in progress, wait a few minutes

#### CORS Issues
- The application has been configured to handle CORS for Vercel domains
- If you're using a custom domain, add it to the allowed origins in `backend/server.js`

#### Socket Connection Issues
- Socket connections are now configured to work in both development and production environments
- Check browser console for any socket connection errors

#### FUNCTION_INVOCATION_TIMEOUT (Function504)
- This can happen if your MongoDB connection is slow or failing
- Ensure your MongoDB instance is accessible from Vercel's servers

## Project Structure

```
├── backend/           # Express server
├── frontend/          # React application
├── vercel.json        # Vercel configuration
├── .env               # Local environment variables
└── .env.production    # Production environment variables
```

## Local Development

```bash
# Start backend server
npm run server

# Start frontend development server
cd frontend
npm run dev
```

## Additional Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Troubleshooting Vercel Deployments](https://vercel.com/docs/error-handling)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)