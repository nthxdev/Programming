// requestAnimationFrame() - Better for Animations
// For smooth animations, use requestAnimationFrame() instead of setInterval()
function animate() {
  box.style.left = (parseFloat(box.style.left) + 5) + "px";
  requestAnimationFrame(animate);  // Repeat smoothly
}
requestAnimationFrame(animate);
// Why it's better:
// Syncs with browser refresh rate (60fps)
// Better performance
// Smoother animations

