import styled from 'styled-components/primitives';
import theme from './theme.json';

const P = styled.Text`
  color: ${props => props.danger ? theme.danger : theme.primary};
  font-size: 16px;
`;

export default P;
