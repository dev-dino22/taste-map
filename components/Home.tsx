import styled from '@emotion/styled';

const Container = styled.div`
  padding: 24px 16px;
`;

const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: #6b7280;
  margin-bottom: 24px;
`;

const Button = styled.button`
  background-color: #f97316;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: #ea580c;
  }
`;

const RestaurantGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const RestaurantCard = styled.div`
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: box-shadow 0.2s;
  
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const RestaurantImage = styled.div`
  width: 100%;
  height: 120px;
  background-color: #f3f4f6;
  border-radius: 8px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
`;

const RestaurantName = styled.h3`
  font-weight: 600;
  margin-bottom: 4px;
`;

const RestaurantInfo = styled.p`
  color: #6b7280;
  font-size: 14px;
`;

interface HomeProps {
  onRestaurantClick: (restaurant: any) => void;
  onTasteProfileClick: () => void;
}

export function Home({ onRestaurantClick, onTasteProfileClick }: HomeProps) {
  const mockRestaurants = [
    {
      id: 1,
      name: "맛있는 국밥집",
      cuisine: "한식",
      rating: 4.7,
      distance: "도보 3분"
    },
    {
      id: 2,
      name: "스파이시 마라탕",
      cuisine: "중식",
      rating: 4.5,
      distance: "도보 7분"
    },
    {
      id: 3,
      name: "로맨틱 이탈리안",
      cuisine: "양식",
      rating: 4.8,
      distance: "도보 10분"
    }
  ];

  return (
    <Container>
      <WelcomeSection>
        <Title>안녕하세요! 맛집메이트입니다</Title>
        <Subtitle>당신만을 위한 맞춤 맛집을 추천해드려요</Subtitle>
        <Button onClick={onTasteProfileClick}>
          입맛 프로필 설정하기
        </Button>
      </WelcomeSection>

      <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>
        추천 맛집
      </h2>
      
      <RestaurantGrid>
        {mockRestaurants.map((restaurant) => (
          <RestaurantCard 
            key={restaurant.id} 
            onClick={() => onRestaurantClick(restaurant)}
          >
            <RestaurantImage>
              🍽️ 이미지
            </RestaurantImage>
            <RestaurantName>{restaurant.name}</RestaurantName>
            <RestaurantInfo>
              {restaurant.cuisine} • ⭐ {restaurant.rating} • {restaurant.distance}
            </RestaurantInfo>
          </RestaurantCard>
        ))}
      </RestaurantGrid>
    </Container>
  );
}