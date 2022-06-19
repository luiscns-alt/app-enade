import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
  AreaView,
  Bar,
  Container,
  ContainerOptions,
  ContainerOptionsDiv,
  ContainerQuestion,
  CorrectOption,
  Icon,
  OptionSelected,
  TextIndexQuestion,
  TextOptions,
  TextQuestion,
  TitleQuestion,
  ViewQuestion,
} from './styles';

import data from '../../data/QuizData';

export function Quiz() {
  const allQuestions = data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  function validateAnswer(selectedOption) {
    let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);
    if (selectedOption == correct_option) {
      // Set Score
      setScore(score + 1);
    }
    // Show Next Button
    setShowNextButton(true);
  }

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
          <TouchableOpacity onPress={() => validateAnswer(option)} key={option}>
            <ContainerOptionsDiv>
              <TextOptions>{option}</TextOptions>
              {/* Show check or cross icon on correct answer */}
              {option == correctOption ? (
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

  return (
    <AreaView>
      <Bar />
      <Container>
        {/* ProgressBar */}

        {/* Question */}
        {renderQuestion()}

        {/* Options */}
        {renderOptions()}

        {/* Next Button */}

        {/* Background Image */}
        {/* <Image
          source={require('../assets/images/.png')}
          style={{
            width: SIZES.width,
            height: 130,
            zIndex: -1,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 0.5,
          }}
          resizeMode={'contain'}
        /> */}
      </Container>
    </AreaView>
  );
}
