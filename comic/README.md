# Comic-Style Blog Website

This folder contains the interactive website built to showcase the GitHub Actions + Bicep automation workflow in a comic book style.

## Overview

An interactive blog/tutorial website featuring:
- **Tech Zine / Digital Comic Book** design aesthetic
- Roberto character and all infographics integrated
- Interactive workflow demo with step-by-step animation
- Code viewer with tabbed YAML and Bicep examples
- Fully responsive design with playful animations

## Design Style

- **Colors**: Vibrant purple, orange, blue, and green matching the infographics
- **Typography**: Bangers (display), Inter (body), JetBrains Mono (code)
- **Layout**: Asymmetric comic panel layouts with diagonal sections
- **Elements**: Dashed borders, thick outlines (3-4px), comic-style speech bubbles

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Routing**: Wouter
- **Build**: Vite

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm

### Installation

```bash
cd comic
pnpm install
```

### Development

```bash
pnpm dev
```

The site will be available at `http://localhost:3000`

### Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## Project Structure

```
comic/
├── client/
│   ├── public/
│   │   └── images/          # All infographic images
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/          # shadcn/ui components
│   │   │   ├── WorkflowDemo.tsx    # Interactive demo
│   │   │   └── CodeViewer.tsx      # Code display component
│   │   ├── pages/
│   │   │   └── Home.tsx     # Main page
│   │   ├── App.tsx          # App root
│   │   └── index.css        # Global styles + theme
│   └── index.html
├── server/                   # Static server (placeholder)
├── shared/                   # Shared types
└── package.json
```

## Features

### Interactive Workflow Demo
- Step-by-step animation of the deployment process
- Visual progress indicators
- Code snippets for each step
- Reset and replay functionality

### Code Viewer
- Tabbed interface for YAML and Bicep files
- Syntax highlighting
- Copy to clipboard functionality
- Responsive design

### Infographics Display
- All 5 custom infographics embedded
- Comic-style borders and shadows
- Responsive image sizing

## Deployment

This is a static site that can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

Simply build the project and deploy the `dist` folder.

## Author

Created by **Roberto** ([@soyroberto](https://github.com/soyroberto))

## License

Open source and available for use and modification.
