document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM加载完成，开始创建星星和标题动画");
    
    // 获取标题元素
    const titleCn = document.querySelector('.title-cn');
    const titleEn = document.querySelector('.title-en');
    
    // 星星字符集
    const starChars = ['*', '✦', '✩', '⋆', '.', '·', '✧'];
    const starsContainer = document.getElementById('stars-container');
    
    if (!starsContainer) {
        console.error("找不到星星容器元素!");
        return;
    }
    
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
        
        // 随机大小 - 缩小到原来的2/3
        const size = (0.5 + Math.random() * 0.5) * (2/3);
        star.style.fontSize = `${size}rem`;
        
        // 随机初始透明度
        const minOpacity = 0.0;  // 最小透明度
        const maxOpacity = 1.0;  // 最大透明度
        const baseOpacity = minOpacity + Math.random() * (maxOpacity - minOpacity);
        star.style.opacity = baseOpacity;
        
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
            phase: Math.random() * Math.PI * 2,  // 随机初始相位
            speed: (0.2 + Math.random() * 0.8) * 2  // 速度提高一倍 (0.4-1.6)
        });
    }
    
    console.log(`创建了 ${stars.length} 颗星星`);
    
    // 星星闪烁动画 - 简化且可靠的版本
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
    
    // 开始动画
    animateStars();
    console.log("星星动画已启动");
    
    // 获取开启按钮元素
    const startButton = document.getElementById('start-button');
    
    // 添加点击事件
    startButton.addEventListener('click', function() {
        console.log("按钮被点击，准备跳转...");
        // 创建淡出效果
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = 0;
        
        // 延迟导航到视觉小说页面
        setTimeout(() => {
            window.location.href = '../introduction-01/index.html';
        }, 1000);
    });
});