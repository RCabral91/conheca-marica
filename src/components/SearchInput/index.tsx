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
      <div className="d-flex">
        <input
          onChange={e => setSearchText(e.target.value)}
          value={searchText}
          placeholder={placeholder}
          type="text"
          className="input input-display form-control"
        />
        <button
          onClick={() => onSearch(searchText)}
          type="button"
          className="btn color-white"
        >
          <MdSearch />
        </button>
      </div>
    </SearchStyle>
  );
};
