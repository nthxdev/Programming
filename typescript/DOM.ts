// The browser exposes window (the global object)
// Window offers (DOM entry point) - Represent the entire page HTML tree

// DOM Selectors - Returns: Single HTML element, NodeList(static), HTMLCollection(live)
// querySelector()
// querySelectorAll()
// getElementById()
// getElementsByClass()
/*
Array-like structures: NodeList vs HTMLCollection
NodeList (static): querySelectorAll() | Snapshot at moment of query
— doesn't update if DOM changes | loop with for...of or forEach()
HTMLCollection (live): getElementsByClassName() | Updates automatically
— slower, rarely needed | has .length but limited method
*/

// Most DOM code in TypeScript is written just like JavaScript
// Usually don't manually write the type—let TS infer it.
// TypeScript infers:
// button → Element | null
// querySelectorAll() → NodeListOf<Element>
// getElementById() → HTMLElement | null
const button = document.querySelector('.button');
button?.addEventListener('click', () => {});

// Typescript + DOM (Type Access)
// querySelector returns Element | null
const el: HTMLDivElement | null = document.querySelector('div');
// querySelectorAll returns NodeListOf<T>
const list: NodeListOf<HTMLLIElement> = document.querySelectorAll('li');
// Safe access
const el = document.querySelector('div') as HTMLDivElement | null;
if (el) {
  el.style.color = 'red';  // Now safe to access
}
// Type-safe loop
document.querySelectorAll<HTMLButtonElement>('button').forEach(btn => {
  btn.addEventListener('click', () => { /* ... */ });
});
// DOM types offered by browser
const el: Element | null= document.querySelector('.button');  // CSS selector, returns first match or null
const el:Element | null = document.getElementById('header');
// Multiple elements — use querySelectorAll (modern, preferred)
const list: NodeListOf<Element>  = document.querySelectorAll('.item');  // Returns NodeList (static snapshot)
// Loop: list.forEach(el => { ... }) or for...of
// OLD METHOD (avoid) — live but slower
const list: HTMLCollectionOf<Element> = document.getElementsByClassName('item');  // Returns HTMLCollection (live, auto-updates)
const btn = document.querySelector<HTMLButtonElement>('.button');
// HTMLButtonElement | null
const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('button');
const nodes = document.querySelectorAll('p');  // NodeListOf<HTMLParagraphElement>
const input: HTMLInputElement | null = document.querySelector('input');
const old = document.getElementsByClassName('box');  // HTMLCollection
// Must loop manually: for (let i = 0; i < old.length; i++) { ... }
// Or convert: Array.from(old).forEach(...)


// Styling with DOM - Affects rendering either Direct: style.color / via CSS: classList 
// element.style.property
// element.classList.add()
// element.classList.remove()
// element.getAttribute()
const box = document.querySelector('.box');

// Direct: Inline CSS
box.style.color = 'red';
box.style.backgroundColor = '#ccc';
box.style.padding = '10px';
// ⚠️ Verbose, limited, hard to maintain. Use only for dynamic values.

// Check if element has a class
if (el.classList.contains('active')) { /* ... */ }

// Better: Toggle CSS classes (chaining)
box.classList.add('active');        // Add a class
box.classList.remove('active');     // Remove a class
box.classList.toggle('active');     // Add if missing, remove if present

// Chain operations
box.classList.add('visible', 'focus');  // Add multiple at once

// Add/remove class based on condition
el.classList.toggle('active', condition);

// Get attribute value
const href = link.getAttribute('href');

