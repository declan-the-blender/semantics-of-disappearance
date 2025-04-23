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
    
    // 将原始文本拆分为数组，以便逐字处理
    const allText = "我不记得自己的身份，也不记得为什么会在这里。记忆像是被剪辑过的胶片，只剩下不连贯的片段。\n \n我口袋里有一个黑色的丝绒布袋，触感像是活的。布袋上用银线刺绣着怪异的字体：";
    const italicText = "'当感到困惑时，随机抽取一张牌，它会为你带来指引。'";
    const finalText = "\n \n我小心地松开布袋的抽绳，里面是22张塔罗牌。我轻触牌面，感到一种奇怪的亲切感，仿佛它们是帮助解开这个地方谜团的钥匙。我将它们重新放回口袋，决定先了解我身处何地。也许探索完这个空间后，这些牌能帮我找到更多答案。";
    
    // 清空打字容器
    typingContainer.innerHTML = '';
    
    // 创建DOM元素来存放各部分文本
    const regularTextElement = document.createElement('span');
    const italicTextElement = document.createElement('i');
    const finalTextElement = document.createElement('span');
    
    // 添加到主容器
    typingContainer.appendChild(regularTextElement);
    typingContainer.appendChild(italicTextElement);
    typingContainer.appendChild(finalTextElement);
    
    // 打字效果变量
    let phase = 'regular'; // 当前阶段：regular, italic, final
    let charIndex = 0;
    const typingSpeed = 80; // 每字符80毫秒
    let typingTimer;
    
    // 打字效果函数
    function typeText() {
        if (phase === 'regular') {
            if (charIndex < allText.length) {
                regularTextElement.textContent += allText[charIndex];
                charIndex++;
                typingTimer = setTimeout(typeText, typingSpeed);
            } else {
                // 第一部分完成，重置计数器，进入斜体部分
                charIndex = 0;
                phase = 'italic';
                typingTimer = setTimeout(typeText, typingSpeed);
            }
        } else if (phase === 'italic') {
            if (charIndex < italicText.length) {
                italicTextElement.textContent += italicText[charIndex];
                charIndex++;
                typingTimer = setTimeout(typeText, typingSpeed);
            } else {
                // 斜体部分完成，重置计数器，进入最后部分
                charIndex = 0;
                phase = 'final';
                typingTimer = setTimeout(typeText, typingSpeed);
            }
        } else if (phase === 'final') {
            if (charIndex < finalText.length) {
                finalTextElement.textContent += finalText[charIndex];
                charIndex++;
                typingTimer = setTimeout(typeText, typingSpeed);
            } else {
                // 所有文本完成，显示导航按钮
                console.log("打字效果完成，显示导航按钮");
                setTimeout(() => {
                    nextButton.style.display = 'block';
                    prevButton.style.display = 'block';
                }, 500);
            }
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
        
        // 延迟导航到introduction-03页面
        setTimeout(() => {
            window.location.href = '../introduction-03/index.html';
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
        
        // 延迟导航到上一页
        setTimeout(() => {
            window.location.href = '../introduction-01/index.html';
        }, 1000);
    });
});