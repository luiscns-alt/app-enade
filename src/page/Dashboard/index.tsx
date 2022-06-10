import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';

import {
    TransactionCard,
    TransactionCardProps,
} from '../../components/TransactionCard';
import {questionsDTO} from '../../dtos/questionsDTO';
import {api} from '../../services/api';

import {
    Container,
    Header,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    UserWrapper,
    Icon,
    LogoutButton,
    Transactions,
    Title,
    TransactionList,
} from './styles';

import QuestionsData from '../../services/server.json';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard() {
    const [questionnaires, setQuestionnaires] = useState<questionsDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    // const data: DataListProps[] = QuestionsData[];
    function handleQuestionnaires(quiz: questionsDTO) {
        // @ts-ignore
        navigation.navigate('Questionnaires', {quiz});
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/questions');
                setQuestionnaires(response.data);
            } catch (error) {
                console.log(error);
            } finally {

                setLoading(false);
            }
        }

        fetchCars();
    }, []);

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo
                            source={{
                                uri: 'https://avatars.githubusercontent.com/u/82232848?v=4',
                            }}
                        />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Name </UserName>
                        </User>
                    </UserInfo>
                    <LogoutButton onPress={() => {
                    }}>
                        <Icon name="power"/>
                    </LogoutButton>
                </UserWrapper>
            </Header>

            <Transactions>
                <Title>Listagem</Title>
                <TransactionList
                    data={questionnaires}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <TransactionCard
                            data={item}
                            onPress={() => handleQuestionnaires(item)}
                        />
                    )}
                />
            </Transactions>
        </Container>
    );
}
