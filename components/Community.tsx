import styled from '@emotion/styled';

const Container = styled.div`
  padding: 24px 16px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const PostCard = styled.div`
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: box-shadow 0.2s;
  
  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f97316;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  margin-right: 12px;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.p`
  font-weight: 600;
  margin-bottom: 2px;
`;

const PostTime = styled.p`
  color: #6b7280;
  font-size: 12px;
`;

const PostContent = styled.p`
  margin-bottom: 12px;
  line-height: 1.5;
`;

const PostActions = styled.div`
  display: flex;
  gap: 16px;
  color: #6b7280;
  font-size: 14px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  
  &:hover {
    color: #f97316;
  }
`;

interface CommunityProps {
  onRestaurantClick: (restaurant: any) => void;
}

export function Community({ onRestaurantClick }: CommunityProps) {
  const mockPosts = [
    {
      id: 1,
      user: "맛집헌터",
      time: "2시간 전",
      content: "오늘 새로 오픈한 국밥집 다녀왔는데 정말 맛있어요! 깔끔하고 든든한 맛이 일품입니다. 혼밥하기에도 좋고 가격도 합리적이네요.",
      likes: 12,
      comments: 3
    },
    {
      id: 2,
      user: "혼밥러버",
      time: "5시간 전",
      content: "점심 혼밥 맛집 추천받아요! 사무실 근처에서 조용하게 식사할 수 있는 곳 있을까요?",
      likes: 8,
      comments: 7
    },
    {
      id: 3,
      user: "매운맛킹",
      time: "1일 전",
      content: "마라탕 맛집 발견! 🌶️ 매운맛 좋아하시는 분들께 강추합니다. 재료도 신선하고 양도 푸짐해요.",
      likes: 25,
      comments: 15
    }
  ];

  return (
    <Container>
      <Title>커뮤니티</Title>
      
      {mockPosts.map((post) => (
        <PostCard key={post.id}>
          <PostHeader>
            <Avatar>
              {post.user.charAt(0)}
            </Avatar>
            <UserInfo>
              <UserName>{post.user}</UserName>
              <PostTime>{post.time}</PostTime>
            </UserInfo>
          </PostHeader>
          
          <PostContent>{post.content}</PostContent>
          
          <PostActions>
            <ActionButton>
              ❤️ {post.likes}
            </ActionButton>
            <ActionButton>
              💬 {post.comments}
            </ActionButton>
            <ActionButton>
              📤 공유
            </ActionButton>
          </PostActions>
        </PostCard>
      ))}
    </Container>
  );
}