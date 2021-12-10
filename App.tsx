import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from './src/global/styles/theme';

import Dashboard from './src/page/Dashborad';

export default function App() {
    <ThemeProvider theme={theme}>
        <Dashboard />
    </ThemeProvider>;
}
