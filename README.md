# URL Shortener Frontend

A Next.js application for URL shortening functionality.


## Requirements
Create a Next.js UI that allows users to:
● Enter a URL and receive a short link.
● Upload a file and receive a short link to the file.
● View their history of shortened URLs and uploaded files.

Call fast API backend 

### Not considered due to time restraints or out of scope
- Jest/Cypress tests
- Pipeline for deployment
- Internationalisation of text via i18n 

### Additional considerations taken not explicitly mentioned in task
- Mobile view
- Accessibility 

## Prerequisites
- Node.js (version 18 or later)
- npm, yarn, pnpm, or bun

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/shortener-frontend.git
   cd shortener-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

### Running the Development Server

```bash
npm run build && npm run start
# or on powershell
 npm run build; npm run start 
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.
Open [http://localhost:3000/users/username](http://localhost:3000/users/username) in your browser to see the user shortcodes. This is a dynamic route so /username can be anything
## Contributing

### Workflow

1. Fork the repository
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Commit your changes with a clear, descriptive message
5. Push to your fork and submit a pull request

### Guidelines

- Follow the existing code style
- Add tests for new features
- Ensure all tests pass before submitting a pull request
- Keep pull requests focused and concise

## Project Structure

- `src/app/`: Next.js page and route components
- `src/components/`: Reusable React components
- `src/types/`: TypeScript type definitions
- `src/utils/`: Utility functions

## Deployment

TODO: form CICD pipeline