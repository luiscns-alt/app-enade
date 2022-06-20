import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Animated, FlatList, Text } from 'react-native';
import { BackButton } from '../../components/BackButton';
import { questionsDTO } from '../../dtos/questionsDTO';

import {
  CarImages,
  Container,
  Content,
  Header,
  Subject,
  Title,
} from './styles';
import { api } from '../../services/api';
import { TransactionCard } from '../../components/TransactionCard';
import { TransactionList } from '../Dashboard/styles';
import { Card } from '../../components/Card';
import { getToken, useAuth } from '../../contexts/auth';
import {
    ContainerModal,
  ContainerOptions,
  ContainerOptionsDiv,
  ContainerQuestion,
  CorrectOption,
  Icon,
  NextButton,
  OptionSelected,
  ProgressBar,
  QuestionsText,
  Retry,
  RetryText,
  ScoreModal,
  ScoreText,
  ScoreView,
  TextIndexQuestion,
  TextNextButton,
  TextOptions,
  TextQuestion,
  TitleQuestion,
  ViewModal,
  ViewQuestion,
  ViewText,
} from '../Quiz/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Params {
  quiz: questionsDTO;
}

export function Questionnaires() {
  const navigation = useNavigation();
  const route = useRoute();
  const { quiz } = route.params as Params;

  const [questionnaires, setQuestionnaires] = useState<questionsDTO[]>([]);

  function handleBack() {
    navigation.goBack();
  }

  async function listQuiz() {
    const token = await getToken();
    try {
      await api
        .get(`/quiz/${quiz.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log('********THEN**********');
          console.log(res);
          console.log(res.data.questions);
          setAllQuestions(res.data.questions);
          //   const { items, meta } = res.data;
          //  setToReceive(items);
          //   return items;
        })
        .catch((error) => {
          console.log('********CATCH**********');
          console.log(error);
          console.log('***********************');
        });
    } catch (error) {
      console.log('*********ERROR*********');
      console.log(error);
    }
  }

  useEffect(() => {
    const load = async () => {
      await listQuiz();
    };
    load();
  }, []);

  const [allQuestions, setAllQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  function validateAnswer(selectedOption) {
    setCorrectOption(true);
    setCurrentOptionSelected(selectedOption);
    setIsOptionsDisabled(true);
    // if (selectedOption == correct_option) {
    //   // Set Score
    //   setScore(score + 1);
    // }
    // Show Next Button
    setShowNextButton(true);
  }

  function handleNext() {
    if (currentQuestionIndex == allQuestions.length - 1) {
      // Last Question
      // Show Score Modal
      setShowScoreModal(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }

  const restartQuiz = () => {
    setShowScoreModal(false);

    setCurrentQuestionIndex(0);
    setScore(0);

    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  function renderQuestion() {
    return (
      <ContainerQuestion>
        {/* Question Counter */}
        <ViewQuestion>
          <TextQuestion>{currentQuestionIndex + 1} </TextQuestion>
          <TextIndexQuestion>/ {allQuestions.length}</TextIndexQuestion>
        </ViewQuestion>

        {/* Question */}
        <TitleQuestion>
          {allQuestions[currentQuestionIndex]?.question}
        </TitleQuestion>
      </ContainerQuestion>
    );
  }

  function renderOptions() {
    return (
      <ContainerOptions>
        {allQuestions[currentQuestionIndex]?.options.map((option) => (
          <TouchableOpacity onPress={() => validateAnswer(option)} key={option.id}>
            {/* <TouchableOpacity> */}
            <ContainerOptionsDiv>
              <TextOptions>{option.text}</TextOptions>
              {/* Show check or cross icon on correct answer */}
              {option.isCorrect == correctOption ? (
                <CorrectOption>
                  <Icon name='check' />
                </CorrectOption>
              ) : option == currentOptionSelected ? (
                <OptionSelected>
                  <Icon name='x' />
                </OptionSelected>
              ) : null}
            </ContainerOptionsDiv>
          </TouchableOpacity>
        ))}
      </ContainerOptions>
    );
  }

  function renderNextButton() {
    if (showNextButton) {
      return (
        <NextButton onPress={handleNext}>
          <TextNextButton>Next</TextNextButton>
        </NextButton>
      );
    } else {
      return null;
    }
  }

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ['0%', '100%'],
  });

  function renderProgressBar() {
    return (
      <ProgressBar>
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
              backgroundColor: '#3498db',
            },
            {
              width: progressAnim,
            },
          ]}
        ></Animated.View>
      </ProgressBar>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>
      <CarImages></CarImages>
      <Content>
        {/* <Subject>{quiz.title}</Subject>
        <Title>{quiz.description}</Title> */}
        {/* <Title>{quiz.id}</Title> */}
        {/* ProgressBar */}
        {renderProgressBar()}

        {/* Question */}
        {renderQuestion()}

        {/* Options */}
        {renderOptions()}

        {/* Next Button */}
        {renderNextButton()}

        {/* Score Modal */}
        <ScoreModal
          animationType='slide'
          transparent={true}
          visible={showScoreModal}
        >
          <ContainerModal>
            <ViewModal>
              <ViewText>
                {score > allQuestions.length / 2 ? 'Congratulations!' : 'Oops!'}
              </ViewText>
              <ScoreView>
                <ScoreText isActive={score > allQuestions.length / 2}>
                  {score}
                </ScoreText>
                <QuestionsText>/ {allQuestions.length}</QuestionsText>
              </ScoreView>
              {/* Retry Quiz button */}
              <Retry onPress={restartQuiz}>
                <RetryText>Retry Quiz</RetryText>
              </Retry>
              <Retry onPress={handleBack}>
                <RetryText>Back</RetryText>
              </Retry>
            </ViewModal>
          </ContainerModal>
        </ScoreModal>
      </Content>
    </Container>
  );
}
