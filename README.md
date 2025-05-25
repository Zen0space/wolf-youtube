# Wolf YouTube Downloader Web App

A modern web application that allows users to download the latest version of the Wolf YouTube Downloader executable from a private GitHub repository.

## Features

- 🚀 **Always Up-to-Date**: Automatically fetches the latest release from the private repository
- 📱 **Modern UI**: Beautiful, responsive interface with smooth animations
- 🔒 **Secure**: Uses GitHub Personal Access Token for private repository access
- 📊 **Release Information**: Shows version, file size, release notes, and more
- ⬇️ **Direct Download**: One-click download of the executable file

## Setup

### Prerequisites

- Node.js 18+ 
- A GitHub Personal Access Token with access to private repositories

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd wolf-youtube
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with:
```
GH_TOKEN=your_github_personal_access_token_here
```

To create a GitHub Personal Access Token:
1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select the `repo` scope for private repository access
4. Copy the generated token and add it to your `.env` file

### Development

Run the development server:
```bash
npm run dev
```

### Deployment

This app is designed to be deployed on Netlify with serverless functions.

1. Build the project:
```bash
npm run build
```

2. Deploy to Netlify and set the `GH_TOKEN` environment variable in your Netlify site settings.

## How It Works

1. **Frontend**: React app with a modern UI that displays release information
2. **Backend**: Netlify functions that:
   - Fetch the latest release from the private GitHub repository
   - Provide authenticated download access to the executable file
3. **Authentication**: Uses GitHub Personal Access Token to access private repository

## API Endpoints

- `/.netlify/functions/download-exe` - GET: Fetches release information
- `/.netlify/functions/download-file` - GET: Downloads the executable file

## Repository Structure

```
wolf-youtube/
├── src/
│   ├── components/
│   │   └── DownloaderApp.tsx    # Main download interface
│   ├── styles/
│   └── App.tsx
├── netlify/
│   └── functions/
│       ├── download-exe.js      # Fetches release info
│       └── download-file.js     # Handles file download
├── public/
└── package.json
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GH_TOKEN` | GitHub Personal Access Token with repo access | Yes |

## Security Notes

- The GitHub token is only used server-side in Netlify functions
- Private repository access is handled securely without exposing credentials to the client
- All downloads are proxied through the serverless functions for security

## License

This project is private and proprietary.
