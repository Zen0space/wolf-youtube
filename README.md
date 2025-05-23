# 📺 YouTube Video Info Tool

A modern React TypeScript application that provides detailed information about YouTube videos. Built with styled-components and designed for Netlify deployment with serverless functions. **This tool is for educational and research purposes only.**

## ✨ Features

- 📋 Get detailed video information (title, duration, uploader, etc.)
- 🎥 Analyze available video formats and qualities
- 🎵 Display audio format options
- 📊 Beautiful responsive UI with styled-components
- 🎯 TypeScript for type safety
- ⚡ Vite for fast development
- 🚀 Netlify-ready with serverless functions
- ✅ **Compliant with YouTube's Terms of Service**

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser and go to `http://localhost:5173`**

### Netlify Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Deploy!

## 🎯 Usage

1. Enter a YouTube URL in the input field
2. Click **"Get Video Information"** to analyze the video
3. View detailed information including:
   - Video metadata (title, channel, duration, views)
   - Available video quality options
   - Available audio format options
   - Video thumbnail
   - Upload date and other details

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Styled Components** - CSS-in-JS styling

### Backend (Serverless)
- **Netlify Functions** - Serverless backend
- **ytdl-core** - YouTube video information extraction

## 📁 Project Structure

```
youtube-info-tool/
├── src/
│   ├── components/
│   │   └── YouTubeDownloader.tsx    # Main info tool component
│   ├── styles/
│   │   └── GlobalStyles.ts          # Global styles
│   ├── App.tsx                      # Main app component
│   └── main.tsx                     # Entry point
├── netlify/
│   └── functions/
│       └── video-info.js            # Video info extraction function
├── netlify.toml                     # Netlify configuration
├── package.json                     # Dependencies
└── README.md
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🔧 API Endpoint

- `/.netlify/functions/video-info` - Get video information and available formats

## 📋 Information Provided

### Video Metadata
- Title and description
- Channel/uploader name
- Duration and view count
- Upload date
- Video thumbnail

### Format Analysis
- Available video qualities (1080p, 720p, 480p, etc.)
- Audio format options
- File size information when available
- Container formats (mp4, webm, etc.)

## ⚖️ Legal Compliance

This tool is designed to be **fully compliant** with:
- ✅ YouTube's Terms of Service
- ✅ Netlify's Terms of Service
- ✅ Copyright laws

**What this tool does:**
- Extracts publicly available metadata
- Analyzes format information
- Provides educational insights

**What this tool does NOT do:**
- Download copyrighted content
- Violate YouTube's API terms
- Store or redistribute video files

## 🚀 Deployment

### Netlify Deployment (Recommended)

1. **Fork/Clone this repository**
2. **Connect to Netlify:**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "New site from Git"
   - Select your repository
   - Build settings are automatically detected from `netlify.toml`
3. **Deploy!**

## 🔧 Configuration

The `netlify.toml` file handles:
- Build settings
- Function configuration  
- API route redirects
- CORS headers

## 🎨 Features

- **Responsive Design** - Works on all devices
- **Dark/Light Theme** - Automatic theme detection
- **Fast Loading** - Optimized performance
- **Error Handling** - Graceful error messages
- **Progress Indicators** - Visual feedback during analysis

## 🐛 Troubleshooting

**Common Issues:**

1. **Invalid URL**: Make sure you're using a valid YouTube video URL
2. **No information found**: Some videos may have restricted metadata
3. **Loading issues**: Check your internet connection

## 📖 Educational Use Cases

This tool is perfect for:
- **Researchers** studying video format distribution
- **Developers** learning about video streaming technologies
- **Students** understanding digital media formats
- **Content creators** analyzing video specifications

## 📄 License

MIT License - This project is for educational and research purposes only.
