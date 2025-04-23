document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM加载完成，开始创建星星和打字效果");
    
    // 获取元素
    const typingContainer = document.getElementById('typing-container');
    const nextButton = document.getElementById('next-button');
    const prevButton = document.getElementById('prev-button');
    const starsContainer = document.getElementById('stars-container');
    
    // 检查所有必要的元素是否存在
    if (!starsContainer) {
        console.error("找不到星星容器元素!");
        return;
    }
    
    if (!typingContainer) {
        console.error("找不到打字效果容器元素!");
        return;
    }
    
    if (!nextButton) {
        console.error("找不到下一步按钮元素!");
        return;
    }
    
    if (!prevButton) {
        console.error("找不到上一步按钮元素!");
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
    
    // 要显示的文本，在"墙上挂着一个时钟，"前添加换行符
    const text = "我睁开眼睛，发现自己躺在一个瓷白色的浴缸里。浴缸是干的，空荡荡的浴室里灯泡闪烁着，发出轻微的嗡嗡声，就像远处有人在低语。\n \n 浴缸边缘有一道细长的裂缝，像是个奇怪的微笑。裂缝旁放着一只怀表，指针停在3:54。旁边刻着一排字：'你有六分钟的时间。' 刻字看起来像是昨天完成的，又像是几十年前就在那里。";
    
    // 清空打字容器（以防有任何预设内容）
    typingContainer.innerHTML = '';
    
    // 打字效果函数
    let charIndex = 0;
    const typingSpeed = 80; // 每字符80毫秒
    let typingTimer;
    
    function typeText() {
        if (charIndex < text.length) {
            // 添加当前字符
            typingContainer.textContent = text.substring(0, charIndex + 1);
            
            charIndex++;
            
            // 设置下一个字符的定时器
            typingTimer = setTimeout(typeText, typingSpeed);
        } else {
            // 打字完成，显示导航按钮
            console.log("打字效果完成，显示导航按钮");
            setTimeout(() => {
                nextButton.style.display = 'block';
                prevButton.style.display = 'block';
            }, 500);
        }
    }
    
    // 确保导航按钮初始状态是隐藏的
    nextButton.style.display = 'none';
    prevButton.style.display = 'none';
    
    // 延迟一秒后开始打字效果
    setTimeout(() => {
        typeText();
    }, 1000);
    
    // 添加下一步按钮点击事件
    nextButton.addEventListener('click', function() {
        console.log("下一步按钮被点击，准备跳转...");
        
        // 清除可能存在的打字定时器
        if (typingTimer) {
            clearTimeout(typingTimer);
        }
        
        // 创建淡出效果
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '0';
        
        // 延迟导航到introduction-02页面
        setTimeout(() => {
            window.location.href = '../introduction-02/index.html';
        }, 1000);
    });
    
    // 添加上一步按钮点击事件
    prevButton.addEventListener('click', function() {
        console.log("上一步按钮被点击，准备返回...");
        
        // 清除可能存在的打字定时器
        if (typingTimer) {
            clearTimeout(typingTimer);
        }
        
        // 创建淡出效果
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '0';
        
        // 延迟导航到landing page
        setTimeout(() => {
            window.location.href = '../landing-page/index.html';
        }, 1000);
    });
});