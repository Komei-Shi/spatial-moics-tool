const platforms = [
    {
        name: "Visium-V1（OCT）",
        studyType: ["transcriptome"],
        species: ["multispecies"],
        sampleType: ["FF"],
        area: "6.5×6.5mm²（4个）",
        resolution: "55μm",
        geneTargets: "全转录组",
        techPrinciple: "空间捕获+测序",
        stage: "发现研究"
    },
    {
        name: "Visium-V2（CytAssist）",
        studyType: ["transcriptome"],
        species: ["human", "mouse"],
        sampleType: ["FF", "FFPE", "white", "TMA"],
        area: "11×11mm²（2个）",
        resolution: "55μm",
        geneTargets: "全转录组",
        techPrinciple: "CytAssist辅助空间捕获",
        stage: "发现研究"
    },
    {
        name: "Visium-HD",
        studyType: ["transcriptome"],
        species: ["human", "mouse"],
        sampleType: ["FF", "FFPE", "white", "TMA"],
        area: "6.5×6.5mm²（2个）",
        resolution: "2μm",
        geneTargets: "全转录组",
        techPrinciple: "高密度空间捕获",
        stage: "发现研究"
    },
    {
        name: "CosMx™ SMI",
        studyType: ["transcriptome", "proteome"],
        species: ["human", "mouse"],
        sampleType: ["FF", "FFPE", "white", "TMA"],
        area: "15×20mm²",
        resolution: "单细胞/亚细胞",
        geneTargets: "WTx(全转录组)/6000基因/64蛋白",
        techPrinciple: "原位杂交",
        stage: "发现，精准分析"
    },
    {
        name: "GeoMx® DSP",
        studyType: ["transcriptome", "proteome"],
        species: ["human", "mouse", "dog"],
        sampleType: ["FF", "FFPE", "white", "TMA"],
        area: "14.6×36.2mm²",
        resolution: "ROI级",
        geneTargets: "全转录组/1000、570蛋白",
        techPrinciple: "ROI圈选+测序",
        stage: "重点研究"
    },
    {
        name: "PhenoCycler-Fusion",
        studyType: ["proteome"],
        species: ["human", "mouse"],
        sampleType: ["FF", "FFPE", "white", "TMA"],
        area: "18×35mm²",
        resolution: "单细胞/亚细胞",
        geneTargets: "100+蛋白",
        techPrinciple: "抗体寡核苷酸+多轮成像",
        stage: "发现研究"
    },
    {
        name: "深度空间蛋白组",
        studyType: ["proteome"],
        species: ["multispecies"],
        sampleType: ["FF", "FFPE"],
        area: "16×45mm²",
        resolution: "ROI级",
        geneTargets: "全蛋白组",
        techPrinciple: "激光显微切割+质谱",
        stage: "重点研究"
    }
];

// 完整平台动态描述
function getPlatformDescription(name) {
    const visiumBaseDesc = (version) => `
        <strong>Visium空间转录组测序</strong>作为重要的筛选技术适用于全转录组发现，依赖附着在载玻片上的空间条形码RNA结合探针，
        这些探针包含解码空间位置信息的空间条形码，用于定位RNA的空间位置。<br><br>
        ${version === 'V1' ? 
            'V1版本专门处理新鲜冷冻组织（FF样本），提供标准的空间转录组分析方案。' :
        version === 'V2' ? 
            'V2版本通过CytAssist仪器增强，可同时处理新鲜冷冻（FF）和FFPE样本，并支持组织芯片（TMA）分析。' : 
            'HD版突破性地将捕获点缩小至2μm，实现接近单细胞分辨率的空间转录组分析。'}
        全系列产品均完美兼容组织芯片研究。
    `;

    const descriptions = {
        "Visium-V1（OCT）": visiumBaseDesc('V1'),
        "Visium-V2（CytAssist）": visiumBaseDesc('V2'),
        "Visium-HD": visiumBaseDesc('HD'),
        "CosMx™ SMI": `
            <strong>CosMx™ SMI单细胞空间原位分子成像平台</strong>：
            <ul>
	<li>结合了超高分辨率成像技术</li>
                <li>全转录组（18,000+ RNA）检测</li>
                <li>靶向6,000基因或64种蛋白质</li>
                <li>单细胞/亚细胞级分辨率</li>
            </ul>
            支持FF、FFPE、白片和TMA等多种样本类型，实现精准的细胞微环境解析。
        `,
        "GeoMx® DSP": `
            <strong>GeoMx® DSP数字空间组学平台</strong>：
            <ul>
                <li>同时检测20,000基因+1,000蛋白质</li>
                <li>支持人、小鼠、犬类样本</li>
                <li>14.6×36.2mm大视场分析</li>
                <li>针对ROI区域的精准分子表型分析</li>
            </ul>
            适用于转化医学研究和临床生物标志物开发。
        `,
        "PhenoCycler-Fusion": `
            <strong>PhenoCycler-Fusion单细胞空间蛋白组平台</strong>：
            <ul>
                <li>100+蛋白质同时检测</li>
                <li>单细胞/亚细胞级分辨率</li>
                <li>支持FF、FFPE、白片、TMA</li>
                <li>多轮抗体标记成像技术</li>
            </ul>
            可在蛋白水平解析细胞生态位和空间功能单元。
        `,
        "深度空间蛋白组": `
            <strong>深度空间蛋白组技术平台</strong>：
            <ul>
                <li>激光显微切割（LCM）精准获取目标区域</li>
                <li>质谱检测数千种蛋白质</li>
                <li>无需抗体，直接检测蛋白质表达</li>
                <li>支持多物种分析</li>
            </ul>
            特别适用于肿瘤微环境和神经突触的深度解析。
        `
    };

    return descriptions[name] || "";
}

// 精确匹配逻辑
function matchPlatforms() {
    const studyType = document.getElementById('study-type').value;
    const species = document.getElementById('species').value;
    const sampleType = document.getElementById('sample-type').value;

    const results = platforms.filter(p => {
        // 物种匹配逻辑：多物种选项仅匹配标记为multispecies的平台
        const speciesCheck = species === 'multispecies' 
            ? p.species.includes('multispecies') 
            : p.species.includes(species);
        
        return p.studyType.includes(studyType) && 
               speciesCheck && 
               p.sampleType.includes(sampleType);
    });

    renderResults(results);
}

// 渲染逻辑（带错误处理）
function renderResults(platforms) {
    const container = document.getElementById('results');
    
    if (!container) {
        console.error('结果容器未找到！');
        return;
    }

    if (platforms.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                🚨 未找到匹配的技术方案：
                <ul>
                    <li>您可以联系技术顾问进一步咨询</li>
                </ul>
            </div>
        `;
        return;
    }

    container.innerHTML = platforms.map(p => `
        <div class="platform-card">
            <h2>${p.name}</h2>
            
            <table class="params-table">
                <tr><th>有效区域</th><td>${p.area}</td></tr>
                <tr><th>分辨率</th><td>${p.resolution}</td></tr>
                <tr><th>检测指标</th><td>${p.geneTargets}</td></tr>
                <tr><th>技术原理</th><td>${p.techPrinciple}</td></tr>
                <tr><th>研究阶段</th><td>${p.stage}</td></tr>
            </table>

            <div class="platform-description">
                ${getPlatformDescription(p.name)}
            </div>
        </div>
    `).join('');
}

// 初始化事件绑定（确保DOM加载完成）
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('match-btn').addEventListener('click', matchPlatforms);
    document.querySelectorAll('select').forEach(s => s.addEventListener('change', matchPlatforms));
    matchPlatforms(); // 初始化显示结果
});
