# 🎨 Animation Guide - Future Tech Career

This project uses **Framer Motion** for smooth, performant animations throughout the application.

## 📦 Installation

Framer Motion is already included in `package.json`. If you need to reinstall:

```bash
pnpm add framer-motion
```

---

## 🎯 Animation Components

### 1. **FadeIn**
Fade in elements with optional directional movement.

```tsx
import { FadeIn } from '@/components/animations';

<FadeIn delay={0.2} direction="up">
  <h1>This fades in from below</h1>
</FadeIn>
```

**Props:**
- `delay` - Delay before animation starts (seconds)
- `duration` - Animation duration (default: 0.5s)
- `direction` - 'up' | 'down' | 'left' | 'right' | 'none'

---

### 2. **StaggerContainer & StaggerItem**
Animate children with staggered delays.

```tsx
import { StaggerContainer, StaggerItem } from '@/components/animations';

<StaggerContainer staggerDelay={0.1}>
  <StaggerItem>
    <Card>First card</Card>
  </StaggerItem>
  <StaggerItem>
    <Card>Second card (animates 0.1s later)</Card>
  </StaggerItem>
</StaggerContainer>
```

**Use cases:**
- Lists of cards
- Navigation items
- Gallery items
- Feature lists

---

### 3. **ScaleIn**
Scale elements from 80% to 100%.

```tsx
import { ScaleIn } from '@/components/animations';

<ScaleIn delay={0.3}>
  <Button>Animated Button</Button>
</ScaleIn>
```

**Props:**
- `delay` - Delay before animation starts

---

### 4. **SlideIn**
Slide in from left or right.

```tsx
import { SlideIn } from '@/components/animations';

<SlideIn direction="left" delay={0.2}>
  <div>Slides in from left</div>
</SlideIn>
```

**Props:**
- `direction` - 'left' | 'right'
- `delay` - Animation delay

---

### 5. **PageTransition**
Smooth transitions between pages.

Already integrated in `app/layout.tsx`:

```tsx
<main className="flex-grow">
  <PageTransition>{children}</PageTransition>
</main>
```

---

## 🎬 Motion Utilities

### Hover Effects

```tsx
import { motion } from 'framer-motion';

<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
  <Button>Hover me!</Button>
</motion.div>
```

### Custom Animations

```tsx
<motion.div
  initial={{ opacity: 0, rotate: -180 }}
  animate={{ opacity: 1, rotate: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  Custom animation
</motion.div>
```

### Scroll-triggered Animations

```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.6 }}
>
  Animates when scrolled into view
</motion.div>
```

---

## 🌟 Animation Patterns

### Hero Section
```tsx
<FadeIn delay={0.2} direction="down">
  <Badge>New Feature</Badge>
</FadeIn>

<FadeIn delay={0.4}>
  <h1>Main Headline</h1>
</FadeIn>

<FadeIn delay={0.6}>
  <p>Subheading</p>
</FadeIn>

<StaggerContainer staggerDelay={0.2}>
  <StaggerItem>
    <Button>Primary CTA</Button>
  </StaggerItem>
  <StaggerItem>
    <Button>Secondary CTA</Button>
  </StaggerItem>
</StaggerContainer>
```

### Card Grid
```tsx
<StaggerContainer staggerDelay={0.1} className="grid grid-cols-3 gap-4">
  {items.map(item => (
    <StaggerItem key={item.id}>
      <motion.div whileHover={{ y: -8 }}>
        <Card>{item.content}</Card>
      </motion.div>
    </StaggerItem>
  ))}
</StaggerContainer>
```

### Testimonials
```tsx
<FadeIn>
  <h2>What Our Clients Say</h2>
</FadeIn>

<StaggerContainer staggerDelay={0.15}>
  {testimonials.map(testimonial => (
    <StaggerItem key={testimonial.id}>
      <motion.div whileHover={{ y: -8 }}>
        <TestimonialCard {...testimonial} />
      </motion.div>
    </StaggerItem>
  ))}
</StaggerContainer>
```

---

## ⚡ Performance Tips

### 1. Use `viewport` prop
```tsx
<motion.div
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }} // Only animate once
>
```

### 2. Hardware Acceleration
Prefer transforms (x, y, scale, rotate) over width/height:
```tsx
// ✅ Good - GPU accelerated
<motion.div animate={{ x: 100, scale: 1.2 }} />

// ❌ Avoid - causes reflow
<motion.div animate={{ width: 200, marginLeft: 50 }} />
```

### 3. Reduce Animation Distance
```tsx
// ✅ Subtle (better UX)
<FadeIn direction="up"> // Default: 40px movement

// ❌ Too much movement
<motion.div initial={{ y: 200 }} /> // 200px is jarring
```

### 4. Use `layout` for Smooth Transitions
```tsx
<motion.div layout>
  {/* Content that changes size */}
</motion.div>
```

---

## 🎨 Custom Variants

Create reusable animation configs:

```tsx
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

<motion.div
  variants={fadeInUp}
  initial="hidden"
  animate="visible"
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

---

## 🔧 Advanced Patterns

### Exit Animations
```tsx
import { AnimatePresence } from 'framer-motion';

<AnimatePresence mode="wait">
  {isOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Modal content
    </motion.div>
  )}
</AnimatePresence>
```

### Gesture Animations
```tsx
<motion.div
  drag
  dragConstraints={{ left: 0, right: 300 }}
  whileDrag={{ scale: 1.1 }}
>
  Draggable element
</motion.div>
```

### Path Animations (SVG)
```tsx
<motion.svg>
  <motion.path
    d="M10,10 L100,100"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 2 }}
  />
</motion.svg>
```

---

## 📋 Best Practices

1. **Keep animations under 500ms** for UI interactions
2. **Use `once: true`** in viewport to prevent repeated animations
3. **Stagger delays should be 0.05-0.15s** for best effect
4. **Add `whileHover` and `whileTap`** to interactive elements
5. **Test on mobile** - reduce motion if needed
6. **Respect `prefers-reduced-motion`**:

```tsx
const shouldReduceMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

<motion.div
  initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
  animate={{ opacity: 1 }}
>
```

---

## 🎯 Component-Specific Animations

### Buttons
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400 }}
>
  Click me
</motion.button>
```

### Cards
```tsx
<motion.div
  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
  transition={{ duration: 0.2 }}
>
  <Card />
</motion.div>
```

### Modals
```tsx
<AnimatePresence>
  {isOpen && (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="backdrop"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="modal"
      >
        Modal content
      </motion.div>
    </>
  )}
</AnimatePresence>
```

---

## 📚 Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Animation Examples](https://www.framer.com/motion/examples/)
- [Easing Functions](https://easings.net/)

---

## 🎉 Have Fun Animating!

Remember: **Good animations enhance UX, but overuse can be distracting.** Keep it subtle and purposeful!
