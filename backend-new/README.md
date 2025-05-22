# Law Firm API Backend

A RESTful API backend for a law firm management system built with Node.js, Express, TypeScript, and MongoDB.

## Features

- User authentication (register, login)
- JWT-based authorization
- Role-based access control
- MongoDB database integration
- TypeScript support

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd backend-new
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/law-firm
JWT_SECRET=your-super-secret-key-change-this-in-production
```

## Development

To run the development server:

```bash
npm run dev
```

The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

## Building for Production

To build the TypeScript code:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected route)

## Error Handling

The API includes comprehensive error handling for:
- Invalid input data
- Authentication failures
- Database errors
- Server errors

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- CORS enabled
- Environment variables for sensitive data

## License

ISC 