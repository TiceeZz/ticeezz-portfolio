/**
 * 航旅纵横 · 宠物出行 — 1:1 Figma 原稿视觉资产 + 全真实交互数据
 */

const UI = (name) => `/images/projects/pet-travel/ui/${name}.webp?v=20261127c`;
const UI_PNG = (name) => `/images/projects/pet-travel/ui/${name}.png?v=20261127c`;

export const HYBRID_ASSETS = {
  iosBarDark: UI_PNG('ios-bar-dark'),
  iosBarLight: UI_PNG('ios-bar-light'),
  splash: UI('00_splash'),
  hubHeader: UI('hub-header'),
  cardSolo: UI('card-solo'),
  cardCabin: UI('card-cabin'),
  soloHeader: UI('solo-header'),
  aiOrb: UI_PNG('ai-orb'),
  swapCircle: UI_PNG('swap-circle'),
  randomHeader: UI('random-header'),
  randomEmptyDog: UI('random-empty-dog'),
  muLogo: UI_PNG('mu-logo'),
  caLogo: UI_PNG('ca-logo'),
  recBadge: UI_PNG('rec-badge'),
  detailBenefits: UI('detail-benefits'),
  successDog: UI('success-dog'),
  emptyDog: UI('empty-dog'),
  umetripCs: UI_PNG('umetrip-cs'),
  petAvatar: UI('pet-avatar'),
  mapFly: UI('map-fly'),
  mapFlyFull: UI('map-fly-full'),
  mapArrived: UI('map-arrived'),
  mapArrivedFull: UI('map-arrived-full'),
  arrivedDog: UI_PNG('arrived-dog'),
  posterHeader: UI('poster-header'),
  posterSkyline: UI('poster-skyline'),
  posterPlane: UI_PNG('poster-plane'),
  posterQr: UI('poster-qr'),
  shareBar: UI('share-bar'),
  planeCaptain: UI('plane-captain'),
};

export const SCENES = [
  {
    id: 'splash',
    step: '00',
    short: '情感开屏',
    title: '宠物上机 · 机长云吞待命',
    tag: '1:1 原稿开屏',
    insight:
      '完整保留 Figma 原稿开屏视觉：官方「航旅纵横」品牌标识、圆角「宠物上机」标题框、字重层次与 3D 云吞机长主视觉。',
    tip: '点击开屏任意位置，进入「宠物出行」服务大厅。',
  },
  {
    id: 'hub',
    step: '01',
    short: '服务大厅',
    title: '宠物出行 · 辅营业务大厅',
    tag: '入口提权 · 可上下滚动',
    insight:
      '原稿薄荷绿云吞头图 + 双服务分流卡片 + 可完整上下滑动的「服务说明」与右侧悬浮「我的订单」。',
    tip: '在手机内上下滑动阅读完整服务说明，点击「宠物单独飞 / 宠物随机飞」或右侧「我的订单」。',
  },
  {
    id: 'random',
    step: '02B',
    short: '随机飞三态',
    title: '宠物随机飞 · 舱位前置与兜底',
    tag: '真实三态机 · Plan B 转化',
    insight:
      '打通机票与宠物有氧舱库存：无票空态引导预订/导入 → 同步行程透出「有氧舱名额充足」 → 名额已满时无缝转「申请托运」。',
    tip: '在手机内直接点「库存查询 / 去预订国内机票 / 申请托运」，或点下方快捷态切换体验。',
  },
  {
    id: 'soloSearch',
    step: '02A',
    short: '单独飞查询',
    title: '宠物单独飞 · 意图感知查询',
    tag: '真实城市切换 · 体重联动',
    insight:
      '原稿 3D 爪印飞机信任横幅 + 真实可交互的单程/往返、城市互换、日期与体重前置选择（将联动后续航空箱智能推荐）。',
    tip: '可点击城市互换、切换预估体重，点击金色「查询方案」或官方「AI预订」进入航线列表。',
  },
  {
    id: 'flights',
    step: '03',
    short: '航线方案',
    title: '航线列表 · 履约导向卡片',
    tag: '真实宽体机/航司筛选',
    insight:
      '原稿点阵地图翡翠绿头栏 + 真实可点的「宽体机 / 东方航空 / 中国国航」筛选器，两端放大交接与提取货运站时刻。',
    tip: '点击顶部筛选标签测试动态筛选，点任意航班「立即购买」进入方案详情。',
  },
  {
    id: 'detail',
    step: '04',
    short: '方案详情',
    title: '方案详情 · 长页自由滑动',
    tag: '原稿 3D 权益图 · 完整滚动',
    insight:
      '完整可滑动长页：1:1 原稿 3D 航空箱环绕权益图 + 逐项透明费用构成 + 红绿禁飞品种与适航提醒 + 底部吸底购买栏。',
    tip: '在手机内上下自由滚动查看完整账单与禁飞限制，点击底部「前往填写订单」。',
  },
  {
    id: 'form',
    step: '05',
    short: '防错表单',
    title: '填写订单 · 全真实交互表单',
    tag: '3大弹窗 · 体重荐箱 · 实时拦截',
    insight:
      '完整可滚动长表单：真实可搜可拦截短鼻禁飞犬的「选择品种」弹窗、年龄适航弹窗、地址弹窗、体重联动自动荐箱、OCR 检疫证预览、增项改价与提交实时拦截。',
    tip: '自由上下滚动！试试选“法斗”触发禁飞拦截、调体重看荐箱变化、补全上门时间与合照解锁绿色提交！',
  },
  {
    id: 'success',
    step: '06',
    short: '状态反馈',
    title: '情感化节点 · 提交成功 & 空订单',
    tag: '3D IP 场景渗透',
    insight:
      '手捧绿勾的云吞机长配合 15 分钟锁舱预期，缓解提交后等待焦虑；空订单态以手持放大镜的云吞弱化空白感。',
    tip: '点击「查看订单详情」进入实时飞行追踪地图。',
  },
  {
    id: 'tracking',
    step: '07',
    short: '实时追踪',
    title: '黑盒可视化 · 实时飞行追踪',
    tag: '原稿高德航线 · 5 节点交互',
    insight:
      '1:1 保留高德实景航线图、云吞机长飞行气泡与官方客服图标；支持点击 5 段节点切换进度、拉起「价格明细」与「全流程追踪」真实抽屉，落地态直出接机海报。',
    tip: '点「明细 ▼」「查看全部 >」拉起真实抽屉，点「可提取」进入落地欢呼态生成接机海报！',
  },
  {
    id: 'poster',
    step: '08',
    short: '平安海报',
    title: '峰终定律 · 专属接机纪念海报',
    tag: '原稿视觉 + 动态宠物数据',
    insight:
      '1:1 原稿「安心宠物托运」中国尊主视觉 + 动态同步你填写的宠物昵称 + 官方带参小程序码与完整分享渠道。',
    tip: '点击微信 / 朋友圈 / QQ / 保存图片体验即时反馈。',
  },
];

export const CITIES = [
  { name: '上海', code: 'SHA', cargoA: '浦东机场货运站', cargoB: '虹桥机场货运站' },
  { name: '北京', code: 'BJS', cargoA: '大兴机场货运站', cargoB: '首都机场货运站' },
  { name: '广州', code: 'CAN', cargoA: '白云机场货运站', cargoB: '白云国际货运中心' },
  { name: '深圳', code: 'SZX', cargoA: '宝安机场货运站', cargoB: '宝安活体专用通道' },
  { name: '成都', code: 'CTU', cargoA: '天府机场货运站', cargoB: '双流机场货运站' },
];

export const WEIGHT_OPTIONS = [
  { id: 'w6', label: '≤ 6kg', sampleWeight: 4.5 },
  { id: 'w15', label: '≤ 15kg', sampleWeight: 9.2 },
  { id: 'w32', label: '≤ 32kg', sampleWeight: 21.5 },
];

export const FLIGHTS = [
  {
    id: 'MU5101',
    airline: '东方航空',
    airlineKey: 'mu',
    code: 'MU5101',
    aircraft: '大型宽体客机 A350',
    isWidebody: true,
    hasRecBadge: true,
    oxygenTag: '独立有氧舱',
    handoffTime: '05:30',
    pickupTime: '12:30',
    takeoffText: '08:30 起飞',
    duration: '飞行约 2.5h',
    fromStationKey: 'cargoA',
    toStationKey: 'cargoA',
    perks: ['提供航空箱', '代办检疫', '专车送宠上门'],
    priceLabel: '预估总价（含航空箱）',
    price: 1280,
    scarcity: '仅剩 2 个宠物席位',
    breakdown: [
      { label: '航司有氧舱位运输费（含基础实重）', price: '¥ 520' },
      { label: 'IATA标准防爆航空箱（赠送）', price: '¥ 180' },
      { label: '两城同城专车接送费（门到门）', price: '¥ 350' },
      { label: '出入境/跨省动检三证代办工本费', price: '¥ 120' },
      { label: '专属管家全流程监护服务费', price: '¥ 110' },
      { label: '宠物航空意外身故与医疗险', price: '免费赠送', highlight: true },
    ],
  },
  {
    id: 'CA1502',
    airline: '中国国航',
    airlineKey: 'ca',
    code: 'CA1502',
    aircraft: '中型客机 B737',
    isWidebody: false,
    hasRecBadge: false,
    oxygenTag: '基础有氧舱',
    handoffTime: '11:30',
    pickupTime: '19:00',
    takeoffText: '14:30 起飞',
    duration: '飞行约 2.5h',
    fromStationKey: 'cargoB',
    toStationKey: 'cargoB',
    perks: ['基础有氧托运', '代办检疫', '落地恒温暂存'],
    priceLabel: '预估总价（需自备航空箱）',
    price: 850,
    scarcity: '',
    breakdown: [
      { label: '航司有氧舱位运输费（含基础实重）', price: '¥ 510' },
      { label: '跨省动检三证代办工本费', price: '¥ 120' },
      { label: '落地恒温暂存与交接服务费', price: '¥ 140' },
      { label: '机场安检通道操作费', price: '¥ 80' },
      { label: '基础航空运输保障', price: '免费赠送', highlight: true },
    ],
  },
];

export const BREED_GROUPS = {
  dog: [
    { name: '拉布拉多', sub: '大型犬 · 常见', banned: false },
    { name: '金毛寻回犬', sub: '大型犬 · 常见', banned: false },
    { name: '柯基犬', sub: '中型犬 · 常见', banned: false },
    { name: '比熊犬', sub: '小型犬 · 常见', banned: false },
    { name: '博美', sub: '小型犬 · 常见', banned: false },
    { name: '泰迪 / 贵宾', sub: '小型犬 · 常见', banned: false },
    { name: '柴犬', sub: '中型犬 · 常见', banned: false },
    { name: '中华田园犬', sub: '中型犬 · 常见', banned: false },
    { name: '法国斗牛犬', sub: '短鼻犬 · 民航禁飞', banned: true, banReason: '短鼻类犬高空易窒息，民航规定严格禁运' },
    { name: '巴哥犬', sub: '短鼻犬 · 民航禁飞', banned: true, banReason: '短鼻类犬高空易呼吸困难，不支持航空托运' },
  ],
  cat: [
    { name: '英国短毛猫', sub: '常见家猫', banned: false },
    { name: '美国短毛猫', sub: '常见家猫', banned: false },
    { name: '布偶猫', sub: '中大型猫 · 常见', banned: false },
    { name: '中华田园猫', sub: '常见家猫', banned: false },
    { name: '加菲猫', sub: '短鼻猫 · 民航禁飞', banned: true, banReason: '扁脸短鼻猫高空易窒息，民航严格禁飞' },
    { name: '波斯猫', sub: '短鼻猫 · 民航禁飞', banned: true, banReason: '短鼻猫属于民航禁运品种，本方案不支持承运' },
  ],
  other: [
    { name: '荷兰垂耳兔', sub: '需提前确认航司笼具要求', banned: false },
    { name: '龙猫', sub: '需使用透气防啃咬专箱', banned: false },
  ],
};

export const AGE_OPTIONS = [
  { label: '1个月', eligible: false, note: '注意：依据航司政策，犬猫年龄须满 8 周，未满月龄幼宠无法办理托运。' },
  { label: '1岁', eligible: true, note: '注意：依据航司政策，犬猫年龄须满 8 周，且不超过 10 岁。当前年龄符合同行要求。' },
  { label: '2岁 6个月', eligible: true, note: '注意：依据航司政策，犬猫年龄须满 8 周，且不超过 10 岁。当前年龄符合同行要求。' },
  { label: '3岁', eligible: true, note: '注意：依据航司政策，犬猫年龄须满 8 周，且不超过 10 岁。当前年龄符合同行要求。' },
  { label: '4岁', eligible: true, note: '注意：依据航司政策，犬猫年龄须满 8 周，且不超过 10 岁。当前年龄符合同行要求。' },
  { label: '6岁', eligible: true, note: '注意：依据航司政策，犬猫年龄须满 8 周，且不超过 10 岁。当前年龄符合同行要求。' },
  { label: '12岁', eligible: false, note: '注意：超龄宠物高空应激风险较高，系统熔断无法办理航空伴飞。' },
];

export const SAVED_ADDRESSES = [
  { id: 'a1', name: '张三', phone: '138****8888', tag: '默认', tagType: 'green', detail: '上海市徐汇区漕河泾科技绿洲 A 栋' },
  { id: 'a2', name: '李四', phone: '139****9999', tag: '公司', tagType: 'blue', detail: '北京市朝阳区望京SOHO塔1' },
  { id: 'a3', name: '阿童', phone: '199****7449', tag: '常用', tagType: 'green', detail: '北京市朝阳区三里屯太古里南区' },
];

export const PICKUP_SLOTS = [
  '5月20日 04:00 – 04:30（专车优先揽收）',
  '5月20日 04:30 – 05:00（推荐时段）',
  '5月20日 05:00 – 05:30（最晚交接前）',
];

export const TRACKING_STAGES = [
  {
    key: 'pickup',
    label: '揽收',
    etaPrefix: '预计交接',
    etaTime: '05:30',
    etaPlace: '上海虹桥货运站',
    summaryTime: '05:30',
    summaryText: '上海虹桥机场宠物寄送柜台已完成取宠，初步健康检查正常，正在前往安检区。',
  },
  {
    key: 'security',
    label: '安检',
    etaPrefix: '预计登机',
    etaTime: '06:45',
    etaPlace: '上海虹桥 (SHA)',
    summaryTime: '06:10',
    summaryText: '安检站完成证件校验与物理扫描，小航在安检期间情绪稳定，未表现出应激反应。',
  },
  {
    key: 'flying',
    label: '飞行中',
    etaPrefix: '预计降落',
    etaTime: '09:35',
    etaPlace: '北京大兴 (PKA)',
    summaryTime: '07:20',
    summaryText: '当前高度 10,600m，平稳飞行中。机组已确认有氧舱运转正常。',
  },
  {
    key: 'landing',
    label: '降落',
    etaPrefix: '即将落地',
    etaTime: '09:38',
    etaPlace: '北京大兴 (PKA)',
    summaryTime: '09:28',
    summaryText: '航班已开始下降并准备着陆北京大兴国际机场，地面活体专用接驳车已就位。',
  },
  {
    key: 'arrived',
    label: '可提取',
    etaPrefix: '航班已抵达',
    etaTime: '09:40',
    etaPlace: '北京大兴 (PKA)',
    summaryTime: '09:40',
    summaryText: '航班已抵达，进入提取流程。',
  },
];

export const FULL_TIMELINE_LOGS = [
  {
    time: '09:40',
    title: '航班已抵达 — 可前往提取',
    desc: '小航已由专车转运至北京大兴 T2 提取处，状态活跃，请凭有效身份证件办理提宠。',
    minStage: 4,
  },
  {
    time: '07:20',
    title: '飞行中 - 状态良好',
    desc: '当前高度 10,600m，平稳飞行中。机组已确认有氧舱运转正常，实时温度 22℃。小航状态平稳，请您放心。',
    minStage: 2,
  },
  {
    time: '06:45',
    title: '登机完成',
    desc: '小航已安置在波音 737-800 货舱专用有氧区，通风设备已开启并完成最后一次飞行前巡检。',
    minStage: 2,
  },
  {
    time: '06:10',
    title: '活体安检通过',
    desc: '安检站完成证件校验与物理扫描，小航在安检期间情绪稳定，未表现出应激反应。',
    minStage: 1,
  },
  {
    time: '05:30',
    title: '订单受理',
    desc: '上海虹桥机场宠物寄送柜台已完成取宠，初步健康检查正常，正在前往安检区。',
    minStage: 0,
  },
];
