document.addEventListener('DOMContentLoaded', () => {
    // 1. JSONデータを取得
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            renderSite(data);
        })
        .catch(error => console.error('データの読み込みに失敗しました:', error));

    function renderSite(data) {
        // 主要文言の反映
        document.getElementById('site-tagline').textContent = data.siteInfo.tagline;
        document.getElementById('site-description').textContent = data.siteInfo.description;

        // 公演情報の反映 (6公演分)
        const perfGrid = document.getElementById('performance-grid');
        data.performances.forEach(perf => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-img" style="height:200px; background:#111;"></div>
                <h3>${perf.title}</h3>
                <p>${perf.date}</p>
                <p style="color:var(--accent-gold)">${perf.venue}</p>
                <a href="#" style="color:#fff; font-size:0.8em;">詳細を見る →</a>
            `;
            perfGrid.appendChild(card);
        });

        // ニュースの反映
        const newsList = document.getElementById('news-list');
        data.news.forEach(item => {
            const li = document.createElement('li');
            li.style.listStyle = 'none';
            li.style.borderBottom = '1px solid #333';
            li.style.padding = '15px 0';
            li.innerHTML = `<small>${item.date} [${item.category}]</small><br>${item.text}`;
            newsList.appendChild(li);
        });
    }
});
