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
  const [search, setSearch] = useState('');
  return (
    <SearchStyle>
      <div className="d-flex">
        <input
          onChange={e => setSearch(e.target.value)}
          value={search}
          placeholder={placeholder}
          type="text"
          className="form-control"
        />
        <button
          onClick={() => onSearch(search)}
          type="button"
          className="btn btn-light"
        >
          <MdSearch />
        </button>
      </div>
    </SearchStyle>
  );
};
