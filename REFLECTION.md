# Capstone Reflection — Sara Haider

## What Was Hardest?

The fragment shader was the biggest challenge. Thinking pixel-by-pixel instead of component-by-component required a completely different mental model. Debugging GLSL without console.log meant I had to visualize the math in my head. Understanding the `u_time`, `u_mouse`, and `u_resolution` uniforms took time, but once I grasped the uv coordinate system, everything clicked.

The accessibility audit also pushed me to think differently. Running Lighthouse and WAVE revealed issues I hadn't noticed — missing ARIA labels, low contrast, and no focus indicators. Fixing these wasn't hard technically, but it required a shift in mindset from "making it work" to "making it work for everyone."

## What Would You Do Differently Next Time?

1. **Start the accessibility audit earlier.** Lighthouse and WAVE gave clear, actionable feedback that was much easier to fix incrementally than all at once at the end.

2. **Add rate limiting from day one.** Protecting the API route was quick to add, but it's easy to forget until someone abuses it.

3. **Test on mobile Safari earlier.** The keyboard resizing issue bit me late in the process. Testing on real devices from the start would have saved time.

4. **Use Next.js Image component from the beginning.** I added it later for performance, but it would have been easier to plan for it upfront.

## One Thing That Surprised Me

I was surprised how much the `prefers-reduced-motion` media query simplified accessibility. One CSS rule and one shader uniform handled everything — no complex logic needed. It showed me that accessibility isn't always hard; sometimes it's just about respecting user preferences.

I was also surprised how powerful React Three Fiber is. Coming from raw Three.js, I expected a learning curve, but the declarative approach made 3D development feel as natural as building regular React components.

## Conclusion

This capstone taught me that shipping a product isn't just about writing code. It's about documentation, accessibility, performance, and thinking about users. I'm proud of what I've built, and I now have a portfolio that proves my capabilities through real work rather than just listing skills.