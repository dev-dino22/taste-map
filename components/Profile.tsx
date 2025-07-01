import styled from '@emotion/styled';

const Container = styled.div`
  padding: 24px 16px;
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #f97316;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
  font-weight: bold;
  margin: 0 auto 16px;
`;

const UserName = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const UserStats = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 24px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #f97316;
`;

const StatLabel = styled.p`
  color: #6b7280;
  font-size: 14px;
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

const MenuSection = styled.div`
  margin-top: 32px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  
  &:hover {
    background-color: #f9fafb;
  }
`;

const MenuIcon = styled.span`
  font-size: 20px;
  margin-right: 12px;
`;

const MenuText = styled.span`
  flex: 1;
  font-weight: 500;
`;

interface ProfileProps {
  onTasteProfileClick: () => void;
}

export function Profile({ onTasteProfileClick }: ProfileProps) {
  const menuItems = [
    { icon: '👤', text: '입맛 프로필 설정', onClick: onTasteProfileClick },
    { icon: '❤️', text: '찜한 맛집', onClick: () => {} },
    { icon: '📝', text: '내 리뷰', onClick: () => {} },
    { icon: '🔔', text: '알림 설정', onClick: () => {} },
    { icon: '❓', text: '고객 지원', onClick: () => {} },
  ];

  return (
    <Container>
      <ProfileHeader>
        <Avatar>김</Avatar>
        <UserName>김우아</UserName>
        <UserStats>
          <StatItem>
            <StatNumber>42</StatNumber>
            <StatLabel>방문한 맛집</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>18</StatNumber>
            <StatLabel>작성한 리뷰</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>127</StatNumber>
            <StatLabel>도움이 됐어요</StatLabel>
          </StatItem>
        </UserStats>
        <Button onClick={onTasteProfileClick}>
          입맛 프로필 완성하기
        </Button>
      </ProfileHeader>

      <MenuSection>
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={item.onClick}>
            <MenuIcon>{item.icon}</MenuIcon>
            <MenuText>{item.text}</MenuText>
            <span>›</span>
          </MenuItem>
        ))}
      </MenuSection>
    </Container>
  );
}