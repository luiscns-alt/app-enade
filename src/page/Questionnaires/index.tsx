import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
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

interface Params {
  quiz: questionsDTO;
}

export function Questionnaires() {
  const navigation = useNavigation();
  const route = useRoute();
  const { quiz, index } = route.params as Params;

  const [questionnaires, setQuestionnaires] = useState<questionsDTO[]>([]);

  function handleBack() {
    navigation.goBack();
  }
  //
  // function handle() {
  //
  //         console.log(quiz.questionsData);
  //
  // }
  //
  // useEffect(() => {
  //     handle()
  // }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>
      <CarImages></CarImages>
      <Content>
        <Subject>{quiz.title}</Subject>
        <Title>{quiz.description}</Title>
      </Content>
      <Content>
        <FlatList
          data={quiz.questionsData}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <Card data={item} />}
        />
      </Content>
    </Container>
  );
}
