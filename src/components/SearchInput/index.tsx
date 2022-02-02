import { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { SearchStyle } from './styles';

interface ISearchInputProps {
  placeholder?: string;
  onSearch(searchText: string): void;
}

export const SearchInput: React.FC<ISearchInputProps> = ({
  placeholder = '',
  onSearch,
}) => {
  const [searchText, setSearchText] = useState('');
  return (
    <SearchStyle>
      <form action="/pontos-turisticos/buscar" method="get">
        <div className="d-flex">
          <input
            onChange={e => setSearchText(e.target.value)}
            value={searchText}
            placeholder={placeholder}
            type="text"
            className="form-control"
          />
          <button
            onClick={() => onSearch(searchText)}
            type="button"
            className="btn color-white"
          >
            <MdSearch />
          </button>
        </div>
      </form>
    </SearchStyle>
  );
};
