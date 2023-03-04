import styled from 'styled-components';
import COLORS from '../../../assets/CSS/colors';

export const Wrap = styled.div`
  margin-top: 20px;
`;

export const WeatherWrap = styled.div`
  width: 400px;
  display: flex;
  justify-content: flex-end;
`;

export const WeatherText = styled.span`
  margin-right: 5px;
  font-family: 'Apple SD Gothic Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: ${COLORS.white};
`;
