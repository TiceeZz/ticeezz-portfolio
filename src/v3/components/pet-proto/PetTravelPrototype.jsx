import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  HYBRID_ASSETS,
  SCENES,
  CITIES,
  WEIGHT_OPTIONS,
  FLIGHTS,
  BREED_GROUPS,
  AGE_OPTIONS,
  SAVED_ADDRESSES,
  PICKUP_SLOTS,
  TRACKING_STAGES,
  FULL_TIMELINE_LOGS,
} from './petHybridData';
import './petTravelProto.css';

/* Minimal clean inline SVG chevrons & icons where real UI needs crisp vector strokes */
const BackSvg = ({ color = '#1c2c24' }) => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
    <path d="M12.5 4.5L7 10L12.5 15.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RightSvg = ({ color = '#9aa8a0' }) => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <path d="M6 3.5L10.5 8L6 12.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ClockSvg = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="8" cy="8" r="6" stroke="#8b9a92" strokeWidth="1.3" />
    <path d="M8 4.8V8.2L10.2 9.5" stroke="#8b9a92" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const StatusBar = ({ light = false, bg }) => (
  <div className={`ptp-statusbar${light ? ' is-light' : ''}`} style={bg ? { background: bg } : undefined}>
    <span>9:41</span>
    <div className="ptp-island" />
    <span className="ptp-status-icons" aria-hidden="true">
      <svg width="15" height="10" viewBox="0 0 15 10" fill="currentColor">
        <rect x="0" y="6" width="2.4" height="4" rx="0.8" />
        <rect x="4" y="4" width="2.4" height="6" rx="0.8" />
        <rect x="8" y="2" width="2.4" height="8" rx="0.8" />
        <rect x="12" y="0" width="2.4" height="10" rx="0.8" />
      </svg>
      <svg width="21" height="10" viewBox="0 0 21 10" fill="none">
        <rect x="0.7" y="0.7" width="17.2" height="8.6" rx="2.2" stroke="currentColor" strokeWidth="1.2" />
        <rect x="2.3" y="2.3" width="13.8" height="5.4" rx="1" fill="currentColor" />
        <path d="M19.4 3.4V6.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </span>
  </div>
);

export default function PetTravelPrototype() {
  const [screen, setScreen] = useState('splash');
  const [history, setHistory] = useState([]);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  // Random Flight 3-state machine
  const [randomState, setRandomState] = useState('available'); // 'empty' | 'available' | 'full'

  // Solo Search & Flights
  const [tripType, setTripType] = useState('oneway');
  const [fromIdx, setFromIdx] = useState(0);
  const [toIdx, setToIdx] = useState(1);
  const [dateStr, setDateStr] = useState('5月20日 明天');
  const [weightKey, setWeightKey] = useState('w15');
  const [flightFilter, setFlightFilter] = useState('all'); // 'all' | 'wide' | 'mu' | 'ca'
  const [selectedFlightId, setSelectedFlightId] = useState('MU5101');

  // Real Interactive Order Form
  const [breed, setBreed] = useState('柯基犬');
  const [petName, setPetName] = useState('小航');
  const [gender, setGender] = useState('雄性');
  const [neutered, setNeutered] = useState('已绝育');
  const [weightKg, setWeightKg] = useState(9.2);
  const [ageObj, setAgeObj] = useState(AGE_OPTIONS[2]); // 2岁 6个月
  const [senderAddr, setSenderAddr] = useState(SAVED_ADDRESSES[0]);
  const [receiverAddr, setReceiverAddr] = useState(SAVED_ADDRESSES[1]);
  const [pickupSlot, setPickupSlot] = useState('');
  const [contactName, setContactName] = useState('阿童');
  const [contactPhone, setContactPhone] = useState('19974677449');
  const [crateOverride, setCrateOverride] = useState(null);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [vaccineUploaded, setVaccineUploaded] = useState(true);
  const [addonInsurance, setAddonInsurance] = useState(true);
  const [addonValuation, setAddonValuation] = useState(false);
  const [orderNote, setOrderNote] = useState('');
  const [agreed, setAgreed] = useState(true);

  // Tracking & Modals
  const [trackStageIdx, setTrackStageIdx] = useState(2); // 0..4
  const [modal, setModal] = useState(null);
  const [breedTab, setBreedTab] = useState('dog');
  const [breedSearch, setBreedSearch] = useState('');
  const [breedAlert, setBreedAlert] = useState(null);

  const showToast = useCallback((msg) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  }, []);

  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  const navigate = useCallback((next) => {
    if (next === 'poster') {
      setTrackStageIdx(4);
      setScreen('tracking');
      setModal('poster');
      return;
    }
    setModal(null);
    setHistory((prev) => [...prev.slice(-8), screen]);
    setScreen(next);
  }, [screen]);

  const goBack = useCallback(() => {
    setModal(null);
    setHistory((prev) => {
      if (!prev.length) { setScreen('hub'); return []; }
      const last = prev[prev.length - 1];
      setScreen(last);
      return prev.slice(0, -1);
    });
  }, []);

  const fromCity = CITIES[fromIdx];
  const toCity = CITIES[toIdx];
  const selectedFlight = useMemo(() => FLIGHTS.find((f) => f.id === selectedFlightId) || FLIGHTS[0], [selectedFlightId]);

  const filteredFlights = useMemo(() => {
    if (flightFilter === 'wide') return FLIGHTS.filter((f) => f.isWidebody);
    if (flightFilter === 'mu') return FLIGHTS.filter((f) => f.airlineKey === 'mu');
    if (flightFilter === 'ca') return FLIGHTS.filter((f) => f.airlineKey === 'ca');
    return FLIGHTS;
  }, [flightFilter]);

  const recommendedCrate = useMemo(() => (weightKg <= 6 ? 1 : weightKg <= 15 ? 2 : 3), [weightKg]);
  const activeCrate = crateOverride || recommendedCrate;

  const formMissing = useMemo(() => {
    const m = [];
    if (!petName.trim()) m.push('宠物昵称');
    if (!ageObj.eligible) m.push('适航年龄');
    if (!pickupSlot) m.push('上门揽收时间');
    if (!contactName.trim() || contactPhone.trim().length < 7) m.push('提宠联系人');
    if (!photoUploaded) m.push('宠物与箱合照');
    if (!agreed) m.push('活体免责声明');
    return m;
  }, [petName, ageObj, pickupSlot, contactName, contactPhone, photoUploaded, agreed]);

  const totalPrice = selectedFlight.price + (addonInsurance ? 19 : 0) + (addonValuation ? 40 : 0);

  const activeSceneId = modal === 'poster' ? 'poster' : screen === 'orders' ? 'success' : screen;
  const activeScene = useMemo(() => SCENES.find((s) => s.id === activeSceneId) || SCENES[0], [activeSceneId]);
  const trackStage = TRACKING_STAGES[trackStageIdx];

  const visibleBreeds = useMemo(() => {
    const q = breedSearch.trim();
    const pool = q ? [...BREED_GROUPS.dog, ...BREED_GROUPS.cat, ...BREED_GROUPS.other] : BREED_GROUPS[breedTab] || [];
    return q ? pool.filter((b) => b.name.includes(q) || b.sub.includes(q)) : pool;
  }, [breedTab, breedSearch]);

  const handleAutoFill = () => {
    setPetName('小航');
    setBreed('柯基犬');
    setAgeObj(AGE_OPTIONS[2]);
    setPickupSlot(PICKUP_SLOTS[1]);
    setPhotoUploaded(true);
    setVaccineUploaded(true);
    setContactName('阿童');
    setContactPhone('19974677449');
    setAgreed(true);
    showToast('已补全全部必填项，提交订单按钮已解锁');
  };

  const handleReset = () => {
    setScreen('splash');
    setHistory([]);
    setModal(null);
    setRandomState('available');
    setFromIdx(0);
    setToIdx(1);
    setWeightKey('w15');
    setWeightKg(9.2);
    setPickupSlot('');
    setPhotoUploaded(false);
    setCrateOverride(null);
    setTrackStageIdx(2);
    showToast('已重置交互原型');
  };

  return (
    <div className="ptp-stage">
      {/* ════════════ LEFT: 1:1 HYBRID REAL-INTERACTION IPHONE ════════════ */}
      <div className="ptp-phone-col">
        <div className="ptp-chassis" role="region" aria-label="航旅纵横宠物出行 1:1 可交互原型">
          <div className="ptp-screen">
            {toast && <div className="ptp-toast">{toast}</div>}

            {/* ══ 00: 1:1 UNTOUCHED FIGMA SPLASH ══ */}
            {screen === 'splash' && (
              <div
                key="splash"
                className="ptp-splash-full"
                onClick={() => navigate('hub')}
                role="button"
                tabIndex={0}
                aria-label="点击进入宠物出行"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate('hub'); }}
              >
                <img src={HYBRID_ASSETS.splash} alt="宠物上机 机长云吞正在待命 航旅纵横" />
              </div>
            )}

            {/* ══ 01: SERVICE HUB (1:1 Figma Header + Real Scroll & Buttons) ══ */}
            {screen === 'hub' && (
              <div key="hub" className="ptp-view" style={{ background: '#f2f5f4' }}>
                <div className="ptp-scroll">
                  <div className="ptp-figma-hdr">
                    <img src={HYBRID_ASSETS.hubHeader} alt="宠物出行" />
                    <button type="button" className="ptp-hdr-back" aria-label="返回开屏" onClick={() => navigate('splash')} />
                  </div>

                  <div className="ptp-hub-body">
                    <div className="ptp-svc-card">
                      <img src={HYBRID_ASSETS.cardSolo} alt="宠物单独飞" />
                      <div className="ptp-svc-info">
                        <div>
                          <h4>宠物单独飞</h4>
                          <div className="ptp-green-tags">
                            <span>服务多样</span>
                            <span>经济实惠</span>
                            <span>实时追踪</span>
                          </div>
                          <p className="ptp-svc-desc">宠物独立乘坐航班，无需主人同行，专业团队全程照护</p>
                        </div>
                        <div className="ptp-svc-foot">
                          <span className="ptp-cutoff"><ClockSvg /> 起飞前60分钟停办</span>
                          <button type="button" className="ptp-btn-green" onClick={() => navigate('soloSearch')}>
                            立即办理
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="ptp-svc-card">
                      <img src={HYBRID_ASSETS.cardCabin} alt="宠物随机飞" />
                      <div className="ptp-svc-info">
                        <div>
                          <h4>宠物随机飞</h4>
                          <div className="ptp-green-tags">
                            <span>同机抵达</span>
                            <span>主人同行</span>
                            <span>陪同办理</span>
                          </div>
                          <p className="ptp-svc-desc">全程贴身相伴，专属座下空间，飞行不再分离</p>
                        </div>
                        <div className="ptp-svc-foot">
                          <span className="ptp-cutoff"><ClockSvg /> 起飞前60分钟停办</span>
                          <button type="button" className="ptp-btn-green" onClick={() => navigate('random')}>
                            立即办理
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="ptp-rules-card">
                      <div className="ptp-rules-hd">
                        <span style={{ color: '#c0cec6', letterSpacing: 2, marginRight: 6 }}>::::::</span>
                        服务说明
                        <span style={{ color: '#c0cec6', letterSpacing: 2, marginLeft: 6 }}>::::::</span>
                      </div>
                      <h5>1、办理说明</h5>
                      <p>宠物上机服务由航旅纵横联合执飞航司共同提供，仅支持猫、犬等小型伴侣动物，需提前完成申报，审核通过后方可携宠登机。</p>
                      <h5>2、注意事项</h5>
                      <p>1）乘机前12小时禁食，4小时禁水，防止宠物晕机</p>
                      <p>2）请确保宠物已注射所有必要疫苗，并携带相关证件原件</p>
                      <p>3）宠物到达目的地前须系挂识别标签（含主人手机号）</p>
                      <p>4）每位乘客每次最多携带1只宠物，总重含箱不超过5kg（随机飞客舱标准）</p>
                    </div>
                  </div>
                </div>

                <button type="button" className="ptp-side-orders" onClick={() => navigate('orders')}>
                  我的订单
                </button>
                <div className="ptp-home-bar" />
              </div>
            )}

            {/* ══ 02B: RANDOM FLIGHT (1:1 Figma Header + Real 3-State Machine) ══ */}
            {screen === 'random' && (
              <div key="random" className="ptp-view" style={{ background: '#f4f6f5' }}>
                <div className="ptp-scroll">
                  <div className="ptp-figma-hdr">
                    <img src={HYBRID_ASSETS.randomHeader} alt="宠物随机飞" />
                    <button type="button" className="ptp-hdr-back" aria-label="返回" onClick={goBack} />
                  </div>

                  <div className="ptp-quick-bar">
                    <button
                      type="button"
                      onClick={() =>
                        setRandomState((s) => (s === 'empty' ? 'available' : s === 'available' ? 'full' : 'empty'))
                      }
                    >
                      <span>库存查询 ({randomState === 'empty' ? '无票' : randomState === 'available' ? '充足' : '已满'})</span>
                    </button>
                    <button type="button" onClick={() => navigate('orders')}>
                      <span>历史订单</span>
                    </button>
                  </div>

                  {randomState === 'empty' ? (
                    <div className="ptp-random-card" style={{ textAlign: 'center', padding: '18px 16px' }}>
                      <img
                        src={HYBRID_ASSETS.randomEmptyDog}
                        alt="暂无行程"
                        style={{ width: 118, height: 108, objectFit: 'contain', margin: '0 auto 10px', mixBlendMode: 'multiply' }}
                      />
                      <p style={{ fontSize: 12, color: '#86948c', margin: '0 0 18px', lineHeight: 1.55 }}>
                        宠物随机飞，需要预订相应航班
                        <br />
                        机票后进行预约
                      </p>
                      <button
                        type="button"
                        className="ptp-btn-green-full"
                        onClick={() => {
                          setRandomState('available');
                          showToast('已模拟预订并自动关联东方航空 MU5101 行程');
                        }}
                      >
                        去预订国内机票
                      </button>
                      <button
                        type="button"
                        style={{ marginTop: 12, fontSize: 12.5, fontWeight: 600, color: '#26a35d' }}
                        onClick={() => {
                          setRandomState('available');
                          showToast('已手动导入客票 781-2345678901');
                        }}
                      >
                        已购票未显示？尝试手动导入 ›
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="ptp-random-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: '#5c6b63', marginBottom: 12 }}>
                          <strong style={{ color: '#1b2922' }}>5月20日 明天</strong>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                            <img src={HYBRID_ASSETS.muLogo} alt="东航" style={{ width: 15, height: 14 }} />
                            东方航空 MU5101
                          </span>
                        </div>
                        <div className="ptp-times" style={{ marginBottom: 12 }}>
                          <div className="ptp-tcol">
                            <strong>上海虹桥</strong>
                            <span>虹桥国际机场 T2</span>
                          </div>
                          <div style={{ color: '#33b96e', fontSize: 18 }}>✈</div>
                          <div className="ptp-tcol is-r">
                            <strong>北京大兴</strong>
                            <span>大兴国际机场</span>
                          </div>
                        </div>
                        <div style={{ background: '#f5f7f6', borderRadius: 10, padding: '10px 12px', fontSize: 12, color: '#56655d', lineHeight: 1.7, marginBottom: 14 }}>
                          <div>乘机人信息：张*三</div>
                          <div>电子客票号：781-2345678901</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px dashed #e6ece9' }}>
                          {randomState === 'available' ? (
                            <>
                              <span style={{ fontSize: 13, fontWeight: 600, color: '#29a962' }}>● 有氧舱名额：充足</span>
                              <button
                                type="button"
                                className="ptp-btn-green"
                                style={{ height: 32, padding: '0 18px' }}
                                onClick={() => { setSelectedFlightId('MU5101'); navigate('form'); }}
                              >
                                立即预约
                              </button>
                            </>
                          ) : (
                            <>
                              <span style={{ fontSize: 13, fontWeight: 600, color: '#d45c56' }}>● 本航班宠物名额已满</span>
                              <button
                                type="button"
                                className="ptp-btn-soft-green"
                                onClick={() => { showToast('已无缝切换至同日可托运航班方案'); navigate('flights'); }}
                              >
                                申请托运
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      <div style={{ textAlign: 'center', marginBottom: 14 }}>
                        <button
                          type="button"
                          style={{ fontSize: 12, fontWeight: 600, color: '#26a35d' }}
                          onClick={() => setRandomState((s) => (s === 'available' ? 'full' : 'available'))}
                        >
                          {randomState === 'available' ? '切换演示：本航班名额已满兜底态 ›' : '切回演示：有氧舱名额充足态 ›'}
                        </button>
                      </div>
                    </>
                  )}

                  <div style={{ margin: '0 16px', fontSize: 11, color: '#839189', lineHeight: 1.65 }}>
                    <strong style={{ display: 'block', fontSize: 12, color: '#394941', marginBottom: 4 }}>温馨提示</strong>
                    1、请不晚于航班起飞前90分钟到达宠物专属值机柜台办理乘机手续。<br />
                    2、预约成功代表您具备托运名额资格，具体是否可以成行，请以现场工作人员审核为准。<br />
                    3、仅有氧舱机型可承运宠物，若遇机型临时调整工作人员将协助旅客妥善处置。
                  </div>
                </div>
                <div className="ptp-home-bar" />
              </div>
            )}

            {/* ══ 02A: SOLO SEARCH (1:1 Figma Airplane Header + Real Search Controls) ══ */}
            {screen === 'soloSearch' && (
              <div key="soloSearch" className="ptp-view" style={{ background: '#f4f6f5' }}>
                <div className="ptp-scroll">
                  <div className="ptp-figma-hdr">
                    <img src={HYBRID_ASSETS.soloHeader} alt="宠物单独飞" />
                    <button type="button" className="ptp-hdr-back" aria-label="返回" onClick={goBack} />
                  </div>

                  <div className="ptp-search-card">
                    <div className="ptp-trip-tabs">
                      <button type="button" className={tripType === 'oneway' ? 'is-active' : ''} onClick={() => setTripType('oneway')}>单程</button>
                      <button type="button" className={tripType === 'round' ? 'is-active' : ''} onClick={() => setTripType('round')}>往返</button>
                    </div>

                    <div className="ptp-city-row">
                      <button type="button" className="ptp-city-btn" onClick={() => setModal('cityFrom')}>
                        {fromCity.name}
                        <small>{fromCity.cargoA}</small>
                      </button>
                      <button
                        type="button"
                        aria-label="互换城市"
                        onClick={() => { setFromIdx(toIdx); setToIdx(fromIdx); }}
                      >
                        <img src={HYBRID_ASSETS.swapCircle} alt="互换" className="ptp-swap-img" />
                      </button>
                      <button type="button" className="ptp-city-btn is-right" onClick={() => setModal('cityTo')}>
                        {toCity.name}
                        <small>{toCity.cargoA}</small>
                      </button>
                    </div>

                    <button
                      type="button"
                      className="ptp-line-row"
                      onClick={() => setDateStr((d) => (d === '5月20日 明天' ? '5月21日 周四' : '5月20日 明天'))}
                    >
                      <span>{dateStr.split(' ')[0]}</span>
                      <span className="sub">{dateStr.split(' ')[1]}</span>
                      <span className="sub" style={{ marginLeft: 'auto' }}>切换 ›</span>
                    </button>

                    <div style={{ padding: '12px 0 4px' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                        <strong style={{ fontSize: 16 }}>
                          {WEIGHT_OPTIONS.find((w) => w.id === weightKey)?.label}
                        </strong>
                        <span style={{ fontSize: 11.5, color: '#6b7a72' }}>宠物预估总重量（含航空箱）</span>
                      </div>
                      <div className="ptp-w-chips">
                        {WEIGHT_OPTIONS.map((w) => (
                          <button
                            key={w.id}
                            type="button"
                            className={`ptp-w-chip${weightKey === w.id ? ' is-active' : ''}`}
                            onClick={() => { setWeightKey(w.id); setWeightKg(w.sampleWeight); setCrateOverride(null); }}
                          >
                            {w.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="ptp-promo-strip">首单免费赠送宠物航空意外险 去领取!</div>

                    <div className="ptp-search-cta-row">
                      <button type="button" className="ptp-btn-gold" onClick={() => navigate('flights')}>
                        <strong>查询方案</strong>
                        <span>✓ 40+国内航空公司直销</span>
                      </button>
                      <button
                        type="button"
                        aria-label="AI 预订"
                        onClick={() => {
                          setFlightFilter('wide');
                          showToast('AI 预订：已为您优先匹配宽体机独立有氧舱方案');
                          navigate('flights');
                        }}
                      >
                        <img src={HYBRID_ASSETS.aiOrb} alt="AI预订" className="ptp-ai-orb" />
                      </button>
                    </div>
                  </div>

                  <div className="ptp-notice-box">
                    <strong style={{ display: 'block', color: '#24342c', marginBottom: 4 }}>货运托运须知：</strong>
                    • 单独货运不与主人客票绑定，宠物独立由货运站安排舱机。<br />
                    • 宽体客机货舱或全货机均配置独立供氧与恒温控制系统。
                  </div>
                </div>
                <div className="ptp-home-bar" />
              </div>
            )}

            {/* ══ 03: FLIGHT LIST (1:1 Dotted Emerald Header + Real Filterable Cards) ══ */}
            {screen === 'flights' && (
              <div key="flights" className="ptp-view" style={{ background: '#f4f6f5' }}>
                <div className="ptp-emerald-hdr">
                  <StatusBar light />
                  <div className="ptp-nav">
                    <button type="button" className="ptp-nav-btn" onClick={goBack}><BackSvg color="#fff" /></button>
                    <span className="ptp-nav-title">{fromCity.name} ⇄ {toCity.name}</span>
                    <button type="button" className="ptp-nav-btn" onClick={() => showToast('航旅宠物专线 24h 在线')}>帮助</button>
                  </div>
                  <div className="ptp-meta-pill">
                    {dateStr.split(' ')[0]}（周三） | 宠物含箱 {WEIGHT_OPTIONS.find((w) => w.id === weightKey)?.label} | {tripType === 'oneway' ? '单程货运' : '往返货运'}
                  </div>
                </div>

                <div className="ptp-filter-strip">
                  {[
                    { id: 'all', label: '综合排序 ▾' },
                    { id: 'wide', label: '宽体机' },
                    { id: 'mu', label: '东方航空 (1)' },
                    { id: 'ca', label: '中国国航 (1)' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      className={`ptp-fchip${flightFilter === f.id ? ' is-active' : ''}`}
                      onClick={() => setFlightFilter(f.id)}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <div className="ptp-scroll" style={{ padding: '11px 12px 24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                    {filteredFlights.map((fl) => (
                      <div key={fl.id} className={`ptp-flight-card${fl.hasRecBadge ? ' has-rec' : ''}`}>
                        {fl.hasRecBadge && <img src={HYBRID_ASSETS.recBadge} alt="官方推荐全包无忧" className="ptp-rec-img" />}
                        <div className="ptp-air-row">
                          <img src={fl.airlineKey === 'mu' ? HYBRID_ASSETS.muLogo : HYBRID_ASSETS.caLogo} alt={fl.airline} />
                          <span>{fl.airline} {fl.code}</span>
                          <span className="ptp-air-tag">{fl.aircraft}</span>
                        </div>
                        <div className="ptp-times">
                          <div className="ptp-tcol">
                            <small>交接</small>
                            <strong>{fl.handoffTime}</strong>
                            <span>{fromCity[fl.fromStationKey]}</span>
                          </div>
                          <div className="ptp-tmid">
                            <div>{fl.takeoffText}</div>
                            <div className="ptp-tmid-line" />
                            <div>{fl.duration}</div>
                          </div>
                          <div className="ptp-tcol is-r">
                            <small>提取</small>
                            <strong>{fl.pickupTime}</strong>
                            <span>{toCity[fl.toStationKey]}</span>
                          </div>
                        </div>
                        <div className="ptp-perks">
                          {fl.perks.map((p) => <span key={p}>{p}</span>)}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                          <div>
                            <div style={{ fontSize: 10.5, color: '#86948c' }}>{fl.priceLabel}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span className="ptp-price-num">¥{fl.price}</span>
                              {fl.scarcity && (
                                <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 6, background: '#fff1e4', color: '#d97222', fontWeight: 600 }}>
                                  {fl.scarcity}
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            type="button"
                            className="ptp-btn-green"
                            style={{ height: 33, padding: '0 18px' }}
                            onClick={() => { setSelectedFlightId(fl.id); navigate('detail'); }}
                          >
                            立即购买
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="ptp-home-bar" />
              </div>
            )}

            {/* ══ 04: PLAN DETAIL (Real Long Scroll + 1:1 Figma 3D Benefits Diagram) ══ */}
            {screen === 'detail' && (
              <div key="detail" className="ptp-view" style={{ background: '#f4f6f5' }}>
                <div className="ptp-emerald-hdr" style={{ paddingBottom: 22 }}>
                  <StatusBar light />
                  <div className="ptp-nav">
                    <button type="button" className="ptp-nav-btn" onClick={goBack}><BackSvg color="#fff" /></button>
                    <span className="ptp-nav-title">方案详情</span>
                    <button type="button" className="ptp-nav-btn" onClick={() => showToast('专属管家全程代办三证与监护')}>帮助</button>
                  </div>
                  <div style={{ margin: '4px 14px 0', padding: '12px 14px', borderRadius: 14, background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.2)', position: 'relative' }}>
                    {selectedFlight.hasRecBadge && (
                      <img src={HYBRID_ASSETS.recBadge} alt="官方推荐" style={{ position: 'absolute', top: 0, right: 0, height: 21, borderRadius: '0 14px 0 8px' }} />
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 700, marginBottom: 4 }}>
                      <img src={selectedFlight.airlineKey === 'mu' ? HYBRID_ASSETS.muLogo : HYBRID_ASSETS.caLogo} alt="" style={{ width: 16, height: 15 }} />
                      <span>{selectedFlight.airline} {selectedFlight.code}</span>
                    </div>
                    <div style={{ fontSize: 11.5, opacity: 0.92, marginBottom: 8 }}>
                      {dateStr.split(' ')[0]}（周三） | 宠物含箱 ≤ 15kg
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <span style={{ fontSize: 10.5, padding: '2px 8px', borderRadius: 5, background: 'rgba(0,0,0,0.16)' }}>{selectedFlight.aircraft}</span>
                      <span style={{ fontSize: 10.5, padding: '2px 8px', borderRadius: 5, background: 'rgba(0,0,0,0.16)' }}>{selectedFlight.oxygenTag}</span>
                    </div>
                  </div>
                </div>

                <div className="ptp-scroll" style={{ marginTop: -12, borderRadius: '18px 18px 0 0', background: '#f4f6f5', position: 'relative', zIndex: 4, paddingTop: 12 }}>
                  <div className="ptp-card">
                    <div className="ptp-times" style={{ marginBottom: 0 }}>
                      <div className="ptp-tcol">
                        <small>交接</small>
                        <strong>{selectedFlight.handoffTime}</strong>
                        <span>{fromCity[selectedFlight.fromStationKey]}</span>
                      </div>
                      <div className="ptp-tmid">
                        <div>{selectedFlight.takeoffText}</div>
                        <div className="ptp-tmid-line" />
                        <div>{selectedFlight.duration}</div>
                      </div>
                      <div className="ptp-tcol is-r">
                        <small>提取</small>
                        <strong>{selectedFlight.pickupTime}</strong>
                        <span>{toCity[selectedFlight.toStationKey]}</span>
                      </div>
                    </div>
                  </div>

                  {/* 1:1 Figma 3D Benefits Diagram */}
                  <div className="ptp-card">
                    <h4 className="ptp-sec-h">服务包含项目</h4>
                    <img
                      src={HYBRID_ASSETS.detailBenefits}
                      alt="代办三证 同城专车 赠送保险 标准航空箱"
                      style={{ display: 'block', width: '100%', height: 'auto' }}
                    />
                  </div>

                  <div className="ptp-card">
                    <h4 className="ptp-sec-h">费用构成明细</h4>
                    {selectedFlight.breakdown.map((b) => (
                      <div key={b.label} className="ptp-fee-row">
                        <span>{b.label}</span>
                        <strong className={b.highlight ? 'is-free' : ''}>{b.price}</strong>
                      </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, marginTop: 4, borderTop: '1px solid #eef2f0', fontSize: 13.5, fontWeight: 700 }}>
                      <span>方案预估总价</span>
                      <span style={{ color: '#e45044', fontSize: 18 }}>¥ {selectedFlight.price}</span>
                    </div>
                  </div>

                  <div className="ptp-card">
                    <h4 className="ptp-sec-h">托运限制及健康要求</h4>
                    <div className="ptp-alert is-red">
                      <strong>严格禁飞品种</strong>
                      短鼻类猫犬（如法斗、巴哥、加菲猫、波斯猫等）由于高空易窒息，属于民航禁运品种，本方案不支持承运。
                    </div>
                    <div className="ptp-alert is-green">
                      <strong>健康及适运状态</strong>
                      宠物年龄须在8周至10周岁内，处于非怀孕、非术后康复期。为了起飞安全，交接前4小时请务必让宠物保持断食。
                    </div>
                  </div>
                </div>

                <div className="ptp-sticky-bar">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: 10.5, color: '#7e8d85' }}>方案预估总价</div>
                      <div className="ptp-price-num">¥{selectedFlight.price}</div>
                    </div>
                    <button type="button" className="ptp-btn-green-full" style={{ width: 176, height: 41 }} onClick={() => navigate('form')}>
                      前往填写订单
                    </button>
                  </div>
                </div>
                <div className="ptp-home-bar" />
              </div>
            )}

            {/* ══ 05: REAL SCROLLABLE & INTERACTIVE FORM ══ */}
            {screen === 'form' && (
              <div key="form" className="ptp-view" style={{ background: '#f4f6f5' }}>
                <div className="ptp-emerald-hdr" style={{ paddingBottom: 14 }}>
                  <StatusBar light />
                  <div className="ptp-nav">
                    <button type="button" className="ptp-nav-btn" onClick={goBack}><BackSvg color="#fff" /></button>
                    <span className="ptp-nav-title">填写订单信息</span>
                    <button
                      type="button"
                      className="ptp-nav-btn"
                      style={{ fontSize: 11, padding: '0 10px', height: 24, borderRadius: 999, background: 'rgba(255,255,255,0.2)' }}
                      onClick={handleAutoFill}
                    >
                      一键填
                    </button>
                  </div>
                  <div className="ptp-steps">
                    <span className="is-on">✓ 选航班</span><i /><span className="is-on">② 填信息</span><i /><span>3 支付</span>
                  </div>
                </div>

                <div className="ptp-scroll" style={{ marginTop: -10, borderRadius: '16px 16px 0 0', background: '#f4f6f5', position: 'relative', zIndex: 4, paddingTop: 10 }}>
                  <div className="ptp-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <strong style={{ fontSize: 14 }}>宠物档案</strong>
                      <span style={{ fontSize: 10.5, color: '#e45044' }}>* 必填项</span>
                    </div>
                    <div className="ptp-field">
                      <span className="ptp-field-l">品种<em>*</em></span>
                      <button type="button" className="ptp-field-v" onClick={() => { setBreedSearch(''); setBreedAlert(null); setModal('breed'); }}>
                        <span>{breed}</span><RightSvg />
                      </button>
                    </div>
                    <div className="ptp-field">
                      <span className="ptp-field-l">昵称<em>*</em></span>
                      <input className="ptp-inline-inp" value={petName} onChange={(e) => setPetName(e.target.value)} placeholder="宠物姓名" />
                    </div>
                    <div className="ptp-field">
                      <span className="ptp-field-l">性别<em>*</em></span>
                      <div className="ptp-seg">
                        {['雄性', '雌性'].map((g) => (
                          <button key={g} type="button" className={gender === g ? 'is-active' : ''} onClick={() => setGender(g)}>{g}</button>
                        ))}
                      </div>
                    </div>
                    <div className="ptp-field">
                      <span className="ptp-field-l">绝育情况<em>*</em></span>
                      <div className="ptp-seg">
                        {['已绝育', '未绝育'].map((n) => (
                          <button key={n} type="button" className={neutered === n ? 'is-active' : ''} onClick={() => setNeutered(n)}>{n}</button>
                        ))}
                      </div>
                    </div>
                    <div className="ptp-field">
                      <span className="ptp-field-l">体重<em>*</em></span>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <button
                          type="button"
                          style={{ width: 22, height: 22, borderRadius: 6, background: '#eef5f1', color: '#218e52', fontWeight: 700 }}
                          onClick={() => { setCrateOverride(null); setWeightKg((w) => Math.max(1.5, Number((w - 2).toFixed(1)))); }}
                        >−</button>
                        <strong style={{ fontSize: 13, minWidth: 48, textAlign: 'center' }}>{weightKg} kg</strong>
                        <button
                          type="button"
                          style={{ width: 22, height: 22, borderRadius: 6, background: '#eef5f1', color: '#218e52', fontWeight: 700 }}
                          onClick={() => { setCrateOverride(null); setWeightKg((w) => Math.min(30, Number((w + 2).toFixed(1)))); }}
                        >+</button>
                      </div>
                    </div>
                    <div className="ptp-field">
                      <span className={`ptp-field-l${!ageObj.eligible ? ' is-err' : ''}`}>年龄<em>*</em></span>
                      <button type="button" className={`ptp-field-v${!ageObj.eligible ? ' is-err' : ''}`} onClick={() => setModal('age')}>
                        <span>{ageObj.label}</span><RightSvg color={!ageObj.eligible ? '#e45044' : '#9aa8a0'} />
                      </button>
                    </div>
                    {!ageObj.eligible && <div className="ptp-err-strip">{ageObj.note}</div>}
                  </div>

                  <div className="ptp-card">
                    <strong style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>寄宠与上门信息</strong>
                    <div className="ptp-field">
                      <span className="ptp-field-l">发件地址<em>*</em></span>
                      <button type="button" className="ptp-field-v" onClick={() => setModal('addrSend')}>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{senderAddr.detail}</span>
                        <RightSvg />
                      </button>
                    </div>
                    <div className="ptp-field">
                      <span className={`ptp-field-l${!pickupSlot ? ' is-err' : ''}`}>上门时间<em>*</em></span>
                      <button type="button" className={`ptp-field-v${!pickupSlot ? ' is-err' : ''}`} onClick={() => setModal('slot')}>
                        <span>{pickupSlot || '请选择日期与时段'}</span>
                        <RightSvg color={!pickupSlot ? '#e45044' : '#9aa8a0'} />
                      </button>
                    </div>
                    {!pickupSlot && <div className="ptp-err-strip">△ 上门时间不能为空，请选择合理的上门揽收时段</div>}
                  </div>

                  <div className="ptp-card">
                    <strong style={{ display: 'block', fontSize: 14, marginBottom: 6 }}>收宠与提宠信息</strong>
                    <div className="ptp-field">
                      <span className="ptp-field-l">收宠地址<em>*</em></span>
                      <button type="button" className="ptp-field-v" onClick={() => setModal('addrRecv')}>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{receiverAddr.detail}</span>
                        <RightSvg />
                      </button>
                    </div>
                    <div className="ptp-field">
                      <span className="ptp-field-l">联系人姓名<em>*</em></span>
                      <input className="ptp-inline-inp" value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="提宠人姓名" />
                    </div>
                    <div className="ptp-field">
                      <span className="ptp-field-l">联系电话<em>*</em></span>
                      <input className="ptp-inline-inp" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="提宠人手机号" />
                    </div>
                  </div>

                  <div className="ptp-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <strong style={{ fontSize: 14 }}>运输箱规格</strong>
                      <span style={{ fontSize: 10.5, padding: '2px 8px', borderRadius: 4, background: '#e7f8ef', color: '#219053', fontWeight: 600 }}>系统智能推荐</span>
                    </div>
                    <div className="ptp-crate-grid">
                      {[
                        { num: 1, label: '1号箱', cap: '≤ 6kg' },
                        { num: 2, label: '2号箱', cap: '≤ 15kg' },
                        { num: 3, label: '3号箱', cap: '≤ 32kg' },
                      ].map((c) => (
                        <button
                          key={c.num}
                          type="button"
                          className={`ptp-crate-opt${activeCrate === c.num ? ' is-active' : ''}`}
                          onClick={() => setCrateOverride(c.num)}
                        >
                          {recommendedCrate === c.num && <span className="ptp-crate-rec">推荐</span>}
                          <strong>{c.label}</strong>
                          <span>{c.cap}</span>
                        </button>
                      ))}
                    </div>
                    <div style={{ background: '#eaf8f0', color: '#20884f', fontSize: 10.5, padding: '6px 9px', borderRadius: 7 }}>
                      ✓ 已根据宠物活体净重 {weightKg}kg 自动匹配合规 {recommendedCrate}号航空箱规格
                    </div>
                  </div>

                  <div className="ptp-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <strong style={{ fontSize: 14 }}>影像与资质材料</strong>
                      <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, background: '#fff1f0', color: '#e45044', fontWeight: 600 }}>* 必填</span>
                    </div>
                    <div className="ptp-upload-grid">
                      <button
                        type="button"
                        className={`ptp-upload-slot${photoUploaded ? ' is-ok' : ' is-miss'}`}
                        onClick={() => { setPhotoUploaded((v) => !v); showToast(photoUploaded ? '已移除合照' : '已上传宠物与航空箱合照'); }}
                      >
                        <span style={{ fontSize: 16, color: photoUploaded ? '#249b59' : '#e45044' }}>{photoUploaded ? '✓' : '+'}</span>
                        <strong>宠物与箱合照</strong>
                        <span style={{ fontSize: 9.5, padding: '1px 6px', borderRadius: 4, background: photoUploaded ? '#2eb66b' : '#ffe9e8', color: photoUploaded ? '#fff' : '#df4b44', fontWeight: 700 }}>
                          {photoUploaded ? '已上传' : '未上传'}
                        </span>
                      </button>

                      <button type="button" className="ptp-upload-slot is-ok" onClick={() => setModal('ocr')}>
                        <span style={{ fontSize: 10.5, color: '#7d8c84' }}>[检疫证原件]</span>
                        <span style={{ fontSize: 9.5, padding: '1px 6px', borderRadius: 4, background: '#2eb66b', color: '#fff', fontWeight: 700 }}>OCR已提</span>
                        <strong>动物检疫合格证</strong>
                      </button>

                      <button
                        type="button"
                        className={`ptp-upload-slot${vaccineUploaded ? ' is-ok' : ''}`}
                        onClick={() => { setVaccineUploaded((v) => !v); showToast(vaccineUploaded ? '已取消疫苗本' : '疫苗本已核验'); }}
                      >
                        <span style={{ fontSize: 16, color: vaccineUploaded ? '#249b59' : '#6c7c74' }}>{vaccineUploaded ? '✓' : '+'}</span>
                        <strong>疫苗本原件</strong>
                        <span style={{ fontSize: 9.5, color: '#8a9991' }}>{vaccineUploaded ? '已核验' : '含狂犬贴纸'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="ptp-card">
                    <strong style={{ display: 'block', fontSize: 14, marginBottom: 10 }}>增值服务 <span style={{ fontSize: 11.5, fontWeight: 400, color: '#7d8c84' }}>(可选)</span></strong>
                    <button type="button" className={`ptp-addon${addonInsurance ? ' is-active' : ''}`} onClick={() => setAddonInsurance((v) => !v)}>
                      <span className={`ptp-chk${addonInsurance ? ' is-on' : ''}`}>{addonInsurance ? '✓' : ''}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>宠运无忧综合险</div>
                        <div style={{ fontSize: 10.5, color: '#7e8d85', marginTop: 2 }}>全程意外伤害与应急丢失保障，最高赔付 1 万元</div>
                      </div>
                      <strong style={{ fontSize: 12.5, color: '#249b59' }}>¥19</strong>
                    </button>
                    <button type="button" className={`ptp-addon${addonValuation ? ' is-active' : ''}`} onClick={() => setAddonValuation((v) => !v)}>
                      <span className={`ptp-chk${addonValuation ? ' is-on' : ''}`}>{addonValuation ? '✓' : ''}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>全额保价服务</div>
                        <div style={{ fontSize: 10.5, color: '#7e8d85', marginTop: 2 }}>声明宠物实际估值，享独立保额超额全额赔付</div>
                      </div>
                      <strong style={{ fontSize: 12, color: '#7e8d85' }}>¥40</strong>
                    </button>
                  </div>

                  <div className="ptp-card">
                    <strong style={{ display: 'block', fontSize: 14, marginBottom: 8 }}>订单备注 <span style={{ fontSize: 11.5, fontWeight: 400, color: '#7d8c84' }}>(选填)</span></strong>
                    <input
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      placeholder="例如：狗狗比较胆小，请轻声安抚"
                      style={{ width: '100%', height: 38, borderRadius: 9, border: '1px solid #e4ebe7', background: '#f8faf9', padding: '0 10px', fontSize: 12, outline: 'none' }}
                    />
                  </div>
                </div>

                <div className="ptp-sticky-bar">
                  {formMissing.length > 0 && (
                    <button
                      type="button"
                      className="ptp-err-strip"
                      style={{ width: '100%', textAlign: 'center', margin: '0 0 7px' }}
                      onClick={() => showToast(`待完善：${formMissing.join('、')}（右上角「一键填」可快速补全）`)}
                    >
                      △ 还有 {formMissing.length} 项未正确填写，请完善后提交
                    </button>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10.5, color: '#6b7b72', marginBottom: 8 }}>
                    <button type="button" className={`ptp-chk${agreed ? ' is-on' : ''}`} style={{ borderRadius: '50%', marginTop: 0 }} onClick={() => setAgreed((v) => !v)}>
                      {agreed ? '✓' : ''}
                    </button>
                    <span>我已阅读并同意以下条款：<em style={{ fontStyle: 'normal', color: '#249b59' }}>《承运方活体免责声明》</em></span>
                  </div>
                  <div className="ptp-submit-pill">
                    <div className="ptp-submit-l">
                      <div>
                        <strong>¥{totalPrice}</strong>
                        <span style={{ fontSize: 11, opacity: 0.78, marginLeft: 6 }}>| 订单金额</span>
                      </div>
                      <button type="button" style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.85)' }} onClick={() => setModal('price')}>
                        明细 ∧
                      </button>
                    </div>
                    <button
                      type="button"
                      className={`ptp-submit-btn${formMissing.length > 0 ? ' is-off' : ''}`}
                      onClick={() => {
                        if (formMissing.length > 0) { showToast(`请先完善：${formMissing[0]}`); return; }
                        setTrackStageIdx(2);
                        navigate('success');
                      }}
                    >
                      提交订单
                    </button>
                  </div>
                </div>
                <div className="ptp-home-bar" />
              </div>
            )}

            {/* ══ 06: ORDER SUCCESS & EMPTY ORDERS ══ */}
            {screen === 'success' && (
              <div key="success" className="ptp-view" style={{ background: '#ffffff' }}>
                <StatusBar bg="#ffffff" />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px 60px', textAlign: 'center' }}>
                  <img src={HYBRID_ASSETS.successDog} alt="提交成功" style={{ width: 136, height: 134, objectFit: 'contain', marginBottom: 14, mixBlendMode: 'multiply' }} />
                  <h3 style={{ fontSize: 21, fontWeight: 700, margin: '0 0 8px' }}>订单提交成功</h3>
                  <p style={{ fontSize: 12, color: '#7e8d85', lineHeight: 1.6, margin: '0 0 34px' }}>
                    您的宠物托运申请已进入系统<br />预计 15 分钟内为您锁定舱位
                  </p>
                  <button type="button" className="ptp-btn-green-full" onClick={() => navigate('tracking')}>查看订单详情</button>
                  <button
                    type="button"
                    style={{ width: '100%', height: 43, borderRadius: 999, background: '#dcdede', color: '#27342d', fontSize: 14.5, fontWeight: 600, marginTop: 12 }}
                    onClick={() => navigate('hub')}
                  >
                    返回首页
                  </button>
                </div>
                <div className="ptp-home-bar" />
              </div>
            )}

            {screen === 'orders' && (
              <div key="orders" className="ptp-view" style={{ background: '#ffffff' }}>
                <StatusBar bg="#ffffff" />
                <div className="ptp-nav">
                  <button type="button" className="ptp-nav-btn" onClick={goBack}><BackSvg /></button>
                  <span className="ptp-nav-title">我的订单</span>
                  <span style={{ fontSize: 12, color: '#5c6b63' }}>我的发票</span>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px 60px', textAlign: 'center' }}>
                  <img src={HYBRID_ASSETS.emptyDog} alt="暂无订单" style={{ width: 118, height: 92, objectFit: 'contain', marginBottom: 12, mixBlendMode: 'multiply' }} />
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 22px' }}>暂无订单</h3>
                  <button type="button" className="ptp-btn-green-full" style={{ width: 200 }} onClick={() => navigate('soloSearch')}>
                    去预约宠物出行
                  </button>
                </div>
                <div className="ptp-home-bar" />
              </div>
            )}

            {/* ══ 07: LIVE TRACKING ON 1:1 AMAP ══ */}
            {screen === 'tracking' && (
              <div key="tracking" className="ptp-view" style={{ background: '#d8edf7' }}>
                <div className={`ptp-map-top${trackStageIdx === 4 ? ' is-arrived' : ''}`}>
                  <img
                    src={trackStageIdx === 4 ? HYBRID_ASSETS.mapArrived : HYBRID_ASSETS.mapFly}
                    alt="航旅纵横高德实景航线图"
                    className="ptp-map-bg"
                  />
                  <button
                    type="button"
                    aria-label="返回"
                    onClick={() => navigate('hub')}
                    style={{ position: 'absolute', left: 10, top: 44, width: 38, height: 34, zIndex: 10 }}
                  />
                </div>

                <div className="ptp-track-sheet">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 11, color: '#6b7a72' }}>{trackStage.etaPrefix}</div>
                      <div style={{ fontSize: 27, fontWeight: 800, lineHeight: 1.1, fontVariantNumeric: 'tabular-nums' }}>{trackStage.etaTime}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#24342c', marginTop: 2 }}>{trackStage.etaPlace}</div>
                    </div>
                    <button
                      type="button"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: '#203028' }}
                      onClick={() => showToast('已接通航旅纵横宠物专属客服')}
                    >
                      <img src={HYBRID_ASSETS.umetripCs} alt="客服" style={{ width: 18, height: 18, mixBlendMode: 'multiply' }} />
                      联系客服
                    </button>
                  </div>

                  <div style={{ fontSize: 11.5, color: '#2b3b33', paddingBottom: 12, borderBottom: '1px solid #f0f4f2', marginBottom: 12 }}>
                    请接机人 <strong>{contactName || '阿童'}</strong> 携带有效身份证件，至 <strong style={{ color: '#229d58' }}>T2 提取处</strong> 办理提宠。
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img src={HYBRID_ASSETS.petAvatar} alt="小航" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <strong style={{ fontSize: 16 }}>{petName || '小航'}</strong>
                          <span style={{ fontSize: 10, padding: '1px 7px', borderRadius: 999, background: '#e6f8ee', color: '#229a57', fontWeight: 600 }}>● 有氧舱</span>
                        </div>
                        <div style={{ fontSize: 10.5, color: '#8a9991', marginTop: 2 }}>{breed} · PT-20250519001</div>
                      </div>
                    </div>
                    <button type="button" style={{ textAlign: 'right' }} onClick={() => setModal('price')}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#586760' }}>¥ {totalPrice}</div>
                      <div style={{ fontSize: 10.5, color: '#8a9991' }}>明细 ▾</div>
                    </button>
                  </div>

                  <div style={{ background: '#f7f9f8', borderRadius: 12, padding: '11px 12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: 12.5 }}>全流程追踪</strong>
                      <button type="button" style={{ fontSize: 11, color: '#7d8c84' }} onClick={() => setModal('timeline')}>查看全部 ›</button>
                    </div>
                    <div className="ptp-stage-rail">
                      {TRACKING_STAGES.map((st, idx) => (
                        <button
                          key={st.key}
                          type="button"
                          className={`ptp-stage-node${idx < trackStageIdx ? ' is-done' : ''}${idx === trackStageIdx ? ' is-now' : ''}`}
                          onClick={() => setTrackStageIdx(idx)}
                        >
                          <span className="ptp-stage-dot">{idx < trackStageIdx ? '✓' : ''}</span>
                          <span>{st.label}</span>
                        </button>
                      ))}
                    </div>
                    <div style={{ background: '#eff2f1', borderRadius: 9, padding: '8px 10px', fontSize: 11, color: '#4d5d55', lineHeight: 1.5 }}>
                      <strong style={{ marginRight: 6 }}>{trackStage.summaryTime}</strong>
                      {trackStage.summaryText}
                    </div>
                  </div>

                  {trackStageIdx === 4 ? (
                    <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <img src={HYBRID_ASSETS.arrivedDog} alt="小航平安落地" style={{ width: 82, height: 96, objectFit: 'contain', mixBlendMode: 'multiply' }} />
                        <div>
                          <strong style={{ display: 'block', fontSize: 15 }}>{petName || '小航'} 已平安落地北京！</strong>
                          <div style={{ fontSize: 12, color: '#394941', marginTop: 4 }}>总计飞行 <strong style={{ color: '#249b59' }}>1760</strong> 公里</div>
                          <div style={{ fontSize: 11, color: '#8a9991', marginTop: 2 }}>快给朋友们报个平安吧</div>
                        </div>
                      </div>
                      <button type="button" className="ptp-btn-green-full" onClick={() => setModal('poster')}>
                        生成专属接机海报
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      style={{ width: '100%', textAlign: 'center', marginTop: 10, fontSize: 12, fontWeight: 600, color: '#249b59' }}
                      onClick={() => { setTrackStageIdx(4); showToast('航班已抵达北京大兴，可生成接机海报'); }}
                    >
                      点击「可提取」切换至落地态，生成专属接机海报 ›
                    </button>
                  )}
                </div>
                <div className="ptp-home-bar" />
              </div>
            )}

            {/* ════════════ REAL INTERACTIVE HALF-SHEET MODALS ════════════ */}

            {(modal === 'cityFrom' || modal === 'cityTo') && (
              <div className="ptp-mask" onClick={() => setModal(null)}>
                <div className="ptp-sheet" onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-sheet-grab" />
                  <div className="ptp-sheet-hd">
                    <span>选择{modal === 'cityFrom' ? '出发' : '到达'}城市</span>
                    <button type="button" style={{ fontSize: 12.5, color: '#7d8c84' }} onClick={() => setModal(null)}>关闭</button>
                  </div>
                  <div className="ptp-sheet-body">
                    {CITIES.map((c, idx) => (
                      <button
                        key={c.code}
                        type="button"
                        style={{ width: '100%', padding: '11px 4px', borderBottom: '1px solid #f1f4f2', display: 'flex', justifyContent: 'space-between', textAlign: 'left' }}
                        onClick={() => {
                          if (modal === 'cityFrom') { if (idx === toIdx) setToIdx(fromIdx); setFromIdx(idx); }
                          else { if (idx === fromIdx) setFromIdx(toIdx); setToIdx(idx); }
                          setModal(null);
                        }}
                      >
                        <div>
                          <strong style={{ display: 'block', fontSize: 13.5 }}>{c.name} ({c.code})</strong>
                          <span style={{ fontSize: 11, color: '#8a9991' }}>{c.cargoA}</span>
                        </div>
                        <span style={{ color: '#249b59', fontWeight: 700 }}>{(modal === 'cityFrom' ? fromIdx : toIdx) === idx ? '✓' : ''}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {modal === 'breed' && (
              <div className="ptp-mask" onClick={() => setModal(null)}>
                <div className="ptp-sheet" onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-sheet-grab" />
                  <div className="ptp-sheet-hd">
                    <button type="button" style={{ fontSize: 12.5, color: '#84938b' }} onClick={() => setModal(null)}>取消</button>
                    <span>选择品种</span>
                    <button type="button" style={{ fontSize: 12.5, color: '#249b59' }} onClick={() => setModal(null)}>确定</button>
                  </div>
                  <input
                    value={breedSearch}
                    onChange={(e) => setBreedSearch(e.target.value)}
                    placeholder="搜索品种...（试试搜“法斗”触发短鼻禁飞拦截）"
                    style={{ width: '100%', height: 35, borderRadius: 10, border: 'none', background: '#f2f5f4', padding: '0 12px', fontSize: 12.5, marginBottom: 10, outline: 'none' }}
                  />
                  {!breedSearch && (
                    <div style={{ display: 'flex', gap: 18, borderBottom: '1px solid #eff2f0', marginBottom: 6 }}>
                      {[{ id: 'dog', label: '犬类' }, { id: 'cat', label: '猫类' }, { id: 'other', label: '其他' }].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          style={{
                            paddingBottom: 7,
                            fontSize: 13,
                            fontWeight: breedTab === t.id ? 700 : 500,
                            color: breedTab === t.id ? '#249b59' : '#7d8c84',
                            borderBottom: breedTab === t.id ? '2px solid #249b59' : '2px solid transparent',
                          }}
                          onClick={() => { setBreedTab(t.id); setBreedAlert(null); }}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  )}
                  {breedAlert && <div className="ptp-err-strip">民航禁飞拦截：{breedAlert}</div>}
                  <div className="ptp-sheet-body">
                    {visibleBreeds.map((b) => (
                      <button
                        key={b.name}
                        type="button"
                        style={{ width: '100%', padding: '10px 4px', borderBottom: '1px solid #f2f5f3', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}
                        onClick={() => {
                          if (b.banned) { setBreedAlert(`${b.name} — ${b.banReason}`); return; }
                          setBreed(b.name);
                          setBreedAlert(null);
                          setModal(null);
                        }}
                      >
                        <div>
                          <strong style={{ display: 'block', fontSize: 13.5, color: b.banned ? '#d6453f' : breed === b.name ? '#249b59' : '#16221c' }}>{b.name}</strong>
                          <span style={{ fontSize: 10.5, color: '#8a9991' }}>{b.sub}</span>
                        </div>
                        {b.banned ? (
                          <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, background: '#ffe9e8', color: '#df4b44', fontWeight: 700 }}>禁飞</span>
                        ) : breed === b.name ? (
                          <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#33b96e', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>✓</span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {modal === 'age' && (
              <div className="ptp-mask" onClick={() => setModal(null)}>
                <div className="ptp-sheet" onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-sheet-grab" />
                  <div className="ptp-sheet-hd">
                    <button type="button" style={{ fontSize: 12.5, color: '#84938b' }} onClick={() => setModal(null)}>取消</button>
                    <span>选择宠物年龄</span>
                    <span style={{ width: 28 }} />
                  </div>
                  <div className="ptp-sheet-body" style={{ maxHeight: 180, marginBottom: 12 }}>
                    {AGE_OPTIONS.map((o) => (
                      <button
                        key={o.label}
                        type="button"
                        style={{
                          width: '100%',
                          padding: '10px 0',
                          borderRadius: 10,
                          background: ageObj.label === o.label ? '#f2f5f4' : 'transparent',
                          fontSize: ageObj.label === o.label ? 17 : 14,
                          fontWeight: ageObj.label === o.label ? 700 : 500,
                          color: !o.eligible ? '#d6453f' : ageObj.label === o.label ? '#16221c' : '#8a9991',
                        }}
                        onClick={() => setAgeObj(o)}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                  <div className={`ptp-alert ${ageObj.eligible ? 'is-green' : 'is-red'}`}>
                    <strong>{ageObj.eligible ? '● 年龄符合客舱同行要求' : '● 超出航空适航年龄限制'}</strong>
                    {ageObj.note}
                  </div>
                  <button type="button" className="ptp-btn-green-full" style={{ marginTop: 12 }} onClick={() => setModal(null)}>确认选择</button>
                </div>
              </div>
            )}

            {(modal === 'addrSend' || modal === 'addrRecv') && (
              <div className="ptp-mask" onClick={() => setModal(null)}>
                <div className="ptp-sheet" onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-sheet-grab" />
                  <div className="ptp-sheet-hd">
                    <button type="button" style={{ fontSize: 12.5, color: '#84938b' }} onClick={() => setModal(null)}>取消</button>
                    <span>{modal === 'addrSend' ? '选择发件地址' : '选择收货地址'}</span>
                    <span style={{ width: 28 }} />
                  </div>
                  <div className="ptp-sheet-body" style={{ marginBottom: 10 }}>
                    {SAVED_ADDRESSES.map((a) => {
                      const active = (modal === 'addrSend' ? senderAddr.id : receiverAddr.id) === a.id;
                      return (
                        <button
                          key={a.id}
                          type="button"
                          className={`ptp-addon${active ? ' is-active' : ''}`}
                          onClick={() => { if (modal === 'addrSend') setSenderAddr(a); else setReceiverAddr(a); setModal(null); }}
                        >
                          <span className={`ptp-chk${active ? ' is-on' : ''}`} style={{ borderRadius: '50%' }}>{active ? '✓' : ''}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 700 }}>{a.name} <span style={{ fontWeight: 400, color: '#7d8c84', marginLeft: 4 }}>{a.phone}</span></div>
                            <div style={{ fontSize: 11, color: '#6b7b72', marginTop: 4 }}>
                              <span style={{ padding: '1px 6px', borderRadius: 4, marginRight: 6, fontSize: 10, background: a.tagType === 'blue' ? '#eaf2ff' : '#e7f8ef', color: a.tagType === 'blue' ? '#2563eb' : '#249b59', fontWeight: 600 }}>{a.tag}</span>
                              {a.detail}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <button type="button" className="ptp-btn-green-full" onClick={() => setModal(null)}>确认选择</button>
                </div>
              </div>
            )}

            {modal === 'slot' && (
              <div className="ptp-mask" onClick={() => setModal(null)}>
                <div className="ptp-sheet" onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-sheet-grab" />
                  <div className="ptp-sheet-hd">
                    <span>选择上门揽收时段</span>
                    <button type="button" style={{ fontSize: 12.5, color: '#84938b' }} onClick={() => setModal(null)}>关闭</button>
                  </div>
                  {PICKUP_SLOTS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`ptp-addon${pickupSlot === s ? ' is-active' : ''}`}
                      onClick={() => { setPickupSlot(s); setModal(null); showToast('已选择上门揽收时段'); }}
                    >
                      <span className={`ptp-chk${pickupSlot === s ? ' is-on' : ''}`} style={{ borderRadius: '50%' }}>{pickupSlot === s ? '✓' : ''}</span>
                      <span style={{ fontSize: 12.5, fontWeight: 600 }}>{s}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {modal === 'ocr' && (
              <div className="ptp-mask" onClick={() => setModal(null)}>
                <div className="ptp-sheet" onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-sheet-grab" />
                  <div className="ptp-sheet-hd">
                    <span>动物检疫合格证 · OCR 自动提取</span>
                    <button type="button" style={{ fontSize: 12.5, color: '#249b59' }} onClick={() => setModal(null)}>完成</button>
                  </div>
                  <div className="ptp-alert is-green" style={{ marginBottom: 10 }}>
                    <strong>✓ OCR 识别置信度 99.4% · 有效期核验通过</strong>
                    自动提取检疫证编号并与航司货运预审同步，免去手动输入 18 位长编码。
                  </div>
                  <div className="ptp-fee-row"><span>检疫证编号</span><strong>NO.31010420260519088</strong></div>
                  <div className="ptp-fee-row"><span>动物品种</span><strong>犬类（{breed}）</strong></div>
                  <div className="ptp-fee-row"><span>有效期至</span><strong className="is-free">2026-05-23（有效）</strong></div>
                </div>
              </div>
            )}

            {modal === 'price' && (
              <div className="ptp-mask" onClick={() => setModal(null)}>
                <div className="ptp-sheet" onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-sheet-grab" />
                  <div className="ptp-sheet-hd" style={{ justifyContent: 'center' }}>价格明细</div>
                  {selectedFlight.breakdown.map((b) => (
                    <div key={b.label} className="ptp-fee-row">
                      <span>{b.label}</span>
                      <strong className={b.highlight ? 'is-free' : ''}>{b.price}</strong>
                    </div>
                  ))}
                  {addonInsurance && <div className="ptp-fee-row"><span>宠运无忧综合险</span><strong>¥ 19</strong></div>}
                  {addonValuation && <div className="ptp-fee-row"><span>全额保价服务</span><strong>¥ 40</strong></div>}
                  <div className="ptp-fee-row"><span>航旅会员折扣</span><strong style={{ color: '#e88b2e' }}>- ¥ 20</strong></div>
                </div>
              </div>
            )}

            {modal === 'timeline' && (
              <div className="ptp-mask" onClick={() => setModal(null)}>
                <div className="ptp-sheet" onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-sheet-grab" />
                  <div className="ptp-sheet-hd">
                    <span>全流程追踪</span>
                    <button type="button" style={{ fontSize: 12.5, color: '#84938b' }} onClick={() => setModal(null)}>关闭</button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 12, background: '#f5f7f6', marginBottom: 14 }}>
                    <img src={HYBRID_ASSETS.petAvatar} alt="小航" style={{ width: 38, height: 38, borderRadius: '50%' }} />
                    <div>
                      <strong style={{ fontSize: 13 }}>{petName || '小航'} · {breed}</strong>
                      <div style={{ fontSize: 10.5, color: '#8a9991' }}>订单号：PT-20250519001</div>
                    </div>
                  </div>
                  <div className="ptp-sheet-body">
                    {FULL_TIMELINE_LOGS.filter((l) => l.minStage <= trackStageIdx).map((log, i) => (
                      <div key={log.time} style={{ display: 'grid', gridTemplateColumns: '16px 1fr', gap: 10, paddingBottom: 14 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <span style={{ width: 10, height: 10, borderRadius: '50%', marginTop: 4, background: i === 0 ? '#2eb66b' : '#cbd7d0' }} />
                          <span style={{ flex: 1, width: 1.5, background: '#e5ece8', marginTop: 4 }} />
                        </div>
                        <div>
                          <div style={{ fontSize: 11, color: i === 0 ? '#249b59' : '#8a9991', fontWeight: i === 0 ? 600 : 400 }}>{log.time}</div>
                          <div style={{ fontSize: 13.5, fontWeight: 700, margin: '2px 0' }}>{log.title}</div>
                          <div style={{ fontSize: 11.5, color: '#5f6f67', lineHeight: 1.55 }}>{log.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ══ 08: PEAK-END SHARE POSTER (1:1 Figma Art + Live Pet Name + Official QR & Share Icons) ══ */}
            {modal === 'poster' && (
              <div className="ptp-mask" onClick={() => setModal(null)}>
                <div style={{ padding: '0 22px 14px', marginTop: 'auto' }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ borderRadius: 20, overflow: 'hidden', background: '#2e95bd', boxShadow: '0 18px 40px rgba(10, 26, 20, 0.42)' }}>
                    <img src={HYBRID_ASSETS.posterHeader} alt="全程实时看得见 安心宠物托运" style={{ display: 'block', width: '100%', height: 'auto' }} />
                    <div style={{ background: '#ffffff', color: '#16221c', borderRadius: 16, padding: 14, margin: '-14px 10px 10px', position: 'relative', zIndex: 2 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                        <img src={HYBRID_ASSETS.petAvatar} alt="小航" style={{ width: 42, height: 42, borderRadius: '50%', border: '2px solid #86e0ad' }} />
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 800 }}>{petName || '小航'} 平安落地{toCity.name}！</div>
                          <div style={{ fontSize: 11, color: '#249b59', fontWeight: 600 }}>1760 公里 2 小时 40 分 的奔赴</div>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '10px 0', borderTop: '1px dashed #e5ece8', borderBottom: '1px dashed #e5ece8', marginBottom: 10 }}>
                        <div>
                          <div style={{ fontSize: 18, fontWeight: 800 }}>18:40</div>
                          <div style={{ fontSize: 10.5, color: '#7a8a82' }}>虹桥机场</div>
                        </div>
                        <img src={HYBRID_ASSETS.posterPlane} alt="" style={{ width: 54, height: 29, objectFit: 'contain' }} />
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: 18, fontWeight: 800 }}>20:40</div>
                          <div style={{ fontSize: 10.5, color: '#7a8a82' }}>大兴机场</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10.5, color: '#8a9991' }}>
                        <div>
                          <div>@TiceeZz</div>
                          <div>2026/05/20 周三</div>
                        </div>
                        <img src={HYBRID_ASSETS.posterQr} alt="航旅纵横小程序码" style={{ width: 38, height: 38 }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ptp-sheet" style={{ paddingTop: 12 }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ textAlign: 'center', fontSize: 13.5, fontWeight: 700, marginBottom: 10 }}>分享至</div>
                  <div style={{ position: 'relative' }}>
                    <img src={HYBRID_ASSETS.shareBar} alt="微信 朋友圈 QQ 保存图片" style={{ display: 'block', width: '100%', height: 'auto' }} />
                    <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                      {['微信', '朋友圈', 'QQ', '保存图片'].map((ch) => (
                        <button
                          key={ch}
                          type="button"
                          aria-label={ch}
                          onClick={() => { showToast(`已生成「${petName || '小航'}平安落地」海报并触发${ch}`); setModal(null); }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ════════════ RIGHT: UX STORYBOARD & DIRECTOR PANEL ════════════ */}
      <aside className="ptp-director">
        <div className="ptp-dir-card">
          <div className="ptp-dir-kicker">
            <span className="ptp-dir-step">SCREEN {activeScene.step}</span>
            <span className="ptp-dir-tag">{activeScene.tag}</span>
          </div>
          <h2 className="ptp-dir-title">{activeScene.title}</h2>
          <p className="ptp-dir-insight">{activeScene.insight}</p>
          <div className="ptp-dir-tip">{activeScene.tip}</div>

          <div className="ptp-dir-actions">
            {screen === 'random' && (
              <>
                <button type="button" className={`ptp-dir-btn${randomState === 'empty' ? ' is-primary' : ''}`} onClick={() => setRandomState('empty')}>态 1：无票空态</button>
                <button type="button" className={`ptp-dir-btn${randomState === 'available' ? ' is-primary' : ''}`} onClick={() => setRandomState('available')}>态 2：名额充足</button>
                <button type="button" className={`ptp-dir-btn${randomState === 'full' ? ' is-primary' : ''}`} onClick={() => setRandomState('full')}>态 3：名额已满兜底</button>
              </>
            )}

            {screen === 'form' && (
              <>
                <button type="button" className="ptp-dir-btn is-primary" onClick={handleAutoFill}>一键补全演示数据</button>
                <button
                  type="button"
                  className="ptp-dir-btn"
                  onClick={() => {
                    setBreedSearch('法斗');
                    setBreedAlert('法国斗牛犬 — 短鼻类犬高空易窒息，民航规定严格禁运');
                    setModal('breed');
                  }}
                >
                  演示短鼻犬风控拦截
                </button>
                <button
                  type="button"
                  className="ptp-dir-btn"
                  onClick={() => { setWeightKg(18.5); setCrateOverride(null); showToast('体重已调至 18.5kg，航空箱自动切换推荐 3号箱'); }}
                >
                  调重至 18.5kg 看荐箱联动
                </button>
              </>
            )}

            {screen === 'tracking' && (
              <>
                <button type="button" className={`ptp-dir-btn${trackStageIdx === 2 ? ' is-primary' : ''}`} onClick={() => { setModal(null); setTrackStageIdx(2); }}>高空飞行中</button>
                <button type="button" className={`ptp-dir-btn${trackStageIdx === 4 && modal !== 'poster' ? ' is-primary' : ''}`} onClick={() => { setModal(null); setTrackStageIdx(4); }}>平安落地</button>
                <button type="button" className="ptp-dir-btn" onClick={() => { setTrackStageIdx(4); setModal('poster'); }}>弹出接机海报</button>
              </>
            )}

            {screen !== 'random' && screen !== 'form' && screen !== 'tracking' && (
              <button
                type="button"
                className="ptp-dir-btn is-primary"
                onClick={() => {
                  const idx = SCENES.findIndex((s) => s.id === activeSceneId);
                  navigate(SCENES[(idx + 1) % SCENES.length].id);
                }}
              >
                下一步演示 →
              </button>
            )}

            <button type="button" className="ptp-dir-btn" onClick={handleReset}>重置演示</button>
          </div>
        </div>

        <div className="ptp-dir-card">
          <div className="ptp-storyboard-head">
            <span>QUICK JUMP · 10 CORE SCREENS</span>
            <span>点击直达任意体验节点</span>
          </div>
          <div className="ptp-scene-grid">
            {SCENES.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`ptp-scene-btn${activeSceneId === s.id ? ' is-active' : ''}`}
                onClick={() => navigate(s.id)}
              >
                <em>{s.step}</em>
                <strong>{s.short}</strong>
              </button>
            ))}
          </div>
        </div>

        <p className="ptp-dir-footnote">
          1:1 保留 Figma 原稿 2x Retina 头部视觉、官方「航旅纵横」Logo、3D 云吞机长权益图与高德实景航线，同时由真实前端代码驱动长页自由滑动、宽体机筛选、短鼻犬禁飞拦截、体重联动荐箱、实时表单校验与 5 节点追踪抽屉。
        </p>
      </aside>
    </div>
  );
}
