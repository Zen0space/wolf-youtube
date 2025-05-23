# 🎬 YouTube Downloader

A modern React TypeScript application with styled-components for downloading YouTube videos and audio files using `youtube-dl-exec` and `@ffmpeg-installer/ffmpeg`. Designed for Netlify deployment with serverless functions.

## ✨ Features

- 🎥 Download YouTube videos in MP4 format with quality selection
- 🎵 Extract audio in MP3 format with quality options
- 📋 Get detailed video information (title, duration, uploader, etc.)
- 🎯 Multiple quality options for both video and audio
- 📊 Real-time download progress
- 💅 Beautiful UI with styled-components
- 🎯 TypeScript for type safety
- ⚡ Vite for fast development
- 🚀 Netlify-ready with serverless functions

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
2. Click **"Get Video Info & Quality Options"** to fetch available formats
3. Select your preferred quality from the dropdown menus
4. Choose your action:
   - **🎥 Generate MP4 Link**: Create download link for video
   - **🎵 Generate MP3 Link**: Create download link for audio
5. Click the **"📥 Download File"** button to download

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Styled Components** - CSS-in-JS styling

### Backend (Serverless)
- **Netlify Functions** - Serverless backend
- **youtube-dl-exec** - YouTube downloading
- **@ffmpeg-installer/ffmpeg** - Video/audio processing

## 📁 Project Structure

```
wolf-youtube/
├── src/
│   ├── components/
│   │   └── YouTubeDownloader.tsx    # Main downloader component
│   ├── styles/
│   │   └── GlobalStyles.ts          # Global styles with width 100%
│   ├── App.tsx                      # Main app component
│   └── main.tsx                     # Entry point
├── netlify/
│   └── functions/
│       ├── video-info.js            # Get video info and formats
│       └── download.js              # Generate download links
├── netlify.toml                     # Netlify configuration
├── package.json                     # Dependencies
├── vite.config.ts                   # Vite configuration
└── README.md
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🔧 Netlify Functions

- `/.netlify/functions/video-info` - Get video information and available formats
- `/.netlify/functions/download` - Generate download links for selected quality

## 🎨 Quality Selection

The app now supports quality selection for both video and audio:

### Video Qualities
- Multiple resolution options (1080p, 720p, 480p, etc.)
- File size information when available
- Format information (mp4, webm, etc.)

### Audio Qualities
- Various bitrate options
- Different audio formats
- Quality indicators

## ⚠️ Important Notes

- **Download Method**: The app generates direct download links rather than storing files on the server (perfect for serverless)
- **Netlify Compatibility**: Uses serverless functions instead of a traditional server
- **File Downloads**: Right-click the download button and select "Save As" to download files
- **Quality Selection**: Always get video info first to see available quality options

## 🚀 Deployment

### Netlify Deployment (Recommended)

1. **Fork/Clone this repository**
2. **Connect to Netlify:**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "New site from Git"
   - Select your repository
   - Build settings are automatically detected from `netlify.toml`
3. **Deploy!**

### Manual Deployment

```bash
# Build the project
npm run build

# The dist/ folder contains the built application
# Upload the entire project (including netlify/ folder) to Netlify
```

## 🔧 Configuration

The `netlify.toml` file handles:
- Build settings
- Function configuration  
- Redirects for API routes
- CORS headers

## 🐛 Troubleshooting

**Common Issues:**

1. **Functions not working**: Make sure `netlify.toml` is in the root directory
2. **CORS errors**: Check that headers are properly set in Netlify configuration
3. **Download fails**: Verify the YouTube URL is valid and accessible
4. **No quality options**: Some videos may have limited format availability

## 📄 License

MIT License - feel free to use this project for learning and development!
