document.addEventListener('DOMContentLoaded', function() {
    const hero = document.getElementById('hero');
    const savedBg = localStorage.getItem('heroBackground');
    
    if (savedBg) {
        hero.style.backgroundImage = `url('${savedBg}')`;
    }
    
    createSettingsPanel();
});

function createSettingsPanel() {
    const panel = document.createElement('div');
    panel.className = 'settings-panel';
    panel.innerHTML = `
        <button class="settings-toggle" title="设置背景图片">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
        </button>
        <div class="settings-content">
            <h4>设置背景图片</h4>
            <div class="settings-option">
                <label for="bg-url">图片URL:</label>
                <input type="text" id="bg-url" placeholder="输入图片URL地址">
            </div>
            <div class="settings-option">
                <label for="bg-file">或选择本地图片:</label>
                <input type="file" id="bg-file" accept="image/*">
            </div>
            <div class="settings-buttons">
                <button id="apply-bg" class="btn-apply">应用</button>
                <button id="reset-bg" class="btn-reset">重置</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(panel);
    
    addSettingsStyles();
    initSettingsEvents();
}

function addSettingsStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .settings-panel {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
        }
        
        .settings-toggle {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            transition: all 0.3s ease;
        }
        
        .settings-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }
        
        .settings-content {
            position: absolute;
            top: 60px;
            right: 0;
            width: 300px;
            background: white;
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            display: none;
            animation: slideIn 0.3s ease;
        }
        
        .settings-content.active {
            display: block;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .settings-content h4 {
            margin: 0 0 20px 0;
            color: #2c3e50;
            font-size: 1.1rem;
            padding-bottom: 10px;
            border-bottom: 2px solid #eee;
        }
        
        .settings-option {
            margin-bottom: 15px;
        }
        
        .settings-option label {
            display: block;
            margin-bottom: 8px;
            color: #555;
            font-size: 0.9rem;
        }
        
        .settings-option input[type="text"] {
            width: 100%;
            padding: 10px 15px;
            border: 2px solid #eee;
            border-radius: 8px;
            font-size: 0.95rem;
            transition: border-color 0.3s ease;
        }
        
        .settings-option input[type="text"]:focus {
            outline: none;
            border-color: #667eea;
        }
        
        .settings-option input[type="file"] {
            width: 100%;
            padding: 10px;
            border: 2px dashed #ddd;
            border-radius: 8px;
            cursor: pointer;
            transition: border-color 0.3s ease;
        }
        
        .settings-option input[type="file"]:hover {
            border-color: #667eea;
        }
        
        .settings-buttons {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }
        
        .btn-apply, .btn-reset {
            flex: 1;
            padding: 12px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.95rem;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        
        .btn-apply {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .btn-apply:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        
        .btn-reset {
            background: #f5f5f5;
            color: #666;
        }
        
        .btn-reset:hover {
            background: #eee;
        }
    `;
    document.head.appendChild(style);
}

function initSettingsEvents() {
    const toggle = document.querySelector('.settings-toggle');
    const content = document.querySelector('.settings-content');
    const urlInput = document.getElementById('bg-url');
    const fileInput = document.getElementById('bg-file');
    const applyBtn = document.getElementById('apply-bg');
    const resetBtn = document.getElementById('reset-bg');
    const hero = document.getElementById('hero');
    
    toggle.addEventListener('click', () => {
        content.classList.toggle('active');
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.settings-panel')) {
            content.classList.remove('active');
        }
    });
    
    applyBtn.addEventListener('click', () => {
        const url = urlInput.value.trim();
        if (url) {
            hero.style.backgroundImage = `url('${url}')`;
            localStorage.setItem('heroBackground', url);
            content.classList.remove('active');
        } else if (fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                hero.style.backgroundImage = `url('${e.target.result}')`;
                localStorage.setItem('heroBackground', e.target.result);
                content.classList.remove('active');
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    });
    
    resetBtn.addEventListener('click', () => {
        hero.style.backgroundImage = "url('hero-bg.jpg')";
        localStorage.removeItem('heroBackground');
        urlInput.value = '';
        fileInput.value = '';
        content.classList.remove('active');
    });
}
