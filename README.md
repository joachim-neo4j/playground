# Neo4j Aura Page

A modern React application built with Vite, showcasing the Neo4j Aura interface.

## Features

- ⚡️ Vite for fast development and builds
- ⚛️ React 18 with React Router
- 🎨 Tailwind CSS for styling
- 📱 Fully responsive design
- 🚀 GitHub Pages deployment ready

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd neo4j-aura-page
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment to GitHub Pages

The app is configured for the `playground` repository. To deploy:

1. Push to the `main` branch - GitHub Actions will automatically build and deploy.

2. Enable GitHub Pages in your repository settings:
   - Go to Settings → Pages
   - Source: GitHub Actions

Your app will be available at: `https://joachim-neo4j.github.io/playground/`

## Project Structure

```
neo4j-aura-page/
├── src/
│   ├── components/      # Reusable components (Header, Sidebar, StatusBar, Layout)
│   ├── pages/           # Page components
│   ├── assets/          # Static assets (fonts, images)
│   ├── App.jsx          # Main app component with routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Public assets
├── .github/workflows/   # GitHub Actions workflows
└── package.json
```

## Available Pages

- `/` - Get Started
- `/developer-hub` - Developer Hub
- `/instances` - Instances
- `/graph-analytics` - Graph Analytics
- `/data-apis` - Data APIs
- `/agents` - Agents
- `/import` - Import
- `/query` - Query
- `/explore` - Explore
- `/dashboards` - Dashboards
- `/operations` - Operations
- `/project` - Project
- `/learning` - Learning
- `/debug` - Debug

## Customization

### Colors

The app uses custom Neo4j blue colors defined in `tailwind.config.js`:
- `neo-blue`: #0a6190
- `neo-blue-light`: #e6f2f8
- `neo-blue-dark`: #084d73

### Fonts

- Body: Public Sans (from Google Fonts)
- Headings (h1): Syne Neo (custom font file)

## License

MIT
