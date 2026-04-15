# Whetty Frontend Setup

**Date**: April 15, 2026  
**Framework**: React + Vite  
**Amplify**: Gen 2  

## Project Structure

```
whetty/
├── amplify/              # Amplify Gen 2 backend
│   ├── auth/            # Authentication resources
│   ├── data/            # Data/API resources
│   └── backend.ts       # Backend configuration
├── frontend/            # React frontend
│   ├── public/          # Static assets
│   │   └── whetty_logo.avif
│   └── src/
│       ├── App.jsx      # Main application component
│       ├── App.css      # Application styles
│       ├── index.css    # Global styles
│       └── main.jsx     # Entry point
└── docs/                # Documentation
```

## Features Implemented

### 1. Modern Dark Theme UI
- Clean, professional design with dark color scheme
- Spotify-inspired aesthetic
- Smooth animations and transitions
- Fully responsive (mobile, tablet, desktop)

### 2. Navigation
- Three main sections:
  - **Music**: Spotify integration and streaming links
  - **Merch**: Placeholder for future merchandise store
  - **About**: Artist information

### 3. Music Section
- Spotify embed player (needs artist ID configuration)
- Social media links (Spotify, Apple Music)
- Clean, centered layout

### 4. Merch Section
- "Coming Soon" placeholder
- Ready for e-commerce integration
- Grid layout for future products

### 5. About Section
- Artist bio and information
- Simple, elegant presentation

## Current Status

✅ Frontend structure created  
✅ React + Vite setup complete  
✅ Logo integrated  
✅ Responsive design implemented  
✅ Navigation system working  
⏳ Spotify artist ID needs configuration  
⏳ Backend integration pending  
⏳ Amplify hosting setup pending  

## Development Server

The frontend is currently running on:
```
http://localhost:5173
```

### Commands

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Next Steps

### 1. Configure Spotify Integration

Update the Spotify embed URL in `frontend/src/App.jsx`:

```jsx
// Replace YOUR_ARTIST_ID with actual Spotify artist ID
src="https://open.spotify.com/embed/artist/YOUR_ARTIST_ID?utm_source=generator&theme=0"
```

**How to get Spotify Artist ID:**
1. Go to [Spotify for Artists](https://artists.spotify.com/)
2. Find your artist profile
3. Copy the artist ID from the URL
4. Or use the Spotify Web API

### 2. Update Social Links

In `frontend/src/App.jsx`, update:
- Spotify artist link
- Apple Music link
- Add other social media (Instagram, Twitter, etc.)

### 3. Integrate with Amplify Backend

```bash
# Install Amplify libraries in frontend
cd frontend
npm install aws-amplify @aws-amplify/ui-react
```

Update `frontend/src/main.jsx`:
```jsx
import { Amplify } from 'aws-amplify'
import outputs from '../../amplify_outputs.json'

Amplify.configure(outputs)
```

### 4. Set Up Amplify Hosting

#### Option A: Using Amplify CLI

```bash
# From project root
npx ampx sandbox

# Deploy to cloud
npx ampx deploy
```

#### Option B: Using Amplify Console

1. Push code to GitHub/GitLab/Bitbucket
2. Connect repository in Amplify Console
3. Configure build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - cd frontend
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: frontend/dist
       files:
         - '**/*'
     cache:
       paths:
         - frontend/node_modules/**/*
   backend:
     phases:
       build:
         commands:
           - npm ci
           - npx ampx pipeline-deploy --branch $AWS_BRANCH --app-id $AWS_APP_ID
   ```

### 5. Configure Custom Domain

Once hosted zone nameservers are propagated in Wix:

```typescript
// In amplify/backend.ts or separate hosting config
import { defineBackend } from '@aws-amplify/backend'
import * as route53 from 'aws-cdk-lib/aws-route53'

const backend = defineBackend({
  // ... existing config
})

// Reference the existing hosted zone
const hostedZone = route53.HostedZone.fromHostedZoneAttributes(
  backend.stack,
  'HostedZone',
  {
    hostedZoneId: 'Z0074500Z0GR9W4SG049',
    zoneName: 'whetty.com',
  }
)

// Custom domain will be configured through Amplify Console
// or using CDK constructs for CloudFront + Route53
```

### 6. Add E-commerce for Merch

Options:
- **Stripe**: For payment processing
- **Shopify Buy Button**: Embed Shopify products
- **AWS Amplify + DynamoDB**: Custom solution
- **Printful/Printify**: Print-on-demand integration

### 7. Add Analytics

```bash
cd frontend
npm install @aws-amplify/analytics
```

Configure in Amplify backend for:
- Page views
- User engagement
- Conversion tracking

### 8. Add Authentication (Optional)

For exclusive content or merch pre-orders:
```bash
# Already scaffolded in amplify/auth/
# Configure as needed
```

## Design Decisions

### Why This Approach?

1. **Dark Theme**: Matches music industry aesthetic, reduces eye strain
2. **Spotify Integration**: Primary music platform for most users
3. **Single Page App**: Fast, smooth navigation without page reloads
4. **Mobile-First**: Most music fans browse on mobile devices
5. **Minimal Initial Load**: Fast performance, progressive enhancement

### Color Scheme

- **Primary Background**: `#0a0a0a` - Deep black
- **Secondary Background**: `#1a1a1a` - Slightly lighter
- **Card Background**: `#252525` - Elevated surfaces
- **Accent**: `#1db954` - Spotify green
- **Text Primary**: `#ffffff` - Pure white
- **Text Secondary**: `#b3b3b3` - Muted gray

### Typography

- System fonts for fast loading
- Clear hierarchy with size and weight
- Readable line heights for body text

## Customization Guide

### Change Colors

Edit CSS variables in `frontend/src/App.css`:
```css
:root {
  --bg-primary: #0a0a0a;
  --accent: #1db954;
  /* ... etc */
}
```

### Add New Sections

1. Add navigation button in `App.jsx`
2. Create section component
3. Add to conditional rendering
4. Style in `App.css`

### Modify Layout

- Grid system in `.merch-grid`
- Flexbox for navigation and social links
- Max-width containers for readability

## Performance Considerations

- Logo uses AVIF format (modern, efficient)
- Lazy loading for Spotify iframe
- CSS animations use `transform` (GPU accelerated)
- Minimal JavaScript bundle
- Code splitting ready with Vite

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers

## Accessibility

- Semantic HTML elements
- Keyboard navigation support
- ARIA labels where needed
- High contrast ratios
- Focus indicators on interactive elements

## Security

- No sensitive data in frontend code
- Environment variables for API keys (when needed)
- HTTPS only in production
- Content Security Policy headers (configure in Amplify)

## Future Enhancements

- [ ] Email newsletter signup
- [ ] Tour dates/events section
- [ ] Music video gallery
- [ ] Blog/news section
- [ ] Fan community features
- [ ] Exclusive content for subscribers
- [ ] Live streaming integration
- [ ] Merchandise store with cart
- [ ] Social media feed integration
- [ ] SEO optimization
- [ ] PWA capabilities
- [ ] Dark/light theme toggle

## Troubleshooting

### Dev server won't start
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Logo not showing
- Check file exists: `frontend/public/whetty_logo.avif`
- Verify file permissions
- Clear browser cache

### Styles not applying
- Check CSS file imports in `main.jsx`
- Verify no CSS syntax errors
- Clear Vite cache: `rm -rf frontend/.vite`

### Build fails
```bash
cd frontend
npm run build -- --debug
```

## Resources

- [Amplify Gen 2 Docs](https://docs.amplify.aws/gen2/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Spotify Embed Generator](https://developer.spotify.com/documentation/embeds)
- [AWS Amplify Hosting](https://docs.amplify.aws/gen2/deploy-and-host/)
