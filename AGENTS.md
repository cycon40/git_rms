## UI Design Directive: Aesthetic Excellence Standards
Agents producing or modifying any UI-facing asset (static designs, generated components, or runtime styling) must follow these standards so the factory outputs consistently honor the Lean H2 experience.

### Core Design Philosophy
Create interfaces that embody visual harmony through systematic application of color theory, mathematical proportions, and deliberate spatial relationships. Every UI element must serve both functional and aesthetic purposes.

### Color Palette Architecture

#### Primary Background Colors
- **Deep Navy**: `#0A1628` or `#0D1B2A` - Foundation color providing psychological stability and reducing eye strain
- **Rich Charcoal**: `#1A1D29` or `#161B22` - Alternative for warmer undertones
- **Slate Blue**: `#1E2A3A` - For sections requiring subtle differentiation

#### Accent Color Systems

##### System 1: Complementary Harmony (High Contrast)
- **Primary Accent**: `#FF6B35` (Vibrant Coral) - CTAs, primary actions
- **Secondary Accent**: `#4ECDC4` (Turquoise) - Success states, confirmations
- **Usage**: Maximum 20% of visual space, reserved for interactive elements

##### System 2: Analogous Harmony (Cohesive Flow)
- **Primary**: `#667EEA` (Periwinkle Blue)
- **Secondary**: `#4ECDC4` (Cyan-Teal)
- **Tertiary**: `#9D84B7` (Soft Purple)
- **Usage**: Data visualization, categorical distinctions

##### System 3: Triadic Balance (Vibrant Energy)
- **Primary**: `#FF6B6B` (Coral Red) - Alerts, critical actions
- **Secondary**: `#4ECDC4` (Teal) - Progress indicators
- **Tertiary**: `#FFE66D` (Warm Yellow) - Warnings, highlights
- **Usage**: Status indicators, notification systems

#### Functional Color Specifications

##### Semantic Colors (Universal Understanding)
- **Success**: `#10B981` (Emerald Green) - Confirmations, completed states
- **Warning**: `#F59E0B` (Amber) - Caution states, pending actions
- **Error**: `#EF4444` (Crimson Red) - Errors, destructive actions
- **Info**: `#3B82F6` (Azure Blue) - Informational messages

##### Text Hierarchy
- **Primary Text**: `#F8FAFC` or `#E2E8F0` (95-98% white) - Headlines, critical information
- **Secondary Text**: `#CBD5E1` (70-75% white) - Body text, descriptions
- **Tertiary Text**: `#94A3B8` (55-60% white) - Metadata, timestamps
- **Disabled Text**: `#475569` (35-40% white) - Inactive elements

##### Surface Colors (Elevation and Depth)
- **Level 0** (Base): `#0A1628`
- **Level 1** (Cards): `#152238` - Add `rgba(255,255,255,0.03)`
- **Level 2** (Modals): `#1E2D45` - Add `rgba(255,255,255,0.05)`
- **Level 3** (Popovers): `#273B54` - Add `rgba(255,255,255,0.07)`

### Spatial Harmony and Layout

#### Golden Ratio Application (phi ~ 1.618)
- **Major sections**: Divide screen using 61.8% / 38.2% split
- **Card dimensions**: Width-to-height ratio of 1.618:1 for visual appeal
- **Sidebar width**: 23.6% of viewport (derived from phi)
- **Content width**: Maximum 1400px, optimal 1200px (phi-based breakpoint)

#### Spacing System (8-Point Grid)
- **Base unit**: 8px
- **Micro spacing**: 4px (0.5 units) - Icon padding, tight elements
- **Small**: 8px (1 unit) - Button padding, chip spacing
- **Medium**: 16px (2 units) - Card padding, form field gaps
- **Large**: 24px (3 units) - Section spacing, component margins
- **XLarge**: 32px (4 units) - Major section breaks
- **XXLarge**: 48px (6 units) - Page-level divisions
- **XXXLarge**: 64px (8 units) - Hero section spacing

#### Typographic Scale (Perfect Fourth - 1.333 ratio)
- **Display**: 48px (3rem) - Hero headlines
- **H1**: 36px (2.25rem) - Page titles
- **H2**: 27px (1.688rem) - Section headers
- **H3**: 20px (1.25rem) - Subsection headers
- **Body Large**: 18px (1.125rem) - Emphasized content
- **Body**: 16px (1rem) - Standard text
- **Body Small**: 14px (0.875rem) - Secondary information
- **Caption**: 12px (0.75rem) - Metadata, labels

### Visual Hierarchy Principles

#### Emphasis Techniques
1. **Color Contrast**: Use 60-30-10 rule (60% dominant, 30% secondary, 10% accent)
2. **Scale Variation**: Primary CTAs 20-30% larger than secondary buttons
3. **Weight Distribution**: Semibold (600) for emphasis, Regular (400) for body
4. **Spatial Isolation**: Surround key elements with 1.5-2x normal spacing

#### Depth and Dimensionality

##### Shadow System
- **Level 1** (Subtle): `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)`
- **Level 2** (Cards): `0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)`
- **Level 3** (Modals): `0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)`
- **Level 4** (Overlays): `0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)`
- **Glow Effect** (Interactive): `0 0 20px rgba(102,126,234,0.4)` for hover states

##### Border Refinement
- **Subtle Dividers**: `1px solid rgba(255,255,255,0.08)` - Section separators
- **Interactive Borders**: `1px solid rgba(255,255,255,0.12)` - Input fields
- **Active States**: `2px solid #667EEA` - Focus indicators
- **Border Radius**: 8px (standard), 12px (cards), 16px (modals), 24px (pills)

### Component-Specific Guidelines

#### Buttons
- **Primary**: Background `#667EEA`, Hover `#7C8FF5`, Active `#5A6FD8`
- **Secondary**: Border `1px solid #667EEA`, Hover background `rgba(102,126,234,0.1)`
- **Destructive**: Background `#EF4444`, Hover `#DC2626`
- **Padding**: 12px 24px (medium), 16px 32px (large)
- **Font**: Semibold (600), letter-spacing: 0.3px

#### Data Visualization
- **Chart Colors** (Sequential):
  - `#667EEA` -> `#8B9FF5` -> `#B0BFFF` -> `#D4DFFF`
- **Chart Colors** (Categorical):
  - `#667EEA`, `#4ECDC4`, `#FF6B6B`, `#FFE66D`, `#9D84B7`, `#FF8B94`
- **Grid Lines**: `rgba(255,255,255,0.06)` - Subtle, non-intrusive
- **Axis Labels**: `#94A3B8` at 12px

#### Cards and Containers
- **Background**: `#152238` with subtle gradient `linear-gradient(135deg, #152238 0%, #1A2845 100%)`
- **Border**: `1px solid rgba(255,255,255,0.08)`
- **Padding**: 24px (default), 32px (feature cards)
- **Hover State**: Transform `translateY(-2px)`, shadow elevation +1 level

#### Input Fields
- **Default**: Background `rgba(255,255,255,0.05)`, Border `rgba(255,255,255,0.12)`
- **Focus**: Border `#667EEA` 2px, Background `rgba(102,126,234,0.08)`
- **Error**: Border `#EF4444`, Background tint `rgba(239,68,68,0.05)`
- **Height**: 44px (optimal touch target)

#### Navigation
- **Active State**: Background `rgba(102,126,234,0.15)`, Border-left `3px solid #667EEA`
- **Hover State**: Background `rgba(255,255,255,0.05)`
- **Text**: Active `#F8FAFC`, Inactive `#94A3B8`

### Advanced Aesthetic Techniques

#### Gradient Applications
- **Hero Sections**: `linear-gradient(135deg, #667EEA 0%, #4ECDC4 100%)`
- **Accent Overlays**: `linear-gradient(90deg, rgba(102,126,234,0.1) 0%, transparent 100%)`
- **Status Indicators**: Radial gradient from center for glow effect

#### Micro-interactions
- **Transition Duration**: 150ms (fast), 300ms (standard), 500ms (deliberate)
- **Easing**: `cubic-bezier(0.4, 0.0, 0.2, 1)` for natural motion
- **Hover Scale**: `transform: scale(1.02)` for interactive elements

#### Glassmorphism (Selective Use)
- **Background**: `rgba(255,255,255,0.05)`
- **Backdrop Filter**: `blur(12px) saturate(180%)`
- **Border**: `1px solid rgba(255,255,255,0.18)`
- **Usage**: Modals, tooltips, floating action buttons

### Quality Assurance Checklist
- [ ] Contrast ratio >= 4.5:1 for normal text (WCAG AA)
- [ ] Contrast ratio >= 3:1 for large text and UI components
- [ ] Consistent 8px grid alignment throughout
- [ ] Maximum 3 accent colors per view
- [ ] All interactive elements have hover/focus states
- [ ] Visual hierarchy tested with blur test (squint/blur page)
- [ ] Spacing follows geometric progression
- [ ] Typography scale maintains readability at all levels

### Implementation Priority
1. Establish base color palette and surface system
2. Apply spacing system consistently
3. Implement typography scale
4. Add depth through shadows and borders
5. Enhance with micro-interactions
6. Refine with gradient and glow effects

This directive ensures every UI component adheres to proven aesthetic principles while maintaining functional excellence. Document generated UI artifacts and their adherence to this directive within plan retrospectives and relevant wiki entries.
