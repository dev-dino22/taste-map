import styled from '@emotion/styled';

const Container = styled.div`
  padding: 24px 16px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 32px;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
`;

const Step = styled.div<{ active?: boolean; completed?: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: 0 4px;
  
  ${props => props.completed ? `
    background-color: #f97316;
  ` : props.active ? `
    background-color: #f97316;
  ` : `
    background-color: #e5e7eb;
  `}
`;

const Question = styled.div`
  margin-bottom: 32px;
`;

const QuestionText = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const OptionButton = styled.button<{ selected?: boolean }>`
  padding: 16px;
  border: 2px solid ${props => props.selected ? '#f97316' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 8px;
  background-color: ${props => props.selected ? '#fef3f2' : 'white'};
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  
  &:hover {
    border-color: #f97316;
  }
`;

const OptionEmoji = styled.div`
  font-size: 32px;
  margin-bottom: 8px;
`;

const OptionText = styled.p`
  font-weight: 500;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  
  ${props => props.variant === 'primary' ? `
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

interface TasteProfileProps {
  onComplete: () => void;
}

export function TasteProfile({ onComplete }: TasteProfileProps) {
  const questions = [
    {
      question: "선호하는 음식 종류는?",
      options: [
        { emoji: "🍚", text: "한식", value: "korean" },
        { emoji: "🍝", text: "양식", value: "western" },
        { emoji: "🍜", text: "중식", value: "chinese" },
        { emoji: "🍣", text: "일식", value: "japanese" },
        { emoji: "☕", text: "카페", value: "cafe" },
        { emoji: "🌮", text: "기타", value: "others" }
      ]
    }
  ];

  return (
    <Container>
      <Title>입맛 프로필 설정</Title>
      
      <StepIndicator>
        <Step active />
        <Step />
        <Step />
      </StepIndicator>

      <Question>
        <QuestionText>{questions[0].question}</QuestionText>
        <OptionsGrid>
          {questions[0].options.map((option, index) => (
            <OptionButton key={index}>
              <OptionEmoji>{option.emoji}</OptionEmoji>
              <OptionText>{option.text}</OptionText>
            </OptionButton>
          ))}
        </OptionsGrid>
      </Question>

      <NavigationButtons>
        <Button variant="secondary" onClick={onComplete}>
          건너뛰기
        </Button>
        <Button variant="primary" onClick={onComplete}>
          완료
        </Button>
      </NavigationButtons>
    </Container>
  );
}