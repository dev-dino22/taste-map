import styled from '@emotion/styled';

const Container = styled.div`
  padding: 0;
  height: 100vh;
  position: relative;
`;

const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 8px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #e5f3ff, #f0f9ff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #6b7280;
  padding-top: 80px;
`;

const RestaurantMarkers = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

const Marker = styled.div`
  position: absolute;
  background-color: #f97316;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  pointer-events: auto;
  
  &:hover {
    background-color: #ea580c;
  }
`;

interface MapProps {
  onBack: () => void;
  onRestaurantClick: (restaurant: any) => void;
}

export function Map({ onBack, onRestaurantClick }: MapProps) {
  const mockRestaurants = [
    { id: 1, name: "국밥집", x: "30%", y: "40%" },
    { id: 2, name: "마라탕", x: "60%", y: "50%" },
    { id: 3, name: "이탈리안", x: "45%", y: "65%" }
  ];

  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>←</BackButton>
        <Title>근처 맛집 지도</Title>
      </Header>
      
      <MapContainer>
        🗺️ 지도 영역 (실제 지도 API 연동 필요)
        
        <RestaurantMarkers>
          {mockRestaurants.map((restaurant) => (
            <Marker
              key={restaurant.id}
              style={{ left: restaurant.x, top: restaurant.y }}
              onClick={() => onRestaurantClick(restaurant)}
            >
              📍 {restaurant.name}
            </Marker>
          ))}
        </RestaurantMarkers>
      </MapContainer>
    </Container>
  );
}