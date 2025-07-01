// App State Management
class AppState {
    constructor() {
        this.currentPage = 'home';
        this.selectedRestaurant = null;
        this.showTasteProfile = false;
        this.showMap = false;
        this.showSearch = false;
        this.sidebarOpen = false;
        this.isMobile = window.innerWidth < 1024;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.renderCurrentPage();
        this.handleResize();
    }
    
    bindEvents() {
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileSidebarClose = document.getElementById('mobile-sidebar-close');
        const sidebarOverlay = document.getElementById('mobile-sidebar-overlay');
        const sidebarBackdrop = sidebarOverlay?.querySelector('.sidebar-backdrop');
        
        mobileMenuBtn?.addEventListener('click', () => this.toggleSidebar());
        mobileSidebarClose?.addEventListener('click', () => this.toggleSidebar());
        sidebarBackdrop?.addEventListener('click', () => this.toggleSidebar());
        
        // Navigation items
        document.querySelectorAll('.nav-item, .bottom-nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const page = e.currentTarget.getAttribute('data-page');
                if (page) {
                    this.setCurrentPage(page);
                }
            });
        });
        
        // Map buttons
        const mobileMapBtn = document.getElementById('mobile-map-btn');
        const desktopMapBtn = document.getElementById('desktop-map-btn');
        
        mobileMapBtn?.addEventListener('click', () => this.showMapView());
        desktopMapBtn?.addEventListener('click', () => this.showMapView());
        
        // Desktop search
        const desktopSearchInput = document.getElementById('desktop-search-input');
        desktopSearchInput?.addEventListener('click', () => this.showSearchModal());
        
        // Window resize
        window.addEventListener('resize', () => this.handleResize());
        
        // Close modals on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModals();
            }
        });
    }
    
    handleResize() {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth < 1024;
        
        if (wasMobile !== this.isMobile) {
            // Hide sidebar when switching between mobile/desktop
            this.sidebarOpen = false;
            this.updateSidebarVisibility();
        }
    }
    
    toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
        this.updateSidebarVisibility();
    }
    
    updateSidebarVisibility() {
        const overlay = document.getElementById('mobile-sidebar-overlay');
        if (overlay) {
            overlay.classList.toggle('hidden', !this.sidebarOpen);
        }
    }
    
    setCurrentPage(page) {
        this.currentPage = page;
        this.sidebarOpen = false;
        this.showTasteProfile = false;
        this.showMap = false;
        this.selectedRestaurant = null;
        
        this.updateNavigation();
        this.updateSidebarVisibility();
        this.renderCurrentPage();
        this.updatePageTitle();
    }
    
    updateNavigation() {
        // Update active states
        document.querySelectorAll('.nav-item, .bottom-nav-item').forEach(item => {
            const page = item.getAttribute('data-page');
            item.classList.toggle('active', page === this.currentPage);
        });
    }
    
    updatePageTitle() {
        const titleMap = {
            'home': '홈',
            'search': '검색',
            'community': '커뮤니티',
            'profile': '프로필'
        };
        
        const pageTitle = document.getElementById('page-title');
        if (pageTitle) {
            pageTitle.textContent = this.showTasteProfile ? '입맛 프로필' : 
                                  this.showMap ? '지도' : 
                                  this.selectedRestaurant ? '맛집 상세' : 
                                  titleMap[this.currentPage] || this.currentPage;
        }
    }
    
    showMapView() {
        this.showMap = true;
        this.updatePageTitle();
        this.renderCurrentPage();
        
        // Hide bottom nav on mobile when showing map
        const bottomNav = document.getElementById('mobile-bottom-nav');
        if (bottomNav) {
            bottomNav.classList.add('hidden');
        }
    }
    
    hideMapView() {
        this.showMap = false;
        this.updatePageTitle();
        this.renderCurrentPage();
        
        // Show bottom nav on mobile
        const bottomNav = document.getElementById('mobile-bottom-nav');
        if (bottomNav) {
            bottomNav.classList.remove('hidden');
        }
    }
    
    showSearchModal() {
        if (!this.isMobile) {
            this.showSearch = true;
            const modal = document.getElementById('search-modal');
            if (modal) {
                modal.classList.remove('hidden');
                this.renderSearchModal();
            }
        }
    }
    
    hideSearchModal() {
        this.showSearch = false;
        const modal = document.getElementById('search-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }
    
    closeModals() {
        this.hideSearchModal();
    }
    
    setSelectedRestaurant(restaurant) {
        this.selectedRestaurant = restaurant;
        this.updatePageTitle();
        this.renderCurrentPage();
    }
    
    renderCurrentPage() {
        const content = document.getElementById('page-content');
        if (!content) return;
        
        if (this.showTasteProfile) {
            content.innerHTML = this.renderTasteProfile();
        } else if (this.showMap) {
            content.innerHTML = this.renderMap();
        } else if (this.selectedRestaurant) {
            content.innerHTML = this.renderRestaurantDetail();
        } else {
            switch (this.currentPage) {
                case 'home':
                    content.innerHTML = this.renderHome();
                    break;
                case 'search':
                    content.innerHTML = this.renderSearch();
                    break;
                case 'community':
                    content.innerHTML = this.renderCommunity();
                    break;
                case 'profile':
                    content.innerHTML = this.renderProfile();
                    break;
                default:
                    content.innerHTML = this.renderHome();
            }
        }
        
        this.bindPageEvents();
    }
    
    bindPageEvents() {
        // Restaurant cards
        document.querySelectorAll('.restaurant-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const restaurantId = e.currentTarget.getAttribute('data-restaurant-id');
                if (restaurantId) {
                    const restaurant = this.getRestaurantById(restaurantId);
                    if (restaurant) {
                        this.setSelectedRestaurant(restaurant);
                    }
                }
            });
        });
        
        // Back buttons
        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (this.selectedRestaurant) {
                    this.selectedRestaurant = null;
                } else if (this.showMap) {
                    this.hideMapView();
                } else if (this.showTasteProfile) {
                    this.showTasteProfile = false;
                }
                this.updatePageTitle();
                this.renderCurrentPage();
            });
        });
        
        // Taste profile button
        document.querySelectorAll('.taste-profile-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.showTasteProfile = true;
                this.updatePageTitle();
                this.renderCurrentPage();
            });
        });
    }
    
    renderSearchModal() {
        const content = document.querySelector('.search-modal-content');
        if (content) {
            content.innerHTML = this.renderSearchContent(true);
            
            // Bind close button
            const closeBtn = content.querySelector('.search-close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.hideSearchModal());
            }
        }
    }
    
    // Mock data
    getMockRestaurants() {
        return [
            {
                id: '1',
                name: '맛있는 국밥집',
                cuisine: '한식',
                distance: '도보 3분',
                rating: 4.7,
                reviewCount: 156,
                price: '8,000원~',
                tags: ['혼밥가능', '든든함', '깔끔한맛'],
                image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=300&h=200&fit=crop',
                description: '푸짐하고 깔끔한 국밥이 일품인 로컬 맛집입니다.',
                address: '서울시 강남구 역삼동 123-45',
                phone: '02-1234-5678',
                hours: '07:00 - 21:00',
                features: ['혼밥', '주차가능', '카드결제']
            },
            {
                id: '2',
                name: '스파이시 마라탕',
                cuisine: '중식',
                distance: '도보 7분',
                rating: 4.5,
                reviewCount: 89,
                price: '12,000원~',
                tags: ['매운맛', '푸짐함', '가성비'],
                image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=300&h=200&fit=crop',
                description: '정통 마라탕의 매운맛을 제대로 느낄 수 있는 곳입니다.',
                address: '서울시 강남구 역삼동 234-56',
                phone: '02-2345-6789',
                hours: '11:00 - 22:00',
                features: ['매운맛', '배달가능', '와이파이']
            },
            {
                id: '3',
                name: '로맨틱 이탈리안',
                cuisine: '양식',
                distance: '도보 10분',
                rating: 4.8,
                reviewCount: 234,
                price: '25,000원~',
                tags: ['분위기좋음', '데이트추천', '와인'],
                image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=300&h=200&fit=crop',
                description: '로맨틱한 분위기와 함께 정통 이탈리안 요리를 즐길 수 있습니다.',
                address: '서울시 강남구 역삼동 345-67',
                phone: '02-3456-7890',
                hours: '17:00 - 24:00',
                features: ['데이트', '와인바', '주차가능']
            }
        ];
    }
    
    getRestaurantById(id) {
        return this.getMockRestaurants().find(r => r.id === id);
    }
    
    // Page renderers
    renderHome() {
        const restaurants = this.getMockRestaurants();
        
        return `
            <div class="home-page fade-in">
                <div class="home-header">
                    <h1 class="home-greeting">안녕하세요! 👋</h1>
                    <p class="home-subtitle">오늘은 어떤 맛집을 찾아볼까요?</p>
                </div>
                
                <div class="section">
                    <div class="section-title">추천 맛집</div>
                    <div class="restaurant-grid">
                        ${restaurants.map(restaurant => `
                            <div class="card restaurant-card" data-restaurant-id="${restaurant.id}">
                                <div class="card-content">
                                    <img src="${restaurant.image}" alt="${restaurant.name}" class="restaurant-image">
                                    <div class="restaurant-info">
                                        <h3 class="restaurant-name">${restaurant.name}</h3>
                                        <button class="icon-btn">
                                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="restaurant-meta">
                                        <div class="star-rating">
                                            <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                            </svg>
                                            ${restaurant.rating}
                                        </div>
                                        <span>(${restaurant.reviewCount})</span>
                                        <span>•</span>
                                        <span>${restaurant.cuisine}</span>
                                    </div>
                                    <div class="restaurant-meta">
                                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <pin d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                                            <circle cx="12" cy="10" r="3"/>
                                        </svg>
                                        ${restaurant.distance}
                                        <span>•</span>
                                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <circle cx="12" cy="12" r="10"/>
                                            <polyline points="12,6 12,12 16,14"/>
                                        </svg>
                                        ${restaurant.price}
                                    </div>
                                    <div class="restaurant-tags">
                                        ${restaurant.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="section">
                    <button class="btn btn-outline taste-profile-btn" style="width: 100%;">
                        <svg class="icon" style="margin-right: 8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                        </svg>
                        입맛 프로필 설정하기
                    </button>
                </div>
            </div>
        `;
    }
    
    renderSearch() {
        return this.renderSearchContent(false);
    }
    
    renderSearchContent(isModal) {
        const restaurants = this.getMockRestaurants();
        
        return `
            <div class="search-page fade-in" style="padding-bottom: ${isModal ? '0' : '80px'}; height: ${isModal ? '100%' : 'auto'}; display: ${isModal ? 'flex' : 'block'}; flex-direction: ${isModal ? 'column' : 'initial'};">
                <div class="search-header" style="padding: 16px 24px; background: white; border-bottom: 1px solid var(--border); ${isModal ? 'flex-shrink: 0;' : ''}">
                    <div class="search-bar" style="margin-bottom: 16px;">
                        ${isModal ? `
                            <button class="search-close-btn icon-btn" style="margin-right: 12px;">
                                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="m18 6-12 12"/>
                                    <path d="m6 6 12 12"/>
                                </svg>
                            </button>
                        ` : ''}
                        <div style="position: relative; flex: 1;">
                            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="m21 21-4.35-4.35"/>
                            </svg>
                            <input type="text" placeholder="맛집, 음식 종류, 지역을 검색하세요" style="width: 100%; padding: 8px 12px 8px 40px; border: 1px solid var(--border); border-radius: 6px; background: var(--input-background);">
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 8px; overflow-x: auto; margin-bottom: 16px;">
                        <button class="btn btn-outline" style="flex-shrink: 0;">
                            <svg class="icon" style="margin-right: 4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>
                            혼밥
                        </button>
                        <button class="btn btn-outline" style="flex-shrink: 0;">
                            <svg class="icon" style="margin-right: 4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="m22 21-3-3"/>
                                <path d="M16 21v-2a4 4 0 0 0-2.5-3.7"/>
                                <circle cx="20" cy="8" r="3"/>
                            </svg>
                            친구와
                        </button>
                        <button class="btn btn-outline" style="flex-shrink: 0;">
                            <svg class="icon" style="margin-right: 4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
                            </svg>
                            매운맛
                        </button>
                        <button class="btn btn-outline" style="flex-shrink: 0;">카페</button>
                        <button class="btn btn-outline" style="flex-shrink: 0;">한식</button>
                    </div>
                </div>
                
                <div style="${isModal ? 'flex: 1; overflow-y: auto;' : ''} padding: 16px 24px;">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                        <h3>검색 결과 (${restaurants.length})</h3>
                        <button class="btn btn-ghost">거리순 정렬</button>
                    </div>
                    
                    <div class="restaurant-grid">
                        ${restaurants.map(restaurant => `
                            <div class="card restaurant-card" data-restaurant-id="${restaurant.id}">
                                <div class="card-content">
                                    <img src="${restaurant.image}" alt="${restaurant.name}" class="restaurant-image">
                                    <div class="restaurant-info">
                                        <h3 class="restaurant-name">${restaurant.name}</h3>
                                        <button class="icon-btn">
                                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="restaurant-meta">
                                        <div class="star-rating">
                                            <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                            </svg>
                                            ${restaurant.rating}
                                        </div>
                                        <span>(${restaurant.reviewCount})</span>
                                        <span>•</span>
                                        <span>${restaurant.cuisine}</span>
                                    </div>
                                    <div class="restaurant-meta">
                                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <pin d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                                            <circle cx="12" cy="10" r="3"/>
                                        </svg>
                                        ${restaurant.distance}
                                        <span>•</span>
                                        ${restaurant.price}
                                    </div>
                                    <div class="restaurant-tags">
                                        ${restaurant.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    renderCommunity() {
        return `
            <div class="community-page fade-in" style="padding: 24px 16px; padding-bottom: 80px;">
                <div class="section-title">커뮤니티</div>
                <div style="text-align: center; padding: 40px; color: var(--muted-foreground);">
                    <svg style="width: 64px; height: 64px; margin: 0 auto 16px; opacity: 0.5;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="m22 21-3-3"/>
                        <path d="M16 21v-2a4 4 0 0 0-2.5-3.7"/>
                        <circle cx="20" cy="8" r="3"/>
                    </svg>
                    <p>커뮤니티 기능은 준비 중입니다.</p>
                </div>
            </div>
        `;
    }
    
    renderProfile() {
        return `
            <div class="profile-page fade-in" style="padding: 24px 16px; padding-bottom: 80px;">
                <div class="section">
                    <div style="text-align: center; margin-bottom: 32px;">
                        <div style="width: 80px; height: 80px; background: var(--orange-500); border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
                            <svg style="width: 40px; height: 40px; color: white;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>
                        </div>
                        <h2>김우아</h2>
                        <p style="color: var(--muted-foreground); margin-top: 4px;">28세 • 직장인</p>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <button class="btn btn-outline taste-profile-btn" style="justify-content: flex-start;">
                            <svg class="icon" style="margin-right: 12px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>
                            입맛 프로필 관리
                        </button>
                        <button class="btn btn-outline" style="justify-content: flex-start;">
                            <svg class="icon" style="margin-right: 12px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                            </svg>
                            찜한 맛집
                        </button>
                        <button class="btn btn-outline" style="justify-content: flex-start;">
                            <svg class="icon" style="margin-right: 12px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M8 12h.01M12 12h.01M16 12h.01"/>
                                <path d="M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                            </svg>
                            내 리뷰
                        </button>
                        <button class="btn btn-outline" style="justify-content: flex-start;">
                            <svg class="icon" style="margin-right: 12px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="3"/>
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                            </svg>
                            설정
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderTasteProfile() {
        return `
            <div class="taste-profile-page fade-in" style="padding: 24px 16px; padding-bottom: 80px;">
                <div style="margin-bottom: 24px;">
                    <button class="back-btn btn btn-ghost" style="margin-bottom: 16px;">
                        <svg class="icon" style="margin-right: 8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="m12 19-7-7 7-7"/>
                            <path d="M19 12H5"/>
                        </svg>
                        뒤로
                    </button>
                    <h2>입맛 프로필</h2>
                    <p style="color: var(--muted-foreground); margin-top: 8px;">당신의 취향을 알려주세요!</p>
                </div>
                
                <div style="text-align: center; padding: 40px; color: var(--muted-foreground);">
                    <svg style="width: 64px; height: 64px; margin: 0 auto 16px; opacity: 0.5;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <p>입맛 프로필 설정 기능은 준비 중입니다.</p>
                </div>
            </div>
        `;
    }
    
    renderMap() {
        return `
            <div class="map-page fade-in" style="height: 100vh; position: relative;">
                <button class="back-btn btn btn-primary" style="position: absolute; top: 16px; left: 16px; z-index: 10;">
                    <svg class="icon" style="margin-right: 8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="m12 19-7-7 7-7"/>
                        <path d="M19 12H5"/>
                    </svg>
                    뒤로
                </button>
                <div style="width: 100%; height: 100%; background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: var(--muted-foreground);">
                    <div style="text-align: center;">
                        <svg style="width: 64px; height: 64px; margin: 0 auto 16px; opacity: 0.5;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <pin d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                            <circle cx="12" cy="10" r="3"/>
                        </svg>
                        <p>지도 기능은 준비 중입니다.</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderRestaurantDetail() {
        const restaurant = this.selectedRestaurant;
        
        return `
            <div class="restaurant-detail-page fade-in" style="padding-bottom: 80px;">
                <div style="position: relative;">
                    <img src="${restaurant.image}" alt="${restaurant.name}" style="width: 100%; height: 240px; object-fit: cover;">
                    <button class="back-btn btn btn-primary" style="position: absolute; top: 16px; left: 16px;">
                        <svg class="icon" style="margin-right: 8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="m12 19-7-7 7-7"/>
                            <path d="M19 12H5"/>
                        </svg>
                        뒤로
                    </button>
                </div>
                
                <div style="padding: 24px 16px;">
                    <div style="margin-bottom: 24px;">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                            <h1>${restaurant.name}</h1>
                            <button class="icon-btn">
                                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                                </svg>
                            </button>
                        </div>
                        
                        <div class="restaurant-meta" style="margin-bottom: 8px;">
                            <div class="star-rating">
                                <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                                ${restaurant.rating}
                            </div>
                            <span>(${restaurant.reviewCount})</span>
                            <span>•</span>
                            <span>${restaurant.cuisine}</span>
                            <span>•</span>
                            <span>${restaurant.price}</span>
                        </div>
                        
                        <p style="color: var(--muted-foreground); margin-bottom: 16px;">${restaurant.description}</p>
                        
                        <div class="restaurant-tags">
                            ${restaurant.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div style="border-top: 1px solid var(--border); padding-top: 24px; margin-bottom: 24px;">
                        <h3 style="margin-bottom: 16px;">매장 정보</h3>
                        
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <pin d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                                    <circle cx="12" cy="10" r="3"/>
                                </svg>
                                <span>${restaurant.address}</span>
                            </div>
                            
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                </svg>
                                <span>${restaurant.phone}</span>
                            </div>
                            
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"/>
                                    <polyline points="12,6 12,12 16,14"/>
                                </svg>
                                <span>${restaurant.hours}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div style="border-top: 1px solid var(--border); padding-top: 24px;">
                        <h3 style="margin-bottom: 16px;">편의시설</h3>
                        <div class="restaurant-tags">
                            ${restaurant.features.map(feature => `<span class="tag">${feature}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AppState();
});