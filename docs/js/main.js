/* ============================================
   Frances Belleza - Main JavaScript
   Terminal, Typewriter, and UI interactions
   ============================================ */

// ============================================
// Terminal State
// ============================================
let terminalMode = 'normal'; // 'normal', 'password', 'write-title', 'write-body', 'write-image'
let pendingPost = {};
let isAuthenticated = false;

// ============================================
// Click Twinkle Effect
// ============================================
document.addEventListener('click', function(e) {
  createTwinkles(e.clientX, e.clientY);
});

function createTwinkles(x, y) {
  const colors = ['#FFD700', '#FFF8DC', '#FFFACD', '#F0E68C', '#FFE4B5'];
  const stars = ['✦', '✧', '⋆', '✶', '✷'];
  const twinkleCount = 5;

  for (let i = 0; i < twinkleCount; i++) {
    const twinkle = document.createElement('div');
    twinkle.className = 'twinkle';
    twinkle.textContent = stars[Math.floor(Math.random() * stars.length)];

    // Random offset from click point
    const offsetX = (Math.random() - 0.5) * 50;
    const offsetY = (Math.random() - 0.5) * 50;

    twinkle.style.left = (x + offsetX) + 'px';
    twinkle.style.top = (y + offsetY) + 'px';
    twinkle.style.color = colors[Math.floor(Math.random() * colors.length)];
    twinkle.style.animationDelay = (Math.random() * 0.15) + 's';
    twinkle.style.fontSize = (12 + Math.random() * 10) + 'px';

    document.body.appendChild(twinkle);

    // Remove twinkle after animation
    setTimeout(() => twinkle.remove(), 900);
  }
}

// ============================================
// Terminal Functionality
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const terminalToggle = document.getElementById('terminalToggle');
  const terminalOverlay = document.getElementById('terminalOverlay');
  const terminalInput = document.getElementById('terminalInput');
  const terminalContent = document.getElementById('terminalContent');

  // Check if already logged in (session persists)
  checkAuthStatus();

  if (terminalToggle && terminalOverlay) {
    // Toggle terminal visibility
    terminalToggle.addEventListener('click', function() {
      const isVisible = terminalOverlay.style.display === 'block';
      terminalOverlay.style.display = isVisible ? 'none' : 'block';
      if (!isVisible && terminalInput) {
        terminalInput.focus();
      }
    });

    // Close terminal with Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && terminalOverlay.style.display === 'block') {
        terminalOverlay.style.display = 'none';
      }
    });
  }

  if (terminalInput && terminalContent) {
    // Handle terminal commands
    terminalInput.addEventListener('keydown', async function(e) {
      if (e.key === 'Enter') {
        const input = this.value.trim();
        const cmd = input.toLowerCase();
        if (!cmd && terminalMode === 'normal') return;

        // Handle different modes
        if (terminalMode === 'password') {
          await handlePasswordInput(input, terminalContent);
          this.value = '';
          this.type = 'text';
          terminalMode = 'normal';
          return;
        }

        if (terminalMode === 'write-title') {
          pendingPost.title = input;
          terminalContent.innerHTML += '<div style="color: var(--color-accent);">&gt; ' + escapeHtml(input) + '</div>';
          terminalContent.innerHTML += '<div>enter post body (use \\n for line breaks):</div>';
          terminalMode = 'write-body';
          this.value = '';
          return;
        }

        if (terminalMode === 'write-body') {
          // Convert \n strings to actual newlines for formatting
          pendingPost.body = input.replace(/\\n/g, '\n');
          terminalContent.innerHTML += '<div style="color: var(--color-accent);">&gt; ' + escapeHtml(input) + '</div>';
          terminalContent.innerHTML += '<div>enter image URL (or leave empty and press enter):</div>';
          terminalMode = 'write-image';
          this.value = '';
          return;
        }

        if (terminalMode === 'write-image') {
          pendingPost.image_url = input || null;
          terminalContent.innerHTML += '<div style="color: var(--color-accent);">&gt; ' + (input || '(none)') + '</div>';
          await submitPost(terminalContent);
          terminalMode = 'normal';
          this.value = '';
          return;
        }

        // Normal command processing
        let output = await processCommand(cmd, terminalContent);

        // Special case for clear command
        if (cmd === 'clear') {
          terminalContent.innerHTML = '';
          this.value = '';
          return;
        }

        // Special case for login - switch to password mode
        if (cmd === 'login' && !isAuthenticated) {
          terminalContent.innerHTML += '<div style="color: var(--color-accent);">&gt; login</div>';
          terminalContent.innerHTML += '<div>enter password:</div>';
          this.type = 'password';
          terminalMode = 'password';
          this.value = '';
          return;
        }

        // Add command and output to terminal
        terminalContent.innerHTML +=
          '<div style="color: var(--color-accent);">&gt; ' + escapeHtml(cmd) + '</div>' +
          '<div>' + output + '</div>';

        this.value = '';
        terminalOverlay.scrollTop = terminalOverlay.scrollHeight;
      }
    });
  }

  // ============================================
  // Typewriter Effect
  // ============================================
  const typewriterEl = document.getElementById('typewriter');
  if (typewriterEl) {
    const message = "hi, i'm frances";
    let i = 0;

    function typeWriter() {
      if (i <= message.length) {
        typewriterEl.textContent = message.slice(0, i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }

    typeWriter();
  }
});

// ============================================
// Auth Functions
// ============================================
async function checkAuthStatus() {
  if (typeof supabaseClient === 'undefined') {
    // Wait for Supabase to load
    window.addEventListener('supabaseReady', async () => {
      const { data: { session } } = await supabaseClient.auth.getSession();
      isAuthenticated = !!session;
    });
  } else {
    const { data: { session } } = await supabaseClient.auth.getSession();
    isAuthenticated = !!session;
  }
}

async function handlePasswordInput(password, terminalContent) {
  terminalContent.innerHTML += '<div style="color: var(--color-accent);">&gt; ********</div>';

  if (typeof supabaseClient === 'undefined') {
    terminalContent.innerHTML += '<div style="color: #ff6b6b;">error: database not connected</div>';
    return;
  }

  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: 'belleza.frances@gmail.com',
      password: password
    });

    if (error) {
      terminalContent.innerHTML += '<div style="color: #ff6b6b;">access denied: ' + error.message + '</div>';
      isAuthenticated = false;
    } else {
      terminalContent.innerHTML += '<div style="color: #98c379;">welcome back, frances. grimoire unlocked.</div>';
      terminalContent.innerHTML += '<div>type "write" to create a new post, "logout" to sign out</div>';
      isAuthenticated = true;
    }
  } catch (err) {
    terminalContent.innerHTML += '<div style="color: #ff6b6b;">error: ' + err.message + '</div>';
  }
}

async function submitPost(terminalContent) {
  if (typeof supabaseClient === 'undefined') {
    terminalContent.innerHTML += '<div style="color: #ff6b6b;">error: database not connected</div>';
    return;
  }

  try {
    const { data, error } = await supabaseClient
      .from('posts')
      .insert([{
        title: pendingPost.title,
        body: pendingPost.body,
        image_url: pendingPost.image_url
      }]);

    if (error) {
      terminalContent.innerHTML += '<div style="color: #ff6b6b;">failed to publish: ' + error.message + '</div>';
    } else {
      terminalContent.innerHTML += '<div style="color: #98c379;">post published successfully!</div>';
      pendingPost = {};
    }
  } catch (err) {
    terminalContent.innerHTML += '<div style="color: #ff6b6b;">error: ' + err.message + '</div>';
  }
}

// ============================================
// Command Processing
// ============================================
async function processCommand(cmd, terminalContent) {
  // Auth commands
  if (cmd === 'login') {
    if (isAuthenticated) {
      return 'already logged in. type "write" to create a post.';
    }
    return ''; // Handled specially in main listener
  }

  if (cmd === 'logout') {
    if (!isAuthenticated) {
      return 'not logged in.';
    }
    if (typeof supabaseClient !== 'undefined') {
      await supabaseClient.auth.signOut();
    }
    isAuthenticated = false;
    return 'logged out. grimoire sealed.';
  }

  if (cmd === 'write' || cmd === 'new post' || cmd === 'post') {
    if (!isAuthenticated) {
      return 'access denied. use "login" first.';
    }
    terminalMode = 'write-title';
    setTimeout(() => {
      const content = document.getElementById('terminalContent');
      content.innerHTML += '<div>enter post title:</div>';
    }, 10);
    return 'starting new post...';
  }

  if (cmd === 'status') {
    return isAuthenticated ? 'logged in as frances. grimoire unlocked.' : 'not logged in.';
  }

  // Basic commands
  if (cmd === 'help') {
    let helpText = 'Commands: help, ls, cat &lt;file&gt;, clear, whoami, date, secret<br>Navigation: go &lt;page&gt;, exit';
    if (isAuthenticated) {
      helpText += '<br><span style="color: #98c379;">Admin: write, logout, status</span>';
    }
    return helpText;
  }

  if (cmd === 'ls') {
    return 'frieren.txt   apothecary.txt   currently-consuming.md   grimoire.txt';
  }

  // Exit terminal
  if (cmd === 'exit' || cmd === 'quit' || cmd === 'close') {
    document.getElementById('terminalOverlay').style.display = 'none';
    return '';
  }

  // Navigation commands
  if (cmd === 'go blog' || cmd === 'cd blog' || cmd === 'blog') {
    window.location.href = 'blog.html';
    return 'navigating to blog...';
  }

  if (cmd === 'go portfolio' || cmd === 'cd portfolio' || cmd === 'portfolio') {
    window.location.href = 'portfolio.html';
    return 'navigating to portfolio...';
  }

  if (cmd === 'go contact' || cmd === 'cd contact' || cmd === 'contact') {
    window.location.href = 'contact.html';
    return 'navigating to contact...';
  }

  if (cmd === 'go home' || cmd === 'cd home' || cmd === 'home' || cmd === 'cd ~') {
    window.location.href = 'index.html';
    return 'navigating home...';
  }

  if (cmd === 'cat frieren.txt') {
    return '~ frieren: beyond journey\'s end ~<br><br>an elven mage who traveled with the hero party to defeat the demon king. after himmel\'s death, she realized she barely knew him despite their decade-long journey. now she travels to understand humans better, collecting spells along the way.<br><br>"i just wanted to get to know him better..."';
  }

  if (cmd === 'cat apothecary.txt') {
    return '~ the apothecary diaries ~<br><br>maomao, a young pharmacist with a sharp mind and love for poison, gets sold to the imperial palace as a servant. using her medical knowledge, she solves mysteries and saves lives while trying to stay under the radar.<br><br>"poison and medicine are two sides of the same coin."';
  }

  if (cmd === 'cat currently-consuming.md') {
    return '~ what i\'m currently into ~<br><br>listening: fred again and again and again<br>watching: may i ask for one final thing<br>reading: machine learning with pytorch and scikit-learn<br>playing: ghost of tsushima (still!)<br>drinking: homemade matcha & chai';
  }

  if (cmd === 'cat grimoire.txt') {
    if (isAuthenticated) {
      return '~ your grimoire awaits. type "write" to inscribe a new spell ~';
    }
    return '~ a collection of spells from a thousand-year journey ~';
  }

  if (cmd === 'whoami') {
    if (isAuthenticated) {
      return 'frances belleza - keeper of the grimoire';
    }
    return 'a fellow traveler on the path of code';
  }

  if (cmd === 'date') {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Frieren easter eggs
  if (cmd === 'secret' || cmd === 'cast spell') {
    return 'Zoltraak! ...but nothing happened. maybe try a different spell?';
  }

  if (cmd === 'frieren') {
    return '"I just wanted to get to know him better..." - Frieren';
  }

  if (cmd === 'himmel') {
    return '"I think being direct is the best way." - Himmel the Hero';
  }

  if (cmd === 'fern') {
    return 'Fern is judging you silently.';
  }

  if (cmd === 'stark') {
    return 'Stark ran away! ...but came back because he is actually very brave.';
  }

  if (cmd === 'magic') {
    return 'Ordinary magic, used by ordinary people, is truly beautiful.';
  }

  if (cmd === 'flower field' || cmd === 'field of flowers') {
    return 'A sea of flowers blooms in the meadow... the view Himmel wanted to show you.';
  }

  if (cmd === 'eisen') {
    return 'The steadfast warrior. He still remembers every adventure.';
  }

  if (cmd === 'heiter') {
    return 'A priest who enjoyed good wine and raised a wonderful apprentice.';
  }

  if (cmd === 'serie') {
    return 'The greatest mage in history? Perhaps. But can she make friends?';
  }

  if (cmd === 'flamme') {
    return 'The founder of human magic. She believed in the potential of ordinary spells.';
  }

  if (cmd === 'mimic') {
    return 'CHOMP! You were eaten by a mimic. Frieren would be proud... or jealous.';
  }

  // Default response
  return 'Command not found: ' + escapeHtml(cmd) + ' (try "help")';
}

// ============================================
// Utility Functions
// ============================================
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
