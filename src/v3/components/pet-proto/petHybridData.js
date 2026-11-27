/**
 * 航旅纵横 · 宠物出行 — 1:1 Figma 原稿视觉资产 + 全真实交互数据
 */

const UI = (name) => `/images/projects/pet-travel/ui/${name}.webp?v=20261127e`;
const UI_PNG = (name) => `/images/projects/pet-travel/ui/${name}.png?v=20261127e`;

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
  petAvatar: UI_PNG('pet-avatar'),
  mapFly: UI('map-fly'),
  mapFlyFull: UI('map-fly-full'),
  mapArrived: UI('map-arrived'),
  mapArrivedFull: UI('map-arrived-full'),
  arrivedDog: UI_PNG('arrived-dog'),
  posterBgFull: UI('poster-bg-full'),
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
    short: '开屏进入',
    title: '宠物上机 · 品牌开屏',
    tag: '品牌感知',
    insight:
      '用偏柔和的蓝天云层和「机长云吞」形象做第一眼承接，冲淡传统货运托运给人的冷硬感，让用户刚进入就能建立起轻松、放心的心理预期。',
    tip: '点击屏幕任意位置进入「宠物出行」服务大厅。',
  },
  {
    id: 'hub',
    step: '01',
    short: '服务大厅',
    title: '宠物出行 · 服务分流',
    tag: '双业务入口',
    insight:
      '首页只保留「单独飞」与「随机飞」两条清晰路径，把适用场景、截办时间和基础规则直接写在卡片上，帮第一次托运的宠主快速判断该选哪一种。',
    tip: '可以上下滑动查看服务说明，或点击任一服务与右侧「我的订单」。',
  },
  {
    id: 'random',
    step: '02B',
    short: '随机飞预约',
    title: '宠物随机飞 · 舱位与兜底',
    tag: '三态流转',
    insight:
      '随机飞强依赖主人自己的机票行程。未购票时直接引导订票或导入；同步到航班后第一时间透出有氧舱余量；名额已满时不再给死胡同，而是顺手承接到「申请托运」。',
    tip: '点击「库存查询」或在右侧按钮间切换，对比无票、余量充足与名额已满三种状态。',
  },
  {
    id: 'soloSearch',
    step: '02A',
    short: '单独飞查询',
    title: '宠物单独飞 · 条件查询',
    tag: '前置筛选',
    insight:
      '把最影响能否托运的预估体重（含箱）直接放到查询卡片里，同时在底部提前交代独立货运的基本须知，减少选完航班才发现超重或理解偏差的返工。',
    tip: '试着互换起降城市、切换预估体重，再点击「查询方案」查看匹配航线。',
  },
  {
    id: 'flights',
    step: '03',
    short: '航线方案',
    title: '航线选择 · 交接导向卡片',
    tag: '筛选与对比',
    insight:
      '托运场景下用户最在乎的不是航班几点起飞，而是几点把宠物送到货运站、几点能接到。因此把起飞时间弱化居中，两端放大交接与提取时间，并把宽体机筛选项置顶。',
    tip: '点顶部筛选标签切换宽体机或航司，点击「立即购买」进入方案详情。',
  },
  {
    id: 'detail',
    step: '04',
    short: '方案详情',
    title: '方案详情 · 权益与费用透明',
    tag: '价值拆解',
    insight:
      '一站式托运单价偏高，只写一个总价很容易劝退。用图示把代办检疫、航空箱、专车接送和保险拆开呈现，再逐项列出费用明细，并在下单前把禁飞品种与适航要求说清楚。',
    tip: '上下滚动查看完整费用明细与托运限制，点击底部「前往填写订单」。',
  },
  {
    id: 'form',
    step: '05',
    short: '填写订单',
    title: '填写订单 · 规则前置与防错',
    tag: '校验与联动',
    insight:
      '把长篇托运规定拆进具体表单项里：选到法斗等短鼻犬直接提示禁飞；调整体重自动匹配对应航空箱；检疫证用 OCR 识别替代手动输入，并在底部明确指出还缺哪几项。',
    tip: '试着选「法斗」看禁飞拦截、调体重看箱型联动，或补全上门时间与合照解锁提交。',
  },
  {
    id: 'success',
    step: '06',
    short: '状态反馈',
    title: '提交成功与空订单态',
    tag: '状态承接',
    insight:
      '提交后明确告知预计 15 分钟内锁舱，缓解下单后的等待焦虑；订单列表为空时用轻量的插画与留白承接，避免生硬的空白页。',
    tip: '点击「查看订单详情」进入实时追踪，或切到右侧查看空订单页。',
  },
  {
    id: 'tracking',
    step: '07',
    short: '实时追踪',
    title: '飞行中与落地实时追踪',
    tag: '进度透明',
    insight:
      '宠物离开视线后的几小时最让人焦虑。用实时地图配合 5 段状态节点，把揽收、安检、巡航高度、舱温与提宠指引一步步摊开，落地后直接衔接接机海报入口。',
    tip: '点击进度条任意节点切换阶段，也可点「明细」「查看全部」或切到「可提取」查看落地态。',
  },
  {
    id: 'poster',
    step: '08',
    short: '接机海报',
    title: '平安落地 · 专属接机海报',
    tag: '分享留念',
    insight:
      '在宠物平安抵达这个最放松的时刻，自动把宠物昵称、飞行里程和起降时间生成一张票据式纪念卡片，顺手给亲友报平安，也让服务体验自然延展到社交分享。',
    tip: '海报会同步你在表单中填写的宠物昵称与目的地，点击下方分享渠道可预览反馈。',
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
    duration: '飞行约2.5h',
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
    duration: '飞行约2.5h',
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
    { name: '金毛寻回犬', sub: '大型犬 · 常见', aliases: ['金毛'], banned: false },
    { name: '柯基犬', sub: '中型犬 · 常见', aliases: ['柯基'], banned: false },
    { name: '比熊犬', sub: '小型犬 · 常见', aliases: ['比熊'], banned: false },
    { name: '博美', sub: '小型犬 · 常见', banned: false },
    { name: '泰迪 / 贵宾', sub: '小型犬 · 常见', aliases: ['泰迪犬', '贵宾犬'], banned: false },
    { name: '柴犬', sub: '中型犬 · 常见', banned: false },
    { name: '中华田园犬', sub: '中型犬 · 常见', aliases: ['土狗', '田园犬'], banned: false },
    { name: '法国斗牛犬', sub: '法斗 · 短鼻犬 · 民航禁飞', aliases: ['法斗'], banned: true, banReason: '短鼻类犬高空易窒息，民航规定严格禁运' },
    { name: '巴哥犬', sub: '短鼻犬 · 民航禁飞', aliases: ['巴哥', '八哥'], banned: true, banReason: '短鼻类犬高空易呼吸困难，不支持航空托运' },
  ],
  cat: [
    { name: '英国短毛猫', sub: '常见家猫', aliases: ['英短'], banned: false },
    { name: '美国短毛猫', sub: '常见家猫', aliases: ['美短'], banned: false },
    { name: '布偶猫', sub: '中大型猫 · 常见', aliases: ['布偶'], banned: false },
    { name: '中华田园猫', sub: '常见家猫', aliases: ['田园猫'], banned: false },
    { name: '加菲猫', sub: '短鼻猫 · 民航禁飞', aliases: ['加菲', '异国短毛猫'], banned: true, banReason: '扁脸短鼻猫高空易窒息，民航严格禁飞' },
    { name: '波斯猫', sub: '短鼻猫 · 民航禁飞', aliases: ['波斯'], banned: true, banReason: '短鼻猫属于民航禁运品种，本方案不支持承运' },
  ],
  other: [
    { name: '荷兰垂耳兔', sub: '需提前确认航司笼具要求', aliases: ['垂耳兔', '兔子'], banned: false },
    { name: '龙猫', sub: '需使用透气防啃咬专箱', banned: false },
  ],
};

export const PET_AGE_YEARS = Array.from({ length: 16 }, (_, i) => i);
export const PET_AGE_MONTHS = Array.from({ length: 12 }, (_, i) => i);

export function evaluatePetAge(rawYears, rawMonths) {
  const years = Math.max(0, Math.min(15, Math.floor(Number(rawYears) || 0)));
  let months = Math.max(0, Math.min(11, Math.floor(Number(rawMonths) || 0)));
  if (years === 0 && months === 0) months = 1;
  const totalMonths = years * 12 + months;
  const label = years === 0 ? `${months}个月` : months === 0 ? `${years}岁` : `${years}岁 ${months}个月`;

  if (totalMonths < 2) {
    return {
      years,
      months,
      totalMonths,
      label,
      eligible: false,
      status: 'blocked',
      title: '未满适航月龄（须满 8 周）',
      note: '依据航司活体运输政策，犬猫年龄须满 8 周（约 2 个月）且完成基础免疫后方可申请航空托运。',
    };
  }
  if (totalMonths < 6) {
    return {
      years,
      months,
      totalMonths,
      label,
      eligible: true,
      status: 'caution',
      title: '符合适航月龄 · 幼宠疫苗提醒',
      note: '已满 8 周龄可申请办理；请确认已完成狂犬疫苗接种满 21 天并随行携带有效免疫证明。',
    };
  }
  if (totalMonths <= 120) {
    return {
      years,
      months,
      totalMonths,
      label,
      eligible: true,
      status: 'ok',
      title: '年龄符合航空适航要求',
      note: '依据航司政策，犬猫年龄须在 8 周至 10 周岁之间。当前年龄处于适航区间，可直接办理。',
    };
  }
  return {
    years,
    months,
    totalMonths,
    label,
    eligible: false,
    status: 'blocked',
    title: '超出航空适航年龄限制（> 10周岁）',
    note: '超过 10 周岁的高龄犬猫高空应激与心肺风险较高，系统已自动熔断拦截，暂不支持航空托运。',
  };
}

export const DEFAULT_PET_AGE = evaluatePetAge(2, 6);

export const AGE_OPTIONS = [
  evaluatePetAge(0, 1),
  evaluatePetAge(0, 4),
  evaluatePetAge(1, 0),
  DEFAULT_PET_AGE,
  evaluatePetAge(4, 0),
  evaluatePetAge(8, 0),
  evaluatePetAge(11, 0),
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
