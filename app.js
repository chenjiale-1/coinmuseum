document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link[data-target]');
  const screens = document.querySelectorAll('.screen[data-screen]');
  const authModal = document.getElementById('authModal');
  const loginTrigger = document.getElementById('loginTrigger');
  const authClose = document.getElementById('authClose');
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('usernameInput');
  const passwordInput = document.getElementById('passwordInput');
  const authMessage = document.getElementById('authMessage');
  const guestLoginBtn = document.getElementById('guestLoginBtn');
  const userBadge = document.getElementById('userBadge');
  const langToggle = document.getElementById('langToggle');
  const appState = {
    lang: 'zh',
    ontology: null
  };

  const fieldTranslations = {
    '西汉': 'Western Han',
    '唐': 'Tang',
    '宋': 'Song',
    '元': 'Yuan',
    '明': 'Ming',
    '清': 'Qing',
    '夏商周': 'Xia-Shang-Zhou',
    '春秋': 'Spring and Autumn',
    '战国': 'Warring States',
    '新莽': 'Xin Mang',
    '三国': 'Three Kingdoms',
    '晋': 'Jin',
    '十六国': 'Sixteen Kingdoms',
    '南北朝': 'Northern and Southern Dynasties',
    '海贝': 'Cowrie shell',
    '青铜': 'Bronze',
    '贝化': 'Cowrie-derived money',
    '铜钱牌': 'Bronze coin plaque',
    '针首刀': 'Needle-tip knife money',
    '半两钱': 'Banliang coin',
    '五铢钱': 'Wuzhu coin',
    '大泉': 'Daquan coin',
    '大布黄千': 'Dabu Huangqian',
    '货泉': 'Huoquan',
    '四铢': 'Sizhu coin',
    '铜': 'Copper',
    '银': 'Silver',
    '铁': 'Iron',
    '白铜': 'White copper',
    '五铢': 'Wuzhu',
    '未标注': 'Not specified',
    '未知': 'Unknown',
    '未指定': 'Not specified',
    '陕西': 'Shaanxi',
    '河南': 'Henan',
    '北京': 'Beijing',
    '山西': 'Shanxi',
    '江南': 'Jiangnan',
    '福建': 'Fujian',
    '四川': 'Sichuan',
    '南京': 'Nanjing',
    '小平钱': 'Small cash',
    '开元通宝': 'Kaiyuan Tongbao',
    '康熙通宝': 'Kangxi Tongbao',
    '永通币': 'Yongtong Bi',
    '庆元通宝': 'Qingyuan Tongbao',
    '嘉靖通宝': 'Jiajing Tongbao',
    '货泉': 'Huoquan',
    '中元通宝': 'Zhongyuan Tongbao',
    '元丰通宝': 'Yuanfeng Tongbao',
    '至元通宝': 'Zhiyuan Tongbao',
    '洪武通宝': 'Hongwu Tongbao',
    '同治通宝': 'Tongzhi Tongbao',
    '半两': 'Banliang',
    '方孔圆钱': 'Round coin with square hole',
    '刀币': 'Knife coin',
    '楷书': 'Regular script',
    '篆书': 'Seal script',
    '行书': 'Running script',
    '隶书': 'Clerical script',
    '铜币': 'Copper coin',
    '银币': 'Silver coin',
    '铁币': 'Iron coin',
    '货币': 'Currency',
    '收藏': 'Collection',
    '铭文': 'Inscription',
    '圆形': 'Round',
    '全部': 'All',
    '西汉': 'Western Han',
    '唐': 'Tang',
    '宋': 'Song',
    '元': 'Yuan',
    '明': 'Ming',
    '清': 'Qing',
    '年代': 'Era',
    '类型': 'Type',
    '材质': 'Material',
    '形制': 'Shape',
    '书体': 'Script',
    '产地': 'Origin',
    '直径': 'Diameter',
    '孔宽': 'Hole width',
    '厚度': 'Thickness',
    '重量': 'Weight',
    '钱文': 'Inscription',
    '出处': 'Source',
    '未标注': 'Not specified',
    '汉代五铢': 'Han Wuzhu',
    '唐代开元通宝': 'Tang Kaiyuan Tongbao',
    '清代康熙通宝': 'Qing Kangxi Tongbao',
    '元代永通币': 'Yuan Yongtong Bi',
    '宋代庆元通宝': 'Song Qingyuan Tongbao',
    '明代嘉靖通宝': 'Ming Jiajing Tongbao',
    '汉代货泉': 'Han Huoquan',
    '唐代中元通宝': 'Tang Zhongyuan Tongbao',
    '宋代元丰通宝': 'Song Yuanfeng Tongbao',
    '元代至元通宝': 'Yuan Zhiyuan Tongbao',
    '明代洪武通宝': 'Ming Hongwu Tongbao',
    '清代同治通宝': 'Qing Tongzhi Tongbao',
    '汉代半两': 'Han Banliang'
  };

  const textTranslations = {
    '现有藏品': 'Existing collection',
    '藏品总数': 'Total coins',
    '币名类型': 'Coin types',
    '主要铸造地': 'Main minting regions',
    '主要材质': 'Main materials',
    '已展示全部钱币': 'All coins displayed',
    '已按年代顺序展示 %d 个时代': 'Displayed in chronological order across %d eras',
    '当前展示：%s 时代的钱币': 'Currently showing coins from the %s era',
    '暂无可展示的时间轴数据': 'No timeline data available',
    '暂无时间轴数据': 'No timeline data',
    '该城市出产的货币如下：': 'The following coins were produced in this city:',
    '暂无记录': 'No records yet',
    '确认删除藏品“%s”吗？': 'Delete the collection item "%s"?',
    '藏品删除成功': 'Collection item deleted successfully',
    '删除藏品': 'Delete item',
    '已成功导入 %d 个藏品': 'Successfully imported %d coin items',
    '未找到可匹配的图片文件，请确认 Excel 中 photo 列名称为 photo，并且图片文件名与它一致。': 'No matching image files were found. Please confirm that the Excel column is named photo and that the filenames match the images.',
    '上传货币': 'Upload coin',
    '选择货币图片': 'Select coin image',
    '藏品名称': 'Collection name',
    '时代': 'Era',
    '材料': 'Material',
    '产地': 'Origin',
    '用户名': 'Username',
    '关键词搜索': 'Search',
    '按币名、地区、书体、铭文检索': 'Search by name, region, script, or inscription',
    '游客': 'Guest',
    '已登录': 'Logged in'
  };

  const pinyinFallbackMap = {
    '首页': 'Shouye',
    '关于项目': 'Guanyu Xiangmu',
    '数字藏品': 'Shuzi Cangpin',
    '时间轴': 'Shijian Zhou',
    '产地地图': 'Chandi Ditu',
    '本体结构': 'Benti Jiegou',
    '登录': 'Login',
    '游客': 'Youke',
    '欢迎访问数字藏品馆': 'Huanying Fangwen Shuzicangpinguan',
    '账号': 'Zhanghao',
    '密码': 'Mima',
    '请输入账号': 'Qingshuru Zhanghao',
    '请输入密码': 'Qingshuru Mima',
    '默认账号：admin / admin123': 'Moren Zhanghao: admin / admin123',
    '浏览藏品': 'Liulan Cangpin',
    '了解更多': 'Liaoji Gao Duo',
    '项目团队': 'Xiangmu Tuandui',
    '项目负责人': 'Xiangmu Fuzeren',
    '钱币学与数字人文学研究': 'Qianbixue yu Shuzirenwenxue Yanjiu',
    '数据建设': 'Shuju Jianshe',
    '古代钱币信息结构化整理': 'Gudaiqianbi Xinxi Jiegouhua Zhengli',
    '数字展示': 'Shuzi Zhanshi',
    '界面设计与知识可视化开发': 'Jiemian Sheji yu Zhishi Keshihua Kaifa',
    '现有藏品': 'Xianyou Cangpin',
    '数据格式': 'Shuju Geshi',
    '藏品': 'Cangpin',
    '藏品总数': 'Cangpin Zongshu',
    '币名类型': 'Binming Leixing',
    '主要铸造地': 'Zhuyao Zhuzaodi',
    '主要材质': 'Zhuyao Caizhi',
    '时代': 'Shidai',
    '材质': 'Caizhi',
    '产地': 'Chandi',
    '类型/版式': 'Leixing/Banshi',
    '关键词搜索': 'Guanjianci Sousuo',
    '按币名、地区、书体、铭文检索': 'An Binming, Diqu, Shuti, Mingwen Sousuo',
    '全部': 'Quanbu',
    '西汉': 'Xihan',
    '唐': 'Tang',
    '宋': 'Song',
    '元': 'Yuan',
    '明': 'Ming',
    '清': 'Qing',
    '铜': 'Tong',
    '银': 'Yin',
    '铁': 'Tie',
    '陕西': 'Shaanxi',
    '河南': 'Henan',
    '北京': 'Beijing',
    '山西': 'Shanxi',
    '江南': 'Jiangnan',
    '福建': 'Fujian',
    '小平钱': 'Xiaopingqian',
    '开元通宝': 'Kaiyuan Tongbao',
    '康熙通宝': 'Kangxi Tongbao',
    '永通币': 'Yongtongbi',
    '庆元通宝': 'Qingyuan Tongbao',
    '嘉靖通宝': 'Jiajing Tongbao',
    '收藏': 'Shoucang',
    '圆形': 'Yuanxing',
    '铭文': 'Mingwen',
    '钱币': 'Qianbi',
    '钱币类型': 'Qianbi Leixing',
    '地域': 'Diqu',
    '政权': 'Zhengquan',
    '铸造机构': 'Zhuzuo Jigou',
    '人物': 'Renwu',
    '流通路线': 'Liutong Luxian',
    '核心关系类型': 'Hexin Guanxi Leixing',
    '发行关系': 'Faxing Guanxi',
    '铸造关系': 'Zhuzuo Guanxi',
    '隶属关系': 'Lisu Guanxi',
    '年代命名关系': 'Niandai Mingming Guanxi',
    '变体关系': 'BianTi Guanxi',
    '产地关系': 'Chandi Guanxi',
    '流通关系': 'Liutong Guanxi',
    '核心实体层': 'Hexin Shiti Ceng',
    '关系层': 'Guanxi Ceng',
    '应用层': 'Yingyong Ceng',
    '五铢': 'Wuzhu',
    '这是五铢的数字藏品资料': 'Zhe shi Wuzhu de shuzi cangpin ziliao',
    '数字藏品资料': 'Shuzi cangpin ziliao',
    '资料': 'ziliao',
    '这是': 'Zhe shi',
    '未标注': 'Not specified',
    '未知': 'Unknown'
  };

  const charPinyinMap = {
    '这': 'zhe', '是': 'shi', '五': 'wu', '铢': 'zhu', '的': 'de', '数': 'shu',
    '字': 'zi', '藏': 'cang', '品': 'pin', '资': 'zi', '料': 'liao', '未': 'wei',
    '知': 'zhi', '名': 'ming', '称': 'cheng', '币': 'bi', '材': 'cai', '质': 'zhi',
    '代': 'dai', '年': 'nian', '产': 'chan', '地': 'di', '形': 'xing', '制': 'zhi',
    '书': 'shu', '体': 'ti', '钱': 'qian', '文': 'wen', '图': 'tu', '像': 'xiang',
    '源': 'yuan', '出': 'chu', '处': 'chu', '注': 'zhu', '重': 'zhong', '量': 'liang',
    '直': 'zhi', '径': 'jing', '孔': 'kong', '宽': 'kuan', '厚': 'hou', '度': 'du',
    '工': 'gong', '艺': 'yi', '历': 'li', '史': 'shi', '政': 'zheng', '府': 'fu',
    '民': 'min', '国': 'guo', '文': 'wen', '物': 'wu', '版': 'ban', '式': 'shi',
    '铁': 'tie', '铜': 'tong', '银': 'yin', '白': 'bai', '泉': 'quan', '道': 'dao'
  };

  const translations = {
    zh: {
      nav: {
        home: '首页',
        about: '关于项目',
        gallery: '数字藏品',
        timeline: '时间轴',
        map: '产地地图',
        structure: '本体结构'
      },
      login: '登录',
      guest: '游客',
      guestLogin: '游客登录',
      welcomeTitle: '欢迎访问数字藏品馆',
      username: '账号',
      password: '密码',
      usernamePlaceholder: '请输入账号',
      passwordPlaceholder: '请输入密码',
      defaultAccount: '默认账号：admin / admin123',
      heroTitle: '中国古代钱币知识图谱与数字藏品',
      heroText: '面向中国古代钱币研究，汇集钱币图片、产地、币名、年份、材质等关键信息，形成结构化知识库，支持学术研究、展示与再利用。',
      browseCollection: '浏览藏品',
      learnMore: '了解更多',
      aboutTag: '关于项目',
      aboutTitle: '关于项目',
      teamTag: '项目团队',
      teamTitle: '项目团队',
      teamLeader: '项目负责人',
      teamLeaderDesc: '钱币学与数字人文学研究',
      teamData: '数据建设',
      teamDataDesc: '古代钱币信息结构化整理',
      teamDisplay: '数字展示',
      teamDisplayDesc: '界面设计与知识可视化开发',
      collectionTag: '数字藏品',
      collectionTitle: '数字藏品',
      collectionLead: '以知识图谱属性为入口，支持分面筛选、字段语法检索与同类钱币关联发现。',
      graphSearchTag: '知识图谱检索',
      graphSearchTitle: '从属性到关系，定位一枚钱币',
      attributeSearchTitle: '属性搜索',
      attributeSearchHint: '按本体属性组合筛选，可使用“字段:值”语法',
      applyPropertyQuery: '解析属性',
      clearSearch: '清空检索',
      inscriptionPlaceholder: '如：五铢、半两',
      excavationPlaceholder: '如：河南、湖北',
      propertyQueryPlaceholder: '属性语法：材质:青铜 形制:方孔圆钱 钱文:五铢',
      propertyExampleBronzeRound: '青铜方孔圆钱',
      propertyExampleWarringStates: '战国钱币',
      propertyExampleWuzhu: '五铢钱文',
      propertyExampleHenanExcavated: '河南出土',
      eraLabel: '时代',
      uploadCoin: '+ 上传货币',
      timelineTag: '时间轴',
      timelineTitle: '钱币时间轴',
      timelineLead: '以方孔圆钱为时间刻度，沿千年币制长卷观察材质、形制与铸造地的变化。',
      timelineSummaryDefault: '已展示全部钱币',
      timelineSimplify: '主币脉络',
      timelineReset: '完整长卷',
      mapTag: '产地地图',
      mapTitle: '货币产地地图',
      mapPromptTitle: '点击城市查看货币',
      mapPromptText: '请选择上方地图中的产地城市，可查看该地出产的钱币名称。',
       structureTag: '本体结构',
       structureTitle: '本体结构',
       structureIntro: '本本体以《中国钱币大辞典·北宋篇》等正式出版的钱币学工具书、国家级博物馆公开资料和专业学术研究成果为主要数据来源，将中国古代钱币知识抽象为实体、关系与数据属性三个层次，以支持学术研究、数字展示与知识再利用。',
       entityTypesTitle: '实体类型',
       entityCoinTitle: 'Coin 钱币',
       entityCoinText: '中国古代官方所定发行的钱币实例，对应具体版式记录，是知识图谱的核心实体。',
       entityCoinTypeTitle: 'CoinType 钱币类型',
       entityCoinTypeText: '抽象类型实体（如“天禧通宝”），用于聚合同一名称下的多种具体版式。',
       entityRegimeTitle: 'Regime 政权',
       entityRegimeText: '钱币发行所属的政权，如北宋、唐、明等。',
       entityMintTitle: 'Mint 铸造机构',
       entityMintText: '钱监、宝泉局、宝源局及地方铸钱机构等，负责具体钱币的铸造。',
       entityPersonTitle: 'Person 历史人物',
       entityPersonText: '主导币制改革、主持铸钱或从事泉学研究的历史人物，如王莽、唐玄宗等。',
       entityEraTitle: 'Era 年号',
       entityEraText: '钱币命名所依据的年号，如“天禧”“开元”等。',
       entityRegionTitle: 'Region 地区',
       entityRegionText: '铸造地或流通区域，包含标准地名与历史地名对照。',
       entityRouteTitle: 'Route 流通路线',
       entityRouteText: '钱币流通/贸易路线，用于描述货币在区域网络中的传播与交换（待定）。',
       entityAreaTitle: 'Area 出土地',
       entityAreaText: '钱币挖掘出土地，用于考古与实物研究（待定）。',
       entityMaterialTitle: 'Material 材质',
       entityMaterialText: '钱币制作所使用的主材质，如青铜、黄铜、铁、铅、银、金、纸等。',
       entityShapeTitle: 'Shape 形制',
       entityShapeText: '钱币的基本形制，如方孔圆钱、尖足布、刀币、元宝形银锭等。',
       entityScriptTitle: 'Script 书体',
       entityScriptText: '钱币钱文所使用的文字书体类型，如楷书、篆书等。',
       dataPropertiesTitle: '数据属性',
       dataCoinTitle: 'Coin 钱币',
       dataCoinName: 'name 名称：钱币全称',
       dataCoinType: 'type 类型：币值或形制等级',
       dataCoinDiameter: 'diameter_cm 直径：单位厘米，可记录区间值',
       dataCoinHole: 'hole_width_cm 孔宽：单位厘米，可记录区间值',
       dataCoinRim: 'rim_thickness_cm 厚度：单位厘米，可记录区间值',
       dataCoinWeight: 'weight_g 重量：单位克，注明实测值或参考值',
       dataCoinImage: 'image 图像：存储路径或 URI',
       dataCoinImageSource: 'image_source 图像来源：如中国钱币博物馆、中国国家博物馆',
       dataCoinSourceRef: 'source_ref 文献出处：辞典条目号/页码或博物馆藏品编号',
       dataRegimeTitle: 'Regime 政权',
       dataRegimeName: 'name 名称：政权标准名称',
       dataRegimeAlias: 'alias 别称：政权别称',
       dataRegimeStart: 'start_year 建立年份：公历年份',
       dataRegimeEnd: 'end_year 灭亡年份：公历年份',
       dataRegimeCapital: 'capital 都城',
       dataMintTitle: 'Mint 铸造机构',
       dataMintName: 'name 名称：机构标准名称',
       dataMintStart: 'active_start 建立年份：公历年份',
       dataMintEnd: 'active_end 取缔年份：公历年份',
       dataPersonTitle: 'Person 历史人物',
       dataPersonName: 'name 名字',
       dataPersonOffice: 'office 官职',
       dataPersonBirth: 'birth 出生年份：公历年份',
       dataPersonDie: 'die 死亡年份：公历年份',
       dataPersonAchievement: 'achievement 成就：与货币相关的事迹',
       dataEraTitle: 'Era 年号',
       dataEraName: 'name 年号名称：如“天禧”“开元”',
       dataEraStart: 'start_year 起始年份：公历年份',
       dataEraEnd: 'end_year 结束年份：公历年份',
       dataRegionTitle: 'Region 地区',
       dataRegionName: 'name 标准地名：现代通用地名',
       dataRegionHistorical: 'historical_name 历史地名：钱币学文献中使用的历史地名',
       dataRegionCoordinates: 'coordinates 坐标：经纬度（可选）',
       dataRegionSourceRef: 'source_ref 地名对照依据：如《中国历史地图集》、CHGIS 等',
       dataOtherTitle: 'Material / Shape / Script / Source_ref',
       dataOtherMaterial: 'Material name：材质名',
       dataOtherShape: 'Shape name：形制名称',
       dataOtherScript: 'Script name：书体名称',
       dataOtherSourceRef: 'Source_ref name：文献出处，如辞典条目号/页码',
       structureRelationsTitle: '核心关系类型',
       structureRelation1: 'issuedBy：coin → Regime，钱币由某政权发行',
       structureRelation2: 'mintedAt：coin → Mint，钱币由某机构铸造',
       structureRelation3: 'belongsToRegime：Mint → Regime，铸造机构隶属于某政权',
       structureRelation4: 'overseesMint：Person → Mint，人物主持某铸造机构事务',
       structureRelation5: 'reformedCurrency：Person → Regime / coin，人物主导某次币制改革',
       structureRelation6: 'succeededBy：Regime → Regime，政权更替关系，用于年代排序与时间轴展示',
       structureRelation7: 'isVariantOf：coin → CoinType，具体版式记录归属于某一钱币抽象类型',
       structureRelation8: 'namedAfterEra：coin → Era，钱币名称所依据的年号',
       structureRelation9: 'mintedInRegion：Mint → Region，铸造机构所在地区',
       structureRelation10: 'circulatesIn：coin → Region，钱币流通所及的地区',
       structureRelation11: 'circulatesAlong：coin → Route，钱币流通所经的路线',
       structureRelation12: 'madeOf：coin → Material，钱币制作所使用的主要材质',
       structureRelation13: 'hasShape：coin → Shape，钱币所属的基本形制',
       structureRelation14: 'usesScript：coin → Script，钱币钱文所使用的书体',
       structureRelation15: 'sourcedFrom：coin → Source_ref，钱币实体信息来源于具体文献或资料条目',
       aboutText1: '钱币博物馆不仅是收藏与展示中华文明的重要载体，更是连接历史记忆与现代社会认知的重要桥梁。通过系统整理古代钱币的地域、年代、材质、铸造工艺与文化内涵，可以让公众在更直观的方式中理解中国古代经济、政治与民俗生活。它让沉睡的历史以数字化形式复活，帮助后人从实物中感受文明的脉络，也为科研、教学与文化传播提供可靠的知识基础。',
       aboutText2: '这种项目的意义在于：它把分散的文物信息结构化、可视化，并以知识图谱的方式建立关联，提升文化遗产的可检索性和可利用性。一座钱币博物馆，不只是一个收藏空间，更是让古老货币重新讲述国家与社会故事的开放平台。',
      fileAccessWarning: '请通过 http://127.0.0.1:8000 访问网站，再登录。',
      loginSuccess: '登录成功',
      loginFailure: '登录失败',
      guestLoginSuccess: '游客登录成功',
      noData: '暂无可展示的时间轴数据',
      noTimelineData: '暂无时间轴数据',
      loggedInSuffix: '已登录',
      guestLabel: '游客',
      homeStatsLabel: '现有藏品',
      statTotal: '藏品总数',
      statTypes: '币名类型',
      statRegions: '主要铸造地',
      statMaterials: '主要材质',
      digitalCollection: '数字藏品',
      dataFormat: '数据格式',
      filter: {
        all: '全部',
        xihan: '西汉',
        tang: '唐',
        song: '宋',
        yuan: '元',
        ming: '明',
        qing: '清',
        copper: '铜',
        silver: '银',
        iron: '铁',
        shaanxi: '陕西',
        henan: '河南',
        beijing: '北京',
        shanxi: '山西',
        jiangnan: '江南',
        fujian: '福建',
        xiaoping: '小平钱',
        kaiyuan: '开元通宝',
        kangxi: '康熙通宝',
        yongtong: '永通币',
        qingyuan: '庆元通宝',
        jiajing: '嘉靖通宝',
        keyword: '关键词搜索',
        keywordPlaceholder: '按币名、地区、书体、铭文检索',
        material: '材质',
        region: '产地',
        type: '类型/版式',
        shape: '形制',
        script: '书体',
        inscription: '钱文',
        excavation: '出土地点',
        era: '时代',
        search: '关键词搜索',
        allTag: '全部',
        xihanTag: '西汉',
        copperTag: '铜币',
        collectionTagShort: '收藏',
        roundTag: '圆形',
        inscriptionTag: '铭文'
      }
    },
    en: {
      nav: {
        home: 'Home',
        about: 'About',
        gallery: 'Collection',
        timeline: 'Timeline',
        map: 'Map',
        structure: 'Structure'
      },
      login: 'Login',
      guest: 'Guest',
      guestLogin: 'Guest Login',
      welcomeTitle: 'Welcome to the Digital Coin Museum',
      username: 'Username',
      password: 'Password',
      usernamePlaceholder: 'Enter username',
      passwordPlaceholder: 'Enter password',
      defaultAccount: 'Default account: admin / admin123',
      heroTitle: 'Chinese Ancient Coin Knowledge Graph and Digital Collection',
      heroText: 'Focused on the study of Chinese ancient coins, this platform aggregates coin images, origins, denominations, years, materials and other core information into a structured knowledge base for academic research, display and reuse.',
      browseCollection: 'Browse Collection',
      learnMore: 'Learn More',
      aboutTag: 'About',
      aboutTitle: 'About the Project',
      teamTag: 'Team',
      teamTitle: 'Project Team',
      teamLeader: 'Project Director',
      teamLeaderDesc: 'Numismatics and digital humanities research',
      teamData: 'Data Construction',
      teamDataDesc: 'Structured organization of ancient coin information',
      teamDisplay: 'Digital Presentation',
      teamDisplayDesc: 'Interface design and knowledge visualization',
      collectionTag: 'Collection',
      collectionTitle: 'Collection',
      collectionLead: 'Search by knowledge-graph properties through facets, field syntax, and related-coin discovery.',
      graphSearchTag: 'Knowledge Graph Search',
      graphSearchTitle: 'Find a coin through attributes and relations',
      attributeSearchTitle: 'Attribute Search',
      attributeSearchHint: 'Combine ontology properties or use “field:value” syntax',
      applyPropertyQuery: 'Parse attributes',
      clearSearch: 'Clear search',
      inscriptionPlaceholder: 'e.g. Wuzhu, Banliang',
      excavationPlaceholder: 'e.g. Henan, Hubei',
      propertyQueryPlaceholder: 'Syntax: material:bronze shape:round coin inscription:Wuzhu',
      propertyExampleBronzeRound: 'Bronze round coin',
      propertyExampleWarringStates: 'Warring States coins',
      propertyExampleWuzhu: 'Wuzhu inscription',
      propertyExampleHenanExcavated: 'Henan excavated',
      eraLabel: 'Era',
      uploadCoin: '+ Upload Coin',
      timelineTag: 'Timeline',
      timelineTitle: 'Chronology',
      timelineLead: 'Follow square-holed cash coins across two millennia of changing materials, forms, scripts, and minting places.',
      timelineSummaryDefault: 'All coins displayed',
      timelineSimplify: 'Key coins',
      timelineReset: 'Full scroll',
      mapTag: 'Map',
      mapTitle: 'Production Map',
      mapPromptTitle: 'Click a city to view coins',
      mapPromptText: 'Select a city on the map to see the coins produced there.',
       structureTag: 'Structure',
       structureTitle: 'Ontology Structure',
       structureIntro: 'This ontology draws on formally published numismatic reference works such as the Encyclopedia of Chinese Coins (Northern Song Volume), public collections of national museums, and professional academic research. It abstracts knowledge about ancient Chinese coins into entities, relations, and data properties to support academic research, digital display, and knowledge reuse.',
       entityTypesTitle: 'Entity Types',
       entityCoinTitle: 'Coin',
       entityCoinText: 'A concrete coin instance officially issued in ancient China; the core entity of the knowledge graph.',
       entityCoinTypeTitle: 'CoinType',
       entityCoinTypeText: 'An abstract type (e.g., “Tianxi Tongbao”) that groups multiple concrete variants under the same name.',
       entityRegimeTitle: 'Regime',
       entityRegimeText: 'The political regime that issued the coin, such as Northern Song, Tang, or Ming.',
       entityMintTitle: 'Mint',
       entityMintText: 'Minting institutions such as imperial mints, Baoquan Bureau, Baoyuan Bureau, and local mints.',
       entityPersonTitle: 'Person',
       entityPersonText: 'Historical figures who led currency reform, supervised minting, or studied numismatics, such as Wang Mang and Emperor Xuanzong of Tang.',
       entityEraTitle: 'Era',
       entityEraText: 'The reign title from which the coin name is derived, such as “Tianxi” or “Kaiyuan”.',
       entityRegionTitle: 'Region',
       entityRegionText: 'Minting or circulation region, including standard modern names and historical name mappings.',
       entityRouteTitle: 'Route',
       entityRouteText: 'Trade or circulation route of a coin, used to describe transmission and exchange in regional networks (pending).',
       entityAreaTitle: 'Area',
       entityAreaText: 'The excavation site of a coin, supporting archaeological and physical research (pending).',
       entityMaterialTitle: 'Material',
       entityMaterialText: 'Main material used to make the coin, such as bronze, brass, iron, lead, silver, gold, or paper.',
       entityShapeTitle: 'Shape',
       entityShapeText: 'Basic form of the coin, such as round square-holed coin, pointed-foot spade, knife coin, or ingot.',
       entityScriptTitle: 'Script',
       entityScriptText: 'The calligraphic style used on the coin inscription, such as regular script or seal script.',
       dataPropertiesTitle: 'Data Properties',
       dataCoinTitle: 'Coin',
       dataCoinName: 'name: full name of the coin',
       dataCoinType: 'type: denomination or form grade',
       dataCoinDiameter: 'diameter_cm: in centimeters; interval values allowed',
       dataCoinHole: 'hole_width_cm: in centimeters; interval values allowed',
       dataCoinRim: 'rim_thickness_cm: in centimeters; interval values allowed',
       dataCoinWeight: 'weight_g: in grams; indicate measured or reference value',
       dataCoinImage: 'image: storage path or URI',
       dataCoinImageSource: 'image_source: owning institution, e.g., China Numismatic Museum',
       dataCoinSourceRef: 'source_ref: dictionary entry/page or museum accession number',
       dataRegimeTitle: 'Regime',
       dataRegimeName: 'name: standard name of the regime',
       dataRegimeAlias: 'alias: alternative name',
       dataRegimeStart: 'start_year: founding year (CE)',
       dataRegimeEnd: 'end_year: fall year (CE)',
       dataRegimeCapital: 'capital: capital city',
       dataMintTitle: 'Mint',
       dataMintName: 'name: standard name of the institution',
       dataMintStart: 'active_start: founding year (CE)',
       dataMintEnd: 'active_end: dissolution year (CE)',
       dataPersonTitle: 'Person',
       dataPersonName: 'name',
       dataPersonOffice: 'office: official title',
       dataPersonBirth: 'birth: birth year (CE)',
       dataPersonDie: 'die: death year (CE)',
       dataPersonAchievement: 'achievement: currency-related deeds',
       dataEraTitle: 'Era',
       dataEraName: 'name: reign title such as “Tianxi” or “Kaiyuan”',
       dataEraStart: 'start_year: start year (CE)',
       dataEraEnd: 'end_year: end year (CE)',
       dataRegionTitle: 'Region',
       dataRegionName: 'name: standard modern place name',
       dataRegionHistorical: 'historical_name: historical name used in numismatic literature',
       dataRegionCoordinates: 'coordinates: latitude and longitude (optional)',
       dataRegionSourceRef: 'source_ref: authoritative gazetteer such as CHGIS',
       dataOtherTitle: 'Material / Shape / Script / Source_ref',
       dataOtherMaterial: 'Material name: material name',
       dataOtherShape: 'Shape name: shape name',
       dataOtherScript: 'Script name: script name',
       dataOtherSourceRef: 'Source_ref name: bibliographic source such as entry/page',
       structureRelationsTitle: 'Core Relation Types',
       structureRelation1: 'issuedBy: coin → Regime, the coin was issued by a regime',
       structureRelation2: 'mintedAt: coin → Mint, the coin was minted at an institution',
       structureRelation3: 'belongsToRegime: Mint → Regime, the mint belongs to a regime',
       structureRelation4: 'overseesMint: Person → Mint, the person oversaw mint affairs',
       structureRelation5: 'reformedCurrency: Person → Regime / coin, the person led a currency reform',
       structureRelation6: 'succeededBy: Regime → Regime, regime succession for chronological ordering',
       structureRelation7: 'isVariantOf: coin → CoinType, a concrete variant belongs to an abstract type',
       structureRelation8: 'namedAfterEra: coin → Era, the coin name is based on the reign title',
       structureRelation9: 'mintedInRegion: Mint → Region, the mint is located in a region',
       structureRelation10: 'circulatesIn: coin → Region, the coin circulated in a region',
       structureRelation11: 'circulatesAlong: coin → Route, the coin circulated along a route',
       structureRelation12: 'madeOf: coin → Material, the coin is mainly made of a material',
       structureRelation13: 'hasShape: coin → Shape, the coin has a basic shape',
       structureRelation14: 'usesScript: coin → Script, the coin inscription uses a script',
       structureRelation15: 'sourcedFrom: coin → Source_ref, the coin record is sourced from a specific reference',
       aboutText1: 'The coin museum is not only an important carrier for collecting and displaying Chinese civilization, but also a crucial bridge connecting historical memory with modern social cognition. By systematically organizing the region, era, material, minting techniques, and cultural meaning of ancient coins, the public can understand the economy, politics, and customs of ancient China in a more intuitive way. It revives sleeping history in digital form, helping future generations feel the threads of civilization from artifacts, while providing a reliable knowledge foundation for research, teaching, and cultural communication.',
      aboutText2: 'The significance of this project lies in the fact that it structures and visualizes dispersed cultural relic information, and connects it through a knowledge graph to improve the retrievability and usability of cultural heritage. A coin museum is not just a collection space; it is an open platform where ancient currency recounts the stories of the nation and society.',
      fileAccessWarning: 'Please access the website through http://127.0.0.1:8000 before logging in.',
      loginSuccess: 'Login successful',
      loginFailure: 'Login failed',
      guestLoginSuccess: 'Guest login successful',
      noData: 'No timeline data available',
      noTimelineData: 'No timeline data',
      loggedInSuffix: 'Logged in',
      guestLabel: 'Guest',
      homeStatsLabel: 'Existing collection',
      statTotal: 'Total coins',
      statTypes: 'Coin types',
      statRegions: 'Main minting regions',
      statMaterials: 'Main materials',
      digitalCollection: 'Digital collection',
      dataFormat: 'Data format',
      filter: {
        all: 'All',
        xihan: 'Western Han',
        tang: 'Tang',
        song: 'Song',
        yuan: 'Yuan',
        ming: 'Ming',
        qing: 'Qing',
        copper: 'Copper',
        silver: 'Silver',
        iron: 'Iron',
        shaanxi: 'Shaanxi',
        henan: 'Henan',
        beijing: 'Beijing',
        shanxi: 'Shanxi',
        jiangnan: 'Jiangnan',
        fujian: 'Fujian',
        xiaoping: 'Small cash',
        kaiyuan: 'Kaiyuan Tongbao',
        kangxi: 'Kangxi Tongbao',
        yongtong: 'Yongtong Bi',
        qingyuan: 'Qingyuan Tongbao',
        jiajing: 'Jiajing Tongbao',
        keyword: 'Search',
        keywordPlaceholder: 'Search by name, region, script or inscription',
        material: 'Material',
        region: 'Origin',
        type: 'Type / Denomination',
        shape: 'Shape',
        script: 'Script',
        inscription: 'Inscription',
        excavation: 'Excavation site',
        era: 'Era',
        search: 'Search',
        allTag: 'All',
        xihanTag: 'Western Han',
        copperTag: 'Copper coin',
        collectionTagShort: 'Collection',
        roundTag: 'Round',
        inscriptionTag: 'Inscription'
      }
    }
  };

  function chineseTextToPinyin(value) {
    const trimmed = String(value ?? '').trim();
    if (!trimmed) return '';
    if (pinyinFallbackMap[trimmed]) return pinyinFallbackMap[trimmed];

    const sortedKeys = Object.keys(pinyinFallbackMap)
      .filter((key) => key.length > 1)
      .sort((a, b) => b.length - a.length);

    let result = '';
    let index = 0;

    while (index < trimmed.length) {
      let matchedPhrase = '';
      let matchedValue = '';

      for (const key of sortedKeys) {
        const slice = trimmed.slice(index, index + key.length);
        if (slice === key) {
          matchedPhrase = key;
          matchedValue = pinyinFallbackMap[key];
          break;
        }
      }

      if (matchedPhrase) {
        result += matchedValue;
        index += matchedPhrase.length;
        continue;
      }

      const char = trimmed[index];
      if (/^[\u4e00-\u9fff]$/.test(char)) {
        result += charPinyinMap[char] || pinyinFallbackMap[char] || char;
      } else {
        result += char;
      }
      index += 1;
    }

    return result.trim();
  }

  function t(key, fallback = '') {
    const currentLang = translations[appState.lang] || translations.zh;
    const parts = String(key).split('.');
    let value = currentLang;

    for (const part of parts) {
      if (!value || typeof value !== 'object' || !(part in value)) {
        value = undefined;
        break;
      }
      value = value[part];
    }

    if (appState.lang === 'en') {
      const translatedText = String(fallback || key);
      if (externalTranslationCache.has(translatedText)) {
        return externalTranslationCache.get(translatedText);
      }
    }

    if (value !== undefined && value !== null) {
      return value;
    }

    if (appState.lang === 'en') {
      return chineseTextToPinyin(String(fallback || key));
    }

    return fallback || key;
  }

  function translateTextValue(value) {
    if (value === null || value === undefined || value === '') {
      return value;
    }

    const text = String(value);
    if (appState.lang === 'en') {
      if (externalTranslationCache.has(text)) {
        return externalTranslationCache.get(text);
      }
      if (fieldTranslations[text]) return fieldTranslations[text];
      if (ontologyTranslations[text]) return ontologyTranslations[text];
      if (pinyinFallbackMap[text]) return pinyinFallbackMap[text];
      if (/^[\u4e00-\u9fff\s\-：。！？，、（）]+$/.test(text)) return chineseTextToPinyin(text);
    }
    return text;
  }

  // ===== 本体结构页英文翻译表（中文模式不受影响，仅英文模式启用） =====
  const ontologyTranslations = {
    // —— 实体类型 ——
    '钱币': 'Coin',
    '政权': 'Regime',
    '铸造机构': 'Mint',
    '历史人物': 'Person',
    '年号': 'Era',
    '地区': 'Region',
    '流通路线': 'Route',
    '流通路线（待定）': 'Route (provisional)',
    '出土地': 'Area',
    '出土地（待定）': 'Area (provisional)',
    '材质名': 'Material',
    '形制': 'Shape',
    '钱文书体': 'Script',
    '文献出处': 'Source ref',
    '实体名称': 'Entity name',
    '说明': 'Description',
    // —— 实体说明 ——
    '中国古代由官方规定并发行、以具体版式记录为实例的货币。': 'Currency officially prescribed and issued in ancient China, recorded as an instance at the level of a specific type variety.',
    '中国古代在一定时期和地域内行使统治权并承担钱币发行管理职能的政治组织。': 'A political organization that exercised sovereign authority over a period and territory in ancient China and took charge of issuing and administering coinage.',
    '中国古代承担钱币铸造及相关管理职能的专门组织。': 'A dedicated organization responsible for casting coins and related administration in ancient China.',
    '中国古代与币制改革、钱币铸造或钱币研究等活动相关的人物。': 'A person in ancient China associated with currency reform, coin casting, or numismatic research.',
    '中国古代帝王用于纪年的名称，也是部分钱币命名的依据。': 'The name used by an ancient Chinese sovereign to reckon years, and the basis for naming some coins.',
    '与中国古代钱币铸造或流通活动相关的地理区域。': 'A geographic region associated with coin casting or circulation in ancient China.',
    '中国古代钱币在流通或贸易活动中经过的地理路径。': 'A geographic path traversed by ancient Chinese coins in circulation or trade.',
    '中国古代钱币经考古发掘或其他发现活动出土的地理地点。': 'A geographic site where ancient Chinese coins were unearthed through excavation or other discoveries.',
    '制作中国古代钱币所使用的主要物质材料。': 'The principal material used to make ancient Chinese coins.',
    '中国古代钱币在外形及结构方面形成的基本类型。': 'The basic category defined by the outward form and structure of ancient Chinese coins.',
    '中国古代钱币表面文字所采用的书法字体类型。': 'The calligraphic script type used for the surface text of ancient Chinese coins.',
    '记载中国古代钱币相关信息并可通过条目号、页码或编号定位的文献或资料来源。': 'A document or source that records information on ancient Chinese coins and can be located by entry number, page, or identifier.',
    // —— 关系类型 ——
    '钱币由某政权发行': 'A coin is issued by a regime',
    '钱币由某机构铸造': 'A coin is cast by a mint',
    '铸造机构隶属于某政权': 'A mint is subordinate to a regime',
    '人物主持某铸造机构事务': 'A person directs the affairs of a mint',
    '人物主导某次币制改革': 'A person leads a currency reform',
    '政权更替关系，用于年代排序与时间轴展示': 'Regime succession, used for chronological ordering and the timeline view',
    '具体版式记录归属于某一钱币抽象类型': 'A specific type variety belongs to an abstract coin type',
    '钱币名称所依据的年号': 'The era name on which a coin name is based',
    '铸造机构所在地区': 'The region where a mint is located',
    '钱币流通所及的地区': 'The regions a coin circulated through',
    '钱币流通所经的路线': 'The routes a coin circulated along',
    '钱币制作所使用的主要材质': 'The principal material a coin is made of',
    '钱币所属的基本形制': 'The basic shape a coin belongs to',
    '钱币钱文所使用的书体': 'The script used for a coin inscription',
    '钱币实体信息来源于具体文献或资料条目': 'Coin entity information is derived from a specific reference entry',
    '关系的定义端与指向端共同构成本体的约束框架：实例层钱币通过发行、铸造、材质、形制、书体等关系向上关联制度与物质属性层，通过“isVariantOf”关联抽象钱币类型层，形成可检索、可聚合、可扩展的知识网络。': 'The domain and range ends of a relation together form the ontology constraint framework: at the instance layer, a coin connects upward to the institutional and material-property layers through issuance, minting, material, shape, and script relations, and to the abstract coin-type layer through "isVariantOf", forming a searchable, aggregatable, and extensible knowledge network.',
    // —— 数据属性表头与通用值 ——
    '名称': 'Name',
    '定义域': 'Domain',
    '值域': 'Range',
    'id': 'id',
    '值域说明：xsd 表示 XML Schema 数据类型命名空间；文字字段采用 xsd:string，公历年份采用 xsd:integer（公元前以负整数表示），图像路径或 URI 采用 xsd:anyURI。根据已抽取记录，直径、孔宽、厚度和重量可能包含区间或不等式，因此采用 xsd:string 保留原值；坐标按经纬度组合文本保存，也采用 xsd:string。': 'Range notes: xsd denotes the XML Schema datatype namespace. Text fields use xsd:string, calendar years use xsd:integer (BCE years as negative integers), and image paths or URIs use xsd:anyURI. Since extracted records may give diameter, hole width, thickness, and weight as ranges or inequalities, these use xsd:string to preserve the original value; coordinates are stored as combined latitude-longitude text and also use xsd:string.',
    // —— coin 属性 ——
    '钱币的全称': 'The full name of the coin',
    '类型': 'Type',
    '钱币的币值或形制等级': 'The denomination or type-variety grade of the coin',
    '直径': 'Diameter',
    '单位厘米；若辞典给出区间值，按区间记录': 'In centimetres; if the dictionary gives a range, record the range',
    '孔宽': 'Hole width',
    '单位厘米；同上': 'In centimetres; same as above',
    '厚度': 'Thickness',
    '重量': 'Weight',
    '单位克；注明是实测值还是辞典给定的参考值': 'In grams; note whether it is a measured value or a reference value given by the dictionary',
    '图像': 'Image',
    '钱币图像的存储路径或URI': 'Storage path or URI of the coin image',
    '图像来源': 'Image source',
    '图像所属机构，如中国钱币博物馆、中国国家博物馆': 'The institution holding the image, such as the China Numismatic Museum or the National Museum of China',
    // —— Regime 属性 ——
    '政权的标准名称': 'The standard name of the regime',
    '别称': 'Alias',
    '政权的别称': 'An alternative name of the regime',
    '建立年份': 'Founding year',
    '公历年份': 'Calendar year',
    '灭亡年份': 'Fall year',
    '都城': 'Capital',
    // —— Mint 属性 ——
    '机构的标准名称': 'The standard name of the institution',
    '取缔年份': 'Abolition year',
    // —— Person 属性 ——
    '名字': 'Name',
    '官职': 'Office',
    '出生年份': 'Birth year',
    '死亡年份': 'Death year',
    '成就': 'Achievement',
    '与货币相关的事迹': 'Deeds related to currency',
    // —— Era 属性 ——
    '年号名称': 'Era name',
    '如“天禧”“开元”': 'For example "Tianxi" or "Kaiyuan"',
    '起始年份': 'Start year',
    '结束年份': 'End year',
    // —— Region 属性 ——
    '标准地名': 'Standard place name',
    '现代通用地名': 'The standard modern place name',
    '历史地名': 'Historical place name',
    '钱币学文献中使用的历史地名': 'The historical place name used in numismatic literature',
    '坐标（可选）': 'Coordinates (optional)',
    '经纬度': 'Latitude and longitude',
    '地名对照依据': 'Place-name reference basis',
    '如《中国历史地图集》、CHGIS 等权威地名对照来源': 'Authoritative gazetteers such as the Historical Atlas of China or CHGIS',
    // —— Material / Shape / Script / Source_ref 属性 ——
    '钱币制作所使用的主材质（青铜/黄铜/铁/铅/银/金/纸）': 'The principal material of the coin (bronze / brass / iron / lead / silver / gold / paper)',
    '方孔圆钱、尖足布、刀币、元宝形银锭等': 'Round coins with a square hole, pointed-foot spades, knife money, sycee-shaped silver ingots, etc.',
    '钱币上所使用的文字书体类型（如楷书、篆书）': 'The script type used on the coin, such as regular script or seal script',
    '辞典条目号/页码，用于记录可追溯、可核查': 'Dictionary entry number or page, ensuring traceable and verifiable records',
    '书体、版别及文字特征（如楷书、狭宝、仰宝、接郭等）本阶段不单独拆分建模，作为钱币全名的一部分保存；后续可根据研究需求进一步扩展为独立实体或属性。': 'At this stage, script, type varieties, and textual features (such as regular script, narrow bao, raised bao, or joined rim) are not modelled separately; they are kept as part of the coin\u2019s full name and may later be extended into independent entities or properties as research requires.',
    // —— 第 04 节 ——
    '数据源': 'Data sources',
    '数据源、版式与收录规范': 'Data sources, type varieties and inclusion policy',
    '正式出版的钱币学工具书、国家级博物馆公开资料和专业学术研究成果。项目目前主要使用《中国钱币大辞典·北宋篇》提取钱币信息；中国钱币博物馆、中国国家博物馆公开藏品资料作为辅助参考验证信息。各实体统一增加来源标注字段，记录具体辞典条目、页码或博物馆藏品编号，以保证每条记录可追溯、可核查。': 'Formally published numismatic reference works, public materials from national-level museums, and professional academic research. The project currently extracts coin information mainly from the Northern Song volume of the Great Dictionary of Chinese Coins, with public collection data from the China Numismatic Museum and the National Museum of China used as supplementary verification. Every entity carries a unified source field recording the specific dictionary entry, page, or museum object number, so that each record is traceable and verifiable.',
    '版式与类型层': 'Type varieties and the coin-type layer',
    '同一名称的钱币如存在多个版式或不同测量数据，仍按照辞典中的独立记录分别建立钱币实体（coin）。例如“天禧通宝·小平钱·楷书阔宝接郭”“天禧通宝·小平钱·楷书阔宝接郭大样”“天禧通宝·小平钱·楷书阔宝接郭小样”分别作为三条钱币记录保存。': 'When coins sharing a name have several type varieties or different measurements, each dictionary record is still created as a separate coin entity. For example, "Tianxi Tongbao, small cash, regular script, broad bao with joined rim", "…large variety", and "…small variety" are stored as three separate coin records.',
    '在此基础上新增一层可选的 CoinType 抽象实体（如“天禧通宝”），各版式记录通过 isVariantOf 关系指向同一个 CoinType。这样在检索“天禧通宝”时可自动聚合其下全部版式，且为后续按研究需求拆分书体、版别、文字特征等属性预留了结构位置，无需改动既有实体体系。': 'On this basis, an optional abstract CoinType entity is added (for example "Tianxi Tongbao"), and each type-variety record points to the same CoinType through the isVariantOf relation. Searching for "Tianxi Tongbao" then aggregates all its type varieties automatically, while leaving structural room to split out script, type variety, and textual features later without changing the existing entity system.',
    '本阶段暂不对钱币名称中的书体、版别及文字特征（如楷书、狭宝、仰宝、接郭等）进行单独拆分建模，而是作为钱币全名的一部分进行保存，后续可根据研究需求进一步扩展。': 'At this stage, script, type variety, and textual features in coin names (such as regular script, narrow bao, raised bao, or joined rim) are not modelled separately; they are kept as part of the full coin name and may be extended later as research requires.',
    '图像选取': 'Image selection',
    '优先级：': 'Priority: ',
    '与文字数据源优先级一致，优先采用辞典配图或中国钱币博物馆、中国国家博物馆官方数字资源的高清藏品图；避免来源不明的网络图片。': 'In line with the priority of textual sources, prefer dictionary illustrations or high-resolution collection images from the official digital resources of the China Numismatic Museum and the National Museum of China; avoid web images of unknown origin.',
    '覆盖原则：': 'Coverage principle: ',
    '每一版式记录至少配一张代表性图片；同一版式若有多个角度（正面/背面）图像，可在 image 字段中以列表形式存储多个路径。': 'Each type-variety record has at least one representative image; if one variety has images from several angles (obverse/reverse), multiple paths can be stored as a list in the image field.',
    '暂不收录范围': 'Excluded from scope for now',
    '钱币市场价格和收藏评级': 'Coin market prices and collector grading',
    '私铸钱、仿铸钱及现代复制品': 'Privately cast coins, imitation cast coins, and modern reproductions',
    '缺少可靠文献来源的钱币记录': 'Coin records lacking a reliable documentary source',
    // —— 图谱与状态栏 ——
    '本体结构': 'Ontology structure',
    '中国古代钱币知识本体结构': 'Ontology structure of ancient Chinese coinage',
    '交互式本体图谱': 'Interactive ontology graph',
    '实体类型': 'Entity types',
    '关系类型': 'Relation types',
    '数据属性': 'Data properties',
    '图谱中每个实体都是一枚“方孔圆钱”：中央大钱为': 'Every entity in the graph is a "round coin with a square hole": the large coin at the centre is the ',
    '实例，外围小钱为本体实体，连线上的流动光点表示关系方向。悬停或点击任一钱币可高亮其全部关系；点击连线标签或下方关系卡片可定位具体关系；点击钱币还可看到翻面动画。': ' instance, the surrounding small coins are ontology entities, and the flowing light on the connecting lines shows relation direction. Hover over or click any coin to highlight all its relations; click a relation label or a relation card below to locate a specific relation; click a coin to see the flip animation.',
    '本体以正式出版的钱币学工具书、国家级博物馆公开资料和专业学术研究成果为主要数据来源。其中，项目目前主要使用《中国钱币大辞典·北宋篇》提取钱币信息；中国钱币博物馆、中国国家博物馆公开资料作为辅助参考验证信息。为保证每条记录可追溯、可核查，各实体统一增加来源标注字段，记录具体辞典条目、页码或博物馆藏品编号。': 'The ontology draws primarily on formally published numismatic reference works, public materials from national-level museums, and professional academic research. The project currently extracts coin information mainly from the Northern Song volume of the Great Dictionary of Chinese Coins, with public materials from the China Numismatic Museum and the National Museum of China used as supplementary verification. To keep every record traceable and verifiable, each entity carries a unified source field recording the specific dictionary entry, page, or museum object number.',
    '（钱币）': ' (Coin)',
    '（政权）': ' (Regime)',
    '（铸造机构）': ' (Mint)',
    '（历史人物）': ' (Person)',
    '（年号）': ' (Era)',
    '（地区）': ' (Region)',
    '（材质）': ' (Material)',
    '（形制）': ' (Shape)',
    '（钱文书体）': ' (Script)',
    '（文献出处）': ' (Source ref)',
    '实例层': 'Instance layer',
    '抽象层': 'Abstract layer',
    '制度与人物层': 'Institution and person layer',
    '年代归属层': 'Chronology layer',
    '地域归属层': 'Geography layer',
    '流通路径层': 'Circulation layer',
    '物质属性层': 'Material property layer',
    '文字属性层': 'Textual property layer',
    '溯源层': 'Provenance layer',
    '状态栏': 'Status',
    '将鼠标移到上方任一类型标签上，这里会显示该类型的说明。': 'Hover over any type label above to see its description here.',
    '隐藏关系标签': 'Hide relation labels',
    '显示关系标签': 'Show relation labels',
    '清除选择': 'Clear selection',
    '图谱洞察': 'Graph insight',
    '检索条件': 'Search criteria',
    '实体小图': 'Entity mini-graph',
    '关系路径': 'Relation paths',
    '材质分布': 'Material distribution',
    '同类关联': 'Related coins',
    '全部钱币': 'All coins'
  };

  function getCoinField(coin, ...keys) {
    for (const key of keys) {
      const value = coin?.[key];
      if (value !== undefined && value !== null && value !== '') {
        return value;
      }
    }
    return '';
  }

  function displayCoin(coin) {
    if (!coin || appState.lang !== 'en') {
      return coin;
    }

    const translatedName = translateTextValue(coin.name);
    const translatedEra = translateTextValue(coin.era);
    const translatedYear = translateTextValue(coin.year);
    const translatedMaterial = translateTextValue(coin.material);
    const translatedRegion = translateTextValue(coin.region);
    const translatedType = translateTextValue(coin.type);
    const translatedShape = translateTextValue(coin.shape);
    const translatedScript = translateTextValue(coin.script);
    const translatedInscription = translateTextValue(coin.inscription);
    const translatedDescription = translateTextValue(coin.description || coin.remark || coin.note);
    const translatedShort = translateTextValue(coin.short);
    const translatedTags = (coin.tags || []).map((tag) => translateTextValue(tag));
    const translatedSourceRef = translateTextValue(coin.sourceRef || coin.source_ref || coin.sourceReference);

    return {
      ...coin,
      name: translatedName,
      era: translatedEra,
      year: translatedYear,
      material: translatedMaterial,
      region: translatedRegion,
      type: translatedType,
      shape: translatedShape,
      script: translatedScript,
      inscription: translatedInscription,
      description: translatedDescription,
      short: translatedShort,
      tags: translatedTags,
      sourceRef: translatedSourceRef
    };
  }

  function populateFilterControls() {
    if (!Array.isArray(coinData)) return;

    const uniqueValues = (key) => [...new Set(coinData.map((coin) => String(coin[key] || '').trim()).filter(Boolean))];
    const preferredOrders = {
      era: Object.keys(TIMELINE_ERA_META),
      material: ['海贝', '青铜', '铜', '白铜', '银', '铁'],
      region: [],
      type: [],
      shape: ['贝类', '长方版状', '针首刀', '平肩方足平首布', '方孔圆钱'],
      script: ['篆文', '篆书', '隶书', '楷书', '行书']
    };

    const sortValues = (key, values) => [...values].sort((a, b) => {
      const order = preferredOrders[key] || [];
      const aIndex = order.includes(a) ? order.indexOf(a) : order.length + 100;
      const bIndex = order.includes(b) ? order.indexOf(b) : order.length + 100;
      return aIndex - bIndex || a.localeCompare(b, 'zh-Hans-CN');
    });

    const setOptions = (id, key, values) => {
      const select = document.getElementById(id);
      if (!select) return;
      const allLabel = appState.lang === 'en' ? 'All' : '全部';
      select.innerHTML = [
        `<option value="all">${allLabel}</option>`,
        ...values.map((value) => `<option value="${escapeTimelineHTML(value)}">${escapeTimelineHTML(translateTextValue(value))}</option>`)
      ].join('');
      select.value = values.includes(state[key]) ? state[key] : 'all';
      state[key] = select.value;
    };

    setOptions('eraFilter', 'era', sortValues('era', uniqueValues('era')));
    setOptions('materialFilter', 'material', sortValues('material', uniqueValues('material')));
    setOptions('regionFilter', 'region', sortValues('region', uniqueValues('region')));
    setOptions('typeFilter', 'type', sortValues('type', uniqueValues('type')));
    setOptions('shapeFilter', 'shape', sortValues('shape', uniqueValues('shape')));
    setOptions('scriptFilter', 'script', sortValues('script', uniqueValues('script')));

    const chipContainer = document.querySelector('.filter-chips');
    if (chipContainer) {
      const tagCounts = new Map();
      coinData.forEach((coin) => {
        (coin.tags || []).forEach((tag) => {
          if (!tag || tag === 'Excel导入') return;
          tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
        });
      });
      const tags = [...tagCounts.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'zh-Hans-CN'))
        .slice(0, 8)
        .map(([tag]) => tag);
      chipContainer.innerHTML = [
        `<button type="button" class="chip" data-tag="all">${appState.lang === 'en' ? 'All' : '全部'}</button>`,
        ...tags.map((tag) => `<button type="button" class="chip" data-tag="${escapeTimelineHTML(tag)}">${escapeTimelineHTML(translateTextValue(tag))}</button>`)
      ].join('');
      chips = [...chipContainer.querySelectorAll('.chip')];
      state.tag = tags.includes(state.tag) ? state.tag : 'all';
      chipContainer.querySelector(`[data-tag="${CSS.escape(state.tag)}"]`)?.classList.add('active');
      bindFilterChips();
    }
  }

  function cityLabel(cityName) {
    const map = {
      西安: appState.lang === 'en' ? 'Xi\'an' : '西安',
      洛阳: appState.lang === 'en' ? 'Luoyang' : '洛阳',
      北京: appState.lang === 'en' ? 'Beijing' : '北京',
      太原: appState.lang === 'en' ? 'Taiyuan' : '太原',
      南京: appState.lang === 'en' ? 'Nanjing' : '南京',
      福州: appState.lang === 'en' ? 'Fuzhou' : '福州',
      成都: appState.lang === 'en' ? 'Chengdu' : '成都',
      杭州: appState.lang === 'en' ? 'Hangzhou' : '杭州'
    };
    return map[cityName] || cityName;
  }

  const externalTranslationCache = new Map();

  function collectTranslatableTexts() {
    const texts = new Set();

    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const text = (element.textContent || '').trim();
      if (text && /[\u4e00-\u9fff]/.test(text)) texts.add(text);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
      const text = (element.getAttribute('placeholder') || '').trim();
      if (text && /[\u4e00-\u9fff]/.test(text)) texts.add(text);
    });

    const coinFields = [
      'name', 'alias', 'era', 'material', 'region', 'type', 'shape', 'script',
      'inscription', 'description', 'short', 'remark', 'note', 'year', 'sourceRef', 'source_ref',
      'image_source', 'classification_basis', 'excavation_site', 'mint_name',
      'person_name', 'historical_event'
    ];
    coinData.forEach((coin) => {
      coinFields.forEach((field) => {
        const text = String(coin?.[field] ?? '').trim();
        if (text && /[\u4e00-\u9fff]/.test(text)) texts.add(text);
      });
      (coin.tags || []).forEach((tag) => {
        const text = String(tag || '').trim();
        if (text && /[\u4e00-\u9fff]/.test(text)) texts.add(text);
      });
    });

    Object.keys(TIMELINE_ERA_META).forEach((era) => {
      if (/[\u4e00-\u9fff]/.test(era)) texts.add(era);
    });

    return [...texts].sort();
  }

  async function requestExternalTranslation(texts, targetLang) {
    if (!Array.isArray(texts) || texts.length === 0) {
      return [];
    }

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ texts, target: targetLang })
      });

      if (!response.ok) {
        throw new Error(`translation request failed: HTTP ${response.status}`);
      }

      const payload = await response.json();
      const translated = Array.isArray(payload?.data) ? payload.data : [];
      if (translated.length !== texts.length) {
        throw new Error('translation result count mismatch');
      }
      translated.forEach((text, index) => {
        if (text) externalTranslationCache.set(texts[index], String(text));
      });
      return translated;
    } catch (error) {
      console.warn('External translation unavailable, falling back to local dictionary.', error);
      return texts.map(() => '');
    }
  }

  async function applyLanguageToggle() {
    if (langToggle?.dataset.busy === '1') return;
    const nextLang = appState.lang === 'zh' ? 'en' : 'zh';

    if (langToggle) {
      langToggle.dataset.busy = '1';
      langToggle.disabled = true;
      langToggle.classList.add('is-translating');
      langToggle.setAttribute('aria-busy', 'true');
      langToggle.textContent = nextLang === 'en' ? '一键翻译中…' : '切换中文…';
    }

    appState.lang = nextLang;

    try {
      if (nextLang === 'en') {
        const sourceTexts = collectTranslatableTexts()
          .filter((text) => !externalTranslationCache.has(text));
        if (sourceTexts.length > 0) {
          await requestExternalTranslation(sourceTexts, 'en');
        }
      }
    } finally {
      if (langToggle) {
        delete langToggle.dataset.busy;
        langToggle.disabled = false;
        langToggle.classList.remove('is-translating');
        langToggle.removeAttribute('aria-busy');
      }
      applyTranslations();
    }
  }

  // 中英双向表（把英文译名还原成中文原文）
  const ontologyReverseTranslations = (() => {
    const reverse = new Map();
    Object.entries(ontologyTranslations).forEach(([zh, en]) => {
      if (!zh || zh === en) return;
      if (!reverse.has(en)) reverse.set(en, zh);
    });
    return reverse;
  })();

  // 本体结构页所有可视化文本节点（跳过 id、关系 id、xsd 类型等技术标识）
  const STRUCTURE_SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA', 'SELECT', 'OPTION', 'SVG', 'PATH', 'CIRCLE', 'TEXT']);

  // 处理“1. coin（钱币）”“Regime（政权）”这类带中文括注的复合文本
  function translateStructureText(text) {
    const direct = ontologyTranslations[text];
    if (direct) return direct;

    const headingMatch = text.match(/^(\d+)\.\s*([A-Za-z_]+)（([^）]+)）$/);
    if (headingMatch) {
      const [, num, id, zh] = headingMatch;
      const zhEn = translateStructureText(zh);
      return `${num}. ${id} (${zhEn})`;
    }

    const parenMatch = text.match(/^([A-Za-z_]+)（([^）]+)）$/);
    if (parenMatch) {
      const [, id, zh] = parenMatch;
      const zhEn = translateStructureText(zh);
      return `${id} (${zhEn})`;
    }

    return text;
  }

  function reverseStructureText(text) {
    const direct = ontologyReverseTranslations.get(text);
    if (direct) return direct;

    const headingMatch = text.match(/^(\d+)\.\s*([A-Za-z_]+)\s*\(([^)]+)\)$/);
    if (headingMatch) {
      const [, num, id, en] = headingMatch;
      const zh = ontologyReverseTranslations.get(en) || en;
      return `${num}. ${id}（${zh}）`;
    }

    const parenMatch = text.match(/^([A-Za-z_]+)\s*\(([^)]+)\)$/);
    if (parenMatch) {
      const [, id, en] = parenMatch;
      const zh = ontologyReverseTranslations.get(en) || en;
      return `${id}（${zh}）`;
    }

    return text;
  }

  function shouldSkipStructureText(raw) {
    const text = String(raw || '').trim();
    if (!text) return true;
    if (/^(id|xsd:[A-Za-z]+)$/.test(text)) return true;
    if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(text) && !/\s/.test(text)) return true; // coin / Regime / issuedBy 等标识符
    return false;
  }

  function translateStructureTree() {
    const screen = document.querySelector('.screen[data-screen="structure"]');
    if (!screen) return;

    const isEnglish = appState.lang === 'en';
    screen.querySelectorAll('*').forEach((el) => {
      if (STRUCTURE_SKIP_TAGS.has(el.tagName)) return;
      if (el.classList.contains('ontology-legend-item')) return;
      if (el.classList.contains('ontology-statusbar-text')) return;
      if (el.classList.contains('ontology-statusbar-tag')) return;
      if (el.closest('#ontologyGraph')) return;
      if (el.closest('#ontologyInfoPanel')) return;
      if (el.closest('#ontologyStatusBar')) return;

      if (el.children.length === 0) {
        const raw = el.textContent;
        const text = String(raw || '').trim();
        if (shouldSkipStructureText(text)) return;
        if (isEnglish) el.textContent = translateStructureText(text);
        else el.textContent = reverseStructureText(text);
        return;
      }

      // 含 <strong> 等内联标签的段落，逐个处理其文本节点
      Array.from(el.childNodes).forEach((node) => {
        if (node.nodeType !== Node.TEXT_NODE) return;
        const text = String(node.nodeValue || '').trim();
        if (shouldSkipStructureText(text)) return;
        if (isEnglish) node.nodeValue = translateStructureText(text);
        else node.nodeValue = reverseStructureText(text);
      });
    });

    screen.querySelectorAll('button[title]').forEach((button) => {
      const title = button.getAttribute('title') || '';
      if (isEnglish && ontologyTranslations[title]) button.setAttribute('title', ontologyTranslations[title]);
    });

    screen.querySelectorAll('[aria-label]').forEach((el) => {
      const label = el.getAttribute('aria-label') || '';
      if (isEnglish && ontologyTranslations[label]) el.setAttribute('aria-label', ontologyTranslations[label]);
    });
  }

  function applyStructureTranslation() {
    translateStructureTree();
    if (document.getElementById('ontologyGraph')) {
      ontoRefreshStaticText();
    }
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.dataset.i18n;
      if (!key) return;
      const value = t(key, element.textContent || '');
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.value = value;
      } else {
        element.textContent = value;
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
      const key = element.dataset.i18nPlaceholder;
      const value = t(key, element.getAttribute('placeholder') || '');
      element.setAttribute('placeholder', value);
    });

    document.querySelectorAll('.map-city-dot span').forEach((label) => {
      const city = label.parentElement.dataset.city;
      label.textContent = cityLabel(city);
    });

    if (langToggle) {
      langToggle.textContent = appState.lang === 'zh' ? 'EN / 中文' : '中文 / EN';
    }

    applyStructureTranslation();

    const sessionName = userBadge && userBadge.dataset.userName ? userBadge.dataset.userName : '';
    if (userBadge) {
      const role = userBadge.dataset.role || 'guest';
      const displayName = sessionName || t('guest');
      userBadge.textContent = role === 'account' ? `${displayName} ${t('loggedInSuffix', '已登录')}` : t('guest');
    }

    populateFilterControls();
    renderCoins();
    renderTimeline();
    updateHomeStats();
  }

  function showLoginModal() {
    if (!authModal) return;
    authModal.classList.add('active');
    authModal.setAttribute('aria-hidden', 'false');
  }

  function hideLoginModal() {
    if (!authModal) return;
    authModal.classList.remove('active');
    authModal.setAttribute('aria-hidden', 'true');
  }

  function setUserBadge(username, role) {
    if (!userBadge) return;
    const displayName = username || t('guest', '游客');
    userBadge.dataset.userName = username || '';
    userBadge.dataset.role = role || 'guest';
    userBadge.textContent = role === 'account' ? `${displayName} ${t('loggedInSuffix', '已登录')}` : t('guest', '游客');
    userBadge.classList.add('visible');
  }

  async function checkAuthStatus() {
    try {
      const response = await fetch('/api/session');
      const sessionData = await response.json();

      if (sessionData.loggedIn) {
        setUserBadge(sessionData.username, sessionData.role);
        hideLoginModal();
        return true;
      }

      setUserBadge(t('guest', '游客'), 'guest');
      showLoginModal();
      return false;
    } catch (error) {
      console.warn('无法获取登录状态', error);
      setUserBadge(t('guest', '游客'), 'guest');
      showLoginModal();
      return false;
    }
  }

  async function submitLogin(mode, username, password) {
    try {
      authMessage.textContent = '';
      authMessage.className = 'auth-message';

      if (window.location.protocol === 'file:') {
        throw new Error(t('fileAccessWarning', 'Please access the website through http://127.0.0.1:8000 before logging in.'));
      }

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mode, username, password })
      });

      let result = {};
      try {
        result = await response.json();
      } catch (jsonError) {
        result = { message: '后端返回为空，或未正常提供 JSON 数据。请确认后端已启动。' };
      }

      if (!response.ok || !result.ok) {
        throw new Error(result.message || t('loginFailure', 'Login failed'));
      }

      authMessage.textContent = t('loginSuccess', 'Login successful');
      authMessage.classList.add('success');
      setUserBadge(result.username, result.role);
      setTimeout(hideLoginModal, 350);
      return true;
    } catch (error) {
      authMessage.textContent = error.message;
      authMessage.classList.add('error');
      return false;
    }
  }

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
      if (target === 'timeline') {
        renderTimeline();
      } else {
        stopTimelinePlayback();
      }
    });
  });

  if (loginTrigger) {
    loginTrigger.addEventListener('click', showLoginModal);
  }

  if (authClose) {
    authClose.addEventListener('click', hideLoginModal);
  }

  authModal?.addEventListener('click', (event) => {
    if (event.target === authModal) {
      hideLoginModal();
    }
  });

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const username = usernameInput.value.trim();
      const password = passwordInput.value;
      await submitLogin('account', username, password);
    });
  }

  if (guestLoginBtn) {
    guestLoginBtn.addEventListener('click', async () => {
      await submitLogin('guest', t('guest', '游客'), '');
    });
  }

  if (langToggle) {
    langToggle.addEventListener('click', async () => {
      await applyLanguageToggle();
    });
  }

  const STORAGE_KEY = 'museum-coin-upload-data';
  const siteStats = {
    specimens: 0,
    coinTypes: 0,
    mintRegions: 0,
    materials: 0
  };

  function updateHomeStats() {
    const normalizedTypeValues = coinData
      .map((coin) => String(coin.type || '').trim())
      .filter(Boolean);
    const normalizedRegionValues = coinData
      .map((coin) => String(coin.region || '').trim())
      .filter(Boolean);
    const normalizedMaterialValues = coinData
      .map((coin) => String(coin.material || '').trim())
      .filter(Boolean);

    siteStats.specimens = coinData.length;
    siteStats.coinTypes = new Set(normalizedTypeValues).size;
    siteStats.mintRegions = new Set(normalizedRegionValues).size;
    siteStats.materials = new Set(normalizedMaterialValues).size;

    document.querySelectorAll('[data-stat]').forEach((node) => {
      const key = node.dataset.stat;
      if (!key || !(key in siteStats)) return;
      node.dataset.count = String(siteStats[key]);
      node.textContent = siteStats[key];
    });
  }

  const defaultCoinData = [];
  const legacyDefaultCoinData = [
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
    },
    {
      id: 'han-huoqu',
      name: '汉代货泉',
      type: '货泉',
      era: '西汉',
      material: '铜',
      shape: '圆形方孔',
      script: '篆书',
      region: '河南',
      year: '西汉前期',
      weight: '4.1 g',
      diameter: '2.7 cm',
      holeWidth: '0.8 cm',
      thickness: '0.32 cm',
      inscription: '货泉',
      description: '钱文简洁，轮廓厚实，体现西汉早期币制中的区域铸造特色。',
      short: '简洁厚重，体现西汉早期币制与地方铸钱节奏。',
      sourceRef: '《中国钱币大辞典》/货泉条目',
      tags: ['西汉', '货币', '铜币', '篆书'],
      image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 'tang-zhongyuan',
      name: '唐代中元通宝',
      type: '中元通宝',
      era: '唐',
      material: '白铜',
      shape: '方孔圆钱',
      script: '楷书',
      region: '四川',
      year: '中元年间',
      weight: '2.9 g',
      diameter: '2.5 cm',
      holeWidth: '0.6 cm',
      thickness: '0.25 cm',
      inscription: '中元通宝',
      description: '字体匀称，版式稳定，反映唐代中期铸币标准化的成熟程度。',
      short: '字体匀称，典型代表唐代中期铸币规范化。',
      sourceRef: '中国钱币博物馆藏品录',
      tags: ['唐', '白铜', '收藏', '方孔圆钱'],
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 'song-jiangnan',
      name: '宋代元丰通宝',
      type: '元丰通宝',
      era: '宋',
      material: '铜',
      shape: '小平钱',
      script: '行书',
      region: '江南',
      year: '北宋中期',
      weight: '3.2 g',
      diameter: '2.6 cm',
      holeWidth: '0.7 cm',
      thickness: '0.29 cm',
      inscription: '元丰通宝',
      description: '字迹流畅，钱面清晰，体现北宋中期货币流通体系的稳定性。',
      short: '字迹柔和，体现宋代货币铸造与流通的成熟状态。',
      sourceRef: '中国国家博物馆数字资源',
      tags: ['宋', '铜币', '货币', '小平钱'],
      image: 'https://images.unsplash.com/photo-1530482054426-2f5309d8a64f?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 'yuan-zhongtong',
      name: '元代至元通宝',
      type: '至元通宝',
      era: '元',
      material: '铜',
      shape: '方孔圆钱',
      script: '楷书',
      region: '北京',
      year: '元代中期',
      weight: '3.4 g',
      diameter: '2.6 cm',
      holeWidth: '0.7 cm',
      thickness: '0.3 cm',
      inscription: '至元通宝',
      description: '轮廓圆润，版面工整，反映元代币制扩张与财政组织整合。',
      short: '版面整齐，反映元代货币制度的规范化趋势。',
      sourceRef: '《中国钱币大辞典》/至元通宝条目',
      tags: ['元', '铜币', '货币', '楷书'],
      image: 'https://images.unsplash.com/photo-1564958148846-30ed2f7c1ff1?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 'ming-hongwu',
      name: '明代洪武通宝',
      type: '洪武通宝',
      era: '明',
      material: '铜',
      shape: '方孔圆钱',
      script: '篆书',
      region: '南京',
      year: '洪武年间',
      weight: '3.5 g',
      diameter: '2.7 cm',
      holeWidth: '0.7 cm',
      thickness: '0.28 cm',
      inscription: '洪武通宝',
      description: '钱文较为浑朴，体现明初币制恢复与国家铸币体系重建。',
      short: '浑朴有力，见证明初币制重建。',
      sourceRef: '中国钱币博物馆/明代钱币条目',
      tags: ['明', '铜币', '收藏', '篆书'],
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 'qing-zhongtong',
      name: '清代同治通宝',
      type: '同治通宝',
      era: '清',
      material: '铜',
      shape: '方孔圆钱',
      script: '楷书',
      region: '四川',
      year: '同治年间',
      weight: '2.7 g',
      diameter: '2.4 cm',
      holeWidth: '0.6 cm',
      thickness: '0.24 cm',
      inscription: '同治通宝',
      description: '字体稳健，边缘较清，反映清代后期铸币制度中的程式化标准。',
      short: '字体稳健，体现清代后期铸币规范与标准化。',
      sourceRef: '中国国家博物馆数字资源',
      tags: ['清', '铜币', '货币', '楷书'],
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 'han-jia',
      name: '汉代半两',
      type: '半两',
      era: '西汉',
      material: '铜',
      shape: '刀币',
      script: '隶书',
      region: '陕西',
      year: '西汉晚期',
      weight: '5.2 g',
      diameter: '3.1 cm',
      holeWidth: '0.8 cm',
      thickness: '0.4 cm',
      inscription: '半两',
      description: '形制独特，体现早期货币在制度转型中的多样性与地域差异。',
      short: '形制独特，映照早期货币制度的多样性。',
      sourceRef: '《中国钱币大辞典》/半两条目',
      tags: ['西汉', '刀币', '收藏', '隶书'],
      image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=900&q=80'
    }
  ];

  let coinData = [];

  async function loadCoinDataFromServer() {
    try {
      const response = await fetch('/api/coins');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const remoteCoins = await response.json();
      if (Array.isArray(remoteCoins) && remoteCoins.length) {
        coinData = remoteCoins;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteCoins));
        return;
      }
    } catch (error) {
      console.warn('数据库加载失败，回退到本地缓存。', error);
    }

    const savedCoins = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    coinData = savedCoins && Array.isArray(savedCoins) && savedCoins.length ? savedCoins : defaultCoinData;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(coinData));
  }

  const coinGrid = document.getElementById('coinGrid');
  const eraFilter = document.getElementById('eraFilter');
  const materialFilter = document.getElementById('materialFilter');
  const regionFilter = document.getElementById('regionFilter');
  const typeFilter = document.getElementById('typeFilter');
  const shapeFilter = document.getElementById('shapeFilter');
  const scriptFilter = document.getElementById('scriptFilter');
  const inscriptionFilter = document.getElementById('inscriptionFilter');
  const excavationFilter = document.getElementById('excavationFilter');
  const coinSearch = document.getElementById('coinSearch');
  const propertyQueryInput = document.getElementById('propertyQuery');
  const applyPropertyQueryBtn = document.getElementById('applyPropertyQuery');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const searchResultCount = document.getElementById('searchResultCount');
  const kgInsightPanel = document.getElementById('kgInsightPanel');
  const kgPanelToggle = document.getElementById('kgPanelToggle');
  let chips = [];
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
    shape: 'all',
    script: 'all',
    inscription: '',
    excavation: '',
    propertyQuery: '',
    tag: 'all',
    keyword: ''
  };

  const cityProductionMatchers = {
    西安: ['陕西', '周原', '秦国'],
    洛阳: ['河南', '洛阳', '偃師', '安阳'],
    北京: ['燕', '山戎'],
    太原: ['山西'],
    南京: ['江南'],
    福州: ['福建'],
    成都: ['四川', '蜀汉', '成汉'],
    杭州: ['南宋', '江南']
  };

  const timelineState = {
    simplified: false,
    expandedEra: null,
    expandedCoinId: null,
    activeCoinId: null,
    activeYear: null,
    playing: true,
    followPlayback: true
  };

  let timelinePlaybackFrame = null;
  let timelineLastFrameTime = 0;

  const TIMELINE_ERA_META = {
    夏商周: { order: 1, start: -2070, end: -771, color: '#a98b59', seal: '夏' },
    春秋: { order: 2, start: -770, end: -476, color: '#8d9a5b', seal: '春' },
    战国: { order: 3, start: -475, end: -221, color: '#b07745', seal: '战' },
    西汉: { order: 4, start: -202, end: 8, color: '#bf7b45', seal: '汉' },
    新莽: { order: 5, start: 9, end: 23, color: '#9c6b50', seal: '新' },
    三国: { order: 6, start: 220, end: 280, color: '#7f8f68', seal: '三' },
    晋: { order: 7, start: 266, end: 420, color: '#5f958b', seal: '晋' },
    十六国: { order: 8, start: 304, end: 439, color: '#8b789f', seal: '六' },
    南北朝: { order: 9, start: 420, end: 589, color: '#a75f4b', seal: '南' },
    唐: { order: 10, start: 618, end: 907, color: '#d5a44f', seal: '唐' },
    宋: { order: 11, start: 960, end: 1279, color: '#5f958b', seal: '宋' },
    元: { order: 12, start: 1271, end: 1368, color: '#7c86a8', seal: '元' },
    明: { order: 13, start: 1368, end: 1644, color: '#a84f3f', seal: '明' },
    清: { order: 14, start: 1636, end: 1912, color: '#b99452', seal: '清' },
    未知: { order: 99, start: 0, end: 0, color: '#8e8679', seal: '?' }
  };

  const TIMELINE_MATERIAL_META = {
    海贝: { key: 'shell', color: '#ead8b2', glow: 'rgba(234,216,178,.36)' },
    青铜: { key: 'bronze', color: '#a9a064', glow: 'rgba(169,160,100,.38)' },
    铜: { key: 'copper', color: '#d8a653', glow: 'rgba(216,166,83,.42)' },
    白铜: { key: 'white-copper', color: '#d9d0ba', glow: 'rgba(217,208,186,.38)' },
    银: { key: 'silver', color: '#ccd4d8', glow: 'rgba(204,212,216,.38)' },
    铁: { key: 'iron', color: '#77706a', glow: 'rgba(119,112,106,.36)' }
  };

  function escapeTimelineHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char]));
  }

  function clampTimelineNumber(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function getCoinTimelineYear(coin) {
    if (coin && Number.isFinite(Number(coin.timelineYear))) {
      return Number(coin.timelineYear);
    }

    const yearText = String(coin?.year || '');
    const numericYear = yearText.match(/-?\d{3,4}/);
    if (numericYear) {
      return Number(numericYear[0]);
    }

    const era = coin?.era || '未知';
    const meta = TIMELINE_ERA_META[era] || TIMELINE_ERA_META.未知;
    const span = Math.max(meta.end - meta.start, 1);

    if (/前|早|初/.test(yearText)) return Math.round(meta.start + span * 0.18);
    if (/晚|末/.test(yearText)) return Math.round(meta.start + span * 0.78);
    if (/中/.test(yearText)) return Math.round(meta.start + span * 0.48);
    if (/开元/.test(yearText)) return 713;
    if (/洪武/.test(yearText)) return 1368;
    if (/嘉靖/.test(yearText)) return 1522;
    if (/康熙/.test(yearText)) return 1662;
    if (/同治/.test(yearText)) return 1862;
    if (/庆元/.test(yearText)) return 1195;
    if (/元丰/.test(yearText)) return 1078;
    if (/至元/.test(yearText)) return 1264;

    return Math.round(meta.start + span * 0.5);
  }

  function formatTimelineYear(year) {
    if (!Number.isFinite(year)) return appState.lang === 'en' ? 'Unknown' : '年代不详';
    if (year < 0) return appState.lang === 'en' ? `${Math.abs(year)} BCE` : `公元前${Math.abs(year)}年`;
    return appState.lang === 'en' ? `CE ${year}` : `公元${year}年`;
  }

  function getTimelineMaterialMeta(material) {
    return TIMELINE_MATERIAL_META[material] || { key: 'unknown', color: '#b9a17d', glow: 'rgba(185,161,125,.34)' };
  }

  function getTimelineCoinItems() {
    return coinData
      .map((coin) => {
        const year = getCoinTimelineYear(coin);
        const diameter = Number.parseFloat(getCoinField(coin, 'diameter_cm', 'diameter') || 2.5);
        const materialMeta = getTimelineMaterialMeta(coin.material);
        return {
          id: coin.id,
          raw: coin,
          display: displayCoin(coin),
          era: coin.era || '未知',
          year,
          meta: TIMELINE_ERA_META[coin.era] || TIMELINE_ERA_META.未知,
          materialMeta,
          coinSize: Math.round(clampTimelineNumber(34 + (diameter - 2.2) * 16, 34, 54))
        };
      })
      .sort((a, b) => a.year - b.year || String(a.id).localeCompare(String(b.id)));
  }

  function getTimelineEraGroups(items = getTimelineCoinItems()) {
    const groups = new Map();
    items.forEach((item) => {
      if (!groups.has(item.era)) {
        groups.set(item.era, []);
      }
      groups.get(item.era).push(item);
    });

    return [...groups.entries()]
      .map(([era, eraItems]) => ({
        era,
        items: eraItems,
        meta: TIMELINE_ERA_META[era] || TIMELINE_ERA_META.未知,
        startYear: Math.min(...eraItems.map((item) => item.year)),
        endYear: Math.max(...eraItems.map((item) => item.year))
      }))
      .sort((a, b) => (a.meta.order || 99) - (b.meta.order || 99));
  }

  function getTimelineBounds(items, groups) {
    const itemYears = items.map((item) => item.year);
    const eraStarts = groups.map((group) => group.meta.start);
    const eraEnds = groups.map((group) => group.meta.end);
    let min = Math.min(...itemYears, ...eraStarts);
    let max = Math.max(...itemYears, ...eraEnds);

    if (!Number.isFinite(min) || !Number.isFinite(max)) {
      min = 0;
      max = 1;
    }
    if (min === max) {
      min -= 10;
      max += 10;
    }

    return {
      min: Math.floor((min - 20) / 10) * 10,
      max: Math.ceil((max + 20) / 10) * 10
    };
  }

  // 时间轴画布坐标（SVG viewBox 与节点百分比定位统一使用该尺寸）
  const TIMELINE_CANVAS_WIDTH = 1200;
  const TIMELINE_CANVAS_HEIGHT = 640;
  const TIMELINE_SPINE_BASE_Y = 300;
  const TIMELINE_SPINE_AMP_A = 74;
  const TIMELINE_SPINE_AMP_B = 17;
  const TIMELINE_LANE_MIN_Y = 104;
  const TIMELINE_LANE_MAX_Y = 566;

  function getTimelinePoint(year, bounds, lane = 0, laneStep = 66) {
    const t = clampTimelineNumber((year - bounds.min) / Math.max(bounds.max - bounds.min, 1), 0, 1);
    const x = 54 + t * (TIMELINE_CANVAS_WIDTH - 108);
    const spineY = TIMELINE_SPINE_BASE_Y
      + Math.sin(t * Math.PI * 2.15) * TIMELINE_SPINE_AMP_A
      + Math.sin(t * Math.PI * 4.35) * TIMELINE_SPINE_AMP_B;
    return {
      t,
      x,
      spineY,
      y: clampTimelineNumber(spineY + lane * laneStep, TIMELINE_LANE_MIN_Y, TIMELINE_LANE_MAX_Y)
    };
  }

  function buildTimelineSpinePath(bounds) {
    const points = [];
    for (let index = 0; index <= 36; index += 1) {
      const year = bounds.min + ((bounds.max - bounds.min) * index) / 36;
      const point = getTimelinePoint(year, bounds, 0);
      points.push(point);
    }
    return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(1)} ${point.spineY.toFixed(1)}`).join(' ');
  }

  function getTimelineTicks(bounds) {
    const span = bounds.max - bounds.min;
    const interval = span > 1800 ? 400 : span > 1000 ? 200 : 100;
    const ticks = [];
    for (let year = Math.ceil(bounds.min / interval) * interval; year <= bounds.max; year += interval) {
      ticks.push(year);
    }
    return ticks;
  }

  function stopTimelinePlayback() {
    if (timelinePlaybackFrame) {
      cancelAnimationFrame(timelinePlaybackFrame);
      timelinePlaybackFrame = null;
    }
    timelineLastFrameTime = 0;
  }

  function syncTimelinePlayback(items, bounds) {
    const axisRoot = document.getElementById('timelineAxis');
    if (!axisRoot || !Number.isFinite(timelineState.activeYear)) return;

    const activeYear = timelineState.activeYear;
    const progress = clampTimelineNumber((activeYear - bounds.min) / Math.max(bounds.max - bounds.min, 1), 0, 1);
    const coinfield = axisRoot.querySelector('.timeline-coinfield');
    const playheadYear = axisRoot.querySelector('.timeline-playhead-year');
    const progressFill = axisRoot.querySelector('.timeline-focus-progress-fill');
    const rangeLabel = axisRoot.querySelector('.timeline-current-range');

    coinfield?.style.setProperty('--playhead-x', `${(4.5 + progress * 91).toFixed(2)}%`);
    if (playheadYear) playheadYear.textContent = formatTimelineYear(Math.round(activeYear));
    if (progressFill) progressFill.style.width = `${(progress * 100).toFixed(2)}%`;
    if (rangeLabel) rangeLabel.textContent = `${formatTimelineYear(bounds.min)} — ${formatTimelineYear(bounds.max)}`;

    items.forEach((item) => {
      const node = axisRoot.querySelector(`[data-coin-node="${CSS.escape(String(item.id))}"]`);
      if (!node) return;
      node.classList.toggle('is-passed', activeYear >= item.year);
      node.classList.toggle('is-upcoming', activeYear < item.year);
    });
  }

  function startTimelinePlayback(items, bounds) {
    stopTimelinePlayback();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!timelineState.playing || reduceMotion || document.body.dataset.page !== 'timeline' || !items.length) return;

    if (!Number.isFinite(timelineState.activeYear)) {
      timelineState.activeYear = bounds.min;
    }

    const duration = clampTimelineNumber(items.length * 2200, 12000, 28000);
    const speed = (bounds.max - bounds.min) / duration;

    const step = (timestamp) => {
      if (!timelineState.playing) return;
      if (!timelineLastFrameTime) timelineLastFrameTime = timestamp;
      const delta = Math.min(timestamp - timelineLastFrameTime, 80);
      timelineLastFrameTime = timestamp;

      if (document.body.dataset.page === 'timeline') {
        timelineState.activeYear += delta * speed;
        if (timelineState.activeYear >= bounds.max) {
          timelineState.activeYear = bounds.min;
        }
        syncTimelinePlayback(items, bounds);

        if (timelineState.followPlayback) {
          const passedItems = items.filter((item) => item.year <= timelineState.activeYear);
          const latestItem = passedItems[passedItems.length - 1];
          if (latestItem && latestItem.id !== timelineState.activeCoinId) {
            timelineState.activeCoinId = latestItem.id;
            timelineState.expandedEra = latestItem.era;
            renderTimeline();
            return;
          }
        }
      }

      timelinePlaybackFrame = requestAnimationFrame(step);
    };

    timelinePlaybackFrame = requestAnimationFrame(step);
  }

  function renderTimeline() {
    const axisRoot = document.getElementById('timelineAxis');
    const summary = document.getElementById('timelineSummary');
    const allItems = getTimelineCoinItems();
    const groups = getTimelineEraGroups(allItems);

    if (!axisRoot || !summary) return;
    stopTimelinePlayback();

    if (!allItems.length) {
      axisRoot.innerHTML = `<div class="empty-state">${appState.lang === 'en' ? 'No timeline data available' : '暂无可展示的时间轴数据'}</div>`;
      summary.textContent = appState.lang === 'en' ? 'No timeline data' : '暂无时间轴数据';
      return;
    }

    const bounds = getTimelineBounds(allItems, groups);
    if (!Number.isFinite(timelineState.activeYear) || timelineState.activeYear < bounds.min || timelineState.activeYear > bounds.max) {
      timelineState.activeYear = bounds.min;
    }

    const visibleItems = timelineState.simplified
      ? groups.map((group) => group.items[0]).sort((a, b) => a.year - b.year)
      : allItems;

    let activeItem = visibleItems.find((item) => item.id === timelineState.activeCoinId);
    if (!activeItem && timelineState.expandedEra) {
      activeItem = visibleItems.find((item) => item.era === timelineState.expandedEra);
    }
    if (!activeItem) {
      activeItem = visibleItems[0];
    }
    timelineState.activeCoinId = activeItem?.id || null;

    const materialCount = new Set(allItems.map((item) => item.raw.material).filter(Boolean)).size;
    const modeLabel = timelineState.simplified
      ? (appState.lang === 'en' ? 'Key coin route' : '主币脉络')
      : (appState.lang === 'en' ? 'Full collection scroll' : '完整长卷');
    const focusLabel = timelineState.expandedEra
      ? (appState.lang === 'en'
        ? ` · Focus: ${translateTextValue(timelineState.expandedEra)}`
        : ` · 聚焦 ${timelineState.expandedEra}`)
      : '';
    summary.textContent = appState.lang === 'en'
      ? `${modeLabel} · ${allItems.length} coins · ${groups.length} eras · ${formatTimelineYear(bounds.min)} to ${formatTimelineYear(bounds.max)}${focusLabel}`
      : `${modeLabel} · ${allItems.length} 枚钱币 · ${groups.length} 个时代 · ${formatTimelineYear(bounds.min)}至${formatTimelineYear(bounds.max)}${focusLabel}`;

    const assignedItems = visibleItems.map((item, index) => {
      const lane = (index % 3) - 1;
      const point = getTimelinePoint(item.year, bounds, lane);
      return {
        ...item,
        lane,
        point,
        isActive: item.id === timelineState.activeCoinId,
        isPassed: timelineState.activeYear >= item.year,
        isDimmed: Boolean(timelineState.expandedEra && item.era !== timelineState.expandedEra)
      };
    });

    // 同一时代内横向距离过近的节点向上/向下错层，避免钱币与标签互相覆盖
    const LANE_STEP = 66;
    const laneBases = [-2, -1, 1, 2];
    const lastXByEraLane = new Map();
    const placedByYear = [...assignedItems].sort((a, b) => a.point.x - b.point.x);
    placedByYear.forEach((item) => {
      const minGap = Math.max(item.coinSize + 26, 62);
      const preferAbove = item.lane < 0;
      const candidates = preferAbove ? laneBases : [...laneBases].reverse();
      let placedLane = preferAbove ? -2 : 2;
      let found = false;
      for (const laneBase of candidates) {
        const key = `${item.era}|${laneBase}`;
        const prevX = lastXByEraLane.get(key);
        if (prevX === undefined || item.point.x - prevX >= minGap) {
          placedLane = laneBase;
          found = true;
          break;
        }
      }
      if (!found) {
        placedLane = preferAbove ? -2 : 2;
      }
      lastXByEraLane.set(`${item.era}|${placedLane}`, item.point.x);
      item.lane = placedLane;
      item.point = getTimelinePoint(item.year, bounds, placedLane, LANE_STEP);
    });

    const spinePath = buildTimelineSpinePath(bounds);
    const ticksMarkup = getTimelineTicks(bounds).map((year) => {
      const point = getTimelinePoint(year, bounds, 0);
      return `
        <g class="timeline-tick">
          <line x1="${point.x.toFixed(1)}" y1="72" x2="${point.x.toFixed(1)}" y2="572"></line>
          <text x="${point.x.toFixed(1)}" y="602" text-anchor="middle">${escapeTimelineHTML(formatTimelineYear(year))}</text>
        </g>
      `;
    }).join('');

    const eraBandsMarkup = groups.map((group) => {
      const bandStart = Math.min(group.meta.start, group.startYear);
      const bandEnd = Math.max(group.meta.end, group.endYear);
      const start = getTimelinePoint(bandStart, bounds, 0);
      const end = getTimelinePoint(bandEnd, bounds, 0);
      const width = Math.max(end.x - start.x, 18);
      const translatedEra = translateTextValue(group.era);
      return `
        <g class="timeline-era-band ${timelineState.expandedEra === group.era ? 'is-active' : ''}" style="--era-color:${group.meta.color}">
          <rect x="${start.x.toFixed(1)}" y="88" width="${width.toFixed(1)}" height="474" rx="18"></rect>
          <text x="${(start.x + width / 2).toFixed(1)}" y="68" text-anchor="middle">${escapeTimelineHTML(translatedEra)}</text>
        </g>
      `;
    }).join('');

    const connectorsMarkup = assignedItems.map((item) => `
      <line class="timeline-node-connector ${item.isPassed ? 'is-passed' : ''} ${item.isDimmed ? 'is-hidden' : ''}" x1="${item.point.x.toFixed(1)}" y1="${item.point.spineY.toFixed(1)}" x2="${item.point.x.toFixed(1)}" y2="${item.point.y.toFixed(1)}"></line>
    `).join('');

    const ambientMarkup = Array.from({ length: 10 }, (_, index) => `
      <span class="timeline-ambient-coin" style="--ambient-x:${6 + index * 10}%; --ambient-y:${index % 2 ? 12 : 72}%; --ambient-delay:${index * 0.7}s; --ambient-scale:${0.55 + (index % 4) * 0.12};"></span>
    `).join('');

    const nodesMarkup = assignedItems.map((item, index) => {
      const visibleCoin = item.display;
      const inscription = String(item.raw.inscription || item.raw.name || '钱').trim();
      const coinChar = inscription ? Array.from(inscription)[0] : '钱';
      const shapeClass = /刀/.test(String(item.raw.shape || '')) ? 'is-knife' : 'is-round';
      const labelClass = item.lane < 0 ? 'label-above' : 'label-below';
      const nodeClasses = [
        'timeline-coin-node',
        shapeClass,
        labelClass,
        `material-${item.materialMeta.key}`,
        item.isActive ? 'is-selected' : '',
        item.isPassed ? 'is-passed' : 'is-upcoming',
        item.isDimmed ? 'is-dimmed' : ''
      ].filter(Boolean).join(' ');
      const nodeLabelYear = visibleCoin.year || formatTimelineYear(item.year);
      const accessibleName = `${visibleCoin.name || item.raw.name}，${visibleCoin.era || item.era}，${nodeLabelYear}`;

      return `
        <button class="${nodeClasses}" type="button" data-coin-node="${escapeTimelineHTML(item.id)}" aria-pressed="${item.isActive ? 'true' : 'false'}" aria-label="${escapeTimelineHTML(accessibleName)}" style="--x:${((item.point.x / 1200) * 100).toFixed(3)}%; --y:${((item.point.y / TIMELINE_CANVAS_HEIGHT) * 100).toFixed(3)}%; --coin-size:${item.coinSize}px; --material-color:${item.materialMeta.color}; --material-glow:${item.materialMeta.glow}; --node-delay:${index * 70}ms;">
          <span class="timeline-node-label">
            <strong>${escapeTimelineHTML(visibleCoin.name || item.raw.name)}</strong>
            <small>${escapeTimelineHTML(nodeLabelYear)}</small>
          </span>
          <span class="timeline-coin-disc" aria-hidden="true">
            <span class="timeline-coin-inscription">${escapeTimelineHTML(coinChar)}</span>
            <span class="timeline-square-hole"></span>
          </span>
        </button>
      `;
    }).join('');

    const activeVisible = activeItem ? activeItem.display : null;
    const activeRaw = activeItem ? activeItem.raw : null;
    const activeMaterial = activeItem ? activeItem.materialMeta : getTimelineMaterialMeta('');
    const activePoint = activeItem ? getTimelinePoint(activeItem.year, bounds, 0) : null;
    const activeProgress = activePoint ? activePoint.t * 100 : 0;
    const inscriptionChars = Array.from(String(activeRaw?.inscription || activeRaw?.name || '钱').replace(/\s/g, ''));
    while (inscriptionChars.length < 4) inscriptionChars.push('·');
    const activeIndex = visibleItems.findIndex((item) => item.id === timelineState.activeCoinId);

    const focusCardMarkup = activeItem ? `
      <aside class="timeline-focus-card" aria-label="${appState.lang === 'en' ? 'Selected coin profile' : '当前钱币档案'}">
        <div class="timeline-focus-top">
          <div class="timeline-focus-coin material-${activeMaterial.key}" style="--material-color:${activeMaterial.color}; --material-glow:${activeMaterial.glow};">
            <span class="focus-char char-top">${escapeTimelineHTML(inscriptionChars[0])}</span>
            <span class="focus-char char-right">${escapeTimelineHTML(inscriptionChars[1])}</span>
            <span class="focus-char char-bottom">${escapeTimelineHTML(inscriptionChars[2])}</span>
            <span class="focus-char char-left">${escapeTimelineHTML(inscriptionChars[3])}</span>
            <span class="timeline-square-hole"></span>
          </div>
          <div class="timeline-focus-title">
            <span class="timeline-focus-kicker">${appState.lang === 'en' ? 'Current artifact' : '当前钱币'}</span>
            <h3>${escapeTimelineHTML(activeVisible?.name || activeRaw?.name)}</h3>
            <p>${escapeTimelineHTML(activeVisible?.short || activeVisible?.description || (appState.lang === 'en' ? 'No description yet.' : '暂无描述'))}</p>
          </div>
        </div>
        <div class="timeline-focus-meta">
          <div><span>${appState.lang === 'en' ? 'Era' : '时代'}</span><strong>${escapeTimelineHTML(activeVisible?.era || activeItem.era)}</strong></div>
          <div><span>${appState.lang === 'en' ? 'Date' : '年代'}</span><strong>${escapeTimelineHTML(activeVisible?.year || formatTimelineYear(activeItem.year))}</strong></div>
          <div><span>${appState.lang === 'en' ? 'Material' : '材质'}</span><strong>${escapeTimelineHTML(activeVisible?.material || activeRaw?.material || (appState.lang === 'en' ? 'Unknown' : '未知'))}</strong></div>
          <div><span>${appState.lang === 'en' ? 'Origin' : '产地'}</span><strong>${escapeTimelineHTML(activeVisible?.region || activeRaw?.region || (appState.lang === 'en' ? 'Unknown' : '未知'))}</strong></div>
        </div>
        <div class="timeline-focus-progress" aria-hidden="true">
          <span class="timeline-focus-progress-fill" style="width:${activeProgress.toFixed(2)}%"></span>
        </div>
        <div class="timeline-focus-year-row">
          <span>${formatTimelineYear(activeItem.year)}</span>
          <span>${escapeTimelineHTML(activeVisible?.type || activeRaw?.type || (appState.lang === 'en' ? 'Unspecified' : '未标注'))}</span>
        </div>
        <div class="timeline-focus-actions">
          <button type="button" data-timeline-action="prev" ${activeIndex <= 0 ? 'disabled' : ''}>${appState.lang === 'en' ? 'Previous' : '上一枚'}</button>
          <button type="button" class="is-primary" data-timeline-action="detail">${appState.lang === 'en' ? 'Open profile' : '查看档案'}</button>
          <button type="button" data-timeline-action="next" ${activeIndex >= visibleItems.length - 1 ? 'disabled' : ''}>${appState.lang === 'en' ? 'Next' : '下一枚'}</button>
        </div>
      </aside>
    ` : '';

    const eraStripMarkup = groups.map((group) => {
      const translatedEra = translateTextValue(group.era);
      return `
        <button type="button" class="timeline-era-chip ${timelineState.expandedEra === group.era ? 'is-active' : ''}" data-era="${escapeTimelineHTML(group.era)}" style="--era-color:${group.meta.color}" aria-pressed="${timelineState.expandedEra === group.era ? 'true' : 'false'}">
          <span class="timeline-era-seal">${escapeTimelineHTML(group.meta.seal)}</span>
          <span class="timeline-era-copy">
            <strong>${escapeTimelineHTML(translatedEra)}</strong>
            <small>${group.items.length} ${appState.lang === 'en' ? 'coins' : '枚'} · ${escapeTimelineHTML(formatTimelineYear(group.startYear))}</small>
          </span>
        </button>
      `;
    }).join('');

    axisRoot.innerHTML = `
      <div class="timeline-viz-head">
        <div>
          <span class="timeline-viz-kicker">${appState.lang === 'en' ? 'Coin river' : '币行长河'}</span>
          <h3>${appState.lang === 'en' ? 'Square-holed cash across Chinese history' : '方孔圆钱 · 千年流转'}</h3>
          <p>${appState.lang === 'en' ? 'The golden current moves through time; each coin can be selected to inspect its material, origin, and historical position.' : '金色币流沿时间推进，点击任意钱币，即可联动查看材质、产地与历史坐标。'}</p>
        </div>
        <div class="timeline-viz-stats" aria-label="${appState.lang === 'en' ? 'Timeline statistics' : '时间轴统计'}">
          <div><strong>${allItems.length}</strong><span>${appState.lang === 'en' ? 'Coins' : '钱币'}</span></div>
          <div><strong>${groups.length}</strong><span>${appState.lang === 'en' ? 'Eras' : '时代'}</span></div>
          <div><strong>${materialCount}</strong><span>${appState.lang === 'en' ? 'Materials' : '材质'}</span></div>
        </div>
      </div>

      <div class="timeline-stage-grid">
        <div class="timeline-stage-main">
          <div class="timeline-stage-toolbar">
            <button type="button" class="timeline-play-toggle" data-timeline-action="toggle-play" aria-pressed="${timelineState.playing ? 'true' : 'false'}">
              <span class="timeline-play-icon">${timelineState.playing ? 'Ⅱ' : '▶'}</span>
              <span>${timelineState.playing ? (appState.lang === 'en' ? 'Pause flow' : '暂停流转') : (appState.lang === 'en' ? 'Play flow' : '播放流转')}</span>
            </button>
            <div class="timeline-current-range">${formatTimelineYear(bounds.min)} — ${formatTimelineYear(bounds.max)}</div>
          </div>

          <div class="timeline-coinfield ${timelineState.expandedEra ? 'has-era-focus' : ''}" style="--playhead-x:${(4.5 + clampTimelineNumber((timelineState.activeYear - bounds.min) / Math.max(bounds.max - bounds.min, 1), 0, 1) * 91).toFixed(2)}%">
            ${ambientMarkup}
            <svg class="timeline-river" viewBox="0 0 ${TIMELINE_CANVAS_WIDTH} ${TIMELINE_CANVAS_HEIGHT}" role="img" aria-label="${appState.lang === 'en' ? 'Interactive ancient coin timeline' : '中国古代钱币互动时间轴'}">
              <defs>
                <linearGradient id="timelineSpineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#8d6034"></stop>
                  <stop offset="28%" stop-color="#d0a154"></stop>
                  <stop offset="52%" stop-color="#e3c47b"></stop>
                  <stop offset="78%" stop-color="#a9723b"></stop>
                  <stop offset="100%" stop-color="#e0bd72"></stop>
                </linearGradient>
              </defs>
              ${ticksMarkup}
              ${eraBandsMarkup}
              <path class="timeline-spine-shadow" d="${spinePath}"></path>
              <path class="timeline-spine" d="${spinePath}"></path>
              <path class="timeline-spine-flow" d="${spinePath}"></path>
              ${connectorsMarkup}
            </svg>
            <div class="timeline-playhead" aria-hidden="true">
              <span class="timeline-playhead-coin"></span>
              <span class="timeline-playhead-line"></span>
              <span class="timeline-playhead-year">${formatTimelineYear(Math.round(timelineState.activeYear))}</span>
            </div>
            <div class="timeline-nodes">
              ${nodesMarkup}
            </div>
          </div>

          <div class="timeline-era-strip" aria-label="${appState.lang === 'en' ? 'Filter by era' : '按时代聚焦'}">
            ${eraStripMarkup}
          </div>
        </div>
        ${focusCardMarkup}
      </div>
    `;

    axisRoot.querySelectorAll('[data-coin-node]').forEach((node) => {
      const item = assignedItems.find((entry) => String(entry.id) === String(node.dataset.coinNode));
      if (!item) return;
      node.addEventListener('click', () => {
        timelineState.activeCoinId = item.id;
        timelineState.expandedEra = item.era;
        timelineState.activeYear = item.year;
        timelineState.playing = false;
        timelineState.followPlayback = false;
        renderTimeline();
      });
    });

    axisRoot.querySelectorAll('.timeline-era-chip').forEach((node) => {
      node.addEventListener('click', () => {
        const era = node.dataset.era;
        const group = groups.find((entry) => entry.era === era);
        timelineState.expandedEra = timelineState.expandedEra === era ? null : era;
        const nextItem = timelineState.expandedEra
          ? visibleItems.find((item) => item.era === era) || group?.items[0]
          : visibleItems[0];
        if (nextItem) {
          timelineState.activeCoinId = nextItem.id;
          timelineState.activeYear = nextItem.year;
        }
        timelineState.playing = false;
        timelineState.followPlayback = false;
        renderTimeline();
      });
    });

    axisRoot.querySelectorAll('[data-timeline-action]').forEach((button) => {
      button.addEventListener('click', () => {
        const action = button.dataset.timelineAction;
        const currentIndex = visibleItems.findIndex((item) => item.id === timelineState.activeCoinId);

        if (action === 'toggle-play') {
          timelineState.playing = !timelineState.playing;
          timelineState.followPlayback = timelineState.playing;
          renderTimeline();
          return;
        }

        if (action === 'detail' && timelineState.activeCoinId) {
          openDetail(timelineState.activeCoinId);
          return;
        }

        if ((action === 'prev' || action === 'next') && currentIndex >= 0) {
          const nextIndex = clampTimelineNumber(currentIndex + (action === 'next' ? 1 : -1), 0, visibleItems.length - 1);
          const nextItem = visibleItems[nextIndex];
          if (nextItem) {
            timelineState.activeCoinId = nextItem.id;
            timelineState.expandedEra = nextItem.era;
            timelineState.activeYear = nextItem.year;
            timelineState.playing = false;
            timelineState.followPlayback = false;
            renderTimeline();
          }
        }
      });
    });

    const simplifyButton = document.getElementById('timelineSimplifyBtn');
    const resetButton = document.getElementById('timelineResetBtn');
    if (simplifyButton) {
      simplifyButton.textContent = timelineState.simplified
        ? (appState.lang === 'en' ? 'Show all' : '显示全部')
        : t('timelineSimplify', '主币脉络');
    }
    if (resetButton) {
      resetButton.textContent = t('timelineReset', '完整长卷');
    }

    syncTimelinePlayback(assignedItems, bounds);
    startTimelinePlayback(assignedItems, bounds);
  }

  async function persistCoins() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(coinData));

    try {
      await fetch('/api/coins/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ coins: coinData })
      });
    } catch (error) {
      console.warn('写入数据库失败，已保留到本地缓存。', error);
    }
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

  const SEARCH_PROPERTY_ALIASES = {
    名称: ['name', 'alias'],
    币名: ['name', 'alias'],
    别称: ['alias'],
    时代: ['era', 'year'],
    朝代: ['era', 'year'],
    时期: ['era', 'year'],
    材质: ['material'],
    材料: ['material'],
    类型: ['type', 'classification_basis'],
    版式: ['type', 'classification_basis'],
    分类: ['classification_basis'],
    形制: ['shape'],
    书体: ['script'],
    钱文: ['inscription'],
    铭文: ['inscription'],
    产地: ['region'],
    流通地: ['region'],
    流通地点: ['region'],
    出土地: ['excavation_site'],
    出土地点: ['excavation_site'],
    来源: ['sourceRef', 'source_ref'],
    出处: ['sourceRef', 'source_ref'],
    铸造机构: ['mint_name'],
    人物: ['person_name'],
    事迹: ['historical_event']
  };

  function parseSearchPropertyQuery(query) {
    return String(query || '')
      .split(/[\s,，;；]+/)
      .map((token) => token.trim())
      .filter(Boolean)
      .map((token) => {
        const parts = token.split(/[:：]/);
        if (parts.length < 2) {
          return { label: appState.lang === 'en' ? 'Keyword' : '关键词', keys: ['name', 'alias', 'description', 'inscription', 'region'], value: token };
        }
        const label = parts.shift().trim();
        const value = parts.join(':').trim();
        return {
          label,
          keys: SEARCH_PROPERTY_ALIASES[label] || ['name', 'alias', 'description', 'type', 'material', 'shape', 'script', 'region', 'inscription', 'excavation_site'],
          value
        };
      })
      .filter((token) => token.value);
  }

  function coinMatchesPropertyQuery(coin) {
    const tokens = parseSearchPropertyQuery(state.propertyQuery);
    if (!tokens.length) return true;
    return tokens.every((token) => {
      const expected = token.value.toLowerCase();
      return token.keys.some((key) => String(coin[key] || '').toLowerCase().includes(expected));
    });
  }

  function coinMatchesAttributeFilters(coin) {
    const matchShape = state.shape === 'all' || coin.shape === state.shape;
    const matchScript = state.script === 'all' || coin.script === state.script;
    const matchInscription = !state.inscription || String(coin.inscription || '').toLowerCase().includes(state.inscription.toLowerCase());
    const matchExcavation = !state.excavation || String(coin.excavation_site || '').toLowerCase().includes(state.excavation.toLowerCase());
    return matchShape && matchScript && matchInscription && matchExcavation;
  }

  function getTopCoinValues(coins, key, limit = 3) {
    const counts = new Map();
    coins.forEach((coin) => {
      const value = String(coin[key] || '').trim();
      if (value) counts.set(value, (counts.get(value) || 0) + 1);
    });
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);
  }

  function renderKnowledgeGraphInsights(filtered) {
    if (!kgInsightPanel) return;

    if (searchResultCount) {
      searchResultCount.textContent = appState.lang === 'en'
        ? `${filtered.length} results`
        : `共 ${filtered.length} 条结果`;
    }

    const firstCoin = filtered[0];
    const eraTop = getTopCoinValues(filtered, 'era');
    const materialTop = getTopCoinValues(filtered, 'material');
    const shapeTop = getTopCoinValues(filtered, 'shape');
    const regionTop = getTopCoinValues(filtered, 'region');
    const scriptTop = getTopCoinValues(filtered, 'script');
    const propertyTokens = parseSearchPropertyQuery(state.propertyQuery);
    const activeCriteria = [
      state.era !== 'all' ? ['时代', state.era] : null,
      state.material !== 'all' ? ['材质', state.material] : null,
      state.region !== 'all' ? ['产地', state.region] : null,
      state.type !== 'all' ? ['类型', state.type] : null,
      state.shape !== 'all' ? ['形制', state.shape] : null,
      state.script !== 'all' ? ['书体', state.script] : null,
      state.inscription ? ['钱文', state.inscription] : null,
      state.excavation ? ['出土地点', state.excavation] : null,
      state.keyword ? ['关键词', state.keyword] : null,
      ...propertyTokens.map((token) => [token.label, token.value])
    ].filter(Boolean);

    const graphEntities = [
      { label: appState.lang === 'en' ? 'Era' : '时代', relation: 'namedAfterEra', values: eraTop, x: 55, y: 38 },
      { label: appState.lang === 'en' ? 'Material' : '材质', relation: 'madeOf', values: materialTop, x: 265, y: 38 },
      { label: appState.lang === 'en' ? 'Shape' : '形制', relation: 'hasShape', values: shapeTop, x: 46, y: 152 },
      { label: appState.lang === 'en' ? 'Region' : '产地', relation: 'circulatesIn', values: regionTop, x: 274, y: 152 },
      { label: appState.lang === 'en' ? 'Script' : '书体', relation: 'usesScript', values: scriptTop, x: 160, y: 170 }
    ];

    const graphMarkup = graphEntities.map((entity) => {
      const top = entity.values[0];
      const label = top ? `${entity.label} · ${top[0]}` : entity.label;
      const count = top ? top[1] : 0;
      return `
        <line class="kg-mini-edge" x1="160" y1="94" x2="${entity.x}" y2="${entity.y}"></line>
        <g class="kg-mini-node">
          <circle cx="${entity.x}" cy="${entity.y}" r="25"></circle>
          <text x="${entity.x}" y="${entity.y - 2}" text-anchor="middle">${escapeTimelineHTML(entity.label)}</text>
          <text class="kg-mini-count" x="${entity.x}" y="${entity.y + 13}" text-anchor="middle">${count}</text>
          <title>${escapeTimelineHTML(label)}</title>
        </g>
      `;
    }).join('');

    const relationRows = firstCoin ? [
      ['Coin', firstCoin.name, 'namedAfterEra', 'Era', firstCoin.era],
      ['Coin', firstCoin.name, 'madeOf', 'Material', firstCoin.material],
      ['Coin', firstCoin.name, 'hasShape', 'Shape', firstCoin.shape],
      ['Coin', firstCoin.name, 'circulatesIn', 'Region', firstCoin.region],
      ['Coin', firstCoin.name, 'usesScript', 'Script', firstCoin.script]
    ].filter((row) => row[4]).map((row) => `
      <div class="kg-relation-row">
        <span>${escapeTimelineHTML(row[0])}[${escapeTimelineHTML(row[1])}]</span>
        <i>${escapeTimelineHTML(row[2])}</i>
        <span>${escapeTimelineHTML(row[3])}[${escapeTimelineHTML(row[4])}]</span>
      </div>
    `).join('') : `<div class="kg-empty-copy">${appState.lang === 'en' ? 'No matching graph path' : '暂无匹配的图谱路径'}</div>`;

    const materialCounts = getTopCoinValues(filtered, 'material', 4);
    const maxMaterialCount = Math.max(...materialCounts.map(([, count]) => count), 1);
    const distributionMarkup = materialCounts.length ? materialCounts.map(([value, count]) => `
      <div class="kg-distribution-row">
        <span>${escapeTimelineHTML(translateTextValue(value))}</span>
        <div><i style="width:${(count / maxMaterialCount) * 100}%"></i></div>
        <strong>${count}</strong>
      </div>
    `).join('') : `<div class="kg-empty-copy">${appState.lang === 'en' ? 'No material distribution' : '暂无材质分布'}</div>`;

    const relatedCoins = firstCoin ? filtered
      .filter((coin) => coin.id !== firstCoin.id)
      .map((coin) => ({
        coin,
        score: (coin.type === firstCoin.type ? 3 : 0)
          + (coin.era === firstCoin.era ? 2 : 0)
          + (coin.material === firstCoin.material ? 2 : 0)
          + (coin.shape === firstCoin.shape ? 1 : 0)
          + (coin.region === firstCoin.region ? 1 : 0)
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4) : [];

    const relatedMarkup = relatedCoins.length ? relatedCoins.map(({ coin, score }) => `
      <button type="button" class="kg-related-coin" data-id="${escapeTimelineHTML(coin.id)}">
        <strong>${escapeTimelineHTML(displayCoin(coin).name)}</strong>
        <span>${appState.lang === 'en' ? 'relation score' : '关联强度'} ${score}</span>
      </button>
    `).join('') : `<div class="kg-empty-copy">${appState.lang === 'en' ? 'No related coins' : '暂无同类关联'}</div>`;

    kgInsightPanel.innerHTML = `
      <div class="kg-panel-header" id="kgPanelHeader">
        <span>${appState.lang === 'en' ? 'Graph Insight' : '图谱洞察 · 钱币关系快照'}</span>
        <button type="button" class="kg-panel-close" id="kgPanelClose" aria-label="关闭">×</button>
      </div>
      <div class="kg-panel-scroll">
        <div class="kg-panel-section kg-panel-hero">
          <span>${appState.lang === 'en' ? 'Graph Insight' : '图谱洞察'}</span>
          <h3>${appState.lang === 'en' ? 'Coin relation snapshot' : '钱币关系快照'}</h3>
          <p>${appState.lang === 'en' ? 'Current filters are interpreted as ontology paths.' : '当前检索条件会被解释为知识图谱中的实体关系路径。'}</p>
        </div>
        <div class="kg-panel-section">
          <div class="kg-section-title">${appState.lang === 'en' ? 'Active criteria' : '检索条件'}</div>
          <div class="kg-criteria-list">
            ${activeCriteria.length ? activeCriteria.map(([label, value]) => `<span>${escapeTimelineHTML(label)}：${escapeTimelineHTML(value)}</span>`).join('') : `<span>${appState.lang === 'en' ? 'All coins' : '全部钱币'}</span>`}
          </div>
        </div>
        <div class="kg-panel-section">
          <div class="kg-section-title">${appState.lang === 'en' ? 'Mini graph' : '实体小图'}</div>
          <svg class="kg-mini-graph" viewBox="0 0 320 210" role="img" aria-label="检索知识图谱">
            ${graphMarkup}
            <g class="kg-mini-center">
              <circle cx="160" cy="94" r="38"></circle>
              <text x="160" y="89" text-anchor="middle">Coin</text>
              <text class="kg-mini-count" x="160" y="107" text-anchor="middle">${filtered.length}</text>
            </g>
          </svg>
        </div>
        <div class="kg-panel-section">
          <div class="kg-section-title">${appState.lang === 'en' ? 'Relation paths' : '关系路径'}</div>
          <div class="kg-relation-list">${relationRows}</div>
        </div>
        <div class="kg-panel-section">
          <div class="kg-section-title">${appState.lang === 'en' ? 'Material distribution' : '材质分布'}</div>
          <div class="kg-distribution-list">${distributionMarkup}</div>
        </div>
        <div class="kg-panel-section">
          <div class="kg-section-title">${appState.lang === 'en' ? 'Related coins' : '同类关联'}</div>
          <div class="kg-related-list">${relatedMarkup}</div>
        </div>
      </div>
    `;

    kgInsightPanel.querySelectorAll('.kg-related-coin').forEach((button) => {
      button.addEventListener('click', () => openDetail(button.dataset.id));
    });

    const closeBtn = kgInsightPanel.querySelector('#kgPanelClose');
    if (closeBtn) {
      closeBtn.addEventListener('click', hideKgPanel);
    }
  }

  function hideKgPanel() {
    if (!kgInsightPanel) return;
    kgInsightPanel.classList.add('is-hidden');
    if (kgPanelToggle) {
      kgPanelToggle.setAttribute('aria-pressed', 'false');
      kgPanelToggle.classList.remove('is-active');
    }
  }

  function showKgPanel() {
    if (!kgInsightPanel) return;
    kgInsightPanel.classList.remove('is-hidden');
    if (kgPanelToggle) {
      kgPanelToggle.setAttribute('aria-pressed', 'true');
      kgPanelToggle.classList.add('is-active');
    }
  }

  function toggleKgPanel() {
    if (!kgInsightPanel) return;
    if (kgInsightPanel.classList.contains('is-hidden')) {
      showKgPanel();
    } else {
      hideKgPanel();
    }
  }

  function bindKgPanelDrag() {
    if (!kgInsightPanel) return;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;

    const startDrag = (e) => {
      if (e.target.closest('.kg-panel-close')) return;
      const header = e.target.closest('.kg-panel-header');
      if (!header) return;
      e.preventDefault();
      isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      startX = clientX;
      startY = clientY;
      const rect = kgInsightPanel.getBoundingClientRect();
      startLeft = rect.left;
      startTop = rect.top;
      kgInsightPanel.classList.add('is-dragging');
    };

    const onDrag = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = clientX - startX;
      const dy = clientY - startY;
      let left = startLeft + dx;
      let top = startTop + dy;
      const width = kgInsightPanel.offsetWidth;
      const height = kgInsightPanel.offsetHeight;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      left = Math.max(0, Math.min(left, vw - width));
      top = Math.max(0, Math.min(top, vh - height));
      kgInsightPanel.style.left = `${left}px`;
      kgInsightPanel.style.top = `${top}px`;
      kgInsightPanel.style.right = 'auto';
    };

    const endDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      kgInsightPanel.classList.remove('is-dragging');
      if (window.localStorage) {
        const rect = kgInsightPanel.getBoundingClientRect();
        localStorage.setItem('kgPanelPos', JSON.stringify({ left: rect.left, top: rect.top }));
      }
    };

    kgInsightPanel.addEventListener('mousedown', startDrag);
    kgInsightPanel.addEventListener('touchstart', startDrag, { passive: false });
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('touchmove', onDrag, { passive: false });
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchend', endDrag);
  }

  if (kgPanelToggle) {
    kgPanelToggle.addEventListener('click', toggleKgPanel);
  }

  if (kgInsightPanel) {
    const savedPos = localStorage.getItem('kgPanelPos');
    if (savedPos) {
      try {
        const { left, top } = JSON.parse(savedPos);
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const minVisible = 80;
        const clampedLeft = Math.max(0, Math.min(left, vw - minVisible));
        const clampedTop = Math.max(0, Math.min(top, vh - minVisible));
        kgInsightPanel.style.left = `${clampedLeft}px`;
        kgInsightPanel.style.top = `${clampedTop}px`;
        kgInsightPanel.style.right = 'auto';
      } catch (e) {
        // ignore invalid saved position
      }
    }
    bindKgPanelDrag();
    hideKgPanel();
  }

  function renderCoins() {
    const filtered = coinData.filter((coin) => {
      const displayCoinData = displayCoin(coin);
      const matchEra = state.era === 'all' || displayCoinData.era === state.era || coin.era === state.era;
      const matchMaterial = state.material === 'all' || displayCoinData.material === state.material || coin.material === state.material;
      const matchRegion = state.region === 'all' || displayCoinData.region === state.region || coin.region === state.region;
      const matchType = state.type === 'all' || displayCoinData.type === state.type || coin.type === state.type;
      const matchAttributes = coinMatchesAttributeFilters(coin);
      const matchPropertyQuery = coinMatchesPropertyQuery(coin);
      const matchTag = state.tag === 'all' || (coin.tags || []).includes(state.tag) || (displayCoinData.tags || []).includes(state.tag);
      const searchableText = `${displayCoinData.name || ''}${displayCoinData.alias || ''}${displayCoinData.description || ''}${displayCoinData.region || ''}${displayCoinData.excavation_site || ''}${displayCoinData.type || ''}${displayCoinData.classification_basis || ''}${displayCoinData.script || ''}${displayCoinData.inscription || ''}`.toLowerCase();
      const matchKeyword = !state.keyword || searchableText.includes(state.keyword.toLowerCase());
      return matchEra && matchMaterial && matchRegion && matchType && matchAttributes && matchPropertyQuery && matchTag && matchKeyword;
    });

    renderKnowledgeGraphInsights(filtered);

    if (!filtered.length) {
      coinGrid.innerHTML = `<div class="empty-state">${appState.lang === 'en' ? 'No matching collection items' : '暂无符合条件的藏品'}</div>`;
      return;
    }

    coinGrid.innerHTML = filtered.map((coin) => {
      const visibleCoin = displayCoin(coin);
      const typeLabel = visibleCoin.type || (appState.lang === 'en' ? 'Not specified' : '未标注');
      const metaLine = `${visibleCoin.era} · ${visibleCoin.material} · ${typeLabel}`;
      return `
        <article class="coin-card">
          <button class="coin-image-button" type="button" data-id="${visibleCoin.id}">
            <div class="coin-art" style="background-image: linear-gradient(135deg, rgba(99,79,53,0.7), rgba(194,157,93,0.4)), url('${visibleCoin.image}')"></div>
          </button>
          <div class="coin-card-copy">
            <h3>${visibleCoin.name}</h3>
            <div class="coin-meta-line">${metaLine}</div>
            <p>${visibleCoin.short}</p>
            <div class="coin-tags">
              ${(visibleCoin.tags || []).map((tag) => `<span class="coin-tag">${tag}</span>`).join('')}
            </div>
          </div>
        </article>
      `;
    }).join('');

    document.querySelectorAll('.coin-image-button').forEach((button) => {
      button.addEventListener('click', () => openDetail(button.dataset.id));
    });
  }

  async function deleteCoin(id) {
    const coin = coinData.find((item) => item.id === id);
    if (!coin) return;

    const confirmed = window.confirm(`确认删除藏品“${coin.name}”吗？`);
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/coins/${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.error || '删除失败');
      }

      coinData = coinData.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(coinData));
      renderCoins();
      updateHomeStats();
      renderTimeline();
      closeDetail();
      alert('藏品删除成功');
    } catch (error) {
      alert(error.message || '删除失败');
    }
  }

  function openDetail(id) {
    const coin = coinData.find((item) => item.id === id);
    if (!coin) return;

    const visibleCoin = displayCoin(coin);
    const unlabelled = appState.lang === 'en' ? 'Not specified' : '未标注';
    const formatValue = (value, unit = '', fallback = unlabelled) => {
      const raw = value ?? '';
      if (raw === '' || raw === null || raw === undefined) return fallback;
      const text = String(raw).trim();
      return text.includes(unit) || unit === '' ? text : `${text}${unit}`;
    };

    const coinName = translateTextValue(getCoinField(visibleCoin, 'name', 'name_zh', 'title')) || unlabelled;
    const coinType = translateTextValue(getCoinField(visibleCoin, 'type', 'coinType', 'Type')) || unlabelled;
    const coinMaterial = translateTextValue(getCoinField(visibleCoin, 'material', 'Material')) || unlabelled;
    const coinShape = translateTextValue(getCoinField(visibleCoin, 'shape', 'Shape')) || unlabelled;
    const coinScript = translateTextValue(getCoinField(visibleCoin, 'script', 'Script')) || unlabelled;
    const coinRegion = translateTextValue(getCoinField(visibleCoin, 'region', 'Region')) || unlabelled;
    const coinYear = translateTextValue(getCoinField(visibleCoin, 'year', 'Year')) || unlabelled;
    const coinDiameter = formatValue(translateTextValue(getCoinField(visibleCoin, 'diameter_cm', 'diameter', 'diameter_cm_value')), 'cm');
    const coinHoleWidth = formatValue(translateTextValue(getCoinField(visibleCoin, 'hole_width_cm', 'holeWidth', 'hole_width')), 'cm');
    const coinThickness = formatValue(translateTextValue(getCoinField(visibleCoin, 'rim_thickness_cm', 'thickness', 'rim_thickness')), 'cm');
    const coinWeight = formatValue(translateTextValue(getCoinField(visibleCoin, 'weight_g', 'weight', 'weight_g_value')), 'g');
    const coinInscription = translateTextValue(getCoinField(visibleCoin, 'inscription', 'inscriptionText', 'moneyText')) || unlabelled;
    const coinSourceRef = translateTextValue(getCoinField(visibleCoin, 'source_ref', 'sourceRef', 'sourceReference')) || unlabelled;
    const coinImageSource = translateTextValue(getCoinField(visibleCoin, 'image_source', 'imageSource')) || unlabelled;
    const coinAlias = translateTextValue(getCoinField(visibleCoin, 'alias', 'Alias')) || '';
    const coinClassification = translateTextValue(getCoinField(visibleCoin, 'classification_basis', 'classificationBasis')) || '';
    const coinLength = formatValue(translateTextValue(getCoinField(visibleCoin, 'length_cm', 'length')), 'cm', '');
    const coinWidth = formatValue(translateTextValue(getCoinField(visibleCoin, 'width_cm', 'width')), 'cm', '');
    const coinExcavation = translateTextValue(getCoinField(visibleCoin, 'excavation_site', 'excavationSite')) || '';
    const coinMint = translateTextValue(getCoinField(visibleCoin, 'mint_name', 'mintName')) || '';
    const coinPerson = translateTextValue(getCoinField(visibleCoin, 'person_name', 'personName')) || '';
    const coinEvent = translateTextValue(getCoinField(visibleCoin, 'historical_event', 'historicalEvent')) || '';
    const remark = translateTextValue(getCoinField(visibleCoin, 'remark', 'note', 'descriptionNote') || visibleCoin.description || unlabelled) || unlabelled;

    const optionalDetailRows = [
      [appState.lang === 'en' ? 'Alias' : '别称', coinAlias],
      [appState.lang === 'en' ? 'Classification basis' : '分类依据', coinClassification],
      [appState.lang === 'en' ? 'Length' : '长', coinLength],
      [appState.lang === 'en' ? 'Width' : '宽', coinWidth],
      [appState.lang === 'en' ? 'Excavation site' : '出土地点', coinExcavation],
      [appState.lang === 'en' ? 'Mint' : '铸造机构', coinMint],
      [appState.lang === 'en' ? 'Person' : '人物', coinPerson],
      [appState.lang === 'en' ? 'Historical event' : '事迹', coinEvent]
    ].filter(([, value]) => value)
      .map(([label, value]) => `<div class="detail-field"><span>${label}</span><strong>${escapeTimelineHTML(value)}</strong></div>`)
      .join('');

    detailContent.innerHTML = `
      <img class="detail-image" src="${visibleCoin.image}" alt="${coinName}" />
      <div class="detail-info">
        <h3>${coinName}</h3>
        <p>${visibleCoin.description || remark}</p>
        <div class="detail-fields">
          <div class="detail-field"><span>${appState.lang === 'en' ? 'Name' : '名称'}</span><strong>${coinName}</strong></div>
          <div class="detail-field"><span>${appState.lang === 'en' ? 'Era' : '年代'}</span><strong>${coinYear}</strong></div>
          <div class="detail-field"><span>${appState.lang === 'en' ? 'Type' : '类型'}</span><strong>${coinType}</strong></div>
          <div class="detail-field"><span>${appState.lang === 'en' ? 'Material' : '材质'}</span><strong>${coinMaterial}</strong></div>
          <div class="detail-field"><span>${appState.lang === 'en' ? 'Shape' : '形制'}</span><strong>${coinShape}</strong></div>
          <div class="detail-field"><span>${appState.lang === 'en' ? 'Script' : '书体'}</span><strong>${coinScript}</strong></div>
          <div class="detail-field"><span>${appState.lang === 'en' ? 'Origin' : '产地'}</span><strong>${coinRegion}</strong></div>
          ${optionalDetailRows}
          <div class="detail-field"><span>${appState.lang === 'en' ? 'Diameter' : '直径'}</span><strong>${coinDiameter}</strong></div>
          <div class="detail-field"><span>${appState.lang === 'en' ? 'Hole width' : '孔宽'}</span><strong>${coinHoleWidth}</strong></div>
          <div class="detail-field"><span>${appState.lang === 'en' ? 'Rim thickness' : '厚度'}</span><strong>${coinThickness}</strong></div>
          <div class="detail-field"><span>${appState.lang === 'en' ? 'Weight' : '重量'}</span><strong>${coinWeight}</strong></div>
          <div class="detail-field"><span>${appState.lang === 'en' ? 'Inscription' : '钱文'}</span><strong>${coinInscription}</strong></div>
          <div class="detail-field"><span>${appState.lang === 'en' ? 'Image source' : '图像来源'}</span><strong>${coinImageSource}</strong></div>
          <div class="detail-field"><span>${appState.lang === 'en' ? 'Source' : '出处'}</span><strong>${coinSourceRef}</strong></div>
          <div class="detail-field"><span>${appState.lang === 'en' ? 'Remarks' : '备注'}</span><strong>${remark}</strong></div>
        </div>
        <button class="delete-coin-btn" type="button" data-id="${visibleCoin.id}">${appState.lang === 'en' ? 'Delete item' : '删除藏品'}</button>
      </div>
    `;

    const deleteBtn = detailContent.querySelector('.delete-coin-btn');
    deleteBtn?.addEventListener('click', () => deleteCoin(coin.id));

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
    updateHomeStats();
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
    updateHomeStats();
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

  shapeFilter?.addEventListener('change', (event) => {
    state.shape = event.target.value;
    renderCoins();
  });

  scriptFilter?.addEventListener('change', (event) => {
    state.script = event.target.value;
    renderCoins();
  });

  inscriptionFilter?.addEventListener('input', (event) => {
    state.inscription = event.target.value.trim();
    renderCoins();
  });

  excavationFilter?.addEventListener('input', (event) => {
    state.excavation = event.target.value.trim();
    renderCoins();
  });

  function applyPropertySearch() {
    state.propertyQuery = propertyQueryInput?.value.trim() || '';
    renderCoins();
  }

  applyPropertyQueryBtn?.addEventListener('click', applyPropertySearch);
  propertyQueryInput?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      applyPropertySearch();
    }
  });

  document.querySelectorAll('.property-examples button').forEach((button) => {
    button.addEventListener('click', () => {
      if (propertyQueryInput) propertyQueryInput.value = button.dataset.query || '';
      applyPropertySearch();
    });
  });

  clearSearchBtn?.addEventListener('click', () => {
    Object.assign(state, {
      era: 'all',
      material: 'all',
      region: 'all',
      type: 'all',
      shape: 'all',
      script: 'all',
      inscription: '',
      excavation: '',
      propertyQuery: '',
      tag: 'all',
      keyword: ''
    });
    [eraFilter, materialFilter, regionFilter, typeFilter, shapeFilter, scriptFilter].forEach((select) => {
      if (select) select.value = 'all';
    });
    [coinSearch, inscriptionFilter, excavationFilter, propertyQueryInput].forEach((input) => {
      if (input) input.value = '';
    });
    chips.forEach((chip) => chip.classList.toggle('active', chip.dataset.tag === 'all'));
    renderCoins();
  });

  function bindFilterChips() {
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((item) => item.classList.toggle('active', item === chip));
        state.tag = chip.dataset.tag || 'all';
        renderCoins();
      });
    });
  }

  const timelineSimplifyBtn = document.getElementById('timelineSimplifyBtn');
  const timelineResetBtn = document.getElementById('timelineResetBtn');

  timelineSimplifyBtn.addEventListener('click', () => {
    timelineState.simplified = !timelineState.simplified;
    timelineState.playing = false;
    timelineState.followPlayback = false;
    renderTimeline();
  });

  timelineResetBtn.addEventListener('click', () => {
    timelineState.simplified = false;
    timelineState.expandedEra = null;
    timelineState.activeCoinId = null;
    timelineState.activeYear = null;
    timelineState.playing = true;
    timelineState.followPlayback = true;
    renderTimeline();
  });

  closeOverlay.addEventListener('click', closeDetail);
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closeDetail();
    }
  });

  function renderCityMapDetail(cityName) {
    const detailCard = document.getElementById('cityDetailCard');
    if (!detailCard) return;

    const visibleCity = cityLabel(cityName);
    const matchers = cityProductionMatchers[cityName] || [cityName];
    const matchedCoins = coinData.filter((coin) => {
      const searchable = [coin.region, coin.excavation_site, coin.year, coin.era].filter(Boolean).join(' ');
      return matchers.some((keyword) => searchable.includes(keyword));
    });
    const coinNames = matchedCoins.map((coin) => coin.name).filter(Boolean);
    const translatedCoins = coinNames.map((coinName) => {
      if (appState.lang === 'en') {
        return translateTextValue(coinName);
      }
      return coinName;
    });
    const items = translatedCoins.length
      ? translatedCoins.map((coinName) => `<li>${coinName}</li>`).join('')
      : `<li>${appState.lang === 'en' ? 'No records yet' : '暂无记录'}</li>`;

    detailCard.innerHTML = `
      <div class="map-info-title">${visibleCity}</div>
      <p>${appState.lang === 'en' ? 'The following coins were produced in this city:' : '该城市出产的货币如下：'}</p>
      <ul class="city-coin-list">${items}</ul>
    `;
  }

  function bindCityMapEvents() {
    document.querySelectorAll('.map-city-dot').forEach((dot) => {
      dot.addEventListener('click', () => {
        const city = dot.dataset.city;
        renderCityMapDetail(city);
      });
    });
  }

  // ===== 交互式本体图谱（钱币主题动态可视化） =====
  const ONTO_LAYERS = {
    instance: {
      name: '实例层',
      color: '#c9962e',
      desc: '图谱的核心层，存放一枚具体钱币的实物记录，是其他各层实体关系的汇聚点。'
    },
    abstract: {
      name: '抽象层',
      color: '#8f7bb8',
      desc: '对钱币进行概念化归类的层级，包括币名、类型与版式，用于表达同类钱币的共性与谱系。'
    },
    institution: {
      name: '制度与人物层',
      color: '#4a7ba6',
      desc: '记录铸造与管理钱币的官方机构、铸钱场所以及与之相关的人物，反映货币制度背后的组织力量。'
    },
    chronology: {
      name: '年代归属层',
      color: '#3f9d8b',
      desc: '为钱币提供时间坐标，涵盖朝代、年号与具体年份，用于确定钱币的铸造与流通年代。'
    },
    geography: {
      name: '地域归属层',
      color: '#b06a4a',
      desc: '标注钱币的产地、流通区域与出土地点，用于观察货币的地域分布与区域流通格局。'
    },
    circulation: {
      name: '流通路径层',
      color: '#8a8f98',
      desc: '描述钱币在不同区域之间的流转路线与层级关系，呈现货币的传播与流通网络。'
    },
    physical: {
      name: '物质属性层',
      color: '#7a8f3c',
      desc: '记录钱币的材质、形制、尺寸与重量等物理特征，是判断工艺与辨伪的重要依据。'
    },
    textual: {
      name: '文字属性层',
      color: '#b8546a',
      desc: '涵盖钱币的书体与钱文铭文信息，反映当时的文字风格与书法特征。'
    },
    provenance: {
      name: '溯源层',
      color: '#5f7a4e',
      desc: '记录数据来源、著录出处与图像依据，用于保证每条钱币信息的可追溯性与可信度。'
    }
  };

  const ONTO_NODES = [
    { id: 'coin', name: '钱币', layer: 'instance', size: 'lg', x: 50, y: 45, chars: { top: '錢', right: '實', bottom: '幣', left: '例' }, desc: '中国古代由官方规定并发行、以具体版式记录为实例的货币。' },
    { id: 'coinType', name: '钱币类型', layer: 'abstract', size: 'md', x: 50, y: 13, chars: { top: '型' }, desc: '同名钱币的抽象聚合（如“天禧通宝”），支撑按币名检索自动聚合其下全部版式。' },
    { id: 'era', name: '年号', layer: 'chronology', size: 'md', x: 20, y: 18, chars: { top: '號' }, desc: '中国古代帝王用于纪年的名称，也是部分钱币命名的依据。' },
    { id: 'regime', name: '政权', layer: 'institution', size: 'md', x: 80, y: 18, chars: { top: '朝' }, desc: '中国古代在一定时期和地域内行使统治权并承担钱币发行管理职能的政治组织。' },
    { id: 'mint', name: '铸造机构', layer: 'institution', size: 'md', x: 10.5, y: 46, chars: { top: '監' }, desc: '中国古代承担钱币铸造及相关管理职能的专门组织。' },
    { id: 'person', name: '历史人物', layer: 'institution', size: 'md', x: 89.5, y: 46, chars: { top: '人' }, desc: '中国古代与币制改革、钱币铸造或钱币研究等活动相关的人物。' },
    { id: 'route', name: '流通路线', layer: 'circulation', size: 'sm', x: 10, y: 72, chars: { top: '道' }, desc: '中国古代钱币在流通或贸易活动中经过的地理路径。' },
    { id: 'region', name: '地区', layer: 'geography', size: 'md', x: 27, y: 80, chars: { top: '地' }, desc: '与中国古代钱币铸造或流通活动相关的地理区域。' },
    { id: 'material', name: '材质', layer: 'physical', size: 'sm', x: 44.5, y: 88, chars: { top: '質' }, desc: '钱币制作所使用的主材质：青铜、黄铜、铁、铅、银、金、纸。' },
    { id: 'shape', name: '形制', layer: 'physical', size: 'sm', x: 62, y: 88, chars: { top: '形' }, desc: '中国古代钱币在外形及结构方面形成的基本类型。' },
    { id: 'script', name: '钱文书体', layer: 'textual', size: 'sm', x: 80, y: 80, chars: { top: '書' }, desc: '中国古代钱币表面文字所采用的书法字体类型。' },
    { id: 'sourceRef', name: '文献出处', layer: 'provenance', size: 'sm', x: 91, y: 70, chars: { top: '源' }, desc: '辞典条目号、页码、博物馆藏品编号，保证每条记录可追溯、可核查。' }
  ];

  const ONTO_EDGES = [
    { id: 'isVariantOf', label: '版式归属', meta: '钱币 → 钱币类型', desc: '具体版式记录归属于某一钱币抽象类型', from: 'coin', to: 'coinType', bend: 0 },
    { id: 'namedAfterEra', label: '年号命名', meta: '钱币 → 年号', desc: '钱币名称所依据的年号', from: 'coin', to: 'era', bend: 30 },
    { id: 'issuedBy', label: '发行', meta: '钱币 → 政权', desc: '钱币由某政权发行', from: 'coin', to: 'regime', bend: -30 },
    { id: 'mintedAt', label: '铸造', meta: '钱币 → 铸造机构', desc: '钱币由某机构铸造', from: 'coin', to: 'mint', bend: 26 },
    { id: 'reformedCurrency', label: '币制改革', meta: '历史人物 → 政权 / 钱币', desc: '人物主导某次币制改革', from: 'person', to: 'coin', bend: 40 },
    { id: 'circulatesIn', label: '流通区域', meta: '钱币 → 地区', desc: '钱币流通所及的地区', from: 'coin', to: 'region', bend: -30 },
    { id: 'circulatesAlong', label: '流通路线', meta: '钱币 → 流通路线', desc: '钱币流通所经的路线', from: 'coin', to: 'route', bend: 26 },
    { id: 'madeOf', label: '材质构成', meta: '钱币 → 材质', desc: '钱币制作所使用的主要材质', from: 'coin', to: 'material', bend: 22 },
    { id: 'hasShape', label: '形制分类', meta: '钱币 → 形制', desc: '钱币所属的基本形制', from: 'coin', to: 'shape', bend: -22 },
    { id: 'usesScript', label: '书体使用', meta: '钱币 → 钱文书体', desc: '钱币钱文所使用的书体', from: 'coin', to: 'script', bend: 26 },
    { id: 'sourcedFrom', label: '文献来源', meta: '钱币 → 文献出处', desc: '钱币实体信息来源于具体文献或资料条目', from: 'coin', to: 'sourceRef', bend: -28 },
    { id: 'belongsToRegime', label: '隶属', meta: '铸造机构 → 政权', desc: '铸造机构隶属于某政权', from: 'mint', to: 'regime', bend: -85 },
    { id: 'mintedInRegion', label: '铸造地', meta: '铸造机构 → 地区', desc: '铸造机构所在地区', from: 'mint', to: 'region', bend: 55 },
    { id: 'overseesMint', label: '主持铸钱', meta: '历史人物 → 铸造机构', desc: '人物主持某铸造机构事务', from: 'person', to: 'mint', bend: -170 },
    { id: 'succeededBy', label: '政权更替', meta: '政权 → 政权', desc: '政权更替关系，用于年代排序与时间轴展示', from: 'regime', to: 'regime', self: true }
  ];

  const ONTO_NODE_MAP = {};
  ONTO_NODES.forEach((node) => { ONTO_NODE_MAP[node.id] = node; });
  const ONTO_EDGE_MAP = {};
  ONTO_EDGES.forEach((edge) => { ONTO_EDGE_MAP[edge.id] = edge; });

  const ontoState = {
    fixed: null,
    nodeEls: new Map(),
    edgeEls: new Map(),
    labelEls: new Map(),
    legendEls: new Map()
  };

  function ontoPoint(node) {
    return { x: (node.x / 100) * 1000, y: (node.y / 100) * 700 };
  }

  function ontoEdgeGeometry(edge) {
    const p0 = ontoPoint(ONTO_NODE_MAP[edge.from]);
    const p1 = ontoPoint(ONTO_NODE_MAP[edge.to]);

    if (edge.self) {
      return {
        d: `M ${p0.x - 34} ${p0.y - 26} C ${p0.x - 86} ${p0.y - 106}, ${p0.x + 86} ${p0.y - 106}, ${p0.x + 34} ${p0.y - 26}`,
        label: { x: p0.x, y: p0.y - 96 }
      };
    }

    const dx = p1.x - p0.x;
    const dy = p1.y - p0.y;
    const len = Math.hypot(dx, dy) || 1;
    const bend = edge.bend || 0;
    const cx = (p0.x + p1.x) / 2 + (-dy / len) * bend;
    const cy = (p0.y + p1.y) / 2 + (dx / len) * bend;

    return {
      d: `M ${p0.x} ${p0.y} Q ${cx} ${cy} ${p1.x} ${p1.y}`,
      label: { x: 0.25 * p0.x + 0.5 * cx + 0.25 * p1.x, y: 0.25 * p0.y + 0.5 * cy + 0.25 * p1.y }
    };
  }

  function ontoBuildGraph(graph) {
    const SVG_NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 1000 700');
    svg.setAttribute('class', 'onto-edges');
    svg.innerHTML = `
      <defs>
        <marker id="ontoArrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto">
          <path d="M 0 1 L 9 5 L 0 9 z" fill="#c9a45c"></path>
        </marker>
        <marker id="ontoArrowActive" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7.5" markerHeight="7.5" orient="auto">
          <path d="M 0 1 L 9 5 L 0 9 z" fill="#8a5a1e"></path>
        </marker>
      </defs>
    `;
    graph.appendChild(svg);

    ONTO_EDGES.forEach((edge) => {
      const geo = ontoEdgeGeometry(edge);
      const path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('d', geo.d);
      path.setAttribute('class', `onto-edge${edge.self ? ' onto-edge--loop' : ''}`);
      path.setAttribute('marker-end', 'url(#ontoArrow)');
      path.dataset.edge = edge.id;
      svg.appendChild(path);
      ontoState.edgeEls.set(edge.id, path);

      const label = document.createElement('button');
      label.type = 'button';
      label.className = 'onto-edge-label';
      label.dataset.edge = edge.id;
      label.textContent = translateTextValue(edge.label);
      label.style.left = `${(geo.label.x / 1000) * 100}%`;
      label.style.top = `${(geo.label.y / 700) * 100}%`;
      graph.appendChild(label);
      ontoState.labelEls.set(edge.id, label);
    });

    ONTO_NODES.forEach((node, index) => {
      const el = document.createElement('div');
      el.className = `onto-node${node.y >= 70 ? ' label-top' : ''}`;
      el.dataset.id = node.id;
      el.dataset.size = node.size;
      el.style.left = `${node.x}%`;
      el.style.top = `${node.y}%`;
      el.style.setProperty('--layer-color', ONTO_LAYERS[node.layer].color);
      el.style.setProperty('--d', `${0.05 + index * 0.05}s`);
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.setAttribute('aria-label', `${translateTextValue(node.name)} · ${translateTextValue(ONTO_LAYERS[node.layer].name)}`);

      const wrap = document.createElement('div');
      wrap.className = 'coin-wrap';
      wrap.style.setProperty('--fd', `${(index % 6) * 0.45}s`);

      const coin = document.createElement('div');
      coin.className = `onto-coin onto-coin--${node.size}`;
      const rim = document.createElement('i');
      rim.className = 'coin-rim';
      coin.appendChild(rim);

      ['top', 'right', 'bottom', 'left'].forEach((pos) => {
        const char = node.chars && node.chars[pos];
        if (!char) return;
        const span = document.createElement('span');
        span.className = `coin-char coin-char--${pos}`;
        span.textContent = char;
        coin.appendChild(span);
      });

      const label = document.createElement('div');
      label.className = 'onto-node-label';
      label.textContent = translateTextValue(node.name);

      wrap.appendChild(coin);
      el.appendChild(wrap);
      el.appendChild(label);
      graph.appendChild(el);
      ontoState.nodeEls.set(node.id, el);
    });
  }

  function ontoSelectionSets(selection) {
    const nodeIds = new Set();
    const edgeIds = new Set();
    if (!selection) return { nodeIds, edgeIds };

    if (selection.type === 'node') {
      nodeIds.add(selection.id);
      ONTO_EDGES.forEach((edge) => {
        if (edge.from === selection.id || edge.to === selection.id) edgeIds.add(edge.id);
      });
      edgeIds.forEach((edgeId) => {
        const edge = ONTO_EDGE_MAP[edgeId];
        nodeIds.add(edge.from);
        nodeIds.add(edge.to);
      });
    } else if (selection.type === 'edge') {
      const edge = ONTO_EDGE_MAP[selection.id];
      if (edge) {
        nodeIds.add(edge.from);
        nodeIds.add(edge.to);
        edgeIds.add(edge.id);
      }
    } else if (selection.type === 'layer') {
      ONTO_NODES.forEach((node) => {
        if (node.layer === selection.id) nodeIds.add(node.id);
      });
      ONTO_EDGES.forEach((edge) => {
        if (nodeIds.has(edge.from) && nodeIds.has(edge.to)) edgeIds.add(edge.id);
      });
    }

    return { nodeIds, edgeIds };
  }

  function ontoApplySelection(selection) {
    const graph = document.getElementById('ontologyGraph');
    if (!graph) return;

    const { nodeIds, edgeIds } = ontoSelectionSets(selection);
    graph.classList.toggle('has-selection', Boolean(selection));
    ontoState.nodeEls.forEach((el, id) => el.classList.toggle('active', nodeIds.has(id)));
    ontoState.edgeEls.forEach((el, id) => el.classList.toggle('active', edgeIds.has(id)));
    ontoState.labelEls.forEach((el, id) => el.classList.toggle('active', edgeIds.has(id)));
  }

  function ontoFlipCoin(nodeEl) {
    const coin = nodeEl && nodeEl.querySelector('.onto-coin');
    if (!coin) return;
    coin.classList.remove('is-flipping');
    void coin.offsetWidth;
    coin.classList.add('is-flipping');
    window.setTimeout(() => coin.classList.remove('is-flipping'), 980);
  }

  function ontoRenderDefaultInfo() {
    const panel = document.getElementById('ontologyInfoPanel');
    if (!panel) return;
    panel.innerHTML = appState.lang === 'en'
      ? `
      <p class="ontology-info-default">
        Click any "round coin with a square hole" in the graph to view its description and all relations; click a relation label, relation card, or entity table row to locate that relation in the graph;
        click a legend item to highlight entities by ontology layer. Click a selected element again to deselect it.
      </p>
    `
      : `
      <p class="ontology-info-default">
        点击图中任意一枚“方孔圆钱”查看实体说明及其全部关系；点击关系标签、关系卡片或实体表格行可在图谱中定位对应关系；
        点击图例可按本体层级高亮实体。再次点击已选中的元素可取消选择。
      </p>
    `;
  }

  function ontoRenderNodeInfo(nodeId) {
    const node = ONTO_NODE_MAP[nodeId];
    const panel = document.getElementById('ontologyInfoPanel');
    if (!node || !panel) return;

    const layer = ONTO_LAYERS[node.layer];
    const relEdges = ONTO_EDGES.filter((edge) => edge.from === nodeId || edge.to === nodeId);

    panel.innerHTML = `
      <div class="ontology-info-title">
        <span class="ontology-info-name">${translateTextValue(node.name)}</span>
        <span class="ontology-info-layer" style="background:${layer.color}">${translateTextValue(layer.name)}</span>
      </div>
      <p class="ontology-info-desc">${translateTextValue(node.desc)}</p>
      <ul class="ontology-info-rels">
        ${relEdges.map((edge) => `<li class="ontology-info-rel" data-edge="${edge.id}">${translateTextValue(edge.label)} · ${edge.meta}</li>`).join('')}
      </ul>
    `;

    panel.querySelectorAll('.ontology-info-rel').forEach((chip) => {
      chip.addEventListener('click', () => ontoSelectEdge(chip.dataset.edge, { scroll: false }));
    });
  }

  function ontoRenderEdgeInfo(edgeId) {
    const edge = ONTO_EDGE_MAP[edgeId];
    const panel = document.getElementById('ontologyInfoPanel');
    if (!edge || !panel) return;

    panel.innerHTML = `
      <div class="ontology-info-title">
        <span class="ontology-info-name">${translateTextValue(edge.label)}</span>
        <span class="ontology-info-layer" style="background:#8a5a1e">${edge.meta}</span>
      </div>
      <p class="ontology-info-desc">${translateTextValue(edge.desc)}</p>
      <ul class="ontology-info-rels">
        <li class="ontology-info-rel" data-node="${edge.from}">${appState.lang === 'en' ? 'Domain' : '定义端'}：${translateTextValue(ONTO_NODE_MAP[edge.from].name)}</li>
        <li class="ontology-info-rel" data-node="${edge.to}">${appState.lang === 'en' ? 'Range' : '指向端'}：${translateTextValue(ONTO_NODE_MAP[edge.to].name)}</li>
      </ul>
    `;

    panel.querySelectorAll('.ontology-info-rel').forEach((chip) => {
      chip.addEventListener('click', () => ontoSelectNode(chip.dataset.node, { scroll: false }));
    });
  }

  function ontoSyncRelationCards(edgeId) {
    document.querySelectorAll('.relation-item[data-edge]').forEach((card) => {
      card.classList.toggle('is-selected', card.dataset.edge === edgeId);
    });
  }

  function ontoSyncTableRows(selection) {
    const activeNode = selection && selection.type === 'node' ? selection.id : null;
    document.querySelectorAll('.structure-table tr[data-node]').forEach((row) => {
      row.classList.toggle('is-selected', row.dataset.node === activeNode);
    });
  }

  function ontoSyncLegend(layerId) {
    ontoState.legendEls.forEach((el, id) => el.classList.toggle('is-selected', id === layerId));
  }

  function ontoScrollToGraph() {
    const graph = document.getElementById('ontologyGraph');
    if (graph) graph.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function ontoSelectNode(nodeId, options = {}) {
    const isSame = ontoState.fixed && ontoState.fixed.type === 'node' && ontoState.fixed.id === nodeId;
    ontoState.fixed = isSame ? null : { type: 'node', id: nodeId };
    ontoApplySelection(ontoState.fixed);
    ontoSyncRelationCards(null);
    ontoSyncTableRows(ontoState.fixed);
    ontoSyncLegend(null);

    if (ontoState.fixed) {
      ontoFlipCoin(ontoState.nodeEls.get(nodeId));
      ontoRenderNodeInfo(nodeId);
    } else {
      ontoRenderDefaultInfo();
    }

    if (options.scroll) ontoScrollToGraph();
  }

  function ontoSelectEdge(edgeId, options = {}) {
    ontoState.fixed = { type: 'edge', id: edgeId };
    ontoApplySelection(ontoState.fixed);
    ontoSyncRelationCards(edgeId);
    ontoSyncTableRows(null);
    ontoSyncLegend(null);
    ontoRenderEdgeInfo(edgeId);
    if (options.scroll) ontoScrollToGraph();
  }

  function ontoSelectLayer(layerId) {
    const isSame = ontoState.fixed && ontoState.fixed.type === 'layer' && ontoState.fixed.id === layerId;
    ontoState.fixed = isSame ? null : { type: 'layer', id: layerId };
    ontoApplySelection(ontoState.fixed);
    ontoSyncRelationCards(null);
    ontoSyncTableRows(null);
    ontoSyncLegend(ontoState.fixed && ontoState.fixed.type === 'layer' ? layerId : null);
    ontoRenderDefaultInfo();
  }

  function ontoClearSelection() {
    ontoState.fixed = null;
    ontoApplySelection(null);
    ontoSyncRelationCards(null);
    ontoSyncTableRows(null);
    ontoSyncLegend(null);
    ontoRenderDefaultInfo();
  }

  function ontoBindGraphEvents(graph) {
    ontoState.nodeEls.forEach((el, id) => {
      el.addEventListener('click', (event) => {
        event.stopPropagation();
        ontoSelectNode(id);
      });
      el.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          ontoSelectNode(id);
        }
      });
      el.addEventListener('mouseenter', () => ontoApplySelection({ type: 'node', id }));
      el.addEventListener('mouseleave', () => ontoApplySelection(ontoState.fixed));
    });

    ontoState.labelEls.forEach((el, id) => {
      el.addEventListener('click', (event) => {
        event.stopPropagation();
        ontoSelectEdge(id);
      });
      el.addEventListener('mouseenter', () => ontoApplySelection({ type: 'edge', id }));
      el.addEventListener('mouseleave', () => ontoApplySelection(ontoState.fixed));
    });

    graph.addEventListener('click', () => ontoClearSelection());
  }

  function ontoBindToolbar(graph) {
    const labelToggle = document.getElementById('ontologyLabelToggle');
    const resetBtn = document.getElementById('ontologyResetBtn');

    if (labelToggle) {
      labelToggle.addEventListener('click', () => {
        graph.classList.toggle('labels-hidden');
        const hidden = graph.classList.contains('labels-hidden');
        labelToggle.textContent = hidden ? '显示关系标签' : '隐藏关系标签';
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => ontoClearSelection());
    }
  }

  function ontoBindRelationCards() {
    document.querySelectorAll('.relation-item[data-edge]').forEach((card) => {
      const edgeId = card.dataset.edge;
      card.addEventListener('click', () => ontoSelectEdge(edgeId, { scroll: true }));
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          ontoSelectEdge(edgeId, { scroll: true });
        }
      });
      card.addEventListener('mouseenter', () => ontoApplySelection({ type: 'edge', id: edgeId }));
      card.addEventListener('mouseleave', () => ontoApplySelection(ontoState.fixed));
    });
  }

  function ontoBindTableRows() {
    document.querySelectorAll('.structure-table tr[data-node]').forEach((row) => {
      const nodeId = row.dataset.node;
      row.addEventListener('click', () => ontoSelectNode(nodeId, { scroll: true }));
      row.addEventListener('mouseenter', () => ontoApplySelection({ type: 'node', id: nodeId }));
      row.addEventListener('mouseleave', () => ontoApplySelection(ontoState.fixed));
    });
  }

  function ontoRenderLegend() {
    const legend = document.getElementById('ontologyLegend');
    if (!legend) return;

    Object.keys(ONTO_LAYERS).forEach((key) => {
      const layer = ONTO_LAYERS[key];
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'ontology-legend-item';
      item.dataset.layer = key;
      item.innerHTML = `<i class="ontology-legend-dot" style="background:${layer.color}"></i>${translateTextValue(layer.name)}`;
      item.addEventListener('click', () => ontoSelectLayer(key));
      item.addEventListener('mouseenter', () => ontoShowLayerStatus(key));
      item.addEventListener('mouseleave', () => ontoShowLayerStatus(null));
      item.addEventListener('focus', () => ontoShowLayerStatus(key));
      item.addEventListener('blur', () => ontoShowLayerStatus(null));
      legend.appendChild(item);
      ontoState.legendEls.set(key, item);
    });
  }

  const ONTO_STATUS_DEFAULT = '将鼠标移到上方任一类型标签上，这里会显示该类型的说明。';

  // 英文模式下重建图谱静态文案：图例、工具栏按钮、状态栏、信息面板
  function ontoRefreshStaticText() {
    const legend = document.getElementById('ontologyLegend');
    if (legend) {
      legend.innerHTML = '';
      ontoState.legendEls.clear();
      ontoRenderLegend();
      ontoSyncLegend(ontoState.fixed && ontoState.fixed.type === 'layer' ? ontoState.fixed.id : null);
    }

    const labelToggle = document.getElementById('ontologyLabelToggle');
    if (labelToggle) {
      const hidden = document.getElementById('ontologyGraph')?.classList.contains('labels-hidden');
      labelToggle.textContent = appState.lang === 'en'
        ? (hidden ? 'Show relation labels' : 'Hide relation labels')
        : (hidden ? '显示关系标签' : '隐藏关系标签');
    }

    const resetBtn = document.getElementById('ontologyResetBtn');
    if (resetBtn) resetBtn.textContent = appState.lang === 'en' ? 'Clear selection' : '清除选择';

    const statusTag = document.querySelector('.ontology-statusbar-tag');
    if (statusTag) statusTag.textContent = appState.lang === 'en' ? 'Status' : '状态栏';

    ontoShowLayerStatus(null);

    const fixed = ontoState.fixed;
    if (fixed && fixed.type === 'node') {
      ontoRenderNodeInfo(fixed.id);
    } else if (fixed && fixed.type === 'edge') {
      ontoRenderEdgeInfo(fixed.id);
    } else {
      ontoRenderDefaultInfo();
    }

    document.querySelectorAll('.relation-item[data-edge] .relation-hint').forEach((hint) => {
      hint.textContent = translateTextValue(hint.textContent || '');
    });
  }

  function ontoShowLayerStatus(layerId) {
    const bar = document.getElementById('ontologyStatusBar');
    const text = document.getElementById('ontologyStatusText');
    if (!text) return;
    const layer = layerId ? ONTO_LAYERS[layerId] : null;
    if (bar) {
      bar.classList.toggle('is-live', Boolean(layer));
      if (layer) bar.style.setProperty('--status-color', layer.color);
    }
    if (!layer) {
      text.textContent = ONTO_STATUS_DEFAULT;
      return;
    }
    text.innerHTML = `<strong style="color:${layer.color}">${translateTextValue(layer.name)}</strong>　${translateTextValue(layer.desc)}`;
  }

  function initOntologyGraph() {
    const graph = document.getElementById('ontologyGraph');
    if (!graph) return;

    ontoBuildGraph(graph);
    ontoBindGraphEvents(graph);
    ontoBindToolbar(graph);
    ontoBindRelationCards();
    ontoBindTableRows();
    ontoRenderLegend();
    ontoRenderDefaultInfo();
  }

  async function loadOntologyFromServer() {
    try {
      const response = await fetch('/api/ontology');
      if (response.ok) {
        appState.ontology = await response.json();
      }
    } catch (error) {
      console.warn('加载本体数据失败', error);
    }
  }

  async function initApp() {
    await loadCoinDataFromServer();
    await loadOntologyFromServer();
    await checkAuthStatus();
    populateFilterControls();
    renderCoins();
    renderTimeline();
    updateHomeStats();
    bindCityMapEvents();
    initOntologyGraph();

    const hashTarget = window.location.hash.replace('#', '');
    const hasTargetScreen = [...screens].some((screen) => screen.dataset.screen === hashTarget);
    if (hasTargetScreen) {
      showScreen(hashTarget);
      if (hashTarget === 'timeline') {
        renderTimeline();
      }
    }
  }

  initApp();
});
