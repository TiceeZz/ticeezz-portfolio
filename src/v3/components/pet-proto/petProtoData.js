/**
 * 航旅纵横 · 宠物出行 1:1 高保真交互原型数据
 * 忠实还原 Figma 原稿中的业务规则、航班方案、品种校验与实时追踪节点
 */

export const PROTO_ASSETS = {
  splashHero: '/images/projects/pet-travel/proto/splash-hero.webp',
  cardSolo: '/images/projects/pet-travel/proto/card-solo.webp',
  cardCabin: '/images/projects/pet-travel/proto/card-cabin.webp',
  hubMascot: '/images/projects/pet-travel/proto/hub-waving.webp',
  soloBanner: '/images/projects/pet-travel/proto/solo-banner.webp',
  posterHeader: '/images/projects/pet-travel/proto/poster-header.webp',
  crate3d: '/images/projects/pet-travel/proto/crate-3d.webp',
  randomEmpty: '/images/projects/pet-travel/proto/random-empty.webp',
  randomMascot: '/images/projects/pet-travel/proto/random-mascot.webp',
  statusSuccess: '/images/projects/pet-travel/proto/status-success.webp',
  statusEmpty: '/images/projects/pet-travel/proto/status-empty.webp',
  planeCaptain: '/images/projects/pet-travel/proto/plane-captain.webp',
  petAvatar: '/images/projects/pet-travel/proto/pet-avatar.webp',
  arrivedCaptain: '/images/projects/pet-travel/proto/arrived-captain.webp',
};

export const SCENES = [
  {
    id: 'splash',
    step: '00',
    short: '情感开屏',
    title: '宠物上机 · 机长云吞待命',
    tag: '情感化破冰',
    insight:
      '宠物托运属于高焦虑、强信任门槛场景。用原创 3D IP「云吞机长」替代冷冰冰的工具开屏，在流程起点建立陪伴与安全感。',
    tip: '点击画面中的「进入宠物出行」按钮，或直接从右侧切换任意页面。',
  },
  {
    id: 'hub',
    step: '01',
    short: '服务大厅',
    title: '宠物出行 · 辅营业务大厅',
    tag: '入口提权 · 视觉降噪',
    insight:
      '将宠物出行从深层菜单提权至服务大厅，并复用航旅主站卡片规范 + 低饱和「生命绿」主色，清晰区分「单独飞」与「随机飞」两条核心路径。',
    tip: '可体验两条核心分支：「宠物单独飞」完整订购，或「宠物随机飞」三态舱位联动，也可点右侧悬浮「我的订单」。',
  },
  {
    id: 'random',
    step: '02B',
    short: '随机飞三态',
    title: '宠物随机飞 · 舱位前置与兜底',
    tag: '状态机 · Plan B 转化',
    insight:
      '解决“先买机票再发现没宠物名额”的客诉痛点：无票时引导导入行程，有票时前置透出「有氧舱名额充足」，名额已满时无缝转入「申请单独托运」避免死胡同。',
    tip: '在下方快捷控制器或手机内点击切换：无票空态 → 名额充足 → 名额已满兜底。',
  },
  {
    id: 'soloSearch',
    step: '02A',
    short: '单独飞查询',
    title: '宠物单独飞 · 意图感知查询',
    tag: '限制前置 · 降低门槛',
    insight:
      '在查询页即前置暴露核心硬约束（如宠物含箱预估重量 ≤15kg）与首单意外险保障，避免新手反复折返试错。',
    tip: '可切换出发/到达城市、点击中间切换按钮互换航线、调整预估体重（将联动后续航空箱推荐）。',
  },
  {
    id: 'flights',
    step: '03',
    short: '航线方案',
    title: '航线列表 · 履约导向卡片',
    tag: '重构时间轴 · 宽体机筛选',
    insight:
      '传统机票突出起降时间，而宠物托运的核心决策是“交接/提取时间”与“机型安全性”。卡片将两端放大为交接与提取货运站，并置顶「宽体机」快捷筛选。',
    tip: '试试顶部的「宽体机」「东方航空」「中国国航」筛选标签，选择任意航班进入方案详情。',
  },
  {
    id: 'detail',
    step: '04',
    short: '方案详情',
    title: '方案详情 · 价值具象与风险前置',
    tag: '账单透明 · 禁飞强提醒',
    insight:
      '客单价 ¥1280 易引发价格阻力，通过 3D 航空箱环绕权益图 + 逐项费用构成明细降低敏感度；同时在提交前以红绿双色强提醒禁飞短鼻品种与健康状态。',
    tip: '上下滚动查看完整费用构成与托运限制，点击底部「前往填写订单」体验核心防错表单。',
  },
  {
    id: 'form',
    step: '05',
    short: '防错表单',
    title: '填写订单 · 选择代替输入 & 防错',
    tag: '3大弹窗 · OCR · 智能荐箱',
    insight:
      '核心减负页：用二元直选与品种/年龄/地址三大半屏弹窗替代手动输入；依据体重自动推荐合规航空箱；OCR 自动提取检疫证；未完善必填项前实时拦截并精确定位缺漏。',
    tip: '试试点「品种」选短鼻犬触发禁飞拦截、调体重看航空箱推荐变化、补全上门时间与合照解锁绿色提交按钮！',
  },
  {
    id: 'success',
    step: '06',
    short: '提交成功',
    title: '状态反馈 · 云吞机长安心确认',
    tag: '情感节点渗透',
    insight:
      '在等待锁定舱位的焦虑间隙，通过云吞机长手捧绿勾的 3D 视觉配合明确预期（预计 15 分钟锁定舱位），给予即时正向安抚。',
    tip: '点击「查看订单详情」进入黑盒可视化实时追踪地图。',
  },
  {
    id: 'tracking',
    step: '07',
    short: '实时追踪',
    title: '黑盒可视化 · 实时飞行追踪',
    tag: '空间地图 + 微观时间轴',
    insight:
      '击破活体运输“黑盒恐慌”：全屏动态航线地图 + 云吞机长实时飞行坐标 + 舱内温度高度透传，底部以醒目绿字前置提示接机人带证件至 T2 提取处。',
    tip: '点击进度条上「揽收 / 安检 / 飞行中 / 降落 / 可提取」切换阶段，点「查看全部」看时间轴、点「明细」看账单！',
  },
  {
    id: 'poster',
    step: '08',
    short: '平安海报',
    title: '峰终定律 · 专属接机纪念海报',
    tag: '情绪高点 · 社交裂变',
    insight:
      '宠物平安落地是全链路情绪峰值（Peak Moment）。在「已到达」态生成专属接机纪念卡（1760 公里 · 2h40m），将私密平安通知自然转化为社交口碑资产。',
    tip: '点击底部分享渠道或「保存图片」体验即时反馈。',
  },
];

export const CITIES = [
  { name: '上海', code: 'SHA', cargoA: '浦东机场货运站', cargoB: '虹桥机场货运站', pax: '虹桥国际机场 T2' },
  { name: '北京', code: 'BJS', cargoA: '大兴机场货运站', cargoB: '首都机场货运站', pax: '大兴国际机场' },
  { name: '广州', code: 'CAN', cargoA: '白云机场货运站', cargoB: '白云国际货运中心', pax: '白云国际机场 T2' },
  { name: '深圳', code: 'SZX', cargoA: '宝安机场货运站', cargoB: '宝安活体专用通道', pax: '宝安国际机场 T3' },
  { name: '成都', code: 'CTU', cargoA: '天府机场货运站', cargoB: '双流机场货运站', pax: '天府国际机场 T1' },
];

export const WEIGHT_OPTIONS = [
  { id: 'w6', label: '≤ 6kg', sampleWeight: 4.5, crate: 1, desc: '小型猫犬（含箱）' },
  { id: 'w15', label: '≤ 15kg', sampleWeight: 9.2, crate: 2, desc: '中小型宠（含箱）' },
  { id: 'w32', label: '≤ 32kg', sampleWeight: 21.5, crate: 3, desc: '中大型犬（含箱）' },
];

export const FLIGHTS = [
  {
    id: 'MU5101',
    airline: '东方航空',
    airlineKey: 'mu',
    code: 'MU5101',
    aircraft: '大型宽体客机 A350',
    isWidebody: true,
    recommended: true,
    badge: '官方推荐 · 全包无忧',
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
    scarcity: '仅剩 2 个宠物舱位',
    breakdown: [
      { label: '航司有氧舱位运输费（含基础实重）', price: '¥ 520' },
      { label: 'IATA 标准防爆航空箱（赠送）', price: '¥ 180' },
      { label: '两城同城专车接送费（门到门）', price: '¥ 350' },
      { label: '跨省动检三证代办工本费', price: '¥ 120' },
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
    recommended: false,
    badge: '',
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
  {
    id: 'CZ3524',
    airline: '南方航空',
    airlineKey: 'cz',
    code: 'CZ3524',
    aircraft: '大型宽体客机 B787',
    isWidebody: true,
    recommended: false,
    badge: '宽体恒温',
    oxygenTag: '独立有氧舱',
    handoffTime: '09:10',
    pickupTime: '16:15',
    takeoffText: '12:00 起飞',
    duration: '飞行约 2.5h',
    fromStationKey: 'cargoA',
    toStationKey: 'cargoA',
    perks: ['提供航空箱', '代办检疫', '实时舱温监测'],
    priceLabel: '预估总价（含航空箱）',
    price: 1160,
    scarcity: '仅剩 3 个宠物舱位',
    breakdown: [
      { label: '航司有氧舱位运输费（含基础实重）', price: '¥ 540' },
      { label: 'IATA 标准防爆航空箱（赠送）', price: '¥ 180' },
      { label: '同城专车送机服务费', price: '¥ 220' },
      { label: '跨省动检三证代办工本费', price: '¥ 120' },
      { label: '舱温监测与专人巡检费', price: '¥ 100' },
      { label: '宠物航空意外险', price: '免费赠送', highlight: true },
    ],
  },
];

export const BREED_GROUPS = {
  dog: [
    { name: '柯基犬', sub: '中型犬 · 常见', banned: false },
    { name: '拉布拉多', sub: '大型犬 · 常见', banned: false },
    { name: '金毛寻回犬', sub: '大型犬 · 常见', banned: false },
    { name: '比熊犬', sub: '小型犬 · 常见', banned: false },
    { name: '博美', sub: '小型犬 · 常见', banned: false },
    { name: '泰迪 / 贵宾', sub: '小型犬 · 常见', banned: false },
    { name: '柴犬', sub: '中型犬 · 常见', banned: false },
    { name: '中华田园犬', sub: '中型犬 · 常见', banned: false },
    { name: '法国斗牛犬', sub: '短鼻犬 · 民航禁飞', banned: true, banReason: '短鼻犬高空易呼吸困难，民航规定严格禁飞' },
    { name: '巴哥犬', sub: '短鼻犬 · 民航禁飞', banned: true, banReason: '短鼻犬属于民航禁运品种，本方案不支持承运' },
  ],
  cat: [
    { name: '英国短毛猫', sub: '常见家猫', banned: false },
    { name: '美国短毛猫', sub: '常见家猫', banned: false },
    { name: '布偶猫', sub: '中大型猫 · 常见', banned: false },
    { name: '中华田园猫', sub: '常见家猫', banned: false },
    { name: '加菲猫（异国短毛）', sub: '短鼻猫 · 民航禁飞', banned: true, banReason: '扁脸短鼻猫高空易窒息，民航严格限制承运' },
    { name: '波斯猫', sub: '短鼻猫 · 民航禁飞', banned: true, banReason: '短鼻品种高空风险较高，不支持航空有氧舱托运' },
  ],
  other: [
    { name: '荷兰垂耳兔', sub: '需提前确认航司笼具规范', banned: false },
    { name: '龙猫', sub: '需使用透气防啃咬专箱', banned: false },
  ],
};

export const AGE_OPTIONS = [
  { label: '1个月', eligible: false, note: '未满 8 周龄幼宠免疫尚未完善，无法办理航空托运。' },
  { label: '6个月', eligible: true, note: '年龄符合客舱及有氧舱同行要求（8周–10周岁内）。' },
  { label: '1岁', eligible: true, note: '年龄符合客舱及有氧舱同行要求（8周–10周岁内）。' },
  { label: '2岁 6个月', eligible: true, note: '年龄符合客舱及有氧舱同行要求（8周–10周岁内）。' },
  { label: '3岁', eligible: true, note: '年龄符合客舱及有氧舱同行要求（8周–10周岁内）。' },
  { label: '4岁', eligible: true, note: '年龄符合客舱及有氧舱同行要求（8周–10周岁内）。' },
  { label: '6岁', eligible: true, note: '年龄符合客舱及有氧舱同行要求（8周–10周岁内）。' },
  { label: '8岁', eligible: true, note: '建议出发前 7 天内完成心肺体检以确保适航。' },
  { label: '11岁', eligible: false, note: '超过 10 周岁高龄宠物高空应激风险较高，建议改用陆运专车。' },
];

export const SAVED_ADDRESSES = [
  {
    id: 'addr1',
    name: '阿童',
    phone: '199****7449',
    tag: '默认',
    city: '上海',
    detail: '上海市徐汇区漕河泾开发区科技绿洲 A 座',
  },
  {
    id: 'addr2',
    name: '李四',
    phone: '139****9999',
    tag: '北京',
    city: '北京',
    detail: '北京市朝阳区望京 SOHO T1',
  },
  {
    id: 'addr3',
    name: '张三',
    phone: '138****6688',
    tag: '常用',
    city: '北京',
    detail: '北京市朝阳区三里屯太古里南区 6 号楼',
  },
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
    headerTitle: '揽收中',
    etaPrefix: '预计交接',
    etaTime: '05:30',
    etaPlace: '上海虹桥货运站',
    etaPill: '专车前往机场 · 约 25m',
    progress: 0.08,
    summaryTime: '05:30',
    summaryText: '上海虹桥机场宠物寄送柜台已完成取宠，初步健康检查正常，正在前往安检区。',
  },
  {
    key: 'security',
    label: '安检',
    headerTitle: '安检中',
    etaPrefix: '预计登机',
    etaTime: '06:45',
    etaPlace: '上海虹桥 (SHA)',
    etaPill: '活体安检通过 · 准备登机',
    progress: 0.22,
    summaryTime: '06:10',
    summaryText: '安检站完成证件校验与物理扫描，小航在安检期间情绪稳定，未表现出应激反应。',
  },
  {
    key: 'flying',
    label: '飞行中',
    headerTitle: '运输中',
    etaPrefix: '预计降落',
    etaTime: '09:35',
    etaPlace: '北京大兴 (PKX)',
    etaPill: '距到达约 1h 20m',
    progress: 0.56,
    summaryTime: '07:20',
    summaryText: '当前高度 10,600m，平稳飞行中。机组已确认有氧舱运转正常，实时温度 22℃。',
  },
  {
    key: 'landing',
    label: '降落',
    headerTitle: '降落中',
    etaPrefix: '即将落地',
    etaTime: '09:38',
    etaPlace: '北京大兴 (PKX)',
    etaPill: '正在下降高度 · 约 8m',
    progress: 0.86,
    summaryTime: '09:28',
    summaryText: '航班已开始下降并准备着陆北京大兴国际机场，地面活体专用接驳车已就位。',
  },
  {
    key: 'arrived',
    label: '可提取',
    headerTitle: '已到达',
    etaPrefix: '航班已抵达',
    etaTime: '09:40',
    etaPlace: '北京大兴 (PKX)',
    etaPill: '已平安抵达北京大兴',
    progress: 1.0,
    summaryTime: '09:40',
    summaryText: '航班已抵达并转运至 T2 恒温提取区，状态良好，请凭有效身份证件办理提宠。',
  },
];

export const FULL_TIMELINE_LOGS = [
  {
    time: '09:40',
    title: '航班已抵达 · 可前往提取',
    desc: '小航已由专车转运至北京大兴 T2 活体提取处，实时温湿度 23℃ / 50%，状态活跃。',
    minStage: 4,
  },
  {
    time: '07:20',
    title: '飞行中 — 状态良好',
    desc: '当前高度 10,600m，平稳飞行中。机组已确认有氧舱运转正常，实时温度 22℃，小航状态平稳，请您放心。',
    minStage: 2,
  },
  {
    time: '06:45',
    title: '登机完成',
    desc: '小航已安置在宽体客机货舱专用有氧区，通风设备已开启并完成最后一次飞行前巡检。',
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
