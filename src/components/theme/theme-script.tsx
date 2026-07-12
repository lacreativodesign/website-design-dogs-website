export function ThemeScript() {
  const script = `(function(){try{var k='wdd-theme';var s=localStorage.getItem(k);var t=s==='light'?'light':'dark';var e=document.documentElement;e.setAttribute('data-theme',t);e.style.colorScheme=t;}catch(_){document.documentElement.setAttribute('data-theme','dark');document.documentElement.style.colorScheme='dark';}})();`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
