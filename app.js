document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link[data-target]');
  const screens = document.querySelectorAll('.screen[data-screen]');

  function showScreen(target) {
    screens.forEach((screen) => {
      const isActive = screen.dataset.screen === target;
      screen.classList.toggle('active', isActive);
    });

    navLinks.forEach((link) => {
      const isActive = link.dataset.target === target;
      link.classList.toggle('active', isActive);
    });

    document.body.dataset.page = target;
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const target = link.dataset.target;
      if (!target) return;
      showScreen(target);
    });
  });

  const STORAGE_KEY = 'museum-coin-upload-data';
  const defaultCoinData = [
    {
      id: 'han-wuzhu',
      name: '汉代五铢',
      type: '小平钱',
      era: '西汉',
      material: '铜',
      shape: '方孔圆钱',
      script: '楷书',
      region: '陕西',
      year: '西汉中期',
      weight: '3.7 g',
      diameter: '2.5 cm',
      holeWidth: '0.7 cm',
      thickness: '0.3 cm',
      inscription: '五铢',
      description: '钱文规整，纹饰清晰，体现西汉时期成熟的铸造技术与稳定的币制规模。',
      short: '钱文规整，纹饰清晰，体现西汉中期成熟铸造技术。',
      sourceRef: '《中国钱币大辞典·北宋篇》/西汉版式记录',
      tags: ['西汉', '铜币', '货币', '方孔圆钱', '楷书'],
      image: 'https://images.unsplash.com/photo-1616628182507-8f00b7d9d474?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 'tang-kaiyuan',
      name: '唐代开元通宝',
      type: '开元通宝',
      era: '唐',
      material: '铜',
      shape: '方孔圆钱',
      script: '楷书',
      region: '河南',
      year: '开元年间',
      weight: '2.8 g',
      diameter: '2.4 cm',
      holeWidth: '0.6 cm',
      thickness: '0.28 cm',
      inscription: '开元通宝',
      description: '刻文工整、形制统一，是唐代货币制度稳定与流通规模扩大的典型代表。',
      short: '币制标准化明显，反映唐代稳定的货币流通体系。',
      sourceRef: '中国钱币博物馆藏品数据库/唐代典型版式',
      tags: ['唐', '铜币', '货币', '方孔圆钱', '楷书'],
      image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb24e8?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 'qing-kangxi',
      name: '清代康熙通宝',
      type: '康熙通宝',
      era: '清',
      material: '铜',
      shape: '方孔圆钱',
      script: '楷书',
      region: '北京',
      year: '康熙年间',
      weight: '3.1 g',
      diameter: '2.6 cm',
      holeWidth: '0.7 cm',
      thickness: '0.31 cm',
      inscription: '康熙通宝',
      description: '铸造精整，表面纹理干净，兼具历史传播价值与收藏研究意义。',
      short: '铸造精整，具备历史传播价值与收藏研究意义。',
      sourceRef: '中国国家博物馆公开资料/清代钱币版式',
      tags: ['清', '收藏', '铜币', '方孔圆钱', '楷书'],
      image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 'yuanshi-yongtong',
      name: '元代永通币',
      type: '永通币',
      era: '元',
      material: '铁',
      shape: '方孔圆钱',
      script: '篆书',
      region: '山西',
      year: '元代前期',
      weight: '4.2 g',
      diameter: '2.8 cm',
      holeWidth: '0.8 cm',
      thickness: '0.36 cm',
      inscription: '永通币',
      description: '铸造厚重，纹饰较为简洁，反映元代币制转型和地方铸造习惯。',
      short: '厚重而简洁，体现元代币制与地区铸造特征。',
      sourceRef: '《中国钱币大辞典》/元代地方铸钱条目',
      tags: ['元', '铁币', '货币', '方孔圆钱', '篆书'],
      image: 'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 'song-qingyuan',
      name: '宋代庆元通宝',
      type: '庆元通宝',
      era: '宋',
      material: '铜',
      shape: '小平钱',
      script: '楷书',
      region: '江南',
      year: '北宋后期',
      weight: '2.9 g',
      diameter: '2.3 cm',
      holeWidth: '0.6 cm',
      thickness: '0.22 cm',
      inscription: '庆元通宝',
      description: '边缘较薄，字样清楚，说明宋代货币制造工艺已经相当成熟。',
      short: '字样清楚，反映宋代造币技术的成熟水平。',
      sourceRef: '中国钱币博物馆藏品标识/宋代钱币版式',
      tags: ['宋', '铜币', '收藏', '小平钱', '楷书'],
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 'qing-yuanming',
      name: '明代嘉靖通宝',
      type: '嘉靖通宝',
      era: '明',
      material: '银',
      shape: '方孔圆钱',
      script: '行书',
      region: '福建',
      year: '嘉靖年间',
      weight: '5.4 g',
      diameter: '2.9 cm',
      holeWidth: '0.7 cm',
      thickness: '0.35 cm',
      inscription: '嘉靖通宝',
      description: '银质较少见，表明当时金银流通与地方商业活动的活跃性。',
      short: '银质珍贵，兼具经济与文化史研究价值。',
      sourceRef: '中国国家博物馆数字馆藏/明代银币条目',
      tags: ['明', '银币', '收藏', '方孔圆钱', '行书'],
      image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=900&q=80'
    }
  ];

  const savedCoins = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
  const coinData = savedCoins && Array.isArray(savedCoins) && savedCoins.length ? savedCoins : defaultCoinData;

  const coinGrid = document.getElementById('coinGrid');
  const eraFilter = document.getElementById('eraFilter');
  const materialFilter = document.getElementById('materialFilter');
  const regionFilter = document.getElementById('regionFilter');
  const typeFilter = document.getElementById('typeFilter');
  const coinSearch = document.getElementById('coinSearch');
  const chips = document.querySelectorAll('.chip');
  const overlay = document.getElementById('coinDetailOverlay');
  const detailContent = document.querySelector('.detail-content');
  const closeOverlay = document.querySelector('.detail-close');
  const uploadBtn = document.getElementById('uploadCoinBtn');
  const uploadModal = document.getElementById('uploadModal');
  const closeUpload = document.getElementById('closeUploadModal');
  const cancelUpload = document.querySelector('.cancel-upload');
  const uploadForm = document.getElementById('coinUploadForm');
  const fileInput = document.getElementById('coinImageInput');
  const uploadPreview = document.getElementById('uploadPreview');
  const batchExcelInput = document.getElementById('batchExcelInput');
  const batchFolderInput = document.getElementById('batchFolderInput');
  const batchImportBtn = document.getElementById('batchImportBtn');

  const state = {
    era: 'all',
    material: 'all',
    region: 'all',
    type: 'all',
    tag: 'all',
    keyword: ''
  };

  const timelineState = {
    simplified: false
  };

  function getCoinTimelineYear(coin) {
    if (coin && Number.isFinite(Number(coin.timelineYear))) {
      return Number(coin.timelineYear);
    }

    const eraBaseMap = {
      西汉: -200,
      唐: 620,
      宋: 960,
      元: 1271,
      明: 1368,
      清: 1644
    };

    return eraBaseMap[coin.era] || 0;
  }

  function getTimelineCoins() {
    const ordered = [...coinData].sort((a, b) => getCoinTimelineYear(a) - getCoinTimelineYear(b));

    if (!timelineState.simplified) {
      return ordered;
    }

    const representatives = [];
    const seen = new Set();
    ordered.forEach((coin) => {
      if (!seen.has(coin.era)) {
        representatives.push(coin);
        seen.add(coin.era);
      }
    });

    return representatives.slice(0, 5);
  }

  function renderTimeline() {
    const axisRoot = document.getElementById('timelineAxis');
    const summary = document.getElementById('timelineSummary');
    const timelineCoins = getTimelineCoins();

    if (!axisRoot || !summary) return;

    summary.textContent = timelineState.simplified
      ? `已简化，保留 ${timelineCoins.length} 个主线钱币`
      : `已展示全部 ${timelineCoins.length} 个钱币`;

    if (!timelineCoins.length) {
      axisRoot.innerHTML = '<div class="empty-state">暂无可展示的时间轴数据</div>';
      return;
    }

    const years = timelineCoins.map((coin) => getCoinTimelineYear(coin));
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    const span = Math.max(maxYear - minYear, 1);

    const labelNodes = [];
    const timelineMarks = timelineCoins.map((coin) => {
      const position = ((getCoinTimelineYear(coin) - minYear) / span) * 100;
      const label = coin.era || coin.year || '年代';
      labelNodes.push(`<div class="timeline-axis-label" style="left:${position}%">${label}</div>`);
      return `
        <button class="timeline-node" type="button" data-id="${coin.id}" style="left:${position}%">
          <span class="timeline-dot"></span>
          <span class="timeline-year">${coin.year || coin.era}</span>
          <span class="timeline-name">${coin.name}</span>
        </button>
      `;
    }).join('');

    axisRoot.innerHTML = `
      <div class="timeline-track">
        <div class="timeline-line"></div>
        ${timelineMarks}
      </div>
      <div class="timeline-axis-labels">
        ${labelNodes.join('')}
      </div>
    `;

    axisRoot.querySelectorAll('.timeline-node').forEach((node) => {
      node.addEventListener('click', () => openDetail(node.dataset.id));
    });
  }

  function persistCoins() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(coinData));
  }

  function openUploadModal() {
    uploadModal.classList.add('active');
    uploadModal.setAttribute('aria-hidden', 'false');
  }

  function closeUploadModal() {
    uploadModal.classList.remove('active');
    uploadModal.setAttribute('aria-hidden', 'true');
    uploadForm.reset();
    uploadPreview.classList.remove('visible');
    uploadPreview.src = '';
  }

  function renderCoins() {
    const filtered = coinData.filter((coin) => {
      const matchEra = state.era === 'all' || coin.era === state.era;
      const matchMaterial = state.material === 'all' || coin.material === state.material;
      const matchRegion = state.region === 'all' || coin.region === state.region;
      const matchType = state.type === 'all' || coin.type === state.type;
      const matchTag = state.tag === 'all' || coin.tags.includes(state.tag);
      const matchKeyword = !state.keyword || `${coin.name}${coin.description}${coin.region}${coin.type}${coin.script}${coin.inscription || ''}`.toLowerCase().includes(state.keyword.toLowerCase());
      return matchEra && matchMaterial && matchRegion && matchType && matchTag && matchKeyword;
    });

    if (!filtered.length) {
      coinGrid.innerHTML = '<div class="empty-state">暂无符合条件的藏品</div>';
      return;
    }

    coinGrid.innerHTML = filtered.map((coin) => `
      <article class="coin-card">
        <button class="coin-image-button" type="button" data-id="${coin.id}">
          <div class="coin-art" style="background-image: linear-gradient(135deg, rgba(99,79,53,0.7), rgba(194,157,93,0.4)), url('${coin.image}')"></div>
        </button>
        <div class="coin-card-copy">
          <h3>${coin.name}</h3>
          <div class="coin-meta-line">${coin.era} · ${coin.material} · ${coin.type || '未标注'}</div>
          <p>${coin.short}</p>
          <div class="coin-tags">
            ${coin.tags.map((tag) => `<span class="coin-tag">${tag}</span>`).join('')}
          </div>
        </div>
      </article>
    `).join('');

    document.querySelectorAll('.coin-image-button').forEach((button) => {
      button.addEventListener('click', () => openDetail(button.dataset.id));
    });
  }

  function openDetail(id) {
    const coin = coinData.find((item) => item.id === id);
    if (!coin) return;

    detailContent.innerHTML = `
      <img class="detail-image" src="${coin.image}" alt="${coin.name}" />
      <div class="detail-info">
        <h3>${coin.name}</h3>
        <p>${coin.description}</p>
        <div class="detail-fields">
          <div class="detail-field"><span>年代</span><strong>${coin.year}</strong></div>
          <div class="detail-field"><span>类型</span><strong>${coin.type || '未标注'}</strong></div>
          <div class="detail-field"><span>材质</span><strong>${coin.material}</strong></div>
          <div class="detail-field"><span>形制</span><strong>${coin.shape || '未标注'}</strong></div>
          <div class="detail-field"><span>书体</span><strong>${coin.script || '未标注'}</strong></div>
          <div class="detail-field"><span>产地</span><strong>${coin.region}</strong></div>
          <div class="detail-field"><span>直径</span><strong>${coin.diameter}</strong></div>
          <div class="detail-field"><span>孔宽</span><strong>${coin.holeWidth || '未标注'}</strong></div>
          <div class="detail-field"><span>厚度</span><strong>${coin.thickness || '未标注'}</strong></div>
          <div class="detail-field"><span>重量</span><strong>${coin.weight}</strong></div>
          <div class="detail-field"><span>钱文</span><strong>${coin.inscription || '未标注'}</strong></div>
          <div class="detail-field"><span>出处</span><strong>${coin.sourceRef || '未标注'}</strong></div>
        </div>
      </div>
    `;

    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
  }

  function closeDetail() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
  }

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      uploadPreview.src = reader.result;
      uploadPreview.classList.add('visible');
    };
    reader.readAsDataURL(file);
  });

  function normalizeFileName(filename) {
    return String(filename || '')
      .trim()
      .replace(/\\/g, '/')
      .split('/').pop()
      .toLowerCase()
      .replace(/\.[^/.]+$/, '');
  }

  function parseTags(raw) {
    if (!raw) return ['收藏'];
    return Array.from(new Set(String(raw).split(/[;,|/]/).map((tag) => tag.trim()).filter(Boolean)));
  }

  async function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error('读取图片失败'));
      reader.readAsDataURL(file);
    });
  }

  async function importSingleCoinFromForm(formData) {
    const name = String(formData.get('name') || '').trim();
    const era = String(formData.get('era') || '').trim();
    const material = String(formData.get('material') || '').trim();
    const region = String(formData.get('region') || '').trim();
    const year = String(formData.get('year') || '').trim();
    const weight = String(formData.get('weight') || '').trim();
    const diameter = String(formData.get('diameter') || '').trim();
    const type = String(formData.get('type') || '').trim();
    const shape = String(formData.get('shape') || '').trim();
    const script = String(formData.get('script') || '').trim();
    const description = String(formData.get('description') || '').trim();
    const tagsInput = String(formData.get('tags') || '').trim();
    const imageFile = fileInput.files && fileInput.files[0];

    if (!name || !era || !material || !region || !year || !weight || !diameter || !type || !description) {
      return null;
    }

    let image = 'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80';
    if (imageFile) {
      image = await readFileAsDataUrl(imageFile);
    }

    const tags = parseTags(tagsInput);
    return {
      id: `upload-${Date.now()}`,
      name,
      type,
      era,
      material,
      shape: shape || '未标注',
      script: script || '未标注',
      region,
      year,
      weight,
      diameter,
      holeWidth: '未标注',
      thickness: '未标注',
      inscription: type,
      description,
      short: description.length > 60 ? `${description.slice(0, 60)}...` : description,
      sourceRef: '用户上传记录',
      tags: Array.from(new Set([...tags, type, era, material, shape || '未标注', script || '未标注', '收藏'])).filter(Boolean),
      image
    };
  }

  async function importBatchCoinsFromExcel() {
    const excelFile = batchExcelInput.files && batchExcelInput.files[0];
    const folderFiles = batchFolderInput.files ? Array.from(batchFolderInput.files) : [];

    if (!excelFile || !folderFiles.length) {
      alert('请先选择 Excel 文件和图片文件夹');
      return;
    }

    const imageMap = new Map();
    folderFiles.forEach((file) => {
      const fileName = normalizeFileName(file.name);
      if (!fileName) return;
      imageMap.set(fileName, file);
    });

    const workbook = XLSX.read(await excelFile.arrayBuffer(), { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });

    const imported = [];

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex += 1) {
      const row = rows[rowIndex];
      const rowValues = { ...row };
      const photoKey = Object.keys(rowValues).find((key) => key.toLowerCase() === 'photo');
      const photoValue = photoKey ? String(rowValues[photoKey] || '').trim() : '';
      if (!photoValue) continue;

      const matchedName = normalizeFileName(photoValue);
      const imageFile = imageMap.get(matchedName);
      if (!imageFile) continue;

      const rawName = Object.keys(rowValues).find((key) => key.toLowerCase() === 'name' || key.toLowerCase() === 'coinname' || key.toLowerCase() === '货币名称' || key.toLowerCase() === '名称');
      const rawEra = Object.keys(rowValues).find((key) => key.toLowerCase() === 'era' || key.toLowerCase() === '时代');
      const rawMaterial = Object.keys(rowValues).find((key) => key.toLowerCase() === 'material' || key.toLowerCase() === '材质');
      const rawRegion = Object.keys(rowValues).find((key) => key.toLowerCase() === 'region' || key.toLowerCase() === '产地');
      const rawYear = Object.keys(rowValues).find((key) => key.toLowerCase() === 'year' || key.toLowerCase() === '年代');
      const rawWeight = Object.keys(rowValues).find((key) => key.toLowerCase() === 'weight' || key.toLowerCase() === '重量');
      const rawDiameter = Object.keys(rowValues).find((key) => key.toLowerCase() === 'diameter' || key.toLowerCase() === '直径');
      const rawType = Object.keys(rowValues).find((key) => key.toLowerCase() === 'type' || key.toLowerCase() === '币值' || key.toLowerCase() === '版式' || key.toLowerCase() === 'coin_type');
      const rawShape = Object.keys(rowValues).find((key) => key.toLowerCase() === 'shape' || key.toLowerCase() === '形制');
      const rawScript = Object.keys(rowValues).find((key) => key.toLowerCase() === 'script' || key.toLowerCase() === '钱文' || key.toLowerCase() === '书体');
      const rawDescription = Object.keys(rowValues).find((key) => key.toLowerCase() === 'description' || key.toLowerCase() === '简介' || key.toLowerCase() === 'note');
      const rawTags = Object.keys(rowValues).find((key) => key.toLowerCase() === 'tags' || key.toLowerCase() === '标签');

      const name = String(rawName ? rowValues[rawName] : `导入藏品 ${rowIndex + 1}`).trim() || `导入藏品 ${rowIndex + 1}`;
      const era = String(rawEra ? rowValues[rawEra] : '未标注').trim() || '未标注';
      const material = String(rawMaterial ? rowValues[rawMaterial] : '铜').trim() || '铜';
      const region = String(rawRegion ? rowValues[rawRegion] : '未知').trim() || '未知';
      const type = String(rawType ? rowValues[rawType] : '').trim() || name;
      const shape = String(rawShape ? rowValues[rawShape] : '未标注').trim() || '未标注';
      const script = String(rawScript ? rowValues[rawScript] : '未标注').trim() || '未标注';
      const yearText = String(rawYear ? rowValues[rawYear] : '').trim() || '未知';
      const weightText = String(rawWeight ? rowValues[rawWeight] : '').trim() || '未知';
      const diameterText = String(rawDiameter ? rowValues[rawDiameter] : '').trim() || '未知';
      const descriptionText = String(rawDescription ? rowValues[rawDescription] : `这是${name}的数字藏品资料。`).trim() || `这是${name}的数字藏品资料。`;
      const tagText = String(rawTags ? rowValues[rawTags] : '').trim();
      const image = await readFileAsDataUrl(imageFile);

      imported.push({
        id: `batch-${Date.now()}-${rowIndex}`,
        name,
        type,
        era,
        material,
        shape,
        script,
        region,
        year: yearText,
        weight: weightText,
        diameter: diameterText,
        holeWidth: '未标注',
        thickness: '未标注',
        inscription: type,
        description: descriptionText,
        short: descriptionText.length > 60 ? `${descriptionText.slice(0, 60)}...` : descriptionText,
        sourceRef: 'Excel批量导入',
        tags: Array.from(new Set([...(parseTags(tagText)), era, material, type, shape, script, '收藏'])).filter(Boolean),
        image
      });
    }

    if (!imported.length) {
      alert('未找到可匹配的图片文件，请确认 Excel 中 photo 列名称为 photo，并且图片文件名与它一致。');
      return;
    }

    coinData.unshift(...imported);
    persistCoins();
    renderCoins();
    closeUploadModal();
    alert(`已成功导入 ${imported.length} 个藏品`);
  }

  uploadForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(uploadForm);
    const coin = await importSingleCoinFromForm(formData);
    if (!coin) {
      return;
    }

    coinData.unshift(coin);
    persistCoins();
    renderCoins();
    closeUploadModal();
  });

  uploadBtn.addEventListener('click', openUploadModal);
  closeUpload.addEventListener('click', closeUploadModal);
  cancelUpload.addEventListener('click', closeUploadModal);
  batchImportBtn.addEventListener('click', importBatchCoinsFromExcel);
  uploadModal.addEventListener('click', (event) => {
    if (event.target === uploadModal) {
      closeUploadModal();
    }
  });

  eraFilter.addEventListener('change', (event) => {
    state.era = event.target.value;
    renderCoins();
  });

  materialFilter.addEventListener('change', (event) => {
    state.material = event.target.value;
    renderCoins();
  });

  regionFilter.addEventListener('change', (event) => {
    state.region = event.target.value;
    renderCoins();
  });

  typeFilter.addEventListener('change', (event) => {
    state.type = event.target.value;
    renderCoins();
  });

  coinSearch.addEventListener('input', (event) => {
    state.keyword = event.target.value.trim();
    renderCoins();
  });

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((item) => item.classList.toggle('active', item === chip));
      state.tag = chip.dataset.tag || 'all';
      renderCoins();
    });
  });

  const timelineSimplifyBtn = document.getElementById('timelineSimplifyBtn');
  const timelineResetBtn = document.getElementById('timelineResetBtn');

  timelineSimplifyBtn.addEventListener('click', () => {
    timelineState.simplified = true;
    renderTimeline();
  });

  timelineResetBtn.addEventListener('click', () => {
    timelineState.simplified = false;
    renderTimeline();
  });

  closeOverlay.addEventListener('click', closeDetail);
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closeDetail();
    }
  });

  renderCoins();
  renderTimeline();

  const counters = document.querySelectorAll('[data-count]');
  counters.forEach((counter) => {
    const target = Number(counter.dataset.count || 0);
    if (!Number.isFinite(target)) return;

    let current = 0;
    const duration = 1200;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));

    const tick = () => {
      current += step;
      if (current >= target) {
        counter.textContent = target;
        return;
      }
      counter.textContent = current;
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  });
});
