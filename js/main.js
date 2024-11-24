async function loadPosts() {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = "<p>Loading posts...</p>";
  
    try {
      const posts = [
        "posts/post1.md",
        "posts/post2.md"
      ];
  
      const postPromises = posts.map(async (url) => {
        const response = await fetch(url);
  
        if (!response.ok) {
          throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }
  
        const markdown = await response.text();
  
        // Extract the title from the first heading (h1)
        const titleMatch = markdown.match(/^#\s*(.*)$/m);
        const title = titleMatch ? titleMatch[1] : "Untitled Post";  // Default to "Untitled Post" if no title found
  
        // Remove the first # title from the markdown content to prevent it from rendering
        const markdownWithoutTitle = markdown.replace(/^#\s*.*$/m, "").trim();
  
        // Convert the remaining markdown to HTML
        const htmlContent = renderMarkdown(markdownWithoutTitle);
  
        return { url, html: htmlContent, title};
      });
  
      const postContents = await Promise.all(postPromises);
  
      // Reverse the order so the newest post comes last
      const reversedPostContents = postContents.reverse();
  
      contentDiv.innerHTML = reversedPostContents
        .map(
          (post, index) => `
          <article>
            <h2>#${reversedPostContents.length - index} ${post.title}</h2> <!-- Display post title with numeric ID -->
            <div class="full-content">
              ${post.html}  <!-- Display full content -->
            </div>
          </article>
        `
        )
        .join("");
    } catch (err) {
      console.error("Error loading posts:", err);
      contentDiv.innerHTML = "<p>Failed to load posts.</p>";
    }
  }
  
  loadPosts();
  console.log("Marked library:", marked);
  