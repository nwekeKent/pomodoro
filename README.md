# Pomodoro Timer App

This is a [Next.js](https://nextjs.org) project that implements a Pomodoro Timer to help with productivity and time management.

## Features

- **Multiple Timer Modes:**

  - Pomodoro Mode (default: 25 minutes)
  - Short Break (default: 5 minutes)
  - Long Break (default: 15 minutes)

- **Customization Options:**

  - Adjustable timer durations for each mode
  - Customizable fonts
  - Color scheme preferences

- **Timer Controls:**
  - Start/Pause functionality
  - Mode switching
  - Visual countdown display

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customization

### Timer Duration

Users can modify the default duration for each timer mode:

- Pomodoro: 1-60 minutes
- Short Break: 1-30 minutes
- Long Break: 1-60 minutes

### Themes

The app includes multiple built-in themes that affect the overall appearance:

- Custom color schemes

### Fonts

Choose from various font options to personalize your timer display.

## Project Structure

- `components/Timer.tsx` - Main timer component with mode switching and time display
- `app/page.tsx` - Main page layout and timer integration

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS for styling

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
