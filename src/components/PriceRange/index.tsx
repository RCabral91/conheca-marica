import { useMemo } from 'react';
import { MdOutlineAttachMoney } from 'react-icons/md';

interface IPriceRange {
  title: string;
  amount: number;
}

export const PriceRange: React.FC<IPriceRange> = ({ title, amount }) => {
  const priceArray = useMemo(
    () => [...Array(5)].map((_, index) => index < amount),
    [amount]
  );

  return (
    <div className="mt-5">
      <h1 className="fs-4 fw-bold border-bottom pb-2 border-2 mb-4">{title}</h1>
      <ul className="align-items-center p-0 row row-cols-3 pb-3">
        <li className="d-flex align-items-center list-unstyled col pb-4">
          {priceArray.map(price => (
            <div className={`px-2 text-${price ? 'secondary' : 'muted'}`}>
              <MdOutlineAttachMoney className="fs-4 fw-bold" />
            </div>
          ))}
        </li>
      </ul>
    </div>
  );
};
