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
    
    // 将文本分割成段落并替换"我"为"<em>我</em>"
    const paragraphs = [
        "现在，这个故事将由你和 <em>我</em> 共同续写。\n\n",
        
        "你不仅是故事的见证者，更是其创造者。这个房子的真相不是等待被发现的谜题，而是等待被你想象和赋予意义的空白画布。每个房间可能藏着什么？为什么 <em>我</em> 会在这里？ <em>我</em> 是谁？—— 这些问题的答案将随着你的引导而逐渐成形。\n\n",
        
        "接下来，你将进入控制 <em>我</em> 的界面。在右侧面板上，你可以通过两种方式引导故事发展：\n\n",
        
        "1. 通过文本输入框直接输入你希望我执行的行动或描述你想象中房间里可能存在的物品和记忆。例如：'在书房的抽屉里发现一封信' 或 '回忆起客厅墙上照片的含义'。 \n\n",
        
        "2. 如果你不确定该做什么，可以抽取 <em>塔罗牌</em> 寻求指引。每张塔罗牌都代表着特定的象征意义和行动方向，选择一张牌，它将为你提供创意灵感，引导 <em>我</em> 探索特定的情感或记忆路径。\n\n",
        
        "记住，时间有限。 <em>我</em> 只有五分钟的时间，你的每一个想象和选择都将创造独特的叙事，塑造我的身份和命运。 \n\n",
        
        "这不是一个寻找唯一正确答案的游戏，而是一次共同创造记忆与故事的旅程。\n\n",
        
        "当你准备好开始这次创造性探索，点击下一步开始我们的旅程。"
    ];
    
    // 清空打字容器
    typingContainer.innerHTML = '';
    
    // 打字效果变量
    let paragraphIndex = 0;
    let charIndex = 0;
    const typingSpeed = 40; // 每字符40毫秒，较快的速度
    let typingTimer;
    
    // 打字效果函数 - 处理HTML标签
    function typeText() {
        if (paragraphIndex >= paragraphs.length) {
            // 所有段落打完，显示导航按钮
            console.log("打字效果完成，显示导航按钮");
            setTimeout(() => {
                nextButton.style.display = 'block';
                prevButton.style.display = 'block';
            }, 500);
            return;
        }
        
        const currentParagraph = paragraphs[paragraphIndex];
        
        if (charIndex === 0) {
            // 创建一个新的段落元素
            const p = document.createElement('p');
            p.className = 'instruction-paragraph';
            typingContainer.appendChild(p);
        }
        
        const currentP = typingContainer.lastChild;
        
        // 每次直接设置整个innerHTML，以处理HTML标签
        currentP.innerHTML = currentParagraph.substring(0, charIndex + 1);
        
        charIndex++;
        
        if (charIndex >= currentParagraph.length) {
            // 当前段落打完，移到下一段
            paragraphIndex++;
            charIndex = 0;
            
            // 段落之间添加一点延迟
            typingTimer = setTimeout(typeText, typingSpeed * 4);
        } else {
            // 继续当前段落
            typingTimer = setTimeout(typeText, typingSpeed);
        }
    }
    
    // 确保导航按钮初始状态是隐藏的
    nextButton.style.display = 'none';
    prevButton.style.display = 'none';
    
    // 延迟一秒后开始打字效果
    setTimeout(() => {
        typeText();
    }, 1000);
    
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
            const buttons = document.querySelectorAll('.nav-button');
            buttons.forEach(btn => {
                btn.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                btn.style.color = `rgb(${textColor}, ${textColor}, ${textColor})`;
                btn.style.borderColor = `rgb(${textColor}, ${textColor}, ${textColor})`;
            });
            
            if (progress < 1) {
                requestAnimationFrame(updateColor);
            } else {
                // 渐变完成后执行回调
                if (callback) callback();
            }
        }
        
        requestAnimationFrame(updateColor);
    }
    
    // 添加下一步按钮点击事件
    nextButton.addEventListener('click', function() {
        console.log("下一步按钮被点击，准备跳转...");
        
        // 清除可能存在的打字定时器
        if (typingTimer) {
            clearTimeout(typingTimer);
        }
        
        // 执行背景渐变，完成后导航到下一页
        gradientToWhite(() => {
            // 延迟导航到主游戏页面
            window.location.href = '../visual-novel/index.html'; // 主游戏页面
        });
    });
    
    // 添加上一步按钮点击事件
    prevButton.addEventListener('click', function() {
        console.log("上一步按钮被点击，准备返回...");
        
        // 清除可能存在的打字定时器
        if (typingTimer) {
            clearTimeout(typingTimer);
        }
        
        // 执行背景渐变，完成后导航到上一页
        gradientToWhite(() => {
            // 延迟导航到上一页
            window.location.href = '../introduction-04/index.html';
        });
    });
});