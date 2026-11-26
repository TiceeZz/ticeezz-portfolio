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

const MuWhiteSvg = () => (
  <svg width="17" height="14" viewBox="0 0 24 20" fill="none" style={{ flexShrink: 0 }}>
    <path d="M2 10.5C6.5 4.2 14.5 2.5 21 4.2C14.8 5.2 10.2 7.5 8 10.5C11.4 9.3 15.8 9.2 19.6 10.8C13.6 11.2 8.8 12.6 5.6 15.4C3.5 13.9 2.3 12.2 2 10.5Z" fill="#e5262e" />
    <path d="M6.2 15.2C9.8 12.5 14.6 11.4 20.8 11.6C16.2 14.4 11.4 16.2 6.2 15.2Z" fill="#18499e" />
  </svg>
);

const SearchIconSvg = () => (
  <svg width="14" height="14" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="8" cy="8" r="5.5" stroke="#9aa8a0" strokeWidth="1.5" />
    <path d="M12.2 12.2L15.8 15.8" stroke="#9aa8a0" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CopySvg = () => (
  <svg width="11" height="11" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, verticalAlign: 'middle' }}>
    <rect x="5" y="5" width="8.5" height="9" rx="1.5" stroke="#9aa8a0" strokeWidth="1.4" />
    <path d="M10.5 5V3.5A1.5 1.5 0 0 0 9 2H3.5A1.5 1.5 0 0 0 2 3.5V9.5A1.5 1.5 0 0 0 3.5 11H5" stroke="#9aa8a0" strokeWidth="1.4" />
  </svg>
);

const CameraSvg = () => (
  <svg width="20" height="18" viewBox="0 0 24 22" fill="none" style={{ flexShrink: 0 }}>
    <rect x="2.2" y="5.5" width="19.6" height="13.5" rx="3.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 5.5L9.4 3.4C9.7 3 10.1 2.8 10.6 2.8H13.4C13.9 2.8 14.3 3 14.6 3.4L16 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="9.6" cy="11.2" r="1.15" fill="currentColor" />
    <circle cx="14.4" cy="11.2" r="1.15" fill="currentColor" />
    <path d="M9.6 14.1C10.5 15.1 13.5 15.1 14.4 14.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const RandomPlaneSvg = ({ muted = false }) => (
  <svg width="28" height="20" viewBox="0 0 36 24" fill="none" style={{ flexShrink: 0 }}>
    {/* 1:1 Figma takeoff plane silhouette: tilted fuselage + swept-back wing + diagonal tail cutout */}
    <path
      d="M5.4 12.1L9.2 14.9L6.4 16.1L3.3 13.4C2.9 13 3.1 12.2 3.7 12C4.3 11.8 4.9 11.8 5.4 12.1Z"
      fill={muted ? '#c5ceca' : '#3db885'}
    />
    <path
      d="M7.6 17.4L11.2 16.0L16.3 14.1L10.3 6.2C9.8 5.5 10.3 4.5 11.2 4.6L13.1 4.9C13.6 5 14.1 5.3 14.5 5.7L22.3 12.0L29.1 9.6C31.1 8.9 33.1 9.5 33.6 11.0C34.1 12.5 32.8 14.1 30.8 14.8L13.2 20.6C11.1 21.3 8.9 20.4 7.8 18.6L7.4 17.9C7.3 17.7 7.4 17.5 7.6 17.4Z"
      fill={muted ? '#c5ceca' : '#3db885'}
    />
  </svg>
);

const StatusBar = ({ light = false, bg }) => (
  <div className="ptp-statusbar" style={bg ? { background: bg } : undefined} aria-hidden="true">
    <img src={light ? HYBRID_ASSETS.iosBarLight : HYBRID_ASSETS.iosBarDark} alt="" />
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
  const [vaccineUploaded, setVaccineUploaded] = useState(false);
  const [addonInsurance, setAddonInsurance] = useState(true);
  const [addonValuation, setAddonValuation] = useState(false);
  const [orderNote, setOrderNote] = useState('');
  const [agreed, setAgreed] = useState(true);

  // Tracking & Modals & Orders & Scroll Chrome
  const [trackStageIdx, setTrackStageIdx] = useState(2); // 0..4
  const [modal, setModal] = useState(null);
  const [breedTab, setBreedTab] = useState('dog');
  const [breedSearch, setBreedSearch] = useState('');
  const [breedAlert, setBreedAlert] = useState(null);
  const [orderTab, setOrderTab] = useState('全部');
  const [onlyValidOrders, setOnlyValidOrders] = useState(true);
  const [detailScrolled, setDetailScrolled] = useState(false);
  const [formScrolled, setFormScrolled] = useState(false);
  const [mapSatellite, setMapSatellite] = useState(false);
  const [showWeatherCard, setShowWeatherCard] = useState(false);

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
    setDetailScrolled(false);
    setFormScrolled(false);
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

            {/* ══ 01: SERVICE HUB (Uncut 1:1 Figma Header + Real Scroll & Buttons) ══ */}
            {screen === 'hub' && (
              <div key="hub" className="ptp-view" style={{ background: '#f2f5f4' }}>
                <div className="ptp-scroll">
                  <div className="ptp-figma-hdr">
                    <img src={HYBRID_ASSETS.hubHeader} alt="宠物出行" />
                    <button
                      type="button"
                      className="ptp-hdr-back"
                      style={{ top: '34%', height: '30%' }}
                      aria-label="返回开屏"
                      onClick={() => navigate('splash')}
                    />
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
                        <span className="ptp-dots-deco" aria-hidden="true" />
                        服务说明
                        <span className="ptp-dots-deco" aria-hidden="true" />
                      </div>
                      <h5>1、办理说明</h5>
                      <p>宠物上机服务由航旅纵横联合执飞航司共同提供，仅支持猫、犬等小型伴侣动物，需提前完成申报，审核通过后方可携宠登机。</p>
                      <h5>2、注意事项</h5>
                      <p>1）乘机前12小时禁食，4小时禁水，防止宠物晕机</p>
                      <p>2）请确保宠物已注射所有必要疫苗，并携带相关证件原件</p>
                      <p>3）宠物到达目的地前须系挂识别标签（含主人手机号）</p>
                      <p>4）每位乘客每次最多携带1只宠物，总重含箱不超过5kg</p>
                    </div>
                  </div>
                </div>

                <button type="button" className="ptp-side-orders" onClick={() => navigate('orders')}>
                  我的订单
                </button>
                <div className="ptp-home-bar" />
              </div>
            )}

            {/* ══ 02B: RANDOM FLIGHT (Uncut 1:1 Figma Header + Real 3-State Machine) ══ */}
            {screen === 'random' && (
              <div key="random" className="ptp-view" style={{ background: '#f4f6f5' }}>
                <div className="ptp-scroll">
                  <div className="ptp-figma-hdr">
                    <img src={HYBRID_ASSETS.randomHeader} alt="宠物随机飞" />
                    <button
                      type="button"
                      className="ptp-hdr-back"
                      style={{ top: '24%', height: '18%' }}
                      aria-label="返回"
                      onClick={goBack}
                    />
                  </div>

                  <div className="ptp-quick-bar">
                    <button
                      type="button"
                      onClick={() => {
                        const next = randomState === 'empty' ? 'available' : randomState === 'available' ? 'full' : 'empty';
                        setRandomState(next);
                        showToast(next === 'empty' ? '已切换：无票空态' : next === 'available' ? '已切换：有氧舱名额充足' : '已切换：名额已满兜底态');
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                        <rect x="2.2" y="2.2" width="11.6" height="11.6" rx="2.4" stroke="#45554d" strokeWidth="1.35" />
                        <circle cx="8" cy="7.5" r="2.2" stroke="#45554d" strokeWidth="1.2" />
                        <path d="M12.5 12.5L15.6 15.6" stroke="#45554d" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <span>库存查询</span>
                    </button>
                    <button type="button" onClick={() => navigate('orders')}>
                      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                        <rect x="2.5" y="2.5" width="10.5" height="12.5" rx="2" stroke="#45554d" strokeWidth="1.35" />
                        <path d="M5.2 6.2H10.2M5.2 9.2H8.4" stroke="#45554d" strokeWidth="1.25" strokeLinecap="round" />
                        <circle cx="13.2" cy="12.8" r="3" fill="#fff" stroke="#45554d" strokeWidth="1.25" />
                        <path d="M13.2 11.4V12.9L14.2 13.5" stroke="#45554d" strokeWidth="1.1" strokeLinecap="round" />
                      </svg>
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
                            <img src={HYBRID_ASSETS.muLogo} alt="东航" style={{ width: 15, height: 14, mixBlendMode: 'multiply' }} />
                            东方航空 MU5101
                          </span>
                        </div>
                        <div className="ptp-times" style={{ marginBottom: 12 }}>
                          <div className="ptp-tcol">
                            <strong style={randomState === 'full' ? { color: '#9aa49f' } : undefined}>上海虹桥</strong>
                            <span style={randomState === 'full' ? { color: '#bcc5c0' } : undefined}>虹桥国际机场 T2</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <RandomPlaneSvg muted={randomState === 'full'} />
                          </div>
                          <div className="ptp-tcol is-r">
                            <strong style={randomState === 'full' ? { color: '#9aa49f' } : undefined}>北京大兴</strong>
                            <span style={randomState === 'full' ? { color: '#bcc5c0' } : undefined}>大兴国际机场</span>
                          </div>
                        </div>
                        <div style={{ background: '#f5f7f6', borderRadius: 10, padding: '10px 12px', fontSize: 12, color: '#56655d', lineHeight: 1.7, marginBottom: 14 }}>
                          <div>乘机人信息：张*三</div>
                          <div>电子客票号：781-2345678901</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px dashed #e6ece9' }}>
                          {randomState === 'available' ? (
                            <>
                              <span style={{ fontSize: 12, fontWeight: 600, color: '#29a962' }}>● 有氧舱名额：充足</span>
                              <button
                                type="button"
                                className="ptp-btn-green"
                                style={{ height: 28, padding: '0 15px', fontSize: 11.5 }}
                                onClick={() => { setSelectedFlightId('MU5101'); navigate('form'); }}
                              >
                                立即预约
                              </button>
                            </>
                          ) : (
                            <>
                              <span style={{ fontSize: 12, fontWeight: 600, color: '#d45c56' }}>● 本航班宠物名额已满</span>
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
                          onClick={() => {
                            const next = randomState === 'available' ? 'full' : 'available';
                            setRandomState(next);
                            showToast(next === 'full' ? '已切换：本航班宠物名额已满兜底态' : '已切回：有氧舱名额充足');
                          }}
                        >
                          已购票未显示？尝试手动导入 ›
                        </button>
                      </div>
                    </>
                  )}

                  <div style={{ margin: '0 16px', fontSize: 11, color: '#839189', lineHeight: 1.72 }}>
                    <strong style={{ display: 'block', fontSize: 12, color: '#394941', marginBottom: 5 }}>温馨提示</strong>
                    1、请不晚于航班<strong style={{ color: '#2f3d36' }}>起飞前90分钟</strong>到达宠物专属值机柜台办理乘机手续。<br />
                    2、预约成功代表您具备托运名额资格，具体是否可以成行，请以现场工作人员<strong style={{ color: '#2f3d36' }}>审核为准，审核标准详见</strong> <span style={{ color: '#2eb56b' }}>《宠物同机飞(托运)服务运输规则》</span>。<br />
                    3、仅有氧舱机型可承运宠物，若遇机型临时调整等特殊情况，<strong style={{ color: '#2f3d36' }}>可能导致无法承运宠物</strong>，现场工作人员将协助旅客妥善处置后续事宜。<br />
                    4、已预约宠物同机飞(托运)服务的旅客，如遇航班临时变更，或因个人原因取消、改签行程，需及时登录航旅纵横APP/小程序<strong style={{ color: '#2f3d36' }}>主动取消预约</strong>，并按需<strong style={{ color: '#2f3d36' }}>重新申请</strong>。<br />
                    5、宠物同机飞(托运)服务预约申请截止时间为航班计划起飞前60分钟。
                  </div>
                </div>
                <div className="ptp-home-bar" />
              </div>
            )}

            {/* ══ 02A: SOLO SEARCH (Uncut 1:1 Figma Airplane Header + Real Search Controls) ══ */}
            {screen === 'soloSearch' && (
              <div key="soloSearch" className="ptp-view" style={{ background: '#f4f6f5' }}>
                <div className="ptp-scroll">
                  <div className="ptp-figma-hdr">
                    <img src={HYBRID_ASSETS.soloHeader} alt="宠物单独飞" />
                    <button
                      type="button"
                      className="ptp-hdr-back"
                      style={{ top: '34%', height: '28%' }}
                      aria-label="返回"
                      onClick={goBack}
                    />
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
                      <svg width="16" height="16" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
                        <rect x="2.2" y="3.6" width="13.6" height="12" rx="2.4" stroke="#45b77c" strokeWidth="1.45" />
                        <path d="M5.8 2V4.8M12.2 2V4.8M2.5 7.4H15.5" stroke="#45b77c" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                      <span>{dateStr.split(' ')[0]}</span>
                      <span className="sub">{dateStr.split(' ')[1]}</span>
                    </button>

                    <button
                      type="button"
                      className="ptp-line-row"
                      style={{ borderBottom: 'none', paddingBottom: 6 }}
                      onClick={() => {
                        const idx = WEIGHT_OPTIONS.findIndex((w) => w.id === weightKey);
                        const next = WEIGHT_OPTIONS[(idx + 1) % WEIGHT_OPTIONS.length];
                        setWeightKey(next.id);
                        setWeightKg(next.sampleWeight);
                        setCrateOverride(null);
                        showToast(`已切换宠物预估总重：${next.label}（后续自动推荐对应航空箱）`);
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
                        <path d="M9 2.2L15 5.4V12.6L9 15.8L3 12.6V5.4L9 2.2Z" stroke="#45b77c" strokeWidth="1.45" strokeLinejoin="round" />
                        <path d="M3 5.4L9 8.6L15 5.4M9 8.6V15.8" stroke="#45b77c" strokeWidth="1.3" />
                      </svg>
                      <strong style={{ fontSize: 15.5 }}>
                        {WEIGHT_OPTIONS.find((w) => w.id === weightKey)?.label}
                      </strong>
                      <span className="sub">宠物预估总重量（含航空箱）</span>
                    </button>

                    <div className="ptp-promo-strip">
                      <span style={{ display: 'inline-block', padding: '0 4px', borderRadius: 3, background: '#e04f47', color: '#fff', fontSize: 9.5, marginRight: 5 }}>礼</span>
                      首单免费赠送宠物航空意外险 去领取!
                    </div>

                    <div className="ptp-search-cta-row">
                      <button type="button" className="ptp-btn-gold" onClick={() => navigate('flights')}>
                        <strong>查询方案</strong>
                        <span>● 40+国内航空公司直销</span>
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
                    <strong style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#24342c', marginBottom: 6 }}>
                      <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                        <path d="M9 2.5A4.2 4.2 0 0 0 6.2 10C6.8 10.6 7.1 11.2 7.2 12H10.8C10.9 11.2 11.2 10.6 11.8 10A4.2 4.2 0 0 0 9 2.5Z" stroke="#24342c" strokeWidth="1.35" />
                        <path d="M7.4 14.4H10.6" stroke="#24342c" strokeWidth="1.35" strokeLinecap="round" />
                      </svg>
                      货运托运须知：
                    </strong>
                    <div><span style={{ color: '#2eb56b', marginRight: 5 }}>•</span>单独货运不与主人客票绑定，宠物独立由货运站安排舱机。</div>
                    <div><span style={{ color: '#2eb56b', marginRight: 5 }}>•</span>宽体客机货舱或全货机均配置独立供氧与恒温控制系统。</div>
                  </div>
                </div>
                <div className="ptp-home-bar" />
              </div>
            )}

            {/* ══ 03: FLIGHT LIST (1:1 Continuous Emerald World-Map Header + Floating White Filter Card + 1:1 Flight Cards) ══ */}
            {screen === 'flights' && (
              <div key="flights" className="ptp-view" style={{ background: '#f4f6f5' }}>
                <div className="ptp-emerald-bg-layer" />
                <div style={{ position: 'relative', zIndex: 4, flexShrink: 0, color: '#ffffff' }}>
                  <StatusBar light />
                  <div className="ptp-nav">
                    <button type="button" className="ptp-nav-btn" onClick={goBack}><BackSvg color="#fff" /></button>
                    <button
                      type="button"
                      className="ptp-nav-title"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: '#ffffff' }}
                      onClick={() => { setFromIdx(toIdx); setToIdx(fromIdx); showToast('已互换出发与到达城市'); }}
                    >
                      <span>{fromCity.name}</span>
                      <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="8.5" stroke="#ffffff" strokeWidth="1.25" strokeOpacity="0.88" />
                        <path d="M5.8 11.2L14.2 8.2L11.5 11.4L10.3 13.5L9.4 11.2L5.8 11.2Z" fill="#ffffff" />
                      </svg>
                      <span>{toCity.name}</span>
                      <span style={{ fontSize: 10, opacity: 0.9 }}>▾</span>
                    </button>
                    <button type="button" className="ptp-nav-btn" onClick={() => showToast('航旅宠物专线 24h 在线')}>帮助</button>
                  </div>
                  <div className="ptp-meta-pill">
                    {dateStr.split(' ')[0]} (周三) &nbsp;|&nbsp; 宠物含箱{WEIGHT_OPTIONS.find((w) => w.id === weightKey)?.label.replace(/\s+/g, '')} &nbsp;|&nbsp; {tripType === 'oneway' ? '单程货运' : '往返货运'}
                  </div>
                </div>

                <div className="ptp-filter-card">
                  {[
                    { id: 'all', label: '综合排序 ▾' },
                    { id: 'wide', label: '宽体机' },
                    { id: 'mu', label: '东方航空 (2)' },
                    { id: 'ca', label: '中国国航 (1)' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      className={`ptp-fchip${(flightFilter === 'all' ? f.id === 'wide' : flightFilter === f.id) ? ' is-active' : ''}`}
                      onClick={() => setFlightFilter(f.id === 'wide' && flightFilter === 'wide' ? 'all' : f.id)}
                    >
                      {f.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="ptp-fchip"
                    onClick={() => showToast('当前航线暂无南方航空有氧舱执飞')}
                  >
                    南方
                  </button>
                  <button
                    type="button"
                    className="ptp-fchip"
                    style={{ fontWeight: 700, color: '#1b2821' }}
                    onClick={() => { setFlightFilter('all'); showToast('已重置全部筛选条件'); }}
                  >
                    筛选
                  </button>
                </div>

                <div className="ptp-scroll" style={{ position: 'relative', zIndex: 4, padding: '10px 12px 24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                    {filteredFlights.map((fl) => (
                      <div key={fl.id} className={`ptp-flight-card${fl.hasRecBadge ? ' has-rec' : ''}`}>
                        {fl.hasRecBadge && <img src={HYBRID_ASSETS.recBadge} alt="官方推荐全包无忧" className="ptp-rec-img" />}
                        <div className="ptp-air-row">
                          <img src={fl.airlineKey === 'mu' ? HYBRID_ASSETS.muLogo : HYBRID_ASSETS.caLogo} alt={fl.airline} style={{ mixBlendMode: 'multiply' }} />
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
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', margin: '4px 0' }}>
                              <div className="ptp-tmid-line" style={{ flex: 1, margin: 0 }} />
                              <span style={{ fontSize: 11, color: '#bfc9c3', padding: '0 3px', lineHeight: 1 }}>✈</span>
                              <div className="ptp-tmid-line" style={{ flex: 1, margin: 0 }} />
                            </div>
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
                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid #eef1f0' }}>
                          <div>
                            <div style={{ fontSize: 10.5, color: '#86948c' }}>{fl.priceLabel}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                              <span className="ptp-price-num">
                                <em style={{ fontStyle: 'normal', fontSize: 13, marginRight: 2 }}>¥</em>
                                {fl.price}
                              </span>
                              {fl.scarcity && (
                                <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 5, background: '#fff3e6', color: '#d88240', fontWeight: 600 }}>
                                  {fl.scarcity}
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            type="button"
                            className="ptp-btn-buy"
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

            {/* ══ 04: PLAN DETAIL (1:1 Continuous Emerald Header + Scroll-Reactive Sticky White Nav + Real Long Scroll) ══ */}
            {screen === 'detail' && (
              <div key="detail" className="ptp-view" style={{ background: '#f4f6f5' }}>
                <div className="ptp-emerald-bg-layer" style={{ height: 268, opacity: detailScrolled ? 0 : 1, transition: 'opacity 0.2s ease' }} />
                <div className={`ptp-chrome-top${detailScrolled ? ' is-scrolled' : ''}`}>
                  <StatusBar light={!detailScrolled} />
                  <div className="ptp-nav">
                    <button type="button" className="ptp-nav-btn" onClick={goBack}>
                      <BackSvg color={detailScrolled ? '#16221c' : '#fff'} />
                    </button>
                    <span className="ptp-nav-title">方案详情</span>
                    <span className="ptp-nav-btn" />
                  </div>
                </div>

                <div
                  className="ptp-scroll"
                  style={{ position: 'relative', zIndex: 4, paddingTop: 6 }}
                  onScroll={(e) => setDetailScrolled(e.currentTarget.scrollTop > 110)}
                >
                  <div style={{ margin: '0 12px 12px', padding: '13px 14px', borderRadius: 15, background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.22)', color: '#ffffff', position: 'relative', overflow: 'hidden' }}>
                    {selectedFlight.hasRecBadge && (
                      <img src={HYBRID_ASSETS.recBadge} alt="官方推荐" style={{ position: 'absolute', top: 0, right: 0, height: 22, borderRadius: '0 15px 0 9px' }} />
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 700, marginBottom: 5 }}>
                      {selectedFlight.airlineKey === 'mu' ? <MuWhiteSvg /> : <img src={HYBRID_ASSETS.caLogo} alt="" style={{ width: 16, height: 15 }} />}
                      <span>{selectedFlight.airline} {selectedFlight.code}</span>
                    </div>
                    <div style={{ fontSize: 11.5, opacity: 0.94, marginBottom: 9 }}>
                      {dateStr.split(' ')[0]} (周三) &nbsp;|&nbsp; 宠物含箱 ≤ 15kg
                    </div>
                    <div style={{ display: 'flex', gap: 7 }}>
                      <span style={{ fontSize: 10.5, padding: '2.5px 9px', borderRadius: 5, background: 'rgba(0,0,0,0.14)' }}>{selectedFlight.aircraft}</span>
                      <span style={{ fontSize: 10.5, padding: '2.5px 9px', borderRadius: 5, background: 'rgba(0,0,0,0.14)' }}>{selectedFlight.oxygenTag}</span>
                    </div>
                  </div>

                  <div className="ptp-card">
                    <div className="ptp-times" style={{ marginBottom: 0 }}>
                      <div className="ptp-tcol">
                        <small>交接</small>
                        <strong>{selectedFlight.handoffTime}</strong>
                        <span>{fromCity[selectedFlight.fromStationKey]}</span>
                      </div>
                      <div className="ptp-tmid">
                        <div>{selectedFlight.takeoffText}</div>
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', margin: '4px 0' }}>
                          <div className="ptp-tmid-line" style={{ flex: 1, margin: 0 }} />
                          <span style={{ fontSize: 11, color: '#bfc9c3', padding: '0 3px', lineHeight: 1 }}>✈</span>
                          <div className="ptp-tmid-line" style={{ flex: 1, margin: 0 }} />
                        </div>
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, marginTop: 6, borderTop: '1px solid #f1f4f2', fontSize: 14, fontWeight: 700 }}>
                      <span>方案预估总价</span>
                      <span style={{ color: '#e45044', fontSize: 18 }}>¥ {selectedFlight.price}</span>
                    </div>
                  </div>

                  <div className="ptp-card">
                    <h4 className="ptp-sec-h">托运限制及健康要求</h4>
                    <div className="ptp-alert is-red">
                      <span style={{ width: 15, height: 15, marginTop: 1, borderRadius: '50%', background: '#e34f47', color: '#fff', fontSize: 10, fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>!</span>
                      <div>
                        <strong>严格禁飞品种</strong>
                        短鼻类猫犬（如法斗、巴哥、加菲猫、波斯猫等）由于高空易窒息，属于民航禁运品种，本方案不支持承运。
                      </div>
                    </div>
                    <div className="ptp-alert is-green">
                      <span style={{ width: 15, height: 15, marginTop: 1, borderRadius: '50%', background: '#2eb66b', color: '#fff', fontSize: 10, fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>i</span>
                      <div>
                        <strong>健康及适运状态</strong>
                        宠物年龄须在8周至10周岁内，处于非怀孕、非术后康复期。为了起飞安全，交接前4小时请务必让宠物保持断食。
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ptp-sticky-bar">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: 10, color: '#83918a' }}>方案预估总价</div>
                      <div className="ptp-price-num" style={{ fontSize: 20 }}>
                        <em style={{ fontStyle: 'normal', fontSize: 12, marginRight: 2 }}>¥</em>
                        {selectedFlight.price}
                      </div>
                    </div>
                    <button type="button" className="ptp-btn-green-full" style={{ width: 160, height: 38, fontSize: 13.5 }} onClick={() => navigate('form')}>
                      前往填写订单
                    </button>
                  </div>
                </div>
                <div className="ptp-home-bar" />
              </div>
            )}

            {/* ══ 05: REAL SCROLLABLE & INTERACTIVE FORM (1:1 Continuous Emerald Header + Scroll-Reactive Sticky White Nav) ══ */}
            {screen === 'form' && (
              <div key="form" className="ptp-view" style={{ background: '#f4f6f5' }}>
                <div className="ptp-emerald-bg-layer" style={{ height: 220, opacity: formScrolled ? 0 : 1, transition: 'opacity 0.2s ease' }} />
                <div className={`ptp-chrome-top${formScrolled ? ' is-scrolled' : ''}`}>
                  <StatusBar light={!formScrolled} />
                  <div className="ptp-nav">
                    <button type="button" className="ptp-nav-btn" onClick={goBack}>
                      <BackSvg color={formScrolled ? '#16221c' : '#fff'} />
                    </button>
                    <span className="ptp-nav-title">填写订单信息</span>
                    <span className="ptp-nav-btn" />
                  </div>
                  {!formScrolled && (
                    <div className="ptp-steps">
                      <span className="is-on">✓ 选航班</span>
                      <i />
                      <span className="is-on"><span className="ptp-step-num">2</span>填信息</span>
                      <i />
                      <span>3 支付</span>
                    </div>
                  )}
                </div>

                <div
                  className="ptp-scroll"
                  style={{ position: 'relative', zIndex: 4, paddingTop: 10 }}
                  onScroll={(e) => setFormScrolled(e.currentTarget.scrollTop > 56)}
                >
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
                          <span className="ptp-crate-cap">{c.cap}</span>
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
                        <span
                          style={{
                            fontSize: 9.5,
                            padding: '1px 6px',
                            borderRadius: 4,
                            background: photoUploaded ? '#2eb66b' : '#ffffff',
                            border: photoUploaded ? 'none' : '1px solid #f09590',
                            color: photoUploaded ? '#fff' : '#df4b44',
                            fontWeight: 600,
                          }}
                        >
                          {photoUploaded ? '已上传' : '未上传'}
                        </span>
                      </button>

                      <button type="button" className="ptp-upload-slot is-ocr" style={{ position: 'relative' }} onClick={() => setModal('ocr')}>
                        <div style={{ width: '100%', background: '#e3e8ec', padding: '14px 4px 12px', position: 'relative' }}>
                          <span style={{ position: 'absolute', top: 5, right: 5, width: 13, height: 13, borderRadius: '50%', background: '#78857e', color: '#fff', fontSize: 9, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>×</span>
                          <span style={{ fontSize: 10.5, color: '#8a959e' }}>[检疫证原件]</span>
                        </div>
                        <div style={{ width: '100%', padding: '5px 5px 7px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 3 }}>
                          <span style={{ fontSize: 9, padding: '1px 6px', borderRadius: 4, background: '#3ec172', color: '#fff', fontWeight: 700 }}>OCR已提</span>
                          <strong style={{ fontSize: 10.5 }}>动物检疫合格证</strong>
                        </div>
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
                      <strong style={{ fontSize: 12, color: addonValuation ? '#249b59' : '#7e8d85' }}>{addonValuation ? '¥40' : '按比例'}</strong>
                    </button>
                  </div>

                  <div className="ptp-card">
                    <strong style={{ display: 'block', fontSize: 14, marginBottom: 8 }}>订单备注 <span style={{ fontSize: 11.5, fontWeight: 400, color: '#7d8c84' }}>(选填)</span></strong>
                    <textarea
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      placeholder="例如：狗狗比较胆小，请轻声安抚"
                      rows={2}
                      style={{ width: '100%', height: 60, resize: 'none', borderRadius: 10, border: '1px solid #e4ebe7', background: '#f7f8f9', padding: '9px 11px', fontSize: 12, fontFamily: 'inherit', outline: 'none' }}
                    />
                  </div>
                </div>

                <div className="ptp-sticky-bar" style={{ paddingTop: 0 }}>
                  {formMissing.length > 0 && (
                    <button
                      type="button"
                      style={{
                        width: 'calc(100% + 28px)',
                        marginLeft: -14,
                        marginBottom: 8,
                        padding: '7px 12px',
                        background: '#fdf2f1',
                        color: '#e16a64',
                        fontSize: 11,
                        fontWeight: 500,
                        textAlign: 'center',
                      }}
                      onClick={() => showToast(`待完善：${formMissing.join('、')}（可点右侧「一键补全必填项」）`)}
                    >
                      △ 还有 {formMissing.length} 项未正确填写，请完善后提交
                    </button>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, fontSize: 10.5, color: '#6b7b72', marginBottom: 9, paddingTop: formMissing.length > 0 ? 0 : 10 }}>
                    <span>我已阅读并同意以下条款：<em style={{ fontStyle: 'normal', color: '#249b59' }}>《承运方活体免责声明》</em></span>
                    <button type="button" className={`ptp-chk${agreed ? ' is-on' : ''}`} style={{ borderRadius: '50%', marginTop: 0 }} onClick={() => setAgreed((v) => !v)}>
                      {agreed ? '✓' : ''}
                    </button>
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
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px 68px', textAlign: 'center' }}>
                  <img src={HYBRID_ASSETS.successDog} alt="提交成功" style={{ width: 128, height: 126, objectFit: 'contain', marginBottom: 14, mixBlendMode: 'multiply' }} />
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: '#19221e', margin: '0 0 8px' }}>订单提交成功</h3>
                  <p style={{ fontSize: 11.5, color: '#8a958f', lineHeight: 1.65, margin: '0 0 38px' }}>
                    您的宠物托运申请已进入系统<br />预计 15 分钟内为您锁定舱位
                  </p>
                  <button
                    type="button"
                    className="ptp-btn-green-full"
                    style={{ height: 40, background: 'linear-gradient(90deg, #43c192 0%, #24b358 100%)', fontSize: 13.5 }}
                    onClick={() => navigate('tracking')}
                  >
                    查看订单详情
                  </button>
                  <button
                    type="button"
                    style={{ width: '100%', height: 40, borderRadius: 999, background: '#d0d3d2', color: '#19221e', fontSize: 13.5, fontWeight: 500, marginTop: 12 }}
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
                  <button type="button" style={{ fontSize: 12, color: '#5c6b63' }} onClick={() => showToast('暂无可开票订单')}>我的发票</button>
                </div>
                <div className="ptp-ord-tabs">
                  {['全部', '待支付', '处理中', '已完成', '售后/退改'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={`ptp-ord-tab${orderTab === t ? ' is-active' : ''}`}
                      onClick={() => setOrderTab(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className="ptp-ord-filters">
                  <button type="button" className="ptp-ord-pill" onClick={() => showToast('当前筛选：全部订单')}>全部订单 ▾</button>
                  <button type="button" className="ptp-ord-pill" onClick={() => showToast('按最近下单日期排序')}>下单日期 ▾</button>
                  <button
                    type="button"
                    style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#55635c' }}
                    onClick={() => setOnlyValidOrders((v) => !v)}
                  >
                    <span className={`ptp-chk${onlyValidOrders ? ' is-on' : ''}`} style={{ width: 14, height: 14, borderRadius: '50%', marginTop: 0, fontSize: 9 }}>
                      {onlyValidOrders ? '✓' : ''}
                    </span>
                    只看有效订单
                  </button>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px 68px', textAlign: 'center' }}>
                  <img src={HYBRID_ASSETS.emptyDog} alt="暂无订单" style={{ width: 114, height: 90, objectFit: 'contain', marginBottom: 10, mixBlendMode: 'multiply' }} />
                  <h3 style={{ fontSize: 15.5, fontWeight: 700, margin: '0 0 22px', color: '#1b2821' }}>暂无订单</h3>
                  <button type="button" className="ptp-btn-green-full" style={{ width: 196 }} onClick={() => navigate('soloSearch')}>
                    去预约宠物出行
                  </button>
                </div>
                <div className="ptp-home-bar" />
              </div>
            )}

            {/* ══ 07: LIVE TRACKING ON 1:1 AMAP ══ */}
            {screen === 'tracking' && (() => {
              const isArrived = trackStageIdx === 4;
              const stagePct = `${(trackStageIdx / 4) * 100}%`;
              const trackingCardBody = (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 11, color: '#6b7a72' }}>{trackStage.etaPrefix}</div>
                      <div style={{ fontSize: 27, fontWeight: 800, lineHeight: 1.1, fontVariantNumeric: 'tabular-nums' }}>{trackStage.etaTime}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#24342c', marginTop: 2 }}>{trackStage.etaPlace}</div>
                    </div>
                    <button
                      type="button"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11.5, fontWeight: 600, color: '#1e2c25', marginTop: 2 }}
                      onClick={() => showToast('已接通航旅纵横宠物专属客服')}
                    >
                      <img src={HYBRID_ASSETS.umetripCs} alt="客服" style={{ width: 16, height: 16, mixBlendMode: 'multiply' }} />
                      联系客服
                    </button>
                  </div>

                  <div style={{ fontSize: 10.3, color: '#2b3b33', paddingBottom: 11, borderBottom: '1px solid #f0f4f2', marginBottom: 11, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    请接机人 <strong>{contactName || '阿童'}</strong> 携带有效身份证件，至 <strong style={{ color: '#229d58' }}>T2 提取处</strong> 办理提宠。
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img src={HYBRID_ASSETS.petAvatar} alt="小航" style={{ width: 46, height: 46, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #bfead1' }} />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <strong style={{ fontSize: 16 }}>{petName || '小航'}</strong>
                          <span style={{ fontSize: 10, padding: '1px 7px', borderRadius: 999, background: '#e6f8ee', color: '#229a57', fontWeight: 600 }}>● 有氧舱</span>
                        </div>
                        <div style={{ fontSize: 10.5, color: '#8a9991', marginTop: 1 }}>{breed}</div>
                        <button
                          type="button"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10.5, color: '#9ba8a1', marginTop: 1 }}
                          onClick={() => showToast('已复制订单号：PT-20250519001')}
                        >
                          <span>订单号：PT-20250519001</span>
                          <CopySvg />
                        </button>
                      </div>
                    </div>
                    <button type="button" style={{ textAlign: 'right' }} onClick={() => setModal('price')}>
                      <div style={{ fontSize: 15.5, fontWeight: 700, color: '#7b8790', fontVariantNumeric: 'tabular-nums' }}>¥ 613</div>
                      <div style={{ fontSize: 10, color: '#8c9891', marginTop: 1 }}>明细 ▼</div>
                    </button>
                  </div>

                  <div style={{ background: '#f7f9f8', borderRadius: 12, padding: '11px 12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: 12.5, color: '#18251e' }}>全流程追踪</strong>
                      <button type="button" style={{ fontSize: 10.5, color: '#8c9a92' }} onClick={() => setModal('timeline')}>查看全部 ›</button>
                    </div>
                    <div className="ptp-stage-rail">
                      <div className="ptp-stage-track">
                        <div className="ptp-stage-track-fill" style={{ width: stagePct }} />
                      </div>
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
                    <button
                      type="button"
                      style={{ width: '100%', background: '#eff2f1', borderRadius: 9, padding: '8px 10px', fontSize: 10.8, color: '#4d5d55', lineHeight: 1.5, display: 'flex', alignItems: 'flex-start', gap: 8, textAlign: 'left' }}
                      onClick={() => setModal('timeline')}
                    >
                      <span style={{ color: '#2f3d36', fontWeight: 600, fontSize: 10.8, fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{trackStage.summaryTime}</span>
                      <span>{trackStage.summaryText}</span>
                    </button>
                  </div>
                </>
              );

              const mapStatusText =
                trackStageIdx === 0
                  ? '揽收中'
                  : trackStageIdx === 1
                    ? '安检中'
                    : trackStageIdx === 2
                      ? '运输中'
                      : '即将降落';

              const showArrivedLayout = isArrived;

              return (
                <div key="tracking" className="ptp-view" style={{ background: '#d8edf7' }}>
                  {showArrivedLayout ? (
                    <div className="ptp-arrived-view">
                      <img
                        src={HYBRID_ASSETS.mapArrivedFull}
                        alt="航旅纵横已到达高德实景地图"
                        className={`ptp-arrived-full-bg${mapSatellite ? ' is-sat' : ''}`}
                      />
                      {/* Interactive Back & Layer Buttons on Full Arrived Map */}
                      <button
                        type="button"
                        aria-label="返回"
                        onClick={goBack}
                        style={{ position: 'absolute', left: 10, top: 44, width: 34, height: 34, zIndex: 12 }}
                      />
                      <button
                        type="button"
                        aria-label="切换地图图层"
                        onClick={() => {
                          setMapSatellite((v) => !v);
                          showToast(!mapSatellite ? '已切换卫星地形视图' : '已切回标准平面地图');
                        }}
                        style={{ position: 'absolute', right: 8, top: 48, width: 34, height: 42, zIndex: 12 }}
                      />
                      <button
                        type="button"
                        aria-label="目的机场信息"
                        onClick={() => showToast('北京大兴国际机场 · T2 活体宠物专用提取处（恒温 22℃）')}
                        style={{ position: 'absolute', left: '33%', top: 48, width: 88, height: 26, zIndex: 12 }}
                      />

                      <div className="ptp-arrived-overlay">
                        <div className="ptp-arrived-card">{trackingCardBody}</div>

                        <div className="ptp-arrived-celeb">
                          <img
                            src={HYBRID_ASSETS.arrivedDog}
                            alt="小航平安落地"
                            className="ptp-arrived-dog-pop"
                          />
                          <div className="ptp-arrived-dog-shadow" aria-hidden="true" />
                          <div className="ptp-arrived-copy">
                            <strong>{petName || '小航'} 已平安落地{toCity.name}！</strong>
                            <div className="ptp-arrived-km">
                              总计飞行 <span>1760</span> 公里
                            </div>
                            <div className="ptp-arrived-sub">快给朋友们报个平安吧</div>
                          </div>
                          <button
                            type="button"
                            className="ptp-btn-green-full ptp-arrived-cta"
                            onClick={() => setModal('poster')}
                          >
                            <span>生成专属接机海报</span>
                            <CameraSvg />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="ptp-fly-view">
                      <img
                        src={HYBRID_ASSETS.mapFlyFull}
                        alt="航旅纵横高德实景航线图"
                        className={`ptp-arrived-full-bg${mapSatellite ? ' is-sat' : ''}`}
                      />
                      {/* Unified plain map status title (NO box/border — 1:1 with Figma 运输中 / 已到达) */}
                      <div className="ptp-map-stage-title">{mapStatusText}</div>
                      {/* Interactive Back Button */}
                      <button
                        type="button"
                        aria-label="返回"
                        onClick={goBack}
                        style={{ position: 'absolute', left: 10, top: 44, width: 34, height: 34, zIndex: 12 }}
                      />
                      {/* Interactive Map Layer (平面) */}
                      <button
                        type="button"
                        aria-label="切换地图图层"
                        onClick={() => {
                          setMapSatellite((v) => !v);
                          showToast(!mapSatellite ? '已切换卫星地形视图' : '已切回标准平面地图');
                        }}
                        style={{ position: 'absolute', right: 8, top: 48, width: 34, height: 42, zIndex: 12 }}
                      />
                      {/* Interactive Weather Toggle (天气) & Airport Pills + GPS */}
                      <button
                        type="button"
                        aria-label="航路天气"
                        onClick={() => setShowWeatherCard((v) => !v)}
                        style={{ position: 'absolute', right: 8, top: 92, width: 34, height: 38, zIndex: 12 }}
                      />
                      <button
                        type="button"
                        aria-label="目的机场信息"
                        onClick={() => showToast('北京大兴国际机场 · T2 活体宠物专用提取处（恒温 22℃）')}
                        style={{ position: 'absolute', left: '33%', top: 48, width: 88, height: 26, zIndex: 12 }}
                      />
                      <button
                        type="button"
                        aria-label="出发机场信息"
                        onClick={() => showToast('上海虹桥货运站 · 活体专用通道已完成交接')}
                        style={{ position: 'absolute', left: '62%', top: 304, width: 84, height: 28, zIndex: 12 }}
                      />
                      <button
                        type="button"
                        aria-label="重新定位"
                        onClick={() => showToast(`已定位至「${petName || '小航'}」当前航迹：高度 10,600m`)}
                        style={{ position: 'absolute', right: 8, top: 304, width: 32, height: 32, zIndex: 12 }}
                      />
                      {showWeatherCard && (
                        <div className="ptp-map-weather-card" onClick={() => setShowWeatherCard(false)}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginBottom: 3 }}>
                            <span>航路实时天气 · 适宜飞行</span>
                            <span style={{ color: '#249b59' }}>关闭 ×</span>
                          </div>
                          <div>出发：上海虹桥 晴 21℃ · 东南风 2 级</div>
                          <div>抵达：北京大兴 多云 19℃ · 有氧舱恒温 22℃</div>
                        </div>
                      )}

                      <div className="ptp-fly-overlay">
                        <div className="ptp-track-sheet">
                          {trackingCardBody}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="ptp-home-bar" />
                </div>
              );
            })()}

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
                  <div style={{ position: 'relative', marginBottom: 10 }}>
                    <input
                      value={breedSearch}
                      onChange={(e) => setBreedSearch(e.target.value)}
                      placeholder="搜索品种..."
                      style={{ width: '100%', height: 35, borderRadius: 10, border: 'none', background: '#f2f4f7', padding: '0 34px 0 12px', fontSize: 12.5, outline: 'none' }}
                    />
                    <span style={{ position: 'absolute', right: 11, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex' }}>
                      <SearchIconSvg />
                    </span>
                  </div>
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
                  <div className="ptp-sheet-body" style={{ maxHeight: 168, marginBottom: 14 }}>
                    {AGE_OPTIONS.map((o) => {
                      const active = ageObj.label === o.label;
                      return (
                        <button
                          key={o.label}
                          type="button"
                          style={{
                            width: '100%',
                            padding: active ? '11px 0' : '8px 0',
                            borderRadius: 10,
                            background: active ? '#f3f5f8' : 'transparent',
                            fontSize: active ? 17 : 13.5,
                            fontWeight: active ? 700 : 500,
                            color: !o.eligible ? '#d6453f' : active ? '#16221c' : '#9aa4ac',
                          }}
                          onClick={() => setAgeObj(o)}
                        >
                          {o.label}
                        </button>
                      );
                    })}
                  </div>
                  <div style={{ borderRadius: 11, padding: '11px 12px', background: ageObj.eligible ? '#f8faf9' : '#fff4f3', border: `1px solid ${ageObj.eligible ? '#e6ece9' : '#f7d5d2'}`, fontSize: 11, lineHeight: 1.58, color: '#7b8781' }}>
                    <strong style={{ display: 'block', fontSize: 12, marginBottom: 4, color: ageObj.eligible ? '#26a95f' : '#d6453f' }}>
                      ● {ageObj.eligible ? '年龄符合客舱同行要求' : '超出航空适航年龄限制'}
                    </strong>
                    {ageObj.note}
                  </div>
                  <button type="button" className="ptp-btn-green-full" style={{ marginTop: 14, borderRadius: 12 }} onClick={() => setModal(null)}>确认选择</button>
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
                  <div className="ptp-sheet-body" style={{ marginBottom: 12 }}>
                    {SAVED_ADDRESSES.map((a) => {
                      const active = (modal === 'addrSend' ? senderAddr.id : receiverAddr.id) === a.id;
                      return (
                        <button
                          key={a.id}
                          type="button"
                          className={`ptp-addon${active ? ' is-active' : ''}`}
                          onClick={() => { if (modal === 'addrSend') setSenderAddr(a); else setReceiverAddr(a); setModal(null); }}
                        >
                          <span
                            style={{
                              width: 15,
                              height: 15,
                              borderRadius: '50%',
                              marginTop: 2,
                              flexShrink: 0,
                              border: active ? '2px solid #2eb66b' : '1.5px solid #cbd4cf',
                              background: '#ffffff',
                            }}
                          />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 700 }}>{a.name} <span style={{ fontWeight: 400, color: '#7d8c84', marginLeft: 4 }}>{a.phone}</span></div>
                            <div style={{ fontSize: 11, color: '#6b7b72', marginTop: 4 }}>
                              <span style={{ padding: '1px 6px', borderRadius: 4, marginRight: 6, fontSize: 10, background: a.tagType === 'blue' ? '#eaf2ff' : '#e7f8ef', color: a.tagType === 'blue' ? '#2563eb' : '#249b59', fontWeight: 600 }}>{a.tag}</span>
                              {a.detail}
                            </div>
                          </div>
                          <span style={{ fontSize: 11, color: '#9aa8a0', alignSelf: 'center', flexShrink: 0 }}>编辑</span>
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      style={{ width: '100%', height: 40, borderRadius: 11, border: '1px solid #e5eae7', background: '#ffffff', fontSize: 12, color: '#5c6b63', fontWeight: 600, marginTop: 2 }}
                      onClick={() => showToast('演示模式：已支持快速切换预置地址')}
                    >
                      + 新增收货地址
                    </button>
                  </div>
                  <button type="button" className="ptp-btn-green-full" style={{ borderRadius: 12 }} onClick={() => setModal(null)}>确认选择</button>
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
                <div className="ptp-price-sheet" onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-sheet-grab" style={{ background: '#dbe2ea', width: 38 }} />
                  <div className="ptp-price-title">价格明细</div>
                  {screen === 'tracking' ? (
                    <>
                      <div className="ptp-price-row">
                        <span>运输费 · MU5103</span>
                        <span className="ptp-dots" />
                        <span className="ptp-pv">¥ 580</span>
                      </div>
                      <div className="ptp-price-row is-sub">
                        <span>货舱位 + 燃油</span>
                        <span style={{ flex: 1 }} />
                        <span className="ptp-pv">¥ 520</span>
                      </div>
                      <div className="ptp-price-row is-sub">
                        <span>机场操作费</span>
                        <span style={{ flex: 1 }} />
                        <span className="ptp-pv">¥ 60</span>
                      </div>
                      <div className="ptp-price-row" style={{ marginTop: 6 }}>
                        <span>增值服务（3 项）</span>
                        <span className="ptp-dots" />
                        <span className="ptp-pv">¥ 88</span>
                      </div>
                      <div className="ptp-price-row">
                        <span>保险 · 含 ¥20,000 基础</span>
                        <span className="ptp-dots" />
                        <span className="ptp-pv">¥ 20</span>
                      </div>
                      <div className="ptp-price-row">
                        <span>航旅会员折扣</span>
                        <span className="ptp-dots" />
                        <span className="ptp-pv is-disc">- ¥ 20</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="ptp-price-row">
                        <span>运输费 · {selectedFlight.code}</span>
                        <span className="ptp-dots" />
                        <span className="ptp-pv">¥ {selectedFlight.price}</span>
                      </div>
                      {selectedFlight.breakdown.slice(0, 3).map((b) => (
                        <div key={b.label} className="ptp-price-row is-sub">
                          <span>{b.label}</span>
                          <span style={{ flex: 1 }} />
                          <span className="ptp-pv">{b.price}</span>
                        </div>
                      ))}
                      {addonInsurance && (
                        <div className="ptp-price-row" style={{ marginTop: 6 }}>
                          <span>宠运无忧综合险</span>
                          <span className="ptp-dots" />
                          <span className="ptp-pv">¥ 19</span>
                        </div>
                      )}
                      {addonValuation && (
                        <div className="ptp-price-row">
                          <span>全额保价服务</span>
                          <span className="ptp-dots" />
                          <span className="ptp-pv">¥ 40</span>
                        </div>
                      )}
                      <div className="ptp-price-row">
                        <span>航旅会员折扣</span>
                        <span className="ptp-dots" />
                        <span className="ptp-pv is-disc">- ¥ 20</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {modal === 'timeline' && (
              <div className="ptp-mask" onClick={() => setModal(null)}>
                <div className="ptp-sheet" style={{ maxHeight: '82%' }} onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-sheet-grab" style={{ background: '#dbe2ea', width: 38 }} />
                  <div className="ptp-sheet-hd" style={{ marginBottom: 12 }}>
                    <span>全流程追踪</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 13px', borderRadius: 12, background: '#f6f8fa', marginBottom: 16 }}>
                    <img src={HYBRID_ASSETS.petAvatar} alt="小航" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <strong style={{ fontSize: 13.5, color: '#17231d' }}>{petName || '小航'} · {breed}</strong>
                      <div style={{ fontSize: 10.5, color: '#8a9991', marginTop: 2 }}>订单号：PT-20250519001</div>
                    </div>
                  </div>
                  <div className="ptp-sheet-body">
                    {FULL_TIMELINE_LOGS.filter((l) => l.minStage <= trackStageIdx).map((log, i, arr) => (
                      <div key={log.time} style={{ display: 'grid', gridTemplateColumns: '18px 1fr', gap: 11, paddingBottom: i === arr.length - 1 ? 6 : 16 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <span
                            style={{
                              width: i === 0 ? 10 : 8,
                              height: i === 0 ? 10 : 8,
                              borderRadius: '50%',
                              marginTop: 4,
                              background: i === 0 ? '#2eb66b' : '#cfd7df',
                              boxShadow: i === 0 ? '0 0 0 4px rgba(46, 182, 107, 0.22)' : 'none',
                            }}
                          />
                          {i < arr.length - 1 && (
                            <span
                              style={{
                                flex: 1,
                                width: 1.5,
                                marginTop: 5,
                                background: i === 0 ? 'linear-gradient(180deg, #3ec077 0%, #e5ece8 100%)' : '#edf1f4',
                              }}
                            />
                          )}
                        </div>
                        <div>
                          <div style={{ fontSize: 11.5, color: i === 0 ? '#249b59' : '#96a1a8', fontWeight: i === 0 ? 600 : 400 }}>{log.time}</div>
                          <div style={{ fontSize: 13.5, fontWeight: 700, color: '#17231d', margin: '3px 0 4px' }}>{log.title}</div>
                          <div style={{ fontSize: 11.5, color: '#617068', lineHeight: 1.6 }}>{log.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ══ 08: PEAK-END SHARE POSTER (1:1 Figma Ticket Notches, Brush Highlight, Scalloped Avatar & Live Data) ══ */}
            {modal === 'poster' && (
              <div className="ptp-mask" onClick={() => setModal(null)}>
                <div style={{ padding: '0 16px 16px', marginTop: 'auto' }} onClick={(e) => e.stopPropagation()}>
                  <div className="ptp-poster-card">
                    <img src={HYBRID_ASSETS.posterHeader} alt="全程实时看得见 安心宠物托运" style={{ display: 'block', width: '100%', height: 'auto' }} />
                    <div className="ptp-poster-ticket">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 14 }}>
                        <div className="ptp-poster-avatar-wrap">
                          <svg width="50" height="50" viewBox="0 0 64 64" fill="none" style={{ position: 'absolute', inset: 0 }}>
                            <path d="M32 2C35.2 2 37.2 5.4 40.2 6.2C43.2 7 46.8 5.2 49.4 7.2C52 9.2 51.6 13.2 53.6 15.6C55.6 18 59.6 18.6 60.4 21.6C61.2 24.6 58.6 27.6 58.6 30.8C58.6 34 61.2 37 60.4 40C59.6 43 55.6 43.6 53.6 46C51.6 48.4 52 52.4 49.4 54.4C46.8 56.4 43.2 54.6 40.2 55.4C37.2 56.2 35.2 59.6 32 59.6C28.8 59.6 26.8 56.2 23.8 55.4C20.8 54.6 17.2 56.4 14.6 54.4C12 52.4 12.4 48.4 10.4 46C8.4 43.6 4.4 43 3.6 40C2.8 37 5.4 34 5.4 30.8C5.4 27.6 2.8 24.6 3.6 21.6C4.4 18.6 8.4 18 10.4 15.6C12.4 13.2 12 9.2 14.6 7.2C17.2 5.2 20.8 7 23.8 6.2C26.8 5.4 28.8 2 32 2Z" fill="#bcf0d2" />
                          </svg>
                          <img src={HYBRID_ASSETS.petAvatar} alt="小航" />
                        </div>
                        <div>
                          <div style={{ fontSize: 15.5, fontWeight: 800, color: '#15221b', lineHeight: 1.25 }}>
                            {petName || '小航'}{' '}
                            <span className="ptp-poster-brush-wrap">
                              平安落地{toCity.name}！
                              <svg className="ptp-poster-brush-svg" viewBox="0 0 120 12" preserveAspectRatio="none" fill="none">
                                <path d="M2 9.5C28 4.5 68 3.5 117 6.5" stroke="#aef0ca" strokeWidth="5.5" strokeLinecap="round" />
                              </svg>
                            </span>
                          </div>
                          <div style={{ fontSize: 11.5, color: '#1d2b24', fontWeight: 700, marginTop: 4 }}>
                            <span style={{ color: '#1da15c', fontSize: 13 }}>1760</span> 公里&nbsp;
                            <span style={{ color: '#1da15c', fontSize: 13 }}>2</span> 小时
                            <span style={{ color: '#1da15c', fontSize: 13 }}> 40</span> 分 的奔赴
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '4px 2px 6px' }}>
                        <div>
                          <div style={{ fontSize: 19, fontWeight: 800, fontVariantNumeric: 'tabular-nums', color: '#16221c' }}>18:40</div>
                          <div style={{ fontSize: 10.5, color: '#7a8a82', marginTop: 1 }}>虹桥机场</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <span style={{ color: '#cce6d8', letterSpacing: 2, fontSize: 11 }}>···</span>
                          <img src={HYBRID_ASSETS.posterPlane} alt="" style={{ width: 52, height: 28, objectFit: 'contain' }} />
                          <span style={{ color: '#cce6d8', letterSpacing: 2, fontSize: 11 }}>···</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: 19, fontWeight: 800, fontVariantNumeric: 'tabular-nums', color: '#16221c' }}>20:40</div>
                          <div style={{ fontSize: 10.5, color: '#7a8a82', marginTop: 1 }}>大兴机场</div>
                        </div>
                      </div>

                      <div className="ptp-poster-divider" />

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10.5, color: '#8a9991' }}>
                        <div>
                          <div style={{ fontWeight: 500 }}>@TiceeZz</div>
                          <div style={{ marginTop: 2 }}>2026/05/20 周三</div>
                        </div>
                        <img src={HYBRID_ASSETS.posterQr} alt="航旅纵横小程序码" style={{ width: 40, height: 40 }} />
                      </div>
                    </div>
                    <img src={HYBRID_ASSETS.posterSkyline} alt="" className="ptp-poster-skyline" />
                  </div>
                </div>

                <div className="ptp-sheet" style={{ paddingTop: 14 }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ textAlign: 'center', fontSize: 14.5, fontWeight: 700, color: '#162238', marginBottom: 10 }}>分享至</div>
                  <div style={{ position: 'relative' }}>
                    <img src={HYBRID_ASSETS.shareBar} alt="微信 朋友圈 QQ 保存图片" style={{ display: 'block', width: '100%', height: 'auto', mixBlendMode: 'multiply' }} />
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
