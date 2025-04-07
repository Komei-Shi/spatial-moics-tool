// script.js
const platforms = [
    //--- Visium 系列 ---
    {
        id: "visium-hd",
        name: "Visium HD",
        type: "transcriptome",
        species: ["human", "mouse"],
        samples: ["FF", "FFPE", "TMA"],
        resolution: "2μm",
        detection: "全转录组",
        targets: "18,000+基因",
        workflow: "空间捕获+测序",
        scenarios: [
            "肿瘤微环境解析",
            "神经发育时空图谱",
            "单细胞级基因定位"
        ]
    },
    
    //--- CosMx SMI ---
    {
        id: "cosmx-smi",
        name: "CosMx™ SMI",
        type: "multi",
        species: ["human", "mouse"],
        samples: ["FF", "FFPE", "TMA"],
        resolution: "亚细胞级",
        detection: "多组学检测",
        targets: "18,000 RNA / 64蛋白",
        scenarios: [
            "细胞生态位解析",
            "分子互作网络",
            "药物靶标验证"
        ]
    },

    //--- GeoMx DSP ---
    {
        id: "geomx-dsp",
        name: "GeoMx® DSP",
        type: "proteome",
        species: ["human", "mouse", "dog"],
        samples: ["FFPE", "TMA"],
        resolution: "ROI级",
        detection: "多组学检测",
        targets: "1,000蛋白 / 20,000基因",
        scenarios: [
            "临床样本分析",
            "免疫微环境研究",
            "大样本筛查"
        ]
    }
];

function matchPlatforms() {
    // 获取筛选条件
    const studyType = document.getElementById("studyType").value;
    const species = document.getElementById("species").value;
    const sampleType = document.getElementById("sampleType").value;

    // 执行筛选
    const results = platforms.filter(platform => {
        const typeMatch = studyType === "multi" 
            ? platform.type === "proteome" || platform.type === "transcriptome" 
            : platform.type === studyType;
        
        const speciesMatch = platform.species.includes(species);
        const sampleMatch = platform.samples.includes(sampleType);
        
        return typeMatch && speciesMatch && sampleMatch;
    });

    renderResults(results);
}

function renderResults(platforms) {
    const container = document.getElementById("results");
    container.innerHTML = platforms.map(platform => `
        <div class="platform-card">
            <div class="platform-header">
                <h2>${platform.name}</h2>
                <div class="meta-info">
                    <span>${platform.resolution}分辨率</span>
                    <span>·</span>
                    <span>支持样本：${platform.samples.join(" / ")}</span>
                </div>
            </div>

            <div class="params-grid">
                <div class="param-item">
                    <strong>检测类型</strong>
                    ${platform.detection}
                </div>
                <div class="param-item">
                    <strong>检测靶标</strong>
                    ${platform.targets}
                </div>
                <div class="param-item">
                    <strong>技术原理</strong>
                    ${platform.workflow}
                </div>
                <div class="param-item">
                    <strong>适用物种</strong>
                    ${platform.species.join(", ")}
                </div>
            </div>

            <div class="scenario-list">
                <strong>典型应用场景：</strong>
                ${platform.scenarios.map(s => `<span class="scenario-tag">${s}</span>`).join("")}
            </div>
        </div>
    `).join("");
}

// 初始加载
document.addEventListener("DOMContentLoaded", matchPlatforms);
