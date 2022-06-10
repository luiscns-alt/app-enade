import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { questionsDTO } from '../../dtos/questionsDTO';

import {
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date,
} from './styles';

interface Category {
    name: string;
    // icon: string;
}

export interface TransactionCardProps {
    type: 'positive' | 'negative';
    title: string;
    amount: string;
    category: Category;
    date: string;
}

interface Props extends RectButtonProps {
    data: questionsDTO;
}

export function TransactionCard({ data, ...rest }: Props) {
    return (
        <Container {...rest}>
            <Title>{data.title}</Title>

            <Amount type={data.type}>
                {data.type === 'negative' && '- '}
                {data.amount}
            </Amount>

            <Footer>
                <Category>
                    {/* <Icon name={data.category.icon} /> */}
                    <CategoryName>{data.category.name}</CategoryName>
                </Category>
                <Date>{data.date}</Date>
            </Footer>
        </Container>
    );
}
