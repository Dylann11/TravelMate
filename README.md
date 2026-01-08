# TravelMate 🚇

A user-friendly website designed to help foreign exchange students at Republic Polytechnic navigate Singapore's public transport system with confidence.

## 🎯 Project Overview

**One-Line Pitch:** Build a user-friendly website integrated with a Flowise-powered AI chatbot that displays Singapore's MRT/LRT maps, bus guides, navigation tips, and essential travel information to help foreign exchange students arriving at Republic Polytechnic easily understand and navigate Singapore's public transport system.

### Why It Matters

Foreign exchange students arriving at Republic Polytechnic often struggle to understand Singapore's public transport system, especially when navigating MRT/LRT routes, bus services, and unfamiliar travel patterns. TravelMate provides an interactive website equipped with an AI chatbot and visual transport guides, helping students quickly access accurate directions, learn how to get around confidently, and reduce the stress of adapting to a new environment.

## 🎨 Design System

### Color Palette
- **Primary Red:** `#B40000` - Used for primary actions, headings, and important elements
- **White:** `#FFFFFF` - Background and contrast color
- **Secondary Green:** `#486220` - Accents, secondary buttons, and highlights

### Design Principles
- **Accessibility First:** WCAG 2.1 AA compliant with proper contrast ratios
- **Mobile-First Responsive:** Optimized for all screen sizes
- **Clean & Intuitive:** Easy navigation for first-time users
- **Performance Optimized:** Fast loading and smooth interactions

## 🚀 Features

### Current Features
- ✅ **Responsive Navigation** - Mobile-friendly hamburger menu with smooth scrolling
- ✅ **Interactive Hero Section** - Eye-catching introduction with clear CTAs
- ✅ **Quick Start Guide** - Four key areas: MRT/LRT, Bus Services, Travel Tips, AI Chatbot
- ✅ **MRT/LRT Map Section** - Interactive map placeholder with line legend
- ✅ **Bus Guide** - Step-by-step guide for beginners
- ✅ **Travel Tips** - Essential information cards covering payments, etiquette, apps, etc.
- ✅ **AI Chatbot Integration** - Ready for Flowise chatbot embed
- ✅ **FAQ Accordion** - Common questions with expandable answers
- ✅ **Contact Section** - Hotlines, websites, and feedback options
- ✅ **Scroll Animations** - Smooth reveal animations for better UX
- ✅ **Back to Top Button** - Quick navigation for long pages
- ✅ **Accessibility Features** - Keyboard navigation, ARIA labels, skip links

### Planned Features
- 🔄 **Flowise AI Chatbot** - Integration with custom AI assistant
- 🔄 **Interactive MRT Map** - Clickable stations with details
- 🔄 **Route Planner** - Step-by-step journey planning
- 🔄 **Real-time Updates** - Bus/train timing information
- 🔄 **Multi-language Support** - Chinese, Malay, Tamil translations
- 🔄 **Progressive Web App** - Offline functionality

## 📁 Project Structure

```
TravelMate/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # All styles with CSS variables
├── js/
│   └── app.js             # JavaScript functionality
├── .vscode/
│   └── settings.json      # Live Server configuration
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Modern CSS with variables, grid, flexbox, and animations
- **JavaScript (ES6+)** - Vanilla JS with classes and modules

### Tools & Services
- **Live Server** - Development server for live reload
- **Git** - Version control
- **Flowise** - AI chatbot platform (to be integrated)
- **Font Awesome** - Icon library

## 🚦 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- [VS Code](https://code.visualstudio.com/) (recommended)
- [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for VS Code

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd TravelMate
   ```

2. **Open in VS Code**
   ```bash
   code .
   ```

3. **Start Live Server**
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Or press `Alt+L Alt+O`

4. **View in browser**
   - Navigate to `http://127.0.0.1:5500` (default port)

## 💻 JavaScript Features

### Performance Optimizations
- **Debouncing** - Limits rate of function execution for scroll/input events
- **Throttling** - Controls frequency of scroll handlers
- **Lazy Loading** - Images and content load as needed
- **Intersection Observer** - Efficient viewport detection for animations

### Interactive Features
- **Smooth Scrolling** - Native CSS scroll-behavior with JS fallback
- **Mobile Menu** - Responsive hamburger navigation
- **Scroll Animations** - Elements fade in on scroll
- **Back to Top** - Appears after scrolling 300px
- **Active Navigation** - Updates based on scroll position
- **FAQ Accordion** - Expandable question/answer sections

### Accessibility Features
- **Keyboard Navigation** - Full keyboard support
- **Focus Management** - Visible focus indicators
- **ARIA Labels** - Screen reader support
- **Skip Links** - Jump to main content
- **Semantic HTML** - Proper heading hierarchy

## 🎯 UX Design Principles

### 1. Clarity & Simplicity
- Clear visual hierarchy with consistent spacing
- Simple navigation with intuitive labels
- Concise content with actionable information

### 2. Usability
- Mobile-first responsive design
- Touch-friendly buttons (minimum 44x44px)
- Fast page load (optimized assets)
- Consistent interaction patterns

### 3. Accessibility
- WCAG 2.1 AA compliance
- Proper color contrast (4.5:1 for text)
- Keyboard navigation support
- Screen reader compatibility
- Reduced motion support for users with vestibular disorders

### 4. Visual Design
- Brand-aligned color palette
- Consistent spacing using CSS variables
- Smooth transitions and animations
- Card-based layout for scannability

### 5. Performance
- Minimal external dependencies
- Optimized CSS and JS
- Performance monitoring
- Lazy loading for images

## 🔌 Integrating Flowise Chatbot

To integrate your Flowise chatbot:

1. Get your Flowise embed code
2. Open `js/app.js`
3. Find the `ChatbotIntegration` class
4. Add your Flowise embed code in the `loadChatbot()` method:

```javascript
loadChatbot() {
    // Replace with your Flowise embed code
    const script = document.createElement('script');
    script.src = 'YOUR_FLOWISE_CHATBOT_URL';
    script.async = true;
    document.body.appendChild(script);
}
```

Alternatively, you can add the Flowise iframe directly in `index.html` in the chatbot section:

```html
<div id="flowise-chatbot">
    <!-- Add your Flowise iframe here -->
    <iframe src="YOUR_FLOWISE_URL" width="100%" height="600px"></iframe>
</div>
```

## 📱 Responsive Breakpoints

```css
/* Mobile: < 480px (default) */
/* Tablet: 481px - 768px */
@media (max-width: 768px) { ... }

/* Desktop: 769px - 1200px */
/* Large Desktop: > 1200px */
```

## 🎨 Customization

### Changing Colors
Edit CSS variables in `css/styles.css`:

```css
:root {
    --primary-color: #B40000;    /* Your primary color */
    --secondary-color: #486220;  /* Your secondary color */
    --white: #FFFFFF;            /* Background color */
}
```

### Adding New Sections
1. Add HTML in `index.html`
2. Add navigation link in the `<nav>` menu
3. Add styles in `css/styles.css`
4. Update active navigation logic in `js/app.js` if needed

## 🐛 Browser Support

- ✅ Chrome (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Edge (latest 2 versions)
- ⚠️ IE11 (not supported - requires polyfills)

## 📈 Performance Metrics

Target performance metrics:
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

## 🤝 Contributing

### Contribution Guidelines
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style
- Use 4 spaces for indentation
- Follow semantic HTML practices
- Use BEM methodology for CSS classes
- Write descriptive comments
- Keep functions small and focused

## 📝 Future Enhancements

### Phase 1 (Current)
- ✅ Basic website structure
- ✅ Responsive design
- ✅ Core content sections

### Phase 2 (Next)
- 🔄 Flowise chatbot integration
- 🔄 Interactive MRT/LRT map
- 🔄 Real-time transport data

### Phase 3 (Future)
- 🔄 User accounts & personalization
- 🔄 Multi-language support
- 🔄 Progressive Web App (PWA)
- 🔄 Push notifications for transport updates

## 📄 License

This project is created for educational purposes at Republic Polytechnic.

## 👥 Credits

**Developed for:** Republic Polytechnic Foreign Exchange Students  
**Course:** C240 - AI Essentials and Innovations  
**Year:** Year 3 Sem 1  
**Date:** January 2026

## 📞 Support

For questions or support:
- **Email:** feedback@travelmate.sg (placeholder)
- **RP Student Services:** 6510 3000

## 🙏 Acknowledgments

- Republic Polytechnic for the project opportunity
- Land Transport Authority (LTA) for transport information
- Font Awesome for icons
- Flowise for AI chatbot platform

---

**Made with ❤️ for Republic Polytechnic Exchange Students**
