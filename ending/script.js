document.addEventListener('DOMContentLoaded', function() {
    console.log("结局页面加载完成");
    
    // 获取元素
    const typingContainer = document.getElementById('typing-container');
    const returnButton = document.getElementById('return-button');
    const starsContainer = document.getElementById('stars-container');
    
    // 检查所有必要的元素是否存在
    if (!typingContainer || !returnButton || !starsContainer) {
        console.error("找不到必要的DOM元素!");
        return;
    }
    
    // 星星字符集
    const starChars = ['*', '✦', '✩', '⋆', '.', '·', '✧'];
    
    // 创建星星
    const numStars = 100;
    const stars = [];
    
    console.log(`将创建 ${numStars} 颗星星`);
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // 随机位置
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // 随机字符
        const charIndex = Math.floor(Math.random() * starChars.length);
        star.innerText = starChars[charIndex];
        
        // 随机大小
        const size = (0.5 + Math.random() * 0.5) * (2/3);
        star.style.fontSize = `${size}rem`;
        
        // 随机初始透明度
        const minOpacity = 0.0;
        const maxOpacity = 1.0;
        const baseOpacity = minOpacity + Math.random() * (maxOpacity - minOpacity);
        star.style.opacity = baseOpacity.toString();
        
        // 设置位置
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        
        // 添加到容器
        starsContainer.appendChild(star);
        
        // 保存星星信息用于动画
        stars.push({
            element: star,
            minOpacity: minOpacity,
            maxOpacity: maxOpacity,
            phase: Math.random() * Math.PI * 2,
            speed: (0.2 + Math.random() * 0.8) * 2
        });
    }
    
    console.log(`创建了 ${stars.length} 颗星星`);
    
    // 星星闪烁动画
    function animateStars() {
        const time = Date.now() * 0.001; // 当前时间(秒)
        
        stars.forEach(star => {
            // 使用简单的正弦波在最小和最大透明度之间变化
            const range = star.maxOpacity - star.minOpacity;
            const offset = star.minOpacity;
            const opacity = offset + range * (0.5 + 0.5 * Math.sin(time * star.speed + star.phase));
            
            star.element.style.opacity = opacity.toFixed(2);
        });
        
        requestAnimationFrame(animateStars);
    }
    
    // 开始星星动画
    animateStars();
    console.log("星星动画已启动");
    
    // 从sessionStorage获取结局文本
    let endingText = sessionStorage.getItem('endingText');
    
    // 如果没有找到结局文本，提供一个默认文本
    if (!endingText) {
        endingText = "不知为何，怀表的指针在我眼前模糊了。当我再次聚焦时，已经指向了4:00。我感到记忆的碎片在重组，空间在我周围扭曲。\n\n这个房子从来不是真实的物理空间，而是我意识的投影。我终于明白了——我不是被困在这里，我本就属于这里。这是我创造的记忆宫殿，是我试图留住逝去的时光的方式。\n\n当最后一丝认知清晰起来，我感到一种解脱。不再需要寻找出口，因为我已经找到了真相。我闭上眼睛，让这房子和我的过去一同消散在时间的河流中。";
    }
    
    // 清空打字容器
    typingContainer.innerHTML = '';
    
    // 打字效果变量
    let charIndex = 0;
    const typingSpeed = 40; // 每字符40毫秒
    let typingTimer;
    
    // 打字效果函数
    function typeText() {
        if (charIndex < endingText.length) {
            // 如果是换行符，则添加新的段落元素
            if (endingText[charIndex] === '\n' && endingText[charIndex + 1] === '\n') {
                typingContainer.innerHTML += '<br><br>';
                charIndex += 2;
            } else {
                typingContainer.innerHTML += endingText.charAt(charIndex);
                charIndex++;
            }
            
            // 继续打字
            typingTimer = setTimeout(typeText, typingSpeed);
            
            // 滚动到底部以确保可见
            typingContainer.scrollIntoView(false);
        } else {
            // 打字完成，显示返回按钮
            console.log("打字效果完成，显示返回按钮");
            setTimeout(() => {
                returnButton.style.display = 'block';
                returnButton.style.opacity = '0';
                
                // 淡入效果
                let opacity = 0;
                const fadeInterval = setInterval(() => {
                    opacity += 0.1;
                    returnButton.style.opacity = opacity;
                    
                    if (opacity >= 1) {
                        clearInterval(fadeInterval);
                    }
                }, 50);
            }, 1000);
        }
    }
    
    // 添加返回按钮点击事件
    returnButton.addEventListener('click', function() {
        console.log("返回按钮被点击，准备跳转...");
        
        // 清除可能存在的打字定时器
        if (typingTimer) {
            clearTimeout(typingTimer);
        }
        
        // 执行背景渐变，完成后导航到首页
        gradientToWhite(() => {
            // 导航到首页
            window.location.href = '../landing-page/index.html';
        });
    });
    
    // 背景渐变函数 - 从黑到白
    function gradientToWhite(callback) {
        // 设置初始颜色 - 黑色
        let r = 0;
        let g = 0;
        let b = 0;
        const startTime = Date.now();
        const duration = 1000; // 渐变持续时间（毫秒）
        
        function updateColor() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // 计算当前颜色值 (从黑 [0,0,0] 到白 [255,255,255])
            r = Math.round(255 * progress);
            g = Math.round(255 * progress);
            b = Math.round(255 * progress);
            
            // 更新背景色
            document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            
            // 更新文字颜色 (从白 [255,255,255] 到黑 [0,0,0])
            const textColor = 255 - Math.round(255 * progress);
            document.body.style.color = `rgb(${textColor}, ${textColor}, ${textColor})`;
            
            // 更新星星颜色
            document.querySelectorAll('.star').forEach(star => {
                star.style.color = `rgba(${textColor}, ${textColor}, ${textColor}, ${star.style.opacity})`;
            });
            
            // 更新按钮样式
            returnButton.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            returnButton.style.color = `rgb(${textColor}, ${textColor}, ${textColor})`;
            returnButton.style.borderColor = `rgb(${textColor}, ${textColor}, ${textColor})`;
            
            if (progress < 1) {
                requestAnimationFrame(updateColor);
            } else {
                // 渐变完成后执行回调
                if (callback) callback();
            }
        }
        
        requestAnimationFrame(updateColor);
    }
    
    // 延迟一秒后开始打字效果
    setTimeout(() => {
        typeText();
    }, 1000);
});