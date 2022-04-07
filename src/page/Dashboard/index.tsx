import React from 'react';

import {
    TransactionCard,
    TransactionCardProps,
} from '../../components/TransactionCard';

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

export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard() {
    const data: DataListProps[] = [
        {
            id: '1',
            type: 'positive',
            title: 'Ciência da Computação',
            amount: 'Banco de Dados',
            category: {
                name: 'N de questão(ões)',
                // icon: 'dollar-sign',
            },
            date: '10/10/2021',
        },
        {
            id: '2',
            type: 'negative',
            title: 'Ciência da Computação',
            amount: 'POO',
            category: {
                name: 'N de questão(ões)',
                // icon: 'coffee',
            },
            date: '10/10/2021',
        },
        {
            id: '3',
            type: 'positive',
            title: 'Ciência da Computação',
            amount: 'Programação Web',
            category: {
                name: 'N de questão(ões)',
                // icon: 'shopping-bag',
            },
            date: '10/10/2021',
        },
        {
            id: '4',
            type: 'positive',
            title: 'Ciência da Computação',
            amount: 'Programação Web',
            category: {
                name: 'N de questão(ões)',
                // icon: 'shopping-bag',
            },
            date: '10/10/2021',
        },
        {
            id: '5',
            type: 'positive',
            title: 'Ciência da Computação',
            amount: 'Programação Web',
            category: {
                name: 'N de questão(ões)',
                // icon: 'shopping-bag',
            },
            date: '10/10/2021',
        },
    ];
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
                    <LogoutButton onPress={() => {}}>
                        <Icon name="power" />
                    </LogoutButton>
                </UserWrapper>
            </Header>

            <Transactions>
                <Title>Listagem</Title>
                <TransactionList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                />
            </Transactions>
        </Container>
    );
}
