import styled from 'styled-components';
import { VscSearch } from 'react-icons/vsc';
import { useRecoilState, useRecoilValue } from 'recoil';
import { mapCategoryValue, mapSearchValue } from '../../../atoms';

interface Props {
  onSearchSubmitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
}

const MapSearch = ({ onSearchSubmitHandler }: Props) => {
  const [search, setSearch] = useRecoilState(mapSearchValue);
  const [category, setCategory] = useRecoilState(mapCategoryValue);

  const searchValueChangeHandler = (
    event: React.FormEvent<HTMLInputElement>,
  ) => {
    setSearch(event.currentTarget.value);
    setCategory('팝업스토어');
  };

  return (
    <Wrap>
      <form onSubmit={onSearchSubmitHandler}>
        <VscIconWrap>
          <VscSearch size={28}></VscSearch>
        </VscIconWrap>
        <SearchInput
          onChange={searchValueChangeHandler}
          type="text"
          value={search}
        />
      </form>
    </Wrap>
  );
};

export default MapSearch;

const Wrap = styled.div`
  position: relative;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VscIconWrap = styled.div`
  position: absolute;
  left: 70px;
  top: 35%;
`;
const SearchInput = styled.input`
  padding: 0 80px;
  width: 250px;
  height: 50px;
  border: 2px solid #205295;
  border-radius: 7px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 30px;
`;
