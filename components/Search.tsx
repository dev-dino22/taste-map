import { useState } from 'react';
import styled from '@emotion/styled';

// SVG Icons
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const FlameIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
);

const CoffeeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
    <line x1="6" y1="1" x2="6" y2="4"/>
    <line x1="10" y1="1" x2="10" y2="4"/>
    <line x1="14" y1="1" x2="14" y2="4"/>
  </svg>
);

const UtensilsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
    <path d="M7 2v20"/>
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3z"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12,19 5,12 12,5"/>
  </svg>
);

// Styled Components
const Container = styled.div`
  padding-bottom: 80px;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  @media (min-width: 1024px) {
    padding-bottom: 0;
  }
`;

const SearchHeader = styled.div`
  padding: 16px;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  
  @media (min-width: 1024px) {
    padding: 24px;
  }
`;

const SearchBarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 48px 12px 40px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #f3f3f5;
  
  &:focus {
    outline: none;
    border-color: #f97316;
  }
  
  &::placeholder {
    color: #6b7280;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
`;

const Button = styled.button<{ variant?: 'default' | 'ghost' | 'outline'; size?: 'sm' | 'md'; active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
  gap: 4px;
  flex-shrink: 0;
  
  ${props => props.size === 'sm' ? `
    padding: 8px 12px;
    font-size: 14px;
  ` : `
    padding: 12px 16px;
    font-size: 16px;
  `}
  
  ${props => {
    if (props.variant === 'ghost') {
      return `
        background-color: transparent;
        color: #374151;
        
        &:hover {
          background-color: #f3f4f6;
        }
      `;
    } else if (props.variant === 'outline') {
      return `
        background-color: white;
        color: #374151;
        border: 1px solid rgba(0, 0, 0, 0.1);
        
        &:hover {
          background-color: #f3f4f6;
        }
      `;
    } else if (props.active) {
      return `
        background-color: #f97316;
        color: white;
        
        &:hover {
          background-color: #ea580c;
        }
      `;
    } else {
      return `
        background-color: #f3f4f6;
        color: #374151;
        
        &:hover {
          background-color: #e5e7eb;
        }
      `;
    }
  }}
`;

const FilterButton = styled(Button)`
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  padding: 8px;
`;

const Badge = styled.span<{ variant?: 'default' | 'secondary' | 'outline' }>`
  display: inline-flex;
  align-items: center;
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 500;
  gap: 4px;
  
  ${props => {
    if (props.variant === 'secondary') {
      return `
        background-color: #f3f4f6;
        color: #374151;
      `;
    } else if (props.variant === 'outline') {
      return `
        background-color: white;
        color: #374151;
        border: 1px solid rgba(0, 0, 0, 0.1);
      `;
    } else {
      return `
        background-color: #f97316;
        color: white;
        min-width: 20px;
        height: 20px;
        padding: 0;
        justify-content: center;
        margin-left: 4px;
      `;
    }
  }}
`;

const QuickFiltersRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  overflow-x: auto;
`;

const ActiveFiltersRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const FilterSection = styled.div`
  padding: 16px;
  background-color: #f9fafb;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  
  @media (min-width: 1024px) {
    padding: 24px;
  }
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FilterCategory = styled.div`
  h4 {
    font-weight: 500;
    margin-bottom: 8px;
  }
`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  
  @media (min-width: 1024px) {
    padding: 24px;
  }
`;

const ResultsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const ResultsGrid = styled.div`
  display: none;
  
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ResultsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  @media (min-width: 1024px) {
    display: none;
  }
`;

const Card = styled.div`
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.2s;
  
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const CardContent = styled.div`
  padding: 16px;
`;

const CardImage = styled.img`
  width: 100%;
  height: 128px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
  margin-bottom: 4px;
`;

const CardTitle = styled.h4`
  font-weight: 600;
  flex: 1;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 8px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  
  svg {
    color: #fbbf24;
    fill: #fbbf24;
  }
`;

const FollowerLikes = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 8px;
  
  svg {
    color: #ef4444;
  }
`;

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const MobileCardLayout = styled.div`
  display: flex;
  gap: 12px;
`;

const MobileCardImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
`;

const MobileCardContent = styled.div`
  flex: 1;
`;

const SuggestionsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SectionTitle = styled.h3`
  font-weight: 600;
  margin-bottom: 12px;
`;

const SuggestionButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const SuggestionCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const SuggestionCard = styled(Card)`
  text-align: center;
  
  svg {
    width: 32px;
    height: 32px;
    margin: 0 auto 8px;
    color: #6b7280;
  }
  
  p {
    font-weight: 500;
    margin-bottom: 4px;
  }
  
  .description {
    font-size: 12px;
    color: #6b7280;
  }
`;

interface SearchProps {
  onRestaurantClick: (restaurant: any) => void;
  onClose?: () => void;
}

export function Search({ onRestaurantClick, onClose }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});

  const quickFilters = [
    { id: 'alone', label: '혼밥', icon: <UserIcon /> },
    { id: 'friends', label: '친구와', icon: <UsersIcon /> },
    { id: 'spicy', label: '매운맛', icon: <FlameIcon /> },
    { id: 'cafe', label: '카페', icon: <CoffeeIcon /> },
    { id: 'korean', label: '한식', icon: <UtensilsIcon /> },
  ];

  const filterCategories = [
    {
      id: 'cuisine',
      label: '음식 종류',
      options: [
        { value: 'korean', label: '한식' },
        { value: 'japanese', label: '일식' },
        { value: 'chinese', label: '중식' },
        { value: 'western', label: '양식' },
        { value: 'cafe', label: '카페' },
        { value: 'dessert', label: '디저트' }
      ]
    },
    {
      id: 'dining_style',
      label: '식사 스타일',
      options: [
        { value: 'alone', label: '혼밥' },
        { value: 'date', label: '데이트' },
        { value: 'friends', label: '친구와' },
        { value: 'business', label: '회식' }
      ]
    },
    {
      id: 'price_range',
      label: '가격대',
      options: [
        { value: 'budget', label: '~10,000원' },
        { value: 'moderate', label: '10,000~20,000원' },
        { value: 'premium', label: '20,000~30,000원' },
        { value: 'luxury', label: '30,000원+' }
      ]
    },
    {
      id: 'features',
      label: '편의시설',
      options: [
        { value: 'parking', label: '주차가능' },
        { value: 'wifi', label: '와이파이' },
        { value: 'card', label: '카드결제' },
        { value: 'delivery', label: '배달가능' }
      ]
    }
  ];

  const mockSearchResults = [
    {
      id: 1,
      name: "맛있는 국밥집",
      cuisine: "한식",
      distance: "도보 3분",
      rating: 4.7,
      reviewCount: 156,
      price: "8,000원~",
      tags: ["혼밥가능", "든든함", "깔끔한맛"],
      image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=300&h=200&fit=crop",
      matchedFilters: ["alone", "korean"],
      likedByFollowers: {
        names: ["맛집헌터", "혼밥러버"],
        totalCount: 5
      }
    },
    {
      id: 2,
      name: "스파이시 마라탕",
      cuisine: "중식",
      distance: "도보 7분",
      rating: 4.5,
      reviewCount: 89,
      price: "12,000원~",
      tags: ["매운맛", "푸짐함", "가성비"],
      image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=300&h=200&fit=crop",
      matchedFilters: ["spicy", "friends"],
      likedByFollowers: {
        names: ["매운맛킹"],
        totalCount: 1
      }
    }
  ];

  const recentSearches = ["김치찌개", "혼밥 맛집", "데이트 카페", "매운 음식"];
  const popularSearches = ["역삼동 맛집", "점심 추천", "야식", "브런치 카페"];

  const handleFilterToggle = (category: string, value: string) => {
    const currentValues = selectedFilters[category] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v: string) => v !== value)
      : [...currentValues, value];
    
    setSelectedFilters({
      ...selectedFilters,
      [category]: newValues.length > 0 ? newValues : undefined
    });
  };

  const handleQuickFilter = (filterId: string) => {
    const filterMapping: Record<string, { category: string; value: string }> = {
      alone: { category: 'dining_style', value: 'alone' },
      friends: { category: 'dining_style', value: 'friends' },
      spicy: { category: 'features', value: 'spicy' },
      cafe: { category: 'cuisine', value: 'cafe' },
      korean: { category: 'cuisine', value: 'korean' }
    };

    const mapping = filterMapping[filterId];
    if (mapping) {
      handleFilterToggle(mapping.category, mapping.value);
    }
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
  };

  const getActiveFilterCount = () => {
    return Object.values(selectedFilters).flat().filter(Boolean).length;
  };

  const filteredResults = mockSearchResults.filter(restaurant => {
    if (!searchQuery && Object.keys(selectedFilters).length === 0) return true;
    
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      if (!restaurant.name.toLowerCase().includes(searchLower) &&
          !restaurant.cuisine.toLowerCase().includes(searchLower) &&
          !restaurant.tags.some(tag => tag.toLowerCase().includes(searchLower))) {
        return false;
      }
    }

    if (Object.keys(selectedFilters).length > 0) {
      return restaurant.matchedFilters?.some(filter => 
        Object.values(selectedFilters).flat().includes(filter)
      );
    }

    return true;
  });

  const renderFollowerLikes = (likedByFollowers: any) => {
    if (!likedByFollowers || likedByFollowers.totalCount === 0) return null;

    const { names, totalCount } = likedByFollowers;
    const displayNames = names.slice(0, 1);
    const remainingCount = totalCount - displayNames.length;

    return (
      <FollowerLikes>
        <HeartIcon />
        <span>
          <span style={{ fontWeight: 500 }}>{displayNames[0]}</span>
          {remainingCount > 0 && (
            <span> 외 {remainingCount}명이 좋아해요</span>
          )}
          {remainingCount === 0 && (
            <span>님이 좋아해요</span>
          )}
        </span>
      </FollowerLikes>
    );
  };

  return (
    <Container>
      {/* Search Header */}
      <SearchHeader>
        <SearchBarRow>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} style={{ display: 'none' }}>
              <XIcon />
            </Button>
          )}
          <SearchInputWrapper>
            <InputIcon>
              <SearchIcon />
            </InputIcon>
            <SearchInput
              placeholder="맛집, 음식 종류, 지역을 검색하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus={!!onClose}
            />
            <FilterButton
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FilterIcon />
              {getActiveFilterCount() > 0 && (
                <Badge>{getActiveFilterCount()}</Badge>
              )}
            </FilterButton>
          </SearchInputWrapper>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} style={{ display: 'none' }}>
              <XIcon />
            </Button>
          )}
        </SearchBarRow>

        {/* Quick Filters */}
        <QuickFiltersRow>
          {quickFilters.map((filter) => {
            const isActive = selectedFilters.dining_style?.includes(filter.id) ||
                           selectedFilters.cuisine?.includes(filter.id) ||
                           selectedFilters.features?.includes(filter.id);
            
            return (
              <Button
                key={filter.id}
                active={isActive}
                size="sm"
                onClick={() => handleQuickFilter(filter.id)}
              >
                {filter.icon}
                {filter.label}
              </Button>
            );
          })}
        </QuickFiltersRow>

        {/* Active Filters */}
        {getActiveFilterCount() > 0 && (
          <ActiveFiltersRow>
            {Object.entries(selectedFilters).map(([category, values]) =>
              (values as string[])?.map((value) => {
                const categoryData = filterCategories.find(c => c.id === category);
                const option = categoryData?.options.find(o => o.value === value);
                return (
                  <Badge key={`${category}-${value}`} variant="secondary">
                    {option?.label}
                    <span 
                      style={{ cursor: 'pointer', marginLeft: '4px' }}
                      onClick={() => handleFilterToggle(category, value)}
                    >
                      <XIcon />
                    </span>
                  </Badge>
                );
              })
            )}
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              전체 해제
            </Button>
          </ActiveFiltersRow>
        )}
      </SearchHeader>

      {/* Detailed Filters */}
      {showFilters && (
        <FilterSection>
          <FilterGrid>
            {filterCategories.map((category) => (
              <FilterCategory key={category.id}>
                <h4>{category.label}</h4>
                <FilterOptions>
                  {category.options.map((option) => {
                    const isSelected = selectedFilters[category.id]?.includes(option.value);
                    return (
                      <Button
                        key={option.value}
                        active={isSelected}
                        size="sm"
                        onClick={() => handleFilterToggle(category.id, option.value)}
                      >
                        {option.label}
                      </Button>
                    );
                  })}
                </FilterOptions>
              </FilterCategory>
            ))}
          </FilterGrid>
        </FilterSection>
      )}

      {/* Search Results or Suggestions */}
      <ContentArea>
        {searchQuery || Object.keys(selectedFilters).length > 0 ? (
          /* Search Results */
          <div>
            <ResultsHeader>
              <h3>검색 결과 ({filteredResults.length})</h3>
              <Button variant="ghost" size="sm">
                거리순 정렬
              </Button>
            </ResultsHeader>

            {/* Desktop Grid Layout */}
            <ResultsGrid>
              {filteredResults.map((restaurant) => (
                <Card key={restaurant.id} onClick={() => onRestaurantClick(restaurant)}>
                  <CardContent>
                    <CardImage
                      src={restaurant.image}
                      alt={restaurant.name}
                    />
                    <CardHeader>
                      <CardTitle>{restaurant.name}</CardTitle>
                      <Button variant="ghost" size="sm">
                        <HeartIcon />
                      </Button>
                    </CardHeader>
                    
                    <CardMeta>
                      <Rating>
                        <StarIcon />
                        {restaurant.rating}
                      </Rating>
                      <span>({restaurant.reviewCount})</span>
                      <span>•</span>
                      <span>{restaurant.cuisine}</span>
                    </CardMeta>

                    {renderFollowerLikes(restaurant.likedByFollowers)}
                    
                    <CardMeta>
                      <MapPinIcon />
                      {restaurant.distance}
                      <span>•</span>
                      <ClockIcon />
                      {restaurant.price}
                    </CardMeta>
                    
                    <CardTags>
                      {restaurant.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </CardTags>
                  </CardContent>
                </Card>
              ))}
            </ResultsGrid>

            {/* Mobile List Layout */}
            <ResultsList>
              {filteredResults.map((restaurant) => (
                <Card key={restaurant.id} onClick={() => onRestaurantClick(restaurant)}>
                  <CardContent>
                    <MobileCardLayout>
                      <MobileCardImage
                        src={restaurant.image}
                        alt={restaurant.name}
                      />
                      <MobileCardContent>
                        <CardHeader>
                          <CardTitle>{restaurant.name}</CardTitle>
                          <Button variant="ghost" size="sm">
                            <HeartIcon />
                          </Button>
                        </CardHeader>
                        
                        <CardMeta>
                          <Rating>
                            <StarIcon />
                            {restaurant.rating}
                          </Rating>
                          <span>({restaurant.reviewCount})</span>
                          <span>•</span>
                          <span>{restaurant.cuisine}</span>
                        </CardMeta>

                        {renderFollowerLikes(restaurant.likedByFollowers)}
                        
                        <CardMeta>
                          <MapPinIcon />
                          {restaurant.distance}
                          <span>•</span>
                          <ClockIcon />
                          {restaurant.price}
                        </CardMeta>
                        
                        <CardTags>
                          {restaurant.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </CardTags>
                      </MobileCardContent>
                    </MobileCardLayout>
                  </CardContent>
                </Card>
              ))}
            </ResultsList>
          </div>
        ) : (
          /* Search Suggestions */
          <SuggestionsSection>
            <div>
              <SectionTitle>최근 검색</SectionTitle>
              <SuggestionButtons>
                {recentSearches.map((search) => (
                  <Button
                    key={search}
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery(search)}
                  >
                    <ClockIcon />
                    {search}
                  </Button>
                ))}
              </SuggestionButtons>
            </div>

            <div>
              <SectionTitle>인기 검색어</SectionTitle>
              <SuggestionButtons>
                {popularSearches.map((search) => (
                  <Button
                    key={search}
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery(search)}
                  >
                    <FlameIcon style={{ color: '#f97316' }} />
                    {search}
                  </Button>
                ))}
              </SuggestionButtons>
            </div>

            <div>
              <SectionTitle>상황별 추천</SectionTitle>
              <SuggestionCards>
                <SuggestionCard onClick={() => handleQuickFilter('alone')}>
                  <CardContent>
                    <UserIcon />
                    <p>혼밥 맛집</p>
                    <p className="description">편안하게 혼자 식사</p>
                  </CardContent>
                </SuggestionCard>
                <SuggestionCard onClick={() => handleQuickFilter('friends')}>
                  <CardContent>
                    <UsersIcon />
                    <p>친구와 모임</p>
                    <p className="description">대화하기 좋은 곳</p>
                  </CardContent>
                </SuggestionCard>
                <SuggestionCard onClick={() => handleQuickFilter('spicy')}>
                  <CardContent>
                    <FlameIcon style={{ color: '#f97316' }} />
                    <p>매운 음식</p>
                    <p className="description">매운맛 전문점</p>
                  </CardContent>
                </SuggestionCard>
                <SuggestionCard onClick={() => handleQuickFilter('cafe')}>
                  <CardContent>
                    <CoffeeIcon />
                    <p>카페</p>
                    <p className="description">커피와 디저트</p>
                  </CardContent>
                </SuggestionCard>
              </SuggestionCards>
            </div>
          </SuggestionsSection>
        )}
      </ContentArea>
    </Container>
  );
}