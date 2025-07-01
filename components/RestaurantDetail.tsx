import styled from '@emotion/styled';

const Container = styled.div`
  padding: 0;
`;

const Header = styled.div`
  position: relative;
  height: 200px;
  background: linear-gradient(45deg, #f97316, #ea580c);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
`;

const BackButton = styled.button`
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  padding: 24px 16px;
`;

const RestaurantName = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const RestaurantInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  color: #6b7280;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Description = styled.p`
  line-height: 1.6;
  margin-bottom: 24px;
`;

const InfoSection = styled.div`
  margin-bottom: 24px;
`;

const InfoTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

const Tag = styled.span`
  background-color: #fef3f2;
  color: #f97316;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
`;

interface RestaurantDetailProps {
  restaurant: any;
  onBack: () => void;
}

export function RestaurantDetail({ restaurant, onBack }: RestaurantDetailProps) {
  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>←</BackButton>
        🍽️ 맛집 이미지
      </Header>
      
      <Content>
        <RestaurantName>{restaurant?.name || "맛있는 국밥집"}</RestaurantName>
        
        <RestaurantInfo>
          <Rating>
            ⭐ {restaurant?.rating || 4.7}
          </Rating>
          <span>•</span>
          <span>{restaurant?.cuisine || "한식"}</span>
          <span>•</span>
          <span>{restaurant?.distance || "도보 3분"}</span>
        </RestaurantInfo>

        <TagContainer>
          <Tag>혼밥가능</Tag>
          <Tag>든든함</Tag>
          <Tag>깔끔한맛</Tag>
        </TagContainer>

        <Description>
          정성스럽게 끓인 국물과 신선한 재료로 만든 국밥이 일품입니다. 
          혼자 오기에도 편안하고, 가격도 합리적이어서 자주 찾게 되는 곳입니다.
        </Description>

        <InfoSection>
          <InfoTitle>기본 정보</InfoTitle>
          <InfoItem>
            <span>주소</span>
            <span>서울시 강남구 테헤란로 123</span>
          </InfoItem>
          <InfoItem>
            <span>전화번호</span>
            <span>02-1234-5678</span>
          </InfoItem>
          <InfoItem>
            <span>영업시간</span>
            <span>09:00 - 21:00</span>
          </InfoItem>
          <InfoItem>
            <span>가격대</span>
            <span>{restaurant?.price || "8,000원~"}</span>
          </InfoItem>
        </InfoSection>
      </Content>
    </Container>
  );
}