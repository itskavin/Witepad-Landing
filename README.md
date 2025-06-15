# Witepad Landing Page

This is the landing page for Witepad, separated from the main application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env.local` file with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Run the development server:
```bash
npm run dev
```

The landing page will be available at `http://localhost:3000`

## Build

To build for production:
```bash
npm run build
```

## Features

- Modern landing page with hero section
- Authentication dialog
- Responsive design
- Dark theme optimized
- Connects authenticated users to the main app

## Main App Integration

When users sign in through the landing page, they are redirected to the main Witepad application running on `http://localhost:8080`.
