import { AiOutlineCheckCircle } from 'react-icons/ai';
import { EquipmentType } from '../../@types/Equipment';

interface IEquipmentsProps {
  title: string;
  contents?: EquipmentType[];
}

const Equipments: React.FC<IEquipmentsProps> = ({ title, contents }) => (
  <div className="mt-5">
    <h2 className="fs-4 pb-2 border-2 border-bottom mb-4">{title}</h2>
    <div className="fs-5 align-items-center p-0 row row-cols-1 row-cols-md-3 pe-3">
      {contents?.map(info => (
        <div key={info.id} className="">
          <div className="d-flex align-items-center list-unstyled pb-4">
            <div className="px-2">
              <AiOutlineCheckCircle color="#6ebd00" />
            </div>
            {info.label && (
              <div className="px-2 m-0">
                {info.total}x {info.label}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Equipments;
