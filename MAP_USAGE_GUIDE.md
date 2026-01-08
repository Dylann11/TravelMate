# Interactive MRT Map - Usage Guide

## 🗺️ Features Implemented

Your TravelMate website now has a fully interactive Singapore MRT/LRT map with the following features:

### ✨ Core Features

1. **SVG Map Display**
   - High-quality vector graphics from `Resource/Singapore_MRT_and_LRT_System_Map.svg`
   - Scalable without quality loss
   - Fast loading and responsive

2. **Zoom Controls**
   - **Zoom In (+)** - Increase map size up to 3x
   - **Zoom Out (-)** - Decrease map size down to 0.5x
   - **Reset (↻)** - Return to original view
   - **Fullscreen (⛶)** - Toggle fullscreen mode

3. **Pan/Drag Navigation**
   - Click and drag to move around the map
   - Touch support for mobile devices
   - Smooth scrolling experience

4. **Interactive Stations**
   - Hover over stations to see tooltips with station names
   - Stations highlight on hover (changes to red)
   - Click stations for detailed information

5. **Mouse Wheel Zoom**
   - Scroll up to zoom in
   - Scroll down to zoom out
   - Precise zoom control

## 🎮 How to Use

### Desktop Controls:
- **Pan**: Click and drag anywhere on the map
- **Zoom**: Use mouse wheel or click +/- buttons
- **Reset**: Click the reset button to return to default view
- **Fullscreen**: Click fullscreen button for immersive experience
- **Station Info**: Hover over stations for tooltips, click for details

### Mobile/Touch Controls:
- **Pan**: Touch and drag with one finger
- **Zoom**: Use zoom buttons at the top
- **Station Info**: Tap on stations

### Keyboard Shortcuts (for accessibility):
- **Tab**: Navigate between zoom controls
- **Enter/Space**: Activate buttons
- **Escape**: Exit fullscreen

## 🛠️ Technical Details

### Files Modified:

1. **index.html**
   - Added map controls (zoom in/out, reset, fullscreen)
   - Embedded SVG using `<object>` tag for interactivity
   - Added tooltip element for station information

2. **css/styles.css**
   - Map wrapper with grab cursor for panning
   - Interactive buttons with hover effects
   - Tooltip styling with smooth transitions
   - Fullscreen mode support
   - Responsive design for mobile

3. **js/app.js**
   - Complete `MRTMapInteraction` class with:
     - Zoom functionality (0.5x to 3x)
     - Pan/drag with mouse and touch support
     - SVG element detection and interaction
     - Tooltip management
     - Fullscreen API integration

## 🎨 Customization Options

### Changing Station Hover Color:
Edit [js/app.js](js/app.js), line ~430:
```javascript
station.style.fill = '#B40000'; // Change to your preferred color
```

### Adjusting Zoom Limits:
Edit [js/app.js](js/app.js), lines ~350-352:
```javascript
this.minScale = 0.5;  // Minimum zoom (50%)
this.maxScale = 3;    // Maximum zoom (300%)
```

### Customizing Tooltip Appearance:
Edit [css/styles.css](css/styles.css), `.station-tooltip` class:
```css
.station-tooltip {
    background: var(--gray-dark);  /* Background color */
    color: var(--white);           /* Text color */
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
}
```

## 🔧 Extending Functionality

### Adding Station Details Modal:

Replace the `handleStationClick` method in [js/app.js](js/app.js):

```javascript
handleStationClick(station) {
    const stationName = station.getAttribute('id') || 
                       station.textContent || 
                       'Unknown Station';
    
    // Create and show a modal with station details
    this.showStationModal({
        name: stationName,
        lines: this.getConnectedLines(stationName),
        exits: this.getExitInfo(stationName),
        nearbyAttractions: this.getNearbyPlaces(stationName)
    });
}
```

### Adding Search Functionality:

```javascript
searchStation(query) {
    const svgDoc = this.mapObject.contentDocument;
    const stations = svgDoc.querySelectorAll('circle, text, g[id*="station"]');
    
    stations.forEach(station => {
        const name = station.getAttribute('id') || station.textContent;
        if (name.toLowerCase().includes(query.toLowerCase())) {
            this.highlightStation(station);
            this.centerOnStation(station);
        }
    });
}
```

### Connecting to Real-Time Data:

```javascript
async updateStationStatus() {
    try {
        const response = await fetch('https://api.example.com/station-status');
        const data = await response.json();
        
        data.forEach(station => {
            if (station.disruption) {
                this.markStationDisrupted(station.id);
            }
        });
    } catch (error) {
        console.error('Failed to fetch station status:', error);
    }
}
```

## 📱 Mobile Optimization

The map is fully responsive and includes:
- Touch-friendly zoom controls (44x44px minimum)
- Smooth touch panning
- Prevents default scroll behavior during map interaction
- Adaptive layout for small screens

## 🐛 Troubleshooting

### Map not loading?
1. Check that the SVG file exists at `Resource/Singapore_MRT_and_LRT_System_Map.svg`
2. Open browser console (F12) to check for errors
3. Ensure you're using a modern browser (Chrome, Firefox, Safari, Edge)

### Stations not interactive?
1. The SVG needs to load first (check console for "Initialized X interactive station elements")
2. Ensure the SVG has `<circle>` or `<text>` elements with IDs
3. Check if the SVG is embedded correctly (using `<object>` tag)

### Tooltip not showing?
1. Check that `#station-tooltip` element exists in HTML
2. Verify CSS is loaded properly
3. Test with browser dev tools to see if tooltip is being positioned

### Performance issues?
1. Check SVG file size (optimize if > 5MB)
2. Reduce number of interactive elements
3. Add debouncing to pan events:
   ```javascript
   this.pan = debounce((event) => { /* pan logic */ }, 16);
   ```

## 🚀 Next Steps

1. **Add Station Database**
   - Create JSON file with station details
   - Include exit information, facilities, nearby attractions

2. **Implement Route Planning**
   - Allow users to select start/end stations
   - Calculate shortest path
   - Highlight route on map

3. **Real-Time Integration**
   - Connect to LTA DataMall API
   - Show train arrival times
   - Display service disruptions

4. **Search Feature**
   - Add search bar above map
   - Filter and highlight stations
   - Auto-zoom to searched location

5. **Favorites System**
   - Let users save favorite stations
   - Quick access to common routes
   - Store in localStorage

## 📚 Resources

- [SVG Interactivity Guide](https://developer.mozilla.org/en-US/docs/Web/SVG)
- [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)
- [Touch Events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)
- [LTA DataMall API](https://datamall.lta.gov.sg/content/datamall/en.html)

## ✅ Testing Checklist

- [ ] Map loads correctly on desktop
- [ ] Map loads correctly on mobile
- [ ] Zoom in/out works smoothly
- [ ] Pan/drag functionality works
- [ ] Fullscreen mode activates
- [ ] Stations show tooltips on hover
- [ ] Station click shows information
- [ ] Touch gestures work on mobile
- [ ] Map resets to default view
- [ ] No console errors

---

**Enjoy your interactive MRT map! 🚇✨**
