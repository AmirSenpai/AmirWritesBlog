// markdown.js
function renderMarkdown(markdown) {
  return marked.parse(markdown);  // Use marked.parse() to convert markdown to HTML
}
