import { useState, useEffect, useRef } from "react";

export default function Mistunnel() {
  const [activeSection, setActiveSection] = useState("browser");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isBlankMode, setIsBlankMode] = useState(false);
  const [isAntiClose, setIsAntiClose] = useState(false);
  const [url, setUrl] = useState("https://duckduckgo.com");
  const browserFrameRef = useRef<HTMLIFrameElement>(null);

  // Handle anti-close functionality
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isAntiClose) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    if (isAntiClose) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isAntiClose]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const showSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsSidebarOpen(false);
  };

  const launchProxy = (proxyUrl: string) => {
    if (isBlankMode) {
      const win = window.open('about:blank', '_blank');
      if (win) {
        win.document.write(`
          <iframe src="${proxyUrl}" style="width:100%;height:100%;border:none;" frameborder="0"></iframe>
        `);
      }
    } else {
      window.open(proxyUrl, '_blank');
    }
  };

  const loadUrl = () => {
    let processedUrl = url.trim();
    
    if (!processedUrl) return;
    
    // Add protocol if missing
    if (!processedUrl.startsWith('http://') && !processedUrl.startsWith('https://')) {
      // Check if it looks like a search query
      if (processedUrl.includes(' ') || !processedUrl.includes('.')) {
        processedUrl = 'https://duckduckgo.com/?q=' + encodeURIComponent(processedUrl);
      } else {
        processedUrl = 'https://' + processedUrl;
      }
    }
    
    if (browserFrameRef.current) {
      browserFrameRef.current.src = processedUrl;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      loadUrl();
    }
  };

  const changeBgColor = (color: string) => {
    document.documentElement.style.setProperty('--bg-color', color);
  };

  const BackgroundParticles = () => (
    <div className="background-particles">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="particle"></div>
      ))}
    </div>
  );

  return (
    <div>
      <BackgroundParticles />
      
      <div className={`overlay ${isSidebarOpen ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
      
      <header className="header">
        <img 
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E%3Ccircle cx='25' cy='25' r='20' fill='%2387ceeb'/%3E%3Ctext x='25' y='30' font-family='Arial' font-size='16' font-weight='bold' text-anchor='middle' fill='black'%3EM%3C/text%3E%3C/svg%3E" 
          alt="Mistunnel Logo" 
          className="logo" 
        />
        <h1 className="site-title">Mistunnel</h1>
        <button className="sidebar-toggle" onClick={toggleSidebar}>☰ Menu</button>
      </header>
      
      <nav className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <ul className="sidebar-nav">
          <li><a href="#" onClick={() => showSection('browser')}>🌐 Browser</a></li>
          <li><a href="#" onClick={() => showSection('home')}>🏠 Home</a></li>
          <li><a href="#" onClick={() => showSection('proxies')}>🔗 Proxies</a></li>
          <li><a href="#" onClick={() => showSection('games')}>🎮 Games</a></li>
          <li><a href="#" onClick={() => showSection('settings')}>⚙️ Settings</a></li>
          <li><a href="#" onClick={() => showSection('how-to-create-links')}>📖 How to Create Links</a></li>
          <li><a href="#" onClick={() => showSection('warning')}>⚠️ Warning</a></li>
          <li><a href="#" onClick={() => showSection('about')}>ℹ️ About</a></li>
          <li><a href="#" onClick={() => showSection('exprint3r')}>🛠️ Exprint3r</a></li>
          <li><a href="#" onClick={() => showSection('bookmarks')}>📚 Bookmarks</a></li>
        </ul>
      </nav>
      
      <main className="main-content">
        {/* Browser Section (Default) */}
        <section className={`content-section ${activeSection === 'browser' ? 'active' : ''}`}>
          <h2>🌐 Web Browser</h2>
          <div className="browser-container">
            <div className="browser-controls">
              <input 
                type="text" 
                className="url-input" 
                placeholder="Enter URL or search term..." 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button className="go-btn" onClick={loadUrl}>Go</button>
            </div>
            <iframe 
              ref={browserFrameRef}
              className="browser-frame" 
              src="https://duckduckgo.com"
              title="Browser Frame"
            ></iframe>
          </div>
        </section>

        {/* Home Section */}
        <section className={`content-section ${activeSection === 'home' ? 'active' : ''}`}>
          <div className="welcome-section">
            <h1 className="welcome-title">Welcome to Mistunnel</h1>
            <p className="welcome-subtitle">Your gateway to unrestricted browsing and entertainment</p>
            <a 
              href="https://docs.google.com/forms/d/1TKeAp8HeUu6oiTpuhxuCyjqY87DHeEEsmT5FZRTd0_I/edit" 
              className="review-link" 
              target="_blank"
              rel="noopener noreferrer"
            >
              📝 Review Us Here
            </a>
          </div>
        </section>

        {/* Proxies Section */}
        <section className={`content-section ${activeSection === 'proxies' ? 'active' : ''}`}>
          <h2>🔗 Available Proxies</h2>
          <div className="proxy-grid">
            <div className="proxy-card">
              <h3>Utopia</h3>
              <p>Fast and reliable proxy service</p>
              <button 
                className="launch-btn" 
                onClick={() => launchProxy('https://docs.google.com/document/d/1BjlY5TZkj3HBqw-PP2nbf_eVhKLSTCXn7MkSLYiFAaY/edit?ouid=115048876088907508148&usp=docs_home&ths=true')}
              >
                Launch
              </button>
            </div>
            <div className="proxy-card">
              <h3>Benorg</h3>
              <p>Secure browsing with enhanced privacy</p>
              <button 
                className="launch-btn" 
                onClick={() => launchProxy('https://docs.google.com/document/d/1-NLzWsQ7cbhZAWQx9h9unlBsKMCZR36Ag195KJl5wpQ/edit?tab=t.0')}
              >
                Launch
              </button>
            </div>
            <div className="proxy-card">
              <h3>US4</h3>
              <p>High-speed US-based proxy servers</p>
              <button 
                className="launch-btn" 
                onClick={() => launchProxy('https://docs.google.com/document/d/1U9jzufb-H1wdOjQO9OO9_SL0wE3tADjUEMzgx7KH2os/edit?ouid=115048876088907508148&usp=docs_home&ths=true')}
              >
                Launch
              </button>
            </div>
            <div className="proxy-card">
              <h3>DAYDREAM X</h3>
              <p>Advanced proxy with premium features</p>
              <button 
                className="launch-btn" 
                onClick={() => launchProxy('https://docs.google.com/document/d/1VLjUF_sTYv-oKEN1SFbb1XaFVpb_GsA_7bgC74gSqoE/edit?ouid=115048876088907508148&usp=docs_home&ths=true')}
              >
                Launch
              </button>
            </div>
            <div className="proxy-card">
              <h3>SHADOW</h3>
              <p>Stealth mode proxy for maximum anonymity</p>
              <button 
                className="launch-btn" 
                onClick={() => launchProxy('https://docs.google.com/document/d/1fNfI6lnKdepVcTzLfbvSZhgMI2u4wOpll7erGn3HHPw/edit?tab=t.0')}
              >
                Launch
              </button>
            </div>
            <div className="proxy-card">
              <h3>MOCHA</h3>
              <p>Coffee-powered proxy for smooth browsing</p>
              <button 
                className="launch-btn" 
                onClick={() => launchProxy('https://docs.google.com/document/d/1Gk1p4AlxmtDbKp0dT7gyn5XpNQ8967XbykGrUzbyQ08/edit?tab=t.0')}
              >
                Launch
              </button>
            </div>
          </div>
        </section>

        {/* Games Section */}
        <section className={`content-section ${activeSection === 'games' ? 'active' : ''}`}>
          <h2>🎮 Games</h2>
          <div className="proxy-grid">
            <div className="proxy-card">
              <h3>Coming Soon!</h3>
              <p>Games will be available in the next update</p>
              <button className="launch-btn" disabled>Coming Soon</button>
            </div>
          </div>
        </section>

        {/* Settings Section */}
        <section className={`content-section ${activeSection === 'settings' ? 'active' : ''}`}>
          <h2>⚙️ Settings</h2>
          <div className="settings-grid">
            <div className="setting-item">
              <div className="setting-toggle">
                <span>About:Blank Mode</span>
                <div 
                  className={`toggle-switch ${isBlankMode ? 'active' : ''}`} 
                  onClick={() => setIsBlankMode(!isBlankMode)}
                ></div>
              </div>
              <p style={{marginTop:'10px', fontSize:'0.9rem', color:'#ccc'}}>
                Opens the website in an about:blank tab for stealth browsing
              </p>
            </div>
            <div className="setting-item">
              <div className="setting-toggle">
                <span>Anti-Close</span>
                <div 
                  className={`toggle-switch ${isAntiClose ? 'active' : ''}`} 
                  onClick={() => setIsAntiClose(!isAntiClose)}
                ></div>
              </div>
              <p style={{marginTop:'10px', fontSize:'0.9rem', color:'#ccc'}}>
                Prevents the browser from closing the tab
              </p>
            </div>
            <div className="setting-item">
              <div className="setting-toggle">
                <span>Background Color</span>
                <input 
                  type="color" 
                  className="color-picker" 
                  defaultValue="#0a0a0a"
                  onChange={(e) => changeBgColor(e.target.value)} 
                />
              </div>
              <p style={{marginTop:'10px', fontSize:'0.9rem', color:'#ccc'}}>
                Customize the background color of the website
              </p>
            </div>
            <div className="setting-item">
              <h3>Social Links</h3>
              <div className="social-links">
                <a href="#" className="social-link discord">
                  <i className="fab fa-discord"></i>
                  <span>Discord</span>
                </a>
                <a href="#" className="social-link tiktok">
                  <i className="fab fa-tiktok"></i>
                  <span>TikTok</span>
                </a>
                <a href="#" className="social-link instagram">
                  <i className="fab fa-instagram"></i>
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How to Create Links Section */}
        <section className={`content-section ${activeSection === 'how-to-create-links' ? 'active' : ''}`}>
          <h2>📖 How to Create Links</h2>
          <div className="content-text">
            <h3>Creating Custom Proxy Links</h3>
            
            <h4>Step 1: Sign Up To <a href="https://freedns.afraid.org/signup/" target="_blank" rel="noopener noreferrer" style={{color: 'var(--accent-color)'}}>FreeDNS</a></h4>
            <p>For your email, you could use a <strong>Temporary Email</strong> provider like <a href="https://smailpro.com/" target="_blank" rel="noopener noreferrer" style={{color: 'var(--accent-color)'}}>TempMail</a></p>
            
            <h4>Step 2: Create a Link</h4>
            <p>After creating an account, go to this page in <a href="https://freedns.afraid.org/domain/registry/" target="_blank" rel="noopener noreferrer" style={{color: 'var(--accent-color)'}}>FreeDNS</a></p>
            
            <h4>Step 3: Choose a Subdomain</h4>
            <p>Click a <strong>subdomain</strong> link that you would like to use. <strong>(e.g. chickenkiller.com)</strong></p>
            
            <h4>Step 4: Set the Destination</h4>
            <p>Finally, set the <strong>Destination</strong> to one of the IPs below:</p>
            
            <div className="proxy-grid" style={{fontSize: '0.9rem', marginTop: '20px'}}>
              <div className="proxy-card">
                <h3 style={{fontSize: '1.2rem'}}>Popular Proxies</h3>
                <div className="code-block">
                  Truffled IP: 5.161.110.162<br/>
                  UniUB IP: 104.243.42.228<br/>
                  Astro IP: 104.243.37.85<br/>
                  Comet/PXLNOVA IP: 172.66.46.221<br/>
                  Doge IP: 104.243.38.142<br/>
                  Sunnys Gym IP: 69.48.204.208<br/>
                  FalconLink IP: 104.243.43.17<br/>
                  Arsenic/Lunarsync/Coconut IP: 66.179.254.164
                </div>
              </div>
              
              <div className="proxy-card">
                <h3 style={{fontSize: '1.2rem'}}>Gaming Proxies</h3>
                <div className="code-block">
                  Kazwire IP: 103.195.102.132<br/>
                  The Pizza Edition IP: 104.36.84.31<br/>
                  Catway IP: 217.77.14.233<br/>
                  BrunysIXLWork IP: 185.211.4.69<br/>
                  Velara IP: 185.211.4.69<br/>
                  Moonlight 4.0 IP: 172.93.104.11<br/>
                  Onyx IP: 172.67.158.114<br/>
                  Tinfoil IP: 129.213.65.72
                </div>
              </div>
              
              <div className="proxy-card">
                <h3 style={{fontSize: '1.2rem'}}>Advanced Proxies</h3>
                <div className="code-block">
                  Shadow IP: 104.243.38.18<br/>
                  DuckHTML IP: 104.167.215.179<br/>
                  Lunaar IP: 164.152.26.189<br/>
                  55 GMS IP: 152.53.37.155,15.204.232.110<br/>
                  Asteroid IP: 5.161.68.227<br/>
                  Ruby IP: 104.36.86.104<br/>
                  Core IP: 207.211.183.185<br/>
                  PLEXILE ARCADE IP: 104.243.41.121
                </div>
              </div>
              
              <div className="proxy-card">
                <h3 style={{fontSize: '1.2rem'}}>Specialized Proxies</h3>
                <div className="code-block">
                  Szvy Central V2 IP: 152.53.38.100<br/>
                  Wrnd IP: 74.208.202.111<br/>
                  Space IP: 104.243.38.145<br/>
                  Void Network IP: 141.193.68.52<br/>
                  Pulsar IP: 172.93.106.140<br/>
                  Breakium IP: 172.93.100.82<br/>
                  Kasms IP: 145.40.75.101,142.93.68.85,165.22.33.54<br/>
                  Selenite IP: 65.109.112.222
                </div>
              </div>
              
              <div className="proxy-card">
                <h3 style={{fontSize: '1.2rem'}}>Entertainment Proxies</h3>
                <div className="code-block">
                  Emerald/Phantom Games IP: 109.122.46.55<br/>
                  Seraph IP: 15.235.166.92<br/>
                  Ghost IP: 163.123.192.9<br/>
                  Xenapsis IP: 66.175.239.22<br/>
                  Artclass IP: 198.251.90.4<br/>
                  froggies arcade IP: 152.53.81.196<br/>
                  Interstellar IP: 66.23.193.126<br/>
                  Bolt IP: 104.36.86.24
                </div>
              </div>
              
              <div className="proxy-card">
                <h3 style={{fontSize: '1.2rem'}}>Additional Services</h3>
                <div className="code-block">
                  Hdun IP: 109.204.188.135<br/>
                  Croxy Proxy IP: 143.244.204.138<br/>
                  Duckflix IP: 104.21.54.237<br/>
                  Rammerhead IP: 108.181.32.77<br/>
                  Light IP: 104.243.45.193
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Exprint3r Section */}
        <section className={`content-section ${activeSection === 'exprint3r' ? 'active' : ''}`}>
          <h2>🛠️ Exprint3r</h2>
          <div className="content-text">
            <h3>Advanced Proxy Tools</h3>
            <p>Exprint3r provides advanced tools for proxy management and optimization.</p>
            <h4>Features:</h4>
            <ul>
              <li>Automatic proxy rotation</li>
              <li>Speed optimization</li>
              <li>Custom headers injection</li>
              <li>SSL certificate handling</li>
            </ul>
            <div className="proxy-grid">
              <div className="proxy-card">
                <h3>Tool Coming Soon</h3>
                <p>Advanced proxy tools will be available in the next update</p>
                <button className="launch-btn" disabled>Coming Soon</button>
              </div>
            </div>
          </div>
        </section>

        {/* Warning Section */}
        <section className={`content-section ${activeSection === 'warning' ? 'active' : ''}`}>
          <h2>⚠️ WARNING</h2>
          <div className="content-text">
            <div className="proxy-card" style={{textAlign: 'center', border: '3px solid #ff6b6b', background: 'rgba(255, 107, 107, 0.1)'}}>
              <h3 style={{color: '#ff6b6b', fontSize: '2rem', marginBottom: '20px'}}>⚠️ Heads Up!</h3>
              <p style={{fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '20px'}}>
                This website was made for convenience and fun, not to get you in trouble. 
                <strong> Mistunnel takes no responsibility</strong> if you face consequences from 
                school staff, parents, or guardians.
              </p>
              <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: '#ff6b6b'}}>
                <strong>If you choose to use proxies or play games, do stuff at your own risk</strong>
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className={`content-section ${activeSection === 'about' ? 'active' : ''}`}>
          <h2>ℹ️ About</h2>
          <div className="content-text">
            <div className="proxy-card" style={{textAlign: 'center'}}>
              <h3 style={{fontSize: '2rem', marginBottom: '20px'}}>About Mistunnel</h3>
              <p style={{fontSize: '1.2rem', lineHeight: '1.8'}}>
                This is a website where you can find games and proxies if your school has a blocker.
              </p>
            </div>
          </div>
        </section>

        {/* Bookmarks Section */}
        <section className={`content-section ${activeSection === 'bookmarks' ? 'active' : ''}`}>
          <h2>📚 Bookmarks</h2>
          <div className="content-text">
            <h3>Saved Proxy Links</h3>
            <p>Manage your favorite proxy links and quick access sites.</p>
            <div className="proxy-grid">
              <div className="proxy-card">
                <h3>Bookmark Manager</h3>
                <p>Save and organize your favorite proxy links</p>
                <button className="launch-btn" disabled>Coming Soon</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
