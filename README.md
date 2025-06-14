# Mlima Connect

A farmer-focused web application connecting Ugandan farmers with resources, markets, and support.

## Features

- **Responsive Design**: Works on all devices
- **Contact Form**: For farmers to reach out
- **Agent Signup**: For agricultural agents to register
- **Secure Backend**: Built with Node.js and Express
- **Modern Frontend**: Using Bootstrap 5

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mlima-connect.git
   cd mlima-connect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Then edit the `.env` file with your configuration.

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

## Project Structure

```
mlima-connect/
├── public/                 # Static files (HTML, CSS, JS, images)
│   ├── css/               # Stylesheets
│   ├── js/                 # Client-side JavaScript
│   └── uploads/            # User uploads
├── src/
│   ├── config/           # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Database models
│   ├── routes/             # Route definitions
│   ├── services/           # Business logic
│   └── utils/              # Utility classes and functions
├── .env.example           # Example environment variables
├── .gitignore             # Git ignore file
├── package.json           # Project metadata and dependencies
└── server.js              # Application entry point
```

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with hot-reload
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests (coming soon)

## Environment Variables

See `.env.example` for all available environment variables.

## Deployment

### Render.com

1. Push your code to a GitHub repository
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Set the following environment variables in the Render dashboard:
   - `NODE_ENV=production`
   - `PORT=10000`
   - Other required variables from `.env.example`
5. Deploy!

## Built With

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express](https://expressjs.com/) - Web framework
- [Bootstrap 5](https://getbootstrap.com/) - CSS framework
- [Render](https://render.com/) - Cloud platform

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- All the farmers and agricultural experts who provided valuable feedback
- The open-source community for amazing tools and libraries
