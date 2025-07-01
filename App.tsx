import { useState } from 'react';
import styled from '@emotion/styled';
import { Home } from './components/Home';
import { Community } from './components/Community';
import { Search } from './components/Search';
import { Profile } from './components/Profile';
import { TasteProfile } from './components/TasteProfile';
import { RestaurantDetail } from './components/RestaurantDetail';
import { Map } from './components/Map';

// SVG Icons as React Components
const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const MessageCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
`;

const MobileHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 12px 16px;
  
  @media (min-width: 1024px) {
    display: none;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Button = styled.button<{ variant?: 'default' | 'ghost'; size?: 'sm' | 'md'; active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
  
  ${props => props.size === 'sm' ? `
    padding: 8px;
    font-size: 14px;
  ` : `
    padding: 12px 16px;
    font-size: 16px;
  `}
  
  ${props => props.variant === 'ghost' ? `
    background-color: transparent;
    color: #374151;
    
    &:hover {
      background-color: #f3f4f6;
    }
  ` : props.active ? `
    background-color: #f97316;
    color: white;
    
    &:hover {
      background-color: #ea580c;
    }
  ` : `
    background-color: #f3f4f6;
    color: #374151;
    
    &:hover {
      background-color: #e5e7eb;
    }
  `}
`;

const Logo = styled.div`
  width: 32px;
  height: 32px;
  background-color: #f97316;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  span {
    color: white;
    font-size: 14px;
    font-weight: bold;
  }
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  
  @media (min-width: 1024px) {
    display: none;
  }
`;

const OverlayBackground = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Sidebar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 320px;
  background-color: white;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const SidebarHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const SidebarHeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SidebarNav = styled.nav`
  padding: 16px;
`;

const NavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NavButton = styled(Button)<{ fullWidth?: boolean; justifyStart?: boolean }>`
  ${props => props.fullWidth && 'width: 100%;'}
  ${props => props.justifyStart && 'justify-content: flex-start;'}
  
  svg {
    margin-right: 12px;
  }
`;

const DesktopSidebar = styled.aside`
  display: none;
  
  @media (min-width: 1024px) {
    display: flex;
    width: 256px;
    flex-direction: column;
    position: fixed;
    top: 0;
    bottom: 0;
    background-color: white;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const DesktopSidebarHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const DesktopSidebarNav = styled.nav`
  flex: 1;
  padding: 24px;
`;

const DesktopSidebarFooter = styled.div`
  padding: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const MainContent = styled.main`
  flex: 1;
  
  @media (min-width: 1024px) {
    margin-left: 256px;
  }
`;

const DesktopHeader = styled.header`
  display: none;
  
  @media (min-width: 1024px) {
    display: block;
    position: sticky;
    top: 0;
    z-index: 40;
    background-color: white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 16px 24px;
  }
`;

const DesktopHeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PageTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  text-transform: capitalize;
`;

const SearchBarContainer = styled.div`
  flex: 1;
  max-width: 448px;
  margin: 0 32px;
`;

const SearchBarWrapper = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 40px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #f3f3f5;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #f97316;
  }
  
  &::placeholder {
    color: #6b7280;
  }
`;

const SearchInputIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
`;

const ContentArea = styled.div`
  max-width: 448px;
  margin: 0 auto;
  min-height: calc(100vh - 120px);
  
  @media (min-width: 1024px) {
    max-width: none;
    margin: 0;
    min-height: calc(100vh - 80px);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  
  @media (min-width: 1024px) {
    display: block;
  }
`;

const ModalContent = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  bottom: 16px;
  border-radius: 8px;
  background-color: white;
  overflow: hidden;
`;

const BottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 448px;
  background-color: white;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  
  @media (min-width: 1024px) {
    display: none;
  }
`;

const BottomNavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 8px 0;
`;

const BottomNavButton = styled(Button)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  height: auto;
  padding: 8px 12px;
  
  span {
    font-size: 12px;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  
  @media (min-width: 1024px) {
    height: 100vh;
  }
`;

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showTasteProfile, setShowTasteProfile] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 모바일에서는 검색 탭 포함, 데스크탑에서는 제외
  const mobileNavigationItems = [
    { id: 'home', label: '홈', icon: HomeIcon },
    { id: 'search', label: '검색', icon: SearchIcon },
    { id: 'community', label: '커뮤니티', icon: UsersIcon },
    { id: 'profile', label: '프로필', icon: UserIcon }
  ];

  const desktopNavigationItems = [
    { id: 'home', label: '홈', icon: HomeIcon },
    { id: 'community', label: '커뮤니티', icon: UsersIcon },
    { id: 'profile', label: '프로필', icon: UserIcon }
  ];

  const renderCurrentPage = () => {
    if (showTasteProfile) {
      return <TasteProfile onComplete={() => setShowTasteProfile(false)} />;
    }

    if (showMap) {
      return <Map onBack={() => setShowMap(false)} onRestaurantClick={setSelectedRestaurant} />;
    }
    
    if (selectedRestaurant) {
      return <RestaurantDetail restaurant={selectedRestaurant} onBack={() => setSelectedRestaurant(null)} />;
    }

    switch (currentPage) {
      case 'home':
        return <Home onRestaurantClick={setSelectedRestaurant} onTasteProfileClick={() => setShowTasteProfile(true)} />;
      case 'search':
        return <Search onRestaurantClick={setSelectedRestaurant} />;
      case 'community':
        return <Community onRestaurantClick={setSelectedRestaurant} />;
      case 'profile':
        return <Profile onTasteProfileClick={() => setShowTasteProfile(true)} />;
      default:
        return <Home onRestaurantClick={setSelectedRestaurant} onTasteProfileClick={() => setShowTasteProfile(true)} />;
    }
  };

  const getPageTitle = () => {
    if (showTasteProfile) return '입맛 프로필';
    if (showMap) return '지도';
    if (selectedRestaurant) return '맛집 상세';
    const item = desktopNavigationItems.find(item => item.id === currentPage);
    return item?.label || '검색';
  };

  return (
    <Container>
      {/* Mobile Header */}
      <MobileHeader>
        <HeaderContent>
          <HeaderLeft>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
            >
              <MenuIcon />
            </Button>
            <Logo>
              <span>맛</span>
            </Logo>
            <Title>맛집메이트</Title>
          </HeaderLeft>
          <HeaderRight>
            <Button variant="ghost" size="sm">
              <HeartIcon />
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircleIcon />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowMap(true)}
            >
              <MapPinIcon />
            </Button>
          </HeaderRight>
        </HeaderContent>
      </MobileHeader>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <Overlay>
          <OverlayBackground onClick={() => setSidebarOpen(false)} />
          <Sidebar>
            <SidebarHeader>
              <SidebarHeaderContent>
                <HeaderLeft>
                  <Logo>
                    <span>맛</span>
                  </Logo>
                  <Title>맛집메이트</Title>
                </HeaderLeft>
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                  <XIcon />
                </Button>
              </SidebarHeaderContent>
            </SidebarHeader>
            <SidebarNav>
              <NavList>
                {mobileNavigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavButton
                      key={item.id}
                      active={currentPage === item.id}
                      fullWidth
                      justifyStart
                      onClick={() => {
                        setCurrentPage(item.id);
                        setSidebarOpen(false);
                      }}
                    >
                      <Icon />
                      {item.label}
                    </NavButton>
                  );
                })}
              </NavList>
            </SidebarNav>
          </Sidebar>
        </Overlay>
      )}

      <FlexContainer>
        {/* Desktop Sidebar */}
        <DesktopSidebar>
          <DesktopSidebarHeader>
            <HeaderLeft>
              <Logo>
                <span>맛</span>
              </Logo>
              <Title>맛집메이트</Title>
            </HeaderLeft>
          </DesktopSidebarHeader>
          
          <DesktopSidebarNav>
            <NavList>
              {desktopNavigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavButton
                    key={item.id}
                    active={currentPage === item.id}
                    fullWidth
                    justifyStart
                    onClick={() => setCurrentPage(item.id)}
                  >
                    <Icon />
                    {item.label}
                  </NavButton>
                );
              })}
            </NavList>
          </DesktopSidebarNav>

          <DesktopSidebarFooter>
            <NavList>
              <NavButton 
                variant="ghost" 
                fullWidth
                justifyStart
                onClick={() => setShowMap(true)}
              >
                <MapPinIcon />
                지도
              </NavButton>
              <NavButton variant="ghost" fullWidth justifyStart>
                <HeartIcon />
                찜한 맛집
              </NavButton>
              <NavButton variant="ghost" fullWidth justifyStart>
                <MessageCircleIcon />
                알림
              </NavButton>
            </NavList>
          </DesktopSidebarFooter>
        </DesktopSidebar>

        {/* Main Content */}
        <MainContent>
          {/* Desktop Header */}
          <DesktopHeader>
            <DesktopHeaderContent>
              <div>
                <PageTitle>{getPageTitle()}</PageTitle>
              </div>
              
              {/* Desktop Search Bar */}
              <SearchBarContainer>
                <SearchBarWrapper>
                  <SearchInputIcon>
                    <SearchIcon />
                  </SearchInputIcon>
                  <SearchInput
                    placeholder="맛집, 음식 종류, 지역을 검색하세요"
                    readOnly
                    onClick={() => setShowSearch(true)}
                  />
                </SearchBarWrapper>
              </SearchBarContainer>
              
              <HeaderRight>
                <Button variant="ghost" size="sm">
                  <HeartIcon />
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircleIcon />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowMap(true)}
                >
                  <MapPinIcon />
                </Button>
              </HeaderRight>
            </DesktopHeaderContent>
          </DesktopHeader>

          {/* Page Content */}
          <ContentArea>
            {renderCurrentPage()}
          </ContentArea>
        </MainContent>
      </FlexContainer>

      {/* Desktop Search Modal Overlay */}
      {showSearch && (
        <ModalOverlay>
          <ModalContent>
            <div style={{ height: '100%' }}>
              <Search 
                onRestaurantClick={(restaurant) => {
                  setSelectedRestaurant(restaurant);
                  setShowSearch(false);
                }}
                onClose={() => setShowSearch(false)}
              />
            </div>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Mobile Bottom Navigation - Hide when showing map */}
      {!showMap && (
        <BottomNav>
          <BottomNavContent>
            {mobileNavigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <BottomNavButton
                  key={item.id}
                  active={currentPage === item.id}
                  size="sm"
                  onClick={() => setCurrentPage(item.id)}
                >
                  <Icon />
                  <span>{item.label}</span>
                </BottomNavButton>
              );
            })}
          </BottomNavContent>
        </BottomNav>
      )}
    </Container>
  );
}